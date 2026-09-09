'use client'

import { useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

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
  liveUrl?: string
}

export default function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy
  onClose: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const categoryColor =
    study.category === 'WordPress'
      ? '#3b82f6'
      : study.category === 'Shopify'
      ? '#22c55e'
      : '#0ea5e9'

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0e27]/95 backdrop-blur-md p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-white/[0.06] bg-[#0d1229] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-start justify-between px-5 md:px-6 py-4 border-b border-white/[0.04]">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/20">
                Case Study
              </span>
              <span
                className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border"
                style={{
                  color: categoryColor,
                  borderColor: `${categoryColor}40`,
                  background: `${categoryColor}10`,
                }}
              >
                {study.category}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-medium rounded bg-white/[0.04] text-white/35 border border-white/[0.04]">
                {study.client}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-tight mb-1">
              {study.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Banner Image */}
          {study.bannerImage && (
            <div className="w-full aspect-[16/9] bg-[#080c1f] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.bannerImage}
                alt={study.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          <div className="p-5 md:p-6 space-y-6">
            {/* Results */}
            {study.results.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
                  Key Results
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {study.results.map((result, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium text-center"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
                Overview
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                {study.description}
              </p>
            </div>

            {/* Tech Stack */}
            {study.technologies.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] text-white/50 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.04] px-5 py-3 flex items-center justify-between">
          <span className="text-[10px] text-white/25">
            Press <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-white/40 font-mono text-[9px]">Esc</kbd> to close
          </span>
          <div className="flex items-center gap-2">
            {study.liveUrl && study.liveUrl !== '#' && (
              <a
                href={study.liveUrl.startsWith('http') ? study.liveUrl : `https://${study.liveUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-400/25 transition-colors"
              >
                Visit Live Site
                <ExternalLink size={12} />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.1] hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
