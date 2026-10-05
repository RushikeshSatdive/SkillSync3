import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Moon,
  MousePointerClick,
  Rocket,
  Sparkles,
  Sun,
  Users,
  X,
} from 'lucide-react'
import Logo from '../components/Logo'
import NetworkVisual from '../components/landing/NetworkVisual'
import Icon from '../components/Icon'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { Badge, Button, Card, Chip, SectionHeading, SourceNote, Tooltip } from '../components/ui/primitives'
import { ScrollProgress } from '../components/ui/Navigation'
import { usePrefs } from '../store/AppStore'
import {
  COMPARISON,
  FOOTER,
  JOURNEY_STEPS,
  PROBLEM_CARDS,
  SKILLSYNC_THESIS,
  SOURCE_CITATION,
  SOURCE_STATS,
} from '../data/mockData'

/* ============================================================== NAV */

const LINKS = [
  { id: 'problem', label: 'Problem' },
  { id: 'why', label: 'Why SkillSync' },
  { id: 'how', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
]

function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('problem')
  const { theme, toggleTheme } = usePrefs()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const obs = ['problem', 'why', 'how', 'pricing']
      let cur = obs[0]
      for (const id of obs) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-line shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1200px] h-16 sm:h-[72px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="SkillSync home">
          <Logo size={32} />
          <span className="text-[18px] font-extrabold tracking-tight text-ink leading-none">
            Skill<span className="grad-text">Sync</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Landing sections">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className={`relative px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                active === l.id ? 'text-brand' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] grad-brand rounded-full" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="grid size-9 place-items-center rounded-lg text-ink-2 hover:bg-surface-2 transition-colors"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Button
            variant="primary"
            size="sm"
            icon={Rocket}
            onClick={() => navigate('/dashboard')}
            className="hidden sm:inline-flex"
          >
            Explore SkillSync
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden grid size-9 place-items-center rounded-lg text-ink-2 hover:bg-surface-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-line px-4 py-3 animate-[pop_0.2s_ease-out]">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile landing sections">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="px-3 py-2.5 rounded-lg text-[14px] font-semibold text-ink-2 hover:bg-surface-2"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                navigate('/dashboard')
              }}
              className="mt-2 h-11 rounded-xl grad-brand text-white text-[14px] font-bold"
            >
              Explore SkillSync
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

