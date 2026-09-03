'use client'

import { useEffect, useRef, useCallback } from 'react'
import { getServices } from '@/lib/store'

const accentColors = [
  '#00d4e8',
  '#22c55e',
  '#a855f7',
  '#f59e0b',
  '#0ea5e9',
  '#ec4899',
]

const cardGradients = [
  'linear-gradient(135deg, #0a1628, #0d1f3c)',
  'linear-gradient(135deg, #0a1a14, #0d2818)',
  'linear-gradient(135deg, #140a28, #1a0d3c)',
  'linear-gradient(135deg, #1a140a, #281c0d)',
  'linear-gradient(135deg, #0a1420, #0d1f30)',
  'linear-gradient(135deg, #1a0a18, #280d20)',
]

const visualGradients = [
  'linear-gradient(135deg, #00d4e820, #00d4e808)',
  'linear-gradient(135deg, #22c55e20, #22c55e08)',
  'linear-gradient(135deg, #a855f720, #a855f708)',
  'linear-gradient(135deg, #f59e0b20, #f59e0b08)',
  'linear-gradient(135deg, #0ea5e920, #0ea5e908)',
  'linear-gradient(135deg, #ec489920, #ec489908)',
]

const serviceStats: Record<string, { label: string; value: string }[]> = {
  'service-1': [
    { label: 'Projects Delivered', value: '200+' },
    { label: 'Client Satisfaction', value: '98%' },
  ],
  'service-2': [
    { label: 'Stores Built', value: '150+' },
    { label: 'Conversion Growth', value: '+75%' },
  ],
  'service-3': [
    { label: 'Avg Score Improvement', value: '+45%' },
    { label: 'Lighthouse Score', value: '96/100' },
  ],
  'service-4': [
    { label: 'Custom Solutions', value: '80+' },
    { label: 'Tech Stack', value: 'Modern' },
  ],
  'service-5': [
    { label: 'Traffic Growth', value: '+60%' },
    { label: 'Ranking Improvement', value: '+40%' },
  ],
  'service-6': [
    { label: 'Sites Managed', value: '130+' },
    { label: 'Uptime', value: '99.9%' },
  ],
}

