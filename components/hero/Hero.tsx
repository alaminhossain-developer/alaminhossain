'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { createMouseParallax } from '@/lib/animations'
import { usePortfolio } from '@/lib/usePortfolio'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const annotationsRef = useRef<HTMLDivElement[]>([])
  const { profile } = usePortfolio()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero text on load with staggered reveals
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('[data-animate]')
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.3, ease: 'power3.out', delay: 0.3 }
        )
      }

      // Animate terminal frame entrance
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out', delay: 0.6 }
        )
      }

      // Glow trace animation — rotating scan
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none',
        })
      }

      // Terminal annotations stagger
      annotationsRef.current.forEach((ann, i) => {
        if (!ann) return
        gsap.fromTo(
          ann,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 + i * 0.2 }
        )
      })

      // Scroll parallax
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0.3,
          y: -60,
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
    if (containerRef.current && frameRef.current) {
      const cleanup = createMouseParallax(containerRef.current, [frameRef.current])
      return cleanup
    }
  }, [])

  const annotations = [
    { label: 'STATUS', value: 'available for hire', color: '#4ade80' },
    { label: 'STACK', value: 'WP · Shopify · Perf', color: '#00d4e8' },
    { label: 'BUILD', value: 'next build ✓ 1.2s', color: '#f59e0b' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(0, 212, 232, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 232, 0.08) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Text */}
          <div ref={textRef} className="space-y-10">
            <div data-animate className="space-y-3">
              <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] block">
                Creative Developer
              </span>
              <p className="text-sm text-white/50 font-light">
                WordPress · Shopify · Performance
              </p>
            </div>

            <div data-animate className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-black tracking-[-0.03em]">
                Build for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400">
                  impact.
                </span>
              </h1>
            </div>

            <div data-animate className="space-y-4 pt-2">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                {profile.name || 'MD. AL AMIN HOSSAIN'}
              </h2>
              <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-lg">
                {profile.bio || 'WordPress specialist. Shopify expert. Performance obsessed.'}
              </p>
            </div>

            <div data-animate className="flex gap-4 pt-4">
              <a href="#work" className="btn-primary group inline-flex items-center">
                <span>Explore Work</span>
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right — Terminal Frame Photo */}
          <div className="relative flex items-center justify-center">
            {/* Terminal frame container */}
            <div ref={frameRef} className="relative">
              {/* Glow trace ring — rotates behind frame */}
              <div
                ref={glowRef}
                className="absolute -inset-4 rounded-2xl opacity-40 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, #00d4e8 15%, transparent 30%, transparent 70%, #00d4e8 85%, transparent 100%)',
                  filter: 'blur(20px)',
                }}
              />

              {/* Terminal window frame */}
              <div className="relative rounded-2xl border border-cyan-500/20 bg-[#0d1117] shadow-2xl shadow-cyan-500/5 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] bg-[#161b22]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] font-mono text-white/25">
                      alaminhossain — portfolio — zsh
                    </span>
                  </div>
                </div>

                {/* Photo area — contained inside frame with padding */}
                <div className="relative aspect-[4/5] w-[320px] sm:w-[360px] lg:w-[400px] p-3 overflow-hidden">
                {profile.heroPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.heroPhoto}
                    alt={profile.name}
                      className="w-full h-full object-cover rounded-xl object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 via-dark-950 to-dark-900 rounded-xl">
                      <span className="text-6xl font-bold text-white/10">
                        {profile.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                    </div>
                  )}

                  {/* Subtle scan-line overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,232,0.5) 2px, rgba(0,212,232,0.5) 4px)',
                    }}
                  />
                </div>

                {/* Terminal-style bottom bar — new info, not redundant */}
                <div className="px-5 py-3 border-t border-white/[0.06] bg-[#161b22]">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">❯</span>
                      <span className="text-white/40">deploy --status</span>
                    </div>
                    <span className="text-emerald-400">● live</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] mt-1">
                    <span className="text-white/25">$</span>
                    <span className="text-white/40">next build</span>
                    <span className="text-emerald-400">✓</span>
                    <span className="text-cyan-400/60">1.2s</span>
                  </div>
                </div>
              </div>

              {/* Terminal annotations floating far left of frame */}
              <div className="absolute -left-20 sm:-left-28 lg:-left-36 top-[15%] space-y-3">
                {annotations.map((ann, i) => (
                  <div
                    key={ann.label}
                    ref={(el) => {
                      if (el) annotationsRef.current[i] = el
                    }}
                    className="hidden sm:block"
                  >
                    <div className="bg-[#0d1117]/80 backdrop-blur-sm border border-white/[0.06] rounded-lg px-3 py-2 w-[160px]">
                      <div className="text-[9px] font-mono text-white/25 uppercase tracking-wider">
                        {ann.label}
                      </div>
                      <div
                        className="text-[10px] font-mono mt-0.5 truncate"
                        style={{ color: ann.color }}
                      >
                        {ann.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance score badge — bottom right */}
              <div className="absolute -bottom-4 -right-4 sm:-right-8">
                <div className="bg-[#0d1117]/90 backdrop-blur-sm border border-cyan-500/20 rounded-xl px-4 py-3 text-center shadow-lg shadow-cyan-500/5">
                  <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    96
                  </div>
                  <div className="text-[8px] font-mono text-white/30 uppercase tracking-wider mt-1">
                    Lighthouse
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-light">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
