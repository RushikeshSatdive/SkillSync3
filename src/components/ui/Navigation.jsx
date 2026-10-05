import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/* ======================================================== BREADCRUMBS */

const LABELS = {
  dashboard: 'Dashboard',
  profile: 'Skill Profile',
  gap: 'Skill Gap Analysis',
  matching: 'Peer Matching',
  peer: 'Peer Profile',
  path: 'Learning Path',
  practice: 'Practice Activities',
  progress: 'Progress & Skill Proof',
  community: 'Community',
  impact: 'Social Impact',
  pricing: 'Pricing',
  market: 'Market Opportunity',
  'unit-economics': 'Unit Economics',
  'go-to-market': 'Go-To-Market',
  financials: 'Financial Projections',
  funding: 'Funding',
  about: 'About SkillSync',
}

export function Breadcrumbs({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1 text-[12px] text-muted">
        <li className="flex items-center gap-1">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 hover:text-ink transition-colors font-medium"
          >
            <Home size={12} />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight size={12} className="opacity-50" />
            {it.to && i !== items.length - 1 ? (
              <Link to={it.to} className="font-medium hover:text-ink transition-colors">
                {it.label}
              </Link>
            ) : (
              <span className="font-semibold text-ink-2" aria-current="page">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Derive breadcrumbs from the current pathname. */
export function useCrumbs(override) {
  const { pathname } = useLocation()
  if (override) return override
  const seg = pathname.split('/').filter(Boolean)
  if (!seg.length) return []
  const [section, leaf] = seg
  const items = [{ label: LABELS[section] ?? section, to: `/${section}` }]
  if (leaf && LABELS[leaf]) items.push({ label: LABELS[leaf] })
  else if (leaf) items.push({ label: leaf.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) })
  return items
}

/* ====================================================== SCROLL PROGRESS */

export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[90] h-[3px] pointer-events-none">
      <div
        className="h-full grad-brand transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

/* ====================================================== SECTION NAV */

export function SectionNav({ sections, active, onChange, className = '' }) {
  const ref = useRef(null)
  return (
    <div
      ref={ref}
      className={`sticky top-[73px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-bg/85 backdrop-blur-md border-b border-line no-scrollbar overflow-x-auto ${className}`}
    >
      <div className="flex items-center gap-1 min-w-max">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`relative px-3 py-2 text-[12.5px] font-semibold rounded-lg transition-colors whitespace-nowrap ${
              active === s.id ? 'text-brand' : 'text-muted hover:text-ink-2'
            }`}
          >
            {s.label}
            <span
              className={`absolute left-2 right-2 -bottom-[1px] h-[2px] rounded-full grad-brand transition-all duration-300 ${
                active === s.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/* =================================================== SCROLL TO SECTION */

export function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])
  return active
}
