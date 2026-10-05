/* eslint-disable no-console */
/**
 * Headless smoke test: renders every route of the production build inside jsdom
 * and reports any React render / runtime error. Recharts needs a few polyfills.
 */
import { JSDOM, VirtualConsole } from 'jsdom'
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve('dist')
const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

const ROUTES = [
  '/',
  '/dashboard',
  '/profile',
  '/gap',
  '/matching',
  '/peer/aarav-mehta',
  '/peer/priya-shah',
  '/peer/rohan-patel',
  '/path',
  '/practice',
  '/progress',
  '/community',
  '/impact',
  '/pricing',
  '/market',
  '/unit-economics',
  '/go-to-market',
  '/financials',
  '/funding',
  '/about',
  '/nope',
]

const errors = []
const vc = new VirtualConsole()
vc.on('jsdomError', (e) => errors.push(`jsdomError: ${e.message}`))
vc.on('error', (...a) => errors.push(`console.error: ${a.join(' ')}`))

function polyfill(win) {
  class IO {
    constructor(cb) {
      this.cb = cb
    }
    observe(el) {
      this.cb([{ isIntersecting: true, target: el }], this)
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  win.IntersectionObserver = IO
  win.ResizeObserver = class {
    constructor(cb) {
      this.cb = cb
    }
    observe(el) {
      this.cb([{ target: el, contentRect: { width: 800, height: 300, top: 0, left: 0, bottom: 300, right: 800 } }], this)
    }
    unobserve() {}
    disconnect() {}
  }
  win.matchMedia = win.matchMedia || ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, onchange: null, dispatchEvent() { return false } }))
  win.scrollTo = () => {}
  win.print = () => {}
  if (!win.SVGElement.prototype.getBBox) {
    win.SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 10, height: 10 })
  }
  if (!win.SVGElement.prototype.getComputedTextLength) {
    win.SVGElement.prototype.getComputedTextLength = () => 10
  }
  if (!win.HTMLElement.prototype.animate) {
    win.HTMLElement.prototype.animate = () => ({ finished: Promise.resolve(), cancel() {}, finish() {} })
  }
}

async function runRoute(route) {
  const dom = new JSDOM(html, {
    url: 'http://localhost/' + route.replace(/^\//, ''),
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: vc,
  })
  const win = dom.window
  polyfill(win)
  win.HTMLCanvasElement.prototype.getContext = () => null

  errors.length = 0

  const src = fs.readFileSync(path.resolve('dist-smoke/smoke.js'), 'utf8')
  win.eval(src)

  await new Promise((r) => setTimeout(r, 260))

  const root = win.document.getElementById('root')
  const text = root?.textContent ?? ''
  const len = root?.innerHTML.length ?? 0
  const boundary = text.includes('Something went wrong')
  const loading = text.includes('Loading page')

  const real = errors.filter((e) => !/Not implemented|Could not parse CSS|Error: Not implemented/i.test(e))
  return { len, boundary, loading, errors: real, title: win.document.title }
}

const run = async () => {
  let fails = 0
  for (const r of ROUTES) {
    let res
    try {
      res = await runRoute(r)
    } catch (e) {
      console.log(`FAIL ${r.padEnd(24)} threw: ${e.message}`)
      fails++
      continue
    }
    const bad = res.boundary || res.errors.length || res.len < 400
    if (bad) fails++
    console.log(`${bad ? 'FAIL' : 'PASS'} ${r.padEnd(24)} html=${String(res.len).padStart(6)} title="${res.title.slice(0, 44)}"`)
    res.errors.slice(0, 5).forEach((e) => console.log('     ' + e.slice(0, 300)))
  }
  console.log(`\n${ROUTES.length - fails}/${ROUTES.length} routes clean`)
  process.exit(fails ? 1 : 0)
}

run()
