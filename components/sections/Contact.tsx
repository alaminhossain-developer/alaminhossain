'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Share2, Code } from 'lucide-react'
import { getProfile } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const profile = getProfile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('[data-line]')
        gsap.fromTo(
          lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
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
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
            },
          }
        )
      }

      // Background animation
      const bg = containerRef.current?.querySelector('[data-bg]')
      if (bg) {
        gsap.to(bg, {
          backgroundPosition: '200% center',
          duration: 20,
          repeat: -1,
          ease: 'none',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 px-6 overflow-hidden"
      id="contact"
    >
      {/* Animated background */}
      <div
        data-bg
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title - Editorial with secondary photo */}
        <div ref={titleRef} className="mb-20 lg:mb-28 max-w-4xl">
          <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] block mb-6">Let's Connect</span>
          <div className="flex items-end gap-6">
            {profile.photo ? (
              <div className="hidden sm:block flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover border border-white/[0.06] shadow-lg"
                />
              </div>
            ) : null}
            <div>
              <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.02em]">
                <div data-line>Have an idea?</div>
                <div data-line className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Let's build it.
                </div>
              </h2>
            </div>
          </div>
          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mt-6">
            Whether it's a website, Shopify store, WordPress project, or performance optimization—I'm ready to help bring your vision to life.
          </p>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left - Description and CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-white/70 leading-relaxed">
                Have a website, Shopify store, WordPress project, or web
                experience that needs to be built or improved?
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                I'm available for freelance projects, custom development work, and
                performance optimization engagements.
              </p>
            </div>

            {/* Direct contact info */}
            <div className="space-y-4 pt-8">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                Get in Touch
              </h3>

              <a
                href="mailto:contact@alaminhossain.me"
                className="flex items-center gap-3 group"
              >
                <Mail className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  contact@alaminhossain.me
                </span>
              </a>

              {/* Social links */}
              <div className="flex gap-6 pt-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm group-hover:underline">LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <Code className="w-5 h-5" />
                  <span className="text-sm group-hover:underline">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact form */}
          <div className="glass rounded-2xl p-8 lg:p-12 border border-cyan-500/20 h-fit">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="name" className="text-sm font-semibold text-white/80">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-cyan-500/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-semibold text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-cyan-500/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="text-sm font-semibold text-white/80">
                  Tell Me About Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-cyan-500/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                  placeholder="Describe your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full px-6 py-3 bg-cyan-500 text-dark-950 font-semibold rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {formStatus === 'loading' && (
                  <span className="w-4 h-4 rounded-full border-2 border-transparent border-t-dark-950 animate-spin" />
                )}
                {formStatus === 'success'
                  ? 'Message Sent!'
                  : formStatus === 'loading'
                    ? 'Sending...'
                    : 'Send Message'}
              </button>

              {formStatus === 'success' && (
                <p className="text-sm text-emerald-400 text-center">
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Additional options */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t border-cyan-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Available For',
                items: ['Freelance Projects', 'Full-time Roles', 'Consulting'],
              },
              {
                title: 'Response Time',
                items: ['Usually within 24 hours', 'Email or LinkedIn', 'Timezone: EST'],
              },
              {
                title: 'Services',
                items: [
                  'WordPress Development',
                  'Shopify Customization',
                  'Performance Optimization',
                ],
              },
            ].map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-white/70 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
