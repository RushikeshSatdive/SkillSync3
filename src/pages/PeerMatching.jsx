import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeftRight,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Filter,
  Info,
  Landmark,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
  Zap,
} from 'lucide-react'

import { Avatar, Badge, Button, Card, Chip, EmptyState, Input, SectionHeading, Select, SourceNote, toneOf } from '../components/ui/primitives'
import { ScoreRing } from '../components/ui/MatchRing'
import SkillExchange from '../components/exchange/SkillExchange'
import { ConfirmModal } from '../components/ui/Modal'
import { useApp } from '../store/AppStore'
import { MATCH_DISCLAIMER, MATCH_FILTERS, SORT_OPTIONS, STUDENT } from '../data/mockData'

const DEFAULT_FILTERS = {
  skill: MATCH_FILTERS.skill[0],
  careerGoal: MATCH_FILTERS.careerGoal[0],
  availability: MATCH_FILTERS.availability[0],
  skillLevel: MATCH_FILTERS.skillLevel[0],
  learningPreference: MATCH_FILTERS.learningPreference[0],
}

/* --------------------------------------------------------- FILTER BAR */

function FilterBar({ filters, setFilters, search, setSearch, onClear, activeCount }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <Input
            size="sm"
            className="pl-9"
            placeholder="Search peers by name or skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search peers"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-6 place-items-center rounded-md text-muted hover:bg-surface-2"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <Button
          size="sm"
          variant={activeCount ? 'subtle' : 'outline'}
          icon={SlidersHorizontal}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden"
        >
          Filters{activeCount ? ` (${activeCount})` : ''}
        </Button>

        <div className="hidden lg:flex flex-wrap items-center gap-2 flex-1">
          {Object.entries(MATCH_FILTERS).map(([key, options]) => (
            <Select
              key={key}
              size="sm"
              className="!w-auto min-w-[150px]"
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              aria-label={`Filter by ${key}`}
            >
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
          ))}
        </div>

        {activeCount > 0 && (
          <Button size="sm" variant="ghost" icon={RotateCcw} onClick={onClear}>
            Clear
          </Button>
        )}
      </div>

      {open && (
        <div className="lg:hidden grid sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-line animate-[pop_0.2s_ease-out]">
          {Object.entries(MATCH_FILTERS).map(([key, options]) => (
            <Select
              key={key}
              size="sm"
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              aria-label={`Filter by ${key}`}
            >
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
          ))}
        </div>
      )}
    </Card>
  )
}

/* ---------------------------------------------------------- PEER CARD */

