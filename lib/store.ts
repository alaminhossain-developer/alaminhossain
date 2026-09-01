'use client'

import { projects as defaultProjects, services as defaultServices, testimonials as defaultTestimonials, experience as defaultExperience, skills as defaultSkills, processSteps as defaultProcessSteps, metrics as defaultMetrics } from './data'
import type { Project, Service, Testimonial, Experience, SkillItem, ProcessStep, Metric } from './data'

// ============================================================
// Storage keys
// ============================================================
const KEYS = {
  projects: 'portfolio_projects',
  services: 'portfolio_services',
  testimonials: 'portfolio_testimonials',
  experience: 'portfolio_experience',
  skills: 'portfolio_skills',
  processSteps: 'portfolio_processSteps',
  metrics: 'portfolio_metrics',
  shopifyFeatures: 'portfolio_shopifyFeatures',
} as const

// ============================================================
// Generic CRUD helpers
// ============================================================
function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function save<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// ============================================================
// Projects
// ============================================================
export function getProjects(): Project[] {
  return load(KEYS.projects, defaultProjects)
}

export function saveProjects(data: Project[]): void {
  save(KEYS.projects, data)
}

export function addProject(project: Omit<Project, 'id'>): Project {
  const newProject: Project = { ...project, id: 'project-' + generateId() }
  const all = getProjects()
  all.push(newProject)
  saveProjects(all)
  return newProject
}

export function updateProject(id: string, updates: Partial<Project>): void {
  const all = getProjects()
  const idx = all.findIndex((p) => p.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates }
    saveProjects(all)
  }
}

export function deleteProject(id: string): void {
  saveProjects(getProjects().filter((p) => p.id !== id))
}

// ============================================================
// Services
// ============================================================
export function getServices(): Service[] {
  return load(KEYS.services, defaultServices)
}

export function saveServices(data: Service[]): void {
  save(KEYS.services, data)
}

export function addService(service: Omit<Service, 'id'>): Service {
  const newService: Service = { ...service, id: 'service-' + generateId() }
  const all = getServices()
  all.push(newService)
  saveServices(all)
  return newService
}

export function updateService(id: string, updates: Partial<Service>): void {
  const all = getServices()
  const idx = all.findIndex((s) => s.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates }
    saveServices(all)
  }
}

export function deleteService(id: string): void {
  saveServices(getServices().filter((s) => s.id !== id))
}

// ============================================================
// Testimonials
// ============================================================
export function getTestimonials(): Testimonial[] {
  return load(KEYS.testimonials, defaultTestimonials)
}

export function saveTestimonials(data: Testimonial[]): void {
  save(KEYS.testimonials, data)
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Testimonial {
  const newT: Testimonial = { ...testimonial, id: 'testimonial-' + generateId() }
  const all = getTestimonials()
  all.push(newT)
  saveTestimonials(all)
  return newT
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): void {
  const all = getTestimonials()
  const idx = all.findIndex((t) => t.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates }
    saveTestimonials(all)
  }
}

export function deleteTestimonial(id: string): void {
  saveTestimonials(getTestimonials().filter((t) => t.id !== id))
}

// ============================================================
// Experience
// ============================================================
export function getExperience(): Experience[] {
  return load(KEYS.experience, defaultExperience)
}

export function saveExperience(data: Experience[]): void {
  save(KEYS.experience, data)
}

export function addExperience(exp: Omit<Experience, 'id'>): Experience {
  const newExp: Experience = { ...exp, id: 'exp-' + generateId() }
  const all = getExperience()
  all.push(newExp)
  saveExperience(all)
  return newExp
}

export function updateExperience(id: string, updates: Partial<Experience>): void {
  const all = getExperience()
  const idx = all.findIndex((e) => e.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates }
    saveExperience(all)
  }
}

export function deleteExperience(id: string): void {
  saveExperience(getExperience().filter((e) => e.id !== id))
}