/* ============================================================== HERO */

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[720px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_68%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line glass px-3 py-1.5 mb-6">
              <Sparkles size={13} className="text-brand" />
              <span className="text-[12px] font-semibold text-ink-2">AI-powered skill development network</span>
              <span className="size-1 rounded-full bg-muted/40" />
              <span className="text-[11px] font-bold text-accent">Demo prototype</span>
            </div>

            <h1 className="text-[38px] sm:text-[52px] lg:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.04] text-ink">
              SKILLSYNC
            </h1>

            <p className="mt-4 text-[19px] sm:text-[24px] font-bold leading-[1.3] tracking-tight">
              Find the Right Skill.
              <br className="hidden sm:block" /> Find the Right Person.
              <br className="hidden sm:block" /> Build the Right Career.
            </p>

            <p className="mt-5 text-[15px] sm:text-[16px] text-ink-2 leading-relaxed max-w-xl">
              An AI-powered skill development network that helps students identify skill gaps, connect with the
              right peers, exchange skills and progress toward their career goals.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" icon={Rocket} onClick={() => navigate('/dashboard')}>
                Explore SkillSync
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={MousePointerClick}
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted">
              {['No login required', 'Frontend-only demo', 'Resets any time'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-accent" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.18),rgba(168,85,247,0.14),rgba(45,212,191,0.16),rgba(99,102,241,0.18))] blur-2xl animate-spin-slow" />
            <div className="relative card p-4 sm:p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-rose/70" />
                  <span className="size-2.5 rounded-full bg-amber/70" />
                  <span className="size-2.5 rounded-full bg-accent/70" />
                </div>
                <span className="text-[10.5px] font-bold text-muted tracking-wide">SKILLSYNC NETWORK</span>
              </div>
              <NetworkVisual />
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { k: 'Match', v: '94%' },
                  { k: 'Path steps', v: '7' },
                  { k: 'Practice', v: '20m' },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-surface-2 border border-line px-3 py-2 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{s.k}</p>
                    <p className="text-[15px] font-extrabold tnum text-ink">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ PROBLEM */

function ProblemSection() {
  return (
    <section id="problem" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="The problem"
          title={
            <>
              Students Don't Have a Learning Problem.
              <br className="hidden sm:block" /> They Have a{' '}
              <span className="grad-text">Matching Problem.</span>
            </>
          }
          description="Content is abundant. Structure is rare. What students actually lack is a clear read on their own gap, and access to the one person who can close it."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {PROBLEM_CARDS.map((p) => (
            <Card key={p.id} hover className="p-5 group relative overflow-hidden">
              <div className="absolute -top-12 -right-12 size-28 rounded-full bg-brand/5 blur-2xl group-hover:bg-brand/10 transition-all duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={p.icon} size={19} />
                  </span>
                  <span className="text-[28px] font-extrabold text-line-strong leading-none">{p.n}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-ink">{p.headline}</h3>
                <p className="mt-0.5 text-[12px] font-semibold text-muted">{p.title}</p>
                <p className="mt-2.5 text-[13px] text-ink-2 leading-relaxed">{p.body}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {SOURCE_STATS.map((s) => (
            <Card key={s.id} className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 grad-brand opacity-80" />
              <p className="text-[38px] sm:text-[44px] font-extrabold tracking-tight tnum grad-text leading-none">
                <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[13.5px] font-semibold text-ink leading-snug">{s.label}</p>
              <Badge tone="accent" size="xs" className="mt-3">
                Actual · {s.tag}
              </Badge>
            </Card>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <SourceNote tone="accent" className="max-w-lg">
            Source: {SOURCE_CITATION}. These are reported national figures, not SkillSync estimates.
          </SourceNote>
        </div>
      </div>
    </section>
  )
}

/* =============================================================== WHY */

function WhySection() {
  return (
    <section id="why" className="relative py-20 sm:py-24 scroll-mt-20 bg-bg-alt/50 border-y border-line">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Positioning"
          title="Why SkillSync"
          description="Every option above solves a real piece of the problem. SkillSync is built for the layer none of them cover: personalised skill development that connects discovery, matching and progress."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {COMPARISON.map((c) => {
            const IconCmp = Icon
            return (
              <Card key={c.kind} className="p-5 flex flex-col relative">
                <span className="grid size-10 place-items-center rounded-xl bg-surface-3 text-ink-2">
                  <IconCmp name={c.icon} size={18} />
                </span>
                <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">{c.title}</p>
                <p className="mt-1 text-[13.5px] font-bold text-ink leading-snug">{c.examples}</p>
                <div className="mt-3 flex items-center gap-2 text-brand">
                  <ArrowRight size={13} />
                  <span className="text-[13px] font-extrabold">{c.delivers}</span>
                </div>
                <ul className="mt-3.5 pt-3.5 border-t border-line space-y-1.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="text-[12px] text-muted flex items-start gap-1.5">
                      <span className="mt-1.5 size-1 rounded-full bg-line-strong shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        <Card className="mt-6 p-6 sm:p-8 relative overflow-hidden grad-brand text-white border-transparent shadow-lg">
          <div className="absolute inset-0 opacity-25 grid-bg" />
          <div className="relative grid md:grid-cols-[1.1fr_1.4fr] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                {SKILLSYNC_THESIS.note}
              </span>
              <h3 className="mt-3 text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-tight">
                {SKILLSYNC_THESIS.title}
              </h3>
              <p className="mt-2 text-[15px] text-white/85">{SKILLSYNC_THESIS.delivers}</p>
              <p className="mt-4 text-[12.5px] text-white/60 max-w-sm leading-relaxed">
                To be clear: these tools personalise. Courses adapt difficulty, mentors tailor advice, networks rank
                relevance. The difference is the loop — SkillSync is the only one where a stated career goal produces a
                gap, the gap produces a person, and the person produces proof.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SKILLSYNC_THESIS.pillars.map((p, i) => (
                <div
                  key={p}
                  className="rounded-2xl bg-white/12 border border-white/20 p-4 text-center backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <span className="text-[11px] font-bold text-white/60">0{i + 1}</span>
                  <p className="mt-1.5 text-[15px] font-extrabold tracking-tight">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

/* =========================================================== HOW IT WORKS */

function HowItWorks() {
  const [step, setStep] = useState(0)
  const s = JOURNEY_STEPS[step]
  const IconCmp = Icon

  return (
    <section id="how" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="The journey"
          title="How SkillSync Works"
          description="Eight steps, from an empty profile to a verified skill record. Click any step to see what happens."
        />

        <div className="mt-12 card p-4 sm:p-6 lg:p-8">
          {/* connector */}
          <div className="hidden lg:block relative mb-8">
            <div className="absolute left-0 right-0 top-[26px] h-[2px] bg-surface-3 rounded-full" />
            <div
              className="absolute left-0 top-[26px] h-[2px] grad-brand rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / (JOURNEY_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" aria-label="Eight-step journey">
            {JOURNEY_STEPS.map((j, i) => {
              const StepIcon = IconCmp
              const active = i === step
              const passed = i < step
              return (
                <li key={j.id} className="relative">
                  <button
                    onClick={() => setStep(i)}
                    aria-current={active ? 'step' : undefined}
                    className="group w-full flex lg:flex-col items-start lg:items-center gap-2.5 lg:gap-2 text-left lg:text-center"
                  >
                    <span
                      className={`relative grid size-[52px] shrink-0 place-items-center rounded-2xl border-2 transition-all duration-300 ${
                        active
                          ? 'grad-brand text-white border-transparent scale-105 shadow-[0_10px_24px_-8px_rgba(79,70,229,0.7)]'
                          : passed
                            ? 'bg-brand-soft text-brand border-brand/30'
                            : 'bg-surface-2 text-muted border-line group-hover:border-line-strong group-hover:text-ink-2'
                      }`}
                    >
                      <StepIcon name={j.icon} size={19} strokeWidth={2.2} />
                      <span
                        className={`absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full text-[9.5px] font-extrabold transition-colors ${
                          active ? 'bg-accent text-white' : passed ? 'bg-brand text-white' : 'bg-surface-3 text-muted'
                        }`}
                      >
                        {j.id}
                      </span>
                    </span>
                    <span
                      className={`text-[12.5px] font-bold leading-tight transition-colors ${
                        active ? 'text-brand' : 'text-ink-2 group-hover:text-ink'
                      }`}
                    >
                      {j.title}
                    </span>
                    <span className="text-[11px] text-muted hidden lg:block">{j.time}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="mt-7 grid md:grid-cols-[1.4fr_1fr] gap-4 animate-[pop_0.3s_ease-out]" key={step}>
            <div className="rounded-2xl bg-surface-2 border border-line p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge tone="brand">Step {s.id}</Badge>
                <Chip tone="accent" icon={Check}>
                  {s.output}
                </Chip>
              </div>
              <h4 className="text-[19px] font-bold text-ink tracking-tight">{s.title}</h4>
              <p className="mt-2 text-[13.5px] text-ink-2 leading-relaxed">{s.detail}</p>
            </div>
            <div className="rounded-2xl bg-surface-2 border border-line p-5 flex flex-col justify-between">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">Output</p>
                <p className="mt-1.5 text-[15px] font-bold text-ink leading-snug">{s.output}</p>
                <p className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">Time</p>
                <p className="mt-1 text-[13px] font-semibold text-ink-2">{s.time}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={step === 0}
                  onClick={() => setStep((v) => Math.max(0, v - 1))}
                  aria-label="Previous step"
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  className="flex-1"
                  disabled={step === JOURNEY_STEPS.length - 1}
                  onClick={() => setStep((v) => Math.min(JOURNEY_STEPS.length - 1, v + 1))}
                  iconRight={ArrowRight}
                >
                  Next step
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ======================================================= PRODUCT TEASER */

function ProductTeaser() {
  const navigate = useNavigate()
  return (
    <section className="relative py-20 sm:py-24 bg-bg-alt/50 border-y border-line">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Inside the product"
          title="A working demo, not a mockup"
          description="Every page, filter, timer, chart and button in this build is functional. Progress is saved to your browser and can be reset at any time."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {[
            { icon: LayoutDashboard, title: 'Student Dashboard', body: 'Goal, gap, match, progress and streak in one view.', to: '/dashboard' },
            { icon: Sparkles, title: 'AI Skill Gap', body: 'Current vs required skill levels with a generated path.', to: '/gap' },
            { icon: Users, title: 'Peer Matching', body: 'Filters, sorting, save and connect across six peers.', to: '/matching' },
            { icon: BadgeCheck, title: 'Skill Proof', body: 'Certificates and badges built from completed work.', to: '/progress' },
          ].map((c) => {
            const I = c.icon
            return (
              <Link key={c.title} to={c.to} className="group">
                <Card hover className="p-5 h-full">
                  <span className="grid size-10 place-items-center rounded-xl grad-brand text-white">
                    <I size={18} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] text-ink-2 leading-relaxed">{c.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand group-hover:gap-2.5 transition-all">
                    Open <ArrowRight size={13} />
                  </span>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="primary" size="lg" icon={Rocket} onClick={() => navigate('/dashboard')}>
            Explore SkillSync
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ================================================================ CTA */

function FinalCTA() {
  const navigate = useNavigate()
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(139,92,246,0.18),transparent_62%)]" />
      <div className="relative mx-auto max-w-[900px] px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-3.5 py-1.5 text-[12px] font-bold text-brand">
          <Sparkles size={13} />
          Frontend-only demo prototype
        </span>
        <h2 className="mt-5 text-[30px] sm:text-[44px] font-extrabold tracking-tight leading-[1.1] text-ink">
          Find the Right Skill.
          <br className="sm:hidden" /> Find the Right Person.
          <br className="hidden sm:block" /> Build the Right Career.
        </h2>
        <p className="mt-5 text-[15px] text-ink-2 leading-relaxed max-w-xl mx-auto">
          No login, no signup, no backend. Open the demo dashboard and use every feature end to end.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" icon={Rocket} onClick={() => navigate('/dashboard')}>
            Explore SkillSync
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={MousePointerClick}
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ============================================================= FOOTER */

function LandingFooter() {
  const { theme, toggleTheme } = usePrefs()
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={30} />
              <span className="text-[17px] font-extrabold tracking-tight text-ink">
                Skill<span className="grad-text">Sync</span>
              </span>
            </div>
            <p className="mt-3 text-[13.5px] text-ink-2 italic leading-relaxed max-w-xs">
              “{FOOTER.tagline}”
            </p>
            <p className="mt-4 text-[12px] text-muted">© {FOOTER.year} SkillSync</p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-amber-soft px-2 py-1 text-[11px] font-bold text-amber">
              {FOOTER.notice}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Product</p>
            <ul className="mt-3 space-y-2">
              {[
                ['Dashboard', '/dashboard'],
                ['Skill Gap Analysis', '/gap'],
                ['Peer Matching', '/matching'],
                ['Learning Path', '/path'],
                ['Community', '/community'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-[13px] text-ink-2 hover:text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Business</p>
            <ul className="mt-3 space-y-2">
              {[
                ['Pricing', '/pricing'],
                ['Market Opportunity', '/market'],
                ['Unit Economics', '/unit-economics'],
                ['Financials', '/financials'],
                ['About SkillSync', '/about'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-[13px] text-ink-2 hover:text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11.5px] text-muted leading-relaxed max-w-xl">
            Figures shown across this product are labelled by provenance: actual source data, illustrative
            examples, future targets or founder proposals. Nothing here represents reported traction.
          </p>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border border-line text-[12.5px] font-semibold text-ink-2 hover:bg-surface-2 transition-colors"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </footer>
  )
}

/* =============================================================== PAGE */

export default function Landing() {
  useEffect(() => {
    document.title = 'SkillSync — Find the Right Skill. Find the Right Person.'
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />
      <LandingNav />
      <main>
        <Hero />
        <ProblemSection />
        <WhySection />
        <HowItWorks />
        <ProductTeaser />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  )
}

