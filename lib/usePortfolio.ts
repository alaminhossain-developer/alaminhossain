'use client'

import { useState, useEffect, useCallback } from 'react'
import { client } from './sanity/client'
import {
  PROFILE_QUERY,
  PROJECTS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  EXPERIENCE_QUERY,
  SKILLS_QUERY,
  SHOPIFY_FEATURES_QUERY,
  WORDPRESS_FEATURES_QUERY,
  CASE_STUDIES_QUERY,
  APPS_QUERY,
  ARTICLES_QUERY,
} from './sanity/queries'

// Types matching Sanity responses (with _id -> id mapping)
interface SanityItem {
  _id?: string
  id?: string
  [key: string]: unknown
}

function mapItem(item: SanityItem) {
  return { ...item, id: String(item._id || item.id || '') }
}

export interface PortfolioData {
  profile: {
    name: string; tagline: string; bio: string
    heroPhoto: string; aboutPhoto: string; techPhoto: string
    email: string; location: string
    github: string; linkedin: string; twitter: string
    facebook: string; instagram: string; upwork: string; fiverr: string
  } | null
  projects: (SanityItem & { title: string; category: string; year: string; description: string; longDescription: string; technologies: string[]; image: string; liveUrl: string; color: string; screenshots: string[]; selected: boolean; order: number })[]
  services: (SanityItem & { number: string; title: string; description: string; icon: string; features: string[] })[]
  testimonials: (SanityItem & { quote: string; author: string; role: string; company: string; projectType: string })[]
  experience: (SanityItem & { role: string; company: string; period: string; description: string; technologies: string[]; current: boolean; highlights: string[] })[]
  skills: { name: string; category: string; level: number }[]
  shopifyFeatures: (SanityItem & { title: string; description: string; icon: string; color: string })[]
  wordpressFeatures: (SanityItem & { title: string; description: string; icon: string; color: string; order: number })[]
  caseStudies: (SanityItem & { title: string; client: string; category: string; description: string; results: string[]; bannerImage: string; technologies: string[]; order: number })[]
  apps: (SanityItem & { name: string; slug: string | { current: string }; tagline: string; description: string; status: string; url: string; icon: string; color: string; features: string[]; images: string[] })[]
  articles: (SanityItem & { title: string; slug: string | { current: string }; excerpt: string; content: string; category: string; tags: string[]; publishedAt: string; readTime: string; featured: boolean; coverImage: string })[]
}

const defaultData: PortfolioData = {
  profile: null, projects: [], services: [], testimonials: [],
  experience: [], skills: [], shopifyFeatures: [], wordpressFeatures: [],
  caseStudies: [], apps: [], articles: [],
}

/**
 * Fetches all portfolio data from Sanity API.
 * Falls back to localStorage if Sanity is unavailable.
 */
export function usePortfolio(): PortfolioData {
  const [data, setData] = useState<PortfolioData>(defaultData)
  const [loaded, setLoaded] = useState(false)

  const fetchFromSanity = useCallback(async () => {
    try {
      const [profile, projects, services, testimonials, experience, skills, shopifyFeatures, wordpressFeatures, caseStudies, apps, articles] = await Promise.all([
        client.fetch(PROFILE_QUERY),
        client.fetch(PROJECTS_QUERY),
        client.fetch(SERVICES_QUERY),
        client.fetch(TESTIMONIALS_QUERY),
        client.fetch(EXPERIENCE_QUERY),
        client.fetch(SKILLS_QUERY),
        client.fetch(SHOPIFY_FEATURES_QUERY),
        client.fetch(WORDPRESS_FEATURES_QUERY),
        client.fetch(CASE_STUDIES_QUERY),
        client.fetch(APPS_QUERY),
        client.fetch(ARTICLES_QUERY),
      ])

      setData({
        profile: profile || null,
        projects: (projects || []).map(mapItem),
        services: (services || []).map(mapItem),
        testimonials: (testimonials || []).map(mapItem),
        experience: (experience || []).map(mapItem),
        skills: skills || [],
        shopifyFeatures: (shopifyFeatures || []).map(mapItem),
        wordpressFeatures: (wordpressFeatures || []).map(mapItem),
        caseStudies: (caseStudies || []).map(mapItem),
        apps: (apps || []).map(mapItem),
        articles: (articles || []).map(mapItem),
      })
    } catch (err) {
      console.warn('Sanity fetch failed, trying localStorage fallback:', err)
      // Fallback to localStorage
      try {
        const { getProfile, getProjects, getServices, getTestimonials, getExperience, getSkills, getShopifyFeatures, getApps, getArticles, getWordPressFeatures, getCaseStudies } = await import('./store')
      const pro = getProfile()
      setData({
        profile: pro ? { ...pro, heroPhoto: pro.heroPhoto || '', aboutPhoto: pro.aboutPhoto || '', techPhoto: pro.techPhoto || '', email: pro.email || '', location: pro.location || '', github: pro.github || '', linkedin: pro.linkedin || '', twitter: pro.twitter || '', facebook: pro.facebook || '', instagram: pro.instagram || '', upwork: pro.upwork || '', fiverr: pro.fiverr || '' } : null,
        projects: getProjects().map(p => ({ ...p, _id: p.id })),
        services: getServices().map(s => ({ ...s, _id: s.id })),
        testimonials: getTestimonials().map(t => ({ ...t, _id: t.id })),
        experience: getExperience().map(e => ({ ...e, _id: e.id })),
        skills: getSkills(),
        shopifyFeatures: getShopifyFeatures().map(f => ({ ...f, _id: f.id })),
        apps: getApps().map(a => ({ ...a, _id: a.id })),
        articles: getArticles().map(a => ({ ...a, _id: a.id })),
        wordpressFeatures: getWordPressFeatures().map(f => ({ ...f, _id: f.id })),
        caseStudies: getCaseStudies().map(c => ({ ...c, _id: c.id })),
      })
      } catch {
        // Use defaults
      }
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    fetchFromSanity()
  }, [fetchFromSanity])

  return data
}
