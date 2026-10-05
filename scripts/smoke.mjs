/* eslint-disable no-console */
import puppeteer from 'puppeteer'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const OUT = process.env.OUT ?? '/home/user/skillsync/.smoke'

const ROUTES = [
  '/',
  '/dashboard',
  '/profile',
  '/gap',
  '/matching',
  '/peer/aarav-mehta',
  '/peer/priya-shah',
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
  '/totally-missing-page',
]

const IGNORE = [
  /favicon/i,
  /Failed to load resource/i,
  /Download the React DevTools/i,
]

function ok(errors) {
  return errors.filter((e) => !IGNORE.some((r) => r.test(e)))
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  let failures = 0

  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 1000 })
    const errors = []
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`)
    })
    page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))

    let status = '?'
    try {
      const res = await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 30000 })
      status = res?.status()
      await new Promise((r) => setTimeout(r, 700))

      // basic sanity: root must not be empty
      const rootHtml = await page.$eval('#root', (el) => el.innerHTML.length).catch(() => 0)
      const h1 = await page.$eval('h1, h2', (el) => el.textContent.trim()).catch(() => '')
      const hasErrorUI = await page
        .$eval('body', (b) => b.innerText.includes('Something went wrong'))
        .catch(() => false)

      const real = ok(errors)
      const bad = real.length > 0 || rootHtml < 500 || hasErrorUI || status !== 200
      if (bad) failures++
      console.log(
        `${bad ? 'FAIL' : 'PASS'} ${String(status).padEnd(4)} ${route.padEnd(26)} root=${String(rootHtml).padStart(6)} h="${(h1 || '').slice(0, 40)}"${hasErrorUI ? ' ERROR-BOUNDARY' : ''}`,
      )
      if (real.length) real.slice(0, 8).forEach((e) => console.log('      ' + e.slice(0, 260)))
    } catch (e) {
      failures++
      console.log(`FAIL ${route} :: ${e.message}`)
    }

    if (!process.env.NO_SHOT && !route.startsWith('/peer/') && route !== '/totally-missing-page') {
      const name = route === '/' ? 'landing' : route.replace(/\//g, '_').replace(/^_/, '')
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
    }
    await page.close()
  }

  await browser.close()
  console.log(`\n${ROUTES.length - failures}/${ROUTES.length} routes clean`)
  process.exit(failures ? 1 : 0)
}

run()
