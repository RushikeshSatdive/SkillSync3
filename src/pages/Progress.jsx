import { useEffect, useMemo, useState } from 'react'
import {
  Award,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Flame,
  Medal,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { GaugeRing } from '../components/ui/MatchRing'
import {
  Badge,
  Button,
  Card,
  Chip,
  ProgressBar,
  SectionHeading,
  SourceNote,
  StatCard,
  Tabs,
  toneOf,
} from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import { useApp } from '../store/AppStore'
import {
  ACTIVITY_SERIES,
  BADGES,
  CERTIFICATES,
  RANGE_OPTIONS,
  READINESS_SERIES,
  SESSIONS_SERIES,
  SKILL_TREND_SERIES,
  STUDENT,
} from '../data/mockData'

const tooltipStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  boxShadow: 'var(--shadow-lg)',
  fontSize: 12,
}

/* --------------------------------------------------------- CERT CARD */

function CertificateCard({ cert, onView }) {
  const done = cert.kind !== 'In Progress'
  const t = toneOf(cert.tone)

  return (
    <Card hover className={`p-0 overflow-hidden ${done ? '' : 'opacity-90'}`}>
      <div className={`h-1.5 bg-gradient-to-r ${t.grad}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <span className={`grid size-11 place-items-center rounded-xl ${t.bg} ${t.text}`}>
            {done ? <BadgeCheck size={21} /> : <Clock size={21} />}
          </span>
          <Badge tone={done ? 'accent' : 'muted'} size="xs" icon={done ? CheckCircle2 : Clock}>
            {cert.kind}
          </Badge>
        </div>

        <h3 className="mt-4 text-[16px] font-extrabold text-ink tracking-tight">{cert.title}</h3>
        <p className="mt-1.5 text-[12.5px] text-ink-2 leading-relaxed">{cert.detail}</p>

        <div className="mt-4 pt-3.5 border-t border-line space-y-1.5">
          {cert.issued && (
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="text-muted">Issued</span>
              <span className="font-bold text-ink-2">{cert.issued}</span>
            </div>
          )}
          {cert.serial && (
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="text-muted">Serial</span>
              <span className="font-mono font-semibold text-ink-2">{cert.serial}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-muted">Issuer</span>
            <span className="font-bold text-ink-2">{cert.issuer}</span>
          </div>
        </div>

        <Button
          size="sm"
          variant={done ? 'primary' : 'outline'}
          full
          className="mt-4"
          icon={done ? ExternalLink : Target}
          onClick={() => onView(cert)}
        >
          {done ? 'View certificate' : 'Continue this skill'}
        </Button>
      </div>
    </Card>
  )
}

function CertificateModal({ cert, onClose }) {
  if (!cert) return null
  return (
    <Modal
      open={!!cert}
      onClose={onClose}
      title={`${cert.title} — SkillSync certificate`}
      description="Preview of a certificate record. This demo generates no files or server records."
      size="lg"
      icon={Award}
      footer={
        <>
          <Button variant="ghost" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="outline"
            icon={Download}
            onClick={() => onClose()}
          >
            Download
          </Button>
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </>
      }
    >
      <div className="rounded-2xl border-2 border-brand/25 p-6 sm:p-8 text-center relative overflow-hidden bg-surface-2">
        <div className="absolute inset-0 opacity-[0.07] grid-bg" />
        <div className="relative">
          <div className="flex justify-center">
            <div className="grid size-16 place-items-center rounded-2xl grad-brand text-white shadow-lg">
              <Award size={30} />
            </div>
          </div>
          <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.24em] text-muted">Certificate of Completion</p>
          <h3 className="mt-2 text-[24px] font-extrabold tracking-tight text-ink">{cert.title}</h3>
          <p className="mt-1 text-[13px] text-muted">Awarded to</p>
          <p className="mt-1 text-[22px] font-extrabold grad-text tracking-tight">{STUDENT.name}</p>
          <p className="mx-auto mt-3 max-w-md text-[12.5px] text-ink-2 leading-relaxed">{cert.detail}</p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
            {[
              { l: 'Issued', v: cert.issued ?? 'Pending' },
              { l: 'Serial', v: cert.serial ?? '—' },
              { l: 'Issuer', v: cert.issuer },
            ].map((x) => (
              <div key={x.l} className="rounded-xl bg-surface border border-line p-3">
                <p className="text-[9.5px] font-bold uppercase tracking-wider text-muted">{x.l}</p>
                <p className="mt-0.5 text-[12.5px] font-bold text-ink">{x.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10.5px] text-muted">
            <ShieldCheck size={12} />
            Illustrative certificate UI · no backend verification exists in this demo
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* -------------------------------------------------------------- PAGE */

export default function Progress() {
  const { state, skillProgress, activities, dispatch, toast } = useApp()
  const [range, setRange] = useState('30')
  const [tab, setTab] = useState('charts')
  const [cert, setCert] = useState(null)

  useEffect(() => {
    document.title = 'Progress & Skill Proof · SkillSync'
  }, [])

  const activity = ACTIVITY_SERIES[range]
  const skillTrend = SKILL_TREND_SERIES[range]
  const readiness = READINESS_SERIES[range]
  const sessions = SESSIONS_SERIES[range]
  const rangeLabel = RANGE_OPTIONS.find((r) => r.id === range)?.label ?? '30 days'

  const totalMinutes = activity.reduce((a, x) => a + x.minutes, 0)
  const totalSessions = sessions.reduce((a, x) => a + x.v, 0)
  const earnedBadges = BADGES.filter((b) => b.earned).length

  const skillsBySkill = skillProgress.map((s, i) => ({
    name: s.name.length > 18 ? `${s.name.slice(0, 16)}…` : s.name,
    value: s.value,
    target: s.target,
    fill: ['#4f46e5', '#9333ea', '#0d9488', '#0284c7', '#d97706'][i % 5],
  }))

  return (
    <div className="space-y-5">
      {/* readiness hero */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative p-6 sm:p-7 text-white flex flex-wrap items-center gap-7">
          <div className="relative shrink-0">
            <svg width="148" height="148" className="-rotate-90">
              <circle cx="74" cy="74" r="62" fill="none" strokeWidth="12" stroke="rgba(255,255,255,0.18)" />
              <circle
                cx="74"
                cy="74"
                r="62"
                fill="none"
                strokeWidth="12"
                strokeLinecap="round"
                stroke="#2dd4bf"
                strokeDasharray={2 * Math.PI * 62}
                strokeDashoffset={2 * Math.PI * 62 - (state.readiness / 100) * 2 * Math.PI * 62}
                style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-[38px] font-extrabold tnum leading-none">
                  <AnimatedCounter value={state.readiness} suffix="%" startOnView={false} />
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 mt-1">Ready</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[220px]">
            <Badge className="!bg-white/15 !text-white">OVERALL</Badge>
            <h2 className="mt-2.5 text-[24px] sm:text-[30px] font-extrabold tracking-tight leading-tight">
              Overall Career Readiness
            </h2>
            <p className="mt-2 text-[13.5px] text-white/75 max-w-lg leading-relaxed">
              A weighted blend of skill level, practice hours, completed steps and verified proof against the{' '}
              {STUDENT.careerGoal} benchmark.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { k: 'Practice', v: `${state.practiceHours} hrs` },
                { k: 'Sessions', v: state.sessions },
                { k: 'Skill proof', v: state.proofs },
                { k: 'Streak', v: `${state.streak} days` },
              ].map((x) => (
                <span
                  key={x.k}
                  className="rounded-lg bg-white/12 border border-white/20 px-2.5 py-1.5 text-[11.5px] font-semibold"
                >
                  {x.k} · <span className="font-extrabold tnum">{x.v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          tabs={[
            { id: 'charts', label: 'Charts' },
            { id: 'skills', label: 'Skill Progress' },
            { id: 'proof', label: 'Skill Proof', count: state.proofs },
          ]}
          value={tab}
          onChange={setTab}
        />
        {tab !== 'proof' && (
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-surface-2 border border-line">
            <span className="text-[11px] font-bold text-muted pl-2 pr-1">Range</span>
            {RANGE_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                aria-pressed={range === r.id}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  range === r.id ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink-2'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === 'charts' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Practice hours" value={`${state.practiceHours}`} sub={`Over ${rangeLabel}`} icon={Clock} tone="sky" />
            <StatCard label="Sessions" value={state.sessions} sub={`${totalSessions} in range`} icon={Users} tone="brand" />
            <StatCard label="Skills proof" value={state.proofs} sub="Verified records" icon={BadgeCheck} tone="accent" />
            <StatCard label="Learning streak" value={`${state.streak} days`} sub="Consecutive activity" icon={Flame} tone="amber" />
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <Card className="p-5">
              <h3 className="text-[15px] font-bold text-ink">Weekly learning activity</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Minutes practised per period · {rangeLabel}</p>
              <div className="h-[230px] mt-4 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activity} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="progArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0d9488" stopOpacity={0.38} />
                        <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="d" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={36} />
                    <RTooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      name="Minutes"
                      stroke="#0d9488"
                      strokeWidth={2.5}
                      fill="url(#progArea)"
                      dot={{ r: 3, fill: '#0d9488', strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center justify-between text-[12px]">
                <span className="text-muted">Total in range</span>
                <span className="font-extrabold tnum text-ink">
                  {totalMinutes} min · {(totalMinutes / 60).toFixed(1)} hrs
                </span>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[15px] font-bold text-ink">Skill improvement</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Level by skill · {rangeLabel}</p>
              <div className="h-[230px] mt-4 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={skillTrend} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="w" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={36} domain={[0, 100]} />
                    <RTooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="FinancialModelling" name="Financial Modelling" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Valuation" name="Valuation" stroke="#9333ea" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="AdvancedExcel" name="Advanced Excel" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {[
                  { l: 'Financial Modelling', c: '#4f46e5' },
                  { l: 'Valuation', c: '#9333ea' },
                  { l: 'Advanced Excel', c: '#0d9488' },
                ].map((l) => (
                  <span key={l.l} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-muted">
                    <span className="size-2 rounded-sm" style={{ background: l.c }} />
                    {l.l}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[15px] font-bold text-ink">Career readiness trend</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Composite score over time</p>
              <div className="h-[230px] mt-4 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={readiness} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="readyArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9333ea" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#9333ea" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="w" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={36} domain={[0, 100]} />
                    <RTooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="readiness"
                      name="Readiness %"
                      stroke="#9333ea"
                      strokeWidth={2.5}
                      fill="url(#readyArea)"
                      dot={{ r: 3, fill: '#9333ea', strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[15px] font-bold text-ink">Sessions completed</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Peer and practice sessions · {rangeLabel}</p>
              <div className="h-[230px] mt-4 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessions} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="d" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={36} allowDecimals={false} />
                    <RTooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--surface-2)' }} />
                    <Bar dataKey="v" name="Sessions" radius={[6, 6, 0, 0]} maxBarSize={38}>
                      {sessions.map((_, i) => (
                        <Cell key={i} fill={i % 2 ? '#0d9488' : '#4f46e5'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center justify-between text-[12px]">
                <span className="text-muted">Total in range</span>
                <span className="font-extrabold tnum text-ink">{totalSessions} sessions</span>
              </div>
            </Card>
          </div>

          <SourceNote tone="brand">
            All chart series are seeded demo values for the last 7/30/90 days. Only the counters on this page move when
            you complete real actions in the demo.
          </SourceNote>
        </div>
      )}

      {tab === 'skills' && (
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
          <Card className="p-5">
            <h3 className="text-[15px] font-bold text-ink">Skill progress</h3>
            <p className="text-[12.5px] text-muted mt-0.5">Current level against the {STUDENT.careerGoal} target</p>
            <div className="mt-5 space-y-5">
              {skillProgress.map((s) => (
                <div key={s.name}>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="text-[13px] font-bold text-ink">{s.name}</span>
                    <span className="text-[11.5px] font-semibold tnum text-muted">
                      {s.value}% <span className="opacity-60">→</span>{' '}
                      <span className="text-brand">{s.target}%</span>
                    </span>
                  </div>
                  <ProgressBar value={s.value} target={s.target} />
                  <p className="mt-1.5 text-[11px] font-semibold text-accent">+{s.delta} pts this month</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="text-[15px] font-bold text-ink">Activity contribution</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Completions this session</p>
              {activities.every((a) => a.completions === 0) ? (
                <p className="mt-5 text-[12.5px] text-muted text-center py-8">
                  Complete a practice activity to see this chart update.
                </p>
              ) : (
                <div className="h-[200px] mt-3 -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activities.filter((a) => a.completions > 0)}
                        dataKey="completions"
                        nameKey="title"
                        innerRadius={48}
                        outerRadius={78}
                        paddingAngle={3}
                        stroke="var(--surface)"
                        strokeWidth={2}
                      >
                        {activities.map((_, i) => (
                          <Cell key={i} fill={['#4f46e5', '#9333ea', '#0d9488', '#0284c7', '#d97706'][i % 5]} />
                        ))}
                      </Pie>
                      <RTooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>

            <Card className="p-5">
              <h3 className="text-[15px] font-bold text-ink">Proof count</h3>
              <div className="mt-3 flex items-end gap-3">
                <GaugeRing value={state.proofs} max={8} size={150} label="of 8 possible proofs" />
              </div>
              <p className="mt-2 text-[12px] text-muted text-center">
                Each verified practice, teaching block and completed track creates a proof record.
              </p>
            </Card>
          </div>
        </div>
      )}

      {tab === 'proof' && (
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionHeading
                eyebrow="Credentials"
                title="Skill proof"
                description="Certificates and badges built from completed work rather than course enrolment."
              />
              <Badge tone="accent" icon={BadgeCheck}>
                {state.proofs} verified
              </Badge>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {CERTIFICATES.map((c) => (
              <CertificateCard key={c.id} cert={c} onView={setCert} />
            ))}
          </div>

          <Card className="p-5">
            <h3 className="text-[15px] font-bold text-ink mb-4">Badges</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BADGES.map((b) => {
                const t = toneOf(b.tone)
                const IconB = { GraduationCap: Medal, Flame: Flame, ArrowLeftRight: ArrowLeftRightIcon, Dumbbell: Award, Users: Users, LineChart: TrendingUp, Calculator: Trophy, Trophy: Trophy }[b.icon] ?? Medal
                return (
                  <div
                    key={b.id}
                    className={`rounded-xl border p-3.5 flex items-center gap-3 transition-all ${
                      b.earned ? `${t.softBorder} ${t.bg} hover:-translate-y-0.5` : 'border-dashed border-line-strong opacity-55'
                    }`}
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                        b.earned ? `bg-gradient-to-br ${t.grad} text-white` : 'bg-surface-3 text-muted'
                      }`}
                    >
                      <IconB size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[12.5px] font-bold truncate ${b.earned ? 'text-ink' : 'text-muted'}`}>
                        {b.label}
                      </p>
                      <p className="text-[10.5px] text-muted">{b.earned ? 'Earned' : 'Locked'}</p>
                    </div>
                    {b.earned && <CheckCircle2 size={14} className={`${t.text} shrink-0 ml-auto`} />}
                  </div>
                )
              })}
            </div>
          </Card>

          <SourceNote tone="accent">
            Certificate UI is illustrative — no certificate is generated, stored or issued. Serials are placeholder text
            so the structure reads clearly in a demo.
          </SourceNote>
        </div>
      )}

      <CertificateModal cert={cert} onClose={() => setCert(null)} />
    </div>
  )
}

function ArrowLeftRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  )
}
