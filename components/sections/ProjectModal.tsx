'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink, Copy, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/data'

function fixUrl(url: string): string {
  if (!url || url === '#') return '#'
  if (!/^https?:\/\//i.test(url)) return `https://${url}`
  return url
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [current, setCurrent] = useState(0)
  const screenshots = project.screenshots || []
  const hasMultiple = screenshots.length > 1
  const [copied, setCopied] = useState(false)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1))
  }, [screenshots.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1))
  }, [screenshots.length])

  const copyLink = useCallback(() => {
    const url = fixUrl(project.liveUrl)
    if (url !== '#') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }, [project.liveUrl])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const liveUrl = fixUrl(project.liveUrl)

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0e27]/95 backdrop-blur-md p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border border-white/[0.06] bg-[#0d1229] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top Bar: badges + title + close ── */}
        <div className="flex items-start justify-between px-5 md:px-6 py-4 border-b border-white/[0.04]">
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/20">
                Project Preview
              </span>
              {project.category && (
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-white/[0.06] text-white/50 border border-white/[0.06]">
                  {project.category}
                </span>
              )}
              {screenshots.length > 0 && (
                <span className="px-2.5 py-0.5 text-[10px] font-medium rounded bg-white/[0.04] text-white/35 border border-white/[0.04]">
                  {screenshots.length} Image{screenshots.length !== 1 ? 's' : ''}
                </span>
              )}
              {project.technologies.length > 0 && (
                <span className="px-2.5 py-0.5 text-[10px] font-medium rounded bg-white/[0.04] text-white/35 border border-white/[0.04]">
                  {project.technologies[0]}
                </span>
              )}
            </div>
            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-white leading-tight mb-1 truncate">
              {project.title}
            </h2>
            <p className="text-xs text-white/30 line-clamp-1">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Main Content: Gallery + Sidebar ── */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          {/* Left: Media Gallery */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Gallery header */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.03]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Media Gallery</span>
                {screenshots.length > 0 && (
                  <span className="text-[10px] text-white/20 ml-2">
                    screenshot {current + 1} of {screenshots.length}
                  </span>
                )}
              </div>
              {hasMultiple && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={prev}
                    className="w-7 h-7 rounded flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={next}
                    className="w-7 h-7 rounded flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Main image */}
            <div className="flex-1 min-h-0 relative bg-[#080c1f] flex items-center justify-center p-4">
              {screenshots.length > 0 ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={screenshots[current]}
                  alt={`${project.title} screenshot ${current + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-white/15 text-sm">No screenshots uploaded</div>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="w-full md:w-64 lg:w-72 border-t md:border-t-0 md:border-l border-white/[0.04] flex flex-col overflow-y-auto">
            {/* Tech Stack */}
            <div className="px-5 py-4 border-b border-white/[0.03]">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-medium rounded bg-white/[0.05] text-white/50 border border-white/[0.04]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div className="px-5 py-4 border-b border-white/[0.03]">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Explore</h3>
              <div className="space-y-2">
                {liveUrl !== '#' && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04] text-white/60 text-xs hover:bg-white/[0.06] hover:text-white/80 transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span>Visit Live Site</span>
                  </a>
                )}
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04] text-white/60 text-xs hover:bg-white/[0.06] hover:text-white/80 transition-colors"
                >
                  <Copy size={12} />
                  <span>{copied ? 'Copied!' : 'Copy details link'}</span>
                </button>
              </div>
            </div>

            {/* Shortcuts */}
            <div className="px-5 py-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Shortcuts</h3>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-white/30">
                  <span>Navigate media</span>
                  <div className="flex gap-0.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-white/40 font-mono text-[9px]">←</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-white/40 font-mono text-[9px]">→</kbd>
                  </div>
                </div>
                <div className="flex items-center justify-between text-white/30">
                  <span>Close preview</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-white/40 font-mono text-[9px]">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: Quick Switch Thumbnails ── */}
        {screenshots.length > 0 && (
          <div className="border-t border-white/[0.04] px-5 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Quick Switch</span>
              <span className="text-[10px] text-white/25">{screenshots.length} item{screenshots.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {screenshots.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`shrink-0 relative rounded-lg overflow-hidden border-2 transition-all ${
                    idx === current
                      ? 'border-cyan-400/60 ring-1 ring-cyan-400/20'
                      : 'border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-24 h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[8px] text-white/60 truncate max-w-[80px]">
                    screenshot {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
