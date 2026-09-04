'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolio } from '@/lib/usePortfolio'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categoryColors: Record<string, string> = {
  shopify: '#22c55e',
  wordpress: '#0ea5e9',
  app: '#00d4e8',
  web: '#a855f7',
}

const categoryLabels: Record<string, string> = {
  shopify: 'Shopify',
  wordpress: 'WordPress',
  app: 'App',
  web: 'Web',
}

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { articles: allArticles } = usePortfolio()
  const articles = allArticles.slice(0, 3)

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  if (articles.length === 0) return null

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 px-6" id="articles">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-cyan-400" />
              <span className="text-xs text-cyan-400 uppercase tracking-[0.12em] font-medium">
                Blog
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white">
              LATEST ARTICLES
            </h2>
          </div>
          <Link
            href="/articles"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300 text-sm font-semibold"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            const color = categoryColors[article.category] || '#ffffff'
            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
              >
                <div
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="group h-full p-6 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-500 flex flex-col"
                >
                  {/* Category + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border"
                      style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}
                    >
                      {categoryLabels[article.category] || article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-white/25">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Cover Image */}
                  {article.coverImage && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/[0.04] aspect-[16/9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-white/40 leading-relaxed mb-6 flex-1 font-light">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    <span className="text-[10px] text-white/25 font-mono">
                      {article.publishedAt}
                    </span>
                    <span className="text-xs text-cyan-400/60 group-hover:text-cyan-400 transition-colors font-medium flex items-center gap-1">
                      Read
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300 text-sm font-semibold"
          >
            View All Articles
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
