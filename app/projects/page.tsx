import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import PortfolioProvider from '@/components/layout/PortfolioProvider'
import ProjectsClient from './ProjectsClient'

export default async function ProjectsPage() {
  const data = await getPortfolioData()
  return (
    <PortfolioProvider data={data}>
      <ProjectsClient projects={data.projects} />
    </PortfolioProvider>
  )
}
