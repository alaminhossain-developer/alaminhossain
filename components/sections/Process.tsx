'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line width on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        )
      }

      // Stagger each step in
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.3 + i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 px-6" id="process">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">
              Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] text-white">
            HOW I WORK
          </h2>
          <p className="text-base lg:text-lg text-white/40 mt-4 max-w-2xl font-light">
            A systematic approach to delivering exceptional digital experiences
          </p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line behind the dots */}
          <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-px">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/15 to-cyan-400/30 origin-left"
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative group"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Dot on the line */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-cyan-400/40 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,212,232,0.4)] transition-all duration-500" />
                  </div>
                  {/* Large number */}
                  <span className="text-5xl lg:text-6xl font-black text-white/[0.04] group-hover:text-cyan-400/10 transition-colors duration-500 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-0 lg:pl-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm lg:text-base text-white/40 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Subtle bottom accent on hover */}
                <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-400/30 to-transparent transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
