'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProfile, getSkills } from '@/lib/store'
import { Share2, Code } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techPills = [
  { name: 'WordPress', icon: '🔧' },
  { name: 'Shopify', icon: '🛒' },
  { name: 'WooCommerce', icon: '🛍️' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'PHP', icon: '🐘' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Elementor', icon: '🧩' },
  { name: 'Liquid', icon: '💧' },
  { name: 'Git', icon: '📦' },
  { name: 'Figma', icon: '🎯' },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const profile = getProfile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('[data-pill]')
        gsap.fromTo(
          pills,
          { opacity: 0, y: 15, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-16 lg:py-24 px-6" id="about">
      <div className="max-w-6xl mx-auto">
        {/* Centered header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] block mb-3">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white">
            What I Do
          </h2>
        </div>

        {/* Tech pills */}
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-2.5 mb-14 lg:mb-18">
          {techPills.map((tech) => (
            <div
              key={tech.name}
              data-pill
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
            >
              <span className="text-sm">{tech.icon}</span>
              <span className="text-xs font-medium text-white/70">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Two-column: Bio + Photo */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left — Bio text (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Role line */}
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
              WordPress Developer · Shopify Developer · Web Performance Specialist
            </h3>

            {/* Bio paragraphs */}
            <div className="space-y-4 text-[0.95rem] text-white/60 leading-relaxed font-light">
              <p>
                I&apos;m <span className="text-white/90 font-medium">{profile.name || 'Md. Al Amin Hossain'}</span>, a WordPress &amp; Shopify developer and web performance specialist from Bangladesh. For the last 5+ years, I&apos;ve been building websites, landing pages, dashboards, eCommerce stores, Shopify custom apps, and full-stack web applications for clients and real business needs.
              </p>
              <p>
                As a developer, I mainly work with WordPress, PHP, Shopify Liquid, WooCommerce, JavaScript, React, Next.js, and modern frontend tools. My focus is always simple: create products that look professional, feel smooth to use, load fast, and are easy to maintain as they grow.
              </p>
              <p>
                I enjoy turning rough ideas into polished, production-ready solutions with clean UI, solid structure, and practical user experience. I care about both design and functionality — because a good product should not only work well, it should also feel right.
              </p>
            </div>

            {/* Key highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-sm text-white/55 font-light leading-relaxed">
                  Currently working as <span className="text-white/80 font-medium">Web Developer Staff at GAOTek Inc.</span> — WordPress &amp; Shopify development, performance optimization, and team management.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <span className="text-sm text-white/55 font-light leading-relaxed">
                  Also working with various clients on WordPress, Shopify, Elementor, and practical JavaScript fixes.
                </span>
              </div>
            </div>
          </div>

          {/* Right — Photo (2 cols) */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            {profile.aboutPhoto ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.aboutPhoto}
                  alt={profile.name}
                  className="w-full max-w-[340px] rounded-2xl object-cover border border-white/[0.06] shadow-2xl"
                />
                {/* Subtle accent line at bottom */}
                <div className="absolute -bottom-3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              </div>
            ) : (
              <div className="w-full max-w-[340px] aspect-[4/5] rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                <span className="text-5xl font-bold text-white/10">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Verified Profiles card */}
        <div className="mt-12 lg:mt-16 p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] max-w-2xl">
          <h4 className="text-[0.6875rem] font-bold text-white/50 uppercase tracking-[0.15em] mb-2">
            Verified Profiles
          </h4>
          <p className="text-xs text-white/35 mb-3 font-light">
            Explore public profiles for credibility and recent updates:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Share2 size={12} />
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Code size={12} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
