import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Bell,
  CheckCircle2,
  ChevronLeft,
  Command,
  Menu,
  Moon,
  RotateCcw,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { ALL_NAV, MOBILE_NAV, NAV_SECTIONS } from './nav'
import { useApp, usePrefs } from '../../store/AppStore'
import { Button, IconButton } from '../ui/primitives'
import { ConfirmModal } from '../ui/Modal'
import Logo from '../Logo'

/* ================================================================ LOGO */

export function Wordmark({ compact = false, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="SkillSync home">
      <Logo size={compact ? 28 : 32} />
      {!compact && (
        <span className="text-[17px] font-extrabold tracking-tight leading-none">
          Skill<span className="grad-text">Sync</span>
        </span>
      )}
    </Link>
  )
}

/* ========================================================= SIDEBAR */

function NavItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-all duration-200 ${
          isActive
            ? 'text-white'
            : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
        } ${collapsed ? 'justify-center px-0' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-gradient-to-b from-[#818cf8] to-[#22d3ee]" />
          )}
          {isActive && (
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand/40 to-brand-2/10 opacity-90 -z-10" />
          )}
          <Icon size={17} strokeWidth={isActive ? 2.4 : 2} className="shrink-0" />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {!collapsed && isActive && (
            <span className="ml-auto size-1.5 rounded-full bg-[#22d3ee] shrink-0" />
          )}
        </>
      )}
    </NavLink>
  )
}

