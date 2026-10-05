import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Building2,
  Check,
  Info,
  IndianRupee,
  Lightbulb,
  LineChart,
  PieChart as PieIcon,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RTooltip } from 'recharts'

import { Badge, Button, Card, Chip, Divider, InfoRow, ProgressBar, SectionHeading, SourceNote, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { FUNDING } from '../data/mockData'

const tooltipStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  boxShadow: 'var(--shadow-lg)',
  fontSize: 12,
}

export default function Funding() {
  const { toast } = useApp()
  const [focus, setFocus] = useState('product')

  useEffect(() => {
    document.title = 'Funding · SkillSync'
  }, [])

  const f = FUNDING
  const highlighted = f.uses.find((u) => u.id === focus) ?? f.uses[0]

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14 text-center">
          <Badge className="!bg-white/15 !text-white">
            <Target size={12} />
            FUNDING
          </Badge>
          <h2 className="mt-5 text-[30px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] max-w-2xl mx-auto">
            Raising ₹25 lakh for 10%
          </h2>
          <p className="mt-4 text-[14.5px] text-white/80 leading-relaxed max-w-2xl mx-auto">
            Enough to run the team for twelve months, prove the matching loop on real campuses, and reach the milestone
            where the model can be trusted instead of argued.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { l: 'Sought', v: '₹25 lakh' },
              { l: 'Equity', v: '10%' },
              { l: 'Pre-money', v: '₹2.25 cr' },
              { l: 'Post-money', v: '₹2.5 cr' },
            ].map((x) => (
              <div key={x.l} className="rounded-xl bg-white/12 border border-white/20 px-4 py-3.5 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">{x.l}</p>
                <p className="mt-1 text-[24px] font-extrabold tnum leading-none">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SourceNote tone="amber" icon={Info}>
        {f.label} — a founder proposal for discussion, not a completed or committed round.
      </SourceNote>

      <div className="grid lg:grid-cols-[1fr_380px] gap-5">
        {/* use of funds */}
        <Card className="p-6">
          <SectionHeading
            eyebrow="Allocation"
            title="Use of funds"
            description="Product and acquisition take 65% — the rest is pilot, validation and a runway buffer."
          />

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-4">
            <span className="grid size-11 place-items-center rounded-xl grad-brand text-white">
              <Sparkles size={20} />
            </span>
            <div className="flex-1 min-w-[180px]">
              <p className="text-[12px] font-bold text-ink">Product + Acquisition</p>
              <p className="text-[24px] font-extrabold tnum grad-text leading-none">{f.productAcquisition}%</p>
            </div>
            <Chip tone="brand">₹{(f.ask * (f.productAcquisition / 100)).toFixed(2)} lakh</Chip>
          </div>

          <div className="mt-5 space-y-3">
            {f.uses.map((u) => {
              const t = toneOf(u.tone)
              const active = focus === u.id
              return (
                <button
                  key={u.id}
                  onClick={() => setFocus(u.id)}
                  onMouseEnter={() => setFocus(u.id)}
                  aria-pressed={active}
                  className={`w-full rounded-2xl border p-4 text-left transition-all ${
                    active ? `${t.softBorder} ${t.bg} shadow-sm` : 'border-line bg-surface-2 hover:border-line-strong'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[13.5px] font-bold ${active ? 'text-ink' : 'text-ink-2'}`}>{u.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold tnum text-ink">₹{u.amount} lakh</span>
                      <span className={`text-[12px] font-extrabold tnum ${t.text}`}>{u.pct}%</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-surface-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${t.grad} transition-[width] duration-700`}
                      style={{ width: `${u.pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11.5px] text-muted leading-relaxed">{u.note}</p>
                </button>
              )
            })}
          </div>
        </Card>

        {/* pie + deal */}
        <div className="space-y-5">
          <Card className="p-6">
            <h3 className="text-[15px] font-bold text-ink">Allocation</h3>
            <div className="h-[220px] mt-2 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={f.uses}
                    dataKey="pct"
                    nameKey="label"
                    innerRadius={52}
                    outerRadius={86}
                    paddingAngle={2}
                    stroke="var(--surface)"
                    strokeWidth={2}
                  >
                    {f.uses.map((u) => (
                      <Cell key={u.id} fill={COLORS[u.id]} />
                    ))}
                  </Pie>
                  <RTooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}% · ₹${n.payload.amount} lakh`, n.name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-3 space-y-1.5">
              {f.uses.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => setFocus(u.id)}
                    className={`w-full flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-[12px] transition-colors ${
                      focus === u.id ? 'bg-surface-3' : 'hover:bg-surface-2'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-muted min-w-0">
                      <span className="size-2.5 rounded-sm shrink-0" style={{ background: COLORS[u.id] }} />
                      <span className="truncate">{u.label}</span>
                    </span>
                    <span className="font-bold tnum text-ink-2 shrink-0">{u.pct}%</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-[15px] font-bold text-ink">Deal terms</h3>
            <div className="mt-3">
              <InfoRow label="Amount sought" value={`₹${f.ask} lakh`} />
              <InfoRow label="Equity offered" value={`${f.equity}%`} />
              <InfoRow label="Implied post-money" value={`₹${f.postMoney} crore`} hint="₹25 lakh ÷ 10%" />
              <InfoRow label="Implied pre-money" value={`₹${f.preMoney} crore`} hint="Post-money − investment" />
              <InfoRow label="Product + acquisition" value={`${f.productAcquisition}%`} />
            </div>
            <Divider className="my-4" />
            <div className="rounded-xl bg-surface-2 border border-line p-3.5 font-mono text-[11px] text-ink-2 space-y-1">
              <p>₹25 lakh ÷ 10% = ₹2.5 crore post</p>
              <p>₹2.5 crore − ₹25 lakh = ₹2.25 crore pre</p>
            </div>
            <Button
              variant="outline"
              full
              className="mt-4"
              icon={Info}
              onClick={() => toast('Terms are a founder proposal shown for discussion.', { tone: 'info' })}
            >
              Ask about these terms
            </Button>
          </Card>
        </div>
      </div>

      {/* highlighted focus detail */}
      <Card className="p-6">
        <div className="flex flex-wrap items-start gap-5">
          <span
            className="grid size-14 shrink-0 place-items-center rounded-2xl text-white"
            style={{ background: GRADS[highlighted.tone] }}
          >
            <Lightbulb size={24} />
          </span>
          <div className="flex-1 min-w-[240px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Selected allocation</p>
            <h3 className="mt-1.5 text-[20px] font-extrabold text-ink tracking-tight">
              {highlighted.label} · {highlighted.pct}%
            </h3>
            <p className="mt-2 text-[13.5px] text-ink-2 leading-relaxed max-w-2xl">{highlighted.note}</p>
            <div className="mt-4">
              <ProgressBar value={highlighted.pct * 2.5} tone={highlighted.tone} showLabel label={`₹${highlighted.amount} lakh of ₹${f.ask} lakh`} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[34px] font-extrabold tnum grad-text leading-none">₹{highlighted.amount}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted mt-1">lakh</p>
          </div>
        </div>
      </Card>

      {/* milestones */}
      <Card className="p-6">
        <SectionHeading
          eyebrow="Use it or lose it"
          title="What this ₹25 lakh must buy"
          description="Twelve months of runway against four checkpoints. Missing them is the signal to stop spending."
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {f.milestones.map((m, i) => (
            <div key={m} className="flex gap-3.5 rounded-2xl border border-line bg-surface-2 p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg grad-accent text-white">
                <Check size={15} strokeWidth={3} />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted">Checkpoint {i + 1}</p>
                <p className="mt-1 text-[13px] font-semibold text-ink leading-relaxed">{m}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5">
        {[
          {
            icon: Users,
            t: 'Why not more?',
            d: '₹25 lakh funds twelve months at a deliberately small team. Raising more before the matching loop is proven would be funding a guess.',
            tone: 'brand',
          },
          {
            icon: LineChart,
            t: 'Why now?',
            d: 'The three-year model shows break-even inside Year 2. This round buys the evidence needed to defend that claim.',
            tone: 'accent',
          },
          {
            icon: ShieldCheck,
            t: 'What we will report',
            d: 'Registered, active and paying counts per campus — plus real CAC. If the funnel does not convert, that is the finding.',
            tone: 'amber',
          },
        ].map((x) => {
          const I = x.icon
          const t = toneOf(x.tone)
          return (
            <Card key={x.t} className="p-6">
              <span className={`grid size-10 place-items-center rounded-xl ${t.bg} ${t.text}`}>
                <I size={18} />
              </span>
              <h3 className="mt-3.5 text-[15px] font-bold text-ink">{x.t}</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-2 leading-relaxed">{x.d}</p>
            </Card>
          )
        })}
      </div>

      <SourceNote tone="brand">
        {f.label}. No investor has committed capital, no term sheet exists, and this build processes no applications.
      </SourceNote>
    </div>
  )
}

const COLORS = {
  product: '#4f46e5',
  acquisition: '#0d9488',
  pilot: '#0284c7',
  pmf: '#d97706',
  scale: '#9333ea',
}

const GRADS = {
  brand: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
  accent: 'linear-gradient(135deg,#0d9488,#22c55e)',
  sky: 'linear-gradient(135deg,#0284c7,#06b6d4)',
  amber: 'linear-gradient(135deg,#d97706,#f59e0b)',
  'brand-2': 'linear-gradient(135deg,#7c3aed,#c026d3)',
}
