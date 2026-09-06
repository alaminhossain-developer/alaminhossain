'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolio } from '@/lib/usePortfolio'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { caseStudies } = usePortfolio()

  const sorted = [...caseStudies].sort((a, b) => (a.order || 99) - (b.order || 99))

  useEffect(() => {
    if (!sectionRef.current) return
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
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24" id="case-studies">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div data-title className="mb-12 lg:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Case Studies</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 text-white">
            Featured
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Projects
            </span>
          </h2>
          <p className="text-base text-white/40 font-light max-w-xl leading-relaxed">
            Deep dives into projects that delivered measurable impact for real businesses.
          </p>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {sorted.map((study, i) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={i}
              ref={(el) => { cardsRef.current[i] = el }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { forwardRef } from 'react'

const CaseStudyCard = forwardRef<HTMLDivElement, {
  study: {
    id?: string
    title: string
    client: string
    category: string
    description: string
    results: string[]
    bannerImage: string
    technologies: string[]
    order: number
  }
  index: number
}>(({ study, index }, ref) => {
  const [imgError, setImgError] = useState(false)
  const num = String(study.order || index + 1).padStart(2, '0')

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08] transition-all duration-500"
    >
      {/* Browser Preview */}
      <div className="relative w-full aspect-[16/10] bg-[#060918] overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.015] border-b border-white/[0.04] z-10 relative">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/[0.03] rounded px-3 py-0.5 text-[10px] text-white/25 truncate max-w-[200px]">
              {study.client.toLowerCase().replace(/\s+/g, '')}.com
            </div>
          </div>
        </div>

        {/* Preview content */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {study.bannerImage && !imgError ? (
            <img
              src={study.bannerImage}
              alt={study.title}
              width={800}
              height={500}
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="w-full space-y-4 max-w-md">
                <div className="w-2/3 h-3 bg-white rounded-full opacity-[0.04]" />
                <div className="w-1/2 h-3 bg-white rounded-full opacity-[0.04]" />
                <div className="w-full h-px bg-white/[0.04] my-4" />
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="aspect-video rounded bg-white/[0.03] border border-white/[0.04]" />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700"
            style={{ background: `linear-gradient(135deg, ${study.category === 'WordPress' ? '#3b82f640' : study.category === 'Shopify' ? '#22c55e40' : '#0ea5e940'}, transparent)` }}
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center z-10">
          <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-[0.12em] font-medium">
            View Case Study
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Number + Category */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl font-bold text-white/[0.06]">{num}</span>
          <span
            className="px-3 py-1 text-xs font-mono rounded-full border"
            style={{
              color: study.category === 'WordPress' ? '#3b82f6' : study.category === 'Shopify' ? '#22c55e' : '#0ea5e9',
              borderColor: study.category === 'WordPress' ? '#3b82f640' : study.category === 'Shopify' ? '#22c55e40' : '#0ea5e940',
              background: study.category === 'WordPress' ? '#3b82f610' : study.category === 'Shopify' ? '#22c55e10' : '#0ea5e910',
            }}
          >
            {study.category}
          </span>
          <span className="text-xs text-white/25">{study.client}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
          {study.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed mb-5 font-light">
          {study.description}
        </p>

        {/* Results */}
        {study.results.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {study.results.map((result, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
              >
                {result}
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {study.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
              >
                {tech}
              </span>
            ))}
            {study.technologies.length > 5 && (
              <span className="text-[10px] text-white/20 self-center">+{study.technologies.length - 5}</span>
            )}
          </div>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:gap-2.5 transition-all duration-300">
            View Details
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
})

CaseStudyCard.displayName = 'CaseStudyCard'
