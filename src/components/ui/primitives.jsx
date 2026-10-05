import { forwardRef } from 'react'
import { Info } from 'lucide-react'

/* ------------------------------------------------------------------ CARD */

export function Card({ className = '', children, hover = false, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`card ${hover ? 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-line-strong' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({ title, subtitle, action, icon, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3 min-w-0">
        {icon}
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-tight text-ink truncate">{title}</h3>
          {subtitle && <p className="text-[13px] text-muted mt-0.5 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ----------------------------------------------------------------- TONE */

export const TONES = {
  brand: {
    text: 'text-brand',
    bg: 'bg-brand-soft',
    ring: 'ring-brand/25',
    solid: 'bg-brand',
    softBorder: 'border-brand/25',
    grad: 'from-[#4f46e5] to-[#7c3aed]',
  },
  'brand-2': {
    text: 'text-brand-2',
    bg: 'bg-brand-2/12',
    ring: 'ring-brand-2/25',
    solid: 'bg-brand-2',
    softBorder: 'border-brand-2/25',
    grad: 'from-[#7c3aed] to-[#c026d3]',
  },
  accent: {
    text: 'text-accent',
    bg: 'bg-accent-soft',
    ring: 'ring-accent/25',
    solid: 'bg-accent',
    softBorder: 'border-accent/25',
    grad: 'from-[#0d9488] to-[#22c55e]',
  },
  sky: {
    text: 'text-sky',
    bg: 'bg-sky/12',
    ring: 'ring-sky/25',
    solid: 'bg-sky',
    softBorder: 'border-sky/25',
    grad: 'from-[#0284c7] to-[#06b6d4]',
  },
  amber: {
    text: 'text-amber',
    bg: 'bg-amber-soft',
    ring: 'ring-amber/25',
    solid: 'bg-amber',
    softBorder: 'border-amber/25',
    grad: 'from-[#d97706] to-[#f59e0b]',
  },
  rose: {
    text: 'text-rose',
    bg: 'bg-rose-soft',
    ring: 'ring-rose/25',
    solid: 'bg-rose',
    softBorder: 'border-rose/25',
    grad: 'from-[#e11d48] to-[#f43f5e]',
  },
  muted: {
    text: 'text-muted',
    bg: 'bg-surface-3',
    ring: 'ring-muted/20',
    solid: 'bg-muted',
    softBorder: 'border-line',
    grad: 'from-muted to-muted',
  },
}

export function toneOf(tone) {
  return TONES[tone] ?? TONES.brand
}

/* ---------------------------------------------------------------- BADGE */

export function Badge({ children, tone = 'muted', className = '', icon: Icon, size = 'sm' }) {
  const t = toneOf(tone)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap ${
        size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
      } ${t.bg} ${t.text} ${className}`}
    >
      {Icon && <Icon size={size === 'xs' ? 10 : 12} strokeWidth={2.4} />}
      {children}
    </span>
  )
}

export function Chip({ children, tone = 'muted', active, onClick, icon: Icon, size = 'sm', className = '', ...rest }) {
  const t = toneOf(tone)
  const Comp = onClick ? 'button' : 'span'
  const dims =
    size === 'xs'
      ? 'px-2 py-0.5 text-[10.5px] gap-1 rounded-md'
      : size === 'lg'
        ? 'px-3.5 py-1.5 text-[13px] rounded-xl'
        : 'px-2.5 py-1 text-[12px] rounded-lg'
  return (
    <Comp
      onClick={onClick}
      aria-pressed={onClick ? !!active : undefined}
      className={`inline-flex items-center rounded-lg border font-medium transition-all duration-200 ${dims} ${
        active
          ? `${t.bg} ${t.text} ${t.softBorder} shadow-sm`
          : 'border-line bg-surface-2 text-ink-2 hover:border-line-strong hover:bg-surface-3'
      } ${onClick ? 'cursor-pointer active:scale-[0.97]' : ''} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={size === 'xs' ? 10 : 12} strokeWidth={2.2} />}
      {children}
    </Comp>
  )
}

/* --------------------------------------------------------------- BUTTON */

const BTN_VARIANTS = {
  primary:
    'grad-brand text-white shadow-[0_6px_18px_-6px_rgba(79,70,229,0.65)] hover:shadow-[0_10px_26px_-6px_rgba(79,70,229,0.75)] hover:brightness-110',
  accent: 'grad-accent text-white shadow-[0_6px_18px_-6px_rgba(13,148,136,0.6)] hover:brightness-110',
  outline: 'border border-line-strong bg-surface text-ink hover:bg-surface-2 hover:border-brand/40',
  ghost: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
  subtle: 'bg-brand-soft text-brand hover:brightness-95 dark:hover:brightness-125',
  danger: 'bg-rose text-white hover:brightness-110',
  dark: 'bg-ink text-bg hover:opacity-90',
}

const BTN_SIZES = {
  xs: 'h-7 px-2.5 text-[11px] gap-1 rounded-lg',
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-[13.5px] gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-xl',
}

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'outline',
    size = 'sm',
    icon: Icon,
    iconRight: IconRight,
    loading = false,
    full = false,
    className = '',
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none ${
        BTN_VARIANTS[variant]
      } ${BTN_SIZES[size]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="size-3.5 rounded-full border-2 border-current border-r-transparent animate-spin" />
      ) : (
        Icon && <Icon size={size === 'lg' ? 18 : size === 'xs' ? 12 : 15} strokeWidth={2.2} />
      )}
      {children}
      {IconRight && !loading && <IconRight size={size === 'lg' ? 18 : size === 'xs' ? 12 : 15} strokeWidth={2.2} />}
    </button>
  )
})

export function IconButton({ icon: Icon, label, size = 'sm', variant = 'ghost', active, className = '', ...rest }) {
  const dim = { xs: 'size-7', sm: 'size-9', md: 'size-10' }[size]
  const ico = { xs: 12, sm: 16, md: 18 }[size]
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 active:scale-90 ${dim} ${
        BTN_VARIANTS[variant]
      } ${active ? 'text-brand' : ''} ${className}`}
      {...rest}
    >
      <Icon size={ico} strokeWidth={2.1} />
    </button>
  )
}

