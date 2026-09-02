// ============================================================
// PROJECTS — dashboard-ready, every field required
// ============================================================
export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  liveUrl: string
  color: string
  screenshots: string[]
  selected: boolean
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Premium WordPress Development',
    category: 'WordPress',
    year: '2025',
    description: 'Custom WordPress theme development with advanced performance optimization',
    longDescription: 'A comprehensive WordPress solution featuring custom theme development, advanced page builder integration, and extensive performance optimization for high-traffic websites.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'Elementor', 'WooCommerce'],
    image: '/images/projects/project-1.jpg',
    liveUrl: '#',
    color: '#0ea5e9',
    screenshots: [],
    selected: true,
  },
  {
    id: 'project-2',
    title: 'Shopify Store Optimization',
    category: 'Shopify',
    year: '2024',
    description: 'Complete Shopify store redesign with custom Liquid development and performance enhancement',
    longDescription: 'End-to-end Shopify optimization project including custom theme development, Liquid templating, and comprehensive performance tuning.',
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'App Integration'],
    image: '/images/projects/project-2.jpg',
    liveUrl: '#',
    color: '#22c55e',
    screenshots: [],
    selected: true,
  },
  {
    id: 'project-3',
    title: 'Web Performance Audit & Optimization',
    category: 'Performance',
    year: '2024',
    description: 'Comprehensive performance optimization for enterprise website improving Core Web Vitals',
    longDescription: 'Full-scale performance audit and optimization project targeting Core Web Vitals and overall user experience improvements.',
    technologies: ['Core Web Vitals', 'Image Optimization', 'Code Splitting', 'Caching', 'CDN'],
    image: '/images/projects/project-3.jpg',
    liveUrl: '#',
    color: '#f59e0b',
    screenshots: [],
    selected: true,
  },
  {
    id: 'project-4',
    title: 'Custom Interactive Web Experience',
    category: 'Custom',
    year: '2024',
    description: 'Advanced JavaScript application with interactive UI and real-time data synchronization',
    longDescription: 'Custom web application featuring complex interactive UI components and real-time data updates.',
    technologies: ['React', 'Next.js', 'JavaScript', 'WebSocket', 'API Integration'],
    image: '/images/projects/project-4.jpg',
    liveUrl: '#',
    color: '#8b5cf6',
    screenshots: [],
    selected: true,
  },
]

// ============================================================
// SERVICES — dashboard-ready
// ============================================================
export interface Service {
  id: string
  number: string
  title: string
  description: string
  icon: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'WordPress Development',
    description: 'Custom themes, plugins, and enterprise solutions built on WordPress.',
    icon: 'Monitor',
    features: ['Custom Theme Development', 'Plugin Development', 'Elementor & Page Builders', 'ACF & Custom Fields'],
  },
  {
    id: 'service-2',
    number: '02',
    title: 'Shopify Development',
    description: 'Custom storefronts and Liquid themes optimized for conversion.',
    icon: 'ShoppingBag',
    features: ['Custom Theme Development', 'Liquid Customization', 'Custom Sections', 'Checkout Optimization'],
  },
  {
    id: 'service-3',
    number: '03',
    title: 'Web Performance',
    description: 'Core Web Vitals improvements and speed optimization for WordPress.',
    icon: 'Zap',
    features: ['Core Web Vitals Audits', 'Speed Optimization', 'Image Optimization', 'Caching Strategies'],
  },
  {
    id: 'service-4',
    number: '04',
    title: 'Custom Web Experiences',
    description: 'Interactive features and custom frontend functionality.',
    icon: 'Code',
    features: ['Interactive UI Components', 'API Integrations', 'Data Visualization', 'Animation Systems'],
  },
  {
    id: 'service-5',
    number: '05',
    title: 'Technical SEO',
    description: 'Search engine optimization through technical improvements.',
    icon: 'Search',
    features: ['Technical Audits', 'Schema Markup', 'Site Architecture', 'Mobile Optimization'],
  },
  {
    id: 'service-6',
    number: '06',
    title: 'Website Maintenance',
    description: 'Ongoing support, updates, and optimization for WordPress sites.',
    icon: 'Settings',
    features: ['Regular Updates', 'Security Monitoring', 'Backup Management', 'Performance Monitoring'],
  },
]

