import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  GraduationCap,
  Landmark,
  MapPin,
  MessageCircle,
  Send,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'

import { Avatar, Badge, Button, Card, Chip, Divider, EmptyState, Field, InfoRow, Input, Select, SectionHeading, SourceNote, StatCard } from '../components/ui/primitives'
import { MatchRing } from '../components/ui/MatchRing'
import { ConfirmModal, Modal } from '../components/ui/Modal'
import { useApp } from '../store/AppStore'
import { MATCH_DISCLAIMER, MATCH_DIMENSIONS, PEERS, STUDENT } from '../data/mockData'

/* ------------------------------------------------------- MATCH PANEL */

function MatchPanel({ peer }) {
  return (
    <Card className="p-5 text-center relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${peer.accent}`} />
      <div className="flex justify-center pt-2">
        <MatchRing value={peer.score} size={158} stroke={10} label={peer.rank} />
      </div>

      <div className="mt-5 space-y-3 text-left">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">Match breakdown</p>
        {(peer.breakdown ?? MATCH_DIMENSIONS.map((d) => ({ ...d, value: peer.score - 3 }))).map((d) => (
          <div key={d.id}>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <span className="text-[12px] font-medium text-ink-2">{d.label}</span>
              <span className="text-[12px] font-extrabold tnum text-brand">{d.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
              <div
                className="h-full rounded-full grad-brand transition-[width] duration-1000 ease-out"
                style={{ width: `${d.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <SourceNote tone="brand" icon={BadgeCheck} className="mt-4 text-left">
        {MATCH_DISCLAIMER}
      </SourceNote>
    </Card>
  )
}

/* --------------------------------------------------------- SESSION */

function ScheduleModal({ open, onClose, peer, onSchedule }) {
  const [topic, setTopic] = useState(peer.teaching[0])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('19:00')
  const [duration, setDuration] = useState(45)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setTopic(peer.teaching[0])
      setDate('')
      setTime('19:00')
      setDuration(45)
      setError('')
    }
  }, [open, peer.teaching])

  const submit = () => {
    if (!date) {
      setError('Pick a date for the session.')
      return
    }
    onSchedule({ topic, date, time, duration })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule an activity"
      description={`Simulated session setup with ${peer.name}. Nothing is sent anywhere.`}
      icon={CalendarCheck}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={CalendarCheck} onClick={submit}>
            Confirm session
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="What will you work on?" id="topic">
          <Select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
            {peer.teaching.map((t) => (
              <option key={t}>{t}</option>
            ))}
            {peer.learning.map((t) => (
              <option key={t}>Teach me: {t}</option>
            ))}
          </Select>
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Date" id="date" error={error}>
            <Input id="date" type="date" value={date} onChange={(e) => { setDate(e.target.value); setError('') }} />
          </Field>
          <Field label="Start time" id="time" hint={`${peer.name} is usually free ${peer.slot}`}>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>
        </div>

        <Field label="Duration" id="dur">
          <div className="grid grid-cols-3 gap-2">
            {[30, 45, 60].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
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

        <div className="rounded-xl bg-surface-2 border border-line p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Exchange summary</p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-accent-soft border border-accent/20 p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{peer.name.split(' ')[0]} teaches</p>
              <p className="text-[12.5px] font-bold text-ink mt-0.5">{topic}</p>
            </div>
            <div className="rounded-lg bg-brand-soft border border-brand/20 p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand">You teach</p>
              <p className="text-[12.5px] font-bold text-ink mt-0.5">{STUDENT.canTeach.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* ------------------------------------------------------------- PAGE */

export default function PeerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { matches, dispatch, toast, state } = useApp()
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [message, setMessage] = useState('')

  const peer = useMemo(() => matches.find((p) => p.id === id), [matches, id])

  useEffect(() => {
    document.title = peer ? `${peer.name} · Peer Profile · SkillSync` : 'Peer Profile · SkillSync'
  }, [peer])

  if (!peer) {
    return (
      <EmptyState
        icon={Users}
        title="Peer not found"
        description="That profile does not exist in the demo dataset."
        action={
          <Link to="/matching">
            <Button variant="primary">Back to matching</Button>
          </Link>
        }
      />
    )
  }

  const exchange = state.exchanges.find((e) => e.peerId === peer.id)

  return (
    <div className="space-y-5">
      <button
        onClick={() => navigate('/matching')}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-muted hover:text-brand transition-colors"
      >
        <ArrowLeft size={14} />
        Back to peer matching
      </button>

      {/* profile header */}
      <Card className="relative overflow-hidden border-transparent">
        <div className={`absolute inset-0 bg-gradient-to-br ${peer.accent} opacity-[0.13]`} />
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${peer.accent}`} />
        <div className="relative p-6 sm:p-7">
          <div className="flex flex-wrap items-start gap-5">
            <div className="relative">
              <Avatar initials={peer.initials} gradient={peer.accent} size={78} ring={false} className="shadow-lg" />
              {peer.verified && (
                <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-accent text-white ring-[3px] ring-[var(--surface)]">
                  <BadgeCheck size={14} />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[220px]">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[24px] sm:text-[28px] font-extrabold text-ink tracking-tight leading-tight">
                  {peer.name}
                </h2>
                <Badge tone={peer.rank === 'Top Match' ? 'brand' : 'muted'}>
                  {peer.rank} · {peer.score}%
                </Badge>
              </div>
              <p className="mt-1 text-[13px] text-muted flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1">
                  <GraduationCap size={12} /> {peer.branch}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> {peer.campus}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {peer.badges.map((b) => (
                  <Badge key={b} tone={b.includes('Top') ? 'brand' : 'accent'} size="xs">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button
                variant={peer.connected ? 'accent' : 'primary'}
                icon={peer.connected ? CheckCircle2 : Zap}
                onClick={() => (peer.connected ? dispatch({ type: 'DISCONNECT', id: peer.id }) : setConfirm(true))}
              >
                {peer.connected ? 'Connected' : 'Connect'}
              </Button>
              <Button variant="outline" icon={Calendar} onClick={() => setScheduleOpen(true)}>
                Schedule Activity
              </Button>
              <Button
                variant="ghost"
                icon={peer.saved ? BookmarkCheck : Bookmark}
                onClick={() => {
                  dispatch({ type: 'TOGGLE_SAVE', id: peer.id })
                  toast(peer.saved ? 'Removed from saved.' : `${peer.name} saved.`, {
                    tone: peer.saved ? 'info' : 'success',
                  })
                }}
                aria-label="Save peer"
              />
            </div>
          </div>

          <p className="mt-5 text-[13.5px] text-ink-2 leading-relaxed max-w-3xl">{peer.bio}</p>
        </div>
      </Card>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rating" value={`${peer.rating}/5`} sub="From peer sessions" icon={Star} tone="amber" />
        <StatCard label="Skills exchanged" value={peer.exchanged} sub="Two-way skill trades" icon={ArrowLeftRight} tone="brand" />
        <StatCard label="Sessions completed" value={peer.sessions} sub="Teaching and learning" icon={Users} tone="accent" />
        <StatCard label="Sessions with you" value={exchange ? 1 : 0} sub={exchange ? 'Scheduled exchange' : 'None yet'} icon={CalendarCheck} tone="sky" />
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-5">
        <div className="space-y-5">
          {/* skills */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                  <GraduationCap size={17} />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-ink">Can teach</h3>
                  <p className="text-[11.5px] text-muted">{peer.teaching.length} skills offered</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {peer.teaching.map((t) => (
                  <div
                    key={t}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 border ${
                      STUDENT.wantToLearn.includes(t)
                        ? 'bg-accent-soft border-accent/30'
                        : 'bg-surface-2 border-line'
                    }`}
                  >
                    <span className="text-[13px] font-semibold text-ink">{t}</span>
                    {STUDENT.wantToLearn.includes(t) && (
                      <Badge tone="accent" size="xs">
                        You want this
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
                  <TargetIcon />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-ink">Wants to learn</h3>
                  <p className="text-[11.5px] text-muted">{peer.learning.length} skill in return</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {peer.learning.map((t) => (
                  <div
                    key={t}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 border ${
                      STUDENT.canTeach.includes(t)
                        ? 'bg-brand-soft border-brand/30'
                        : 'bg-surface-2 border-line'
                    }`}
                  >
                    <span className="text-[13px] font-semibold text-ink">{t}</span>
                    {STUDENT.canTeach.includes(t) && (
                      <Badge tone="brand" size="xs">
                        You teach this
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-surface-2 border border-line p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">The exchange</p>
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <span className="text-accent">{peer.name.split(' ')[0]} teaches {peer.teaching[0]}</span>
                  <ArrowRight size={12} className="shrink-0 text-muted" />
                  <span className="text-brand">you teach {STUDENT.canTeach[0]}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* details */}
          <Card className="p-5">
            <h3 className="text-[15px] font-bold text-ink mb-4">Profile details</h3>
            <div className="grid sm:grid-cols-2 gap-x-6">
              <div>
                <InfoRow label="Career goal" value={peer.careerGoal} />
                <InfoRow label="Skill level" value={peer.level} />
                <InfoRow label="Availability" value={peer.availability} />
              </div>
              <div>
                <InfoRow label="Time slot" value={peer.slot} />
                <InfoRow label="Learning style" value={peer.style} />
                <InfoRow label="Rating" value={`${peer.rating}/5`} />
              </div>
            </div>

            <Divider className="my-4" />

            <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2.5">Strengths</p>
            <div className="flex flex-wrap gap-2">
              {peer.strengths.map((s) => (
                <Chip key={s} tone="accent" icon={CheckCircle2}>
                  {s}
                </Chip>
              ))}
            </div>
          </Card>

          {/* activity */}
          <Card className="p-5">
            <h3 className="text-[15px] font-bold text-ink mb-4">Recent exchange history</h3>
            <ol className="relative border-l border-line ml-2 space-y-4">
              {[
                { t: 'SEO keyword research walkthrough', d: '2 days ago', m: '45 min' },
                { t: 'Financial statement teardown', d: '1 week ago', m: '60 min' },
                { t: 'Campaign metrics review', d: '2 weeks ago', m: '30 min' },
                { t: 'First introduction session', d: '1 month ago', m: '30 min' },
              ].map((e, i) => (
                <li key={e.t} className="pl-5 relative animate-[pop_0.3s_ease-out]" style={{ animationDelay: `${i * 70}ms` }}>
                  <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-brand ring-4 ring-[var(--surface)]" />
                  <p className="text-[13px] font-semibold text-ink">{e.t}</p>
                  <p className="text-[11.5px] text-muted mt-0.5">
                    {e.d} · {e.m}
                  </p>
                </li>
              ))}
            </ol>
            <SourceNote tone="muted" className="mt-4">
              Demo history. No real sessions have taken place — this dataset exists to show how a completed exchange
              record would read.
            </SourceNote>
          </Card>
        </div>

        {/* aside */}
        <div className="space-y-5">
          <MatchPanel peer={peer} />

          {exchange && (
            <Card className="p-5 border-accent/30 bg-accent-soft">
              <div className="flex items-center gap-2">
                <CalendarCheck size={16} className="text-accent" />
                <p className="text-[13px] font-bold text-ink">Scheduled exchange</p>
              </div>
              <p className="mt-2 text-[12.5px] text-ink-2 leading-relaxed">
                {exchange.topic} · {exchange.date} at {exchange.time} · {exchange.duration} min
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="mt-3 !text-rose"
                icon={ArrowLeftRight}
                onClick={() => {
                  dispatch({ type: 'CANCEL_EXCHANGE', id: exchange.id })
                  toast('Scheduled exchange cancelled.', { tone: 'info' })
                }}
              >
                Cancel session
              </Button>
            </Card>
          )}

          <Card className="p-5">
            <h3 className="text-[14px] font-bold text-ink mb-3">Actions</h3>
            <div className="space-y-2">
              <Button
                variant="primary"
                full
                icon={Calendar}
                onClick={() => setScheduleOpen(true)}
                disabled={!peer.connected}
              >
                {peer.connected ? 'Schedule Activity' : 'Connect to schedule'}
              </Button>
              <Button
                variant="outline"
                full
                icon={MessageCircle}
                onClick={() => {
                  if (!peer.connected) {
                    toast('Connect with this peer first.', { tone: 'warn' })
                    return
                  }
                  setMsgOpen(true)
                }}
              >
                Send a message
              </Button>
              <Button
                variant="ghost"
                full
                icon={peer.saved ? BookmarkCheck : Bookmark}
                onClick={() => {
                  dispatch({ type: 'TOGGLE_SAVE', id: peer.id })
                  toast(peer.saved ? 'Removed from saved.' : 'Peer saved.', { tone: 'success' })
                }}
              >
                {peer.saved ? 'Saved' : 'Save match'}
              </Button>
            </div>
            {!peer.connected && (
              <p className="mt-3 text-[11.5px] text-muted leading-relaxed">
                Scheduling unlocks after you connect — mirroring how a real exchange would need agreement first.
              </p>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="text-[14px] font-bold text-ink mb-3">Other peers</h3>
            <ul className="space-y-2">
              {matches
                .filter((p) => p.id !== peer.id)
                .slice(0, 4)
                .map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/peer/${p.id}`}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-surface-2 transition-colors"
                    >
                      <Avatar initials={p.initials} gradient={p.accent} size={32} ring={false} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-bold text-ink truncate">{p.name}</p>
                        <p className="text-[11px] text-muted truncate">Teaches {p.teaching[0]}</p>
                      </div>
                      <span className="text-[12px] font-extrabold tnum text-brand shrink-0">{p.score}%</span>
                    </Link>
                  </li>
                ))}
            </ul>
            <Link to="/matching" className="block mt-3">
              <Button size="sm" variant="subtle" full iconRight={ArrowRight}>
                All peers
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      <ScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        peer={peer}
        onSchedule={(s) => {
          const date = new Date(`${s.date}T${s.time}`)
          dispatch({
            type: 'START_EXCHANGE',
            peerId: peer.id,
            topic: s.topic,
            date: Number.isNaN(date.getTime())
              ? s.date
              : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            duration: s.duration,
          })
          setScheduleOpen(false)
          toast(`Exchange scheduled with ${peer.name}.`, {
            tone: 'success',
            title: 'Session setup simulated',
          })
        }}
      />

      <Modal
        open={msgOpen}
        onClose={() => setMsgOpen(false)}
        title={`Message ${peer.name.split(' ')[0]}`}
        description="Simulated composer — no message backend exists in this demo."
        icon={MessageCircle}
        footer={
          <>
            <Button variant="ghost" onClick={() => setMsgOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={Send}
              onClick={() => {
                if (!message.trim()) {
                  toast('Type a message first.', { tone: 'warn' })
                  return
                }
                setMsgOpen(false)
                setMessage('')
                toast('Message simulated successfully.', { tone: 'success', title: 'Sent (simulated)' })
              }}
            >
              Send
            </Button>
          </>
        }
      >
        <Field label="Message" id="msg">
          <Input
            id="msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Hi ${peer.name.split(' ')[0]}, could we do a session on ${peer.teaching[0]}?`}
          />
        </Field>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            `Can we meet this week for ${peer.teaching[0]}?`,
            `I'd love to help you with ${peer.learning[0]}.`,
            'Which slot works best for you?',
          ].map((s) => (
            <button
              key={s}
              onClick={() => setMessage(s)}
              className="rounded-lg border border-line bg-surface-2 px-2 py-1 text-[11px] font-medium text-ink-2 hover:border-brand/40 hover:text-brand transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </Modal>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'CONNECT', id: peer.id })
          toast('Connection request simulated successfully.', {
            tone: 'success',
            title: `Connected with ${peer.name}`,
          })
        }}
        title={`Connect with ${peer.name}?`}
        description={`${peer.name} teaches ${peer.teaching[0]} and wants to learn ${peer.learning[0]} — a direct two-way exchange with your skill profile.`}
        confirmLabel="Send connection request"
        icon={Zap}
      />
    </div>
  )
}

function TargetIcon() {
  return <Trophy size={17} />
}
