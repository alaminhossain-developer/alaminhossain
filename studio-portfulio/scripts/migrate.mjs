import {createClient} from '@sanity/client'

const SANITY_TOKEN = 'sko4ThjGoAEy1ShKuh1U9icD1Z6LhSjxRdnz5hIPBiJ6i4ByNS1dD5SoecB46GCYIAkvnJiKrgo4n0BOXq8GRhoYIyGPrQLLmqFx2A71lh5lkxIrljDEmWHSMKE9kMK28KwjRWo1BPf7frZSmLFMQK9mXSREKxAvrPcApTW5ib5OhyuxkJg9'

const sanity = createClient({
  projectId: '44ra77i5',
  dataset: 'production',
  apiVersion: '2026-09-06',
  token: SANITY_TOKEN,
  useCdn: false,
})

// Fetch existing data from GitHub
async function fetchGitHubData() {
  const res = await fetch('https://www.alaminhossain.me/api/data')
  if (!res.ok) throw new Error('Failed to fetch from GitHub')
  return res.json()
}

// Download and upload image to Sanity
async function uploadImageToSanity(url) {
  if (!url || url.startsWith('data:')) return undefined
  try {
    const fullUrl = url.startsWith('http') ? url : `https://www.alaminhossain.me${url}`
    const res = await fetch(fullUrl)
    if (!res.ok) return undefined
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await sanity.assets.upload('image', buffer, {
      filename: url.split('/').pop() || 'image.jpg',
    })
    return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  } catch (err) {
    console.log(`  ⚠️ Image upload failed for ${url}: ${err.message}`)
    return undefined
  }
}

