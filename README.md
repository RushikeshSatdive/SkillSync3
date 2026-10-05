# SkillSync

**Find the Right Skill. Find the Right Person. Build the Right Career.**

An AI-powered skill development network that helps students identify skill gaps,
connect with the right peers, exchange skills and progress toward career goals.

Frontend-only interactive prototype — **no backend, no authentication, no database,
no API keys, no network calls.** All state lives in React and `localStorage`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## What's in it

| Route | Page | What works |
|---|---|---|
| `/` | Landing | Hero + animated network visual, problem cards, animated stat counters, comparison, interactive 8-step journey, dark/light toggle |
| `/dashboard` | Student Dashboard | Demo banner, goal/gap/match/progress cards, gap bars, weekly + sessions charts, path preview, top-match card |
| `/profile` | Skill Profile | Add/remove teach & learn skills, career goal, preferences, completeness meter |
| `/gap` | AI Skill Gap Analysis | Current vs required, radar map, gap bars with target markers, **simulated** "Generate Learning Path" with a loading console |
| `/matching` | Peer Matching | 5 filters, sort dropdown, search, save, connect, empty state + **skill exchange** setup |
| `/peer/:id` | Peer Profile | Match ring + breakdown, skills exchange, history, connect, schedule activity, simulated messaging |
| `/path` | Learning Path | 7 steps with status/progress/lessons, expandable, mark complete, unlocks next step |
| `/practice` | Practice Activities | 5 × 20-minute drills, working countdown timer (start / pause / reset / complete) |
| `/progress` | Progress & Skill Proof | Readiness ring, 4 Recharts charts with 7/30/90-day filters, certificates, badges |
| `/community` | Community | Trending skills, career goals, challenges, posts (like / comment / save), workshops |
| `/impact` | Social Impact | Animated metric cards, audiences, safeguarding, simulated volunteer flow |
| `/pricing` | Pricing | Free ₹0 / Premium ₹99 · monthly-annual toggle, comparison table, 10% commission layer |
| `/market` | Market Opportunity | TAM ₹5,144 cr · SAM ₹1,029 cr · **SOM ₹4.158 cr**, methodology disclosure |
| `/unit-economics` | Unit Economics | Interactive tenure calculator, contribution waterfall, LTV vs CAC, 5.3x gauge, stress tests |
| `/go-to-market` | Go-To-Market | 8 channels with playbooks, 5,000 / 1,500 / 500 funnel, campus targets |
| `/financials` | Financial Projections | 3-year model, 4 switchable charts, expense breakdown, break-even |
| `/funding` | Funding | ₹25 lakh for 10%, pre/post-money derivation, use-of-funds allocation |
| `/about` | About | Story, principles, team, full data-provenance map |

## Data integrity

Every figure is labelled by provenance and never dressed up as traction.

- **Actual / source data** — AISHE 2021–22 enrolment (4.33 crore) and GER (28.4%); India Skills Report 2025 employability (54.81%).
- **Illustrative** — the 94% match score, social-impact targets, financial projections, LTV/CAC, market assumptions.
- **Future targets** — 100 campuses, 25 partnerships, the 5,000 / 1,500 / 500 funnel.
- **Proposed** — ₹99/month pricing, 10% commission, funding assumptions.

Source figures live in [`src/data/mockData.js`](src/data/mockData.js) with a header
comment marking the deck slide each number came from.

## Demo mode

There is no login. A **Demo Mode** banner sits at the top of the dashboard with a
**Reset Demo Data** action (also in the sidebar) that restores all seed state.
Progress, connections, saved peers, likes, comments and scheduled exchanges persist
to `localStorage` under `skillsync.demo.v2`.

## Tests

```bash
node scripts/make-eager.mjs                     # generate eager-import App for headless render
npx vite build --config smoke.vite.config.js    # single-file IIFE bundle
node scripts/smoke-jsdom.mjs                     # 21 routes render without errors
node scripts/interactions.mjs                    # 36 end-to-end interaction flows
```

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · Recharts 3 · lucide-react
