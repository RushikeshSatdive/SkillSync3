import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,

  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

import Logo from '../components/Logo'
import { Badge, Button, Card, Chip, SectionHeading, SourceNote, toneOf } from '../components/ui/primitives'
import Icon from '../components/Icon'
import { useApp } from '../store/AppStore'
import { ABOUT_PILLARS, DATA_INTEGRITY, FOOTER, TEAM } from '../data/mockData'

/** Inline LinkedIn mark — lucide-react v1 no longer ships brand icons. */
function LinkedInMark({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  )
}

export default function About() {
  const { toast } = useApp()

  useEffect(() => {
    document.title = 'About SkillSync'
  }, [])

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-16 bottom-[-100px] size-64 rounded-full bg-[#2dd4bf]/20 blur-3xl" />
        <div className="relative px-6 py-14 sm:px-10 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-2xl bg-white/12 border border-white/20 px-4 py-2">
            <Logo size={26} />
            <span className="text-[15px] font-extrabold tracking-tight">SkillSync</span>
          </span>
          <h2 className="mt-6 text-[30px] sm:text-[44px] font-extrabold tracking-tight leading-[1.08] max-w-3xl mx-auto">
            Find the Right Skill. Find the Right Person. Build the Right Career.
          </h2>
          <p className="mt-5 text-[15px] sm:text-[16px] text-white/80 leading-relaxed max-w-2xl mx-auto">
            We are two students who kept watching classmates buy courses they never finished, for skills they did not need,
            from people who already knew the answer two desks away.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Chip className="!bg-white/12 !text-white !border !border-white/25 !text-[12px] !py-1.5 !px-3">
              Demo Prototype | Frontend Only
            </Chip>
            <Chip className="!bg-white/12 !text-white !border !border-white/25 !text-[12px] !py-1.5 !px-3">
              © {FOOTER.year} SkillSync
            </Chip>
          </div>
        </div>
      </section>

      {/* story */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <Card className="p-6 sm:p-8">
          <SectionHeading eyebrow="Why we started" title="The person was already there" />
          <div className="mt-5 space-y-4 text-[14px] text-ink-2 leading-relaxed">
            <p>
              A commerce student two years behind her target job did not need a ₹15,000 course on financial modelling.
              She needed a peer three weeks ahead of her who could walk her through one linked three-statement model on a
              Tuesday evening. That peer was in her own college. Nobody had introduced them.
            </p>
            <p>
              The gap is not content, and it is not effort. It is that <span className="font-semibold text-ink">nobody
              translates a career goal into a specific, nameable skill gap</span>, and then translates that gap into a
              specific person. That double translation is the entire product.
            </p>
            <p>
              SkillSync is built on a deliberately boring insight: <span className="font-semibold text-ink">students teach
              better than they consume</span>. Once someone is teaching financial analysis to make progress on digital
              marketing, their own understanding of financial analysis sharpens. Learning and proof become the same
              action.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-surface-2 border border-line p-5">
            <Quote size={22} className="text-brand" />
            <p className="mt-2 text-[15px] font-semibold text-ink italic leading-relaxed">
              “There is no shortage of people who know this. There is only a shortage of ways to find them.”
            </p>
            <p className="mt-2 text-[12px] text-muted">— Sakshi Jadhav, Founder</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-ink">What we believe</h3>
          <ul className="mt-4 space-y-3">
            {[
              { t: 'Specific beats comprehensive', d: 'A list of 40 skills is useless. Four gaps, ranked, is a plan.' },
              { t: 'Peers beat lectures', d: 'Someone who just learned it teaches it more clearly than an expert.' },
              { t: 'Evidence beats attendance', d: 'Hours do not survive an interview. Artefacts do.' },
              { t: 'Price must fit a student', d: '₹99 is a deliberate ceiling, not a starting point.' },
              { t: 'Honesty is a feature', d: 'Labelling every number is what makes the rest believable.' },
            ].map((b, i) => (
              <li key={b.t} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-lg grad-brand text-[10.5px] font-extrabold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink">{b.t}</p>
                  <p className="mt-0.5 text-[12px] text-muted leading-relaxed">{b.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* pillars */}
      <Card className="p-6 sm:p-8">
        <SectionHeading
          eyebrow="Product principles"
          title="Four decisions that shaped everything"
          description="Each of these was a fork where the cheaper or easier option was rejected."
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {ABOUT_PILLARS.map((p) => {
            const t = toneOf('brand')
            return (
              <div key={p.title} className="rounded-2xl border border-line bg-surface-2 p-5 hover:border-line-strong transition-colors">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={p.icon} size={18} />
                </span>
                <h3 className="mt-3.5 text-[15.5px] font-bold text-ink tracking-tight">{p.title}</h3>
                <p className="mt-1.5 text-[13px] text-ink-2 leading-relaxed">{p.body}</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* team */}
      <Card className="p-6 sm:p-8">
        <SectionHeading eyebrow="The team" title="Two founders, two halves" description="One owns the product and the market. One owns the numbers." />
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {TEAM.map((m) => (
            <Card key={m.id} hover className="p-6 overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${m.accent}`} />
              <div className="mt-5 flex items-center gap-4">
                <span
                  className={`grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${m.accent} text-[22px] font-extrabold text-white shadow-md`}
                >
                  {m.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[19px] font-extrabold text-ink tracking-tight">{m.name}</h3>
                  <p className="text-[13px] font-semibold text-brand">{m.role}</p>
                </div>
              </div>

              <p className="mt-4 text-[13px] text-ink-2 leading-relaxed">{m.bio}</p>

              <p className="mt-5 text-[10.5px] font-bold uppercase tracking-wider text-muted mb-2">Focus areas</p>
              <div className="flex flex-wrap gap-1.5">
                {m.focus.map((f) => (
                  <Chip key={f} tone="brand" size="xs" className="!text-[11px]">
                    {f}
                  </Chip>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center gap-2">
                {m.links.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => toast('LinkedIn is not linked in this demo prototype.', { tone: 'info' })}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-line text-[12px] font-semibold text-ink-2 hover:border-brand/40 hover:text-brand transition-colors"
                  >
                    <LinkedInMark size={13} />
                    {l.label}
                  </button>
                ))}
                <Badge tone="accent" size="xs" className="ml-auto">
                  <BadgeCheck size={11} />
                  Founder
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* data integrity */}
      <Card className="p-6 sm:p-8">
        <SectionHeading
          eyebrow="Data integrity"
          title="Every number here is labelled"
          description="A demo that hides its assumptions teaches the wrong lesson. This is the full provenance map of the SkillSync deck."
        />
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA_INTEGRITY.map((g) => {
            const t = toneOf(g.tone)
            return (
              <div key={g.label} className={`rounded-2xl border ${t.softBorder} p-4 ${t.bg}`}>
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full bg-gradient-to-r ${t.grad}`} />
                  <p className={`text-[11.5px] font-extrabold ${t.text}`}>{g.label}</p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {g.items.map((i) => (
                    <li key={i} className="text-[12px] text-ink-2 flex items-start gap-1.5 leading-snug">
                      <span className="mt-1.5 size-1 rounded-full bg-line-strong shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <SourceNote tone="brand" className="mt-6">
          The actual/source column corresponds to AISHE 2021–22 enrolment and GER, and the India Skills Report 2025
          employability figure. Everything else on this site is illustrative, a target, or a founder proposal.
        </SourceNote>
      </Card>

      {/* social impact teaser */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-accent" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="relative p-7 sm:p-9 flex flex-wrap items-center gap-6 text-white">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 border border-white/25">
            <HeartHandshake size={26} />
          </span>
          <div className="flex-1 min-w-[240px]">
            <h3 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight">Turning skills into opportunity</h3>
            <p className="mt-2 text-[14px] text-white/85 leading-relaxed max-w-xl">
              The same exchange loop, pointed at children who have no access to it — through vetted NGO partners and
              screened student volunteers.
            </p>
          </div>
          <Link to="/impact">
            <Button size="lg" variant="dark" className="!bg-white !text-accent hover:!bg-white/90" iconRight={ArrowRight}>
              See social impact
            </Button>
          </Link>
        </div>
      </Card>

      {/* footer block */}
      <Card className="p-6 sm:p-8 text-center">
        <Logo size={36} className="mx-auto" />
        <p className="mt-4 text-[17px] font-extrabold tracking-tight text-ink">
          Skill<span className="grad-text">Sync</span>
        </p>
        <p className="mt-2 text-[13.5px] text-ink-2 italic max-w-md mx-auto">“{FOOTER.tagline}”</p>
        <p className="mt-4 text-[12px] text-muted">© {FOOTER.year} SkillSync</p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-amber-soft px-2.5 py-1 text-[11px] font-bold text-amber">
          <ShieldCheck size={12} />
          {FOOTER.notice}
        </span>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <Link to="/dashboard">
            <Button variant="primary" icon={Sparkles}>
              Open the demo
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" icon={Target}>
              See pricing
            </Button>
          </Link>
          <Link to="/community">
            <Button variant="ghost" icon={Users}>
              Community
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
