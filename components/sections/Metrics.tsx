'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: 5, suffix: '+', label: 'Years Experience', color: 'text-cyan-400' },
  { value: 100, suffix: '+', label: 'Projects Delivered', color: 'text-emerald-400' },
  { value: 130, suffix: '+', label: 'Websites Managed', color: 'text-cyan-400' },
]

const platforms = ['WordPress', 'Shopify', 'WooCommerce']

export default function Metrics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      numbersRef.current.forEach((el, i) => {
        if (!el) return
        const target = metrics[i].value
        const suffix = metrics[i].suffix
        const elRef = el

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          onEnter: () => {
            const startTime = performance.now()
            const duration = 2000

            function update(currentTime: number) {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.floor(target * eased)
              elRef.textContent = current + suffix

              if (progress < 1) {
                requestAnimationFrame(update)
              } else {
                elRef.textContent = target + suffix
              }
            }

            requestAnimationFrame(update)
          },
          once: true,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 opacity-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Dashboard card */}
        <div className="border border-cyan-500/10 rounded-2xl bg-white/[0.01] overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-[0.6875rem] text-white/40 uppercase tracking-[0.12em] font-medium">Dashboard Overview</span>
            </div>
            <span className="text-[0.6875rem] text-white/30 uppercase tracking-[0.12em]">
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-8 md:py-12 px-6 hover:bg-white/[0.01] transition-colors duration-500"
              >
                <div className={`font-mono text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 ${metric.color}`}>
                  <span ref={(el) => { numbersRef.current[i] = el }}>
                    0{metric.suffix}
                  </span>
                </div>
                <span className="text-xs text-white/40 uppercase tracking-[0.12em] font-medium text-center">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Platforms bar */}
          <div className="flex items-center justify-center gap-6 md:gap-10 px-6 py-5 border-t border-white/[0.04] bg-white/[0.01]">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="text-xs font-mono text-white/30 tracking-wider uppercase"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
