'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getSkills, getProfile } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

const categoryColors: Record<string, string> = {
  core: '#00d4e8',
  frontend: '#8b5cf6',
  backend: '#22c55e',
  tools: '#f59e0b',
  platforms: '#ec4899',
}

const categoryLabels: Record<string, string> = {
  core: 'WordPress Ecosystem',
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
  platforms: 'Platforms',
}

// Pre-compute positions outside component (pure math, no React)
const ORBITAL_RADIUS = 37 // % from center for nodes
const BORDER_RADIUS = 47 // % from center for neon border
const NUM_SKILLS = 18 // match default skill count

const positions = Array.from({ length: NUM_SKILLS }, (_, i) => {
  const angle = (i / NUM_SKILLS) * Math.PI * 2 - Math.PI / 2
  return {
    x: 50 + Math.cos(angle) * ORBITAL_RADIUS,
    y: 50 + Math.sin(angle) * ORBITAL_RADIUS,
    bx: 50 + Math.cos(angle) * BORDER_RADIUS,
    by: 50 + Math.sin(angle) * BORDER_RADIUS,
  }
})

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const skills = getSkills()
  const profile = getProfile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      const skillElements = sectionRef.current.querySelectorAll('.skill-node')
      skillElements.forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            delay: i * 0.04,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>
  )

  const coreSkills = skills.filter((s) => s.category === 'core')
  const frontendSkills = skills.filter((s) => s.category === 'frontend')
  const toolsSkills = skills.filter(
    (s) => s.category === 'tools' || s.category === 'platforms'
  )
  const allSkills = [...coreSkills, ...frontendSkills, ...toolsSkills]

  // Use only as many positions as we have skills
  const nodeData = allSkills.map((skill, i) => ({
    skill,
    ...positions[i % positions.length],
  }))

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">
            Technology
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-10 md:mb-14 text-white">
          TECHNOLOGY MAP
        </h2>

        {/* Desktop: Orbital Map — forced square */}
        <div className="relative mx-auto hidden md:block" style={{ width: 'min(620px, 80vw)', aspectRatio: '1 / 1' }}>

          {/* ===== NEON BORDER RING ===== */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '2%',
              border: '1px solid rgba(0, 212, 232, 0.25)',
              boxShadow:
                '0 0 20px rgba(0, 212, 232, 0.08), inset 0 0 20px rgba(0, 212, 232, 0.04)',
            }}
          />

          {/* ===== CONCENTRIC RINGS ===== */}
          {[
            { inset: '15%', opacity: 0.1 },
            { inset: '30%', opacity: 0.06 },
          ].map((ring, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/[0.06]"
              style={{ inset: ring.inset, opacity: ring.opacity }}
            />
          ))}

          {/* ===== ROTATING WRAPPER ===== */}
          <div
            className="absolute inset-0"
            style={{ animation: 'orbital-spin 90s linear infinite' }}
          >
            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {nodeData.map(({ skill, x, y, bx, by }) => {
                const color = categoryColors[skill.category] || '#ffffff'
                const isHovered = hoveredSkill === skill.name
                const isCore = skill.category === 'core'

                return (
                  <line
                    key={skill.name}
                    x1="50"
                    y1="50"
                    x2={isHovered ? bx : x}
                    y2={isHovered ? by : y}
                    stroke={
                      isHovered ? color : `${color}${isCore ? '25' : '10'}`
                    }
                    strokeWidth={isHovered ? '0.4' : '0.15'}
                    style={{
                      transition:
                        'x2 0.5s ease, y2 0.5s ease, stroke 0.3s, stroke-width 0.3s',
                    }}
                  />
                )
              })}
            </svg>

            {/* Skill nodes */}
            {nodeData.map(({ skill, x, y }) => {
              const isHovered = hoveredSkill === skill.name
              const color = categoryColors[skill.category] || '#ffffff'
              const isCore = skill.category === 'core'

              return (
                <div
                  key={skill.name}
                  className="skill-node absolute z-20 cursor-pointer"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Counter-rotate to keep text always horizontal */}
                  <div style={{ animation: 'node-counter-spin 90s linear infinite' }}>
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        isHovered ? 'shadow-lg' : ''
                      }`}
                      style={{
                        backgroundColor: isHovered ? `${color}20` : '#0a0e27',
                        borderColor: isHovered ? color : `${color}30`,
                        boxShadow: isHovered ? `0 0 16px ${color}25` : 'none',
                      }}
                    >
                      <span
                        className="text-[11px] font-mono whitespace-nowrap"
                        style={{
                          color: isHovered
                            ? color
                            : isCore
                              ? 'rgba(255,255,255,0.8)'
                              : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {skill.name}
                      </span>
                      {isHovered && skill.level && (
                        <span className="text-[9px] font-mono" style={{ color }}>
                          {skill.level}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ===== CENTER PHOTO (never rotates) ===== */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-[2px] bg-gradient-to-br from-cyan-400/60 via-cyan-400/20 to-emerald-400/40">
              <div className="w-full h-full rounded-full overflow-hidden bg-dark-950 flex items-center justify-center">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-sm md:text-base font-bold tracking-wider text-white">
                      AL AMIN
                    </div>
                    <div className="text-[9px] md:text-[10px] text-white/30 tracking-widest uppercase">
                      Developer
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Grouped column list */}
        <div className="block md:hidden space-y-8 mt-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: categoryColors[category] }}
              >
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 text-xs font-mono rounded-full border"
                    style={{
                      borderColor: `${categoryColors[skill.category]}30`,
                      color: categoryColors[skill.category],
                      backgroundColor: `${categoryColors[skill.category]}08`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="hidden md:flex items-center justify-center gap-6 mt-10 flex-wrap">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[0.625rem] text-white/30 uppercase tracking-[0.12em] font-medium">
                {categoryLabels[cat] || cat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animations — global so they work across the component */}
      <style jsx global>{`
        @keyframes orbital-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes node-counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

      `}</style>
    </section>
  )
}
