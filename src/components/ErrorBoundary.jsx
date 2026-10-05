import { Component } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('SkillSync UI error:', error, info?.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="min-h-screen grid place-items-center bg-bg px-6">
        <div className="card max-w-md w-full p-7 text-center">
          <span className="inline-grid size-14 place-items-center rounded-2xl bg-rose-soft text-rose mb-4">
            <AlertTriangle size={26} />
          </span>
          <h1 className="text-lg font-bold text-ink">Something went wrong</h1>
          <p className="mt-2 text-[13px] text-muted leading-relaxed">
            The interface hit an unexpected state. Resetting the demo data usually resolves it — this is a
            frontend-only prototype with no server state to recover.
          </p>
          <p className="mt-3 text-[11px] font-mono text-muted/80 bg-surface-2 rounded-lg px-3 py-2 truncate">
            {String(this.state.error?.message ?? this.state.error)}
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                try {
                  localStorage.removeItem('skillsync.demo.v2')
                } catch {
                  /* ignore */
                }
                window.location.reload()
              }}
              className="h-10 px-4 rounded-xl grad-brand text-white text-[13px] font-bold inline-flex items-center gap-2"
            >
              <RotateCcw size={14} />
              Reset &amp; reload
            </button>
            <button
              onClick={() => this.setState({ error: null })}
              className="h-10 px-4 rounded-xl border border-line text-[13px] font-semibold text-ink-2 hover:bg-surface-2"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }
}
