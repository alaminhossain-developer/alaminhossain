import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const REPO = 'alaminhossain-developer/alaminhossain'
const UPLOAD_DIR = 'public/uploads'

function getHeaders() {
  const token = process.env.GITHUB_TOKEN
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-dashboard',
  }
}

// Read _index.json from GitHub
async function getRemoteIndex(): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${UPLOAD_DIR}/_index.json`,
      { headers: getHeaders() }
    )
    if (!res.ok) return {}
    const data = await res.json()
    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    return JSON.parse(content)
  } catch {
    return {}
  }
}

// Get default branch
async function getDefaultBranch(): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: getHeaders(),
  })
  const data = await res.json()
  return data.default_branch || 'main'
}

// Create or update a file on GitHub
async function upsertFile(
  filepath: string,
  content: string,
  message: string,
  branch: string,
  sha?: string
): Promise<boolean> {
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
  }
  if (sha) body.sha = sha

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filepath}`,
    {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    console.error(`GitHub upsert failed for ${filepath}:`, err)
    return false
  }
  return true
}

// Get SHA of existing file (or null)
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

// POST /api/images — upload an image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const id = crypto.randomBytes(8).toString('hex')
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${id}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    // Check file size — GitHub API limit is 1MB for content
    if (buffer.length > 1000000) {
      return NextResponse.json({ error: 'Image too large (max 1MB). Please compress first.' }, { status: 400 })
    }

    const branch = await getDefaultBranch()

    // 1. Upload image file to GitHub
    const uploaded = await upsertFile(
      `${UPLOAD_DIR}/${filename}`,
      buffer.toString('base64'),
      `chore: upload image ${filename}`,
      branch
    )

    if (!uploaded) {
      return NextResponse.json({ error: 'Failed to save image to GitHub' }, { status: 500 })
    }

    // 2. Update _index.json on GitHub
    const index = await getRemoteIndex()
    index[id] = filename
    const indexSha = await getFileSha(`${UPLOAD_DIR}/_index.json`, branch)
    await upsertFile(
      `${UPLOAD_DIR}/_index.json`,
      JSON.stringify(index, null, 2),
      `chore: update image index for ${filename}`,
      branch,
      indexSha || undefined
    )

    return NextResponse.json({
      id,
      url: `/uploads/${filename}`,
      filename,
      size: file.size,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}

// GET /api/images — list all images
export async function GET() {
  try {
    const index = await getRemoteIndex()
    const images = Object.entries(index).map(([id, filename]) => ({
      id,
      url: `/uploads/${filename}`,
      filename,
    }))
    return NextResponse.json(images)
  } catch {
    return NextResponse.json([])
  }
}
