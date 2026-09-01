'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!barRef.current) return

      gsap.to(barRef.current, {
        width: '100%',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          markers: false,
        },
      })
    }, barRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 z-40 origin-left"
      style={{ width: '0%' }}
    />
  )
}
