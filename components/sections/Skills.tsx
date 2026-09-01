'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getSkills } from '@/lib/store'
const skillStrings = getSkills().map((s) => s.name)

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!centerRef.current || skillsRef.current.length === 0) return

      // Create orbital animation for skills
      const skillElements = skillsRef.current
      const totalSkills = skillElements.length
      const radius = 200

      skillElements.forEach((skill, index) => {
        const angle = (index / totalSkills) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        gsap.set(skill, { x, y })

        // Orbital animation
        gsap.to(skill, {
          rotation: 360,
          transformOrigin: `center`,
          duration: 20 + index,
          repeat: -1,
          ease: 'none',
          modifiers: {
            rotation: gsap.utils.unitize((v) => parseFloat(v) % 360),
          },
        })

        // Entrance animation
        gsap.fromTo(
          skill,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'back.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
            },
          }
        )
      })

      // Animate center text
      const centerText = centerRef.current.querySelectorAll('[data-center]')
      gsap.fromTo(
        centerText,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-20 lg:mb-24 text-center">
          <h2 className="text-display-lg lg:text-display-xl font-bold tracking-tight mb-4">
            TECHNOLOGY STACK
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tools and frameworks I use to build performant, scalable web experiences
          </p>
        </div>

        {/* Interactive Technology Map */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Orbital background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-96 h-96 rounded-full border border-cyan-500/10" />
            <div className="absolute w-64 h-64 rounded-full border border-cyan-500/5" />
            <div className="absolute w-32 h-32 rounded-full border border-cyan-500/20" />
          </div>

          {/* Center content */}
          <div ref={centerRef} className="absolute text-center z-10">
            <div data-center className="text-2xl font-bold text-white mb-2">
              AL AMIN
            </div>
            <div data-center className="text-sm text-white/60">
              Full-Stack Developer
            </div>
            <div
              data-center
              className="text-xs text-cyan-400 mt-3 font-mono"
            >
              {hoveredSkill || 'Hover to explore'}
            </div>
          </div>

          {/* Skills orbit */}
          <div className="absolute inset-0 flex items-center justify-center">
            {skillStrings.map((skill, index) => (
              <div
                key={skill}
                ref={(el) => {
                  if (el) skillsRef.current[index] = el
                }}
                className="absolute group cursor-pointer"
              >
                <div
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    hoveredSkill === skill
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-100 shadow-lg shadow-cyan-400/50'
                      : 'border-cyan-500/30 bg-dark-900/50 text-white/70 hover:border-cyan-400/50'
                  }`}
                >
                  <span className="text-xs font-medium whitespace-nowrap">
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills list by category */}
        <div className="mt-20 lg:mt-32 pt-12 lg:pt-16 border-t border-cyan-500/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: 'CMS & E-commerce',
                items: ['WordPress', 'Shopify', 'WooCommerce', 'Elementor'],
              },
              {
                category: 'Frontend',
                items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
              },
              {
                category: 'Backend & Languages',
                items: ['PHP', 'HTML', 'CSS', 'Liquid'],
              },
              {
                category: 'Tools & Performance',
                items: ['Git', 'Figma', 'Google Analytics', 'Core Web Vitals', 'SEO'],
              },
            ].map((group) => (
              <div key={group.category} className="space-y-4">
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all"
                    >
                      → {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
