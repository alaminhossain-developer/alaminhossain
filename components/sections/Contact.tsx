'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
      className="relative py-16 lg:py-24 px-6 overflow-hidden"
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
        {/* Title */}
        <div ref={titleRef} className="mb-16 lg:mb-24 max-w-4xl">
          <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] block mb-6">Let's Connect</span>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.02em]">
            <div data-line>Have an idea?</div>
            <div data-line className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Let's build it.
            </div>
          </h2>
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

              {/* Public Profiles */}
              <div className="pt-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
                  Public Profiles
                </h3>
                <div className="flex gap-4 mb-4">
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* GitHub */}
                  <a href="https://github.com/alaminhossain-developer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" aria-label="GitHub">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  {/* X / Twitter */}
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" aria-label="X (Twitter)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
                <p className="text-xs text-white/40">
                  LinkedIn, GitHub, X (Twitter), Instagram, Facebook
                </p>
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
