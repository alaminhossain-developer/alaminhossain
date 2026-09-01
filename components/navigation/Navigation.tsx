'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          isScrolled
            ? 'bg-dark-950/75 backdrop-blur-xl border-b border-cyan-500/10 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-base font-black tracking-[-0.02em] text-white hover:text-cyan-400 transition-colors duration-300"
          >
            AM
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/60 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Availability Status */}
          <div className="hidden md:flex items-center gap-2 text-xs font-light">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-white/50 tracking-wide">Available</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-cyan-400 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-dark-950/95 backdrop-blur-sm pt-24 md:hidden">
          <div className="flex flex-col items-center gap-10 p-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-white/80 hover:text-cyan-400 transition-colors duration-300 tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-12 flex items-center gap-2 text-sm font-light">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-white/50">Available for work</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
