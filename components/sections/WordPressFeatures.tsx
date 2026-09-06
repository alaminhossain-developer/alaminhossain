'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolio } from '@/lib/usePortfolio'
import { Palette, Puzzle, ShoppingCart, Zap, Search, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={24} />,
  Puzzle: <Puzzle size={24} />,
  ShoppingCart: <ShoppingCart size={24} />,
  Zap: <Zap size={24} />,
  Search: <Search size={24} />,
  Shield: <Shield size={24} />,
}

export default function WordPressFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { wordpressFeatures } = usePortfolio()

  const sorted = [...wordpressFeatures].sort((a, b) => (a.order || 99) - (b.order || 99))

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.wpf-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24" id="wordpress">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-blue-400" />
          <span className="text-xs text-blue-400 uppercase tracking-[0.12em] font-medium">WordPress Expertise</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 text-white">
          WHAT I BUILD WITH WORDPRESS
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-12 md:mb-16 font-light">
          From custom themes to enterprise solutions — everything your WordPress project needs.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((feature) => (
            <div
              key={feature.id}
              className="wpf-card group p-6 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}15`, color: feature.color }}
              >
                {iconMap[feature.icon] || <Zap size={24} />}
              </div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
