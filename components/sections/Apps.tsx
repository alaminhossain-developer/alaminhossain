'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolio } from '@/lib/usePortfolio'
import Link from 'next/link'
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const statusConfig = {
  live: { label: 'Live', color: '#22c55e', bg: '#22c55e15', border: '#22c55e30' },
  development: { label: 'In Development', color: '#f59e0b', bg: '#f59e0b15', border: '#f59e0b30' },
  planned: { label: 'Planned', color: '#8b5cf6', bg: '#8b5cf615', border: '#8b5cf630' },
}

export default function Apps() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { apps } = usePortfolio()

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
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#22c55e]" />
              <span className="text-xs text-[#22c55e] uppercase tracking-[0.12em] font-medium">
                Apps &amp; Tools
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white">
              MY APPS
            </h2>
          </div>
          <Link
            href="/apps"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300 text-sm font-semibold"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* App cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => {
            const status = statusConfig[app.status]

            return (
              <Link
                key={app.id}
                href={app.slug ? `/apps/${app.slug}` : '#'}
              >
                <div
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="group relative p-6 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-500 h-full flex flex-col"
                >
                  {/* Image preview */}
                  {app.images && app.images.length > 0 ? (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/[0.04] aspect-[16/10]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.images[0]}
                        alt={`${app.name} screenshot`}
                        width={640}
                        height={400}
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
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
                  )}

                  {app.images && app.images.length > 0 && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{app.icon}</span>
                      <div className="flex items-center gap-2">
                        {app.images.length > 1 && (
                          <span className="text-[10px] text-white/25 font-mono">+{app.images.length - 1} more</span>
                        )}
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
                    </div>
                  )}

                  {/* Name + tagline */}
                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {app.name}
                  </h3>
                  <p className="text-sm text-white/40 font-light mb-3 leading-relaxed">
                    {app.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-[0.8125rem] text-white/35 leading-relaxed mb-5 font-light flex-1">
                    {app.description}
                  </p>

                  {/* Features */}
                  {app.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {app.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                        >
                          {feature}
                        </span>
                      ))}
                      {app.features.length > 3 && (
                        <span className="text-[9px] text-white/20 self-center">+{app.features.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    {app.url ? (
                      <span
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                        style={{ color: app.color }}
                      >
                        {app.status === 'live' ? 'Visit App' : 'Learn More'}
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-white/20 font-medium">
                        <ExternalLink size={14} />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${app.color}05, transparent)`,
                    }}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300 text-sm font-semibold"
          >
            View All Apps
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
