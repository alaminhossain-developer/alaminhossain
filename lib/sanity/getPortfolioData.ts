import { client } from './client'
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
} from './queries'

export interface PortfolioData {
  profile: any
  projects: any[]
  services: any[]
  testimonials: any[]
  experience: any[]
  skills: any[]
  shopifyFeatures: any[]
  wordpressFeatures: any[]
  caseStudies: any[]
  apps: any[]
  articles: any[]
}

function mapItem(item: any) {
  return { ...item, id: String(item._id || item.id || '') }
}

/**
 * Server-side data fetcher. Use in Server Components or getServerSideProps.
 * Falls back to empty data if Sanity is unreachable.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
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

    return {
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
    }
  } catch (err) {
    console.warn('Sanity server fetch failed:', err)
    return {
      profile: null, projects: [], services: [], testimonials: [],
      experience: [], skills: [], shopifyFeatures: [], wordpressFeatures: [],
      caseStudies: [], apps: [], articles: [],
    }
  }
}
