// Run this script to add CORS origins to your Sanity project
// Usage: node scripts/add-cors.mjs

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '44ra77i5',
  dataset: 'production',
  apiVersion: '2026-09-06',
  token: process.env.SANITY_AUTH_TOKEN, // You need to set this
})

async function addCorsOrigin(origin) {
  try {
    await client.request({
      method: 'POST',
      url: '/projects/44ra77i5/cors',
      body: {origin, allowCredentials: true},
    })
    console.log(`✅ Added CORS origin: ${origin}`)
  } catch (err) {
    console.error(`❌ Failed to add ${origin}:`, err.message)
  }
}

async function main() {
  const origins = [
    'https://alaminhossain.me',
    'https://www.alaminhossain.me',
    'http://localhost:3000',
  ]

  for (const origin of origins) {
    await addCorsOrigin(origin)
  }
}

main()
