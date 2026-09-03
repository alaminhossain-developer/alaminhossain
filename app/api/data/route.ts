import { NextRequest, NextResponse } from 'next/server'

const REPO = 'alaminhossain-developer/alaminhossain'
const DATA_FILE = 'public/data/portfolio-data.json'

function getHeaders() {
  const token = process.env.GITHUB_TOKEN
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-dashboard',
  }
}

async function getDefaultBranch(): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${REPO}`, { headers: getHeaders() })
  const data = await res.json()
  return data.default_branch || 'main'
}

async function getFileSha(filepath: string, branch: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filepath}?ref=${branch}`,
      { headers: getHeaders() }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.sha || null
  } catch {
    return null
  }
}

// GET /api/data — load all portfolio data from GitHub
export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const branch = await getDefaultBranch()
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${DATA_FILE}?ref=${branch}`,
      { headers: getHeaders() }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'No saved data found' }, { status: 404 })
    }

    const data = await res.json()
    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}

// POST /api/data — save all portfolio data to GitHub
export async function POST(request: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const body = await request.json()
    const branch = await getDefaultBranch()
    const sha = await getFileSha(DATA_FILE, branch)

    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${DATA_FILE}`,
      {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          message: 'chore: update portfolio data',
          content: Buffer.from(JSON.stringify(body, null, 2)).toString('base64'),
          branch,
          ...(sha ? { sha } : {}),
        }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('GitHub save failed:', err)
      return NextResponse.json({ error: 'Failed to save to GitHub' }, { status: 500 })
    }

    // Trigger Vercel deploy
    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    if (deployHook) {
      fetch(deployHook, { method: 'POST' }).catch(() => {})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
