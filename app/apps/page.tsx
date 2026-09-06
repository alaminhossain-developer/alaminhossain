import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import PortfolioProvider from '@/components/layout/PortfolioProvider'
import AppsClient from './AppsClient'

export default async function AppsPage() {
  const data = await getPortfolioData()
  return (
    <PortfolioProvider data={data}>
      <AppsClient apps={data.apps} />
    </PortfolioProvider>
  )
}