// Create documents
async function migrate() {
  console.log('📥 Fetching data from GitHub...')
  const data = await fetchGitHubData()
  console.log('✅ Data fetched')

  // 1. Profile (singleton)
  console.log('\n👤 Migrating Profile...')
  const profileImage = await uploadImageToSanity(data.profile.heroPhoto)
  const aboutImage = await uploadImageToSanity(data.profile.aboutPhoto)
  const techImage = await uploadImageToSanity(data.profile.techPhoto)
  
  await sanity.createOrReplace({
    _id: 'profile-singleton',
    _type: 'profile',
    name: data.profile.name || 'Md. Al Amin Hossain',
    tagline: data.profile.tagline || '',
    bio: data.profile.bio || '',
    heroPhoto: profileImage,
    aboutPhoto: aboutImage,
    techPhoto: techImage,
    email: data.profile.email || '',
    location: data.profile.location || '',
    github: data.profile.github || '',
    linkedin: data.profile.linkedin || '',
    twitter: data.profile.twitter || '',
    facebook: data.profile.facebook || '',
    instagram: data.profile.instagram || '',
    upwork: data.profile.upwork || '',
    fiverr: data.profile.fiverr || '',
  })
  console.log('  ✅ Profile created')

  // 2. Projects
  console.log('\n📁 Migrating Projects...')
  for (const p of data.projects || []) {
    const image = await uploadImageToSanity(p.image)
    const screenshots = []
    for (const s of (p.screenshots || [])) {
      const img = await uploadImageToSanity(s)
      if (img) screenshots.push(img)
    }
    await sanity.create({
      _type: 'project',
      title: p.title,
      category: p.category || '',
      year: p.year || '',
      description: p.description || '',
      longDescription: p.longDescription || '',
      technologies: p.technologies || [],
      image,
      liveUrl: p.liveUrl || '',
      color: p.color || '#0ea5e9',
      screenshots,
      selected: p.selected || false,
      order: p.order || 99,
    })
    console.log(`  ✅ ${p.title}`)
  }

  // 3. Services
  console.log('\n🔧 Migrating Services...')
  for (const s of data.services || []) {
    await sanity.create({
      _type: 'service',
      number: s.number,
      title: s.title,
      description: s.description || '',
      icon: s.icon || 'Code',
      features: s.features || [],
    })
    console.log(`  ✅ ${s.title}`)
  }

  // 4. Testimonials
  console.log('\n💬 Migrating Testimonials...')
  for (const t of data.testimonials || []) {
    await sanity.create({
      _type: 'testimonial',
      quote: t.quote,
      author: t.author || '',
      role: t.role || '',
      company: t.company || '',
      projectType: t.projectType || '',
    })
    console.log(`  ✅ ${t.author}`)
  }

  // 5. Experience
  console.log('\n💼 Migrating Experience...')
  for (const e of data.experience || []) {
    await sanity.create({
      _type: 'experience',
      role: e.role,
      company: e.company || '',
      period: e.period || '',
      description: e.description || '',
      technologies: e.technologies || [],
      current: e.current || false,
      highlights: e.highlights || [],
    })
    console.log(`  ✅ ${e.role}`)
  }

  // 6. Skills
  console.log('\n🎯 Migrating Skills...')
  for (const s of data.skills || []) {
    await sanity.create({
      _type: 'skill',
      name: s.name,
      category: s.category || '',
      level: s.level || 50,
    })
    console.log(`  ✅ ${s.name}`)
  }

  // 7. Shopify Features
  console.log('\n🟢 Migrating Shopify Features...')
  for (const f of data.shopifyFeatures || []) {
    await sanity.create({
      _type: 'shopifyFeature',
      title: f.title,
      description: f.description || '',
      icon: f.icon || 'Zap',
      color: f.color || '#22c55e',
    })
    console.log(`  ✅ ${f.title}`)
  }

  // 8. WordPress Features
  console.log('\n🔵 Migrating WordPress Features...')
  for (const f of data.wordpressFeatures || []) {
    await sanity.create({
      _type: 'wordpressFeature',
      title: f.title,
      description: f.description || '',
      icon: f.icon || 'Zap',
      color: f.color || '#3b82f6',
      order: f.order || 99,
    })
    console.log(`  ✅ ${f.title}`)
  }

  // 9. Case Studies
  console.log('\n📊 Migrating Case Studies...')
  for (const c of data.caseStudies || []) {
    const bannerImage = await uploadImageToSanity(c.bannerImage)
    await sanity.create({
      _type: 'caseStudy',
      title: c.title,
      client: c.client || '',
      category: c.category || '',
      description: c.description || '',
      results: c.results || [],
      bannerImage,
      technologies: c.technologies || [],
      order: c.order || 99,
    })
    console.log(`  ✅ ${c.title}`)
  }

  // 10. Apps
  console.log('\n🚀 Migrating Apps...')
  for (const a of data.apps || []) {
    const images = []
    for (const img of (a.images || [])) {
      const uploaded = await uploadImageToSanity(img)
      if (uploaded) images.push(uploaded)
    }
    await sanity.create({
      _type: 'app',
      name: a.name,
      slug: {_type: 'slug', current: a.slug || a.name?.toLowerCase().replace(/\s+/g, '-')},
      tagline: a.tagline || '',
      description: a.description || '',
      status: a.status || 'development',
      url: a.url || '',
      icon: a.icon || '🚀',
      color: a.color || '#00d4e8',
      features: a.features || [],
      images,
    })
    console.log(`  ✅ ${a.name}`)
  }

  // 11. Articles
  console.log('\n📝 Migrating Articles...')
  for (const a of data.articles || []) {
    const coverImage = await uploadImageToSanity(a.coverImage)
    await sanity.create({
      _type: 'article',
      title: a.title,
      slug: {_type: 'slug', current: a.slug || a.title?.toLowerCase().replace(/\s+/g, '-')},
      excerpt: a.excerpt || '',
      content: a.content || '',
      category: a.category || 'web',
      tags: a.tags || [],
      publishedAt: a.publishedAt || new Date().toISOString().split('T')[0],
      readTime: a.readTime || '5 min read',
      featured: a.featured || false,
      coverImage,
    })
    console.log(`  ✅ ${a.title}`)
  }

  console.log('\n🎉 Migration complete!')
  console.log('Next steps:')
  console.log('1. Go to https://www.sanity.io/manage → Project 44ra77i5 → API → CORS origins')
  console.log('2. Add https://alaminhossain.me')
  console.log('3. Add http://localhost:3000')
  console.log('4. Check "Allow credentials" for both')
}

migrate().catch(console.error)