// ============================================================
// EXPERIENCE — dashboard-ready
// ============================================================
export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
  technologies: string[]
  current: boolean
  highlights: string[]
}

export const experience: Experience[] = [
  {
    id: 'exp-1',
    role: 'Web Developer Staff',
    company: 'GAOTek Inc.',
    period: 'May 2025 – Present',
    description: 'Lead development of WordPress and Shopify solutions with focus on performance optimization and technical excellence.',
    technologies: ['WordPress', 'Shopify', 'PHP', 'JavaScript', 'Performance'],
    current: true,
    highlights: [
      'WordPress & Shopify website development and management',
      'Web performance optimization and Core Web Vitals improvement',
      'Technical SEO implementation and monitoring',
      'Team and intern management for web projects',
      'Custom theme and plugin development',
    ],
  },
  {
    id: 'exp-2',
    role: 'Senior WordPress Developer',
    company: 'Previous Company',
    period: 'Year – Year',
    description: '[Add your previous role details here]',
    technologies: ['WordPress', 'PHP', 'JavaScript'],
    current: false,
    highlights: [
      'Custom WordPress theme development',
      'WooCommerce store setup and optimization',
      'Client project management',
    ],
  },
]

// ============================================================
// SKILLS — dashboard-ready
// ============================================================
export interface SkillItem {
  name: string
  category: string
  level: number
}

export const skills: SkillItem[] = [
  { name: 'WordPress', category: 'core', level: 95 },
  { name: 'Shopify', category: 'core', level: 90 },
  { name: 'WooCommerce', category: 'core', level: 88 },
  { name: 'JavaScript', category: 'frontend', level: 88 },
  { name: 'HTML', category: 'frontend', level: 95 },
  { name: 'CSS', category: 'frontend', level: 93 },
  { name: 'Liquid', category: 'frontend', level: 88 },
  { name: 'React', category: 'frontend', level: 82 },
  { name: 'Next.js', category: 'frontend', level: 80 },
  { name: 'TypeScript', category: 'frontend', level: 75 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'PHP', category: 'backend', level: 85 },
  { name: 'Elementor', category: 'tools', level: 90 },
  { name: 'ACF', category: 'tools', level: 88 },
  { name: 'Git', category: 'tools', level: 85 },
  { name: 'Figma', category: 'tools', level: 80 },
  { name: 'Google Analytics', category: 'tools', level: 82 },
  { name: 'Technical SEO', category: 'tools', level: 85 },
]

// Skill name strings for the orbital Skills section
export const skillStrings = skills.map((s) => s.name)

// ============================================================
// TESTIMONIALS — dashboard-ready
// ============================================================
export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  projectType: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Exceptional WordPress expertise. Al Amin delivered a high-performance solution that exceeded our expectations.',
    author: 'GAOTek Team',
    role: 'Technology Company',
    company: 'GAOTek Inc.',
    projectType: 'Corporate Website',
  },
  {
    id: 'testimonial-2',
    quote: 'Great communication, clean development, and reliable delivery. Highly recommended for WordPress and Shopify projects.',
    author: 'Client',
    role: 'Business Owner',
    company: 'Project Client',
    projectType: 'WordPress Development',
  },
  {
    id: 'testimonial-3',
    quote: 'The performance improvements were remarkable. Our site was transformed.',
    author: 'Client',
    role: 'Operations Manager',
    company: 'Project Client',
    projectType: 'eCommerce Development',
  },
  {
    id: 'testimonial-4',
    quote: 'Al Amin delivered our Shopify store on time with exceptional attention to detail. The checkout conversion improved by 40% after his optimizations.',
    author: 'Sarah K.',
    role: 'E-commerce Manager',
    company: 'Retail Client',
    projectType: 'Shopify Development',
  },
  {
    id: 'testimonial-5',
    quote: 'Technical SEO audit was thorough and actionable. Our organic traffic grew 60% within 3 months of implementing the recommendations.',
    author: 'David M.',
    role: 'Marketing Director',
    company: 'Agency Client',
    projectType: 'Technical SEO',
  },
]

