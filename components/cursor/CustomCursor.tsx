'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface CursorState {
  x: number
  y: number
  isHover: boolean
  hoverType: 'default' | 'link' | 'button' | 'interactive'
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHover: false,
    hoverType: 'default',
  })

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Disable custom cursor on reduced motion preference
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none'
      }
      return
    }

    // Check if device is touch
    const isTouchDevice = () => {
      return (
        navigator.maxTouchPoints > 0 ||
        (window as any).ontouchstart !== undefined
      )
    }

    if (isTouchDevice()) {
      // Hide custom cursor on touch devices
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none'
      }
      return
    }

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }))

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.1,
          ease: 'power2.out',
        })
      }

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 16,
          y: e.clientY - 16,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    // Handle hover effects
    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement
      let hoverType: CursorState['hoverType'] = 'default'

      if (
        target.tagName === 'A' ||
        target.closest('a') ||
        target.classList.contains('cursor-link')
      ) {
        hoverType = 'link'
      } else if (
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-button') ||
        target.classList.contains('btn-primary') ||
        target.classList.contains('btn-secondary')
      ) {
        hoverType = 'button'
      } else if (target.classList.contains('cursor-interactive')) {
        hoverType = 'interactive'
      }

      setState((prev) => ({
        ...prev,
        isHover: true,
        hoverType,
      }))

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleHoverEnd = () => {
      setState((prev) => ({
        ...prev,
        isHover: false,
        hoverType: 'default',
      }))

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    // Attach listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleHoverStart, true)
    document.addEventListener('mouseleave', handleHoverEnd, true)

    // Hover on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleHoverStart, true)
      document.removeEventListener('mouseleave', handleHoverEnd, true)

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full border-2 border-cyan-400 mix-blend-screen"
        style={{
          background: state.isHover ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
          boxShadow: state.isHover
            ? '0 0 20px rgba(0, 217, 255, 0.5)'
            : '0 0 10px rgba(0, 217, 255, 0.3)',
          transition: state.isHover
            ? 'all 0.3s ease-out'
            : 'all 0.2s ease-out',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-cyan-400 mix-blend-screen"
        style={{
          boxShadow: '0 0 8px rgba(0, 217, 255, 0.8)',
        }}
      />

      {/* Hover text indicator */}
      {state.isHover && (
        <div
          className="fixed pointer-events-none z-50 text-xs font-semibold text-cyan-400 uppercase tracking-widest mix-blend-screen"
          style={{
            left: `${state.x + 20}px`,
            top: `${state.y + 20}px`,
            opacity: state.hoverType !== 'default' ? 1 : 0,
            transition: 'opacity 0.2s ease-out',
            textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
          }}
        >
          {state.hoverType === 'link' && 'OPEN'}
          {state.hoverType === 'button' && 'CLICK'}
          {state.hoverType === 'interactive' && 'INTERACT'}
        </div>
      )}
    </>
  )
}
