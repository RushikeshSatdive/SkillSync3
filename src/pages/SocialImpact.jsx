import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  Clock,
  Compass,
  FolderCheck,
  HandHeart,
  Handshake,
  HeartHandshake,
  History,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sparkles as SparklesIcon,
  UserRoundCheck,
  Users,
  Zap,
} from 'lucide-react'

import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { Badge, Button, Card, Chip, SectionHeading, SourceNote, StatCard, toneOf } from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import Icon from '../components/Icon'
import { useApp } from '../store/AppStore'
import {
  IMPACT_AUDIENCES,
  IMPACT_DISCLAIMER,
  IMPACT_LABEL,
  IMPACT_METRICS,
  RESPONSIBLE_IMPLEMENTATION,
} from '../data/mockData'

const METRIC_ICONS = { HeartHandshake, UserRoundCheck, Clock, CalendarCheck }

/* ----------------------------------------------------------------- PAGE */

export default function SocialImpact() {
  const { state, dispatch, toast } = useApp()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.title = 'Social Impact · SkillSync'
  }, [])

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-24 -top-28 size-[340px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 bottom-[-120px] size-72 rounded-full bg-[#2dd4bf]/20 blur-3xl" />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16 text-center">
          <Badge className="!bg-white/15 !text-white">
            <HandHeart size={12} />
            SOCIAL IMPACT
          </Badge>
          <h2 className="mt-5 text-[32px] sm:text-[46px] font-extrabold tracking-tight leading-[1.08] max-w-3xl mx-auto">
            Turning Skills Into Opportunity
          </h2>
          <p className="mt-5 text-[15px] sm:text-[16px] text-white/80 leading-relaxed max-w-2xl mx-auto">
            SkillSync connects people who can teach with children who need accessible educational support — through
            vetted NGO partners, screened volunteers and a record that adds to a volunteer's portfolio rather than
            competing with their career.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="dark"
              className="!bg-white !text-brand hover:!bg-white/90"
              icon={state.volunteers ? Award : HeartHandshake}
              onClick={() => setOpen(true)}
            >
              {state.volunteers ? 'View volunteer record' : 'Become a Volunteer'}
            </Button>
            <Button
              size="lg"
              className="!bg-white/12 !text-white hover:!bg-white/20 border border-white/25"
              icon={ShieldCheck}
              onClick={() => document.getElementById('safeguarding')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How we keep it safe
            </Button>
          </div>
          {state.volunteers && (
            <p className="mt-4 text-[12.5px] text-white/70 inline-flex items-center gap-1.5">
              <Sparkles size={13} />
              Volunteer interest recorded in this demo — no submission was sent.
            </p>
          )}
        </div>
      </section>

      {/* metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {IMPACT_METRICS.map((m, i) => {
          const IconM = METRIC_ICONS[m.icon] ?? Users
          const t = toneOf(m.tone)
          return (
            <Card key={m.id} hover className="p-5 relative overflow-hidden">
              <div className={`absolute -right-6 -top-6 size-24 rounded-full ${t.bg} opacity-60 blur-2xl`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className={`grid size-10 place-items-center rounded-xl ${t.bg} ${t.text}`}>
                    <IconM size={19} />
                  </span>
                  <span className="text-[10px] font-bold text-muted">0{i + 1}</span>
                </div>
                <p className="mt-4 text-[32px] sm:text-[38px] font-extrabold tracking-tight tnum grad-text leading-none">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-[13px] font-bold text-ink">{m.label}</p>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-xl border border-amber/30 bg-amber-soft px-4 py-2.5 text-[12px] font-bold text-amber">
          <Zap size={14} />
          {IMPACT_LABEL}
        </span>
      </div>

      {/* audiences */}
      <div className="grid lg:grid-cols-2 gap-5">
        {IMPACT_AUDIENCES.map((aud) => {
          const t = toneOf(aud.tone)
          return (
            <Card key={aud.id} className="p-6">
              <div className="flex items-center gap-3">
                <span className={`grid size-11 place-items-center rounded-xl ${t.bg} ${t.text}`}>
                  <Icon name={aud.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-[17px] font-extrabold text-ink tracking-tight">{aud.title}</h3>
                  <p className="text-[12px] text-muted">
                    {aud.id === 'children' ? 'What they receive' : 'What they gain'}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {aud.points.map((p) => (
                  <div
                    key={p.title}
                    className="flex gap-3.5 rounded-xl border border-line bg-surface-2 p-4 hover:border-line-strong transition-colors"
                  >
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${t.bg} ${t.text}`}>
                      <Icon name={p.icon} size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-bold text-ink">{p.title}</p>
                      <p className="mt-1 text-[12.5px] text-ink-2 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>

      {/* responsible */}
      <Card id="safeguarding" className="p-6 scroll-mt-24">
        <SectionHeading
          eyebrow="Governance"
          title="Responsible implementation"
          description="Child-facing work carries obligations that a product demo cannot hand-wave. These are the commitments that would gate the programme."
        />

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {RESPONSIBLE_IMPLEMENTATION.map((r) => (
            <div key={r.title} className="rounded-2xl border border-line bg-surface-2 p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={r.icon} size={17} />
                </span>
                <h4 className="text-[14.5px] font-bold text-ink">{r.title}</h4>
              </div>
              <p className="mt-2.5 text-[12.5px] text-ink-2 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        <SourceNote tone="brand" className="mt-5" icon={ShieldAlert}>
          {IMPACT_DISCLAIMER} No child has been served by this prototype, and no beneficiary data exists anywhere in this
          build.
        </SourceNote>
      </Card>

      {/* how it would work */}
      <Card className="p-6">
        <SectionHeading eyebrow="The loop" title="How a session would run" description="The same exchange loop, pointed at an outcome that matters." />
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: 1, t: 'Volunteer applies', d: 'Skills offered, background screening completed, safeguarding policy acknowledged.', i: Users },
            { n: 2, t: 'Partner matches', d: 'An NGO partner maps a session to a beneficiary group with informed consent.', i: Handshake },
            { n: 3, t: 'Supervised session', d: 'Delivered on-platform, recorded, and governed by the partner’s policy.', i: ShieldCheck },
            { n: 4, t: 'Record issued', d: 'Hours and outcomes added to the volunteer’s SkillSync contribution record.', i: Award },
          ].map((s) => {
            const I = s.i
            return (
              <li key={s.n} className="relative rounded-2xl border border-line bg-surface-2 p-4">
                <span className="absolute -top-2.5 left-4 grid size-6 place-items-center rounded-full grad-brand text-[10.5px] font-extrabold text-white">
                  {s.n}
                </span>
                <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
                  <I size={17} />
                </span>
                <p className="mt-3 text-[13.5px] font-bold text-ink">{s.t}</p>
                <p className="mt-1 text-[12px] text-muted leading-relaxed">{s.d}</p>
              </li>
            )
          })}
        </ol>
      </Card>

      {/* CTA */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-accent" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="relative p-7 sm:p-9 text-center text-white">
          <SparklesIcon size={28} className="mx-auto mb-3" />
          <h3 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight leading-tight">
            Two hours a month. A child's term.
          </h3>
          <p className="mt-3 text-[14px] text-white/80 max-w-xl mx-auto leading-relaxed">
            Every SkillSync peer already teaches a skill every week. The impact programme simply redirects part of that
            habit toward children who have no access to it.
          </p>
          <Button
            size="lg"
            variant="dark"
            className="mt-6 !bg-white !text-accent hover:!bg-white/90"
            icon={state.volunteers ? Award : HeartHandshake}
            onClick={() => setOpen(true)}
          >
            {state.volunteers ? 'View volunteer record' : 'Become a Volunteer'}
          </Button>
        </div>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={state.volunteers ? 'Your volunteer record' : 'Become a Volunteer'}
        description="Simulated registration. This demo has no backend, no submission and no screening."
        size="md"
        icon={HeartHandshake}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
            {state.volunteers ? (
              <Button
                variant="outline"
                icon={History}
                onClick={() => {
                  dispatch({ type: 'TOGGLE_VOLUNTEER' })
                  toast('Volunteer record cleared.', { tone: 'info' })
                  setOpen(false)
                }}
              >
                Withdraw interest
              </Button>
            ) : (
              <Button
                variant="accent"
                icon={HeartHandshake}
                onClick={() => {
                  dispatch({ type: 'TOGGLE_VOLUNTEER' })
                  toast('Volunteer interest recorded in this demo only.', {
                    tone: 'success',
                    title: 'Simulated successfully',
                  })
                  setOpen(false)
                }}
              >
                Record my interest
              </Button>
            )}
          </>
        }
      >
        {state.volunteers ? (
          <div className="space-y-3">
            <div className="rounded-xl bg-accent-soft border border-accent/25 p-4 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent text-white">
                <Award size={19} />
              </span>
              <div>
                <p className="text-[13.5px] font-bold text-ink">Contributor · Pending verification</p>
                <p className="text-[11.5px] text-muted mt-0.5">Recorded locally · no verification service exists</p>
              </div>
            </div>
            {[
              { l: 'Skills you could teach', v: 'Financial Analysis, Business Analysis' },
              { l: 'Partner matching', v: 'Pending — no NGO partners connected in this demo' },
              { l: 'Sessions delivered', v: '0' },
              { l: 'Record status', v: 'Draft' },
            ].map((x) => (
              <div key={x.l} className="flex items-start justify-between gap-4 py-2 border-b border-line last:border-0">
                <span className="text-[12.5px] text-muted">{x.l}</span>
                <span className="text-[12.5px] font-bold text-ink text-right">{x.v}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[13px] text-ink-2 leading-relaxed">
              In a live product this step would collect your skills, run identity and background screening, and match you
              with a vetted NGO partner near you. Here, it records a flag in local state so you can see the flow.
            </p>
            <ul className="space-y-2.5">
              {[
                'Screening takes 3–5 working days in the real programme',
                'Sessions are supervised and recorded by the partner',
                'One-to-one off-platform contact is prohibited',
                'You keep a contribution record on your SkillSync profile',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-[12.5px] text-ink-2">
                  <ShieldCheck size={14} className="text-accent shrink-0 mt-0.5" />
                  {x}
                </li>
              ))}
            </ul>
            <SourceNote tone="amber">{IMPACT_LABEL}. Nothing on this page represents delivered impact.</SourceNote>
          </div>
        )}
      </Modal>
    </div>
  )
}
