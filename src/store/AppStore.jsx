import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import {
  ACTIVITIES,
  BADGES,
  CERTIFICATES,
  CHALLENGES,
  COMMUNITY_POSTS,
  FUNNEL,
  LEARNING_PATH,
  MATCH_DIMENSIONS,
  PEERS,
  PROGRESS_SUMMARY,
  SKILL_PROGRESS,
  STUDENT,
  WORKSHOPS,
} from '../data/mockData'

const STORAGE_KEY = 'skillsync.demo.v2'
const THEME_KEY = 'skillsync.theme.v1'
const PREF_KEY = 'skillsync.prefs.v1'

/* ------------------------------------------------------------------ STATE */

function initialState() {
  return {
    // learning path: stepId -> { status, progress }
    path: LEARNING_PATH.reduce((acc, s) => {
      acc[s.id] = { status: s.status, progress: s.progress, lessonDone: {} }
      return acc
    }, {}),
    activities: ACTIVITIES.reduce((acc, a) => {
      acc[a.id] = { completions: 0, loggedMinutes: 0, lastDone: null }
      return acc
    }, {}),
    savedPeers: [],
    connectedPeers: [],
    exchanges: [],
    sessions: PROGRESS_SUMMARY.sessions,
    practiceHours: PROGRESS_SUMMARY.practiceHours,
    streak: PROGRESS_SUMMARY.streak,
    proofs: PROGRESS_SUMMARY.proofs,
    readiness: PROGRESS_SUMMARY.readiness,
    progress: STUDENT.progress,
    certificates: CERTIFICATES.map((c) => ({ ...c })),
    badges: BADGES.map((b) => ({ ...b })),
    posts: COMMUNITY_POSTS.map((p) => ({ ...p })),
    challenges: CHALLENGES.map((c) => ({ ...c })),
    workshops: WORKSHOPS.map((w) => ({ ...w })),
    volunteers: false,
    plan: 'free',
    search: '',
    onboardingSeen: false,
    lastReset: null,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return { ...initialState(), lastReset: Date.now() }

    /* ------------------------------------------------------------ path */
    case 'PATH_COMPLETE': {
      const cur = state.path[action.id]
      if (!cur) return state
      const next = {
        ...state.path,
        [action.id]: { ...cur, status: 'completed', progress: 100 },
      }
      const ids = LEARNING_PATH.map((s) => s.id)
      const idx = ids.indexOf(action.id)
      if (ids[idx + 1] && next[ids[idx + 1]].status === 'not-started') {
        next[ids[idx + 1]] = { ...next[ids[idx + 1]], status: 'in-progress', progress: 10 }
      }
      return {
        ...state,
        path: next,
        readiness: Math.min(100, state.readiness + 3),
        progress: Math.min(100, (state.progress ?? 68) + 2),
        sessions: state.sessions + 1,
        practiceHours: round1(state.practiceHours + 0.5),
        streak: state.streak + 1,
      }
    }
    case 'PATH_UNCOMPLETE': {
      const cur = state.path[action.id]
      if (!cur) return state
      return {
        ...state,
        path: {
          ...state.path,
          [action.id]: { ...cur, status: 'in-progress', progress: Math.max(10, cur.progress - 40) },
        },
        readiness: Math.max(0, state.readiness - 3),
        sessions: Math.max(0, state.sessions - 1),
      }
    }
    case 'PATH_TOGGLE_LESSON': {
      const step = state.path[action.id]
      if (!step) return state
      const lessonDone = { ...(step.lessonDone ?? {}) }
      lessonDone[action.lessonId] = !lessonDone[action.lessonId]
      const total = LEARNING_PATH.find((s) => s.id === action.id)?.lessons.length ?? 1
      const done = Object.values(lessonDone).filter(Boolean).length
      const progress = Math.round((done / total) * 100)
      return {
        ...state,
        path: {
          ...state.path,
          [action.id]: {
            ...step,
            lessonDone,
            progress,
            status: progress === 100 ? 'completed' : 'in-progress',
          },
        },
      }
    }

    /* ------------------------------------------------------ activities */
    case 'ACTIVITY_COMPLETE': {
      const cur = state.activities[action.id]
      if (!cur) return state
      const completions = cur.completions + 1
      const loggedMinutes = (cur.loggedMinutes ?? 0) + (action.minutes ?? 20)
      const xpGain = action.xp ?? 20
      const proofsGained = xpGain >= 40 && proofsFor(action.id, completions) ? 1 : 0
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.id]: { completions, loggedMinutes, lastDone: Date.now() },
        },
        practiceHours: round1(state.practiceHours + (action.minutes ?? 20) / 60),
        sessions: state.sessions + 1,
        streak: state.streak + 1,
        readiness: Math.min(100, state.readiness + 2),
        progress: Math.min(100, (state.progress ?? 68) + 2),
        proofs: Math.max(state.proofs, Math.min(8, state.proofs + proofsGained)),
        skillProgress: {
          ...(state.skillProgress ?? {}),
          [action.skill]: round(Math.min(100, (state.skillProgress?.[action.skill] ?? 0) + 6)),
        },
      }
    }
    case 'ACTIVITY_RESET': {
      const fresh = initialState()
      return { ...fresh, lastReset: Date.now() }
    }

    /* ------------------------------------------------------------ peers */
    case 'TOGGLE_SAVE':
      return {
        ...state,
        savedPeers: state.savedPeers.includes(action.id)
          ? state.savedPeers.filter((p) => p !== action.id)
          : [...state.savedPeers, action.id],
      }
    case 'CONNECT':
      if (state.connectedPeers.includes(action.id)) return state
      return { ...state, connectedPeers: [...state.connectedPeers, action.id] }
    case 'DISCONNECT':
      return { ...state, connectedPeers: state.connectedPeers.filter((p) => p !== action.id) }
    case 'START_EXCHANGE': {
      const peer = PEERS.find((p) => p.id === action.peerId)
      if (!peer) return state
      const exists = state.exchanges.find((e) => e.peerId === peer.id)
      if (exists) return state
      return {
        ...state,
        exchanges: [
          ...state.exchanges,
          {
            id: `ex-${Date.now()}`,
            peerId: peer.id,
            peer: peer.name,
            topic: action.topic ?? peer.teaching[0],
            date: action.date,
            duration: action.duration ?? 45,
            status: 'scheduled',
          },
        ],
      }
    }
    case 'CANCEL_EXCHANGE':
      return { ...state, exchanges: state.exchanges.filter((e) => e.id !== action.id) }

    /* -------------------------------------------------------- community */
    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p,
        ),
      }
    case 'TOGGLE_POST_SAVE':
      return {
        ...state,
        posts: state.posts.map((p) => (p.id === action.id ? { ...p, saved: !p.saved } : p)),
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id
            ? {
                ...p,
                comments: p.comments + 1,
                recentComments: [
                  ...(p.recentComments ?? []),
                  { id: action.cid, author: STUDENT.firstName, body: action.body, time: 'just now' },
                ].slice(-3),
              }
            : p,
        ),
      }
    case 'TOGGLE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map((c) =>
          c.id === action.id
            ? { ...c, joinedByUser: !c.joinedByUser, joined: c.joined + (c.joinedByUser ? -1 : 1) }
            : c,
        ),
      }
    case 'TOGGLE_WORKSHOP':
      return {
        ...state,
        workshops: state.workshops.map((w) =>
          w.id === action.id
            ? { ...w, registered: !w.registered, filled: w.filled + (w.registered ? -1 : 1) }
            : w,
        ),
      }

    /* ----------------------------------------------------- misc surface */
    case 'SET_PLAN':
      return { ...state, plan: action.plan }
    case 'SET_SEARCH':
      return { ...state, search: action.value }
    case 'TOGGLE_VOLUNTEER':
      return { ...state, volunteers: !state.volunteers }
    case 'SEEN_ONBOARDING':
      return { ...state, onboardingSeen: true }

    default:
      return state
  }
}

