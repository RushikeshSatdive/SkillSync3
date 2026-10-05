import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Landmark,
  ListChecks,
  Route,
  ScanSearch,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from 'recharts'

import { Badge, Button, Card, Chip, EmptyState, ProgressBar, SectionHeading, SourceNote, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import {
  CURRENT_SKILLS,
  GAP_SKILLS,
  GAP_PRIMARY,
  MATCH_DISCLAIMER,
  REQUIRED_SKILLS,
  STUDENT,
} from '../data/mockData'

/* --------------------------------------------------------- COMPARISON */

function SkillsCompare() {
  const [tab, setTab] = useState('current')
  const data = tab === 'current' ? CURRENT_SKILLS : GAP_PRIMARY.map((g) => ({ name: g.name, level: g.current }))

  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex p-1 rounded-xl bg-surface-2 border border-line">
          {[
            { id: 'current', label: 'Current Skills', icon: TrendingUp },
            { id: 'required', label: 'Required Skills', icon: Target },
          ].map((t) => {
            const I = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink-2'
                }`}
              >
                <I size={13} />
                {t.label}
              </button>
            )
          })}
        </div>
        <Badge tone={tab === 'current' ? 'accent' : 'brand'} size="xs">
          {data.length} skills
        </Badge>
      </div>

      <div className="space-y-4">
        {data.map((s) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="text-[13px] font-semibold text-ink">{s.name}</span>
              <span className="text-[12px] font-extrabold tnum text-ink-2">{s.level}%</span>
            </div>
            <ProgressBar value={s.level} tone={tab === 'current' ? 'accent' : 'brand'} />
          </div>
        ))}
      </div>

      {tab === 'current' && (
        <p className="mt-5 pt-4 border-t border-line text-[12px] text-muted leading-relaxed">
          These are the skills you already have. The gap analysis compares them against what{' '}
          <span className="font-semibold text-ink-2">{STUDENT.careerGoal}</span> screens for.
        </p>
      )}
    </Card>
  )
}

/* ------------------------------------------------------------ RADAR */

function GapRadar() {
  const data = useMemo(
    () => GAP_SKILLS.map((g) => ({ skill: g.name.replace('Financial ', '').replace('Advanced ', ''), current: g.current, target: g.target })),
    [],
  )

  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-bold text-ink">Gap map</h3>
          <p className="text-[12px] text-muted mt-0.5">Current level vs target level</p>
        </div>
        <div className="flex flex-col gap-1 text-[10.5px] font-semibold">
          <span className="inline-flex items-center gap-1.5 text-brand">
            <span className="size-2 rounded-sm bg-brand" /> Target
          </span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <span className="size-2 rounded-sm bg-accent" /> Current
          </span>
        </div>
      </div>
      <div className="h-[260px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} />
            <RTooltip
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Radar
              name="Target"
              dataKey="target"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="#4f46e5"
              fillOpacity={0.12}
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke="#0d9488"
              strokeWidth={2}
              fill="#0d9488"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------- AI CONSOLE */

const ANALYSIS_STEPS = [
  'Parsing career goal: Investment Banking',
  'Loading role skill benchmark (illustrative)',
  'Diffing against 3 current skills',
  'Computing gap deltas and priority weights',
  'Ranking 4 gaps by hiring impact',
  'Selecting matching peer profiles',
  'Ordering learning path by dependency',
]

function AiConsole({ running, done }) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    if (!running) return
    setLines([])
    let i = 0
    const t = setInterval(() => {
      if (i < ANALYSIS_STEPS.length) {
        setLines((l) => [...l, ANALYSIS_STEPS[i]])
        i += 1
      } else {
        clearInterval(t)
      }
    }, 260)
    return () => clearInterval(t)
  }, [running])

  if (!running && !done) return null

  return (
    <div className="rounded-2xl border border-line bg-[#0b1020] overflow-hidden animate-[pop_0.3s_ease-out]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <Cpu size={14} className="text-[#818cf8]" />
        <span className="text-[11.5px] font-bold text-white/80">SkillSync analysis engine</span>
        {running && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#2dd4bf]">
            <span className="size-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
            PROCESSING
          </span>
        )}
        {done && !running && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#34d399]">
            <CheckCircle2 size={12} />
            COMPLETE
          </span>
        )}
      </div>
      <div className="px-4 py-3.5 space-y-1.5 font-mono text-[11.5px] min-h-[112px]">
        {lines.map((l, i) => (
          <p key={l} className="flex items-start gap-2 animate-[pop_0.2s_ease-out]">
            <span className="text-[#2dd4bf] shrink-0">›</span>
            <span className="text-white/70">{l}</span>
            <span className="ml-auto text-white/25 shrink-0">{((i + 1) * 0.13).toFixed(2)}s</span>
          </p>
        ))}
        {running && (
          <p className="flex items-center gap-2 text-white/40">
            <span className="text-[#818cf8]">›</span>
            <span className="inline-flex gap-1">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="size-1 rounded-full bg-white/50 animate-bounce"
                  style={{ animationDelay: `${d * 120}ms` }}
                />
              ))}
            </span>
            analysing…
          </p>
        )}
        {done && !running && (
          <p className="flex items-center gap-2 text-[#34d399] pt-1">
            <CheckCircle2 size={12} />
            Path generated from {lines.length} analysis steps.
          </p>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------- GENERATED */

function GeneratedPath({ onRegenerate }) {
  const { learningPath, pathCompletion } = useApp()
  const navigate = useNavigate()

  return (
    <div className="mt-5 card overflow-hidden animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)]">
      <div className="p-5 grad-brand text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge className="!bg-white/20 !text-white">RECOMMENDED LEARNING PATH</Badge>
            <h3 className="mt-2 text-[20px] font-extrabold tracking-tight">
              Investment Banking · {learningPath.length} steps
            </h3>
            <p className="mt-1 text-[13px] text-white/75">
              Ordered by hiring impact, then by dependency — you cannot model before Excel is solid.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60">Path completion</p>
            <p className="text-[30px] font-extrabold tnum leading-none">{pathCompletion}%</p>
          </div>
        </div>
      </div>

      <ol className="divide-y divide-[var(--border)]">
        {learningPath.map((s, i) => {
          const done = s.status === 'completed'
          return (
            <li key={s.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-2 transition-colors">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-lg text-[12px] font-extrabold ${
                  done ? 'grad-accent text-white' : 'bg-brand-soft text-brand'
                }`}
              >
                {done ? <CheckCircle2 size={15} /> : s.n}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-bold text-ink truncate">{s.title}</p>
                <p className="text-[11.5px] text-muted mt-0.5 truncate">{s.subtitle}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 w-28">
                <ProgressBar value={s.progress} size="xs" tone={done ? 'accent' : 'brand'} className="flex-1" />
                <span className="text-[11px] font-bold tnum text-muted w-8 text-right">{s.progress}%</span>
              </div>
              <span className="text-[11px] font-semibold text-muted hidden md:block w-14 text-right">{s.est}</span>
              {i === 0 && !done && <Badge tone="amber" size="xs">Start here</Badge>}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-2.5 px-5 py-4 border-t border-line bg-surface-2/60">
        <Button variant="primary" icon={Route} onClick={() => navigate('/path')}>
          Open learning path
        </Button>
        <Button variant="outline" icon={Sparkles} onClick={onRegenerate}>
          Regenerate
        </Button>
        <Button variant="ghost" iconRight={ArrowRight} onClick={() => navigate('/matching')}>
          Find peers for these gaps
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- PAGE */

export default function SkillGap() {
  const navigate = useNavigate()
  const { toast } = useApp()
  const [status, setStatus] = useState('idle') // idle | running | done
  const timerRef = useRef(null)

  useEffect(() => {
    document.title = 'Skill Gap Analysis · SkillSync'
    return () => clearTimeout(timerRef.current)
  }, [])

  const generate = () => {
    if (status === 'running') return
    setStatus('running')
    toast('AI is analyzing your career goal…', { tone: 'info', title: 'Analysis started', duration: 2200 })
    timerRef.current = setTimeout(() => {
      setStatus('done')
      toast('Learning path generated from your gap ranking.', { tone: 'success', title: 'Path ready' })
    }, 2600)
  }

  const totalWeight = GAP_SKILLS.reduce((a, g) => a + g.weight, 0)
  const avgCurrent = Math.round(GAP_SKILLS.reduce((a, g) => a + g.current, 0) / GAP_SKILLS.length)
  const avgTarget = Math.round(GAP_SKILLS.reduce((a, g) => a + g.target, 0) / GAP_SKILLS.length)

  return (
    <div className="space-y-6">
      {/* header band */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="relative p-6 sm:p-7 text-white flex flex-wrap items-center gap-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 border border-white/25 backdrop-blur">
            <ScanSearch size={26} />
          </span>
          <div className="flex-1 min-w-[220px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">Your Career Skill Gap</p>
            <h2 className="mt-1.5 text-[24px] sm:text-[30px] font-extrabold tracking-tight leading-tight">
              Career: {STUDENT.careerGoal}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-white/75">
              Required skills: {REQUIRED_SKILLS.join(' · ')}
            </p>
          </div>
          <div className="flex gap-5 sm:gap-7">
            {[
              { l: 'Current avg', v: `${avgCurrent}%` },
              { l: 'Target avg', v: `${avgTarget}%` },
              { l: 'Open gap', v: `${avgTarget - avgCurrent}pts` },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/55">{s.l}</p>
                <p className="text-[22px] font-extrabold tnum leading-tight">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <SkillsCompare />
        <GapRadar />
      </div>

      {/* gap bars */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <SectionHeading
            eyebrow="Priority ranking"
            title="Skill gap breakdown"
            description="Each bar shows where you are today against the target level for this role, weighted by hiring impact."
          />
          <div className="flex items-center gap-2">
            <Badge tone="brand" size="xs">
              {GAP_SKILLS.length} gaps
            </Badge>
            <Badge tone="muted" size="xs">
              Weight {totalWeight}%
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {GAP_SKILLS.map((g, i) => {
            const delta = g.target - g.current
            return (
              <div
                key={g.id}
                className="grid lg:grid-cols-[minmax(0,240px)_1fr_minmax(0,180px)] gap-4 items-center animate-[rise_0.4s_ease-out_both]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13.5px] font-bold text-ink truncate">{g.name}</p>
                    <Badge tone={g.priority === 'High' ? 'rose' : 'amber'} size="xs">
                      {g.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[11.5px] text-muted leading-snug line-clamp-2">{g.why}</p>
                </div>

                <div className="relative">
                  <div className="relative h-9">
                    <div className="absolute inset-0 rounded-lg bg-surface-2 border border-line" />
                    {/* current fill */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] transition-[width] duration-1000 ease-out"
                      style={{ width: `${g.current}%` }}
                    />
                    {/* remaining gap */}
                    <div
                      className="absolute inset-y-0 rounded-r-lg bg-[repeating-linear-gradient(45deg,rgba(225,29,72,0.16),rgba(225,29,72,0.16)_6px,rgba(225,29,72,0.07)_6px,rgba(225,29,72,0.07)_12px)] transition-[left,width] duration-1000 ease-out"
                      style={{ left: `${g.current}%`, width: `${delta}%` }}
                    />
                    {/* target marker */}
                    <div
                      className="absolute -top-1 -bottom-1 w-[2px] bg-ink/80 rounded-full transition-[left] duration-1000 ease-out"
                      style={{ left: `${g.target}%` }}
                      title={`Target ${g.target}%`}
                    />
                    <div className="absolute inset-0 flex items-center px-3 gap-3">
                      <span className="text-[11.5px] font-extrabold tnum text-white drop-shadow-sm">
                        {g.current}%
                      </span>
                      <span className="ml-auto text-[11px] font-bold tnum text-muted">
                        target {g.target}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-[10.5px] font-semibold text-muted">
                    <span>0%</span>
                    <span className="ml-auto">100%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: 'Weight', v: `${g.weight}%` },
                    { l: 'To close', v: `${delta}pts` },
                    { l: 'Est.', v: `${g.weeks}w` },
                  ].map((x) => (
                    <div key={x.l} className="rounded-lg bg-surface-2 border border-line px-2 py-1.5 text-center">
                      <p className="text-[9.5px] font-bold uppercase tracking-wider text-muted">{x.l}</p>
                      <p className="text-[13px] font-extrabold tnum text-ink">{x.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* generate */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
              <Brain size={20} />
            </span>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold text-ink">Ready to close the gaps?</h3>
              <p className="text-[12.5px] text-muted mt-0.5">
                Generate an ordered learning path from this gap ranking.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={Zap}
            onClick={generate}
            loading={status === 'running'}
            disabled={status === 'running'}
          >
            {status === 'running' ? 'AI is analyzing your career goal…' : 'Generate Learning Path'}
          </Button>
        </div>

        <div className="mt-4">
          <AiConsole running={status === 'running'} done={status === 'done'} />
        </div>

        {status === 'done' && <GeneratedPath onRegenerate={() => { setStatus('idle'); setTimeout(generate, 60) }} />}

        {status === 'idle' && (
          <SourceNote tone="brand" className="mt-4" icon={Cpu}>
            This is a simulated frontend interaction. No model runs, no data leaves your browser, and no backend is
            called. The output is generated from pre-computed demo values.
          </SourceNote>
        )}
      </Card>

      <Card className="p-5">
        <h3 className="text-[15px] font-bold text-ink mb-4">What the benchmark says</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {GAP_SKILLS.slice(0, 2).map((g) => (
            <div key={g.id} className="rounded-2xl border border-line bg-surface-2 p-4">
              <div className="flex items-center gap-2">
                <ListChecks size={15} className="text-brand" />
                <p className="text-[13.5px] font-bold text-ink">{g.name}</p>
              </div>
              <p className="mt-2 text-[12.5px] text-ink-2 leading-relaxed">{g.why}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.modules.map((m) => (
                  <Chip key={m} tone="brand" size="xs" className="!text-[11px]">
                    {m}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" icon={Landmark} onClick={() => navigate('/matching')}>
            Match peers for this gap
          </Button>
          <Button variant="ghost" size="sm" iconRight={ArrowRight} onClick={() => navigate('/practice')}>
            Start a 20-minute activity
          </Button>
        </div>
        <SourceNote tone="accent" className="mt-4">
          {MATCH_DISCLAIMER} Skill levels and targets are illustrative role benchmarks built for the demo.
        </SourceNote>
      </Card>
    </div>
  )
}
