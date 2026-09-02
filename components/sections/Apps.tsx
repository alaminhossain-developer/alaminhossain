'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getApps } from '@/lib/store'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const statusConfig = {
  live: { label: 'Live', color: '#22c55e', bg: '#22c55e15', border: '#22c55e30' },
  development: { label: 'In Development', color: '#f59e0b', bg: '#f59e0b15', border: '#f59e0b30' },
  planned: { label: 'Planned', color: '#8b5cf6', bg: '#8b5cf615', border: '#8b5cf630' },
}

export default function Apps() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const apps = getApps()

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (apps.length === 0) return null

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 px-6" id="apps">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#22c55e]" />
          <span className="text-xs text-[#22c55e] uppercase tracking-[0.12em] font-medium">
            Apps &amp; Tools
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 text-white">
          MY APPS
        </h2>
        <p className="text-base text-white/40 font-light max-w-xl leading-relaxed mb-12 lg:mb-16">
          Shopify apps and developer tools I&apos;m building to help merchants and developers.
        </p>

        {/* App cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => {
            const status = statusConfig[app.status]

            return (
              <div
                key={app.id}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative p-8 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-500"
              >
                {/* Top row: icon + status */}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{app.icon}</span>
                  <span
                    className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border"
                    style={{
                      color: status.color,
                      backgroundColor: status.bg,
                      borderColor: status.border,
                    }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Name + tagline */}
                <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                  {app.name}
                </h3>
                <p className="text-sm text-white/40 font-light mb-4 leading-relaxed">
                  {app.tagline}
                </p>

                {/* Description */}
                <p className="text-[0.8125rem] text-white/35 leading-relaxed mb-5 font-light">
                  {app.description}
                </p>

                {/* Features */}
                {app.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {app.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {app.url ? (
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                    style={{ color: app.color }}
                  >
                    {app.status === 'live' ? 'Visit App' : 'Learn More'}
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-white/20 font-medium">
                    <ExternalLink size={14} />
                    Coming Soon
                  </span>
                )}

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${app.color}05, transparent)`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
