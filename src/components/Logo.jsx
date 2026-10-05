export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role="img"
      aria-label="SkillSync logo"
    >
      <defs>
        <linearGradient id="ss-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <linearGradient id="ss-b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#ss-a)" />
      {/* interlocking S arcs — the "sync" motif */}
      <path
        d="M26.5 13.5c-1.9-1.6-4.4-2.5-7-2.5-4.6 0-7.9 2.6-7.9 6.4 0 3.5 2.6 5.2 7.2 6.3 3.6.9 5 1.6 5 3.1 0 1.7-1.7 2.8-4.3 2.8-2.8 0-5.1-1-7.2-2.9"
        stroke="url(#ss-b)"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13.5 26.5c1.9 1.6 4.4 2.5 7 2.5 4.6 0 7.9-2.6 7.9-6.4 0-3.5-2.6-5.2-7.2-6.3-3.6-.9-5-1.6-5-3.1 0-1.7 1.7-2.8 4.3-2.8 2.8 0 5.1 1 7.2 2.9"
        stroke="url(#ss-b)"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
      <circle cx="20" cy="20" r="2.6" fill="#fff" />
    </svg>
  )
}
