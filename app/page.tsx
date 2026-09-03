'use client'

import { useEffect } from 'react'
import { autoLoadFromGitHub } from '@/lib/store'
import Hero from '@/components/hero/Hero'
import Intro from '@/components/sections/Intro'
import Metrics from '@/components/sections/Metrics'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'
import ShopifyFeatures from '@/components/sections/ShopifyFeatures'
import Apps from '@/components/sections/Apps'
import Articles from '@/components/sections/Articles'
import Technology from '@/components/sections/Technology'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Process from '@/components/sections/Process'
import Performance from '@/components/sections/Performance'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default function Home() {
  useEffect(() => { autoLoadFromGitHub() }, [])
  return (
    <main className="bg-dark-950 text-white min-h-screen">
      <Hero />
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
    </main>
  )
}