function SidebarContent({ collapsed, onCollapse, onNavigate, onReset }) {
  return (
    <>
      <div className={`flex items-center gap-2 px-3 h-[68px] shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 min-w-0" aria-label="SkillSync home">
          <Logo size={30} />
          {!collapsed && (
            <span className="text-[17px] font-extrabold tracking-tight text-white leading-none">
              Skill<span className="text-[#818cf8]">Sync</span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={onCollapse}
            className="ml-auto hidden lg:grid size-7 place-items-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="hidden lg:grid place-items-center pb-2">
          <button
            onClick={onCollapse}
            className="size-7 grid place-items-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors rotate-180"
            aria-label="Expand sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      <nav className="grow overflow-y-auto px-3 pb-3 space-y-5" aria-label="Main navigation">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/25">
                {section.label}
              </p>
            )}
            {collapsed && <div className="h-px bg-white/10 my-3 first:hidden" />}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavItem item={item} collapsed={collapsed} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 p-3 border-t border-white/10">
        {collapsed ? (
          <div className="grid place-items-center">
            <button
              onClick={onReset}
              title="Reset demo data"
              className="grid size-9 place-items-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Reset demo data"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 animate-[pulse-ring_2.6s_ease-out_infinite]" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Demo Mode</p>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed mb-2.5">
              Frontend-only interactive prototype. No backend, no login.
            </p>
            <button
              onClick={onReset}
              className="w-full h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white/80 hover:text-white text-[11.5px] font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={12} />
              Reset Demo Data
            </button>
          </div>
        )}
      </div>
    </>
  )
}

/* =========================================================== TOPBAR */

export function Topbar({ onMenu }) {
  const { state, dispatch } = useApp()
  const { theme, toggleTheme } = usePrefs()
  const [query, setQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false)
        setNotifOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const notifications = [
    {
      id: 'n1',
      title: 'Aarav Mehta accepted your match',
      body: 'Digital Marketing ↔ Financial Analysis is ready to schedule.',
      time: '4 min',
      tone: 'accent',
    },
    {
      id: 'n2',
      title: 'Path step unlocked',
      body: 'Complete “Advanced Excel” to open Financial Statement Analysis.',
      time: '1 hr',
      tone: 'brand',
    },
    {
      id: 'n3',
      title: 'Community: 3 new replies',
      body: 'Meera replied on “Best resources to learn financial modelling?”',
      time: '2 hr',
      tone: 'brand-2',
    },
  ]

  const filtered = query.trim()
    ? ALL_NAV.filter((n) => (n.label + n.desc).toLowerCase().includes(query.trim().toLowerCase()))
    : []

  return (
    <>
      <header className="sticky top-0 z-40 h-[68px] shrink-0 glass border-b border-line flex items-center gap-3 px-4 sm:px-6">
        <button
          onClick={onMenu}
          className="lg:hidden grid size-9 place-items-center rounded-lg text-ink-2 hover:bg-surface-2 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>

        <div className="lg:hidden">
          <Wordmark compact />
        </div>

        <div className="hidden lg:block flex-1 max-w-md">
          <label className="relative block">
            <span className="sr-only">Search SkillSync pages</span>
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setPaletteOpen(true)}
              placeholder="Search pages, skills, peers…"
              className="w-full h-10 pl-9 pr-16 rounded-xl border border-line bg-surface-2 text-[13px] text-ink placeholder:text-muted/80 transition-all outline-none hover:border-line-strong focus:border-brand focus:bg-surface focus:ring-4 focus:ring-brand/12"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] font-semibold text-muted bg-surface-3 border border-line rounded-md px-1.5 py-0.5">
              <Command size={9} />K
            </span>
          </label>
          {paletteOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 card p-1.5 shadow-xl z-50 max-h-80 overflow-y-auto animate-[pop_0.18s_ease-out]">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-[12.5px] text-muted text-center">
                  {query ? `No pages match “${query}”.` : 'Start typing to search pages and skills.'}
                </p>
              ) : (
                filtered.map((n) => {
                  const Icon = n.icon
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => {
                        setPaletteOpen(false)
                        setQuery('')
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-2 transition-colors"
                    >
                      <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-ink truncate">{n.label}</span>
                        <span className="block text-[11px] text-muted truncate">{n.desc}</span>
                      </span>
                    </Link>
                  )
                })
              )}
            </div>
          )}
        </div>

        <div className="grow lg:hidden" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <IconButton
            icon={theme === 'dark' ? Sun : Moon}
            label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleTheme}
            className="text-ink-2 hover:text-ink"
          />

          <div className="relative" ref={notifRef}>
            <IconButton
              icon={Bell}
              label="Notifications"
              onClick={() => setNotifOpen((o) => !o)}
              className="relative text-ink-2 hover:text-ink"
            />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose ring-2 ring-[var(--surface)] pointer-events-none" />
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-[310px] card p-1.5 shadow-xl z-50 animate-[pop_0.18s_ease-out]">
                <div className="px-3 py-2 flex items-center justify-between">
                  <p className="text-[12.5px] font-bold text-ink">Notifications</p>
                  <span className="text-[10.5px] font-semibold text-brand">3 new</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNotifOpen(false)}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors flex gap-2.5"
                    >
                      <span className="mt-1 size-1.5 rounded-full bg-brand shrink-0" />
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold text-ink">{n.title}</span>
                        <span className="block text-[11px] text-muted mt-0.5 leading-relaxed">{n.body}</span>
                        <span className="block text-[10px] text-muted/70 mt-1">{n.time} ago</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl hover:bg-surface-2 transition-colors"
            aria-label="Open your skill profile"
          >
            <span className="grid size-8 place-items-center rounded-full grad-brand text-[11px] font-extrabold text-white shadow-sm">
              SJ
            </span>
            <span className="hidden xl:block text-left leading-tight">
              <span className="block text-[12.5px] font-bold text-ink">Sakshi</span>
              <span className="block text-[10.5px] text-muted">Investment Banking</span>
            </span>
          </Link>
        </div>
      </header>

      {paletteOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setPaletteOpen(false)} aria-hidden="true" />
      )}
    </>
  )
}

/* ======================================================= MOBILE NAV */

export function MobileBottomNav() {
  const { pathname } = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-line pb-[env(safe-area-inset-bottom)]"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-6">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon
            const active = pathname === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`relative flex flex-col items-center gap-1 py-2.5 transition-colors ${
                  active ? 'text-brand' : 'text-muted'
                }`}
              >
                {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] grad-brand rounded-b-full" />}
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[9.5px] font-bold">{item.label}</span>
              </NavLink>
            )
          })}
          <button
            onClick={() => setMoreOpen(true)}
            className="flex flex-col items-center gap-1 py-2.5 text-muted"
            aria-label="More navigation"
          >
            <Menu size={18} />
            <span className="text-[9.5px] font-bold">More</span>
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="All pages">
          <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={() => setMoreOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto rounded-t-3xl bg-surface border-t border-line animate-[pop_0.25s_ease-out]">
            <div className="sticky top-0 bg-surface px-5 py-4 border-b border-line flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink">All pages</h3>
              <button
                onClick={() => setMoreOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-2"
                aria-label="Close menu"
              >
                <X size={17} />
              </button>
            </div>
            <div className="p-4 space-y-5 pb-8">
              {NAV_SECTIONS.map((s) => (
                <div key={s.label}>
                  <p className="px-1 mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{s.label}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {s.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setMoreOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all ${
                              isActive
                                ? 'border-brand/30 bg-brand-soft text-brand'
                                : 'border-line bg-surface-2 text-ink-2'
                            }`
                          }
                        >
                          <Icon size={15} className="shrink-0" />
                          <span className="text-[12px] font-semibold truncate">{item.label}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ========================================================== DEMO BANNER */

export function DemoBanner() {
  const [open, setOpen] = useState(true)
  const [confirm, setConfirm] = useState(false)
  const { dispatch, toast } = useApp()

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted hover:text-brand transition-colors"
      >
        <span className="size-1.5 rounded-full bg-amber" />
        Demo mode hidden — show banner
      </button>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-amber/25 bg-amber-soft px-3.5 py-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-amber px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
          Demo Mode
        </span>
        <p className="text-[12px] text-ink-2 font-medium">
          Frontend-only interactive prototype · no backend, no login, data saved in your browser.
        </p>
        <div className="ml-auto flex items-center gap-1.5">
          <Button size="xs" variant="outline" icon={RotateCcw} onClick={() => setConfirm(true)}>
            Reset Demo Data
          </Button>
          <button
            onClick={() => setOpen(false)}
            aria-label="Hide demo banner"
            className="grid size-6 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'RESET' })
          toast('Demo data restored to its original state.', { tone: 'success', title: 'Reset complete' })
        }}
        title="Reset demo data?"
        description="All progress made in this session will be cleared."
        confirmLabel="Reset everything"
        icon={RotateCcw}
      />
    </>
  )
}

