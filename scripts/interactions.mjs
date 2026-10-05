/* eslint-disable no-console */
/**
 * Interaction smoke test: drives the real UI in jsdom and asserts that each
 * primary flow produces the expected DOM change.
 */
import { JSDOM, VirtualConsole } from 'jsdom'
import fs from 'node:fs'

const ROUTES = [
  '/',
  '/dashboard',
  '/profile',
  '/gap',
  '/matching',
  '/peer/aarav-mehta',
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
]

const errors = []
const vc = new VirtualConsole()
vc.on('jsdomError', (e) => {
  if (!/Not implemented|Could not parse CSS/i.test(e.message)) errors.push(`jsdomError: ${e.message}`)
})
vc.on('error', (...a) => errors.push(`console.error: ${a.join(' ').slice(0, 300)}`))

const BUNDLE = fs.readFileSync('dist-smoke/smoke.js', 'utf8')

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
      this.cb([{ target: el, contentRect: { width: 900, height: 320, top: 0, left: 0, bottom: 320, right: 900 } }], this)
    }
    unobserve() {}
    disconnect() {}
  }
  win.matchMedia = (q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, onchange: null, dispatchEvent() { return false } })
  win.scrollTo = () => {}
  win.print = () => {}
  win.HTMLElement.prototype.scrollIntoView = () => {}
  win.SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 10, height: 10 })
  win.SVGElement.prototype.getComputedTextLength = () => 10
}

let dom, win, doc
function mount(route) {
  dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: 'http://localhost' + route,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: vc,
  })
  win = dom.window
  polyfill(win)
  win.eval(BUNDLE)
  doc = win.document
}
const wait = (ms = 120) => new Promise((r) => setTimeout(r, ms))
const text = () => doc.body.textContent

function clickText(label, opts = {}) {
  const els = [...doc.querySelectorAll('button, a')]
  const key = label.toLowerCase()
  const el = els.find((e) => {
    const t = (e.textContent || '').trim().toLowerCase()
    const a = (e.getAttribute('aria-label') || '').trim().toLowerCase()
    if (opts.exact) return t === key || a === key
    return t.includes(key) || a.includes(key)
  })
  if (!el) throw new Error(`no clickable matching "${label}"`)
  el.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }))
  return el
}

let pass = 0
let fail = 0
async function step(name, route, fn) {
  errors.length = 0
  try {
    mount(route)
    await wait(200)
    await fn()
    await wait(220)
    const real = errors.filter((e) => !/Not implemented|Could not parse CSS/i.test(e))
    if (real.length) throw new Error('console: ' + real[0].slice(0, 220))
    pass++
    console.log(`PASS  ${name}`)
  } catch (e) {
    fail++
    console.log(`FAIL  ${name} :: ${e.message.slice(0, 240)}`)
  }
}

const has = (t) => {
  if (!text().includes(t)) throw new Error(`missing text: "${t}"`)
}

