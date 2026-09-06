import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

// Ensure we can write to Sanity
const writeClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { type, id, data: itemData, action } = data

    if (action === 'save-all') {
      // Save all portfolio data at once
      const transactions = []
      
      if (itemData.profile) {
        // Profile is a singleton - find or create
        const existing = await writeClient.fetch('*[_type == "profile"][0]._id')
        if (existing) {
          const { _id, _type, ...rest } = itemData.profile
          transactions.push(writeClient.patch(existing).set(rest).commit())
        } else {
          transactions.push(writeClient.create({ _type: 'profile', ...itemData.profile }))
        }
      }
      
      // Save each collection type
      const collections = [
        { key: 'projects', type: 'project' },
        { key: 'services', type: 'service' },
        { key: 'testimonials', type: 'testimonial' },
        { key: 'experience', type: 'experience' },
        { key: 'shopifyFeatures', type: 'shopifyFeature' },
        { key: 'wordpressFeatures', type: 'wordpressFeature' },
        { key: 'caseStudies', type: 'caseStudy' },
        { key: 'apps', type: 'app' },
        { key: 'articles', type: 'article' },
      ]
      
      for (const col of collections) {
        if (itemData[col.key] && Array.isArray(itemData[col.key])) {
          // Delete all existing and replace
          const existingIds = await writeClient.fetch(`*[_type == "${col.type}"]._id`)
          if (existingIds.length > 0) {
            const tx = writeClient.transaction()
            existingIds.forEach((eid: string) => tx.delete(eid))
            itemData[col.key].forEach((item: any) => {
              const { _id, id, _type, ...rest } = item
              tx.create({ _type: col.type, ...rest })
            })
            transactions.push(tx.commit())
          } else {
            const tx = writeClient.transaction()
            itemData[col.key].forEach((item: any) => {
              const { _id, id, _type, ...rest } = item
              tx.create({ _type: col.type, ...rest })
            })
            transactions.push(tx.commit())
          }
        }
      }
      
      // Skills (special - stored as flat objects)
      if (itemData.skills && Array.isArray(itemData.skills)) {
        const existingIds = await writeClient.fetch('*[_type == "skill"]._id')
        const tx = writeClient.transaction()
        existingIds.forEach((eid: string) => tx.delete(eid))
        itemData.skills.forEach((item: any) => {
          tx.create({ _type: 'skill', ...item })
        })
        transactions.push(tx.commit())
      }
      
      await Promise.all(transactions)
      return NextResponse.json({ success: true, message: 'All data saved to Sanity' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Sanity save error:', err)
    return NextResponse.json({ 
      error: 'Save failed', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}