/* ========================================================= APP SHELL */

export function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const collapsedCollapsed = collapsed ? 'lg:w-[72px]' : 'lg:w-[264px]'
  const mainShift = collapsed ? 'lg:pl-[72px]' : 'lg:pl-[264px]'

  return (
    <div className="min-h-screen bg-bg flex">
      {/* desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 transition-[width] duration-300 ease-out ${collapsedCollapsed} w-[280px]`}
        style={{
          background:
            'linear-gradient(175deg, #0d1428 0%, #0a0f20 45%, #100b24 100%)',
        }}
      >
        <SidebarContent
          collapsed={collapsed}
          onCollapse={() => setCollapsed((c) => !c)}
          onReset={() => window.dispatchEvent(new CustomEvent('skillsync:reset'))}
        />
      </aside>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside
            className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] flex flex-col animate-[pop_0.22s_ease-out]"
            style={{ background: 'linear-gradient(175deg, #0d1428 0%, #0a0f20 45%, #100b24 100%)' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-3 grid size-8 place-items-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 z-10"
              aria-label="Close navigation"
            >
              <X size={17} />
            </button>
            <SidebarContent
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
              onReset={() => window.dispatchEvent(new CustomEvent('skillsync:reset'))}
            />
          </aside>
        </div>
      )}

      {/* main */}
      <div className={`grow flex flex-col min-w-0 transition-[padding] duration-300 ${mainShift}`}>
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="grow pb-24 lg:pb-10">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-5 sm:py-7">{children}</div>
        </main>
        <DashboardFooter />
      </div>

      <MobileBottomNav />
      <ResetBridge />
    </div>
  )
}

/** Wires the sidebar reset button to the shared confirm modal. */
function ResetBridge() {
  const [confirm, setConfirm] = useState(false)
  const { dispatch, toast } = useApp()

  useEffect(() => {
    const handler = () => setConfirm(true)
    window.addEventListener('skillsync:reset', handler)
    return () => window.removeEventListener('skillsync:reset', handler)
  }, [])

  return (
    <ConfirmModal
      open={confirm}
      onClose={() => setConfirm(false)}
      onConfirm={() => {
        dispatch({ type: 'RESET' })
        toast('Demo data restored to its original state.', { tone: 'success', title: 'Reset complete' })
      }}
      title="Reset demo data?"
      description="All progress made in this session will be cleared."
      confirmLabel="Reset everything"
      icon={RotateCcw}
    />
  )
}

export function DashboardFooter() {
  return (
    <footer className="hidden lg:block border-t border-line bg-surface/50 px-6 py-5">
      <div className="mx-auto max-w-[1400px] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo size={22} />
          <div>
            <p className="text-[12.5px] font-bold text-ink leading-none">SkillSync</p>
            <p className="text-[10.5px] text-muted mt-0.5">
              Find the Right Skill. Find the Right Person. Build the Right Career.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11.5px] text-muted">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <CheckCircle2 size={12} className="text-accent" />
            Demo Prototype | Frontend Only
          </span>
          <span>© 2026 SkillSync</span>
        </div>
      </div>
    </footer>
  )
}
