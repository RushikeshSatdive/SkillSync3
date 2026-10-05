import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CalendarCheck,
  Flame,
  Heart,
  MessageCircle,
  MessagesSquare,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'

import { Avatar, Badge, Button, Card, Chip, EmptyState, Field, Input, ProgressBar, SectionHeading, SourceNote, Tabs, toneOf } from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import { useApp } from '../store/AppStore'
import {
  CHALLENGES,
  GOAL_FILTERS,
  POPULAR_GOALS,
  STUDENT,
  TRENDING_SKILLS,
} from '../data/mockData'

const TONE_BY_TAG = {
  Question: 'brand',
  Offering: 'accent',
  Showcase: 'brand-2',
  Challenge: 'amber',
}

/* -------------------------------------------------------------- POST */

function PostCard({ post, onLike, onSave, onComment }) {
  const t = toneOf(TONE_BY_TAG[post.tag] ?? 'brand')
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <Avatar initials={post.initials} gradient="from-indigo-500 to-violet-600" size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13.5px] font-bold text-ink">{post.author}</span>
            <Badge tone={TONE_BY_TAG[post.tag] ?? 'brand'} size="xs">
              {post.tag}
            </Badge>
            <span className="text-[11.5px] text-muted">{post.time}</span>
          </div>
          <h3 className="mt-2 text-[15px] font-bold text-ink tracking-tight leading-snug">{post.title}</h3>
          <p className="mt-1.5 text-[13px] text-ink-2 leading-relaxed">{post.body}</p>
        </div>
        <button
          onClick={() => onSave(post)}
          aria-label={post.saved ? 'Unsave post' : 'Save post'}
          aria-pressed={post.saved}
          className={`shrink-0 grid size-8 place-items-center rounded-lg transition-all active:scale-90 ${
            post.saved ? 'text-brand bg-brand-soft' : 'text-muted hover:bg-surface-2 hover:text-ink'
          }`}
        >
          {post.saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {post.recentComments?.length > 0 && (
        <div className="mt-4 ml-13 pl-3 border-l-2 border-line space-y-2.5">
          {post.recentComments.map((c) => (
            <div key={c.id} className="animate-[pop_0.25s_ease-out]">
              <p className="text-[12.5px]">
                <span className="font-bold text-ink">{c.author}</span>{' '}
                <span className="text-ink-2">{c.body}</span>{' '}
                <span className="text-[11px] text-muted">{c.time}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-line flex items-center gap-1.5">
        <button
          onClick={() => onLike(post)}
          aria-pressed={post.liked}
          aria-label={`Like “${post.title}” — ${post.likes} likes`}
          className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] font-bold transition-all active:scale-95 ${
            post.liked ? 'bg-rose-soft text-rose' : 'text-muted hover:bg-surface-2 hover:text-ink-2'
          }`}
        >
          <Heart size={14} fill={post.liked ? 'currentColor' : 'none'} />
          {post.likes}
        </button>
        <button
          onClick={() => onComment(post)}
          aria-label={`Comment on “${post.title}” — ${post.comments} comments`}
          className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] font-bold text-muted hover:bg-surface-2 hover:text-ink-2 transition-all active:scale-95"
        >
          <MessageCircle size={14} />
          {post.comments}
        </button>
        <Chip tone="muted" size="xs" className="ml-auto !text-[11px]">
          SkillSync community
        </Chip>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------- COMMENT MODAL */

function CommentModal({ post, open, onClose, onSubmit }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    if (open) {
      setText('')
      setError('')
    }
  }, [open, post])

  const submit = () => {
    if (!text.trim()) {
      setError('Write something before posting.')
      return
    }
    onSubmit(post, text.trim())
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={post ? post.title : 'Add a comment'}
      description="Comments are stored in local state only."
      icon={MessageCircle}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={Send} onClick={submit}>
            Post comment
          </Button>
        </>
      }
    >
      <Field label="Your comment" id="comment-body" error={error}>
        <Input
          id="comment-body"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (error) setError('')
          }}
          placeholder="Add to the discussion…"
          aria-invalid={!!error}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
        />
      </Field>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Great question — same here.', 'I can help with this.', 'Sharing my notes on this shortly.'].map((s) => (
          <button
            key={s}
            onClick={() => setText(s)}
            className="rounded-lg border border-line bg-surface-2 px-2 py-1 text-[11px] font-medium text-ink-2 hover:border-brand/40 hover:text-brand transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </Modal>
  )
}

/* -------------------------------------------------------------- PAGE */

export default function Community() {
  const { state, dispatch, toast } = useApp()
  const [tab, setTab] = useState('discussions')
  const [goal, setGoal] = useState('All')
  const [commenting, setCommenting] = useState(null)

  useEffect(() => {
    document.title = 'Community · SkillSync'
  }, [])

  const posts = useMemo(
    () => (goal === 'All' ? state.posts : state.posts.slice(0, 3)),
    [state.posts, goal],
  )

  const joinedChallenges = state.challenges.filter((c) => c.joinedByUser).length
  const registeredWorkshops = state.workshops.filter((w) => w.registered).length
  const savedCount = state.posts.filter((p) => p.saved).length

  const submitComment = (post, body) => {
    dispatch({ type: 'ADD_COMMENT', id: post.id, cid: `c-${Date.now()}`, body })
    toast('Comment added to the discussion.', { tone: 'success' })
  }

  return (
    <div className="space-y-5">
      {/* hero */}
      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-16 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative p-6 sm:p-7 text-white flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[240px]">
            <Badge className="!bg-white/15 !text-white">COMMUNITY</Badge>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight">
              Learn out loud
            </h2>
            <p className="mt-2 text-[13.5px] text-white/75 max-w-xl leading-relaxed">
              Questions, skill offers and work in progress from students targeting the same roles. Everything here is
              local demo state.
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { v: state.posts.length, l: 'Posts' },
              { v: savedCount, l: 'Saved' },
              { v: joinedChallenges, l: 'Challenges' },
              { v: registeredWorkshops, l: 'Workshops' },
            ].map((x) => (
              <div key={x.l} className="text-center">
                <p className="text-[28px] font-extrabold tnum leading-none">{x.v}</p>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mt-1">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Tabs
        tabs={[
          { id: 'trending', label: 'Trending Skills' },
          { id: 'goals', label: 'Popular Career Goals' },
          { id: 'challenges', label: 'Skill Challenges', count: state.challenges.length },
          { id: 'discussions', label: 'Peer Discussions', count: state.posts.length },
          { id: 'workshops', label: 'Upcoming Workshops', count: state.workshops.length },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'trending' && (
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
          <Card className="p-5">
            <SectionHeading eyebrow="Last 7 days" title="Trending skills" description="Fastest-rising skills in the demo community." />
            <div className="mt-5 space-y-4">
              {[...TRENDING_SKILLS]
                .sort((a, b) => b.delta - a.delta)
                .map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-surface-3 text-[10.5px] font-extrabold text-muted">
                          {i + 1}
                        </span>
                        <span className="text-[13px] font-bold text-ink truncate">{s.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11.5px] text-muted tnum">{s.count} posts</span>
                        <span className="inline-flex items-center gap-0.5 text-[11.5px] font-bold text-accent">
                          <TrendingUp size={11} />
                          {s.delta}%
                        </span>
                      </div>
                    </div>
                    <ProgressBar value={s.delta * 2.6} tone={i < 3 ? 'brand' : 'sky'} size="sm" />
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-[15px] font-bold text-ink">Post a skill offer</h3>
            <p className="mt-1 text-[12.5px] text-muted">
              Teaching one skill is how most exchanges here start.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { icon: Sparkles, t: 'I can teach…', d: 'Pick a skill from your profile' },
                { icon: Target, t: 'I want to learn…', d: 'Matches you with complementary peers' },
                { icon: Trophy, t: 'I finished something…', d: 'Share work for peer review' },
              ].map((o) => {
                const I = o.icon
                return (
                  <button
                    key={o.t}
                    onClick={() => {
                      setTab('discussions')
                      toast('Add a comment below any discussion to post in this demo.', { tone: 'info' })
                    }}
                    className="w-full flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-3 text-left hover:border-brand/40 hover:bg-brand-soft/40 transition-all"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-brand">
                      <I size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold text-ink">{o.t}</span>
                      <span className="block text-[11.5px] text-muted truncate">{o.d}</span>
                    </span>
                    <ArrowUpRight size={14} className="ml-auto text-muted shrink-0" />
                  </button>
                )
              })}
            </div>
          </Card>
        </div>
      )}

      {tab === 'goals' && (
        <Card className="p-5">
          <SectionHeading
            eyebrow="Career goals"
            title="Popular career goals"
            description="What peers on SkillSync are currently working toward."
          />
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_GOALS.map((g) => (
              <div key={g.name} className="rounded-xl border border-line bg-surface-2 p-4 hover:border-brand/30 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13.5px] font-bold text-ink truncate">{g.name}</p>
                  <span className="text-[12px] font-extrabold tnum text-brand shrink-0">{g.count}</span>
                </div>
                <ProgressBar value={g.pct} size="sm" className="mt-2.5" />
                <p className="mt-2 text-[11px] text-muted">{g.pct}% of active community members</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'challenges' && (
        <div className="grid sm:grid-cols-2 gap-5">
          {state.challenges.map((c) => (
            <Card key={c.id} hover className="p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-amber-soft text-amber">
                  <Trophy size={19} />
                </span>
                <Badge tone={c.joinedByUser ? 'accent' : 'muted'} size="xs" icon={c.joinedByUser ? Check : undefined}>
                  {c.joinedByUser ? 'Joined' : `${c.days} days`}
                </Badge>
              </div>
              <h3 className="mt-3.5 text-[16px] font-extrabold text-ink tracking-tight">{c.title}</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-2 leading-relaxed">{c.desc}</p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                <Chip tone="muted" size="xs" icon={Users}>
                  {c.joined} joined
                </Chip>
                <Chip tone="brand" size="xs" icon={Trophy}>
                  {c.prize}
                </Chip>
              </div>
              <Button
                size="sm"
                full
                className="mt-4"
                variant={c.joinedByUser ? 'outline' : 'primary'}
                icon={c.joinedByUser ? Check : Zap}
                onClick={() => {
                  dispatch({ type: 'TOGGLE_CHALLENGE', id: c.id })
                  toast(c.joinedByUser ? `Left “${c.title}”.` : `Joined “${c.title}”.`, {
                    tone: c.joinedByUser ? 'info' : 'success',
                  })
                }}
              >
                {c.joinedByUser ? 'Leave challenge' : 'Join challenge'}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {tab === 'discussions' && (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11.5px] font-bold text-muted mr-1">Filter:</span>
              {GOAL_FILTERS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`rounded-lg px-2.5 py-1 text-[11.5px] font-bold transition-all ${
                    goal === g ? 'grad-brand text-white' : 'border border-line bg-surface-2 text-muted hover:text-ink'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {posts.length === 0 ? (
              <EmptyState
                icon={MessagesSquare}
                title="No discussions yet"
                description="Be the first to post in this demo community."
                action={
                  <Button variant="primary" onClick={() => setGoal('All')}>
                    Show all posts
                  </Button>
                }
              />
            ) : (
              posts.map((p, i) => (
                <div key={p.id} className="animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 50}ms` }}>
                  <PostCard
                    post={p}
                    onLike={(post) => {
                      dispatch({ type: 'TOGGLE_LIKE', id: post.id })
                      toast(post.liked ? 'Like removed.' : 'Post liked.', { tone: post.liked ? 'info' : 'success' })
                    }}
                    onSave={(post) => {
                      dispatch({ type: 'TOGGLE_POST_SAVE', id: post.id })
                      toast(post.saved ? 'Removed from saved.' : 'Post saved.', { tone: 'success' })
                    }}
                    onComment={(post) => setCommenting(post)}
                  />
                </div>
              ))
            )}
          </div>

          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="text-[14px] font-bold text-ink mb-3">Your activity</h3>
              <div className="space-y-2.5">
                {[
                  { l: 'Posts liked', v: state.posts.filter((p) => p.liked).length, tone: 'brand' },
                  { l: 'Posts saved', v: savedCount, tone: 'accent' },
                  { l: 'Comments added', v: state.posts.reduce((a, p) => a + (p.recentComments?.length ?? 0), 0), tone: 'brand-2' },
                  { l: 'Challenges joined', v: joinedChallenges, tone: 'amber' },
                ].map((x) => {
                  const t = toneOf(x.tone)
                  return (
                    <div key={x.l} className="flex items-center justify-between rounded-xl bg-surface-2 border border-line px-3.5 py-2.5">
                      <span className="text-[12.5px] text-ink-2">{x.l}</span>
                      <span className={`text-[14px] font-extrabold tnum ${t.text}`}>{x.v}</span>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[14px] font-bold text-ink mb-3">Community guidelines</h3>
              <ul className="space-y-2.5">
                {[
                  'Offer a skill, not just a request.',
                  'Describe what you have actually built.',
                  'Keep sessions on-platform.',
                  'No contact details in public threads.',
                ].map((g) => (
                  <li key={g} className="text-[12.5px] text-ink-2 flex items-start gap-2">
                    <Check className="size-3.5 text-accent shrink-0 mt-0.5" strokeWidth={3} />
                    {g}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {tab === 'workshops' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.workshops.map((w) => {
            const full = w.filled >= w.seats
            return (
              <Card key={w.id} hover className="p-5 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Calendar size={19} />
                  </span>
                  <Badge tone={full ? 'rose' : 'accent'} size="xs">
                    {full ? 'Full' : `${w.seats - w.filled} seats left`}
                  </Badge>
                </div>
                <h3 className="mt-3.5 text-[15.5px] font-extrabold text-ink tracking-tight leading-snug">{w.title}</h3>
                <p className="mt-1 text-[12px] text-muted">Hosted by {w.host}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-2">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarCheck size={12} /> {w.date}
                  </span>
                  <span className="inline-flex items-center gap-1">{w.time}</span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={(w.filled / w.seats) * 100} size="xs" tone={full ? 'rose' : 'brand'} />
                  <p className="mt-1.5 text-[11px] text-muted">
                    {w.filled} of {w.seats} seats filled · {w.mode}
                  </p>
                </div>
                <Button
                  size="sm"
                  full
                  className="mt-4"
                  variant={w.registered ? 'outline' : 'primary'}
                  icon={w.registered ? Check : CalendarCheck}
                  disabled={full && !w.registered}
                  onClick={() => {
                    dispatch({ type: 'TOGGLE_WORKSHOP', id: w.id })
                    toast(
                      w.registered
                        ? `Registration cancelled for “${w.title}”.`
                        : `Registered for “${w.title}” (simulated).`,
                      { tone: w.registered ? 'info' : 'success' },
                    )
                  }}
                >
                  {w.registered ? 'Registered' : full ? 'Session full' : 'Register'}
                </Button>
              </Card>
            )
          })}
        </div>
      )}

      <SourceNote tone="brand">
        Community posts, challenges and workshops are seeded demo content. Likes, comments, saves and registrations are
        stored in your browser via localStorage.
      </SourceNote>

      <CommentModal post={commenting} open={!!commenting} onClose={() => setCommenting(null)} onSubmit={submitComment} />
    </div>
  )
}

function Check(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
