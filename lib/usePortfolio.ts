'use client'

import { useState, useEffect } from 'react'
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
 * autoLoadFromGitHub() finishes loading from the API.
 */
export function usePortfolio(): PortfolioData {
  const [data, setData] = useState<PortfolioData>(readAll)

  useEffect(() => {
    // Re-read after GitHub data may have loaded (500ms + 2s safety net)
    const t1 = setTimeout(() => setData(readAll()), 500)
    const t2 = setTimeout(() => setData(readAll()), 2000)

    // Also listen for the explicit event from loadAllFromGitHub()
    const handler = () => setData(readAll())
    window.addEventListener('portfolio-data-loaded', handler)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('portfolio-data-loaded', handler)
    }
  }, [])

  return data
}
