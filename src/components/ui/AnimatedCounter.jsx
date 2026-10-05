import { useEffect, useRef, useState } from 'react'

/* ====================================================== ANIMATED COUNTER */

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1600,
  className = '',
  startOnView = true,
  threshold = 0.25,
}) {
  const [display, setDisplay] = useState(0)
  const [done, setDone] = useState(false)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnView) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      started.current = true
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            io.disconnect()
          }
        })
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [startOnView, threshold])

  useEffect(() => {
    if (startOnView && !started.current) return
    let raf
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      setDone(true)
      return
    }
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDone(true)
    }
    raf = requestAnimationFrame(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => cancelAnimationFrame(raf)
  }, [value, duration, startOnView])

  const formatted = display.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/* ======================================================== COUNT-UP HOOK */

export function useCountUp(target, { duration = 1200, startOnView = true } = {}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnView || started.current) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      started.current = true
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (startOnView && !started.current) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, startOnView])

  return [value, ref]
}
