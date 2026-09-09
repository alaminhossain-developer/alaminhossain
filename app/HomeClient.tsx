'use client'

import { lazy, Suspense } from 'react'
import Hero from '@/components/hero/Hero'

// Lazy-load below-fold sections to reduce initial bundle
const Intro = lazy(() => import('@/components/sections/Intro'))
const Metrics = lazy(() => import('@/components/sections/Metrics'))
const Services = lazy(() => import('@/components/sections/Services'))
const FeaturedWork = lazy(() => import('@/components/sections/FeaturedWork'))
const ShopifyFeatures = lazy(() => import('@/components/sections/ShopifyFeatures'))
const WordPressFeatures = lazy(() => import('@/components/sections/WordPressFeatures'))
const CaseStudies = lazy(() => import('@/components/sections/CaseStudies'))
const Apps = lazy(() => import('@/components/sections/Apps'))
const Articles = lazy(() => import('@/components/sections/Articles'))
const Technology = lazy(() => import('@/components/sections/Technology'))
const About = lazy(() => import('@/components/sections/About'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Process = lazy(() => import('@/components/sections/Process'))
const Performance = lazy(() => import('@/components/sections/Performance'))
const Testimonials = lazy(() => import('@/components/sections/Testimonials'))
const FAQ = lazy(() => import('@/components/sections/FAQ'))
const Contact = lazy(() => import('@/components/sections/Contact'))

export default function HomeClient() {
  return (
    <main className="bg-[#0a0e27] text-white min-h-screen">
      <Hero />
      <Suspense fallback={null}>
        <Intro />
        <Metrics />
        <Services />
        <FeaturedWork />
        <WordPressFeatures />
        <ShopifyFeatures />
        <Apps />
        <Technology />
        <About />
        <Experience />
        <Process />
        <CaseStudies />
        <Performance />
        <Articles />
        <Testimonials />
        <Contact />
        <FAQ />
      </Suspense>
    </main>
  )
}
