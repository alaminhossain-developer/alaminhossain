import { NextRequest, NextResponse } from 'next/server'

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

async function getDefaultBranch(): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: getHeaders(),
  })
  const data = await res.json()
  return data.default_branch || 'main'
}

async function getRemoteIndex(): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${UPLOAD_DIR}/_index.json`,
      { headers: getHeaders() }
    )
    if (!res.ok) return {}
    const data = await res.json()
    return JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
  } catch {
    return {}
  }
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

// DELETE /api/images/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const branch = await getDefaultBranch()
    const index = await getRemoteIndex()
    const filename = index[id]

    if (!filename) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Delete image file from GitHub
    const fileSha = await getFileSha(`${UPLOAD_DIR}/${filename}`, branch)
    if (fileSha) {
      await fetch(`https://api.github.com/repos/${REPO}/contents/${UPLOAD_DIR}/${filename}`, {
        method: 'DELETE',
        headers: getHeaders(),
        body: JSON.stringify({
          message: `chore: delete image ${filename}`,
          sha: fileSha,
          branch,
        }),
      })
    }

    // Update index
    delete index[id]
    const indexSha = await getFileSha(`${UPLOAD_DIR}/_index.json`, branch)
    if (indexSha) {
      await fetch(`https://api.github.com/repos/${REPO}/contents/${UPLOAD_DIR}/_index.json`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          message: `chore: update image index`,
          content: Buffer.from(JSON.stringify(index, null, 2)).toString('base64'),
          sha: indexSha,
          branch,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