const serviceIcons: Record<string, string> = {
  'service-1': 'WP',
  'service-2': 'SH',
  'service-3': '⚡',
  'service-4': '⟨/⟩',
  'service-5': '🔍',
  'service-6': '⚙',
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number | null>(null)
  const currentRef = useRef<number[]>([])
  const targetRef = useRef<number[]>([])

  const animate = useCallback(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const total = cards.length
    if (total === 0 || currentRef.current.length !== total) return

    let stillAnimating = false

    for (let i = 0; i < total; i++) {
      const diff = targetRef.current[i] - currentRef.current[i]
      if (Math.abs(diff) > 0.001) {
        currentRef.current[i] += diff * 0.14
        stillAnimating = true
      } else {
        currentRef.current[i] = targetRef.current[i]
      }

      const p = currentRef.current[i]
      const card = cards[i]
      const inner = card.querySelector('.sc-card-inner') as HTMLElement
      const strip = card.querySelector('.sc-card-strip') as HTMLElement
      if (!inner || !strip) continue

      // Eased progress
      const t = p
      const eased = t * t * t * (t * (t * 6 - 15) + 10)

      // Inner fade
      const fadeT = Math.min(p / 0.58, 1)
      const fadeEased = fadeT * fadeT * fadeT * (fadeT * (fadeT * 6 - 15) + 10)
      inner.style.opacity = String(1 - fadeEased)
      inner.style.transform = `translateY(${-16 * fadeEased}px) scale(${1 - eased * 0.014})`

      // Strip reveal
      const stripT = Math.min(Math.max((p - 0.18) / 0.82, 0), 1)
      const stripEased = stripT * stripT * stripT * (stripT * (stripT * 6 - 15) + 10)
      strip.style.opacity = String(stripEased)
      strip.style.transform = `translateY(${(1 - stripEased) * -110}%)`

      // Card scale
      card.style.transform = `scale(${1 - eased * 0.008})`
    }

    if (stillAnimating) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      rafRef.current = null
    }
  }, [])

  const calculateTargets = useCallback(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const total = cards.length
    const vw = window.innerWidth

    const stripH = vw <= 540 ? 46 : 50
    const stripGap = 4
    const baseTop = vw <= 540 ? 10 : vw <= 900 ? 14 : 18

    // Set sticky tops
    cards.forEach((card, i) => {
      card.style.top = `${baseTop + i * (stripH + stripGap)}px`
    })

    for (let i = 0; i < total; i++) {
      if (i >= total - 1) {
        targetRef.current[i] = 0
        continue
      }

      const nextCard = cards[i + 1]
      const nextRect = nextCard.getBoundingClientRect()

      const stickyTop = baseTop + i * (stripH + stripGap)
      const collapsedLine = stickyTop + stripH
      const cardH = cards[i].offsetHeight || 520
      const vh = window.innerHeight || 700
      const range = Math.min(cardH * 0.46, vh * 0.48)

      const start = collapsedLine + range
      const end = collapsedLine

      let raw = (start - nextRect.top) / (start - end)
      raw = Math.max(0, Math.min(1, raw))

      // Smootherstep
      const t = raw
      raw = t * t * t * (t * (t * 6 - 15) + 10)

      // Cascade: wait for previous card
      if (i > 0) {
        const prevReady = targetRef.current[i - 1] > 0.84 ? 1 : targetRef.current[i - 1] / 0.84
        const prevEased = prevReady * prevReady * prevReady * (prevReady * (prevReady * 6 - 15) + 10)
        raw = raw * prevEased
      }

      targetRef.current[i] = raw
    }

    // Start render loop
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [animate])

  useEffect(() => {
    // Small delay to ensure refs are populated after render
    const timer = setTimeout(() => {
      const services = getServices()
      currentRef.current = new Array(services.length).fill(0)
      targetRef.current = new Array(services.length).fill(0)
      calculateTargets()
    }, 100)

    let scrollTick = false
    const onScroll = () => {
      if (scrollTick) return
      scrollTick = true
      requestAnimationFrame(() => {
        calculateTargets()
        scrollTick = false
      })
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        calculateTargets()
      }, 140)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [calculateTargets])

  const services = getServices()

  return (
    <section ref={sectionRef} className="relative px-6" id="services">
      {/* Header — centered */}
      <div className="max-w-7xl mx-auto text-center pt-16 lg:pt-24 pb-14 lg:pb-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">Services</span>
          <div className="w-8 h-px bg-cyan-400" />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] text-white">
          WHAT I DO
        </h2>
        <p className="text-base lg:text-lg text-white/40 mt-4 max-w-2xl mx-auto font-light">
          End-to-end digital solutions for WordPress, Shopify, and custom web projects
        </p>
      </div>

      {/* Stacked cards wrapper */}
      <div ref={wrapperRef} className="max-w-6xl mx-auto relative overflow-visible" style={{ paddingBottom: '20vh' }}>
        {services.map((service, i) => {
          const color = accentColors[i % accentColors.length]
          const bg = cardGradients[i % cardGradients.length]
          const visGrad = visualGradients[i % visualGradients.length]
          const stats = serviceStats[service.id] || [
            { label: 'Projects', value: '100+' },
            { label: 'Satisfaction', value: '98%' },
          ]
          const icon = serviceIcons[service.id] || '✦'

          return (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="sc-stack-card rounded-3xl overflow-hidden mb-[4px] will-change-transform"
              style={{
                background: bg,
                border: '1px solid rgba(255,255,255,0.04)',
                zIndex: 10 + i,
                position: 'sticky',
              }}
            >
              <div className="sc-card-inner grid grid-cols-1 md:grid-cols-2 min-h-[420px] md:min-h-[460px]">
                {/* Content side */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                  {/* Tag */}
                  <span
                    className="text-sm font-semibold uppercase tracking-wider mb-4 inline-block"
                    style={{ color }}
                  >
                    Service
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/40 leading-relaxed mb-8 max-w-md font-light">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-4 rounded-2xl border border-white/[0.04] bg-white/[0.02]"
                      >
                        <div className="text-[10px] uppercase tracking-wider text-white/30 mb-2 font-medium">
                          {stat.label}
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Person pill */}
                  <div className="inline-flex items-center gap-3 bg-white/[0.04] rounded-full pr-6 pl-1.5 py-1.5 self-start hover:bg-white/[0.07] transition-colors cursor-pointer group">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: color }}
                    >
                      {icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white/80">{service.title}</span>
                      <span className="text-xs text-white/30">{service.features.slice(0, 2).join(' · ')}</span>
                    </div>
                    <svg
                      className="w-4 h-4 text-white/30 group-hover:text-white/60 ml-2 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                {/* Visual side — browser + phone mockup */}
                <div
                  className="relative flex items-center justify-center p-8 md:p-12 overflow-hidden"
                  style={{ background: visGrad }}
                >
                  {/* Radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 75% 20%, ${color}15, transparent 50%), radial-gradient(circle at 25% 85%, rgba(0,0,0,0.1), transparent 40%)`,
                    }}
                  />

                  <div className="flex gap-4 items-end relative z-10" style={{ perspective: '900px', transform: 'rotateY(-3deg) rotateX(1deg)' }}>
                    {/* Browser mockup */}
                    <div className="w-[240px] lg:w-[280px] bg-white rounded-xl overflow-hidden shadow-2xl shrink-0">
                      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                        <div className="flex-1 h-4 bg-gray-100 rounded-md ml-2" />
                      </div>
                      <div className="p-2">
                        <div
                          className="w-full h-16 rounded-lg mb-2"
                          style={{ background: `linear-gradient(135deg, ${color}40, ${color}15)` }}
                        />
                        <div className="grid grid-cols-3 gap-1.5">
                          {[...Array(3)].map((_, j) => (
                            <div key={j} className="h-10 rounded-md bg-gray-100" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Phone mockup */}
                    <div className="w-[110px] lg:w-[130px] bg-[#1a1a2e] rounded-[20px] p-1 shadow-2xl shrink-0">
                      <div className="bg-white rounded-[16px] overflow-hidden min-h-[180px]">
                        <div className="h-5 bg-gray-50 border-b border-gray-100" />
                        <div
                          className="h-[30%]"
                          style={{ background: `linear-gradient(180deg, ${color}30, transparent)` }}
                        />
                        <div className="p-2 space-y-1.5">
                          <div className="h-2 bg-gray-100 rounded-full w-full" />
                          <div className="h-2 bg-gray-100 rounded-full w-[70%]" />
                          <div className="h-2 bg-gray-100 rounded-full w-[50%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strip — revealed when card is stacked */}
              <div
                className="sc-card-strip absolute top-0 left-0 right-0 z-20 h-[50px] flex items-center px-8 gap-4 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  opacity: 0,
                  transform: 'translateY(-110%)',
                }}
              >
                <span
                  className="text-sm font-semibold whitespace-nowrap"
                  style={{ color, fontFamily: 'serif', fontStyle: 'italic' }}
                >
                  {service.title}
                </span>
                <div
                  className="flex-1 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
