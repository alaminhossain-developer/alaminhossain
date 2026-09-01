'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('dashboard_auth') === 'true') {
      router.replace('/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        sessionStorage.setItem('dashboard_auth', 'true')
        router.replace('/dashboard')
      } else {
        setError('Invalid password')
        setPassword('')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-5">
            <span className="text-xl font-bold text-cyan-400">AM</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Portfolio Dashboard</h1>
          <p className="text-xs text-white/30 mt-1">Enter password to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/80 text-sm focus:outline-none focus:border-cyan-400/40 transition-colors placeholder-white/20"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking...' : 'Enter Dashboard'}
          </button>
        </form>

        <p className="text-center text-[10px] text-white/15 mt-8">
          Protected area — authorized access only
        </p>
      </div>
    </div>
  )
}
