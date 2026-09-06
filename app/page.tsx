import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import PortfolioProvider from '@/components/layout/PortfolioProvider'
import HomeClient from './HomeClient'

// Fetch fresh data on every request (not cached at build time)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const data = await getPortfolioData()
  return (
    <PortfolioProvider data={data}>
      <HomeClient />
    </PortfolioProvider>
  )
}
