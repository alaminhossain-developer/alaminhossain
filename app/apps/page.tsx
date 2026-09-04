'use client'

import Link from 'next/link'
import { usePortfolio } from '@/lib/usePortfolio'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'

const statusConfig = {
  live: { label: 'Live', color: '#22c55e', bg: '#22c55e15', border: '#22c55e30' },
  development: { label: 'In Development', color: '#f59e0b', bg: '#f59e0b15', border: '#f59e0b30' },
  planned: { label: 'Planned', color: '#8b5cf6', bg: '#8b5cf615', border: '#8b5cf630' },
}

export default function AppsPage() {
  const { apps } = usePortfolio()

  return (
    <main className="bg-[#0a0e27] text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#22c55e]" />
            <span className="text-xs text-[#22c55e] uppercase tracking-[0.12em] font-medium">Apps &amp; Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white">
            MY APPS
          </h1>
          <p className="mt-4 text-white/40 text-base max-w-lg font-light">
            Shopify apps and developer tools built to help merchants optimize their stores and businesses.
          </p>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {apps.map((app) => {
            const status = statusConfig[app.status]
            return (
              <Link
                key={app.id}
                href={`/apps/${app.slug}`}
              >
                <div className="group cursor-pointer">
                  {/* Image / Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.015] aspect-[16/10] mb-5">
                    {app.images && app.images.length > 0 ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={app.images[0]}
                        alt={`${app.name} screenshot`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div className="text-center">
                          <span className="text-6xl block mb-4">{app.icon}</span>
                          <span className="text-xs text-white/20 uppercase tracking-widest">{app.name}</span>
                        </div>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                      <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-[0.12em] font-medium flex items-center gap-2">
                        View Details
                        <ArrowUpRight size={14} />
                      </span>
                    </div>

                    {/* Image count */}
                    {app.images && app.images.length > 1 && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white/70 font-mono">
                        1 / {app.images.length}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{app.icon}</span>
                      <span
                        className="px-2.5 py-0.5 text-[10px] font-mono rounded-full border"
                        style={{
                          color: status.color,
                          borderColor: status.border,
                          background: status.bg,
                        }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-[#22c55e] transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {app.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 text-[9px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                        >
                          {feature}
                        </span>
                      ))}
                      {app.features.length > 4 && (
                        <span className="text-[9px] text-white/20 self-center">+{app.features.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {apps.length === 0 && (
          <div className="text-center py-24 text-white/20">
            <p className="text-lg">No apps yet.</p>
            <p className="text-sm mt-2">Add apps from the <a href="/dashboard" className="text-[#22c55e] hover:underline">dashboard</a>.</p>
          </div>
        )}
      </div>
    </main>
  )
}
