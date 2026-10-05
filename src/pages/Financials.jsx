import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Info,
  LineChart as LineIcon,
  PieChart as PieIcon,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge, Button, Card, Chip, SectionHeading, SourceNote, StatCard, Tabs, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { BREAK_EVEN_NOTE, FINANCIALS, FINANCIALS_LABEL } from '../data/mockData'

const tooltipStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  boxShadow: 'var(--shadow-lg)',
  fontSize: 12,
}

const COLORS = ['#4f46e5', '#9333ea', '#0d9488', '#0284c7', '#d97706']

export default function Financials() {
  const { toast } = useApp()
  const [chart, setChart] = useState('revenue')

  useEffect(() => {
    document.title = 'Financial Projections · SkillSync'
  }, [])

  const get = (id) => FINANCIALS.rows.find((r) => r.id === id).values

  const revenueData = useMemo(
    () => FINANCIALS.years.map((y, i) => ({ year: y, revenue: get('revenue')[i], expenses: get('expenses')[i] })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const usersData = useMemo(
    () => FINANCIALS.years.map((y, i) => ({ year: y, users: get('users')[i] })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const netData = useMemo(
    () => FINANCIALS.years.map((y, i) => ({ year: y, net: get('net')[i] })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const marginData = useMemo(
    () => FINANCIALS.years.map((y, i) => ({ year: y, margin: get('margin')[i] })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const expenseMix = useMemo(
    () =>
      FINANCIALS.expensesBreakdown.map((e, i) => ({
        name: e.label,
        y1: e.y1,
        y2: e.y2,
        y3: e.y3,
        fill: COLORS[i % 5],
      })),
    [],
  )

  const year3Mix = expenseMix.map((e) => ({ name: e.name, value: e.y3, fill: e.fill }))
  const year3Total = expenseMix.reduce((a, e) => a + e.y3, 0)

  const breakevenRevenue = get('expenses')[1]
  const cumulative = get('net').reduce((a, v) => a + v, 0)

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14">
          <Badge className="!bg-white/15 !text-white">
            <LineIcon size={12} />
            FINANCIAL PROJECTIONS
          </Badge>
          <h2 className="mt-5 text-[30px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] max-w-2xl">
            Loss in Year 1, 51% margin by Year 3
          </h2>
          <p className="mt-4 text-[14.5px] text-white/80 leading-relaxed max-w-2xl">
            ₹15.6 lakh negative in Year 1 as fixed team cost runs ahead of revenue, then ₹212.8 lakh of net income once
            35,000 students are paying ₹1,188 a year.
          </p>
        </div>
      </section>

      <SourceNote tone="amber" icon={Info}>
        {FINANCIALS_LABEL} These are model outputs from stated assumptions, not reported results.
      </SourceNote>

      {/* year cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {FINANCIALS.years.map((y, i) => {
          const net = get('net')[i]
          const margin = get('margin')[i]
          const positive = net > 0
          return (
            <Card key={y} hover className="p-5 relative overflow-hidden">
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  positive ? 'from-[#0d9488] to-[#22c55e]' : 'from-[#e11d48] to-[#f97316]'
                }`}
              />
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-extrabold uppercase tracking-wider text-ink">{y}</p>
                <Badge tone={positive ? 'accent' : 'rose'} size="xs">
                  {positive ? 'Profitable' : 'Loss'}
                </Badge>
              </div>

              <div className="mt-4 space-y-2.5">
                {FINANCIALS.rows.map((r) => {
                  const v = r.values[i]
                  const fmt = r.type === 'money' ? `₹${v} lakh` : r.type === 'percent' ? `${v}%` : v.toLocaleString('en-IN')
                  return (
                    <div key={r.id} className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-muted">{r.label}</span>
                      <span
                        className={`text-[12.5px] font-bold tnum ${
                          r.id === 'net' ? (positive ? 'text-accent' : 'text-rose') : 'text-ink-2'
                        }`}
                      >
                        {r.id === 'net' && v < 0 ? '' : ''}
                        {fmt}
                      </span>
                    </div>
                  )
                })}
                <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-line">
                  <span className="text-[12px] text-muted">Headcount</span>
                  <span className="text-[12.5px] font-bold tnum text-ink-2">{FINANCIALS.headcount[i]}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      positive ? 'grad-accent' : 'bg-gradient-to-r from-[#e11d48] to-[#f97316]'
                    }`}
                    style={{ width: `${Math.min(100, Math.abs(margin) * 1.8)}%` }}
                  />
                </div>
                <span className={`text-[11px] font-bold tnum ${positive ? 'text-accent' : 'text-rose'}`}>
                  {margin}%
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* charts */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading eyebrow="Interactive" title="Three-year model" />
          <Tabs
            tabs={[
              { id: 'revenue', label: 'Revenue vs expenses' },
              { id: 'users', label: 'Paying users' },
              { id: 'net', label: 'Net income' },
              { id: 'margin', label: 'Net margin' },
            ]}
            value={chart}
            onChange={setChart}
          />
        </div>

        <div className="mt-6 h-[320px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            {chart === 'revenue' && (
              <BarChart data={revenueData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={48} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v, n) => [`₹${v} lakh`, n === 'revenue' ? 'Revenue' : 'Expenses']} />
                <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} iconType="circle" />
                <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} maxBarSize={54} />
                <Bar dataKey="expenses" name="Operating expenses" fill="#fb7185" radius={[8, 8, 0, 0]} maxBarSize={54} />
              </BarChart>
            )}

            {chart === 'users' && (
              <BarChart data={usersData} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={56} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v) => [v.toLocaleString('en-IN'), 'Paying users']} />
                <Bar dataKey="users" radius={[8, 8, 0, 0]} maxBarSize={80}>
                  {usersData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            )}

            {chart === 'net' && (
              <ComposedChart data={netData} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={56} />
                <ReferenceLine y={0} stroke="var(--border-strong)" strokeWidth={1.5} />
                <RTooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`₹${v} lakh`, 'Net income']}
                />
                <Bar dataKey="net" radius={[8, 8, 0, 0]} maxBarSize={80}>
                  {netData.map((d, i) => (
                    <Cell key={i} fill={d.net >= 0 ? '#0d9488' : '#e11d48'} />
                  ))}
                </Bar>
              </ComposedChart>
            )}

            {chart === 'margin' && (
              <ComposedChart data={marginData} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="marginFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={48} domain={[-40, 60]} />
                <ReferenceLine y={0} stroke="var(--border-strong)" strokeWidth={1.5} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Net margin']} />
                <Area
                  type="monotone"
                  dataKey="margin"
                  name="Net margin %"
                  stroke="#9333ea"
                  strokeWidth={2.5}
                  fill="url(#marginFill)"
                  dot={{ r: 5, fill: '#9333ea', strokeWidth: 0 }}
                  activeDot={{ r: 7 }}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 rounded-xl bg-surface-2 border border-line p-4">
          <div className="flex items-start gap-2.5">
            <Info size={15} className="text-brand shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-ink-2 leading-relaxed">{BREAK_EVEN_NOTE}</p>
          </div>
        </div>
      </Card>

      {/* expense mix */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-ink">Operating expense breakdown</h3>
          <p className="text-[12.5px] text-muted mt-0.5">₹ lakh, by year</p>
          <div className="mt-5 h-[260px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseMix} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} angle={-14} textAnchor="end" height={56} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v, n) => [`₹${v} lakh`, n]} />
                <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} iconType="circle" />
                <Bar dataKey="y1" name="Year 1" stackId="a" fill="#4f46e5" maxBarSize={52} />
                <Bar dataKey="y2" name="Year 2" stackId="a" fill="#9333ea" maxBarSize={52} />
                <Bar dataKey="y3" name="Year 3" stackId="a" fill="#c026d3" radius={[8, 8, 0, 0]} maxBarSize={52} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-ink">Year 3 cost split</h3>
          <p className="text-[12.5px] text-muted mt-0.5">₹{year3Total} lakh total operating expenses</p>
          <div className="h-[200px] mt-3 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={year3Mix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={84}
                  paddingAngle={2}
                  stroke="var(--surface)"
                  strokeWidth={2}
                >
                  {year3Mix.map((m, i) => (
                    <Cell key={i} fill={m.fill} />
                  ))}
                </Pie>
                <RTooltip contentStyle={tooltipStyle} formatter={(v, n) => [`₹${v} lakh`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1.5">
            {year3Mix.map((m) => (
              <li key={m.name} className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2 text-muted">
                  <span className="size-2.5 rounded-sm" style={{ background: m.fill }} />
                  {m.name}
                </span>
                <span className="font-bold tnum text-ink-2">
                  {((m.value / year3Total) * 100).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* summary stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Cumulative net income"
          value={`₹${cumulative.toFixed(1)} lakh`}
          sub="Across all three years"
          icon={Wallet}
          tone="accent"
        />
        <StatCard
          label="Year 1 revenue"
          value={`₹${get('revenue')[0]} lakh`}
          sub="5,000 paying users"
          icon={BarChart3}
          tone="brand"
        />
        <StatCard
          label="Year 3 net margin"
          value={`${get('margin')[2]}%`}
          sub="Peak profitability"
          icon={TrendingUp}
          tone="accent"
        />
        <StatCard
          label="Break-even"
          value={`₹${breakevenRevenue} lakh`}
          sub="Revenue needed in Year 2"
          icon={CheckCircle2}
          tone="sky"
        />
      </div>

      <SourceNote tone="brand">
        All figures derive from the stated assumptions: 5,000 / 15,000 / 35,000 paying users at ₹1,188 per year, against
        the operating expense model above. Change an assumption and every number moves with it.
      </SourceNote>
    </div>
  )
}
