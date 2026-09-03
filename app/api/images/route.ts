import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const INDEX_FILE = path.join(UPLOAD_DIR, '_index.json')

async function ensureDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

async function getIndex(): Promise<Record<string, string>> {
  try {
    const data = await readFile(INDEX_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

async function saveIndex(index: Record<string, string>) {
  await writeFile(INDEX_FILE, JSON.stringify(index, null, 2))
}

// Push image to GitHub via API (works on Vercel too)
async function pushToGitHub(filename: string, buffer: Buffer, index: Record<string, string>) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO || 'alaminhossain-developer/alaminhossain'
  
  if (!token) {
    console.error('GITHUB_TOKEN not set — skipping git push')
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-dashboard',
  }

  try {
    // 1. Get current commit SHA
    const repoRes = await fetch(`https://api.github.com/repos/${repo}`, { headers })
    const repoData = await repoRes.json()
    const defaultBranch = repoData.default_branch || 'main'

    // 2. Get the SHA of the file (or null if new)
    let fileSha: string | undefined
    try {
      const fileRes = await fetch(
        `https://api.github.com/repos/${repo}/contents/public/uploads/${filename}`,
        { headers }
      )
      if (fileRes.ok) {
        const fileData = await fileRes.json()
        fileSha = fileData.sha
      }
    } catch {}

    // 3. Upload image file
    const imageRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/uploads/${filename}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `chore: upload image ${filename}`,
          content: buffer.toString('base64'),
          branch: defaultBranch,
          ...(fileSha ? { sha: fileSha } : {}),
        }),
      }
    )

    if (!imageRes.ok) {
      const err = await imageRes.text()
      console.error('GitHub image upload failed:', err)
      return
    }

    // 4. Update _index.json
    let indexSha: string | undefined
    try {
      const indexRes = await fetch(
        `https://api.github.com/repos/${repo}/contents/public/uploads/_index.json`,
        { headers }
      )
      if (indexRes.ok) {
        const indexData = await indexRes.json()
        indexSha = indexData.sha
      }
    } catch {}

    await fetch(
      `https://api.github.com/repos/${repo}/contents/public/uploads/_index.json`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `chore: update image index`,
          content: Buffer.from(JSON.stringify(index, null, 2)).toString('base64'),
          branch: defaultBranch,
          ...(indexSha ? { sha: indexSha } : {}),
        }),
      }
    )
  } catch (err) {
    console.error('GitHub push error:', err)
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

    const id = crypto.randomBytes(8).toString('hex')
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${id}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    // Try saving to local filesystem (works locally)
    try {
      await ensureDir()
      await writeFile(path.join(UPLOAD_DIR, filename), buffer)
      const index = await getIndex()
      index[id] = filename
      await saveIndex(index)
    } catch {}

    // Always push to GitHub via API (works on Vercel too)
    try {
      const index = await getIndex()
      index[id] = filename
      await pushToGitHub(filename, buffer, index)
    } catch (err) {
      console.error('GitHub push failed:', err)
    }

    return NextResponse.json({
      id,
      url: `/uploads/${filename}`,
      filename,
      size: file.size,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// GET /api/images — list all images
export async function GET() {
  try {
    const index = await getIndex()
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
