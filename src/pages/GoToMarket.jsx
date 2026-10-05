import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  GraduationCap,
  Handshake,
  Info,
  School,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge, Button, Card, Chip, Divider, ProgressBar, SectionHeading, SourceNote, StatCard, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { FUNNEL, GTM_CHANNELS, GTM_LABEL, GTM_TARGETS } from '../data/mockData'

const ICONS = {
  'Campus Ambassadors': GraduationCap,
  'Clubs & Communities': Users,
  'Placement Cells': BriefcaseBusiness,
  Workshops: MegaphoneIcon,
  'Inter-college Competitions': Trophy,
  Referrals: Sparkles,
  'Peer Invitations': Handshake,
  'Skill Challenges': Zap,
}

function MegaphoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 0 1-6-1.2V9" />
    </svg>
  )
}

function ChannelCard({ channel }) {
  const [open, setOpen] = useState(false)
  const IconC = ICONS[channel.name] ?? Target
  const t = toneOf(channel.tone)

  return (
    <Card hover className="p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className={`grid size-10 place-items-center rounded-xl ${t.bg} ${t.text}`}>
          <IconC size={18} />
        </span>
        <Chip tone={channel.tone} size="xs" className="!text-[11px]">
          {channel.target}
        </Chip>
      </div>

      <h3 className="mt-3.5 text-[14.5px] font-bold text-ink tracking-tight">{channel.name}</h3>
      <p className="mt-1 text-[12.5px] text-ink-2 leading-relaxed flex-1">{channel.detail}</p>

      <div className="mt-3.5">
        <ProgressBar value={channel.pct} tone={channel.tone} size="sm" showLabel label="Execution plan" />
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-bold text-brand hover:underline self-start"
      >
        {open ? 'Hide playbook' : 'Show playbook'}
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-2.5 space-y-1.5 animate-[pop_0.25s_ease-out]">
          {PLAYBOOKS[channel.name]?.map((p) => (
            <div key={p} className="flex items-start gap-2 rounded-lg bg-surface-2 border border-line px-3 py-2">
              <ArrowRight size={12} className="mt-1 text-brand shrink-0" />
              <span className="text-[11.5px] text-ink-2 leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

const PLAYBOOKS = {
  'Campus Ambassadors': [
    'Recruit 2 per campus, paid on activation not signups.',
    'Give them a live profile and a real match they can show.',
    'Weekly leaderboard drives the loop without discounting.',
  ],
  'Clubs & Communities': [
    'Run a free clinic for finance, analytics and marketing clubs.',
    'Offer the club a branded skill-gap report for its members.',
    'Convert club presidents into campus ambassadors.',
  ],
  'Placement Cells': [
    'Pitch the cell ahead of recruitment season, not during it.',
    'Share anonymised skill-gap data — cells rarely have it.',
    'Bulk onboarding for finalists at near-zero CAC.',
  ],
  Workshops: [
    'Free 60-minute skill clinics as the top-of-funnel event.',
    'Every attendee leaves with a generated gap report.',
    'Workshops convert far better than cold campus visits.',
  ],
  'Inter-college Competitions': [
    'Case and modelling contests with a peer jury.',
    'Prizes are skill-proof badges, not cash.',
    'Creates content and proof for the next campus at once.',
  ],
  Referrals: [
    'Give a month, get a month — capped to avoid discounting.',
    'Prompt after the first completed exchange, not at signup.',
    'Peer-to-peer invites carry the highest trust.',
  ],
  'Peer Invitations': [
    'Every profile invites the people they already teach.',
    'The teacher knows the learner already — trust is pre-built.',
    'Highest activation of any channel because it is warm.',
  ],
  'Skill Challenges': [
    'Cohort streaks that only complete when you practise.',
    'Seven-day Excel sprint is the flagship entry point.',
    'Finished cohorts convert to paid at a higher rate.',
  ],
}

export default function GoToMarket() {
  const { toast } = useApp()

  useEffect(() => {
    document.title = 'Go-To-Market · SkillSync'
  }, [])

  const conversionRates = useMemo(
    () => ({
      active: ((FUNNEL[1].value / FUNNEL[0].value) * 100).toFixed(0),
      paying: ((FUNNEL[2].value / FUNNEL[1].value) * 100).toFixed(0),
    }),
    [],
  )

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14">
          <Badge className="!bg-white/15 !text-white">
            <BriefcaseBusiness size={12} />
            GO-TO-MARKET
          </Badge>
          <h2 className="mt-5 text-[30px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] max-w-2xl">
            Campus by campus, not student by student
          </h2>
          <p className="mt-4 text-[14.5px] text-white/80 leading-relaxed max-w-2xl">
            Eight channels, but one motion: prove the exchange works at a single campus, then let peers invite each
            other. That is what holds acquisition cost at ₹450 instead of ₹4,500.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {GTM_TARGETS.map((x) => (
              <div key={x.id} className="rounded-xl bg-white/12 border border-white/20 px-4 py-3 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">{x.label}</p>
                <p className="mt-1 text-[26px] font-extrabold tnum leading-none">
                  {x.value}
                  {x.suffix}
                </p>
              </div>
            ))}
            <div className="rounded-xl bg-white/12 border border-white/20 px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Target CAC</p>
              <p className="mt-1 text-[26px] font-extrabold tnum leading-none">₹450</p>
            </div>
          </div>
        </div>
      </section>

      <SourceNote tone="amber" icon={Info}>
        {GTM_LABEL}. The funnel below is the plan we are working towards, not a report of what has happened.
      </SourceNote>

      {/* funnel */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <Card className="p-6">
          <SectionHeading
            eyebrow="Acquisition funnel"
            title="From registered to paying"
            description="Each stage has a different job. Signups mean nothing until someone completes a first exchange."
          />

          <div className="mt-7 space-y-4">
            {FUNNEL.map((f, i) => {
              const t = toneOf(f.tone)
              return (
                <div key={f.id} className="animate-[rise_0.45s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 110}ms` }}>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="text-[13px] font-bold text-ink">{f.label}</span>
                    <span className="text-[15px] font-extrabold tnum text-ink">{f.value.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="relative h-11 rounded-xl bg-surface-2 border border-line overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-xl bg-gradient-to-r ${t.grad} transition-[width] duration-1000 ease-out opacity-90`}
                      style={{ width: `${f.pct}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-[12.5px] font-bold text-white drop-shadow-sm">{f.pct}% of registered</span>
                    </div>
                  </div>
                  {i < FUNNEL.length - 1 && (
                    <div className="flex items-center gap-2 pl-4 pt-2">
                      <ArrowDown size={12} className="text-muted" />
                      <span className="text-[11.5px] font-semibold text-muted">
                        {i === 0 ? `${conversionRates.active}% activate weekly` : `${conversionRates.paying}% of active convert to paying`}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <Divider className="my-5" />

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { l: 'Registration → Active', v: `${conversionRates.active}%`, d: 'Completes one exchange' },
              { l: 'Active → Paying', v: `${conversionRates.paying}%`, d: 'Wants the full path' },
              { l: 'Registered → Paying', v: '10%', d: 'Blended end to end' },
            ].map((x) => (
              <div key={x.l} className="rounded-xl border border-line bg-surface-2 p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{x.l}</p>
                <p className="mt-1 text-[22px] font-extrabold tnum grad-text">{x.v}</p>
                <p className="text-[11px] text-muted mt-0.5">{x.d}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-ink">Campus targets</h3>
          <p className="text-[12.5px] text-muted mt-0.5">The distribution plan behind the funnel</p>
          <div className="mt-5 space-y-3">
            {GTM_TARGETS.map((x) => {
              const IconT = x.id === 'campuses' ? School : Handshake
              return (
                <div key={x.id} className="rounded-xl border border-line bg-surface-2 p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
                      <IconT size={17} />
                    </span>
                    <div>
                      <p className="text-[12px] font-bold text-ink">{x.label}</p>
                      <p className="text-[22px] font-extrabold tnum text-ink leading-none">{x.value}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="rounded-xl border border-line bg-surface-2 p-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Users size={17} />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-ink">Students per campus</p>
                  <p className="text-[22px] font-extrabold tnum text-ink leading-none">350</p>
                </div>
              </div>
              <p className="mt-2 text-[11.5px] text-muted leading-relaxed">
                100 campuses × ~350 registered students ≈ 35,000 users — the Year 3 SOM paying base.
              </p>
            </div>
          </div>
          <SourceNote tone="brand" className="mt-4">
            These are future targets. SkillSync has not reached a single campus yet — no traction is claimed.
          </SourceNote>
        </Card>
      </div>

      {/* channels */}
      <Card className="p-6">
        <SectionHeading
          eyebrow="Channels"
          title="Eight ways in"
          description="Expand any channel to see the execution playbook. Percentages show planned effort allocation, not results."
        />
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GTM_CHANNELS.map((c, i) => (
            <div key={c.id} className="animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 45}ms` }}>
              <ChannelCard channel={c} />
            </div>
          ))}
        </div>
      </Card>

      {/* effort chart */}
      <Card className="p-6">
        <h3 className="text-[15px] font-bold text-ink">Planned effort allocation</h3>
        <p className="text-[12.5px] text-muted mt-0.5">Share of acquisition effort by channel</p>
        <div className="h-[280px] mt-4 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GTM_CHANNELS}
              layout="vertical"
              margin={{ top: 4, right: 40, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={140}
                tick={{ fontSize: 11, fontWeight: 600 }}
              />
              <RTooltip
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v, n) => [`${v}%`, n.payload.target]}
              />
              <Bar dataKey="pct" radius={[0, 8, 8, 0]} maxBarSize={22}>
                {GTM_CHANNELS.map((c, i) => (
                  <Cell
                    key={i}
                    fill={['#4f46e5', '#9333ea', '#0d9488', '#0284c7', '#e11d48', '#7c3aed', '#10b981', '#d97706'][i % 8]}
                  />
                ))}
                <LabelList
                  dataKey="pct"
                  position="right"
                  formatter={(v) => `${v}%`}
                  style={{ fontSize: 11, fontWeight: 800, fill: 'var(--text)' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* phases */}
      <Card className="p-6">
        <SectionHeading eyebrow="Sequence" title="Three phases" />
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            {
              p: 'Phase 1 · Months 1–6',
              t: 'Prove the loop on 3 campuses',
              items: ['Manual matching to find what works', 'First 50 exchanges by hand', 'Validate the gap benchmark'],
            },
            {
              p: 'Phase 2 · Months 7–18',
              t: 'Automate and distribute',
              items: ['Matching rules shipped', 'Ambassador programme live', 'Free → Premium conversion tested'],
            },
            {
              p: 'Phase 3 · Months 19–36',
              t: 'Scale to 100 campuses',
              items: ['Placement-cell partnerships', '25 formal partnerships', '35,000 paying users'],
            },
          ].map((ph, i) => (
            <div key={ph.p} className="relative rounded-2xl border border-line bg-surface-2 p-5">
              <span className="absolute -top-2.5 left-5 rounded-full grad-brand px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                {i + 1}
              </span>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-brand">{ph.p}</p>
              <p className="mt-1.5 text-[14px] font-bold text-ink">{ph.t}</p>
              <ul className="mt-3 space-y-1.5">
                {ph.items.map((it) => (
                  <li key={it} className="text-[12.5px] text-ink-2 flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SourceNote tone="brand" className="mt-5">
          The sequencing exists to avoid automating a matching rule that has never produced a completed exchange.
        </SourceNote>
      </Card>
    </div>
  )
}
