import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import AppsClient from './AppsClient'

export default async function AppsPage() {
  const data = await getPortfolioData()
  return <AppsClient apps={data.apps} />
}
