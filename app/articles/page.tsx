'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getArticles } from '@/lib/store'
import { ArrowRight, Clock } from 'lucide-react'

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

export default function ArticlesPage() {
  const [filter, setFilter] = useState<string>('all')
  const allArticles = getArticles()

  const filtered = filter === 'all'
    ? allArticles
    : allArticles.filter((a) => a.category === filter)

  const categories = ['all', 'shopify', 'wordpress', 'app']

  return (
    <main className="bg-dark-950 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4">
          Articles
        </h1>
        <p className="text-base text-white/40 font-light mb-10 max-w-xl">
          Insights on Shopify development, WordPress optimization, and building apps that help merchants succeed.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                  : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:border-white/[0.12] hover:text-white/60'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article) => {
            const color = categoryColors[article.category] || '#ffffff'
            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
              >
                <div className="group h-full p-6 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-500 flex flex-col">
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

                  <h2 className="text-xl font-bold text-white mb-3 tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-sm text-white/40 leading-relaxed mb-6 flex-1 font-light">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    <span className="text-[10px] text-white/25 font-mono">
                      {article.publishedAt}
                    </span>
                    <span className="text-xs text-cyan-400/60 group-hover:text-cyan-400 transition-colors font-medium flex items-center gap-1">
                      Read Article
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            No articles in this category yet.
          </div>
        )}
      </div>
    </main>
  )
}
