import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import ArticlesClient from './ArticlesClient'

export default async function ArticlesPage() {
  const data = await getPortfolioData()
  return <ArticlesClient articles={data.articles} />
}
