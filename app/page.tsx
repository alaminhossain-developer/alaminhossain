'use client'

import Hero from '@/components/hero/Hero'
import Navigation from '@/components/navigation/Navigation'
import Intro from '@/components/sections/Intro'
import Metrics from '@/components/sections/Metrics'
import Capabilities from '@/components/sections/Capabilities'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'
import ShopifyFeatures from '@/components/sections/ShopifyFeatures'
import Technology from '@/components/sections/Technology'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Process from '@/components/sections/Process'
import Performance from '@/components/sections/Performance'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-dark-950 text-white min-h-screen">
      <Navigation />
      <Hero />
      <Intro />
      <Metrics />
      <Capabilities />
      <Services />
      <FeaturedWork />
      <ShopifyFeatures />
      <Technology />
      <About />
      <Experience />
      <Process />
      <Performance />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
