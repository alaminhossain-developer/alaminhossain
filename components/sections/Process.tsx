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
      // Animate title
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

      // Horizontal scroll for steps
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
            markers: false,
          },
        })
      }

      // Animate each step
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
        <div data-title className="mb-20 lg:mb-24">
          <h2 className="text-display-lg lg:text-display-xl font-bold tracking-tight">
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

                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance section */}
        <div className="mt-24 lg:mt-32 pt-12 lg:pt-16 border-t border-cyan-500/10">
          <h2 className="text-display-md lg:text-display-lg font-bold tracking-tight mb-12">
            FAST IS A
            <br />
            FEATURE.
          </h2>

          {/* Performance metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: 'Performance', score: 95, color: 'cyan' },
              { label: 'Accessibility', score: 95, color: 'emerald' },
              { label: 'Best Practices', score: 95, color: 'cyan' },
              { label: 'SEO', score: 95, color: 'emerald' },
              { label: 'Core Web Vitals', score: 'Good', color: 'cyan' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="glass rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-center"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {metric.score}
                </div>
                <p className="text-sm text-white/70">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Performance description */}
          <div className="mt-12 space-y-4 max-w-3xl">
            <p className="text-lg text-white/70">
              Website speed directly impacts user experience, conversion rates, and
              search rankings. I prioritize performance optimization across every
              project:
            </p>
            <ul className="space-y-2 text-white/70">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span>Core Web Vitals optimization for search ranking improvements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span>Image optimization and lazy loading strategies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span>Caching, CDN integration, and database optimization</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span>Comprehensive auditing and continuous monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
