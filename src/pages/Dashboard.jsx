import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Flame,
  Landmark,
  ScanSearch,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { DemoBanner } from '../components/layout/AppShell'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { MatchRing, ScoreRing } from '../components/ui/MatchRing'
import {
  Badge,
  Button,
  Card,
  Chip,
  EmptyState,
  ProgressBar,
  SectionHeading,
  SourceNote,
  StatCard,
  toneOf,
} from '../components/ui/primitives'
import { ConfirmModal } from '../components/ui/Modal'
import Icon from '../components/Icon'
import { useApp } from '../store/AppStore'
import {
  ACTIVITIES,
  ACTIVITY_SERIES,
  GAP_SKILLS,
  MATCH_DISCLAIMER,
  STUDENT,
} from '../data/mockData'

const ICONS = { Landmark, ScanSearch, Target, TrendingUp, CalendarCheck, Users, Sparkles }

/* --------------------------------------------------------- WELCOME */

function WelcomeHero({ readiness, streak, navigate }) {
  return (
    <Card className="relative overflow-hidden p-0 border-transparent">
      <div className="absolute inset-0 grad-brand" />
      <div className="absolute inset-0 opacity-[0.18] grid-bg" />
      <div className="absolute -right-16 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 bottom-[-80px] size-56 rounded-full bg-[#2dd4bf]/20 blur-3xl" />

      <div className="relative p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1 min-w-0 text-white">
          <Badge className="!bg-white/15 !text-white">DEMO MODE · Frontend-only prototype</Badge>
          <h2 className="mt-3 text-[24px] sm:text-[30px] font-extrabold tracking-tight leading-tight">
            Welcome back, {STUDENT.firstName}
          </h2>
          <p className="mt-2 text-[14px] text-white/75 max-w-lg leading-relaxed">
            You're working toward <span className="font-bold text-white">{STUDENT.careerGoal}</span>. Three skill
            gaps remain and one peer is waiting to teach you the first of them.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              size="sm"
              variant="dark"
              className="!bg-white !text-brand hover:!bg-white/90"
              icon={ArrowRight}
              onClick={() => document.getElementById('gap')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Continue where you left off
            </Button>
            <Button
              size="sm"
              className="!bg-white/15 !text-white hover:!bg-white/25 border border-white/25"
              icon={Users}
              onClick={() => (navigate('/matching'))}
            >
              View 3 peer matches
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <Flame size={15} className="text-amber-300" />
              <span className="text-[13px] font-bold tnum">{streak}</span>
              <span className="text-[12px] text-white/65">day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-amber-300" />
              <span className="text-[13px] font-bold tnum">{readiness}%</span>
              <span className="text-[12px] text-white/65">career readiness</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 self-center">
          <div className="rounded-2xl bg-white/12 border border-white/20 backdrop-blur-md p-4">
            <MatchRing
              value={STUDENT.recommendedMatch}
              size={150}
              stroke={9}
              label="Top Match"
              sublabel={STUDENT.peersConsidered + ' peers considered'}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

/* -------------------------------------------------- DASHBOARD CARDS */

function StatCards() {
  const { state, learningPath, activities } = useApp()
  const cards = useMemo(
    () => [
      {
        id: 'goal',
        label: 'Career Goal',
        value: STUDENT.careerGoal,
        icon: Landmark,
        tone: 'brand',
        to: '/profile',
      },
      {
        id: 'gap',
        label: 'AI Skill Gap',
        value: `${GAP_SKILLS.length} skills to close`,
        icon: ScanSearch,
        tone: 'amber',
        to: '/gap',
      },
      {
        id: 'match',
        label: 'Recommended Match',
        value: `${STUDENT.recommendedMatch}%`,
        icon: Target,
        tone: 'accent',
        to: '/matching',
      },
      {
        id: 'progress',
        label: 'Progress',
        value: `${state.progress ?? 68}%`,
        icon: TrendingUp,
        tone: 'sky',
        to: '/path',
      },
    ],
    [state.progress],
  )

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => {
        const I = ICONS[c.icon?.name] ?? c.icon
        const t = toneOf(c.tone)
        return (
          <Link key={c.id} to={c.to} className="group">
            <Card hover className="p-4 h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted">{c.label}</p>
                  <p className="mt-1.5 text-[19px] font-extrabold tracking-tight text-ink leading-tight truncate">
                    {c.value}
                  </p>
                </div>
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${t.bg} ${t.text}`}>
                  <I size={17} strokeWidth={2.2} />
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted group-hover:text-brand transition-colors">
                Open <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

/* --------------------------------------------------------- SKILL GAP */

function GapSummary() {
  const { state } = useApp()
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? GAP_SKILLS : GAP_SKILLS.slice(0, 3)

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-bold text-ink">AI Skill Gap</h3>
          <p className="text-[12.5px] text-muted mt-0.5">Career benchmark · {STUDENT.careerGoal}</p>
        </div>
        <Badge tone="illustrative" className="!bg-brand-soft !text-brand">
          Illustrative
        </Badge>
      </div>

      <div className="mt-4 space-y-4">
        {shown.map((g, i) => (
          <div key={g.id} className="animate-[pop_0.3s_ease-out]" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="text-[13px] font-bold text-ink">{g.name}</span>
              <span className="text-[11.5px] font-semibold tnum text-muted">
                {g.current}% <span className="opacity-60">→</span>{' '}
                <span className="text-brand">{g.target}%</span>
              </span>
            </div>
            <ProgressBar value={g.current} target={g.target} tone={g.priority === 'High' ? 'brand' : 'sky'} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={() => setExpanded((e) => !e)} icon={ScanSearch}>
          {expanded ? 'Show fewer' : `Show all ${GAP_SKILLS.length} skills`}
        </Button>
        <Button size="sm" variant="subtle" iconRight={ArrowRight} onClick={() => (navigate('/gap'))} className="ml-auto">
          Full analysis
        </Button>
      </div>

      <div className="mt-3">
        <SourceNote tone="brand">
          Gap scores are illustrative benchmarks for demonstration, not an assessment of real ability.
        </SourceNote>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------- MATCH CARD */

function MatchCard({ match, toast }) {
  const { dispatch } = useApp()
  const [confirm, setConfirm] = useState(false)

  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-center gap-2">
        <Badge tone="brand">{match.rank}</Badge>
        <Badge tone="muted" icon={CheckCircle2}>
          {STUDENT.peersConsidered} considered
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <ScoreRing value={match.score} size={72} stroke={6} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-extrabold text-ink tracking-tight leading-tight">{match.name}</h3>
          <p className="text-[12px] text-muted mt-0.5">{match.branch}</p>
          <p className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted">
            <Landmark size={11} /> {match.careerGoal}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl bg-accent-soft border border-accent/20 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Can teach you</p>
          <p className="mt-1 text-[13px] font-bold text-ink leading-snug">{match.teaching[0]}</p>
        </div>
        <div className="rounded-xl bg-brand-soft border border-brand/20 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">Wants to learn</p>
          <p className="mt-1 text-[13px] font-bold text-ink leading-snug">{match.learning[0]}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {match.why.slice(0, 3).map((w) => (
          <li key={w} className="text-[12px] text-ink-2 flex items-start gap-1.5">
            <CheckCircle2 size={13} className="text-accent shrink-0 mt-px" />
            {w}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-2">
        <Link to={`/peer/${match.id}`} className="flex-1">
          <Button size="sm" variant="primary" full icon={Users}>
            View Profile
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          icon={match.connected ? CheckCircle2 : Zap}
          onClick={() => {
            if (match.connected) {
              dispatch({ type: 'DISCONNECT', id: match.id })
              toast(`Connection with ${match.name} withdrawn.`, { tone: 'info' })
            } else {
              setConfirm(true)
            }
          }}
        >
          {match.connected ? 'Connected' : 'Connect'}
        </Button>
      </div>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'CONNECT', id: match.id })
          toast(`Connection request simulated successfully.`, {
            tone: 'success',
            title: `Connected with ${match.name}`,
          })
        }}
        title={`Connect with ${match.name}?`}
        description="This is a simulated connection in a frontend-only demo. No message or server call is made."
        confirmLabel="Send connection request"
        icon={Zap}
      />
    </Card>
  )
}

/* --------------------------------------------------------- CHARTS */

function WeeklyChart() {
  const data = ACTIVITY_SERIES['30']
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-[15px] font-bold text-ink">Learning activity</h3>
          <p className="text-[12.5px] text-muted mt-0.5">Practice minutes per week · last 30 days</p>
        </div>
        <Badge tone="accent" size="xs">
          Live in demo
        </Badge>
      </div>
      <div className="h-[180px] mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="d" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={34} />
            <RTooltip
              cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1 }}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                boxShadow: 'var(--shadow-lg)',
                fontSize: 12,
              }}
              labelStyle={{ fontWeight: 700, color: 'var(--text)' }}
            />
            <Area
              type="monotone"
              dataKey="minutes"
              name="Minutes"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fill="url(#dashArea)"
              dot={{ r: 3, fill: '#4f46e5', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function SessionsChart() {
  const data = ACTIVITY_SERIES['30']
  return (
    <Card className="p-5">
      <h3 className="text-[15px] font-bold text-ink">Sessions completed</h3>
      <p className="text-[12.5px] text-muted mt-0.5">Peer sessions per week</p>
      <div className="h-[180px] mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="d" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={34} allowDecimals={false} />
            <RTooltip
              cursor={{ fill: 'var(--surface-2)' }}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Bar dataKey="sessions" name="Sessions" fill="#2dd4bf" radius={[6, 6, 0, 0]} maxBarSize={34} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------- PATH PREVIEW */

function PathPreview() {
  const { learningPath, pathCompletion, nextStep, dispatch, toast } = useApp()
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-bold text-ink">Learning path progress</h3>
          <p className="text-[12.5px] text-muted mt-0.5">Investment Banking · {learningPath.length} steps</p>
        </div>
        <span className="text-[22px] font-extrabold tnum grad-text">{pathCompletion}%</span>
      </div>

      <div className="mt-3">
        <ProgressBar value={pathCompletion} />
      </div>

      <ol className="mt-4 space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
        {learningPath.map((s) => {
          const done = s.status === 'completed'
          return (
            <li key={s.id}>
              <div
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  s.id === nextStep?.id ? 'bg-brand-soft border border-brand/20' : ''
                }`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold ${
                    done ? 'grad-accent text-white' : s.progress > 0 ? 'bg-brand text-white' : 'bg-surface-3 text-muted'
                  }`}
                >
                  {done ? <CheckCircle2 size={13} /> : s.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-ink truncate">{s.title}</p>
                  <ProgressBar value={s.progress} size="xs" tone={done ? 'accent' : 'brand'} className="mt-1.5" />
                </div>
                <span className="text-[11px] font-bold tnum text-muted shrink-0">{s.progress}%</span>
              </div>
            </li>
          )
        })}
      </ol>

      {nextStep && nextStep.status !== 'completed' && (
        <Button
          size="sm"
          variant="primary"
          full
          className="mt-4"
          icon={CheckCircle2}
          onClick={() => {
            dispatch({ type: 'PATH_COMPLETE', id: nextStep.id })
            toast(`“${nextStep.title}” marked complete. Next step unlocked.`, {
              tone: 'success',
              title: 'Progress updated',
            })
          }}
        >
          Mark “{nextStep.title}” complete
        </Button>
      )}
    </Card>
  )
}

/* -------------------------------------------------------- ACTIVITIES */

function ActivityPreview() {
  const { activities, dispatch, toast } = useApp()
  const done = activities.filter((a) => a.completions > 0).length
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-bold text-ink">Practice activities</h3>
          <p className="text-[12.5px] text-muted mt-0.5">20-minute drills · {done} of {ACTIVITIES.length} started</p>
        </div>
        <CalendarCheck size={18} className="text-muted" />
      </div>

      {done === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No activity started yet"
          description="Pick a 20-minute drill and the built-in timer tracks it here."
          action={
            <Link to="/practice">
              <Button size="sm" variant="primary">
                Start an activity
              </Button>
            </Link>
          }
          className="mt-4 border-0 bg-surface-2/50"
        />
      ) : (
        <ul className="mt-4 space-y-2">
          {activities.map((a) => (
            <li key={a.id} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold text-ink truncate">{a.title}</p>
                <p className="text-[11px] text-muted mt-0.5">
                  {a.completions} completion{a.completions === 1 ? '' : 's'} · {a.minutes} min logged
                </p>
              </div>
              <Chip tone={a.completions > 0 ? 'accent' : 'muted'} icon={a.completions > 0 ? CheckCircle2 : Clock}>
                {a.completions > 0 ? 'Done' : '20 min'}
              </Chip>
            </li>
          ))}
        </ul>
      )}

      <Link to="/practice" className="block mt-4">
        <Button size="sm" variant="subtle" full iconRight={ArrowRight}>
          Open all activities
        </Button>
      </Link>
    </Card>
  )
}

/* ------------------------------------------------------------- PAGE */

export default function Dashboard() {
  const { state, matches, toast, dispatch } = useApp()
  const navigate = useNavigate()
  const [confirmReset, setConfirmReset] = useState(false)
  const topPeer = matches[0]

  useEffect(() => {
    document.title = 'Dashboard · SkillSync'
  }, [])

  const stats = [
    {
      label: 'Learning Streak',
      value: `${state.streak} days`,
      sub: 'Personal best: 18 days',
      icon: Flame,
      tone: 'amber',
    },
    {
      label: 'Skills Completed',
      value: state.skillsCompleted ?? 6,
      sub: 'Across 3 learning tracks',
      icon: Award,
      tone: 'accent',
    },
    {
      label: 'Practice Hours',
      value: `${state.practiceHours} hrs`,
      sub: 'Logged through activities',
      icon: Clock,
      tone: 'sky',
    },
    {
      label: 'Peer Sessions',
      value: state.sessions,
      sub: `${state.connectedPeers.length} active connection${state.connectedPeers.length === 1 ? '' : 's'}`,
      icon: Users,
      tone: 'brand',
    },
  ]

  return (
    <div className="space-y-6">
      <DemoBanner />

      <WelcomeHero readiness={state.readiness} streak={state.streak} navigate={navigate} />

      <section id="overview" className="space-y-4">
        <StatCards />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <GapSummary />
          <div className="grid md:grid-cols-2 gap-5">
            <WeeklyChart />
            <SessionsChart />
          </div>
        </div>

        <div className="space-y-5">
          {topPeer && <MatchCard match={topPeer} toast={toast} />}
          <PathPreview />
        </div>
      </div>

      <ActivityPreview />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface-2 px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <Icon name="ShieldCheck" size={18} className="text-accent shrink-0" />
          <p className="text-[12.5px] text-ink-2 leading-relaxed min-w-0">
            <span className="font-bold text-ink">Data integrity.</span> {MATCH_DISCLAIMER} Progress you create here is
            stored locally in your browser only.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setConfirmReset(true)}>
          Reset Demo Data
        </Button>
      </div>

      <ConfirmModal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={() => {
          dispatch({ type: 'RESET' })
          toast('Demo data restored to its original state.', { tone: 'success', title: 'Reset complete' })
        }}
        title="Reset demo data?"
        description="All progress made in this session will be cleared."
        confirmLabel="Reset everything"
      />
    </div>
  )
}
