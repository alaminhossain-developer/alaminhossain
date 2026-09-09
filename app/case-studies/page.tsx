import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import PortfolioProvider from '@/components/layout/PortfolioProvider'
import CaseStudiesClient from './CaseStudiesClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Case Studies — Al Amin Hossain',
  description:
    'In-depth case studies of WordPress and Shopify projects — performance optimization, conversion improvements, and measurable results.',
}

export default async function CaseStudiesPage() {
  const data = await getPortfolioData()
  return (
    <PortfolioProvider data={data}>
      <CaseStudiesClient caseStudies={data.caseStudies} />
    </PortfolioProvider>
  )
}