// ============================================================
// PROCESS STEPS — dashboard-ready
// ============================================================
export interface ProcessStep {
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your goals, target audience, and technical requirements.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Creating comprehensive strategy and technical architecture.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Developing visual direction and user experience flows.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Implementing with clean code and best practices.',
  },
  {
    number: '05',
    title: 'Optimize',
    description: 'Performance tuning, testing, and refinement.',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Deployment, monitoring, and ongoing support.',
  },
]

// ============================================================
// PROFILE — personal info dashboard-ready
// ============================================================
export interface Profile {
  name: string
  tagline: string
  bio: string
  heroPhoto: string
  aboutPhoto: string
  techPhoto: string
  email: string
  location: string
}

export const profile: Profile = {
  name: 'Md. Al Amin Hossain',
  tagline: 'WordPress & Shopify Developer',
  bio: 'I craft high-performance digital experiences. WordPress specialist. Shopify expert. Performance obsessed.',
  heroPhoto: '',
  aboutPhoto: '',
  techPhoto: '',
  email: '',
  location: '',
}

// ============================================================
// METRICS — dashboard-ready
// ============================================================
export interface Metric {
  label: string
  description: string
}

export const metrics: Metric[] = [
  { label: '5+', description: 'Years Experience' },
  { label: '100+', description: 'Projects Delivered' },
  { label: '130+', description: 'Websites Managed' },
]

// ============================================================
// APPS — Shopify apps & tools dashboard-ready
// ============================================================
export interface App {
  id: string
  name: string
  tagline: string
  description: string
  status: 'live' | 'development' | 'planned'
  url: string
  icon: string
  color: string
  features: string[]
}

export const apps: App[] = [
  {
    id: 'app-1',
    name: 'AI Store Doctor',
    tagline: 'Your Shopify store, diagnosed by AI',
    description: 'AI-powered Shopify store audit tool that analyzes your store and provides actionable recommendations to improve performance, SEO, and conversions.',
    status: 'development',
    url: '',
    icon: '🤖',
    color: '#00d4e8',
    features: ['AI-powered audit', 'Performance analysis', 'SEO recommendations', 'Conversion optimization'],
  },
]

// ============================================================
// ARTICLES — dashboard-ready
// ============================================================
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'shopify' | 'wordpress' | 'app' | 'web'
  tags: string[]
  publishedAt: string
  readTime: string
  featured: boolean
}