/* ------------------------------------------------------------- HELPERS */

function round(n) {
  return Math.round(n)
}
function round1(n) {
  return Math.round(n * 10) / 10
}
function proofsFor(id, completions) {
  return completions >= 1
}

/* ----------------------------------------------------------- CONTEXT */

const AppCtx = createContext(null)
const PrefCtx = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return initialState()
      const parsed = JSON.parse(raw)
      const base = initialState()
      return {
        ...base,
        ...parsed,
        // guarantee new keys added in later versions exist
        certificates: parsed.certificates ?? base.certificates,
        badges: parsed.badges ?? base.badges,
        posts: parsed.posts ?? base.posts,
        challenges: parsed.challenges ?? base.challenges,
        workshops: parsed.workshops ?? base.workshops,
        exchanges: parsed.exchanges ?? [],
      }
    } catch {
      return initialState()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage full or unavailable — demo continues in memory */
    }
  }, [state])

  /* ---------------------------------------------------------- toasts */
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = useCallback(
    (message, opts = {}) => {
      const id = ++toastId.current
      const entry = {
        id,
        message,
        title: opts.title ?? null,
        tone: opts.tone ?? 'default',
        duration: opts.duration ?? 3200,
      }
      setToasts((t) => [...t.slice(-3), entry])
      if (entry.duration > 0) {
        setTimeout(() => dismissToast(id), entry.duration)
      }
      return id
    },
    [dismissToast],
  )

  /* ----------------------------------------------------- derived data */

  const learningPath = useMemo(
    () =>
      LEARNING_PATH.map((s) => ({ ...s, ...state.path[s.id], id: s.id })),
    [state.path],
  )

  const pathCompletion = useMemo(() => {
    const total = learningPath.length * 100
    const done = learningPath.reduce((a, s) => a + (s.progress ?? 0), 0)
    return Math.round(done / total)
  }, [learningPath])

  const skillProgress = useMemo(() => {
    const overrides = state.skillProgress ?? {}
    return SKILL_PROGRESS.map((s) => ({
      ...s,
      value: overrides[s.name] ?? s.value,
      target: s.target,
      delta: overrides[s.name] ? Math.max(0, overrides[s.name] - s.value) : s.delta,
    }))
  }, [state.skillProgress])

  const activities = useMemo(
    () =>
      ACTIVITIES.map((a) => ({
        ...a,
        ...state.activities[a.id],
        skill: a.skill,
      })),
    [state.activities],
  )

  const nextStep = useMemo(
    () => learningPath.find((s) => s.status !== 'completed') ?? learningPath[learningPath.length - 1],
    [learningPath],
  )

  const matches = useMemo(
    () =>
      PEERS.map((p) => ({
        ...p,
        saved: state.savedPeers.includes(p.id),
        connected: state.connectedPeers.includes(p.id),
        breakdown: MATCH_DIMENSIONS.map((d, i) => ({
          ...d,
          value: Math.max(60, p.score - [1, 2, 4, 6][(i + p.score) % 4]),
        })),
      })),
    [state.savedPeers, state.connectedPeers],
  )

  const value = useMemo(
    () => ({ state, dispatch, toast, toasts, dismissToast, learningPath, pathCompletion, skillProgress, activities, nextStep, matches }),
    [state, toast, toasts, dismissToast, learningPath, pathCompletion, skillProgress, activities, nextStep, matches],
  )

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

/* ------------------------------------------------------------ PREFS */

function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREF_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(loadPrefs)

  useEffect(() => {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs))
    } catch {
      /* ignore */
    }
  }, [prefs])

  const set = useCallback((key, value) => setPrefs((p) => ({ ...p, [key]: value })), [])

  /* theme */
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved) return saved
    } catch {
      /* ignore */
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const prefValue = useMemo(() => ({ prefs, set, theme, setTheme: setThemeState, toggleTheme }), [prefs, set, theme, toggleTheme])

  return <PrefCtx.Provider value={prefValue}>{children}</PrefCtx.Provider>
}

export function usePrefs() {
  const ctx = useContext(PrefCtx)
  if (!ctx) throw new Error('usePrefs must be used inside <PrefsProvider>')
  return ctx
}

/* -------------------------------------------- RESET ALL DEMO LOCALSTORAGE */

export function hardReset() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
