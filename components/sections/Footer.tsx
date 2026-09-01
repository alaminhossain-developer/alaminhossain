'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Mail, Share2, Code, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer content on scroll into view
      const items = containerRef.current?.querySelectorAll('[data-footer-item]')
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 90%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={containerRef}
      className="relative bg-dark-900 border-t border-cyan-500/10 py-12 lg:py-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-cyan-500/10">
          {/* Brand section */}
          <div data-footer-item className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              AL AMIN
            </Link>
            <p className="text-sm text-white/60">
              WordPress & Shopify Developer
              <br />
              Web Performance Specialist
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-white/60">Currently available for selected projects</span>
            </div>
          </div>

          {/* Quick links */}
          <div data-footer-item className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Work', href: '#work' },
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social and contact */}
          <div data-footer-item className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="mailto:contact@alaminhossain.me"
                className="text-white/60 hover:text-cyan-400 transition-colors group flex items-center gap-2"
                title="Email"
              >
                <Mail className="w-5 h-5" />
                <span className="text-xs group-hover:underline">Email</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-cyan-400 transition-colors group flex items-center gap-2"
                title="LinkedIn"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-xs group-hover:underline">LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-cyan-400 transition-colors group flex items-center gap-2"
                title="GitHub"
              >
                <Code className="w-5 h-5" />
                <span className="text-xs group-hover:underline">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div
          data-footer-item
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50"
        >
          <p>© 2026 Md. Al Amin Hossain. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>by Al Amin</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/40 transition-all flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <span className="text-lg">↑</span>
      </button>
    </footer>
  )
}
