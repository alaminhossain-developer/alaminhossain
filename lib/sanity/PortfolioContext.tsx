'use client'

import { createContext, useContext } from 'react'
import type { PortfolioData } from './getPortfolioData'

const PortfolioContext = createContext<PortfolioData>({
  profile: null, projects: [], services: [], testimonials: [],
  experience: [], skills: [], shopifyFeatures: [], wordpressFeatures: [],
  caseStudies: [], apps: [], articles: [],
})

export function PortfolioProvider({ data, children }: { data: PortfolioData; children: React.ReactNode }) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioData() {
  return useContext(PortfolioContext)
}
