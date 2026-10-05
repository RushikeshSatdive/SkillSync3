import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppShell } from './components/layout/AppShell'
import { Toaster } from './components/ui/Modal'
import { useApp } from './store/AppStore'
import { Breadcrumbs, useCrumbs } from './components/ui/Navigation'
import { PAGE_META } from './components/layout/nav'
import { SkeletonCard } from './components/ui/primitives'

import Landing from './pages/Landing'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const SkillProfile = lazy(() => import('./pages/SkillProfile'))
const SkillGap = lazy(() => import('./pages/SkillGap'))
const PeerMatching = lazy(() => import('./pages/PeerMatching'))
const PeerProfile = lazy(() => import('./pages/PeerProfile'))
const LearningPath = lazy(() => import('./pages/LearningPath'))
const Practice = lazy(() => import('./pages/Practice'))
const Progress = lazy(() => import('./pages/Progress'))
const Community = lazy(() => import('./pages/Community'))
const SocialImpact = lazy(() => import('./pages/SocialImpact'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Market = lazy(() => import('./pages/Market'))
const UnitEconomics = lazy(() => import('./pages/UnitEconomics'))
const GoToMarket = lazy(() => import('./pages/GoToMarket'))
const Financials = lazy(() => import('./pages/Financials'))
const Funding = lazy(() => import('./pages/Funding'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="space-y-4 py-6" aria-busy="true" aria-label="Loading page">
      <div className="skeleton h-7 w-64 rounded-lg" />
      <div className="skeleton h-4 w-96 max-w-full rounded-lg" />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    </div>
  )
}

/** Standard dashboard page frame: breadcrumbs + title + demo banner slot. */
function PageFrame({ children }) {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname]
  const crumbs = useCrumbs()
  return (
    <div className="animate-[rise_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
      <Breadcrumbs items={crumbs} className="mb-3" />
      {meta && (
        <header className="mb-5">
          <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-tight text-ink leading-tight">
            {meta.title}
          </h1>
          {meta.subtitle && <p className="mt-1 text-[13.5px] text-muted">{meta.subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  )
}

function DashboardRoute({ Component }) {
  return (
    <AppShell>
      <PageFrame>
        <Component />
      </PageFrame>
    </AppShell>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  const { toasts, dismissToast } = useApp()

  return (
    <>
      <ScrollManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardRoute Component={Dashboard} />} />
          <Route path="/profile" element={<DashboardRoute Component={SkillProfile} />} />
          <Route path="/gap" element={<DashboardRoute Component={SkillGap} />} />
          <Route path="/matching" element={<DashboardRoute Component={PeerMatching} />} />
          <Route path="/peer/:id" element={<DashboardRoute Component={PeerProfile} />} />
          <Route path="/path" element={<DashboardRoute Component={LearningPath} />} />
          <Route path="/practice" element={<DashboardRoute Component={Practice} />} />
          <Route path="/progress" element={<DashboardRoute Component={Progress} />} />
          <Route path="/community" element={<DashboardRoute Component={Community} />} />
          <Route path="/impact" element={<DashboardRoute Component={SocialImpact} />} />
          <Route path="/pricing" element={<DashboardRoute Component={Pricing} />} />
          <Route path="/market" element={<DashboardRoute Component={Market} />} />
          <Route path="/unit-economics" element={<DashboardRoute Component={UnitEconomics} />} />
          <Route path="/go-to-market" element={<DashboardRoute Component={GoToMarket} />} />
          <Route path="/financials" element={<DashboardRoute Component={Financials} />} />
          <Route path="/funding" element={<DashboardRoute Component={Funding} />} />
          <Route path="/about" element={<DashboardRoute Component={About} />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <Toaster toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}

