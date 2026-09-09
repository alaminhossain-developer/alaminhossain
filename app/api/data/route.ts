import { NextResponse } from 'next/server'
import { getPortfolioData } from '@/lib/sanity/getPortfolioData'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/data — load all portfolio data fresh from Sanity (never cached)
export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(
      { ...data, savedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}
