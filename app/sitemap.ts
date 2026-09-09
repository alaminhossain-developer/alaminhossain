import { MetadataRoute } from 'next'
import { getPortfolioData } from '@/lib/sanity/getPortfolioData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alaminhossain.me'
  const currentDate = new Date().toISOString().split('T')[0]

  let data
  try {
    data = await getPortfolioData()
  } catch {
    // Fallback if Sanity is unreachable
    return [
      { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${baseUrl}/projects`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/apps`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/articles`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    ]
  }

  const routes: MetadataRoute.Sitemap = [
    // Static main pages
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/apps`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Dynamic project pages
  if (data.projects) {
    for (const project of data.projects) {
      const slug = project.slug || project.id
      if (slug) {
        routes.push({
          url: `${baseUrl}/projects/${slug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  // Dynamic article pages
  if (data.articles) {
    for (const article of data.articles) {
      const slug = article.slug || article.id
      if (slug) {
        routes.push({
          url: `${baseUrl}/articles/${slug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  // Dynamic app pages
  if (data.apps) {
    for (const app of data.apps) {
      const slug = app.slug || app.id
      if (slug) {
        routes.push({
          url: `${baseUrl}/apps/${slug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  return routes
}
