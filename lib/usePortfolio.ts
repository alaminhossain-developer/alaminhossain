'use client'

import { usePortfolioData } from './sanity/PortfolioContext'

/**
 * Hook that returns portfolio data.
 * Data is fetched server-side and passed via context.
 * Falls back to localStorage if context is empty (e.g., on dashboard).
 */
export function usePortfolio() {
  const ctx = usePortfolioData()

  // If context has data, use it (server-fetched)
  if (ctx.profile || ctx.projects.length > 0 || ctx.services.length > 0) {
    return ctx
  }

  // Fallback: try localStorage (for dashboard or if context is empty)
  if (typeof window === 'undefined') return ctx

  try {
    const { getProfile, getProjects, getServices, getTestimonials, getExperience, getSkills, getShopifyFeatures, getApps, getArticles, getWordPressFeatures, getCaseStudies } = require('./store')
    const pro = getProfile()
    return {
      profile: pro ? { ...pro, heroPhoto: pro.heroPhoto || '', aboutPhoto: pro.aboutPhoto || '', techPhoto: pro.techPhoto || '', email: pro.email || '', location: pro.location || '', github: pro.github || '', linkedin: pro.linkedin || '', twitter: pro.twitter || '', facebook: pro.facebook || '', instagram: pro.instagram || '', upwork: pro.upwork || '', fiverr: pro.fiverr || '' } : null,
      projects: getProjects().map((p: any) => ({ ...p, _id: p.id })),
      services: getServices().map((s: any) => ({ ...s, _id: s.id })),
      testimonials: getTestimonials().map((t: any) => ({ ...t, _id: t.id })),
      experience: getExperience().map((e: any) => ({ ...e, _id: e.id })),
      skills: getSkills(),
      shopifyFeatures: getShopifyFeatures().map((f: any) => ({ ...f, _id: f.id })),
      apps: getApps().map((a: any) => ({ ...a, _id: a.id })),
      articles: getArticles().map((a: any) => ({ ...a, _id: a.id })),
      wordpressFeatures: getWordPressFeatures().map((f: any) => ({ ...f, _id: f.id })),
      caseStudies: getCaseStudies().map((c: any) => ({ ...c, _id: c.id })),
    }
  } catch {
    return ctx
  }
}
