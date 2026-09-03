'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getArticles } from '@/lib/store'
import { ArrowLeft, Clock } from 'lucide-react'

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

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const articles = getArticles()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <main className="bg-dark-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/articles" className="text-cyan-400 hover:underline">
            ← Back to Articles
          </Link>
        </div>
      </main>
    )
  }

  const color = categoryColors[article.category] || '#ffffff'

  // Simple markdown-ish rendering (headers, bold, lists, tables, code blocks)
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Code block
      if (line.startsWith('```')) {
        const codeLines: string[] = []
        i++
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        elements.push(
          <pre key={i} className="bg-[#0a0e27] border border-white/[0.06] rounded-xl p-6 my-6 overflow-x-auto">
            <code className="text-sm font-mono text-cyan-400/80">{codeLines.join('\n')}</code>
          </pre>
        )
        i++
        continue
      }

      // Table
      if (line.includes('|') && line.trim().startsWith('|')) {
        const tableLines: string[] = []
        while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i])
          i++
        }
        if (tableLines.length >= 2) {
          const header = tableLines[0].split('|').filter(Boolean).map((c) => c.trim())
          const rows = tableLines.slice(2).map((r) => r.split('|').filter(Boolean).map((c) => c.trim()))
          elements.push(
            <div key={i} className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-white/[0.06] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/[0.03]">
                    {header.map((h, j) => (
                      <th key={j} className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider border-b border-white/[0.04]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, j) => (
                    <tr key={j} className="border-b border-white/[0.04] last:border-0">
                      {row.map((cell, k) => (
                        <td key={k} className="px-4 py-3 text-white/60 font-light">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        continue
      }

      // Headers
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">
            {line.replace('## ', '')}
          </h2>
        )
        i++
        continue
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">
            {line.replace('### ', '')}
          </h3>
        )
        i++
        continue
      }

      // List items
      if (line.startsWith('- ')) {
        const listItems: string[] = []
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].replace('- ', ''))
          i++
        }
        elements.push(
          <ul key={i} className="space-y-2 my-4 pl-4">
            {listItems.map((item, j) => (
              <li key={j} className="text-white/60 font-light flex items-start gap-2">
                <span className="text-cyan-400 mt-1.5 text-xs">●</span>
                <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const listItems: string[] = []
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(lines[i].replace(/^\d+\.\s/, ''))
          i++
        }
        elements.push(
          <ol key={i} className="space-y-2 my-4 pl-4">
            {listItems.map((item, j) => (
              <li key={j} className="text-white/60 font-light flex items-start gap-3">
                <span className="text-cyan-400 text-sm font-mono mt-0.5">{j + 1}.</span>
                <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
              </li>
            ))}
          </ol>
        )
        continue
      }

      // Empty line
      if (line.trim() === '') {
        i++
        continue
      }

      // Paragraph
      elements.push(
        <p key={i} className="text-white/60 font-light leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
      )
      i++
    }

    return elements
  }

  const renderInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90 font-medium">$1</strong>')
      .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-white/[0.06] rounded text-cyan-400/80 text-[0.85em] font-mono">$1</code>')
      .replace(/→/g, '<span class="text-cyan-400 mx-0.5">→</span>')
  }

  return (
    <main className="bg-dark-950 text-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          All Articles
        </Link>

        {/* Category + meta */}
        <div className="flex items-center gap-3 mb-6">
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
          <span className="text-[10px] text-white/20 font-mono">
            {article.publishedAt}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-tight mb-6">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-white/50 font-light leading-relaxed mb-10 pb-10 border-b border-white/[0.06]">
          {article.excerpt}
        </p>

        {/* Content */}
        <div className="prose-custom">
          {renderContent(article.content)}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <Link
            href="/articles"
            className="text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Back to all articles
          </Link>
        </div>
      </article>
    </main>
  )
}