export const articles: Article[] = [
  {
    id: 'article-1',
    title: 'AI Store Doctor — Complete Feature Overview',
    slug: 'ai-store-doctor-overview',
    excerpt: 'Your Shopify store, diagnosed by AI. Smart scanning, health scores, AI-powered fixes, and one-click apply — everything you need to optimize your store.',
    content: `## How It Works (Step by Step)

1. **Install** → Shopify admin → Click "AI Store Doctor"
2. **Scan** → Fetches ALL products from your store via Shopify API
3. **Analyze** → Checks each product for issues across 5 categories
4. **Score** → Gives health score 0-100 + category breakdown
5. **Fix** → Click "Fix with AI" → Gemini generates optimized text → Apply to store

## Core Features (Free Plan)

| Feature | How It Works |
|---------|-------------|
| Smart Store Scanning | Fetches products via Shopify REST API, checks titles, descriptions, images, SEO, tags, vendor, product type |
| Health Score (0-100) | Weighted score across 5 categories — higher = healthier store |
| AI-Powered Fixes | Gemini AI generates optimized product descriptions, SEO meta descriptions, titles, keywords |
| One-Click Apply | Click "Apply Change" → writes directly to Shopify via REST API |
| Bulk Fix | Fix all products with the same issue type at once |
| Re-Scan | Click "Re-Scan" anytime to re-analyze products after making fixes |
| Scan History | Tracks health score over time — see if your fixes improved things |

## 5 Health Score Categories

- **Product Content (30%)** — Missing description, short/weak description, plain text only, duplicate content
- **SEO (20%)** — Missing meta description, short/long meta description
- **Images (25%)** — No images, only one image, missing alt text
- **Product Data (15%)** — Missing product type, vendor, tags, key fields
- **Keywords & SEO (10%)** — Generic titles, unoptimized titles, missing searchable attributes

## AI Fix Flow

User clicks "Fix with AI" → Frontend sends issue type + product data to API → Gemini AI generates optimized text → Modal shows BEFORE vs AFTER comparison → User clicks "Apply Change" → Shopify REST API updates the product

## Billing & Pricing

- **Free** — $0/mo: 100 products, 20 AI requests, 10 fixes
- **Starter** — $9/mo: 500 products, scheduled scans, email reports
- **Growth** — $19/mo: 2,000 products, competitor benchmarking
- **Pro** — $39/mo: 5,000 products, priority support

## Tech Stack

Node.js + Express backend, React + Vite + Shopify Polaris frontend, Google Gemini AI, Shopify REST Admin API, Railway hosting.`,
    category: 'app',
    tags: ['Shopify App', 'AI', 'Store Audit', 'Gemini'],
    publishedAt: '2026-08-15',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'article-2',
    title: 'How to Optimize Your Shopify Store for Maximum Speed',
    slug: 'shopify-store-speed-optimization',
    excerpt: 'Speed directly impacts your conversion rate. Learn the exact techniques I use to make Shopify stores load in under 2 seconds.',
    content: `## Why Speed Matters

Every second of load time reduces conversions by 7%. A 3-second delay can lose 53% of mobile visitors.

## 1. Image Optimization

- Use WebP format (Shopify supports it natively)
- Implement lazy loading for below-fold images
- Compress images before upload — aim for under 200KB each
- Use Shopify's built-in image URL parameters for responsive sizing

## 2. Minimize JavaScript

- Remove unused apps and their scripts
- Defer non-critical JavaScript
- Use Shopify's Asset API to audit what's loaded
- Replace heavy apps with lightweight custom solutions

## 3. Leverage Browser Caching

- Set proper cache headers via CDN
- Use Shopify's built-in CDN for all assets
- Implement service workers for repeat visits

## 4. Optimize Liquid Code

- Avoid N+1 queries in Liquid templates
- Use {% cache %} blocks for expensive renders
- Paginate collections properly
- Minimize the use of external HTTP requests

## 5. Core Web Vitals

- **LCP** — Keep under 2.5s by optimizing hero images
- **FID** — Reduce JavaScript execution time
- **CLS** — Set explicit dimensions for all images and embeds

## Results

After implementing these techniques, my clients typically see:
- 40-60% improvement in Lighthouse scores
- 2-3x faster page load times
- 15-25% increase in mobile conversions`,
    category: 'shopify',
    tags: ['Shopify', 'Performance', 'Core Web Vitals', 'Speed'],
    publishedAt: '2026-07-20',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 'article-3',
    title: 'WordPress Performance Optimization: The Complete Guide',
    slug: 'wordpress-performance-optimization-guide',
    excerpt: 'From caching strategies to database optimization — everything I do to make WordPress sites blazing fast.',
    content: `## Server-Level Optimization

- Choose quality hosting (Cloudways, Kinsta, or WP Engine)
- Enable server-side caching (Varnish, Redis, or OPcache)
- Use PHP 8.1+ for significant performance gains
- Implement CDN for global content delivery

## WordPress-Specific Optimizations

- **Caching Plugin** — WP Rocket or LiteSpeed Cache
- **Image Optimization** — ShortPixel or Imagify
- **Database Cleanup** — Remove post revisions, transients, spam
- **Lazy Loading** — Native WordPress lazy loading or plugin

## Theme & Plugin Audit

- Remove unused plugins (each adds HTTP requests)
- Choose lightweight themes (GeneratePress, Kadence, or custom)
- Minimize CSS and JavaScript files
- Use async/defer for non-critical scripts

## Database Optimization

- Clean up post revisions (limit to 3-5)
- Remove spam comments and trashed items
- Optimize database tables regularly
- Use object caching for complex queries

## Measuring Results

- Run PageSpeed Insights before and after
- Monitor Core Web Vitals in Search Console
- Use GTmetrix for detailed waterfall analysis
- Track real user metrics with analytics`,
    category: 'wordpress',
    tags: ['WordPress', 'Performance', 'Caching', 'Speed'],
    publishedAt: '2026-06-10',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: 'article-4',
    title: 'Building a Shopify App: From Idea to App Store',
    slug: 'building-shopify-app-guide',
    excerpt: 'Everything I learned building AI Store Doctor — the tech stack, OAuth flow, and what it takes to ship a real Shopify app.',
    content: `## Why Build a Shopify App?

The Shopify ecosystem has over 4.4 million merchants. Apps solve real problems and can generate recurring revenue.

## Planning Your App

1. Identify a real pain point (talk to merchants)
2. Research existing solutions (find gaps)
3. Define your MVP — ship the smallest useful thing
4. Choose your pricing model (freemium works best)

## Tech Stack

- **Backend**: Node.js + Express (ESM)
- **Frontend**: React + Vite + Shopify Polaris
- **AI**: Google Gemini for content generation
- **Hosting**: Railway (Docker containers)
- **Auth**: Shopify App SDK (OAuth)

## The OAuth Flow

1. Merchant installs your app from App Store
2. Shopify redirects to your callback URL with auth code
3. Exchange code for access token
4. Store token and start making API calls

## Key APIs

- **REST Admin API** — Product management, orders, inventory
- **GraphQL API** — More efficient for complex queries
- **App Bridge** — Embedded app experience
- **Polaris** — Shopify's design system

## Common Pitfalls

- Rate limiting (REST API has limits)
- Session storage (don't lose access tokens)
- Webhook handling (verify HMAC signatures)
- App review process (follow Shopify guidelines)

## Launching

- Submit to Shopify App Store
- Prepare listing with screenshots and description
- Set up support channels
- Monitor reviews and iterate`,
    category: 'shopify',
    tags: ['Shopify', 'App Development', 'Node.js', 'OAuth'],
    publishedAt: '2026-05-25',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 'article-5',
    title: 'WordPress Theme Development: Custom vs Page Builder',
    slug: 'wordpress-theme-development-comparison',
    excerpt: 'When to build custom themes, when to use Elementor, and how to get the best of both worlds.',
    content: `## Custom Theme Development

**Pros:**
- Complete control over code quality
- Better performance (no bloat)
- Easier to maintain long-term
- Better SEO (cleaner markup)

**Cons:**
- Higher upfront cost
- Longer development time
- Requires developer for changes

## Page Builder Approach (Elementor)

**Pros:**
- Visual editing for clients
- Faster initial setup
- Lots of pre-built templates
- Client can make changes themselves

**Cons:**
- Code bloat (extra CSS/JS)
- Performance overhead
- Vendor lock-in
- Harder to migrate later

## My Recommendation

Use a hybrid approach:

1. Build a lightweight custom theme as the foundation
2. Use Elementor for content pages only
3. Keep critical templates custom (header, footer, loops)
4. Use ACF for structured data
5. Optimize everything — lazy load, cache, minify

## Best Practices

- Start with Underscores or Sage as a base
- Use ACF for custom fields (not page builder fields)
- Implement proper WordPress hooks and filters
- Follow WordPress coding standards
- Test with Theme Check plugin

## When to Go Fully Custom

- High-traffic sites where performance is critical
- Complex applications with custom post types
- WooCommerce stores with custom functionality
- Sites needing specific accessibility standards`,
    category: 'wordpress',
    tags: ['WordPress', 'Theme Development', 'Elementor', 'ACF'],
    publishedAt: '2026-04-12',
    readTime: '5 min read',
    featured: false,
  },
]
