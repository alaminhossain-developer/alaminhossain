'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getTestimonials } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const testimonials = getTestimonials()

  // Duplicate for seamless infinite loop
  const items = [...testimonials, ...testimonials]

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section || testimonials.length === 0) return

    // Calculate how far to translate (half the track since we duplicated)
    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2

      const anim = gsap.to(track, {
        x: -totalWidth,
        duration: testimonials.length * 5,
        ease: 'none',
        repeat: -1,
      })

      // Pause on hover
      track.addEventListener('mouseenter', () => anim.pause())
      track.addEventListener('mouseleave', () => anim.resume())

      // Slow down on scroll trigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const speed = 1 + self.progress * 0.5
          anim.timeScale(speed)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [testimonials.length])

  if (testimonials.length === 0) return null

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Testimonials</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-10 md:mb-14 text-white">
          WHAT THEY SAY
        </h2>
      </div>

      {/* Carousel track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0e27] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0e27] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 px-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {items.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className="group relative bg-white/[0.015] border border-white/[0.04] rounded-xl p-8 hover:border-white/[0.08] transition-all duration-500 shrink-0 w-[380px] md:w-[420px]"
            >
              {/* Quote mark */}
              <div className="text-4xl md:text-5xl font-serif text-cyan-400 opacity-20 leading-none mb-4">
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="text-white/80 text-base md:text-lg leading-relaxed font-medium mb-8 min-h-[80px]">
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
