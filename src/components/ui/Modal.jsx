import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { toneOf } from './primitives'

/* ============================================================== MODAL */

export function Modal({ open, onClose, title, description, children, footer, size = 'md', icon: Icon }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'Tab') trapFocus(e)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose])

  if (!open || !mounted) return null

  const widths = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm animate-[pop_0.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${widths[size]} max-h-[92vh] overflow-hidden rounded-t-3xl sm:rounded-2xl bg-surface border border-line shadow-xl animate-[pop_0.28s_cubic-bezier(0.22,1,0.36,1)] flex flex-col`}
      >
        <div className="flex items-start gap-3 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-line shrink-0">
          {Icon && (
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
              <Icon size={19} strokeWidth={2.1} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-bold tracking-tight text-ink">{title}</h3>
            {description && <p className="mt-1 text-[13px] text-muted leading-relaxed">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 overflow-y-auto grow">{children}</div>

        {footer && (
          <div className="px-5 sm:px-6 py-4 border-t border-line bg-surface-2/60 rounded-b-3xl sm:rounded-b-2xl flex flex-wrap items-center justify-end gap-2.5 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

function trapFocus(e) {
  const nodes = document.querySelectorAll(
    '[role="dialog"] button, [role="dialog"] [href], [role="dialog"] input, [role="dialog"] select, [role="dialog"] textarea, [role="dialog"] [tabindex]:not([tabindex="-1"])',
  )
  if (!nodes.length) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

/* ========================================================= CONFIRM MODAL */

export function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', tone = 'primary', icon }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      icon={icon}
      footer={
        <>
          <button
            onClick={onClose}
            className="h-9 px-3.5 rounded-lg text-[13px] font-semibold text-ink-2 hover:bg-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`h-9 px-4 rounded-lg text-[13px] font-bold text-white transition-all active:scale-95 ${
              tone === 'danger' ? 'bg-rose' : 'grad-brand'
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-[13px] text-ink-2 leading-relaxed">
        This resets all demo progress — learning path steps, practice completions, saved peers, connections,
        community interactions and certificates. Source figures are not affected.
      </p>
    </Modal>
  )
}

/* =========================================================== DRAWER */

export function Drawer({ open, onClose, title, children, side = 'left' }) {
  if (!open) return null
  const pos = side === 'left' ? 'left-0' : 'right-0'
  return createPortal(
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className={`absolute inset-y-0 ${pos} w-[86%] max-w-sm bg-surface border-r border-line shadow-xl flex flex-col animate-[pop_0.25s_ease-out]`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="text-[15px] font-bold text-ink">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-2">
            <X size={17} />
          </button>
        </div>
        <div className="grow overflow-y-auto p-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

/* ============================================================= TOASTER */

const TOAST_TONE = {
  default: { bar: 'bg-brand', icon: 'CheckCircle2' },
  success: { bar: 'bg-accent', icon: 'CheckCircle2' },
  info: { bar: 'bg-sky', icon: 'Info' },
  warn: { bar: 'bg-amber', icon: 'AlertTriangle' },
  error: { bar: 'bg-rose', icon: 'XCircle' },
}

export function Toaster({ toasts, onDismiss }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <div
      className="fixed z-[200] bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] flex flex-col gap-2.5 pointer-events-none"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const tone = TOAST_TONE[t.tone] ?? TOAST_TONE.default
        return (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto relative overflow-hidden rounded-xl border border-line bg-surface shadow-lg flex items-start gap-3 pr-3 pl-4 py-3 animate-[pop_0.28s_cubic-bezier(0.22,1,0.36,1)]"
          >
            <span className={`absolute inset-y-0 left-0 w-1 ${tone.bar}`} />
            <div className="min-w-0 flex-1 py-0.5">
              {t.title && <p className="text-[13px] font-bold text-ink leading-snug">{t.title}</p>}
              <p className={`${t.title ? 'mt-0.5' : ''} text-[12.5px] text-ink-2 leading-relaxed`}>
                {t.message}
              </p>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 grid size-6 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink mt-0.5"
            >
              <X size={13} />
            </button>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}

/* ======================================================== TONE PILL */

export function TonePill({ tone = 'muted', children, className = '' }) {
  const t = toneOf(tone)
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${t.bg} ${t.text} ${className}`}>
      {children}
    </span>
  )
}
