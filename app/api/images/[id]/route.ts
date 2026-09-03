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

// DELETE /api/images/[id] — remove an image
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

    const filePath = path.join(UPLOAD_DIR, filename)
    if (existsSync(filePath)) {
      await unlink(filePath)
    }

    delete index[id]
    await saveIndex(index)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
