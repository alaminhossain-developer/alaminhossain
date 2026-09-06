import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import PortfolioProvider from '@/components/layout/PortfolioProvider'
import ArticlesClient from './ArticlesClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ArticlesPage() {
  const data = await getPortfolioData()
  return (
    <PortfolioProvider data={data}>
      <ArticlesClient articles={data.articles} />
    </PortfolioProvider>
  )
}
