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
 * Returns all portfolio data and automatically re-reads when
 * GitHub data loads. GitHub is the source of truth.
 */
export function usePortfolio(): PortfolioData {
  const [data, setData] = useState<PortfolioData>(readAll)

  const refresh = useCallback(() => setData(readAll()), [])

  useEffect(() => {
    // Poll at increasing intervals to catch the GitHub load
    const timers = [
      setTimeout(refresh, 300),
      setTimeout(refresh, 800),
      setTimeout(refresh, 1500),
      setTimeout(refresh, 3000),
    ]

    // Listen for the explicit event from loadAllFromGitHub()
    window.addEventListener('portfolio-data-loaded', refresh)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('portfolio-data-loaded', refresh)
    }
  }, [refresh])

  return data
}
