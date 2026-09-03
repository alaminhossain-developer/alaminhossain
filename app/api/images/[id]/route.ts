import { NextRequest, NextResponse } from 'next/server'
import { unlink, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const INDEX_FILE = path.join(UPLOAD_DIR, '_index.json')

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

async function deleteFromGitHub(filename: string, index: Record<string, string>) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO || 'alaminhossain-developer/alaminhossain'
  if (!token) return

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-dashboard',
  }

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${repo}`, { headers })
    const repoData = await repoRes.json()
    const defaultBranch = repoData.default_branch || 'main'

    // Delete image file
    const fileRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/uploads/${filename}`,
      { headers }
    )
    if (fileRes.ok) {
      const fileData = await fileRes.json()
      await fetch(
        `https://api.github.com/repos/${repo}/contents/public/uploads/${filename}`,
        {
          method: 'DELETE',
          headers,
          body: JSON.stringify({
            message: `chore: delete image ${filename}`,
            sha: fileData.sha,
            branch: defaultBranch,
          }),
        }
      )
    }

    // Update index
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

    if (indexSha) {
      await fetch(
        `https://api.github.com/repos/${repo}/contents/public/uploads/_index.json`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            message: `chore: update image index`,
            content: Buffer.from(JSON.stringify(index, null, 2)).toString('base64'),
            sha: indexSha,
            branch: defaultBranch,
          }),
        }
      )
    }
  } catch (err) {
    console.error('GitHub delete error:', err)
  }
}

// DELETE /api/images/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const index = await getIndex()
    const filename = index[id]

    if (!filename) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Try local delete
    try {
      const filePath = path.join(UPLOAD_DIR, filename)
      if (existsSync(filePath)) await unlink(filePath)
    } catch {}

    delete index[id]
    try { await saveIndex(index) } catch {}

    // Delete from GitHub
    await deleteFromGitHub(filename, index)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
