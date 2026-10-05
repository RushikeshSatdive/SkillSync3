import { useEffect, useState } from 'react'
import { Brain, GraduationCap, Route, Sparkles, Target, Users } from 'lucide-react'

/* ====================================================== HERO NETWORK VISUAL
   Student → Skill Gap → AI Matching → Peer → Learning → Career Goal
   ========================================================================= */

const NODES = [
  { id: 'student', label: 'Student', icon: GraduationCap, x: 8, y: 50, color: '#818cf8' },
  { id: 'gap', label: 'Skill Gap', icon: Target, x: 27, y: 22, color: '#fbbf24' },
  { id: 'ai', label: 'AI Matching', icon: Brain, x: 46, y: 55, color: '#4f46e5' },
  { id: 'peer', label: 'Peer', icon: Users, x: 65, y: 26, color: '#2dd4bf' },
  { id: 'learn', label: 'Learning', icon: Route, x: 84, y: 55, color: '#38bdf8' },
  { id: 'goal', label: 'Career Goal', icon: Sparkles, x: 95, y: 24, color: '#c026d3' },
]

const CHIPS = [
  { label: 'Financial Analysis', top: '6%', left: '2%', delay: 0, tone: '#2dd4bf' },
  { label: 'Digital Marketing', top: '76%', left: '0%', delay: 1.1, tone: '#fbbf24' },
  { label: 'Python', top: '16%', left: '84%', delay: 2.2, tone: '#818cf8' },
  { label: 'Data Analytics', top: '86%', left: '72%', delay: 0.6, tone: '#38bdf8' },
  { label: 'Excel', top: '38%', left: '92%', delay: 1.7, tone: '#2dd4bf' },
  { label: 'Leadership', top: '58%', left: '6%', delay: 2.8, tone: '#c026d3' },
  { label: 'Communication', top: '92%', left: '22%', delay: 1.4, tone: '#fb7185' },
  { label: 'Product Management', top: '44%', left: '36%', delay: 0.3, tone: '#a78bfa' },
]

function edgePath(a, b) {
  const mx = (a.x + b.x) / 2
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
}

export default function NetworkVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => setActive((v) => (v + 1) % NODES.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-full aspect-[16/11] sm:aspect-[16/9] select-none" aria-hidden="true">
      {/* radial backdrop */}
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_45%,rgba(99,102,241,0.20),transparent_62%)]" />

      {/* edges */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ss-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {NODES.slice(0, -1).map((n, i) => {
          const next = NODES[i + 1]
          const d = edgePath(n, next)
          const lit = active === i || active === i + 1
          return (
            <g key={d}>
              <path
                d={d}
                fill="none"
                stroke="url(#ss-edge)"
                strokeWidth="0.6"
                strokeLinecap="round"
                style={{ transition: 'stroke-opacity 0.6s ease', opacity: lit ? 1 : 0.4 }}
              />
              <path
                d={d}
                fill="none"
                stroke={lit ? '#a78bfa' : '#6366f1'}
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeDasharray="3 21"
                style={{
                  opacity: lit ? 0.95 : 0.25,
                  animation: `dash ${lit ? '1.1s' : '3s'} linear infinite`,
                  transition: 'opacity 0.6s ease',
                }}
              />
              <circle r="1.05" fill="#fff">
                <animateMotion dur={`${lit ? 2.2 : 4}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}>
                  <mpath href={`#path-${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${i * 0.35}s`}
                />
              </circle>
              <path id={`path-${i}`} d={d} fill="none" stroke="none" />
            </g>
          )
        })}
      </svg>

      {/* nodes */}
      {NODES.map((n, i) => {
        const Icon = n.icon
        const isActive = active === i
        return (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 transition-all duration-700"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="relative">
              {isActive && (
                <span
                  className="absolute inset-0 rounded-2xl animate-[pulse-ring_2.6s_ease-out_infinite]"
                  style={{ background: n.color, opacity: 0.5 }}
                />
              )}
              <div
                className="relative grid place-items-center size-11 sm:size-12 rounded-2xl transition-all duration-500"
                style={{
                  background: `linear-gradient(140deg, ${n.color}, ${n.color}bb)`,
                  boxShadow: isActive
                    ? `0 0 0 3px rgba(255,255,255,0.12), 0 10px 28px -8px ${n.color}`
                    : `0 8px 20px -10px ${n.color}`,
                  transform: isActive ? 'scale(1.14)' : 'scale(1)',
                }}
              >
                <Icon size={19} strokeWidth={2.2} className="text-white" />
              </div>
            </div>
            <span
              className="text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap rounded-md px-2 py-0.5 transition-all duration-500"
              style={{
                color: isActive ? n.color : 'var(--muted)',
                background: isActive ? 'color-mix(in oklab, ' + n.color + ' 12%, transparent)' : 'transparent',
              }}
            >
              {n.label}
            </span>
          </div>
        )
      })}

      {/* floating skill tags */}
      {CHIPS.map((c, i) => (
        <span
          key={c.label}
          className={`absolute hidden sm:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-bold backdrop-blur-md animate-float-slow ${
            i % 2 ? 'animation-delay-[2s]' : ''
          }`}
          style={{
            top: c.top,
            left: c.left,
            animationDelay: `${c.delay}s`,
            color: c.tone,
            borderColor: `color-mix(in oklab, ${c.tone} 32%, transparent)`,
            background: 'color-mix(in oklab, var(--surface) 78%, transparent)',
            boxShadow: `0 6px 18px -10px ${c.tone}`,
          }}
        >
          <span className="size-1.5 rounded-full" style={{ background: c.tone }} />
          {c.label}
        </span>
      ))}
    </div>
  )
}
