'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getSkills } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const skills = getSkills()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      const skillElements = sectionRef.current.querySelectorAll('.skill-node')
      const lineElements = sectionRef.current.querySelectorAll('.skill-line')

      lineElements.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      })

      skillElements.forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            delay: i * 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      })

      skillElements.forEach((node, i) => {
        gsap.to(node, {
          y: Math.sin(i) * 5,
          duration: 2 + (i % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const coreSkills = skills.filter((s) => s.category === 'core')
  const frontendSkills = skills.filter((s) => s.category === 'frontend' || s.category === 'backend')
  const toolsSkills = skills.filter((s) => s.category === 'tools' || s.category === 'platforms')
  const allSkills = [...coreSkills, ...frontendSkills, ...toolsSkills]

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Technology</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-10 md:mb-14 text-white">
          TECHNOLOGY MAP
        </h2>

        {/* Tech Map */}
        <div className="relative w-full aspect-square max-w-[600px] mx-auto">
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/[0.1] bg-dark-950 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm md:text-base font-bold tracking-wider text-white">
                  AL AMIN
                </div>
                <div className="text-[9px] md:text-[10px] text-white/30 tracking-widest uppercase">
                  Developer
                </div>
              </div>
            </div>
          </div>

          {/* Concentric rings */}
          <div className="absolute inset-[10%] rounded-full border border-white/[0.04] opacity-30" />
          <div className="absolute inset-[25%] rounded-full border border-white/[0.04] opacity-20" />
          <div className="absolute inset-[40%] rounded-full border border-white/[0.04] opacity-10" />

          {/* Skill nodes */}
          {allSkills.map((skill, i) => {
            const angle = (i / allSkills.length) * Math.PI * 2 - Math.PI / 2
            const radius = 38
            const x = 50 + Math.cos(angle) * radius
            const y = 50 + Math.sin(angle) * radius
            const isHovered = hoveredSkill === skill.name
            const isCore = skill.category === 'core'

            return (
              <div
                key={skill.name}
                className={`skill-node absolute z-20 cursor-pointer ${isCore ? 'scale-110' : ''}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    isHovered
                      ? 'bg-dark-800 border-cyan-400 shadow-[0_0_20px_rgba(0,212,232,0.15)]'
                      : isCore
                        ? 'bg-dark-900 border-white/[0.1]'
                        : 'bg-dark-900 border-white/[0.04]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono whitespace-nowrap ${
                      isHovered ? 'text-cyan-400' : isCore ? 'text-white/80' : 'text-white/50'
                    }`}
                  >
                    {skill.name}
                  </span>
                  {isHovered && skill.level && (
                    <span className="text-[9px] font-mono text-cyan-400">
                      {skill.level}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {allSkills.map((skill, i) => {
              const angle = (i / allSkills.length) * Math.PI * 2 - Math.PI / 2
              const radius = 38
              const x = 50 + Math.cos(angle) * radius
              const y = 50 + Math.sin(angle) * radius
              const isCore = skill.category === 'core'

              return (
                <line
                  key={skill.name}
                  className="skill-line"
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke={hoveredSkill === skill.name ? '#00d4e8' : isCore ? 'rgba(0,212,232,0.15)' : 'rgba(255,255,255,0.05)'}
                  strokeWidth={hoveredSkill === skill.name ? 1.5 : 0.5}
                  strokeDasharray={isCore ? 'none' : '4 4'}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-[0.625rem] text-white/30 uppercase tracking-[0.15em] font-medium">Core Skills</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-[0.625rem] text-white/30 uppercase tracking-[0.15em] font-medium">Additional Skills</span>
          </div>
        </div>
      </div>
    </section>
  )
}
