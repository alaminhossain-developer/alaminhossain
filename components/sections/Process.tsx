'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector('[data-title]')
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        )
      }

      const processContainer = containerRef.current?.querySelector('[data-process]')
      if (processContainer) {
        const totalWidth = (processContainer as HTMLElement).scrollWidth
        const containerWidth = (containerRef.current as HTMLElement).offsetWidth
        const scrollDistance = totalWidth - containerWidth

        gsap.to(processContainer, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: () => `+=${scrollDistance * 2}`,
            scrub: 1.2,
            pin: true,
          },
        })
      }

      stepsRef.current.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div data-title className="mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em]">
            HOW I WORK
          </h2>
          <p className="text-lg text-white/60 mt-4 max-w-2xl">
            A systematic approach to delivering exceptional digital experiences
          </p>
        </div>

        {/* Horizontal scrolling process */}
        <div className="relative">
          <div
            data-process
            className="flex gap-8 lg:gap-12 pb-12 overflow-x-hidden"
          >
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el
                }}
                className="flex-shrink-0 w-80 space-y-4 group"
              >
                <div className="glass rounded-2xl p-8 h-full border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-dark-800/50 transition-all">
                  {/* Number */}
                  <div className="text-5xl font-bold text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors mb-4">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
