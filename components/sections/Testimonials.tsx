'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getTestimonials } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const testimonials = getTestimonials()

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return

        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Testimonials</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-10 md:mb-14 text-white">
          WHAT THEY SAY
        </h2>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              ref={(el) => { itemsRef.current[i] = el }}
              className="group relative bg-white/[0.015] border border-white/[0.04] rounded-xl p-8 md:p-10 hover:border-white/[0.08] transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="text-4xl md:text-5xl font-serif text-cyan-400 opacity-20 leading-none mb-4">
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed font-medium mb-8">
                {testimonial.quote}
              </blockquote>

              {/* Divider */}
              <div className="w-8 h-px bg-white/[0.1] mb-6" />

              {/* Author */}
              <div>
                <div className="text-sm font-semibold text-white/70">
                  {testimonial.author}
                </div>
                <div className="text-xs text-white/30 mt-1">
                  {testimonial.role} · {testimonial.company}
                </div>
                {testimonial.projectType && (
                  <div className="mt-2">
                    <span className="text-[0.625rem] text-cyan-400/70 uppercase tracking-[0.15em] font-medium">
                      {testimonial.projectType}
                    </span>
                  </div>
                )}
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
