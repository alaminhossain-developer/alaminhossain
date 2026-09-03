'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getApps } from '@/lib/store'
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

const statusConfig = {
  live: { label: 'Live', color: '#22c55e', bg: '#22c55e15', border: '#22c55e30' },
  development: { label: 'In Development', color: '#f59e0b', bg: '#f59e0b15', border: '#f59e0b30' },
  planned: { label: 'Planned', color: '#8b5cf6', bg: '#8b5cf615', border: '#8b5cf630' },
}

export default function AppDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const apps = getApps()
  const app = apps.find((a) => a.slug === slug)
  const [activeImage, setActiveImage] = useState(0)

  const images = app?.images || []

  const nextImage = useCallback(() => {
    if (images.length > 0) {
      setActiveImage((prev) => (prev + 1) % images.length)
    }
  }, [images.length])

  const prevImage = useCallback(() => {
    if (images.length > 0) {
      setActiveImage((prev) => (prev - 1 + images.length) % images.length)
    }
  }, [images.length])

  if (!app) {
    return (
      <main className="bg-[#0a0e27] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">App Not Found</h1>
          <Link href="/apps" className="text-[#22c55e] hover:underline">
            ← Back to Apps
          </Link>
        </div>
      </main>
    )
  }

  const status = statusConfig[app.status]

  return (
    <main className="bg-[#0a0e27] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          All Apps
        </Link>

        {/* App header */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl">{app.icon}</span>
          <span
            className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border"
            style={{ color: status.color, borderColor: status.border, backgroundColor: status.bg }}
          >
            {status.label}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4">
          {app.name}
        </h1>

        <p className="text-xl text-white/50 font-light mb-10 max-w-2xl">
          {app.tagline}
        </p>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mb-16">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.015] aspect-[16/9] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeImage]}
                alt={`${app.name} screenshot ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-black/70 transition-all flex items-center justify-center"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-black/70 transition-all flex items-center justify-center"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-white/70 font-mono">
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      idx === activeImage
                        ? 'border-[#22c55e] opacity-100'
                        : 'border-white/[0.06] opacity-40 hover:opacity-70'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-lg font-bold text-white mb-3">About</h2>
              <p className="text-white/50 font-light leading-relaxed">
                {app.description}
              </p>
            </div>

            {app.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {app.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.015]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: app.color }} />
                      <span className="text-sm text-white/60 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional images as "screenshots" section */}
            {images.length > 1 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className="group relative rounded-xl overflow-hidden border border-white/[0.04] aspect-[16/10] hover:border-white/[0.12] transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${app.name} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-6">
            {/* Status */}
            <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Status</span>
                  <span
                    className="px-2 py-0.5 text-[10px] font-mono uppercase rounded-full border"
                    style={{ color: status.color, borderColor: status.border, backgroundColor: status.bg }}
                  >
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Type</span>
                  <span className="text-xs text-white/60">Shopify App</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Links</h3>
              {app.url ? (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: app.color }}
                >
                  <ExternalLink size={14} />
                  {app.status === 'live' ? 'Visit App' : 'Learn More'}
                </a>
              ) : (
                <span className="text-sm text-white/20">Coming Soon</span>
              )}
            </div>

            {/* Tech / Features */}
            {app.features.length > 0 && (
              <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Capabilities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {app.features.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] border border-white/[0.04] rounded text-white/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
