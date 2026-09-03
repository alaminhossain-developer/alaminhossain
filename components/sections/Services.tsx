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
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollRef.current || !containerRef.current) return

      const totalWidth = scrollRef.current.scrollWidth - window.innerWidth

      gsap.to(scrollRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Stagger cards entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1 + i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const services = getServices()

  return (
    <section ref={containerRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden" id="services">
      {/* Fixed title */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 lg:px-12 pt-6 md:pt-8 max-w-7xl">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Services</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] text-white">SERVICES</h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap h-full items-center gap-6 md:gap-8 pl-6 lg:pl-12 pr-32 md:pr-48"
        style={{ paddingTop: '100px' }}
      >
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] || Monitor
          const color = accentColors[i % accentColors.length]

          return (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative bg-white/[0.02] border border-white/[0.04] rounded-2xl p-8 md:p-10 flex flex-col hover:border-white/[0.08] transition-all duration-500 flex-shrink-0 w-[320px] md:w-[380px] min-h-[340px] md:min-h-[360px]"
            >
              {/* Top row: large number + icon */}
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
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1 font-light">
                {service.description}
              </p>

              {/* Features */}
              {service.features && (
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 text-[10px] font-mono border border-white/[0.04] rounded text-white/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
            </div>
          )
        })}

        {/* End spacer */}
        <div className="w-24 flex-shrink-0" />
      </div>
    </section>
  )
}
