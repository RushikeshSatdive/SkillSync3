import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Building2,
  Calculator,
  ChevronDown,
  Globe2,
  IndianRupee,
  Info,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Badge, Button, Card, Chip, SectionHeading, SourceNote, StatCard, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { MARKET, MARKET_LABEL, MARKET_NOTES } from '../data/mockData'

const CONFIG = [
  {
    id: 'tam',
    tone: 'brand',
    icon: Globe2,
    width: 100,
    visual: 'full',
    blurb: 'Every enrolled higher-education student in India paying an annual subscription.',
  },
  {
    id: 'sam',
    tone: 'brand-2',
    icon: Users,
    width: 20,
    visual: 'slice',
    blurb: 'Students on campuses with the digital access and intent to adopt at launch.',
  },
  {
    id: 'som',
    tone: 'accent',
    icon: TargetIcon,
    width: 0.92,
    visual: 'dot',
    blurb: 'Realistic three-year capture from the serviceable market.',
  },
]

function TargetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function MarketTier({ cfg }) {
  const data = MARKET[cfg.id]
  const t = toneOf(cfg.tone)
  const IconC = cfg.icon
  const [open, setOpen] = useState(cfg.id === 'som')

  const value = data.value >= 1000 ? data.value.toLocaleString('en-IN') : data.value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')
  const display = data.value >= 1000 ? `₹${value}` : `₹${data.value}`

  return (
    <Card className="overflow-hidden relative">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.grad}`} />

      {/* visual proportion bar */}
      <div className="px-5 pt-6">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Badge tone={cfg.tone} size="xs">
                {data.label}
              </Badge>
              <span className="text-[11.5px] font-semibold text-muted truncate">{data.name}</span>
            </div>
            <p className="mt-3 text-[38px] sm:text-[46px] font-extrabold tracking-tight tnum text-ink leading-none">
              {display}
              <span className="text-[20px] font-bold text-muted ml-1">{data.unit}</span>
            </p>
            <p className="mt-2 text-[12.5px] font-semibold text-ink-2 font-mono">{data.formula}</p>
          </div>
          <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${t.bg} ${t.text}`}>
            <IconC size={22} />
          </span>
        </div>

        {/* bar */}
        <div className="mt-5 h-3 rounded-full bg-surface-3 overflow-hidden relative">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${t.grad} transition-[width] duration-1000 ease-out`}
            style={{ width: `${Math.min(100, cfg.width)}%` }}
          />
          {cfg.id === 'som' && (
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent/30"
              style={{ width: '100%' }}
            />
          )}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-muted">
          <span>{cfg.blurb}</span>
        </div>
      </div>

      {/* inputs */}
      <div className="px-5 pb-5 pt-4">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 rounded-xl bg-surface-2 border border-line px-3.5 py-2.5 hover:border-line-strong transition-colors"
        >
          <span className="text-[12.5px] font-bold text-ink">How this is calculated</span>
          <ChevronDown size={15} className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="mt-2.5 space-y-2 animate-[pop_0.25s_ease-out]">
            {data.inputs.map((inp) => (
              <div key={inp.k} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 border border-line px-3.5 py-2.5">
                <span className="text-[12px] text-muted">{inp.k}</span>
                <span className="text-[12.5px] font-bold tnum text-ink">{inp.v}</span>
              </div>
            ))}
            <p className="text-[11.5px] text-muted leading-relaxed px-1 pt-1">{data.note}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default function Market() {
  const { toast } = useApp()
  const [showNotes, setShowNotes] = useState(false)

  useEffect(() => {
    document.title = 'Market Opportunity · SkillSync'
  }, [])

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14">
          <Badge className="!bg-white/15 !text-white">
            <Building2 size={12} />
            MARKET OPPORTUNITY
          </Badge>
          <h2 className="mt-5 text-[30px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] max-w-2xl">
            A large market, an honest slice
          </h2>
          <p className="mt-4 text-[14.5px] text-white/80 leading-relaxed max-w-2xl">
            4.33 crore enrolled students is the ceiling, not the plan. The number that matters is Year 3: 35,000 paying
            users at ₹1,188 a year — roughly ₹4.158 crore of revenue, built campus by campus.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              { l: 'TAM', v: '₹5,144 cr' },
              { l: 'SAM', v: '₹1,029 cr' },
              { l: 'SOM (Yr 3)', v: '₹4.158 cr' },
            ].map((x) => (
              <span
                key={x.l}
                className="rounded-xl bg-white/12 border border-white/20 px-3.5 py-2 text-[12.5px] font-semibold backdrop-blur"
              >
                {x.l} · <span className="font-extrabold tnum">{x.v}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* tiers */}
      <div className="grid lg:grid-cols-3 gap-5">
        {CONFIG.map((c) => (
          <MarketTier key={c.id} cfg={c} />
        ))}
      </div>

      <SourceNote tone="amber">{MARKET_LABEL}</SourceNote>

      {/* the arithmetic */}
      <Card className="p-6">
        <SectionHeading
          eyebrow="Methodology"
          title="The arithmetic, shown in full"
          description="Every figure in this section derives from two inputs: the enrolled student base and the ₹1,188 annual price."
        />

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: 'Enrolled students', v: '4.33 crore', c: 'AISHE 2021–22', tone: 'accent' },
            { l: 'Annual price', v: '₹1,188', c: '₹99 × 12', tone: 'brand' },
            { l: 'TAM', v: '₹5,144 cr', c: '4.33 cr × ₹1,188', tone: 'brand-2' },
            { l: 'SOM — Year 3', v: '₹4.158 cr', c: '35,000 × ₹1,188', tone: 'accent' },
          ].map((x) => {
            const t = toneOf(x.tone)
            return (
              <div key={x.l} className={`rounded-xl border ${t.softBorder} p-4 ${t.bg}`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${t.text}`}>{x.l}</p>
                <p className="mt-1.5 text-[20px] font-extrabold tnum text-ink">{x.v}</p>
                <p className="mt-0.5 text-[11px] font-mono text-ink-2">{x.c}</p>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => setShowNotes((s) => !s)}
          className="mt-5 flex items-center gap-2 text-[12.5px] font-bold text-brand hover:underline"
          aria-expanded={showNotes}
        >
          <Info size={14} />
          {showNotes ? 'Hide' : 'Show'} data notes and corrections
          <ChevronDown size={14} className={`transition-transform ${showNotes ? 'rotate-180' : ''}`} />
        </button>

        {showNotes && (
          <div className="mt-3.5 space-y-2.5 animate-[pop_0.25s_ease-out]">
            {MARKET_NOTES.map((n) => (
              <SourceNote
                key={n.title}
                tone={n.type === 'correction' ? 'amber' : 'muted'}
                icon={n.type === 'correction' ? Lightbulb : Info}
              >
                <span className="font-bold">{n.title}:</span> {n.body}
              </SourceNote>
            ))}
          </div>
        )}
      </Card>

      {/* sanity checks */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
              <Calculator size={17} />
            </span>
            <h3 className="text-[15px] font-bold text-ink">What ₹4.158 crore means</h3>
          </div>
          <p className="mt-3 text-[13px] text-ink-2 leading-relaxed">
            At 35,000 paying users, SkillSync is a small, profitable, defensible business — not a venture-scale outcome.
            The market is enormous; the realistic capture is deliberately modest.
          </p>
          <div className="mt-4 space-y-2.5">
            {[
              { l: 'Users needed', v: '35,000' },
              { l: 'Equivalent campuses (~350/user)', v: '100' },
              { l: 'As % of SAM base', v: '4.0%' },
            ].map((x) => (
              <div key={x.l} className="flex items-center justify-between rounded-lg bg-surface-2 border border-line px-3.5 py-2.5">
                <span className="text-[12px] text-muted">{x.l}</span>
                <span className="text-[12.5px] font-bold tnum text-ink">{x.v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
              <TrendingUp size={17} />
            </span>
            <h3 className="text-[15px] font-bold text-ink">Why campus-led</h3>
          </div>
          <p className="mt-3 text-[13px] text-ink-2 leading-relaxed">
            Acquiring a student one at a time costs more than their whole year of subscription. Acquiring a campus at
            once — through ambassadors, clubs and placement cells — brings hundreds of students at near-zero marginal
            cost.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {['Campus ambassadors', 'Clubs', 'Placement cells', 'Workshops'].map((x) => (
              <Chip key={x} tone="accent" size="xs">
                {x}
              </Chip>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-amber-soft text-amber">
              <Sparkles size={17} />
            </span>
            <h3 className="text-[15px] font-bold text-ink">What would break this</h3>
          </div>
          <ul className="mt-3 space-y-2.5">
            {[
              'Students churn after the career goal is reached.',
              'Peers cannot be matched densely enough on small campuses.',
              'Free tier cannibalises paid without converting.',
              'Campus-level distribution is slower than assumed.',
            ].map((r) => (
              <li key={r} className="text-[12.5px] text-ink-2 flex items-start gap-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-rose shrink-0" />
                {r}
              </li>
            ))}
          </ul>
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 !px-0"
            iconRight={ArrowRight}
            onClick={() => toast('Risks are tracked in the validation plan, not hidden.', { tone: 'info' })}
          >
            Validation plan
          </Button>
        </Card>
      </div>

      <SourceNote tone="brand">
        Market figures are revenue pool assumptions for planning. They describe what could be available, not what
        SkillSync has captured. No traction is claimed anywhere on this page.
      </SourceNote>
    </div>
  )
}
