'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchAPI } from '@/lib/api'
import Link from 'next/link'
import { motion } from 'framer-motion'

const roles = [
  {
    id: 'student',
    name: 'Student',
    description: 'Learn, intern, and grow',
    icon: '🎓',
  },
  {
    id: 'startup',
    name: 'Entrepreneur / Startup',
    description: 'Build and scale',
    icon: '🚀',
  },
  {
    id: 'professional',
    name: 'Professional / Freelancer',
    description: 'Find opportunities',
    icon: '💼',
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'Discover opportunities',
    icon: '💰',
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Guide others',
    icon: '🌟',
  },
]

export default function SignupPage() {
  const [step, setStep] = useState<'role' | 'details'>('role')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setStep('details')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setIsLoading(true)
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole
      }

      const data = await fetchAPI('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('userRole', selectedRole || 'student')
      localStorage.setItem('userName', data.user.name)

      window.location.href = `/dashboard/${selectedRole}`
    } catch (error) {
      console.error('[v0] Signup error:', error)
      alert(error instanceof Error ? error.message : "Signup failed")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-[14%] top-[18%] h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[14%] right-[10%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <motion.div
        className="w-full max-w-md rounded-[2rem] border border-white/8 bg-white/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/25 to-cyan-300/10" />
            <span className="text-lg font-semibold tracking-[0.18em] text-white">INOLAS</span>
          </Link>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-200/70">Create account</p>
          <h1 className="text-2xl sm:text-4xl font-semibold mb-3 text-white">Join the ecosystem</h1>
          <p className="text-lg text-slate-300">Choose your role and start with a cleaner, more professional workspace.</p>
        </div>

        {step === 'role' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white">Select your role</h2>
            <div className="space-y-4">
              {roles.map(role => (
                <motion.button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="w-full text-left p-5 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:border-amber-300/18 hover:bg-white/7 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{role.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white text-base">{role.name}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{role.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Details Form */}
        {step === 'details' && selectedRole && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setStep('role')}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <span>←</span> Back to role selection
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-base">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-11 rounded-xl border-white/8 bg-white/4 text-base"
                  required
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-base">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-11 rounded-xl border-white/8 bg-white/4 text-base"
                  required
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-base">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-11 rounded-xl border-white/8 bg-white/4 text-base"
                  required
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="h-11 rounded-xl border-white/8 bg-white/4 text-base"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-xl border border-amber-200/10 bg-primary text-base font-semibold text-primary-foreground transition-all hover:bg-[#e0c07d]"
              >
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-amber-200 hover:text-amber-100 font-semibold transition-colors">
                Log In
              </Link>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
