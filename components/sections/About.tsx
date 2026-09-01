'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getExperience } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const experience = getExperience()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate about title
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

      // Animate content
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

      // Animate timeline
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('[data-timeline-item]')
        gsap.fromTo(
          items,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
            },
          }
        )

        // Animate timeline line
        const line = timelineRef.current.querySelector('[data-timeline-line]')
        if (line) {
          gsap.fromTo(
            line,
            { height: '0%' },
            {
              height: '100%',
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 70%',
              },
            }
          )
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 px-6" id="about">
      <div className="max-w-7xl mx-auto">
        {/* About title section */}
        <div
          ref={titleRef}
          className="mb-20 lg:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          <div className="space-y-4">
            <h2 className="text-display-lg lg:text-[4rem] font-bold leading-[1.2] tracking-tight">
              <div data-line>I BUILD FOR</div>
              <div data-line>THE WEB,</div>
              <div data-line>NOT JUST FOR</div>
              <div data-line>THE SCREEN.</div>
            </h2>
          </div>

          <div ref={contentRef} className="space-y-6 text-lg text-white/70">
            <p className="leading-relaxed">
              I'm a WordPress & Shopify developer and web performance specialist
              focused on building practical, scalable, and high-quality websites
              that drive real business results.
            </p>
            <p className="leading-relaxed">
              With expertise in WordPress, Shopify, WooCommerce, and custom web
              development, I help businesses create digital experiences that not
              only look great but perform exceptionally well.
            </p>
            <p className="leading-relaxed">
              I specialize in performance optimization, technical SEO, e-commerce
              solutions, and custom JavaScript interactions that make websites
              feel responsive and delightful.
            </p>
          </div>
        </div>

        {/* Experience section */}
        <div
          ref={timelineRef}
          className="mt-20 lg:mt-32 pt-12 lg:pt-16 border-t border-cyan-500/10"
          id="experience"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-12 text-white">
            Work Experience
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div
              data-timeline-line
              className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-transparent"
            />

            {/* Timeline items */}
            <div className="space-y-8 lg:space-y-12 pl-8 lg:pl-12">
              {experience.map((job) => (
                <div key={job.id} data-timeline-item className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-9 lg:-left-14 top-0 w-4 h-4 rounded-full bg-cyan-400 border-2 border-dark-950" />

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h4 className="text-xl lg:text-2xl font-bold text-white">
                        {job.role}
                      </h4>
                      <span className="text-cyan-400 font-semibold">
                        @ {job.company}
                      </span>
                    </div>
                    <p className="text-sm text-white/50 font-medium">
                      {job.period}
                    </p>
                    <p className="text-white/70 leading-relaxed max-w-2xl">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-cyan-400/10 text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core competencies */}
        <div className="mt-20 lg:mt-32 pt-12 lg:pt-16 border-t border-cyan-500/10">
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
