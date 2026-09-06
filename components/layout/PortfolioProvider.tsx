'use client'

import { PortfolioProvider as Provider } from '@/lib/sanity/PortfolioContext'
import type { PortfolioData } from '@/lib/sanity/getPortfolioData'

export default function PortfolioProvider({ data, children }: { data: PortfolioData; children: React.ReactNode }) {
  return <Provider data={data}>{children}</Provider>
}
