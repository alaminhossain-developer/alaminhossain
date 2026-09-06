'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolio } from '@/lib/usePortfolio'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { caseStudies } = usePortfolio()

  const sorted = [...caseStudies].sort((a, b) => (a.order || 99) - (b.order || 99))

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.cs-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
    <section ref={sectionRef} className="py-16 lg:py-24" id="case-studies">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Case Studies</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 text-white">
          REAL RESULTS
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-12 md:mb-16 font-light">
          Deep dives into projects that delivered measurable impact.
        </p>

        {/* Case Study Cards */}
        <div className="space-y-8">
          {sorted.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyCard({ study }: { study: { id: string; title: string; client: string; category: string; description: string; results: string[]; bannerImage: string; technologies: string[] } }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="cs-card group relative rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.015]">
      {/* Banner */}
      <div className="relative w-full aspect-[21/9] bg-[#0a0e27] overflow-hidden">
        {study.bannerImage && !imgError ? (
          <img
            src={study.bannerImage}
            alt={study.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="text-center">
              <div className="text-6xl font-bold text-white/[0.04] mb-2">{study.category === 'WordPress' ? 'WP' : study.category === 'Shopify' ? 'SH' : 'CS'}</div>
              <div className="text-xs text-white/15 uppercase tracking-widest">{study.category}</div>
            </div>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-20 px-6 lg:px-10 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 text-xs font-mono rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
            {study.category}
          </span>
          <span className="text-xs text-white/30">{study.client}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{study.title}</h3>
        <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-3xl font-light">{study.description}</p>

        {/* Results */}
        <div className="flex flex-wrap gap-3 mb-6">
          {study.results.map((result, i) => (
            <div key={i} className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              {result}
            </div>
          ))}
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {study.technologies.map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