function PeerCard({ peer, onConnect, onSave }) {
  const [confirm, setConfirm] = useState(false)

  return (
    <Card hover className="p-5 flex flex-col relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${peer.accent} opacity-80`} />

      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar initials={peer.initials} gradient={peer.accent} size={46} />
          {peer.rank === 'Top Match' && (
            <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full grad-brand text-white ring-2 ring-[var(--surface)]">
              <Star size={10} fill="currentColor" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[16px] font-extrabold text-ink tracking-tight truncate">{peer.name}</h3>
              <p className="text-[11.5px] text-muted truncate">{peer.branch}</p>
            </div>
            <ScoreRing value={peer.score} size={44} stroke={4} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge tone={peer.rank === 'Top Match' ? 'brand' : 'muted'} size="xs">
          {peer.rank}
        </Badge>
        <Chip tone="sky" className="!text-[11px]">
          {peer.level}
        </Chip>
        <Chip tone="muted" className="!text-[11px]">
          {peer.style}
        </Chip>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-accent-soft border border-accent/20 p-2.5">
          <p className="text-[9.5px] font-bold uppercase tracking-wider text-accent">Can teach</p>
          <p className="mt-1 text-[12.5px] font-bold text-ink leading-snug">{peer.teaching[0]}</p>
          {peer.teaching.length > 1 && (
            <p className="text-[10.5px] text-muted mt-0.5">+{peer.teaching.length - 1} more</p>
          )}
        </div>
        <div className="rounded-xl bg-brand-soft border border-brand/20 p-2.5">
          <p className="text-[9.5px] font-bold uppercase tracking-wider text-brand">Wants to learn</p>
          <p className="mt-1 text-[12.5px] font-bold text-ink leading-snug">{peer.learning[0]}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11.5px] text-muted">
        <span className="inline-flex items-center gap-1">
          <Landmark size={11} /> {peer.careerGoal}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star size={11} className="text-amber" fill="currentColor" /> {peer.rating}
        </span>
        <span className="inline-flex items-center gap-1">
          <Users size={11} /> {peer.sessions} sessions
        </span>
      </div>

      <div className="mt-3.5">
        <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted mb-1.5">Why this peer?</p>
        <ul className="space-y-1">
          {peer.why.map((w) => (
            <li key={w} className="text-[11.5px] text-ink-2 flex items-start gap-1.5 leading-snug">
              <CheckCircle2 size={12} className="text-accent shrink-0 mt-px" />
              {w}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-line flex gap-2">
        <Link to={`/peer/${peer.id}`} className="flex-1">
          <Button size="sm" variant="primary" full>
            View Profile
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          icon={peer.connected ? CheckCircle2 : Zap}
          onClick={() => (peer.connected ? onConnect(peer) : setConfirm(true))}
        >
          {peer.connected ? 'Connected' : 'Connect'}
        </Button>
        <Button
          size="sm"
          variant={peer.saved ? 'subtle' : 'ghost'}
          icon={peer.saved ? BookmarkCheck : Bookmark}
          onClick={() => onSave(peer)}
          aria-label={peer.saved ? `Remove ${peer.name} from saved` : `Save ${peer.name}`}
          className="!px-2.5"
        />
      </div>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => onConnect(peer)}
        title={`Connect with ${peer.name}?`}
        description={`${peer.name} teaches ${peer.teaching[0]} and wants to learn ${peer.learning[0]}. This simulated request creates a local connection only.`}
        confirmLabel="Send connection request"
        icon={Zap}
      />
    </Card>
  )
}

/* -------------------------------------------------------------- PAGE */

export default function PeerMatching() {
  const { matches, dispatch, toast, state } = useApp()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(SORT_OPTIONS[0].id)
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    document.title = 'Peer Matching · SkillSync'
  }, [])

  const activeCount = Object.keys(DEFAULT_FILTERS).filter((k) => filters[k] !== DEFAULT_FILTERS[k]).length

  const results = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = matches.filter((p) => {
      if (showSaved && !p.saved) return false
      if (q) {
        const hay = [p.name, p.branch, p.careerGoal, ...p.teaching, ...p.learning, p.style, p.level]
          .join(' ')
          .toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (filters.skill !== MATCH_FILTERS.skill[0] && !p.teaching.includes(filters.skill)) return false
      if (filters.careerGoal !== MATCH_FILTERS.careerGoal[0] && p.careerGoal !== filters.careerGoal) return false
      if (filters.availability !== MATCH_FILTERS.availability[0] && p.availability !== filters.availability)
        return false
      if (filters.skillLevel !== MATCH_FILTERS.skillLevel[0] && p.level !== filters.skillLevel) return false
      if (
        filters.learningPreference !== MATCH_FILTERS.learningPreference[0] &&
        p.style !== filters.learningPreference
      )
        return false
      return true
    })

    list = [...list].sort((a, b) => {
      if (sort === 'score') return b.score - a.score
      if (sort === 'sessions') return b.sessions - a.sessions
      if (sort === 'rating') return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })
    return list
  }, [matches, filters, search, sort, showSaved])

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS)
    setSearch('')
    setShowSaved(false)
  }

  return (
    <div className="space-y-5">
      {/* hero */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative p-6 sm:p-7 text-white flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[240px]">
            <Badge className="!bg-white/15 !text-white">PEER MATCHING</Badge>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight">
              Find the Right Person
            </h2>
            <p className="mt-2 text-[13.5px] text-white/75 max-w-xl leading-relaxed">
              Peers are ranked by complementarity — what they can teach you, what they want to learn from you, and
              whether the schedule actually works.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/15 border border-white/20 px-2.5 py-1 text-[11.5px] font-semibold">
                You teach · {STUDENT.canTeach.join(', ')}
              </span>
              <span className="rounded-lg bg-white/15 border border-white/20 px-2.5 py-1 text-[11.5px] font-semibold">
                You want · {STUDENT.wantToLearn.join(', ')}
              </span>
              <span className="rounded-lg bg-white/15 border border-white/20 px-2.5 py-1 text-[11.5px] font-semibold">
                {STUDENT.peersConsidered} peers considered
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="text-center">
              <p className="text-[30px] font-extrabold tnum leading-none">{results.length}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">Matches</p>
            </div>
            <div className="text-center">
              <p className="text-[30px] font-extrabold tnum leading-none">{state.savedPeers.length}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">Saved</p>
            </div>
            <div className="text-center">
              <p className="text-[30px] font-extrabold tnum leading-none">{state.connectedPeers.length}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">Connected</p>
            </div>
          </div>
        </div>
      </Card>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
        onClear={clearAll}
        activeCount={activeCount}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant={showSaved ? 'subtle' : 'outline'}
            icon={showSaved ? BookmarkCheck : Bookmark}
            onClick={() => setShowSaved((s) => !s)}
          >
            Saved only{state.savedPeers.length ? ` (${state.savedPeers.length})` : ''}
          </Button>
          <Button size="sm" variant="outline" icon={ArrowLeftRight} onClick={() => setSort('score')}>
            Complementary first
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-[12px] font-semibold text-muted">
            Sort by
          </label>
          <Select
            id="sort"
            size="sm"
            className="!w-auto min-w-[190px]"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No peers match these filters"
          description="Try widening the availability or skill-level filters, or clear the search to see all six demo peers."
          action={
            <Button variant="primary" icon={RotateCcw} onClick={clearAll}>
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {results.map((p, i) => (
            <div key={p.id} className="animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 55}ms` }}>
              <PeerCard
                peer={p}
                onConnect={(peer) => {
                  if (peer.connected) {
                    dispatch({ type: 'DISCONNECT', id: peer.id })
                    toast(`Connection with ${peer.name} withdrawn.`, { tone: 'info' })
                  } else {
                    dispatch({ type: 'CONNECT', id: peer.id })
                    toast('Connection request simulated successfully.', {
                      tone: 'success',
                      title: `Connected with ${peer.name}`,
                    })
                  }
                }}
                onSave={(peer) => {
                  const wasSaved = peer.saved
                  dispatch({ type: 'TOGGLE_SAVE', id: peer.id })
                  toast(wasSaved ? `${peer.name} removed from saved.` : `${peer.name} saved for later.`, {
                    tone: wasSaved ? 'info' : 'success',
                  })
                }}
              />
            </div>
          ))}
        </div>
      )}

      <SkillExchange />

      <SourceNote tone="brand" icon={Info}>
        {MATCH_DISCLAIMER} Scores are computed from demo profile attributes to demonstrate the matching interface.
      </SourceNote>
    </div>
  )
}
