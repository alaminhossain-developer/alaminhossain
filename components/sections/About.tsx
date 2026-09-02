'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProfile } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const profile = getProfile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('[data-line]')
        gsap.fromTo(
          lines,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 70%',
            },
          }
        )
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 px-6" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Title */}
          <div ref={titleRef} className="space-y-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em]">
              <div data-line>I BUILD FOR</div>
              <div data-line>THE WEB,</div>
              <div data-line>NOT JUST FOR</div>
              <div data-line className="text-cyan-400">THE SCREEN.</div>
            </h2>
          </div>

          {/* Right — Bio + Photo */}
          <div ref={contentRef} className="space-y-6">
            {/* Profile photo */}
            {profile.photo ? (
              <div className="mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover border border-white/[0.06] shadow-2xl"
                />
              </div>
            ) : (
              <div className="mb-6 w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <span className="text-4xl font-bold text-white/10">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
            )}

            <p className="text-lg text-white/70 leading-relaxed">
              I&apos;m a WordPress &amp; Shopify developer and web performance specialist
              focused on building practical, scalable, and high-quality websites
              that drive real business results.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              With expertise in WordPress, Shopify, WooCommerce, and custom web
              development, I help businesses create digital experiences that not
              only look great but perform exceptionally well.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              I specialize in performance optimization, technical SEO, e-commerce
              solutions, and custom JavaScript interactions that make websites
              feel responsive and delightful.
            </p>
          </div>
        </div>

        {/* Core competencies */}
        <div className="mt-20 lg:mt-28 pt-12 lg:pt-16 border-t border-cyan-500/10">
          <h3 className="text-xl font-semibold mb-8 text-white uppercase tracking-widest">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'WordPress Theme & Plugin Development',
              'Shopify Liquid Customization',
              'WooCommerce Setup & Optimization',
              'Core Web Vitals Optimization',
              'Technical SEO Implementation',
              'E-commerce UX Design',
              'JavaScript & Interactive Development',
              'Performance Analysis & Optimization',
              'API Integration & Custom Solutions',
            ].map((competency) => (
              <div
                key={competency}
                className="flex items-start gap-3 p-4 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
              >
                <span className="text-cyan-400 font-bold mt-0.5">→</span>
                <span className="text-white/80">{competency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
