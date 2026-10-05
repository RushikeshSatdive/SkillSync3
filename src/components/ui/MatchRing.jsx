import { useEffect, useState } from 'react'

/* ===================================================== MATCH SCORE RING */

export function MatchRing({
  value = 94,
  size = 180,
  stroke = 10,
  label = 'Top Match',
  sublabel = null,
  tone = ['#4f46e5', '#9333ea'],
  animate = true,
  trackClass = 'stroke-surface-3',
  className = '',
}) {
  const [progress, setProgress] = useState(animate ? 0 : value)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!animate) {
      setProgress(value)
      return
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setProgress(value)
      return
    }
    const t0 = performance.now()
    const dur = 1400
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, animate])

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c
  const gid = `ring-grad-${size}-${tone[0].replace('#', '')}`

  return (
    <div
      className={`relative inline-grid place-items-center ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width={size} height={size} className="-rotate-90 overflow-visible">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tone[0]} />
            <stop offset="100%" stopColor={tone[1]} />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={trackClass}
          stroke="var(--surface-3)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: hovered ? 'stroke-dashoffset 0.35s ease, stroke-width 0.2s ease' : 'stroke-dashoffset 1.4s ease-out',
            filter: `url(#${gid}-glow)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-[40px] leading-none font-extrabold tracking-tight tnum text-ink">
            {Math.round(progress)}
            <span className="text-[20px] align-top font-bold text-muted">%</span>
          </div>
          {label && (
            <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              {label}
            </div>
          )}
          {sublabel && <div className="mt-1 text-[10.5px] text-muted max-w-[120px] leading-snug">{sublabel}</div>}
        </div>
      </div>
    </div>
  )
}

/* ==================================================== COMPACT SCORE RING */

export function ScoreRing({ value, size = 44, stroke = 4, className = '' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (value / 100) * c
  const gid = `sr-${size}-${stroke}`
  return (
    <div
      className={`relative grid place-items-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title={`${value}% match`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="var(--surface-3)" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke={`url(#${gid})`}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <span className="absolute text-[11px] font-extrabold tnum text-ink">{value}</span>
    </div>
  )
}

/* ========================================================== GAUGE RING */

export function GaugeRing({ value, max = 10, size = 160, label, tone = ['#4f46e5', '#0d9488'] }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const t0 = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / 1300)
      setP((1 - Math.pow(1 - t, 3)) * value)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  const stroke = 12
  const r = (size - stroke) / 2
  const c = Math.PI * r // half circle
  const pct = Math.min(1, p / max)
  const gid = `gauge-${size}`
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size * 0.62 }}>
      <svg width={size} height={size * 0.62} viewBox={`0 0 ${size} ${size * 0.62}`}>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={tone[0]} />
            <stop offset="100%" stopColor={tone[1]} />
          </linearGradient>
        </defs>
        <path
          d={`M ${stroke / 2} ${size / 2 - stroke / 4} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2 - stroke / 4}`}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${size / 2 - stroke / 4} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2 - stroke / 4}`}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - c * pct}
          style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-[28px] font-extrabold tracking-tight tnum text-ink leading-none">
          {p.toFixed(1)}x
        </div>
        {label && <div className="text-[11px] font-semibold text-muted mt-1">{label}</div>}
      </div>
    </div>
  )
}
