import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

const writeClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Sanity
    const asset = await writeClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    // Return the Sanity image reference
    return NextResponse.json({ 
      success: true, 
      asset: {
        _id: asset._id,
        url: asset.url,
      },
      // Return format that Sanity image component understands
      imageRef: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        }
      }
    })
  } catch (err) {
    console.error('Sanity upload error:', err)
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}
