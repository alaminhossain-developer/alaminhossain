'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getExperience } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const experience = getExperience()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current) return

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      )

      itemsRef.current.forEach((item) => {
        if (!item) return

        gsap.fromTo(
          item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32" id="experience">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Experience</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-12 md:mb-16 text-white">
          WORK EXPERIENCE
        </h2>

        <div className="relative max-w-[900px]">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-white/[0.06]">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-cyan-400 to-emerald-400"
              style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {experience.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { itemsRef.current[i] = el }}
                className="relative pl-14 md:pl-16"
              >
                <div className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full border-2 border-cyan-400 bg-dark-950 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider">
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 rounded">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {item.role}
                </h3>
                <p className="text-lg text-white/50 mb-4">
                  {item.company}
                </p>

                <p className="text-white/45 text-base leading-relaxed mb-6 max-w-[600px] font-light">
                  {item.description}
                </p>

                <ul className="flex flex-col gap-2 mb-6">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                      <span className="text-sm text-white/40 font-light">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
