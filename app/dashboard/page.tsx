'use client'

import { useState, useEffect, useCallback } from 'react'
import { compressImage, uploadImage, getBase64Size } from '@/lib/image-utils'
import { useRouter } from 'next/navigation'
import {
  getProjects, saveProjects, addProject, updateProject, deleteProject,
  getServices, saveServices, addService, updateService, deleteService,
  getTestimonials, saveTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
  getExperience, saveExperience, addExperience, updateExperience, deleteExperience,
  getSkills, saveSkills, addSkill, updateSkill, deleteSkill,
  getShopifyFeatures, saveShopifyFeatures, addShopifyFeature, updateShopifyFeature, deleteShopifyFeature,
  getApps, saveApps, addApp, updateApp, deleteApp,
  getArticles, saveArticles, addArticle, updateArticle, deleteArticle,
  getProfile, saveProfile,
  exportAllData, importAllData, resetAllData, saveAllToGitHub, loadAllFromGitHub,
} from '@/lib/store'
import type { Project, Service, Testimonial, Experience, SkillItem, Profile } from '@/lib/data'
import type { ShopifyFeature, App, Article } from '@/lib/store'

type Tab = 'profile' | 'projects' | 'testimonials' | 'services' | 'experience' | 'skills' | 'shopify' | 'apps' | 'articles' | 'data'

const tabs: { key: Tab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'projects', label: 'Projects' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'services', label: 'Services' },
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'shopify', label: 'Shopify Features' },
  { key: 'apps', label: 'Apps' },
  { key: 'articles', label: 'Articles' },
  { key: 'data', label: 'Data' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [refreshKey, setRefreshKey] = useState(0)
  const [saved, setSaved] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [authed, setAuthed] = useState(false)
  const [loadingGitHub, setLoadingGitHub] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('dashboard_auth') !== 'true') {
      router.replace('/dashboard/login')
    } else {
      setAuthed(true)
    }
  }, [router])

  // Auto-load from GitHub if localStorage is empty (incognito / new device)
  useEffect(() => {
    if (!authed) return
    const hasData = typeof window !== 'undefined' && localStorage.getItem('portfolio_projects') !== null
    if (!hasData) {
      setLoadingGitHub(true)
      loadAllFromGitHub().then((ok) => {
        setLoadingGitHub(false)
        if (ok) setRefreshKey((k) => k + 1)
      })
    }
  }, [authed])

  const flash = (msg?: string) => {
    setToastMsg(msg || 'Saved successfully')
    setToastType('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const flashError = (msg: string) => {
    setToastMsg(msg)
    setToastType('error')
    setSaved(true)
    setTimeout(() => setSaved(false), 4000)
  }

  const logout = () => {
    sessionStorage.removeItem('dashboard_auth')
    router.replace('/dashboard/login')
  }

  if (!authed) return null

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      {/* Loading from GitHub banner */}
      {loadingGitHub && (
        <div className="fixed top-0 left-0 right-0 z-[9998] px-5 py-2 bg-cyan-500/10 border-b border-cyan-500/20">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-cyan-400">Loading data from GitHub...</span>
          </div>
        </div>
      )}
      {/* Toast notification */}
      {saved && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-300 ${
          toastType === 'error'
            ? 'bg-red-500/20 border border-red-500/30 shadow-red-500/10'
            : 'bg-emerald-500/20 border border-emerald-500/30 shadow-emerald-500/10'
        }`}>
          <div className="flex items-center gap-2">
            {toastType === 'error' ? (
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
            <span className={`text-sm font-medium ${toastType === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>{toastMsg}</span>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Portfolio Dashboard</h1>
            <p className="text-xs text-white/30 font-light">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
            <a
              href="/"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              ← View Site
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.04] px-6">
        <div className="max-w-7xl mx-auto flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'profile' && <ProfileTab key={refreshKey} onSaved={flash} onError={flashError} />}
        {activeTab === 'projects' && <ProjectsTab key={refreshKey} onSaved={flash} onError={flashError} />}
        {activeTab === 'testimonials' && <TestimonialsTab key={refreshKey} onSaved={flash} />}
        {activeTab === 'services' && <ServicesTab key={refreshKey} onSaved={flash} />}
        {activeTab === 'experience' && <ExperienceTab key={refreshKey} onSaved={flash} />}
        {activeTab === 'skills' && <SkillsTab key={refreshKey} onSaved={flash} />}
        {activeTab === 'shopify' && <ShopifyTab key={refreshKey} onSaved={flash} />}
        {activeTab === 'apps' && <AppsTab key={refreshKey} onSaved={flash} onError={flashError} />}
        {activeTab === 'articles' && <ArticlesTab key={refreshKey} onSaved={flash} onError={flashError} />}
        {activeTab === 'data' && <DataTab onRefresh={() => setRefreshKey((k) => k + 1)} />}
      </div>
    </div>
  )
}

