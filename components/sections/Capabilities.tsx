'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    number: '01',
    title: 'WORDPRESS',
    description:
      'Custom websites, themes, plugins, Elementor, WooCommerce, performance optimization and technical SEO.',
    tags: ['PHP', 'Elementor', 'ACF', 'MySQL', 'REST API'],
    color: '#0ea5e9',
  },
  {
    number: '02',
    title: 'SHOPIFY',
    description:
      'Liquid customization, custom sections, eCommerce UX, theme development and integrations.',
    tags: ['Liquid', 'Shopify CLI', 'JSON', 'JavaScript', 'Hydrogen'],
    color: '#22c55e',
  },
  {
    number: '03',
    title: 'WEB PERFORMANCE',
    description:
      'Core Web Vitals, speed optimization, technical improvements and frontend performance.',
    tags: ['Lighthouse', 'CWV', 'Lazy Loading', 'CDN', 'Caching'],
    color: '#f59e0b',
  },
  {
    number: '04',
    title: 'CUSTOM WEB EXPERIENCES',
    description:
      'JavaScript interactions, API integrations, responsive interfaces and custom functionality.',
    tags: ['JavaScript', 'React', 'APIs', 'GSAP', 'Three.js'],
    color: '#8b5cf6',
  },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return

        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24" id="capabilities">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Capabilities</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-10 md:mb-14 text-white">
          WHAT I BUILD
        </h2>

        {/* Capability rows */}
        <div className="flex flex-col">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              ref={(el) => { rowsRef.current[i] = el }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 py-7 md:py-9 border-t border-white/[0.04] transition-all duration-500 ${
                  hoveredIndex === i ? 'bg-white/[0.02]' : ''
                }`}
              >
                {/* Number */}
                <span className="font-mono text-sm text-white/30 w-12 flex-shrink-0">
                  {cap.number}
                </span>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight w-full lg:w-[300px] flex-shrink-0 transition-colors duration-300"
                  style={{ color: hoveredIndex === i ? cap.color : 'var(--foreground, #f5f5f5)' }}
                >
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-white/50 text-base leading-relaxed max-w-[400px] font-light">
                  {cap.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-white/[0.03] border border-white/[0.04] rounded-full text-white/35 group-hover:border-white/[0.08] group-hover:text-white/50 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.04] group-hover:border-cyan-400/40 group-hover:bg-cyan-400/[0.05] transition-all duration-300 flex-shrink-0">
                  <ExternalLink size={14} className="text-white/25 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.04]" />
        </div>
      </div>
    </section>
  )
}
