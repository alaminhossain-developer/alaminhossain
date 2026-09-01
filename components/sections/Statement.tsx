'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { metrics } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline lines
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('[data-line]')
        gsap.fromTo(
          lines,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: false,
            },
          }
        )
      }

      // Animate metrics
      if (metricsRef.current) {
        const metricItems = metricsRef.current.querySelectorAll('[data-metric]')
        gsap.fromTo(
          metricItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: false,
            },
          }
        )
      }

      // Animate connecting lines
      const lines = containerRef.current?.querySelectorAll('[data-line-visual]')
      if (lines) {
        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            { width: '0%' },
            {
              width: '100%',
              duration: 1,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
              },
            }
          )
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-dark-950 via-dark-950 to-dark-900">
      {/* Subtle accent background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, cyan, transparent 50%), radial-gradient(circle at 80% 80%, emerald, transparent 50%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Statement Section - Editorial */}
        <div
          ref={headlineRef}
          className="mb-32 lg:mb-40 space-y-12 max-w-5xl"
        >
          <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-[-0.02em]">
            <div data-line className="inline-block">
              Code
            </div>
            <br />
            <div data-line className="inline-block">
              should be
            </div>
            <br />
            <div data-line className="inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                beautiful.
              </span>
            </div>
          </h2>

          <div className="space-y-6 text-lg text-white/60 mt-12 font-light leading-relaxed max-w-2xl">
            <div data-line className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">•</span>
              <span>Fast by default, not by accident.</span>
            </div>
            <div data-line className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">•</span>
              <span>User experience is non-negotiable.</span>
            </div>
            <div data-line className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">•</span>
              <span>Performance compounds over time.</span>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div ref={metricsRef} className="relative">
          {/* Subtle separator */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 py-16 lg:py-20">
            {metrics.map((metric, index) => (
              <div
                key={index}
                data-metric
                className="space-y-4"
              >
                <div className="flex items-baseline gap-4">
                  <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                    {metric.label}
                  </div>
                </div>
                <p className="text-base text-white/60 font-light leading-relaxed">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Subtle separator */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Tech stack row */}
        <div className="mt-24 lg:mt-32 pt-12 lg:pt-16 border-t border-cyan-500/10">
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-center md:justify-start">
            <span className="text-sm text-white/60 font-medium">Expert In:</span>
            {[
              'WordPress',
              'Shopify',
              'WooCommerce',
              'PHP',
              'JavaScript',
              'Performance',
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-full border border-cyan-500/20 bg-dark-900/50 text-sm text-white/80 hover:border-cyan-400/50 hover:bg-dark-800 transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
