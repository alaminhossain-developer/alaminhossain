'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getShopifyFeatures } from '@/lib/store'
import {
  Palette,
  CreditCard,
  Plug,
  Zap,
  BarChart3,
  RefreshCw,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Palette,
  CreditCard,
  Plug,
  Zap,
  BarChart3,
  RefreshCw,
}

export default function ShopifyFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const features = getShopifyFeatures()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      const title = sectionRef.current?.querySelector('[data-title]')
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        )
      }

      // Cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24" id="shopify">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div data-title className="mb-12 lg:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#22c55e]" />
            <span className="text-xs text-[#22c55e] uppercase tracking-[0.12em] font-medium">Shopify</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 text-white">
            Shopify
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-emerald-400">
              Features
            </span>
          </h2>
          <p className="text-base text-white/40 font-light max-w-xl leading-relaxed">
            Specialized Shopify development services — from custom themes to performance optimization and everything in between.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Zap
            return (
              <div
                key={feature.id}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative p-8 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-500"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white/90 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[0.875rem] text-white/40 leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}05, transparent)`,
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
