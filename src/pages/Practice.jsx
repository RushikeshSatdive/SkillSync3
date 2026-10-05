import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  ListChecks,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Timer,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge, Button, Card, Chip, EmptyState, ProgressBar, SourceNote, StatCard, Tabs, toneOf } from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import { useApp } from '../store/AppStore'
import { ACTIVITIES } from '../data/mockData'

/* ------------------------------------------------------------- TIMER */

function fmt(totalSeconds) {
  const m = Math.floor(Math.max(0, totalSeconds) / 60)
  const s = Math.max(0, totalSeconds) % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function TimerModal({ activity, open, onClose, onComplete }) {
  const TOTAL = (activity?.minutes ?? 20) * 60
  const [remaining, setRemaining] = useState(TOTAL)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const tickRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setRemaining((activity?.minutes ?? 20) * 60)
    setRunning(false)
    setDone(false)
  }, [open, activity])

  useEffect(() => {
    if (!running || done) return
    tickRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(tickRef.current)
          setRunning(false)
          setDone(true)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(tickRef.current)
  }, [running, done])

  const elapsed = TOTAL - remaining
  const pct = (elapsed / TOTAL) * 100
  const C = 2 * Math.PI * 54

  const reset = useCallback(() => {
    setRunning(false)
    setDone(false)
    setRemaining((activity?.minutes ?? 20) * 60)
  }, [activity])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={activity?.title ?? 'Practice activity'}
      description={`${activity?.minutes ?? 20}-minute focused drill · ${activity?.level ?? ''}`}
      size="lg"
      icon={Timer}
      footer={
        <>
          <Button variant="ghost" onClick={reset} icon={RotateCcw}>
            Reset
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant={done ? 'accent' : 'primary'}
            icon={done ? CheckCircle2 : CheckCircle2}
            onClick={() => {
              onComplete(activity)
              reset()
              onClose()
            }}
          >
            {done ? 'Log & close' : 'Complete activity'}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* timer dial */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0 grid place-items-center">
            <svg width={128} height={128} className="-rotate-90">
              <circle cx="64" cy="64" r="54" fill="none" strokeWidth="9" stroke="var(--surface-3)" />
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (pct / 100) * C}
                stroke="url(#timerGrad)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
              <defs>
                <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-[26px] font-extrabold tnum tracking-tight text-ink leading-none">
                  {fmt(remaining)}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted mt-1">
                  {done ? 'Elapsed' : running ? 'Running' : remaining === TOTAL ? 'Ready' : 'Paused'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={running ? 'outline' : 'primary'}
                icon={running ? Pause : Play}
                onClick={() => !done && setRunning((r) => !r)}
                disabled={done}
              >
                {running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}
              </Button>
              <Button variant="outline" icon={RotateCcw} onClick={reset} disabled={elapsed === 0 && !running}>
                Reset
              </Button>
              <Button
                variant={done ? 'accent' : 'ghost'}
                icon={CheckCircle2}
                onClick={() => {
                  onComplete(activity)
                  reset()
                  onClose()
                }}
              >
                Complete
              </Button>
            </div>
            <div className="rounded-xl bg-surface-2 border border-line p-3">
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-muted">Elapsed</span>
                <span className="font-bold tnum text-ink">{fmt(elapsed)}</span>
              </div>
              <div className="flex items-center justify-between text-[11.5px] mt-1.5">
                <span className="text-muted">Logged toward practice hours</span>
                <span className="font-bold tnum text-accent">+{Math.round(elapsed / 60 * 10) / 10} hrs</span>
              </div>
            </div>
            {done && (
              <div className="rounded-xl bg-accent-soft border border-accent/25 p-3 flex items-center gap-2.5">
                <Trophy size={17} className="text-accent shrink-0" />
                <p className="text-[12.5px] font-semibold text-ink">
                  20 minutes done. Mark the activity complete to log it.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-surface-2 border border-line p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">The brief</p>
            <p className="text-[12.5px] text-ink-2 leading-relaxed">{activity?.brief}</p>
          </div>
          <div className="rounded-xl bg-surface-2 border border-line p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Steps</p>
            <ol className="space-y-2">
              {(activity?.steps ?? []).map((s, i) => (
                <li key={s} className="flex items-start gap-2 text-[12.5px] text-ink-2">
                  <span className="grid size-[18px] shrink-0 place-items-center rounded bg-brand text-white text-[9.5px] font-extrabold mt-px">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* -------------------------------------------------------------- CARD */

function ActivityCard({ activity, onStart }) {
  const progress = Math.min(100, activity.completions * 34)
  return (
    <Card hover className="p-5 flex flex-col relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-2 to-accent opacity-70" />
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
          <Dumbbell size={18} />
        </span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <Badge tone="muted" size="xs" icon={Clock}>
            {activity.minutes} min
          </Badge>
          <Badge
            tone={activity.level === 'Beginner' ? 'accent' : activity.level === 'Intermediate' ? 'brand' : 'amber'}
            size="xs"
          >
            {activity.level}
          </Badge>
        </div>
      </div>

      <h3 className="mt-3.5 text-[16px] font-extrabold text-ink tracking-tight">{activity.title}</h3>
      <p className="mt-1.5 text-[12.5px] text-ink-2 leading-relaxed flex-1">{activity.brief}</p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        <Chip tone="brand" size="xs" className="!text-[11px]">
          {activity.category}
        </Chip>
        <Chip tone="accent" size="xs" className="!text-[11px]" icon={Sparkles}>
          {activity.xp} XP
        </Chip>
        {activity.completions > 0 && (
          <Chip tone="muted" size="xs" className="!text-[11px]">
            Done ×{activity.completions}
          </Chip>
        )}
      </div>

      {progress > 0 && (
        <div className="mt-3.5">
          <ProgressBar value={progress} size="sm" tone="accent" showLabel label="Activity progress" />
        </div>
      )}

      <Button variant="primary" size="sm" full className="mt-4" icon={Play} onClick={() => onStart(activity)}>
        Start Activity
      </Button>
    </Card>
  )
}

/* -------------------------------------------------------------- PAGE */

export default function Practice() {
  const { activities, dispatch, toast, state } = useApp()
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    document.title = 'Practice Activities · SkillSync'
  }, [])

  const categories = useMemo(() => ['all', ...Array.from(new Set(ACTIVITIES.map((a) => a.category)))], [])
  const shown = filter === 'all' ? activities : activities.filter((a) => a.category === filter)

  const complete = (activity) => {
    if (!activity) return
    dispatch({ type: 'ACTIVITY_COMPLETE', id: activity.id, minutes: 20, xp: activity.xp, skill: activity.skill })
    toast(`“${activity.title}” logged. Practice hours and skill progress updated.`, {
      tone: 'success',
      title: `+${activity.xp} XP`,
    })
  }

  const chartData = activities.map((a) => ({
    name: a.title.split(' ').slice(0, 2).join(' '),
    completions: a.completions,
    minutes: a.loggedMinutes ?? 0,
  }))

  const totalCompletions = activities.reduce((a, x) => a + x.completions, 0)

  return (
    <div className="space-y-5">
      {/* hero */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-16 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative p-6 sm:p-7 text-white flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[240px]">
            <Badge className="!bg-white/15 !text-white">PRACTICE</Badge>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight">
              20-Minute Skill Activities
            </h2>
            <p className="mt-2 text-[13.5px] text-white/75 max-w-xl leading-relaxed">
              Short, focused drills with a real countdown timer. Complete one and your practice hours, skill progress
              and activity counts update immediately.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[30px] font-extrabold tnum leading-none">{totalCompletions}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-[30px] font-extrabold tnum leading-none">{state.practiceHours}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-[30px] font-extrabold tnum leading-none">{ACTIVITIES.length}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">Activities</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Practice hours" value={`${state.practiceHours} hrs`} sub="Accumulated in this demo" icon={Clock} tone="sky" />
        <StatCard label="Learning streak" value={`${state.streak} days`} sub="Increments per completion" icon={Flame} tone="amber" />
        <StatCard label="Sessions logged" value={state.sessions} sub="From activities and path steps" icon={ListChecks} tone="brand" />
        <StatCard label="Career readiness" value={`${state.readiness}%`} sub="Moves with each completion" icon={Target} tone="accent" />
      </div>

      <Tabs tabs={categories.map((c) => ({ id: c, label: c === 'all' ? 'All activities' : c }))} value={filter} onChange={setFilter} />

      {shown.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="No activities in this category"
          description="Try another category — the demo includes five activities across tools, growth, casework and communication."
          action={
            <Button variant="primary" onClick={() => setFilter('all')}>
              Show all activities
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {shown.map((a, i) => (
            <div key={a.id} className="animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 55}ms` }}>
              <ActivityCard activity={a} onStart={setActive} />
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <h3 className="text-[15px] font-bold text-ink">Completions by activity</h3>
          <p className="text-[12.5px] text-muted mt-0.5">Counts recorded in this browser session</p>
          {totalCompletions === 0 ? (
            <EmptyState
              icon={BarChart}
              title="No completions yet"
              description="Start any activity and complete it — the chart updates immediately."
              className="mt-4 border-0 bg-surface-2/50"
            />
          ) : (
            <div className="h-[220px] mt-4 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} angle={-18} textAnchor="end" height={54} />
                  <YAxis tickLine={false} axisLine={false} width={30} allowDecimals={false} />
                  <RTooltip
                    cursor={{ fill: 'var(--surface-2)' }}
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="completions" name="Completions" radius={[6, 6, 0, 0]} maxBarSize={38}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={['#4f46e5', '#7c3aed', '#9333ea', '#0d9488', '#0284c7'][i % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="text-[15px] font-bold text-ink">How an activity works</h3>
          <ol className="mt-4 space-y-3.5">
            {[
              { t: 'Pick a drill', d: 'Each activity targets one skill in your gap analysis and takes 20 minutes.' },
              { t: 'Start the timer', d: 'Start, pause and reset work like a real countdown. It runs on the browser clock.' },
              { t: 'Do the work', d: 'The brief and the step list stay on screen while the timer runs.' },
              { t: 'Mark complete', d: 'Practice hours, sessions, streak, skill progress and readiness all update.' },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg grad-brand text-[11px] font-extrabold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink">{s.t}</p>
                  <p className="text-[12px] text-muted mt-0.5 leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <SourceNote tone="accent" className="mt-5">
            Timer state is local to the page. Nothing is sent to a server — the demo has no backend.
          </SourceNote>
        </Card>
      </div>

      <TimerModal activity={active} open={!!active} onClose={() => setActive(null)} onComplete={complete} />
    </div>
  )
}
