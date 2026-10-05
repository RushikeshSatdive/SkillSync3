import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Dumbbell,
  Flame,
  Layers,
  Lock,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'

import { Badge, Button, Card, Chip, ProgressBar, SectionHeading, SourceNote, StatCard, Tabs, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { STUDENT } from '../data/mockData'

const STATUS_META = {
  completed: { label: 'Completed', tone: 'accent', icon: CheckCircle2 },
  'in-progress': { label: 'In progress', tone: 'brand', icon: PlayCircle },
  'not-started': { label: 'Not started', tone: 'muted', icon: Clock },
}

function StepCard({ step, index, onToggle, onOpenActivity }) {
  const [open, setOpen] = useState(step.status === 'in-progress')
  const meta = STATUS_META[step.status] ?? STATUS_META['not-started']
  const StatusIcon = meta.icon
  const done = step.status === 'completed'
  const locked = step.status === 'not-started'

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        done ? 'border-accent/30' : step.status === 'in-progress' ? 'border-brand/30 shadow-md' : ''
      }`}
    >
      <div className="flex">
        {/* rail */}
        <div className="w-1.5 shrink-0 bg-surface-3 relative">
          <div
            className={`absolute inset-x-0 top-0 transition-all duration-700 ${
              done ? 'h-full grad-accent' : step.progress > 0 ? 'grad-brand' : ''
            }`}
            style={done || step.progress === 0 ? undefined : { height: `${step.progress}%` }}
          />
        </div>

        <div className="grow p-4 sm:p-5 min-w-0">
          <div className="flex items-start gap-3.5">
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-xl text-[13px] font-extrabold transition-colors ${
                done ? 'grad-accent text-white' : step.progress > 0 ? 'grad-brand text-white' : 'bg-surface-3 text-muted'
              }`}
            >
              {done ? <Check size={18} strokeWidth={3} /> : step.n}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`text-[15.5px] font-bold tracking-tight ${done ? 'text-ink-2' : 'text-ink'}`}>
                  {step.title}
                </h3>
                <Badge tone={meta.tone} size="xs" icon={StatusIcon}>
                  {meta.label}
                </Badge>
              </div>
              <p className="mt-1 text-[12.5px] text-muted leading-relaxed">{step.subtitle}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                  <ProgressBar value={step.progress} tone={done ? 'accent' : 'brand'} className="flex-1" />
                  <span className="text-[12px] font-extrabold tnum text-ink w-9 text-right">{step.progress}%</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted">
                  <Clock size={12} /> {step.est}
                </span>
                <button
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  className="inline-flex items-center gap-1 text-[11.5px] font-bold text-brand hover:underline"
                >
                  {open ? 'Hide details' : 'Show details'}
                  <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {open && (
            <div className="mt-4 pt-4 border-t border-line animate-[pop_0.25s_ease-out]">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted mb-2">Outcomes</p>
                  <ul className="space-y-1.5">
                    {step.outcomes.map((o) => (
                      <li key={o} className="text-[12px] text-ink-2 flex items-start gap-1.5">
                        <CheckCircle2 size={12} className="text-accent shrink-0 mt-px" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted mb-2">
                    Lessons ({step.lessons.filter((l) => l.done).length}/{step.lessons.length})
                  </p>
                  <ul className="space-y-1.5">
                    {step.lessons.map((l) => {
                      const lessonDone = l.done || !!step.lessonDone?.[l.id] || step.status === 'completed'
                      return (
                        <li key={l.id}>
                          <button
                            onClick={() => onToggle(step.id, l.id)}
                            className="w-full flex items-center gap-2 text-left group"
                            disabled={step.status === 'completed'}
                          >
                            <span
                              className={`grid size-4 shrink-0 place-items-center rounded border transition-all ${
                                lessonDone
                                  ? 'grad-accent border-transparent text-white'
                                  : 'border-line-strong group-hover:border-brand'
                              }`}
                            >
                              {lessonDone && <Check size={10} strokeWidth={4} />}
                            </span>
                            <span
                              className={`text-[12px] ${lessonDone ? 'text-muted line-through' : 'text-ink-2'} ${
                                step.status !== 'completed' ? 'group-hover:text-ink' : ''
                              }`}
                            >
                              {l.title}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <Button
                  size="sm"
                  variant={done ? 'outline' : 'primary'}
                  icon={done ? RotateCcw : CheckCircle2}
                  onClick={() => onToggleStep(step.id)}
                >
                  {done ? 'Mark incomplete' : 'Mark Complete'}
                </Button>
                <Button size="sm" variant="outline" icon={CalendarCheck} onClick={() => onOpenActivity(step)}>
                  Practice: {step.activity}
                </Button>
                {step.status === 'in-progress' && (
                  <Badge tone="brand" size="xs" icon={Sparkles}>
                    Current step
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function LearningPath() {
  const { learningPath, pathCompletion, nextStep, dispatch, toast, activities } = useApp()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    document.title = 'Learning Path · SkillSync'
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return learningPath
    return learningPath.filter((s) => s.status === filter)
  }, [learningPath, filter])

  const completedCount = learningPath.filter((s) => s.status === 'completed').length
  const totalHours = learningPath.reduce((a, s) => a + parseInt(s.est, 10), 0)

  const markComplete = (id) => {
    const step = learningPath.find((s) => s.id === id)
    if (!step) return
    if (step.status === 'completed') {
      dispatch({ type: 'PATH_UNCOMPLETE', id })
      toast(`“${step.title}” marked incomplete.`, { tone: 'info' })
      return
    }
    dispatch({ type: 'PATH_COMPLETE', id })
    setCelebrate(true)
    setTimeout(() => setCelebrate(false), 2600)
    toast(`“${step.title}” complete. Next step unlocked.`, {
      tone: 'success',
      title: 'Progress updated',
    })
  }

  const openActivity = (step) => {
    navigate('/practice')
  }

  return (
    <div className="space-y-5">
      {/* hero */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative p-6 sm:p-7 text-white">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-[240px] flex-1">
              <Badge className="!bg-white/15 !text-white">LEARNING PATH</Badge>
              <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight">
                {STUDENT.careerGoal}
              </h2>
              <p className="mt-2 text-[13.5px] text-white/75 max-w-xl leading-relaxed">
                Seven steps ordered by hiring impact and dependency. Complete a step to unlock the next — progress
                updates live and persists in this browser.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/55">Overall</p>
              <p className="text-[40px] font-extrabold tnum leading-none">{pathCompletion}%</p>
              <p className="text-[11.5px] text-white/60 mt-1">
                {completedCount} of {learningPath.length} steps
              </p>
            </div>
          </div>

          <div className="mt-5 h-2.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full grad-accent transition-[width] duration-1000 ease-out"
              style={{ width: `${pathCompletion}%` }}
            />
          </div>
        </div>
      </Card>

      {celebrate && (
        <div className="fixed inset-0 z-[150] pointer-events-none grid place-items-center animate-[pop_0.3s_ease-out]">
          <div className="rounded-2xl grad-accent text-white px-8 py-5 text-center shadow-2xl">
            <Trophy size={30} className="mx-auto mb-2" />
            <p className="text-[16px] font-extrabold">Step complete</p>
            <p className="text-[12.5px] text-white/85 mt-0.5">Your next step is unlocked</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Steps complete" value={`${completedCount}/${learningPath.length}`} sub="Across the full path" icon={Layers} tone="brand" />
        <StatCard label="Path completion" value={`${pathCompletion}%`} sub="Weighted by step progress" icon={Trophy} tone="accent" />
        <StatCard label="Total effort" value={`${totalHours} hrs`} sub="Sum of step estimates" icon={Clock} tone="sky" />
        <StatCard
          label="Activities done"
          value={activities.reduce((a, x) => a + x.completions, 0)}
          sub="Practice completions logged"
          icon={Dumbbell}
          tone="amber"
        />
      </div>

      {nextStep && nextStep.status !== 'completed' && (
        <Card className="p-5 border-brand/30 bg-brand-soft/40">
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl grad-brand text-white">
              <Sparkles size={19} />
            </span>
            <div className="flex-1 min-w-[200px]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand">Up next</p>
              <p className="mt-0.5 text-[16px] font-extrabold text-ink tracking-tight">
                Step {nextStep.n}: {nextStep.title}
              </p>
              <p className="text-[12.5px] text-muted mt-0.5">{nextStep.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={CheckCircle2} onClick={() => markComplete(nextStep.id)}>
                Mark Complete
              </Button>
              <Button variant="outline" icon={CalendarCheck} onClick={() => openActivity(nextStep)}>
                Practice activity
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Tabs
        tabs={[
          { id: 'all', label: 'All steps', count: learningPath.length },
          { id: 'in-progress', label: 'In progress', count: learningPath.filter((s) => s.status === 'in-progress').length },
          { id: 'completed', label: 'Completed', count: completedCount },
          { id: 'not-started', label: 'Not started', count: learningPath.filter((s) => s.status === 'not-started').length },
        ]}
        value={filter}
        onChange={setFilter}
        className="max-w-full"
      />

      {filtered.length === 0 ? (
        <Card className="p-10 text-center">
          <Layers size={26} className="mx-auto text-muted mb-3" />
          <p className="text-[14px] font-bold text-ink">Nothing in this view</p>
          <p className="mt-1 text-[12.5px] text-muted">
            Switch filters to see the rest of the path.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setFilter('all')}>
            Show all steps
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((s, i) => (
            <div key={s.id} className="animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 55}ms` }}>
              <StepCard
                step={s}
                index={i}
                onToggle={(stepId, lessonId) => {
                  dispatch({ type: 'PATH_TOGGLE_LESSON', id: stepId, lessonId })
                }}
                onToggleStep={markComplete}
                onOpenActivity={openActivity}
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-[14px] font-bold text-ink mb-3">Where this path came from</h3>
          <p className="text-[12.5px] text-ink-2 leading-relaxed">
            The order comes from the gap analysis on the Skill Gap page — gaps sorted by hiring impact weight, then by
            dependency so that Excel comes before modelling.
          </p>
          <Link to="/gap" className="block mt-3">
            <Button size="sm" variant="subtle" full iconRight={ArrowRight}>
              Review the gap analysis
            </Button>
          </Link>
        </Card>
        <Card className="p-5">
          <h3 className="text-[14px] font-bold text-ink mb-3">What happens at the end</h3>
          <p className="text-[12.5px] text-ink-2 leading-relaxed">
            Step 7 converts completed work into skill proof — verified badges and certificate records on your Progress
            page.
          </p>
          <Link to="/progress" className="block mt-3">
            <Button size="sm" variant="subtle" full iconRight={ArrowRight}>
              View skill proof
            </Button>
          </Link>
        </Card>
      </div>

      <SourceNote tone="brand">
        Path structure and step order are illustrative product design. Progress you set here is stored in your browser
        and can be cleared with Reset Demo Data.
      </SourceNote>
    </div>
  )
}
