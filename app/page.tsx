import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import PortfolioProvider from '@/components/layout/PortfolioProvider'
import HomeClient from './HomeClient'

export default async function Home() {
  const data = await getPortfolioData()
  return (
    <PortfolioProvider data={data}>
      <HomeClient />
    </PortfolioProvider>
  )
}
