import {defineQuery} from 'groq'

// Profile (singleton)
export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0]{
  name,
  tagline,
  bio,
  heroPhoto,
  aboutPhoto,
  techPhoto,
  email,
  location,
  github,
  linkedin,
  twitter,
  facebook,
  instagram,
  upwork,
  fiverr
}`)

// Projects
export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(order asc){
  _id,
  title,
  slug,
  category,
  year,
  description,
  longDescription,
  technologies,
  image,
  liveUrl,
  color,
  screenshots,
  selected,
  order
}`)

// Services
export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(number asc){
  _id,
  number,
  title,
  description,
  icon,
  features
}`)

// Testimonials
export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"]{
  _id,
  quote,
  author,
  role,
  company,
  projectType
}`)

// Experience
export const EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"]{
  _id,
  role,
  company,
  period,
  description,
  technologies,
  current,
  highlights
}`)

// Skills
export const SKILLS_QUERY = defineQuery(`*[_type == "skill"]{
  name,
  category,
  level
}`)

// Shopify Features
export const SHOPIFY_FEATURES_QUERY = defineQuery(`*[_type == "shopifyFeature"]{
  _id,
  title,
  description,
  icon,
  color
}`)

// WordPress Features
export const WORDPRESS_FEATURES_QUERY = defineQuery(`*[_type == "wordpressFeature"] | order(order asc){
  _id,
  title,
  description,
  icon,
  color,
  order
}`)

// Case Studies
export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy"] | order(order asc){
  _id,
  title,
  client,
  category,
  description,
  results,
  bannerImage,
  technologies,
  liveUrl,
  order
}`)

// Apps
export const APPS_QUERY = defineQuery(`*[_type == "app"]{
  _id,
  name,
  slug,
  tagline,
  description,
  status,
  url,
  icon,
  color,
  features,
  images,
  order
}`)

// Articles
export const ARTICLES_QUERY = defineQuery(`*[_type == "article"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  publishedAt,
  readTime,
  featured,
  coverImage,
  order
}`)
