import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Calculator,
  Coins,
  IndianRupee,
  Info,
  PiggyBank,
  Percent,
  Repeat,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { GaugeRing } from '../components/ui/MatchRing'
import { Badge, Button, Card, Chip, Divider, InfoRow, SectionHeading, SourceNote, StatCard, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { UNIT_ECONOMICS } from '../data/mockData'

const tooltipStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  boxShadow: 'var(--shadow-lg)',
  fontSize: 12,
}

export default function UnitEconomics() {
  const { toast } = useApp()
  const [months, setMonths] = useState(12)

  useEffect(() => {
    document.title = 'Unit Economics · SkillSync'
  }, [])

  const u = UNIT_ECONOMICS
  const scale = months / 12

  const revenue = Math.round(u.revenue * scale)
  const variable = Math.round(u.variableCost * scale)
  const contribution = revenue - variable
  const margin = ((contribution / revenue) * 100).toFixed(1)

  const waterfall = useMemo(
    () => [
      { name: 'Annual revenue', value: u.revenue, tone: 'brand' },
      { name: 'Variable cost', value: -u.variableCost, tone: 'rose' },
      { name: 'Annual contribution', value: u.contribution, tone: 'accent' },
    ],
    [u],
  )

  const ltvCac = useMemo(
    () => [
      { name: 'LTV', value: u.ltv, fill: '#4f46e5' },
      { name: 'CAC', value: u.cac, fill: '#e11d48' },
      { name: '1-yr contribution', value: u.contribution, fill: '#0d9488' },
    ],
    [u],
  )

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14">
          <Badge className="!bg-white/15 !text-white">
            <PiggyBank size={12} />
            UNIT ECONOMICS
          </Badge>
          <h2 className="mt-5 text-[30px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] max-w-2xl">
            Every paid user pays for themselves five times over
          </h2>
          <p className="mt-4 text-[14.5px] text-white/80 leading-relaxed max-w-2xl">
            ₹1,188 of annual revenue against ₹240 of variable cost leaves ₹948 of contribution. At a ₹450 blended CAC,
            a subscriber is recovered in under seven months.
          </p>
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl">
            {[
              { l: 'Annual revenue', v: '₹1,188' },
              { l: 'Variable cost', v: '₹240' },
              { l: 'Contribution', v: '₹948' },
              { l: 'LTV', v: '₹2,370' },
              { l: 'LTV / CAC', v: '5.3x' },
            ].map((x) => (
              <div key={x.l} className="rounded-xl bg-white/12 border border-white/20 px-3.5 py-3 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">{x.l}</p>
                <p className="mt-1 text-[22px] font-extrabold tnum leading-none">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SourceNote tone="amber" icon={Info}>
        {UNIT_ECONOMICS.label}. No cohort data exists yet — these are the assumptions the model is built on.
      </SourceNote>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* interactive calculator */}
        <Card className="p-6">
          <SectionHeading
            eyebrow="Interactive"
            title="Recalculate for any tenure"
            description="Drag the tenure to see how contribution accumulates against a constant blended CAC."
          />

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="tenure" className="text-[12.5px] font-bold text-ink-2">
                Months subscribed
              </label>
              <span className="text-[16px] font-extrabold tnum grad-text">{months} months</span>
            </div>
            <input
              id="tenure"
              type="range"
              min={1}
              max={36}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10.5px] font-semibold text-muted mt-1.5">
              <span>1</span>
              <span>12</span>
              <span>24</span>
              <span>36</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'Revenue', v: `₹${revenue}`, tone: 'brand' },
              { l: 'Variable cost', v: `₹${variable}`, tone: 'rose' },
              { l: 'Contribution', v: `₹${contribution}`, tone: 'accent' },
              { l: 'Net vs CAC', v: `₹${contribution - u.cac}`, tone: contribution - u.cac >= 0 ? 'accent' : 'rose' },
            ].map((x) => {
              const t = toneOf(x.tone)
              return (
                <div key={x.l} className={`rounded-xl border ${t.softBorder} ${t.bg} p-3.5`}>
                  <p className={`text-[9.5px] font-bold uppercase tracking-wider ${t.text}`}>{x.l}</p>
                  <p className="mt-1 text-[19px] font-extrabold tnum text-ink">{x.v}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 h-[240px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfall} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} height={40} />
                <YAxis tickLine={false} axisLine={false} width={44} />
                <ReferenceLine y={0} stroke="var(--border-strong)" />
                <RTooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`₹${Math.abs(v)}`, 'Annual']}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={72}>
                  {waterfall.map((w, i) => (
                    <Cell key={i} fill={i === 1 ? '#fb7185' : i === 2 ? '#0d9488' : '#4f46e5'} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(v) => `₹${v.toLocaleString('en-IN')}`}
                    style={{ fontSize: 11, fontWeight: 800, fill: 'var(--text)' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-[11.5px] text-muted">
            Contribution margin at annual billing: <span className="font-bold text-ink-2">{margin}%</span>
          </p>
        </Card>

        {/* gauge + rows */}
        <div className="space-y-5">
          <Card className="p-6">
            <h3 className="text-[15px] font-bold text-ink">LTV / CAC</h3>
            <div className="mt-4 flex justify-center">
              <GaugeRing value={u.ratio} max={7} size={190} label="Healthy (> 3x)" />
            </div>
            <p className="mt-2 text-[12px] text-muted text-center leading-relaxed">
              A ratio above 3× is the standard bar for a business that can fund its own growth.
            </p>
            <Divider className="my-4" />
            <div>
              <InfoRow label="LTV" value={`₹${u.ltv.toLocaleString('en-IN')}`} hint={`₹${u.contribution} × ${u.years} years`} />
              <InfoRow label="CAC" value={`₹${u.cac.toLocaleString('en-IN')}`} hint="Blended, campus-led" />
              <InfoRow label="Payback period" value="5.7 months" hint="CAC ÷ monthly contribution" />
              <InfoRow label="Gross margin" value="79.8%" hint="Contribution ÷ revenue" />
            </div>
          </Card>
        </div>
      </div>

      {/* LTV vs CAC chart */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-ink">LTV vs CAC</h3>
          <p className="text-[12.5px] text-muted mt-0.5">
            The spread is what funds acquisition. A ₹450 CAC against a ₹2,370 LTV leaves ₹1,920 of headroom.
          </p>
          <div className="h-[250px] mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ltvCac} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} />
                <YAxis tickLine={false} axisLine={false} width={48} />
                <RTooltip
                  contentStyle={tooltipStyle}
                  formatter={(v, n) => [
                    `₹${v.toLocaleString('en-IN')}`,
                    n.payload.fill === '#e11d48' ? 'CAC' : n.payload.fill === '#0d9488' ? '1-yr contribution' : 'LTV',
                  ]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={64}>
                  {ltvCac.map((b, i) => (
                    <Cell key={i} fill={b.fill} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(v) => `₹${v.toLocaleString('en-IN')}`}
                    style={{ fontSize: 11, fontWeight: 800, fill: 'var(--text)' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-ink">The stack</h3>
          <p className="text-[12.5px] text-muted mt-0.5">Where ₹1,188 of annual revenue comes from and where ₹240 goes</p>
          <div className="mt-5 space-y-4">
            {UNIT_ECONOMICS.rows.map((r) => {
              const t = toneOf(r.tone)
              const w = Math.min(100, (Math.abs(r.v) / u.revenue) * 100)
              return (
                <div key={r.k}>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="text-[12.5px] font-semibold text-ink-2">{r.k}</span>
                    <span className="text-[13px] font-extrabold tnum text-ink">₹{r.v.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${t.grad} transition-[width] duration-1000 ease-out`}
                      style={{ width: `${w}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted">{r.note}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-5 rounded-xl bg-surface-2 border border-line p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Formulae</p>
            <ul className="space-y-1.5 font-mono text-[11.5px] text-ink-2">
              <li>contribution = ₹1,188 − ₹240 = ₹948</li>
              <li>ltv = ₹948 × {u.years} years = ₹2,370</li>
              <li>ratio = ₹2,370 ÷ ₹450 = {u.ratio}x</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* sensitivities */}
      <Card className="p-6">
        <SectionHeading
          eyebrow="Stress test"
          title="What breaks the model"
          description="Small changes in price, cost or retention move these numbers quickly. Here is where it stops working."
        />
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: 'CAC rises to ₹700', v: '3.4x', d: 'Still viable, but campus-led distribution erodes fast.', tone: 'amber' },
            { l: 'Retention drops to 1yr', v: '2.1x', d: 'Sub-annual churn breaks the ratio — this is the key risk.', tone: 'rose' },
            { l: 'Variable cost doubles', v: '3.9x', d: 'Heavy moderation or support would hurt more than CAC.', tone: 'amber' },
            { l: 'Price cut to ₹79', v: '4.2x', d: 'A discount strategy weakens LTV faster than it lifts volume.', tone: 'rose' },
          ].map((s) => {
            const t = toneOf(s.tone)
            return (
              <button
                key={s.l}
                onClick={() => toast(`${s.l}: ${s.d}`, { tone: 'info', title: `LTV/CAC would be ${s.v}`, duration: 4200 })}
                className={`rounded-xl border ${t.softBorder} ${t.bg} p-4 text-left hover:-translate-y-0.5 transition-transform`}
              >
                <p className={`text-[10px] font-bold uppercase tracking-wider ${t.text}`}>Scenario</p>
                <p className="mt-1.5 text-[13px] font-bold text-ink">{s.l}</p>
                <p className="mt-2 text-[24px] font-extrabold tnum text-ink">{s.v}</p>
                <p className="mt-1 text-[11.5px] text-ink-2 leading-relaxed">{s.d}</p>
              </button>
            )
          })}
        </div>
        <SourceNote tone="brand" className="mt-5">
          Scenario values are the same arithmetic as above, applied to changed assumptions. They are not forecasts.
        </SourceNote>
      </Card>
    </div>
  )
}
