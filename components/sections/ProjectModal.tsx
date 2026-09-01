'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@/lib/data'

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

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1))
  }, [screenshots.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1))
  }, [screenshots.length])

  // Keyboard navigation
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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-colors z-10"
      >
        <X size={18} />
      </button>

      <div
        className="w-full max-w-5xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="px-3 py-1 text-xs font-mono rounded-full border"
            style={{
              color: project.color,
              borderColor: `${project.color}40`,
              background: `${project.color}10`,
            }}
          >
            {project.category}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white">{project.title}</h3>
          {screenshots.length > 0 && (
            <span className="text-xs text-white/30 ml-auto">
              {current + 1} / {screenshots.length}
            </span>
          )}
        </div>

        {/* Image area */}
        <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden bg-[#060918] border border-white/[0.06]">
          {screenshots.length > 0 ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshots[current]}
                alt={`${project.title} screenshot ${current + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Arrows */}
              {hasMultiple && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dots */}
              {hasMultiple && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === current
                          ? 'bg-white scale-125'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
              No screenshots uploaded
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-white/40 max-w-md line-clamp-2">{project.description}</p>
          <a
            href={project.liveUrl && project.liveUrl !== '#' ? (project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`) : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/30 transition-colors shrink-0"
          >
            View Live Site →
          </a>
        </div>
      </div>
    </div>
  )
}
