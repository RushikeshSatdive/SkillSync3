import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownUp,
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  GraduationCap,
  Repeat,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react'

import { Avatar, Badge, Button, Card, Chip, Field, Input, Select, SourceNote } from '../ui/primitives'
import { Modal } from '../ui/Modal'
import { useApp } from '../../store/AppStore'
import { PEERS, STUDENT } from '../../data/mockData'

/** Peers whose teaching set intersects what the demo student wants to learn. */
function complementaryPeers() {
  return PEERS.filter((p) => p.teaching.some((t) => STUDENT.wantToLearn.includes(t)))
}

export default function SkillExchange() {
  const { state, dispatch, toast } = useApp()
  const [open, setOpen] = useState(false)
  const [peerId, setPeerId] = useState(complementaryPeers()[0]?.id ?? PEERS[0].id)
  const [topic, setTopic] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('19:00')
  const [duration, setDuration] = useState(45)
  const [error, setError] = useState('')

  const peers = useMemo(complementaryPeers, [])
  const peer = peers.find((p) => p.id === peerId) ?? peers[0]

  useEffect(() => {
    if (open && peer) setTopic(peer.teaching[0])
  }, [open, peerId]) // eslint-disable-line react-hooks/exhaustive-deps

  const active = state.exchanges

  const submit = () => {
    if (!date) {
      setError('Choose a date for the exchange.')
      return
    }
    const d = new Date(`${date}T${time}`)
    dispatch({
      type: 'START_EXCHANGE',
      peerId: peer.id,
      topic,
      date: Number.isNaN(d.getTime()) ? date : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      duration,
    })
    setOpen(false)
    toast(`Skill exchange with ${peer.name} set up for ${topic}.`, {
      tone: 'success',
      title: 'Session setup simulated',
    })
  }

  return (
    <>
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-[0.16] grid-bg" />
        <div className="absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-md">
              <Badge className="!bg-white/15 !text-white">
                <Repeat size={12} />
                SKILL EXCHANGE
              </Badge>
              <h2 className="mt-2.5 text-[22px] sm:text-[26px] font-extrabold text-white tracking-tight">
                Two-way, not one-way
              </h2>
              <p className="mt-2 text-[13.5px] text-white/75 leading-relaxed">
                Neither side pays. You each give a skill the other genuinely lacks, on a schedule that already works.
              </p>
            </div>
            <Button
              variant="dark"
              className="!bg-white !text-brand hover:!bg-white/90"
              icon={Zap}
              onClick={() => setOpen(true)}
            >
              Start Skill Exchange
            </Button>
          </div>

          {/* the exchange diagram */}
          <div className="mt-6 grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            {/* I teach */}
            <div className="rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <Avatar initials={STUDENT.initials} gradient="from-indigo-500 to-violet-600" size={38} ring={false} />
                <div>
                  <p className="text-[13px] font-bold text-white">{STUDENT.firstName} (you)</p>
                  <p className="text-[10.5px] uppercase tracking-wider text-white/55">I Teach</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {STUDENT.canTeach.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-white/20 border border-white/25 px-2.5 py-1 text-[11.5px] font-bold text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* arrows */}
            <div className="flex sm:flex-col items-center justify-center gap-2 shrink-0">
              <svg width="150" height="26" viewBox="0 0 150 26" className="hidden sm:block" aria-hidden="true">
                <defs>
                  <marker id="ssArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                    <path d="M0 0 L7 3.5 L0 7 z" fill="rgba(255,255,255,0.75)" />
                  </marker>
                </defs>
                <path
                  d="M4 8 H146"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  markerEnd="url(#ssArrow)"
                  className="animate-[dash_1.8s_linear_infinite]"
                />
                <path
                  d="M146 18 H4"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  markerEnd="url(#ssArrow)"
                  className="animate-[dash_1.8s_linear_infinite]"
                />
              </svg>
              <div className="sm:hidden flex items-center gap-2 text-white/70">
                <span className="h-px w-8 bg-white/40" />
                <ArrowDownUp size={16} />
                <span className="h-px w-8 bg-white/40" />
              </div>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/60">Exchange</span>
            </div>

            {/* peer teaches */}
            <div className="rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <Avatar initials={peer?.initials ?? '?'} gradient={peer?.accent ?? 'from-sky-500 to-blue-600'} size={38} ring={false} />
                <div>
                  <p className="text-[13px] font-bold text-white">{peer?.name ?? 'Matched peer'}</p>
                  <p className="text-[10.5px] uppercase tracking-wider text-white/55">Can teach you</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(peer?.teaching ?? []).map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-white/20 border border-white/25 px-2.5 py-1 text-[11.5px] font-bold text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {peer && (
                <p className="mt-3 text-[11.5px] text-white/65">
                  Wants to learn <span className="font-bold text-white">{peer.learning[0]}</span> — which you teach.
                </p>
              )}
            </div>
          </div>

          {/* scheduled exchanges */}
          {active.length > 0 && (
            <div className="mt-5 rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2.5">
                Scheduled in this demo ({active.length})
              </p>
              <ul className="space-y-2">
                {active.map((ex) => (
                  <li
                    key={ex.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl bg-white/10 border border-white/15 px-3.5 py-2.5"
                  >
                    <CalendarCheck size={15} className="text-emerald-300 shrink-0" />
                    <span className="text-[12.5px] font-semibold text-white">{ex.topic}</span>
                    <span className="text-[11.5px] text-white/60">
                      with {ex.peer} · {ex.date} · {ex.duration} min
                    </span>
                    <button
                      onClick={() => {
                        dispatch({ type: 'CANCEL_EXCHANGE', id: ex.id })
                        toast('Exchange cancelled.', { tone: 'info' })
                      }}
                      className="ml-auto grid size-7 place-items-center rounded-lg text-white/60 hover:bg-white/15 hover:text-white transition-colors"
                      aria-label="Cancel exchange"
                    >
                      <X size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Start a skill exchange"
        description="Simulated session setup. Nothing is sent, scheduled or stored on a server."
        size="lg"
        icon={Repeat}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CalendarCheck} onClick={submit}>
              Confirm exchange
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Exchange partner" id="peer" hint="Only peers whose skills complement yours are listed.">
            <Select id="peer" value={peerId} onChange={(e) => { setPeerId(e.target.value); setError('') }}>
              {peers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — teaches {p.teaching[0]}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Skill to learn" id="topic">
            <Select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {peer?.teaching.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Date" id="edate" error={error}>
              <Input id="edate" type="date" value={date} onChange={(e) => { setDate(e.target.value); setError('') }} />
            </Field>
            <Field label="Start time" id="etime" hint={peer ? `${peer.name} is usually free ${peer.slot}` : ''}>
              <Input id="etime" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
          </div>

          <Field label="Duration" id="edur">
            <div className="grid grid-cols-3 gap-2">
              {[30, 45, 60].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  aria-pressed={duration === d}
                  className={`h-10 rounded-xl border text-[13px] font-bold transition-all ${
                    duration === d
                      ? 'border-brand/40 bg-brand-soft text-brand'
                      : 'border-line bg-surface-2 text-ink-2 hover:border-line-strong'
                  }`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </Field>

          <div className="rounded-xl bg-surface-2 border border-line p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2.5">What happens in this exchange</p>
            <ol className="space-y-2">
              {[
                `You teach ${STUDENT.canTeach[0]} — something ${peer?.name.split(' ')[0]} wants to learn.`,
                `They teach you ${topic} — on your priority gap list.`,
                'Both sides get a skill-proof record entry for the session.',
              ].map((x, i) => (
                <li key={x} className="flex items-start gap-2 text-[12.5px] text-ink-2">
                  <span className="grid size-[18px] shrink-0 place-items-center rounded bg-accent text-white text-[9.5px] font-extrabold mt-px">
                    {i + 1}
                  </span>
                  {x}
                </li>
              ))}
            </ol>
          </div>

          <SourceNote tone="brand" icon={Sparkles}>
            Exchange setup is simulated in local state. Clearing it happens through Reset Demo Data.
          </SourceNote>
        </div>
      </Modal>
    </>
  )
}
