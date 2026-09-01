'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { createMouseParallax } from '@/lib/animations'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const parallaxElementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero text on load with staggered reveals
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('[data-animate]')
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.25, ease: 'power2.out', delay: 0.2 }
        )
      }

      // Animate visual elements with sophisticated parallax
      if (visualRef.current) {
        const visualElements = visualRef.current.querySelectorAll('[data-float]')
        visualElements.forEach((el, index) => {
          gsap.to(el, {
            y: Math.sin(index) * (15 + index * 3),
            duration: 4 + index * 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }

      // Scroll parallax with opacity and transform fade
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0.4,
          y: -50,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'center top',
            scrub: 1.5,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Mouse parallax effect
    if (containerRef.current && visualRef.current) {
      const cleanup = createMouseParallax(containerRef.current, [
        visualRef.current,
      ])
      return cleanup
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Premium layered background */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/[0.08] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/95 to-dark-950" />

      {/* Subtle animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left Content - Editorial */}
          <div ref={textRef} className="space-y-12 lg:space-y-10">
            <div data-animate className="space-y-3">
              <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] block">Creative Developer</span>
              <p className="text-sm text-white/50 font-light">WordPress • Shopify • Performance</p>
            </div>

            <div data-animate className="space-y-6">
              <h1 className="text-6xl lg:text-7xl leading-[1.05] font-black tracking-[-0.02em]">
                Build for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400">
                  impact.
                </span>
              </h1>
            </div>

            <div data-animate className="space-y-4 pt-4">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">MD. AL AMIN HOSSAIN</h2>
              <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-lg">
                I craft high-performance digital experiences. WordPress specialist. Shopify expert. Performance obsessed.
              </p>
            </div>

            <div data-animate className="flex gap-4 pt-6">
              <a href="#work" className="btn-primary group inline-flex items-center">
                <span>Explore Work</span>
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Visual - Parallax Container with depth layers */}
          <div
            ref={visualRef}
            className="relative h-[500px] lg:h-[600px] hidden lg:flex items-center justify-center"
          >
            {/* Far background layer */}
            <div
              data-float
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-3xl border border-cyan-500/10"
            />

            {/* Mid-distance element: Browser window */}
            <div
              data-float
              className="absolute top-12 right-8 w-80 h-80 glass rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="bg-dark-900 p-4 border-b border-cyan-500/20 flex gap-2 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="p-6 text-xs font-mono text-cyan-400/70 space-y-2">
                <div className="text-emerald-400/80">{'< performance />'}</div>
                <div>→ lighthouse: 95+</div>
                <div>→ core-web-vitals: good</div>
                <div>→ ux-optimized: true</div>
              </div>
            </div>

            {/* Code snippet card - foreground element */}
            <div
              data-float
              className="absolute bottom-16 -left-4 w-80 glass rounded-2xl p-6 border border-cyan-500/30 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="text-xs font-mono space-y-3 text-cyan-400/80">
                <div className="text-emerald-400/80">const website =</div>
                <div className="pl-4 text-white/60 space-y-1">
                  <div>● fast responsive</div>
                  <div>● seo optimized</div>
                  <div>● user focused</div>
                </div>
              </div>
            </div>

            {/* Performance metric badge - floating accent */}
            <div
              data-float
              className="absolute top-1/2 -left-16 w-56 glass rounded-full p-8 border border-cyan-500/30 text-center backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-500"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">95+</div>
              <div className="text-xs text-white/50 mt-3 font-light tracking-wide">Performance Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - refined */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-white/40 uppercase tracking-[0.15em] font-light">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
