'use client'

import { useState } from 'react'
import { getProjects } from '@/lib/store'
import ProjectModal from '@/components/sections/ProjectModal'
import type { Project } from '@/lib/data'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function fixUrl(url: string): string {
  if (!url || url === '#') return '#'
  if (!/^https?:\/\//i.test(url)) return `https://${url}`
  return url
}

export default function ProjectsPage() {
  const projects = getProjects()
  const [modalProject, setModalProject] = useState<Project | null>(null)

  return (
    <main className="bg-[#0a0e27] text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">All Projects</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white">
            PORTFOLIO
          </h1>
          <p className="mt-4 text-white/40 text-base max-w-lg font-light">
            A complete collection of projects — WordPress, Shopify, performance optimization, and custom web experiences.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => setModalProject(project)}
            >
              {/* Browser Frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.015] aspect-[16/10] mb-5">
                {/* Chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.015] border-b border-white/[0.04] relative z-10">
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

                {/* Preview */}
                <div className="relative w-full h-full bg-[#060918] flex items-center justify-center overflow-hidden">
                  {project.screenshots && project.screenshots.length > 0 ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.screenshots[0]}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="w-full space-y-4">
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

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-[0.12em] font-medium">
                      View Project
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2.5 py-0.5 text-[10px] font-mono rounded-full border"
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
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[9px] text-white/20 self-center">+{project.technologies.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setModalProject(project) }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:gap-3 transition-all duration-300"
                  >
                    View Project
                    <ArrowUpRight size={14} />
                  </button>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={fixUrl(project.liveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/30 hover:text-white/60 transition-all duration-300"
                    >
                      Live Site
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-24 text-white/20">
            <p className="text-lg">No projects yet.</p>
            <p className="text-sm mt-2">Add projects from the <a href="/dashboard" className="text-cyan-400 hover:underline">dashboard</a>.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </main>
  )
}
