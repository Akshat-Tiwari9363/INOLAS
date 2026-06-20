'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchAPI } from '@/lib/api'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('userRole', data.user.role)
      localStorage.setItem('userName', data.user.name)

      window.location.href = `/dashboard/${data.user.role}`
    } catch (error) {
      console.error('[v0] Login error:', error)
      alert(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[18%] h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute right-[10%] top-[24%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>
      <motion.div
        className="w-full max-w-md rounded-[2rem] border border-white/8 bg-white/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/25 to-cyan-300/10" />
            <span className="text-lg font-semibold tracking-[0.18em] text-white">INOLAS</span>
          </Link>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-200/70">Member access</p>
          <h1 className="mb-2 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="text-slate-300">Sign in to continue building inside the ecosystem.</p>
        </div>

        {/* Login Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-white/8 bg-white/4"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-white/8 bg-white/4"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-xl border border-amber-200/10 bg-primary font-semibold text-primary-foreground transition-all hover:bg-[#e0c07d] disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-300">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-amber-200 hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
