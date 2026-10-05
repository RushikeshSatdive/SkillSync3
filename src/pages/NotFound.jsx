import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

import Logo from '../components/Logo'
import { Button, Card } from '../components/ui/primitives'
import { ALL_NAV } from '../components/layout/nav'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Page not found · SkillSync'
  }, [])

  return (
    <div className="min-h-screen bg-bg grid place-items-center px-4 py-12">
      <Card className="w-full max-w-lg p-8 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-16 size-56 rounded-full grad-brand opacity-10 blur-3xl" />
        <div className="relative">
          <Logo size={40} className="mx-auto" />
          <p className="mt-6 text-[64px] font-extrabold tracking-tight grad-text leading-none tnum">404</p>
          <h1 className="mt-3 text-[22px] font-extrabold text-ink tracking-tight">
            This page is not on the path
          </h1>
          <p className="mt-2.5 text-[13.5px] text-muted leading-relaxed">
            The route you followed does not exist in this demo. Pick a destination below, or head back to the dashboard
            and keep exploring.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Button variant="primary" icon={Home} onClick={() => navigate('/dashboard')}>
              Go to dashboard
            </Button>
            <Button variant="outline" icon={Compass} onClick={() => navigate('/')}>
              Back to landing
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-line text-left">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted mb-3">All pages</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[11.5px] font-medium text-ink-2 hover:border-brand/40 hover:text-brand transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

