'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gauge, Shield, Search, Smartphone, Activity } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { label: 'Performance', value: 96, icon: Gauge, color: '#00e5c8' },
  { label: 'Accessibility', value: 94, icon: Shield, color: '#7cff6b' },
  { label: 'SEO', value: 98, icon: Search, color: '#0ea5e9' },
  { label: 'Responsive', value: 97, icon: Smartphone, color: '#a855f7' },
  { label: 'Core Web Vitals', value: 95, icon: Activity, color: '#f59e0b' },
]

export default function Performance() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      const bars = sectionRef.current.querySelectorAll('.perf-bar')
      const values = sectionRef.current.querySelectorAll('.perf-value')

      bars.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.out',
            transformOrigin: 'left center',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      })

      values.forEach((el, i) => {
        const target = metrics[i].value
        const elRef = el
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            const startTime = performance.now()
            const duration = 2000

            function update(currentTime: number) {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.floor(target * eased)
              elRef.textContent = String(current)

              if (progress < 1) {
                requestAnimationFrame(update)
              } else {
                elRef.textContent = String(target)
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
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Performance</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-6 text-white">
          FAST IS A
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-cyan-400 mb-10 md:mb-14">
          FEATURE.
        </h2>

        {/* Performance Dashboard */}
        <div className="border border-white/[0.06] rounded-2xl bg-white/[0.01] overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-white/[0.015]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/[0.03] rounded px-4 py-0.5 text-[10px] text-white/30 font-mono">
                alaminhossain.me — Lighthouse Report
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="p-6 md:p-10 space-y-6">
            {metrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <div key={metric.label} className="flex items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3 w-[180px] md:w-[220px] flex-shrink-0">
                    <Icon size={18} style={{ color: metric.color }} />
                    <span className="text-sm font-mono text-white/50">
                      {metric.label}
                    </span>
                  </div>

                  <div className="flex-1 h-3 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="perf-bar h-full rounded-full"
                      style={{
                        width: `${metric.value}%`,
                        background: `linear-gradient(90deg, ${metric.color}60, ${metric.color})`,
                        transformOrigin: 'left',
                        boxShadow: `0 0 12px ${metric.color}30`,
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1 w-16 flex-shrink-0 justify-end">
                    <span
                      className="perf-value font-mono text-lg font-bold"
                      style={{ color: metric.color }}
                    >
                      0
                    </span>
                    <span className="text-xs text-white/25">/100</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 md:px-10 py-4 border-t border-white/[0.04] bg-white/[0.015]">
            <span className="text-[0.625rem] text-white/25 uppercase tracking-[0.15em] font-medium">
              Presentational — optimized scores across all categories
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[0.625rem] text-emerald-400 uppercase tracking-[0.15em] font-medium">All Good</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