// ============================================================
// Shared form components
// ============================================================
function Field({ label, value, onChange, type = 'text', rows, placeholder }: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  rows?: number
  placeholder?: string
}) {
  const base = 'w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/80 text-sm font-light focus:outline-none focus:border-cyan-400/40 transition-colors placeholder-white/20'
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-white/40 font-medium">{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={`${base} resize-none`} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={base} placeholder={placeholder} />
      )}
    </div>
  )
}

function Btn({ children, onClick, variant = 'primary', small }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'danger' | 'ghost'
  small?: boolean
}) {
  const colors = {
    primary: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/30',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20',
    ghost: 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08] border-white/[0.06]',
  }

  return (
    <button
      onClick={onClick}
      className={`border rounded-lg font-medium transition-colors ${colors[variant]} ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
    >
      {children}
    </button>
  )
}

function PhotoUpload({ label, desc, value, onChange, onError }: {
  label: string
  desc: string
  value: string
  onChange: (url: string) => void
  onError: (msg: string) => void
}) {
  const [imgError, setImgError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { setImgError(false) }, [value])

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-white/40 font-medium">{label}</label>
      <p className="text-[10px] text-white/25">{desc}</p>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative group">
            {imgError ? (
              <div className="w-24 h-24 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-500/[0.05] flex flex-col items-center justify-center gap-1">
                <svg className="w-5 h-5 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-[9px] text-cyan-400/40">Not deployed yet</span>
                <span className="text-[8px] text-white/20">Wait 2-3 min</span>
              </div>
            ) : (
              <img
                src={value}
                alt={label}
                className="w-24 h-24 object-cover rounded-xl border border-white/[0.06]"
                onError={() => setImgError(true)}
              />
            )}
            <button
              onClick={() => onChange('')}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >×</button>
            <span className="absolute bottom-1 left-1 text-[8px] bg-black/60 text-white/40 px-1 rounded z-10">{getBase64Size(value)}</span>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] text-white/40 text-xs cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors w-full">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Upload
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setLoading(true)
                try {
                  const url = await uploadImage(file, 800, 0.75)
                  onChange(url)
                } catch (err) {
                  try {
                    const compressed = await compressImage(file, 800, 0.75)
                    onChange(compressed)
                  } catch (err2) {
                    onError('Failed to process image: ' + (err instanceof Error ? err.message : 'Unknown error'))
                  }
                } finally {
                  setLoading(false)
                }
              }}
            />
          </label>
        )}
      </div>
    </div>
  )
}


// ============================================================
// Profile Tab
// ============================================================
function ProfileTab({ onSaved, onError }: { onSaved: (msg?: string) => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState<Profile>({ name: '', tagline: '', bio: '', heroPhoto: '', aboutPhoto: '', techPhoto: '', email: '', location: '', github: '', linkedin: '', twitter: '', facebook: '', instagram: '', upwork: '', fiverr: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { setForm(getProfile()) }, [])

  const saveItem = async () => {
    try {
      saveProfile(form)
      setSaving(true)
      // Also persist to GitHub so data works across browsers
      try {
        await saveAllToGitHub()
      } catch {
        // Best effort — localStorage save still works locally
      }
      setSaving(false)
      onSaved('Profile saved & pushed to GitHub. Updates live in ~3-4 min.')
    } catch (err) {
      setSaving(false)
      onError('Save failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Profile</h2>
        <Btn onClick={saveItem}>{saving ? 'Saving & Pushing...' : 'Save Profile'}</Btn>
      </div>

      <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
        </div>
        <Field label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} rows={3} />

        {/* Social Media URLs */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white/60">Social Media URLs</h3>
          <p className="text-[10px] text-white/25">Paste full URLs. Leave blank to hide from the site.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="GitHub" value={form.github} onChange={(v) => setForm({ ...form, github: v })} placeholder="https://github.com/username" />
            <Field label="LinkedIn" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} placeholder="https://linkedin.com/in/username" />
            <Field label="X (Twitter)" value={form.twitter} onChange={(v) => setForm({ ...form, twitter: v })} placeholder="https://x.com/username" />
            <Field label="Facebook" value={form.facebook} onChange={(v) => setForm({ ...form, facebook: v })} placeholder="https://facebook.com/username" />
            <Field label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} placeholder="https://instagram.com/username" />
            <Field label="Upwork" value={form.upwork} onChange={(v) => setForm({ ...form, upwork: v })} placeholder="https://upwork.com/freelancers/username" />
            <Field label="Fiverr" value={form.fiverr} onChange={(v) => setForm({ ...form, fiverr: v })} placeholder="https://fiverr.com/username" />
          </div>
        </div>

        {/* Photo uploads — one per section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            { key: 'heroPhoto' as const, label: 'Hero Photo', desc: 'Terminal frame in Hero section' },
            { key: 'aboutPhoto' as const, label: 'About Photo', desc: 'Bio section right column' },
            { key: 'techPhoto' as const, label: 'Technology Photo', desc: 'Center of tech orbital map' },
          ]).map(({ key, label, desc }) => (
            <PhotoUpload
              key={key}
              label={label}
              desc={desc}
              value={form[key]}
              onChange={(url) => setForm({ ...form, [key]: url })}
              onError={onError}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Projects Tab
// ============================================================
function ProjectsTab({ onSaved, onError }: { onSaved: (msg?: string) => void; onError: (msg: string) => void }) {
  const [items, setItems] = useState<Project[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', category: '', year: '2025', description: '', longDescription: '', technologies: '', liveUrl: '#', color: '#0ea5e9', image: '', screenshots: [] as string[], selected: false })

  useEffect(() => { setItems(getProjects()) }, [])

  const startNew = () => {
    setEditing('new')
    setForm({ title: '', category: 'WordPress', year: '2025', description: '', longDescription: '', technologies: '', liveUrl: '#', color: '#0ea5e9', image: '', screenshots: [], selected: false })
  }

  const saveItem = () => {
    try {
      const data = { ...form, technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean) }
      let updated: Project[]
      if (editing === 'new') {
        const p = addProject(data)
        updated = [...items, p]
      } else if (editing) {
        updateProject(editing, data)
        updated = items.map((p) => p.id === editing ? { ...p, ...data } : p)
      } else {
        return
      }
      setItems(updated)
      setEditing(null)
      saveProjects(updated)
      onSaved()
    } catch (err) {
      console.error('Save failed:', err)
      onError('Save failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const remove = (id: string) => {
    try {
      deleteProject(id)
      const updated = items.filter((p) => p.id !== id)
      setItems(updated)
      saveProjects(updated)
      onSaved()
    } catch (err) {
      console.error('Delete failed:', err)
      onError('Delete failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Projects ({items.length})</h2>
        <Btn onClick={startNew}>+ Add Project</Btn>
      </div>

      {/* Form */}
      {editing && (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
            <Field label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
            <Field label="Color" value={form.color} onChange={(v) => setForm({ ...form, color: v })} type="color" />
            <Field label="Live URL" value={form.liveUrl} onChange={(v) => setForm({ ...form, liveUrl: v })} />
            <Field label="Technologies (comma-separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-white/40 font-medium">Featured on Homepage</label>
            <button
              type="button"
              onClick={() => setForm({ ...form, selected: !form.selected })}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.selected ? 'bg-cyan-500' : 'bg-white/[0.08]'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.selected ? 'left-5.5 translate-x-0' : 'left-0.5'}`} style={{ left: form.selected ? '22px' : '2px' }} />
            </button>
            <span className="text-[10px] text-white/25">{form.selected ? 'Shows on homepage (max 4)' : 'Hidden from homepage'}</span>
          </div>
          <Field label="Short Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
          <Field label="Long Description" value={form.longDescription} onChange={(v) => setForm({ ...form, longDescription: v })} rows={3} />
          
          {/* Screenshots Upload */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/40 font-medium">Website Screenshots</label>
            <p className="text-[10px] text-white/25">Upload screenshots (auto-compressed). First shows in browser frame. All show in project popup.</p>
            {form.screenshots.length > 0 && (
              <p className="text-[10px] text-white/20">{form.screenshots.length} screenshot{form.screenshots.length > 1 ? 's' : ''} — {getBase64Size(form.screenshots.join(''))} total</p>
            )}
            <div className="flex flex-wrap gap-3 items-center">
              {form.screenshots.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img src={src} alt={`Screenshot ${idx + 1}`} className="h-16 w-28 object-cover rounded border border-white/[0.06]" />
                  <span className="absolute top-0.5 left-1 text-[9px] bg-black/60 text-white/60 px-1 rounded">{idx + 1}</span>
                  <span className="absolute bottom-0.5 left-1 text-[8px] bg-black/60 text-white/40 px-1 rounded">{getBase64Size(src)}</span>
                  <button
                    onClick={() => setForm({ ...form, screenshots: form.screenshots.filter((_, i) => i !== idx) })}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >×</button>
                </div>
              ))}
              <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] text-white/40 text-xs cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Screenshot
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const url = await uploadImage(file, 1200, 0.65)
                      setForm({ ...form, screenshots: [...form.screenshots, url] })
                    } catch (err) {
                      // Fallback to base64 if API unavailable
                      try {
                        const compressed = await compressImage(file, 1200, 0.65)
                        setForm({ ...form, screenshots: [...form.screenshots, compressed] })
                      } catch (err2) {
                        alert('Failed to process image: ' + (err instanceof Error ? err.message : 'Unknown error'))
                      }
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <Btn onClick={saveItem}>Save</Btn>
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
            <div className="w-2 h-8 rounded-full" style={{ background: p.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 truncate">{p.title}</div>
              <div className="text-xs text-white/30">{p.category} · {p.year}</div>
            </div>
            {p.selected && (
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">Featured</span>
            )}
            <Btn small onClick={() => { setEditing(p.id); setForm({ ...p, technologies: p.technologies.join(', '), screenshots: p.screenshots || [], selected: p.selected || false }) }}>Edit</Btn>
            {p.screenshots && p.screenshots.length > 0 && (
              <div className="flex gap-0.5">
                {p.screenshots.slice(0, 3).map((src, idx) => (
                  <div key={idx} className="w-6 h-4 rounded overflow-hidden border border-white/[0.06]"><img src={src} alt="" className="w-full h-full object-cover" /></div>
                ))}
                {p.screenshots.length > 3 && <span className="text-[9px] text-white/25 self-center">+{p.screenshots.length - 3}</span>}
              </div>
            )}
            <Btn small variant="danger" onClick={() => remove(p.id)}>Delete</Btn>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Testimonials Tab
// ============================================================
function TestimonialsTab({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ quote: '', author: '', role: '', company: '', projectType: '' })

  useEffect(() => { setItems(getTestimonials()) }, [])



  const startNew = () => {
    setEditing('new')
    setForm({ quote: '', author: '', role: '', company: '', projectType: '' })
  }

  const saveItem = () => {
    let updated: Testimonial[]
    if (editing === 'new') {
      const t = addTestimonial(form)
      updated = [...items, t]
    } else if (editing) {
      updateTestimonial(editing, form)
      updated = items.map((t) => t.id === editing ? { ...t, ...form } : t)
    } else {
      return
    }
    setItems(updated)
    setEditing(null)
    saveTestimonials(updated)
    onSaved()
  }

  const remove = (id: string) => {
    deleteTestimonial(id)
    const updated = items.filter((t) => t.id !== id)
    setItems(updated)
    saveTestimonials(updated)
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Testimonials ({items.length})</h2>
        <Btn onClick={startNew}>+ Add Testimonial</Btn>
      </div>

      {editing && (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <Field label="Quote" value={form.quote} onChange={(v) => setForm({ ...form, quote: v })} rows={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Author" value={form.author} onChange={(v) => setForm({ ...form, author: v })} />
            <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
            <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
            <Field label="Project Type" value={form.projectType} onChange={(v) => setForm({ ...form, projectType: v })} />
          </div>
          <div className="flex gap-3">
            <Btn onClick={saveItem}>Save</Btn>
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
            <p className="text-sm text-white/60 mb-2 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/30">{t.author} · {t.company}</div>
              <div className="flex gap-2">
                <Btn small onClick={() => { setEditing(t.id); setForm({ ...t }) }}>Edit</Btn>
                <Btn small variant="danger" onClick={() => remove(t.id)}>Delete</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Services Tab
// ============================================================
function ServicesTab({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<Service[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ number: '01', title: '', description: '', icon: 'Code', features: '' })

  useEffect(() => { setItems(getServices()) }, [])



  const startNew = () => {
    setEditing('new')
    setForm({ number: String(items.length + 1).padStart(2, '0'), title: '', description: '', icon: 'Code', features: '' })
  }

  const saveItem = () => {
    const data = { ...form, features: form.features.split(',').map((f) => f.trim()).filter(Boolean), technologies: [] as string[] }
    let updated: Service[]
    if (editing === 'new') {
      const s = addService(data)
      updated = [...items, s]
    } else if (editing) {
      updateService(editing, data)
      updated = items.map((s) => s.id === editing ? { ...s, ...data } : s)
    } else {
      return
    }
    setItems(updated)
    setEditing(null)
    saveServices(updated)
    onSaved()
  }

  const remove = (id: string) => {
    deleteService(id)
    const updated = items.filter((s) => s.id !== id)
    setItems(updated)
    saveServices(updated)
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Services ({items.length})</h2>
        <Btn onClick={startNew}>+ Add Service</Btn>
      </div>

      {editing && (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Number" value={form.number} onChange={(v) => setForm({ ...form, number: v })} />
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Icon" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
          <Field label="Features (comma-separated)" value={form.features} onChange={(v) => setForm({ ...form, features: v })} />
          <div className="flex gap-3">
            <Btn onClick={saveItem}>Save</Btn>
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
            <div className="text-2xl font-bold text-white/10 w-10">{s.number}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80">{s.title}</div>
              <div className="text-xs text-white/30 line-clamp-1">{s.description}</div>
            </div>
            <Btn small onClick={() => { setEditing(s.id); setForm({ ...s, features: s.features.join(', ') }) }}>Edit</Btn>
            <Btn small variant="danger" onClick={() => remove(s.id)}>Delete</Btn>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Experience Tab
// ============================================================
function ExperienceTab({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<Experience[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ role: '', company: '', period: '', description: '', technologies: '', current: false, highlights: '' })

  useEffect(() => { setItems(getExperience()) }, [])



  const startNew = () => {
    setEditing('new')
    setForm({ role: '', company: '', period: '', description: '', technologies: '', current: false, highlights: '' })
  }

  const saveItem = () => {
    const data = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      highlights: form.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
    }
    let updated: Experience[]
    if (editing === 'new') {
      const e = addExperience(data)
      updated = [...items, e]
    } else if (editing) {
      updateExperience(editing, data)
      updated = items.map((e) => e.id === editing ? { ...e, ...data } : e)
    } else {
      return
    }
    setItems(updated)
    setEditing(null)
    saveExperience(updated)
    onSaved()
  }

  const remove = (id: string) => {
    deleteExperience(id)
    const updated = items.filter((e) => e.id !== id)
    setItems(updated)
    saveExperience(updated)
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Experience ({items.length})</h2>
        <Btn onClick={startNew}>+ Add Experience</Btn>
      </div>

      {editing && (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
            <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
            <Field label="Period" value={form.period} onChange={(v) => setForm({ ...form, period: v })} />
            <div className="space-y-1.5">
              <label className="text-xs text-white/40 font-medium">Current?</label>
              <button
                onClick={() => setForm({ ...form, current: !form.current })}
                className={`w-full px-3 py-2 rounded-lg border text-sm text-left transition-colors ${
                  form.current ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400' : 'border-white/[0.06] bg-white/[0.04] text-white/30'
                }`}
              >
                {form.current ? 'Yes — Current Position' : 'No — Previous Position'}
              </button>
            </div>
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
          <Field label="Highlights (one per line)" value={form.highlights} onChange={(v) => setForm({ ...form, highlights: v })} rows={4} />
          <Field label="Technologies (comma-separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
          <div className="flex gap-3">
            <Btn onClick={saveItem}>Save</Btn>
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((e) => (
          <div key={e.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
            {e.current && <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80">{e.role}</div>
              <div className="text-xs text-white/30">{e.company} · {e.period}</div>
            </div>
            <Btn small onClick={() => { setEditing(e.id); setForm({ ...e, technologies: e.technologies.join(', '), highlights: e.highlights.join('\n') }) }}>Edit</Btn>
            <Btn small variant="danger" onClick={() => remove(e.id)}>Delete</Btn>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Skills Tab
// ============================================================
function SkillsTab({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<SkillItem[]>([])
  const [form, setForm] = useState({ name: '', category: 'core', level: 80 })

  useEffect(() => { setItems(getSkills()) }, [])

  const add = () => {
    if (!form.name) return
    addSkill(form)
    const updated = [...items, form as SkillItem]
    setItems(updated)
    setForm({ name: '', category: 'core', level: 80 })
    saveSkills(updated)
    onSaved()
  }

  const remove = (name: string) => {
    deleteSkill(name)
    const updated = items.filter((s) => s.name !== name)
    setItems(updated)
    saveSkills(updated)
    onSaved()
  }

  const categories = ['core', 'frontend', 'backend', 'tools', 'platforms']

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Skills ({items.length})</h2>

      {/* Add form */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Field label="Skill Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        </div>
        <div className="w-40">
          <label className="text-xs text-white/40 font-medium block mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/80 text-sm"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="w-24">
          <Field label="Level" value={String(form.level)} onChange={(v) => setForm({ ...form, level: Number(v) })} type="number" />
        </div>
        <Btn onClick={add}>Add</Btn>
      </div>

      {/* List */}
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <div key={s.name} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-sm">
            <span className="text-white/60">{s.name}</span>
            <span className="text-[10px] text-white/25 font-mono">{s.category}</span>
            <span className="text-[10px] text-cyan-400/60">{s.level}%</span>
            <button onClick={() => remove(s.name)} className="text-white/20 hover:text-red-400 ml-1">×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Shopify Features Tab
// ============================================================
function ShopifyTab({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<ShopifyFeature[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', description: '', icon: 'Zap', color: '#22c55e' })

  useEffect(() => { setItems(getShopifyFeatures()) }, [])

  const startNew = () => {
    setEditing('new')
    setForm({ title: '', description: '', icon: 'Zap', color: '#22c55e' })
  }

  const saveItem = () => {
    let updated: ShopifyFeature[]
    if (editing === 'new') {
      const f = addShopifyFeature(form)
      updated = [...items, f]
    } else if (editing) {
      updateShopifyFeature(editing, form)
      updated = items.map((f) => f.id === editing ? { ...f, ...form } : f)
    } else {
      return
    }
    setItems(updated)
    setEditing(null)
    saveShopifyFeatures(updated)
    onSaved()
  }

  const remove = (id: string) => {
    deleteShopifyFeature(id)
    const updated = items.filter((f) => f.id !== id)
    setItems(updated)
    saveShopifyFeatures(updated)
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Shopify Features ({items.length})</h2>
        <Btn onClick={startNew}>+ Add Feature</Btn>
      </div>

      {editing && (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Icon (Lucide name)" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />
            <Field label="Color" value={form.color} onChange={(v) => setForm({ ...form, color: v })} type="color" />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
          <div className="flex gap-3">
            <Btn onClick={saveItem}>Save</Btn>
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
            <div className="w-3 h-8 rounded-full" style={{ background: f.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80">{f.title}</div>
              <div className="text-xs text-white/30 line-clamp-1">{f.description}</div>
            </div>
            <Btn small onClick={() => { setEditing(f.id); setForm({ ...f }) }}>Edit</Btn>
            <Btn small variant="danger" onClick={() => remove(f.id)}>Delete</Btn>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Apps Tab
// ============================================================
function AppsTab({ onSaved, onError }: { onSaved: (msg?: string) => void; onError: (msg: string) => void }) {
  const [items, setItems] = useState<App[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', tagline: '', description: '', status: 'development' as App['status'], url: '', icon: '🚀', color: '#00d4e8', features: '', images: [] as string[] })

  useEffect(() => { setItems(getApps()) }, [])

  const startNew = () => {
    setEditing(null)
    setForm({ name: '', slug: '', tagline: '', description: '', status: 'development', url: '', icon: '🚀', color: '#00d4e8', features: '', images: [] })
  }

  const save = () => {
    try {
      const data = { ...form, features: form.features.split(',').map((s) => s.trim()).filter(Boolean) }
      if (editing) {
        updateApp(editing, data)
      } else {
        addApp(data)
      }
      setItems(getApps())
      startNew()
      setEditing(null)
      onSaved()
    } catch (err) {
      onError('Save failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const remove = (id: string) => {
    deleteApp(id)
    setItems(getApps())
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Apps</h2>
        <Btn onClick={startNew}>+ New App</Btn>
      </div>

      {editing !== null || form.name ? (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="App Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Slug (URL-friendly)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
            <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
            <Field label="URL" value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
            <Field label="Icon (emoji)" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />
            <div className="space-y-1.5">
              <label className="text-xs text-white/40 font-medium">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as App['status'] })} className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-white/[0.06] text-white text-sm">
                <option value="live">Live</option>
                <option value="development">In Development</option>
                <option value="planned">Planned</option>
              </select>
            </div>
            <Field label="Accent Color" value={form.color} onChange={(v) => setForm({ ...form, color: v })} />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
          <Field label="Features (comma separated)" value={form.features} onChange={(v) => setForm({ ...form, features: v })} />

          {/* Screenshots / Images */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/40 font-medium">App Screenshots / Images</label>
            <p className="text-[10px] text-white/25">Upload screenshots of your app. First image shows as the main preview. All show in the app detail page.</p>
            {form.images.length > 0 && (
              <p className="text-[10px] text-white/20">{form.images.length} image{form.images.length > 1 ? 's' : ''} — {getBase64Size(form.images.join(''))} total</p>
            )}
            <div className="flex flex-wrap gap-3 items-center">
              {form.images.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img src={src} alt={`Image ${idx + 1}`} className="h-16 w-28 object-cover rounded border border-white/[0.06]" />
                  <span className="absolute top-0.5 left-1 text-[9px] bg-black/60 text-white/60 px-1 rounded">{idx + 1}</span>
                  <span className="absolute bottom-0.5 left-1 text-[8px] bg-black/60 text-white/40 px-1 rounded">{getBase64Size(src)}</span>
                  <button
                    onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >×</button>
                </div>
              ))}
              <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] text-white/40 text-xs cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const url = await uploadImage(file, 1200, 0.65)
                      setForm({ ...form, images: [...form.images, url] })
                    } catch (err) {
                      try {
                        const compressed = await compressImage(file, 1200, 0.65)
                        setForm({ ...form, images: [...form.images, compressed] })
                      } catch (err2) {
                        alert('Failed to process image: ' + (err instanceof Error ? err.message : 'Unknown error'))
                      }
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Btn onClick={save}>{editing ? 'Update' : 'Add'} App</Btn>
            <Btn variant="ghost" onClick={() => { startNew(); setEditing(null) }}>Cancel</Btn>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {items.map((app) => (
          <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.015]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{app.icon}</span>
              <div>
                <div className="text-sm font-medium text-white/80">{app.name}</div>
                <div className="text-xs text-white/30">{app.tagline}</div>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded-full border" style={{ color: app.status === 'live' ? '#22c55e' : app.status === 'development' ? '#f59e0b' : '#8b5cf6', borderColor: app.status === 'live' ? '#22c55e30' : app.status === 'development' ? '#f59e0b30' : '#8b5cf630' }}>
                {app.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {app.images && app.images.length > 0 && (
                <div className="flex gap-0.5">
                  {app.images.slice(0, 3).map((src, idx) => (
                    <div key={idx} className="w-6 h-4 rounded overflow-hidden border border-white/[0.06]"><img src={src} alt="" className="w-full h-full object-cover" /></div>
                  ))}
                  {app.images.length > 3 && <span className="text-[9px] text-white/25 self-center">+{app.images.length - 3}</span>}
                </div>
              )}
              <Btn small onClick={() => { setEditing(app.id); setForm({ ...app, features: app.features.join(', '), images: app.images || [] }) }}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(app.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Articles Tab
// ============================================================
function ArticlesTab({ onSaved, onError }: { onSaved: (msg?: string) => void; onError: (msg: string) => void }) {
  const [items, setItems] = useState<Article[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'shopify' as Article['category'], tags: '', publishedAt: new Date().toISOString().split('T')[0], readTime: '5 min read', featured: false, coverImage: '' })

  useEffect(() => { setItems(getArticles()) }, [])

  const startNew = () => {
    setEditing(null)
    setForm({ title: '', slug: '', excerpt: '', content: '', category: 'shopify', tags: '', publishedAt: new Date().toISOString().split('T')[0], readTime: '5 min read', featured: false, coverImage: '' })
  }

  const save = () => {
    try {
      const data = { ...form, tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean) }
      if (editing) {
        updateArticle(editing, data)
      } else {
        addArticle(data)
      }
      setItems(getArticles())
      startNew()
      setEditing(null)
      onSaved()
    } catch (err) {
      onError('Save failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const remove = (id: string) => {
    deleteArticle(id)
    setItems(getArticles())
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Articles</h2>
        <Btn onClick={startNew}>+ New Article</Btn>
      </div>

      {editing !== null || form.title ? (
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Slug (URL-friendly)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
            <div className="space-y-1.5">
              <label className="text-xs text-white/40 font-medium">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Article['category'] })} className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-white/[0.06] text-white text-sm">
                <option value="shopify">Shopify</option>
                <option value="wordpress">WordPress</option>
                <option value="app">App</option>
                <option value="web">Web</option>
              </select>
            </div>
            <Field label="Read Time" value={form.readTime} onChange={(v) => setForm({ ...form, readTime: v })} />
            <Field label="Published Date" value={form.publishedAt} onChange={(v) => setForm({ ...form, publishedAt: v })} />
            <Field label="Tags (comma separated)" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
          </div>
          <Field label="Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} rows={2} />
          <div className="space-y-1.5">
            <label className="text-xs text-white/40 font-medium">Content (Markdown)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-white/[0.06] text-white text-sm font-mono resize-y" placeholder="Write article content in markdown..." />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-white/20" />
              Featured on homepage
            </label>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/40 font-medium">Cover Image</label>
            <p className="text-[10px] text-white/25">Shows at the top of the article and in the articles grid. Recommended: 1200x630px.</p>
            <div className="flex items-center gap-4">
              {form.coverImage ? (
                <div className="relative group">
                  <img src={form.coverImage} alt="Cover" className="w-40 h-24 object-cover rounded-lg border border-white/[0.06]" />
                  <button
                    onClick={() => setForm({ ...form, coverImage: '' })}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >×</button>
                  <span className="absolute bottom-1 left-1 text-[8px] bg-black/60 text-white/40 px-1 rounded">{getBase64Size(form.coverImage)}</span>
                </div>
              ) : (
                <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] text-white/40 text-xs cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Upload Cover Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      try {
                        const url = await uploadImage(file, 1200, 0.65)
                        setForm({ ...form, coverImage: url })
                      } catch (err) {
                        alert('Failed to process image: ' + (err instanceof Error ? err.message : 'Unknown error'))
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Btn onClick={save}>{editing ? 'Update' : 'Publish'} Article</Btn>
            <Btn variant="ghost" onClick={() => { startNew(); setEditing(null) }}>Cancel</Btn>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {items.map((article) => (
          <div key={article.id} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.015]">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-medium text-white/80">{article.title}</div>
                <div className="text-xs text-white/30">{article.category} · {article.readTime} · {article.publishedAt}</div>
              </div>
              {article.featured && (
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 rounded">Featured</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {article.coverImage && (
                <div className="w-10 h-6 rounded overflow-hidden border border-white/[0.06]"><img src={article.coverImage} alt="" className="w-full h-full object-cover" /></div>
              )}
              <Btn small onClick={() => { setEditing(article.id); setForm({ ...article, tags: article.tags.join(', ') }) }}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(article.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Data Tab (Export / Import / Reset)
// ============================================================
function DataTab({ onRefresh }: { onRefresh: () => void }) {
  const [importJson, setImportJson] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSaveToGitHub = async () => {
    setSaving(true)
    const ok = await saveAllToGitHub()
    setSaving(false)
    if (ok) {
      setMessage('All data saved to GitHub! Site will update in ~3-4 minutes.')
    } else {
      setMessage('Failed to save to GitHub.')
    }
    setTimeout(() => setMessage(''), 5000)
  }

  const handleExport = () => {
    const json = exportAllData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Data exported!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleImport = () => {
    if (!importJson.trim()) return
    const ok = importAllData(importJson)
    if (ok) {
      setMessage('Data imported successfully! Refresh to see changes.')
      setImportJson('')
      onRefresh()
    } else {
      setMessage('Invalid JSON data.')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const handleReset = () => {
    if (confirm('Reset all data to defaults? This cannot be undone.')) {
      resetAllData()
      onRefresh()
      setMessage('Data reset to defaults.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleClearScreenshots = () => {
    if (confirm('Remove all screenshots from all projects? Project data will be kept.')) {
      const projects = getProjects()
      const cleaned = projects.map((p) => ({ ...p, screenshots: [] }))
      saveProjects(cleaned)
      onRefresh()
      setMessage('All screenshots cleared. You can now re-upload compressed ones.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Data Management</h2>

      {message && (
        <div className="px-4 py-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-sm text-emerald-400">
          {message}
        </div>
      )}

      {/* Save to GitHub */}
      <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] space-y-4">
        <h3 className="text-sm font-semibold text-cyan-400">Save All to GitHub</h3>
        <p className="text-xs text-white/30">Save all portfolio data (profile, projects, services, articles, etc.) to GitHub. This makes your data visible to all visitors worldwide. Takes ~3-4 minutes to deploy.</p>
        <Btn onClick={handleSaveToGitHub}>{saving ? 'Saving...' : 'Save All to GitHub'}</Btn>
      </div>

      {/* Export */}
      <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
        <h3 className="text-sm font-semibold text-white/70">Export Data</h3>
        <p className="text-xs text-white/30">Download all portfolio data as a JSON file. Use this to backup or transfer data.</p>
        <Btn onClick={handleExport}>Export All Data</Btn>
      </div>

      {/* Import */}
      <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
        <h3 className="text-sm font-semibold text-white/70">Import Data</h3>
        <p className="text-xs text-white/30">Paste JSON data exported from this dashboard to restore or update content.</p>
        <textarea
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/60 text-xs font-mono focus:outline-none focus:border-cyan-400/40 resize-none"
          placeholder="Paste exported JSON here..."
        />
        <Btn onClick={handleImport}>Import Data</Btn>
      </div>

      {/* Clear Screenshots */}
      <div className="p-6 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] space-y-4">
        <h3 className="text-sm font-semibold text-amber-400">Clear Screenshots</h3>
        <p className="text-xs text-white/30">Remove all uploaded screenshots to free up storage space. Project data will be kept. Re-upload compressed screenshots after.</p>
        <Btn onClick={handleClearScreenshots} variant="danger">Clear All Screenshots</Btn>
      </div>

      {/* Reset */}
      <div className="p-6 rounded-xl border border-red-500/10 bg-red-500/[0.02] space-y-4">
        <h3 className="text-sm font-semibold text-red-400">Reset to Defaults</h3>
        <p className="text-xs text-white/30">Clear all custom data and revert to the original default content.</p>
        <Btn onClick={handleReset} variant="danger">Reset All Data</Btn>
      </div>
    </div>
  )
}