// ============================================================
// Skills
// ============================================================
export function getSkills(): SkillItem[] {
  return load(KEYS.skills, defaultSkills)
}

export function saveSkills(data: SkillItem[]): void {
  save(KEYS.skills, data)
}

export function addSkill(skill: Omit<SkillItem, 'name'>): SkillItem {
  const all = getSkills()
  all.push(skill as SkillItem)
  saveSkills(all)
  return skill as SkillItem
}

export function updateSkill(name: string, updates: Partial<SkillItem>): void {
  const all = getSkills()
  const idx = all.findIndex((s) => s.name === name)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates }
    saveSkills(all)
  }
}

export function deleteSkill(name: string): void {
  saveSkills(getSkills().filter((s) => s.name !== name))
}

// ============================================================
// Shopify Features (new section)
// ============================================================
export interface ShopifyFeature {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

const defaultShopifyFeatures: ShopifyFeature[] = [
  { id: 'sf-1', title: 'Custom Liquid Themes', description: 'Fully customized Shopify themes built from scratch with Liquid templating for unique brand experiences.', icon: 'Palette', color: '#22c55e' },
  { id: 'sf-2', title: 'Checkout Optimization', description: 'Streamlined checkout flows that reduce cart abandonment and increase conversion rates.', icon: 'CreditCard', color: '#0ea5e9' },
  { id: 'sf-3', title: 'App Integrations', description: 'Custom Shopify app development and third-party integrations for enhanced store functionality.', icon: 'Plug', color: '#a855f7' },
  { id: 'sf-4', title: 'Performance Tuning', description: 'Speed optimization for Shopify stores including image optimization and script management.', icon: 'Zap', color: '#f59e0b' },
  { id: 'sf-5', title: 'SEO & Analytics', description: 'Technical SEO implementation and analytics setup for data-driven growth.', icon: 'BarChart3', color: '#00e5c8' },
  { id: 'sf-6', title: 'Theme Migration', description: 'Seamless migration from older themes to modern, performant Shopify Online Store 2.0.', icon: 'RefreshCw', color: '#ec4899' },
]

export function getShopifyFeatures(): ShopifyFeature[] {
  return load(KEYS.shopifyFeatures, defaultShopifyFeatures)
}

export function saveShopifyFeatures(data: ShopifyFeature[]): void {
  save(KEYS.shopifyFeatures, data)
}

export function addShopifyFeature(feature: Omit<ShopifyFeature, 'id'>): ShopifyFeature {
  const newFeature: ShopifyFeature = { ...feature, id: 'sf-' + generateId() }
  const all = getShopifyFeatures()
  all.push(newFeature)
  saveShopifyFeatures(all)
  return newFeature
}

export function updateShopifyFeature(id: string, updates: Partial<ShopifyFeature>): void {
  const all = getShopifyFeatures()
  const idx = all.findIndex((f) => f.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates }
    saveShopifyFeatures(all)
  }
}

export function deleteShopifyFeature(id: string): void {
  saveShopifyFeatures(getShopifyFeatures().filter((f) => f.id !== id))
}

// ============================================================
// Export / Import all data
// ============================================================
export function exportAllData(): string {
  const data = {
    projects: getProjects(),
    services: getServices(),
    testimonials: getTestimonials(),
    experience: getExperience(),
    skills: getSkills(),
    shopifyFeatures: getShopifyFeatures(),
    exportedAt: new Date().toISOString(),
  }
  return JSON.stringify(data, null, 2)
}

export function importAllData(json: string): boolean {
  try {
    const data = JSON.parse(json)
    if (data.projects) saveProjects(data.projects)
    if (data.services) saveServices(data.services)
    if (data.testimonials) saveTestimonials(data.testimonials)
    if (data.experience) saveExperience(data.experience)
    if (data.skills) saveSkills(data.skills)
    if (data.shopifyFeatures) saveShopifyFeatures(data.shopifyFeatures)
    return true
  } catch {
    return false
  }
}

export function resetAllData(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}