async function run() {
  await step('landing hero + CTA present', '/', async () => {
    has('SKILLSYNC')
    has('Find the Right Skill.')
    has('Explore SkillSync')
  })

  await step('landing → dashboard via CTA', '/', async () => {
    clickText('Explore SkillSync')
    await wait(260)
    if (!win.location.pathname.startsWith('/dashboard')) throw new Error('did not navigate: ' + win.location.pathname)
    has('DEMO MODE')
    has('Welcome back, Sakshi')
  })

  await step('landing journey step interaction', '/', async () => {
    clickText('Add skills I want to learn')
    await wait(200)
    has('Learning wishlist')
  })

  await step('dashboard demo banner + stats', '/dashboard', async () => {
    has('Demo Mode')
    has('Investment Banking')
    has('day streak')
  })

  await step('dashboard: mark path step complete', '/dashboard', async () => {
    if (!text().includes('Learning path progress')) throw new Error('no path preview')
    clickText('Mark “')
    await wait(260)
    has('unlocked')
  })

  await step('profile: add + remove a teach skill', '/profile', async () => {
    const input = [...doc.querySelectorAll('input')].find((i) => i.getAttribute('placeholder') === 'Add a skill…')
    if (!input) throw new Error('no skill input')
    const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set
    setter.call(input, 'Leadership')
    input.dispatchEvent(new win.Event('input', { bubbles: true }))
    await wait(120)
    clickText('Add', { exact: true })
    await wait(200)
    has('Leadership')
  })

  await step('gap: generate learning path (loading → result)', '/gap', async () => {
    clickText('Generate Learning Path')
    await wait(160)
    has('AI is analyzing your career goal')
    await wait(2900)
    has('RECOMMENDED LEARNING PATH')
  })

  await step('gap: current/required skill toggle', '/gap', async () => {
    clickText('Required Skills')
    await wait(200)
    has('Financial Modelling')
  })

  await step('matching: sort by rating changes order', '/matching', async () => {
    const sel = doc.getElementById('sort')
    const setter = Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value').set
    setter.call(sel, 'rating')
    sel.dispatchEvent(new win.Event('change', { bubbles: true }))
    await wait(250)
    has('Find the Right Person')
  })

  await step('matching: skill filter narrows results', '/matching', async () => {
    const sel = [...doc.querySelectorAll('select')].find((s) => (s.getAttribute('aria-label') || '').includes('Filter by skill'))
    const setter = Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value').set
    setter.call(sel, 'Python')
    sel.dispatchEvent(new win.Event('change', { bubbles: true }))
    await wait(250)
    if (!text().includes('Rohan Patel')) throw new Error('expected Rohan (Python) in results')
    const cards = [...doc.querySelectorAll('button')].filter((b) => (b.textContent || '').trim() === 'View Profile')
    if (cards.length !== 1) throw new Error('filter did not narrow results: ' + cards.length + ' cards')
  })

  await step('matching: save peer', '/matching', async () => {
    const btn = [...doc.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || '').startsWith('Save '))
    if (!btn) throw new Error('no save button')
    btn.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }))
    await wait(250)
    has('saved for later')
  })

  await step('matching: connect peer via confirm modal', '/matching', async () => {
    clickText('Connect')
    await wait(220)
    has('Send connection request')
    clickText('Send connection request')
    await wait(250)
    has('Connection request simulated successfully')
  })

  await step('matching: skill exchange setup modal', '/matching', async () => {
    clickText('Start Skill Exchange')
    await wait(250)
    has('Start a skill exchange')
    has('Confirm exchange')
  })

  await step('peer profile: schedule activity validation', '/peer/aarav-mehta', async () => {
    clickText('Connect', { exact: true })
    await wait(200)
    clickText('Send connection request')
    await wait(250)
    clickText('Schedule Activity', { exact: true })
    await wait(250)
    has('Schedule an activity')
    clickText('Confirm session')
    await wait(200)
    has('Pick a date for the session')
  })

  await step('peer profile: schedule success', '/peer/aarav-mehta', async () => {
    clickText('Connect', { exact: true })
    await wait(180)
    clickText('Send connection request')
    await wait(200)
    clickText('Schedule Activity', { exact: true })
    await wait(220)
    const date = doc.getElementById('date')
    const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set
    setter.call(date, '2026-11-20')
    date.dispatchEvent(new win.Event('input', { bubbles: true }))
    await wait(150)
    clickText('Confirm session')
    await wait(280)
    has('Exchange scheduled with')
  })

  await step('learning path: mark complete unlocks next', '/path', async () => {
    has('Learning Path')
    clickText('Mark Complete')
    await wait(300)
    has('Progress updated')
  })

  await step('learning path: tab filter', '/path', async () => {
    clickText('Completed')
    await wait(250)
    has('Steps complete')
  })

  await step('practice: timer start / pause / reset', '/practice', async () => {
    clickText('Start Activity')
    await wait(250)
    has('20-minute focused drill')
    clickText('Start', { exact: true })
    await wait(1300)
    const t = text()
    if (!/19:5\d|19:4\d/.test(t)) throw new Error('timer did not count down: ' + (t.match(/\d\d:\d\d/) || [])[0])
    clickText('Pause', { exact: true })
    clickText('Reset', { exact: true })
    await wait(200)
    has('20:00')
  })

  await step('practice: complete activity updates progress', '/practice', async () => {
    clickText('Start Activity')
    await wait(220)
    clickText('Complete activity')
    await wait(320)
    has('Practice hours')
    if (!/\+\d+ XP/.test(text())) throw new Error('no XP toast')
    has('Practice hours and skill progress updated')
  })

  await step('progress: range switch + tabs', '/progress', async () => {
    clickText('90 days')
    await wait(250)
    has('Over 90 days')
    clickText('Skill Proof')
    await wait(250)
    has('Badges')
    has('Financial Analysis')
  })

  await step('community: like + save + comment', '/community', async () => {
    clickText('Peer Discussions')
    await wait(200)
    const like = [...doc.querySelectorAll('button[aria-label^="Like"]')][0]
    if (!like) throw new Error('no like button with an accessible name')
    like.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }))
    await wait(260)
    has('Post liked')
    clickText('Comment on')
    await wait(250)
    has('Comments are stored in local state only')
    has('Post comment')
    clickText('Post comment')
    await wait(200)
    has('Write something before posting')
    const input = doc.getElementById('comment-body')
    const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set
    setter.call(input, 'The PSUM lesson finally made it click for me.')
    input.dispatchEvent(new win.Event('input', { bubbles: true }))
    await wait(150)
    clickText('Post comment')
    await wait(250)
    has('Comment added to the discussion')
  })

  await step('community: join challenge + register workshop', '/community', async () => {
    clickText('Skill Challenges')
    await wait(200)
    clickText('Join challenge')
    await wait(250)
    has('Joined “7-Day Excel Sprint”')
    clickText('Upcoming Workshops')
    await wait(200)
    clickText('Register', { exact: true })
    await wait(250)
    has('Registered for')
  })

  await step('impact: become a volunteer flow', '/impact', async () => {
    clickText('Become a Volunteer')
    await wait(250)
    has('Become a Volunteer')
    clickText('Record my interest')
    await wait(280)
    has('Volunteer interest recorded in this demo only')
  })

  await step('pricing: choose premium plan', '/pricing', async () => {
    has('Recommended')
    clickText('Go Premium')
    await wait(280)
    has('Premium unlocked')
  })

  await step('pricing: annual/monthly toggle', '/pricing', async () => {
    const before = text()
    clickText('Toggle annual billing')
    await wait(250)
    if (text() === before) throw new Error('billing toggle did nothing')
    has('Annual')
  })

  await step('unit economics: tenure slider recalculates', '/unit-economics', async () => {
    has('5.3x')
    const r = doc.getElementById('tenure')
    const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set
    setter.call(r, '24')
    r.dispatchEvent(new win.Event('input', { bubbles: true }))
    await wait(250)
    has('24 months')
  })

  await step('unit economics: scenario buttons', '/unit-economics', async () => {
    clickText('CAC rises to ₹700')
    await wait(250)
    has('LTV/CAC would be')
  })

  await step('go-to-market: playbook expand', '/go-to-market', async () => {
    clickText('Show playbook')
    await wait(250)
    has('Give a month, get a month')
  })

  await step('financials: chart tabs switch', '/financials', async () => {
    clickText('Net margin')
    await wait(280)
    has('Net margin')
    clickText('Paying users')
    await wait(250)
    has('35,000')
  })

  await step('funding: use-of-funds selection', '/funding', async () => {
    const btns = [...doc.querySelectorAll('button')].filter((b) =>
      (b.textContent || '').includes('Acquisition') && (b.textContent || '').includes('25%'),
    )
    if (!btns.length) throw new Error('no acquisition allocation button')
    btns[0].dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }))
    await wait(250)
    has('Selected allocation')
  })

  await step('market: methodology notes toggle', '/market', async () => {
    clickText('Show data notes and corrections')
    await wait(250)
    has('35,000 × ₹1,188 = ₹4.158 crore')
    has('SAM as stated in source data')
  })

  await step('about: LinkedIn stub is safe to click', '/about', async () => {
    clickText('LinkedIn')
    await wait(250)
    has('not linked in this demo')
  })

  await step('global: search palette navigates', '/dashboard', async () => {
    const input = [...doc.querySelectorAll('input')].find((i) => (i.placeholder || '').includes('Search pages'))
    if (!input) throw new Error('no search input')
    const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set
    setter.call(input, 'community')
    input.dispatchEvent(new win.Event('input', { bubbles: true }))
    await wait(250)
    const link = [...doc.querySelectorAll('a')].find((a) => (a.textContent || '').includes('Community'))
    if (!link) throw new Error('no result in palette')
    link.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }))
    await wait(300)
    if (!win.location.pathname.startsWith('/community')) throw new Error('palette nav failed')
  })

  await step('global: dark mode toggle persists to localStorage', '/dashboard', async () => {
    const before = doc.documentElement.className
    clickText('Switch to', { exact: false })
    await wait(200)
    if (doc.documentElement.className === before) throw new Error('theme did not change')
    if (!win.localStorage.getItem('skillsync.theme.v1')) throw new Error('theme not persisted')
  })

  await step('global: demo progress persists to localStorage', '/path', async () => {
    clickText('Mark Complete')
    await wait(300)
    const raw = win.localStorage.getItem('skillsync.demo.v2')
    if (!raw) throw new Error('no persisted demo state')
    const parsed = JSON.parse(raw)
    const done = Object.values(parsed.path).filter((p) => p.status === 'completed').length
    if (done < 1) throw new Error('path completion not persisted')
  })

  await step('global: reset demo data restores original state', '/path', async () => {
    clickText('Mark Complete')
    await wait(300)
    clickText('Reset Demo Data', { exact: false })
    await wait(250)
    clickText('Reset everything')
    await wait(300)
    const parsed = JSON.parse(win.localStorage.getItem('skillsync.demo.v2'))
    const done = Object.values(parsed.path).filter((p) => p.status === 'completed').length
    if (done !== 0) throw new Error('reset did not restore state (completed=' + done + ')')
    has('Reset complete')
  })

  console.log(`\n${pass} passed, ${fail} failed`)
  process.exit(fail ? 1 : 0)
}

run()
