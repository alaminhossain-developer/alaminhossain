import { getPortfolioData } from '@/lib/sanity/getPortfolioData'
import ProjectsClient from './ProjectsClient'

export default async function ProjectsPage() {
  const data = await getPortfolioData()
  return <ProjectsClient projects={data.projects} />
}
