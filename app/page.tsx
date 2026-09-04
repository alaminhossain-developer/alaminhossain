'use client'

import { useEffect, lazy, Suspense } from 'react'
import { autoLoadFromGitHub } from '@/lib/store'
import Hero from '@/components/hero/Hero'

// Lazy-load below-fold sections to reduce initial bundle
const Intro = lazy(() => import('@/components/sections/Intro'))
const Metrics = lazy(() => import('@/components/sections/Metrics'))
const Services = lazy(() => import('@/components/sections/Services'))
const FeaturedWork = lazy(() => import('@/components/sections/FeaturedWork'))
const ShopifyFeatures = lazy(() => import('@/components/sections/ShopifyFeatures'))
const Apps = lazy(() => import('@/components/sections/Apps'))
const Articles = lazy(() => import('@/components/sections/Articles'))
const Technology = lazy(() => import('@/components/sections/Technology'))
const About = lazy(() => import('@/components/sections/About'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Process = lazy(() => import('@/components/sections/Process'))
const Performance = lazy(() => import('@/components/sections/Performance'))
const Testimonials = lazy(() => import('@/components/sections/Testimonials'))
const Contact = lazy(() => import('@/components/sections/Contact'))

export default function Home() {
  useEffect(() => { autoLoadFromGitHub() }, [])
  return (
    <main className="bg-dark-950 text-white min-h-screen">
      <Hero />
      <Suspense fallback={null}>
        <Intro />
        <Metrics />
        <Services />
        <FeaturedWork />
        <ShopifyFeatures />
        <Apps />
        <Technology />
        <About />
        <Experience />
        <Process />
        <Performance />
        <Articles />
        <Testimonials />
        <Contact />
      </Suspense>
    </main>
  )
}
