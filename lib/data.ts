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
