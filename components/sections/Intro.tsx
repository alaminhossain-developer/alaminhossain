'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  { text: 'WEBSITES SHOULD', delay: 0 },
  { text: 'DO MORE THAN', delay: 0.1 },
  { text: 'LOOK GOOD.', delay: 0.2, accent: true },
]

const reveals = [
  'They should be fast.',
  'They should convert.',
  'They should be easy to manage.',
  'They should scale.',
]

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement[]>([])
  const revealsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      linesRef.current.forEach((line, i) => {
        if (!line) return
        tl.fromTo(
          line,
          { y: 80, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.8, ease: 'power3.out' },
          i * 0.15
        )
      })

      revealsRef.current.forEach((line, i) => {
        if (!line) return
        tl.fromTo(
          line,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          0.8 + i * 0.15
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main statement */}
        <div className="flex flex-col gap-3 md:gap-5 mb-12 md:mb-16">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <div
                ref={(el) => { if (el) linesRef.current[i] = el }}
                className={`text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] ${
                  line.accent ? 'text-cyan-400' : 'text-white'
                }`}
              >
                {line.text}
              </div>
            </div>
          ))}
        </div>

        {/* Reveal lines */}
        <div className="flex flex-col gap-5 md:gap-7 max-w-[600px]">
          {reveals.map((text, i) => (
            <div
              key={i}
              ref={(el) => { if (el) revealsRef.current[i] = el }}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 opacity-60" />
              <span className="text-xl md:text-2xl text-white/60 font-medium">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
    </section>
  )
}