/* ---------------------------------------------------------------- INPUT */

export function Field({ label, hint, error, children, className = '', id }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-[12px] font-semibold text-ink-2 mb-1.5">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-[11.5px] font-medium text-rose flex items-center gap-1">
          <Info size={12} /> {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-[11.5px] text-muted">{hint}</p>
      )}
    </div>
  )
}

const INPUT_BASE =
  'w-full rounded-xl border border-line bg-surface px-3.5 text-[13.5px] text-ink placeholder:text-muted/70 transition-all duration-200 outline-none hover:border-line-strong focus:border-brand focus:ring-4 focus:ring-brand/12 disabled:opacity-60'

export function Input({ className = '', size = 'md', ...rest }) {
  const pad = size === 'sm' ? 'h-9 text-[12.5px]' : 'h-10'
  return <input className={`${INPUT_BASE} ${pad} ${className}`} {...rest} />
}

export function Textarea({ className = '', rows = 3, ...rest }) {
  return <textarea rows={rows} className={`${INPUT_BASE} py-2.5 leading-relaxed ${className}`} {...rest} />
}

export function Select({ className = '', children, size = 'md', ...rest }) {
  const pad = size === 'sm' ? 'h-9 text-[12.5px] pl-3 pr-8' : 'h-10 pl-3.5 pr-9'
  return (
    <div className="relative">
      <select
        className={`${INPUT_BASE} ${pad} appearance-none cursor-pointer ${className}`}
        {...rest}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

export function Toggle({ checked, onChange, label, description, id }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div className="min-w-0">
          {label && (
            <label htmlFor={id} className="text-[13px] font-semibold text-ink block cursor-pointer">
              {label}
            </label>
          )}
          {description && <p className="text-[11.5px] text-muted mt-0.5">{description}</p>}
        </div>
      )}
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
          checked ? 'grad-brand' : 'bg-surface-3 border border-line'
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

/* -------------------------------------------------------- PROGRESS / TAG */

export function ProgressBar({
  value,
  tone = 'brand',
  size = 'md',
  showLabel = false,
  label,
  target,
  className = '',
  animated = true,
}) {
  const t = toneOf(tone)
  const h = { xs: 'h-1.5', sm: 'h-2', md: 'h-2.5', lg: 'h-3.5' }[size]
  const clamped = Math.max(0, Math.min(100, value ?? 0))
  return (
    <div className={className}>
      {(showLabel || label || target) && (
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          {label && <span className="text-[12px] font-medium text-ink-2">{label}</span>}
          {showLabel && (
            <span className="text-[12px] font-bold tnum text-ink">{Math.round(clamped)}%</span>
          )}
          {target && <span className="text-[11px] font-medium text-muted">Target {target}%</span>}
        </div>
      )}
      <div
        className={`relative w-full ${h} rounded-full bg-surface-3 overflow-hidden`}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${t.grad} transition-[width] duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
        {animated && (
          <div
            className="absolute inset-y-0 rounded-full bg-white/25 blur-[2px] animate-[shimmer_2.4s_linear_infinite]"
            style={{ width: `${clamped}%`, backgroundSize: '200% 100%' }}
          />
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ STAT CARD */

export function StatCard({ label, value, sub, icon: Icon, tone = 'brand', trend, onClick, className = '' }) {
  const t = toneOf(tone)
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={`card p-4 text-left w-full transition-all duration-300 ${
        onClick ? 'hover:-translate-y-0.5 hover:shadow-lg cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight tnum text-ink">{value}</p>
          {sub && <p className="mt-1 text-[11.5px] text-muted leading-snug">{sub}</p>}
        </div>
        {Icon && (
          <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${t.bg} ${t.text}`}>
            <Icon size={17} strokeWidth={2.2} />
          </span>
        )}
      </div>
      {trend != null && (
        <div
          className={`mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold ${
            trend >= 0 ? 'text-accent' : 'text-rose'
          }`}
        >
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}
          <span className="text-muted font-medium">vs last period</span>
        </div>
      )}
    </Comp>
  )
}

/* -------------------------------------------------------- SECTION HEADER */

export function SectionHeading({ eyebrow, title, description, align = 'left', action, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'} ${className}`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand mb-2.5">
            <span className="size-1 rounded-full bg-brand" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-[32px] font-extrabold tracking-tight text-ink leading-[1.12]">
          {title}
        </h2>
        {description && (
          <p className="mt-2.5 text-[14px] text-ink-2 leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ---------------------------------------------------------- EMPTY STATE */

export function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-14 px-6 rounded-2xl border border-dashed border-line-strong bg-surface-2/60 ${className}`}
    >
      {Icon && (
        <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand mb-4">
          <Icon size={24} strokeWidth={2} />
        </span>
      )}
      <h4 className="text-[15px] font-bold text-ink">{title}</h4>
      {description && <p className="mt-1.5 text-[13px] text-muted max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

/* ------------------------------------------------------------- SKELETON */

export function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />
}

export function SkeletonCard({ lines = 3, className = '' }) {
  return (
    <div className={`card p-5 ${className}`}>
      <Skeleton className="h-4 w-1/3 mb-4" />
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- TOOLTIP */

export function Tooltip({ children, content, side = 'top' }) {
  const pos = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[side]
  return (
    <span className="relative inline-flex group/tt">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${pos} z-50 w-max max-w-[240px] rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-medium leading-snug text-bg opacity-0 translate-y-1 transition-all duration-200 group-hover/tt:opacity-100 group-hover/tt:translate-y-0 shadow-lg`}
      >
        {content}
      </span>
    </span>
  )
}

/* ---------------------------------------------------------- SOURCE NOTE */

export function SourceNote({ children, tone = 'muted', className = '', icon: Icon = Info }) {
  const t = toneOf(tone)
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border ${t.softBorder} ${t.bg} px-3.5 py-2.5 ${className}`}
    >
      <Icon size={14} className={`${t.text} shrink-0 mt-0.5`} strokeWidth={2.3} />
      <p className={`text-[11.5px] leading-relaxed ${t.text} font-medium`}>{children}</p>
    </div>
  )
}

/* ------------------------------------------------------------- SEPARATOR */

export function Divider({ className = '' }) {
  return <div className={`h-px w-full bg-line ${className}`} />
}

/* --------------------------------------------------------------- AVATAR */

export function Avatar({ initials, gradient = 'from-brand to-brand-2', size = 40, className = '', ring = true }) {
  const dim = { xs: 'size-7 text-[10px]', sm: 'size-9 text-[11px]', md: 'size-11 text-[13px]', lg: 'size-14 text-[16px]', xl: 'size-20 text-[22px]' }[size]
  return (
    <span
      className={`grid place-items-center rounded-full bg-gradient-to-br ${gradient} font-extrabold text-white shrink-0 ${
        ring ? 'ring-2 ring-surface' : ''
      } ${dim} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

/* ----------------------------------------------------------------- TABS */

export function Tabs({ tabs, value, onChange, className = '', size = 'md' }) {
  const pad = size === 'sm' ? 'px-3 py-1.5 text-[12px]' : 'px-3.5 py-2 text-[13px]'
  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-1 rounded-xl bg-surface-2 border border-line p-1 overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((t) => {
        const id = typeof t === 'string' ? t : t.id
        const label = typeof t === 'string' ? t : t.label
        const count = typeof t === 'string' ? null : t.count
        const active = value === id
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`relative rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${pad} ${
              active
                ? 'bg-surface text-ink shadow-sm'
                : 'text-muted hover:text-ink-2'
            }`}
          >
            {label}
            {count != null && (
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tnum ${
                  active ? 'bg-brand text-white' : 'bg-surface-3 text-muted'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------ INFO ROW */

export function InfoRow({ label, value, tone = 'ink', hint }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-line last:border-0">
      <div className="min-w-0">
        <p className="text-[12.5px] text-muted">{label}</p>
        {hint && <p className="text-[11px] text-muted/70 mt-0.5">{hint}</p>}
      </div>
      <p
        className={`text-[13px] font-bold text-right tnum shrink-0 ${
          tone === 'ink' ? 'text-ink' : `text-${tone}`
        }`}
      >
        {value}
      </p>
    </div>
  )
}
