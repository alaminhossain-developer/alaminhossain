'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { usePortfolio } from '@/lib/usePortfolio'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import ProjectModal from './ProjectModal'
import type { Project } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

function fixUrl(url: string): string {
  if (!url || url === '#') return '#'
  if (!/^https?:\/\//i.test(url)) return `https://${url}`
  return url
}

const FILTER_TABS = ['All', 'MERN', 'Shopify', 'Next.js', 'WordPress'] as const
type FilterTab = (typeof FILTER_TABS)[number]

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  WordPress: { bg: 'bg-[#21759b]/15', text: 'text-[#21759b]', border: 'border-[#21759b]/30' },
  Shopify: { bg: 'bg-[#95bf47]/15', text: 'text-[#95bf47]', border: 'border-[#95bf47]/30' },
  'Next.js': { bg: 'bg-white/10', text: 'text-white/80', border: 'border-white/20' },
  MERN: { bg: 'bg-[#61dafb]/15', text: 'text-[#61dafb]', border: 'border-[#61dafb]/30' },
  default: { bg: 'bg-cyan-400/10', text: 'text-cyan-400', border: 'border-cyan-400/30' },
}

function getCategoryStyle(cat: string) {
  const key = Object.keys(categoryColors).find((k) => k.toLowerCase() === cat.toLowerCase())
  return key ? categoryColors[key] : categoryColors.default
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { projects: allProjects } = usePortfolio()
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const selectedProjects = useMemo(() => {
    return allProjects
      .filter((p) => p.selected)
      .sort((a, b) => (a.order || 99) - (b.order || 99))
  }, [allProjects])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return selectedProjects
    return selectedProjects.filter((p) => {
      const cat = p.category.toLowerCase()
      const filter = activeFilter.toLowerCase()
      if (filter === 'mern') return cat.includes('mern') || cat.includes('react') || cat.includes('full stack')
      return cat.includes(filter)
    })
  }, [selectedProjects, activeFilter])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [filteredProjects])

  return (
    <>
      <section ref={sectionRef} className="relative py-16 lg:py-24" id="work">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-8 text-white">
            SELECTED WORK
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/30'
                    : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/70 hover:bg-white/[0.06]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project grid — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
              >
                {/* Screenshot / Preview image */}
                <div className="relative aspect-[16/10] bg-[#060918] overflow-hidden">
                  {project.screenshots && project.screenshots.length > 0 ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : project.image && project.image !== '/images/projects/project-1.jpg' ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6">
                      <div className="w-full space-y-3">
                        <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                        <div className="w-1/2 h-2 bg-white/5 rounded-full" />
                        <div className="w-full h-px bg-white/[0.04] my-3" />
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(6)].map((_, j) => (
                            <div key={j} className="aspect-video rounded bg-white/[0.03] border border-white/[0.04]" />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Asset count badge */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                      {project.screenshots.length} ASSETS
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-sm ${getCategoryStyle(project.category).bg} ${getCategoryStyle(project.category).text} ${getCategoryStyle(project.category).border}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setModalProject(project)}
                      className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-[15px] font-bold text-white mb-2 leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-white/40 text-[13px] leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium bg-white/[0.04] border border-white/[0.06] rounded text-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium text-white/20">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* View Details + External link */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => setModalProject(project)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                      VIEW DETAILS
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>

                    {project.liveUrl && project.liveUrl !== '#' ? (
                      <a
                        href={fixUrl(project.liveUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/25 hover:text-white/60 transition-colors duration-300"
                        title="Open live site"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <span className="text-[10px] text-white/15 uppercase tracking-wider font-medium">No Links</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-white/30 text-sm">
              No projects found for this category.
            </div>
          )}

          {/* Explore More button */}
          {allProjects.length > 6 && (
            <div className="mt-14 flex justify-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300"
              >
                <span className="text-sm font-semibold uppercase tracking-wider">Explore More Projects</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </>
  )
}
