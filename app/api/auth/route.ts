import { NextResponse } from 'next/server'

// Set your dashboard password here, or use env var DASHBOARD_PASSWORD
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'admin123'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === DASHBOARD_PASSWORD) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
