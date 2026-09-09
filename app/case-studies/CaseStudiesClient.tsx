'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import CaseStudyModal from '@/components/sections/CaseStudyModal'

interface CaseStudy {
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

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}

export default function CaseStudiesClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)

  const sorted = [...caseStudies].sort((a, b) => (a.order || 99) - (b.order || 99))

  return (
    <main className="bg-[#0a0e27] text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">
              All Case Studies
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white">
            Case Studies
          </h1>
          <p className="mt-4 text-white/40 text-base max-w-lg font-light">
            Deep dives into real projects — the challenge, the approach, and the measurable results
            for WordPress and Shopify businesses.
          </p>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {sorted.map((study, i) => (
            <CaseStudyCard
              key={study.id || i}
              study={study}
              index={i}
              onClick={() => setSelectedStudy(study)}
            />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-24 text-white/20">
            <p className="text-lg">No case studies yet.</p>
            <p className="text-sm mt-2">
              Add them from the{' '}
              <a href="/dashboard" className="text-cyan-400 hover:underline">
                dashboard
              </a>
              .
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedStudy && (
        <CaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />
      )}
    </main>
  )
}

function CaseStudyCard({
  study,
  index,
  onClick,
}: {
  study: CaseStudy
  index: number
  onClick: () => void
}) {
  const [imgError, setImgError] = useState(false)
  const num = String(study.order || index + 1).padStart(2, '0')
  const isLong = study.description.length > 120
  const liveUrl = study.liveUrl && study.liveUrl !== '#' ? (study.liveUrl.startsWith('http') ? study.liveUrl : `https://${study.liveUrl}`) : null

  const categoryColor =
    study.category === 'WordPress'
      ? '#3b82f6'
      : study.category === 'Shopify'
      ? '#22c55e'
      : '#0ea5e9'

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08] transition-all duration-500 cursor-pointer"
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
              {liveUrl ? stripProtocol(liveUrl) : study.client.toLowerCase().replace(/\s+/g, '') + '.com'}
            </div>
          </div>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold text-cyan-400/80 hover:text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors shrink-0"
              title={`Visit ${liveUrl}`}
            >
              Visit
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>

        {/* Preview content */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {study.bannerImage && !imgError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
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
            style={{
              background: `linear-gradient(135deg, ${categoryColor}25, transparent)`,
            }}
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
              color: categoryColor,
              borderColor: `${categoryColor}40`,
              background: `${categoryColor}10`,
            }}
          >
            {study.category}
          </span>
          <span className="text-xs text-white/25">{study.client}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
          {study.title}
        </h3>

        {/* Description — clamped with cyan Read More that opens modal */}
        <p className="text-sm text-white/40 leading-relaxed font-light mb-5">
          {isLong ? study.description.slice(0, 110).replace(/\s+\S*$/, '') + '… ' : study.description}
          {isLong && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Read More
            </button>
          )}
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

        {/* Tech tags + View Details */}
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
              <span className="text-[10px] text-white/20 self-center">
                +{study.technologies.length - 5}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:gap-2.5 transition-all duration-300"
          >
            View Details
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
