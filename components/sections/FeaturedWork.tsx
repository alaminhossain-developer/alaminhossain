'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjects } from '@/lib/store'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function fixUrl(url: string): string {
  if (!url || url === '#') return '#'
  if (!/^https?:\/\//i.test(url)) return `https://${url}`
  return url
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const projects = getProjects()

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return

        const image = panel.querySelector('.project-image')
        const content = panel.querySelector('.project-content')
        const meta = panel.querySelector('.project-meta')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none none',
          },
        })

        if (image) {
          tl.fromTo(
            image,
            { scale: 1.1, opacity: 0, x: i % 2 === 0 ? 60 : -60 },
            { scale: 1, opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
            0
          )
        }

        if (content) {
          tl.fromTo(
            content,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            0.2
          )
        }

        if (meta) {
          tl.fromTo(
            meta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            0.4
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32" id="work">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Portfolio</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-12 md:mb-16 text-white">
          SELECTED WORK
        </h2>

        {/* Projects */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => {
            const isReversed = i % 2 !== 0
            const isLast = i === projects.length - 1

            return (
              <div
                key={project.id}
                ref={(el) => { panelsRef.current[i] = el }}
                className={`${
                  isLast ? 'space-y-8' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'
                }`}
              >
                {/* Regular projects */}
                {!isLast && (
                  <>
                    <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''} project-image`}>
                      <BrowserFrame project={project} />
                    </div>

                    <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : ''} flex flex-col gap-6`}>
                      <div className="project-content">
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
                          <span className="text-[0.625rem] text-white/25 uppercase tracking-[0.15em] font-medium">
                            {project.year}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                          {project.title}
                        </h3>

                        <p className="text-white/50 text-base leading-relaxed mb-6 max-w-[420px] font-light">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="project-meta flex items-center gap-4">
                        <a
                          href={fixUrl(project.liveUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:gap-3 transition-all duration-300"
                        >
                          View Live
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {/* Last project: full-width */}
                {isLast && (
                  <>
                    <div className="project-image">
                      <BrowserFrame project={project} fullWidth />
                    </div>

                    <div className="flex flex-col items-center text-center gap-6">
                      <div className="project-content">
                        <div className="flex items-center justify-center gap-3 mb-4">
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
                          <span className="text-[0.625rem] text-white/25 uppercase tracking-[0.15em] font-medium">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-base leading-relaxed max-w-[600px] mx-auto mb-6 font-light">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="project-meta flex items-center justify-center gap-4">
                        <a
                          href={fixUrl(project.liveUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:gap-3 transition-all duration-300"
                        >
                          View Live
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Browser Frame ─── */
function BrowserFrame({
  project,
  fullWidth = false,
}: {
  project: { liveUrl: string; color: string; screenshot: string }
  fullWidth?: boolean
}) {
  const hasScreenshot = project.screenshot && project.screenshot.length > 0

  return (
    <div className={`group relative rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.015] ${fullWidth ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.015] border-b border-white/[0.04] z-10 relative">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/[0.03] rounded px-3 py-0.5 text-[10px] text-white/25 truncate max-w-[200px]">
            {project.liveUrl && project.liveUrl !== '#' ? project.liveUrl.replace(/^https?:\/\//, '') : 'preview'}
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="relative w-full h-full bg-[#060918] flex items-center justify-center overflow-hidden">
        {hasScreenshot ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.screenshot}
            alt={`${project.liveUrl} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          /* Wireframe fallback */
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="w-full space-y-4">
              <div className="w-2/3 h-3 bg-white rounded-full opacity-[0.04]" />
              <div className="w-1/2 h-3 bg-white rounded-full opacity-[0.04]" />
              <div className="w-full h-px bg-white/[0.04] my-4" />
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="aspect-video rounded bg-white/[0.03] border border-white/[0.04]"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700"
          style={{ background: `linear-gradient(135deg, ${project.color}40, transparent)` }}
        />
      </div>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center z-10">
        <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-[0.12em] font-medium">
          View Project
        </span>
      </div>
    </div>
  )
}
