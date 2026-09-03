import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
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

// Auto-commit and push image to GitHub
async function gitPush(filename: string) {
  try {
    const cwd = process.cwd()
    await execAsync(`git add public/uploads/${filename}`, { cwd })
    await execAsync(`git commit -m "chore: upload image ${filename}" --allow-empty`, { cwd })
    await execAsync('git push origin main', { cwd })
  } catch (err) {
    // Git push failure is non-critical — image is still saved locally
    console.error('Git push failed:', err)
  }
}

// POST /api/images — upload an image
export async function POST(request: NextRequest) {
  try {
    await ensureDir()
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate unique ID
    const id = crypto.randomBytes(8).toString('hex')
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${id}.${ext}`

    // Convert to buffer and save
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(UPLOAD_DIR, filename), buffer)

    // Update index
    const index = await getIndex()
    index[id] = filename
    await saveIndex(index)

    // Auto-push to GitHub in background (non-blocking)
    gitPush(filename)

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
