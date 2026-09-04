'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getProfile,
  getProjects,
  getServices,
  getTestimonials,
  getExperience,
  getSkills,
  getShopifyFeatures,
  getApps,
  getArticles,
} from './store'
import type { Profile, Project, Service, Testimonial, Experience, SkillItem } from './data'
import type { ShopifyFeature, App, Article } from './store'

export interface PortfolioData {
  profile: Profile
  projects: Project[]
  services: Service[]
  testimonials: Testimonial[]
  experience: Experience[]
  skills: SkillItem[]
  shopifyFeatures: ShopifyFeature[]
  apps: App[]
  articles: Article[]
}

function readAll(): PortfolioData {
  return {
    profile: getProfile(),
    projects: getProjects(),
    services: getServices(),
    testimonials: getTestimonials(),
    experience: getExperience(),
    skills: getSkills(),
    shopifyFeatures: getShopifyFeatures(),
    apps: getApps(),
    articles: getArticles(),
  }
}

/**
 * Returns all portfolio data. Re-reads only when GitHub data loads (event-based, no polling).
 */
export function usePortfolio(): PortfolioData {
  const [data, setData] = useState<PortfolioData>(readAll)

  const refresh = useCallback(() => setData(readAll()), [])

  useEffect(() => {
    // One quick check after 1s for fast GitHub loads
    const t = setTimeout(refresh, 1000)

    // Listen for the event from loadAllFromGitHub()
    window.addEventListener('portfolio-data-loaded', refresh)

    return () => {
      clearTimeout(t)
      window.removeEventListener('portfolio-data-loaded', refresh)
    }
  }, [refresh])

  return data
}
