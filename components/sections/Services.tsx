'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getServices } from '@/lib/store'
import {
  Monitor,
  ShoppingBag,
  ShoppingCart,
  Zap,
  Search,
  Settings,
  Code,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Monitor,
  ShoppingBag,
  ShoppingCart,
  Zap,
  Search,
  Settings,
  Code,
}

const accentColors = [
  '#00e5c8',
  '#7cff6b',
  '#a855f7',
  '#f59e0b',
  '#0ea5e9',
  '#ec4899',
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
            delay: 0.2 + i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = getServices()

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 px-6" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">
              Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] text-white">
            SERVICES
          </h2>
          <p className="text-base lg:text-lg text-white/40 mt-4 max-w-2xl font-light">
            End-to-end digital solutions for WordPress, Shopify, and custom web projects
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Monitor
            const color = accentColors[i % accentColors.length]

            return (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative bg-white/[0.015] border border-white/[0.04] rounded-2xl p-8 lg:p-10 hover:border-white/[0.08] transition-all duration-500"
              >
                {/* Top row: number + icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-5xl lg:text-6xl font-black text-white/[0.04] group-hover:text-white/[0.06] transition-colors duration-500 leading-none select-none">
                    {service.number}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed mb-8 font-light">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
