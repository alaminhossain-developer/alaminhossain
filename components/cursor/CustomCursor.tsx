'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Custom cursor — pure ref-based, zero React re-renders on mousemove.
 * Uses GSAP for smooth tracking and DOM manipulation for state.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const hoverTypeRef = useRef<'default' | 'link' | 'button' | 'interactive'>('default')

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return
    if (navigator.maxTouchPoints > 0 || (window as any).ontouchstart !== undefined) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hide default cursor
    document.body.style.cursor = 'none'
    document.body.style.setProperty('cursor', 'none', 'important')

    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: e.clientX - 4, y: e.clientY - 4 })
      }
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 16,
          y: e.clientY - 16,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      if (textRef.current) {
        textRef.current.style.left = `${e.clientX + 20}px`
        textRef.current.style.top = `${e.clientY + 20}px`
      }
    }

    const updateCursorStyle = (type: string) => {
      hoverTypeRef.current = type as any
      if (!cursorRef.current || !textRef.current) return

      if (type !== 'default') {
        gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3, ease: 'power2.out' })
        cursorRef.current.style.background = 'rgba(0, 217, 255, 0.1)'
        cursorRef.current.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)'
        textRef.current.style.opacity = '1'
        textRef.current.textContent = type === 'link' ? 'OPEN' : type === 'button' ? 'CLICK' : 'INTERACT'
      } else {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
        cursorRef.current.style.background = 'transparent'
        cursorRef.current.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.3)'
        textRef.current.style.opacity = '0'
        textRef.current.textContent = ''
      }
    }

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a') || target.classList.contains('cursor-link')) {
        updateCursorStyle('link')
      } else if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('btn-primary') || target.classList.contains('btn-secondary')) {
        updateCursorStyle('button')
      } else if (target.classList.contains('cursor-interactive')) {
        updateCursorStyle('interactive')
      }
    }

    const handleHoverEnd = () => updateCursorStyle('default')

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleHoverStart, { passive: true })
    document.addEventListener('mouseout', handleHoverEnd, { passive: true })

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full border-2 border-cyan-400 mix-blend-screen"
        style={{ background: 'transparent', boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)' }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-cyan-400 mix-blend-screen"
        style={{ boxShadow: '0 0 8px rgba(0, 217, 255, 0.8)' }}
      />
      <div
        ref={textRef}
        className="fixed pointer-events-none z-50 text-xs font-semibold text-cyan-400 uppercase tracking-widest mix-blend-screen opacity-0"
        style={{ textShadow: '0 0 10px rgba(0, 217, 255, 0.5)' }}
      />
    </>
  )
}
