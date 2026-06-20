'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Briefcase, Compass, GraduationCap, Handshake, Menu, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const roleData = [
  { title: 'Student', icon: GraduationCap, description: 'Access internships, learning resources, and mentorship', color: 'from-amber-400/12 to-cyan-400/8' },
  { title: 'Startup', icon: Sparkles, description: 'Post tasks, build teams, and scale your vision', color: 'from-cyan-400/12 to-sky-500/10' },
  { title: 'Professional', icon: Briefcase, description: 'Find freelance opportunities and grow your career', color: 'from-slate-200/8 to-amber-300/10' },
  { title: 'Investor', icon: Compass, description: 'Discover promising startups and investment opportunities', color: 'from-emerald-400/10 to-cyan-400/10' },
  { title: 'Mentor', icon: Handshake, description: 'Guide the next generation of innovators', color: 'from-amber-400/10 to-orange-400/10' },
]

const features = [
  { title: 'Curated Discovery', description: 'Find relevant people, roles, and opportunities without digging through noise.' },
  { title: 'AI Guidance', description: 'Get role-aware suggestions for next actions, learning, and outreach.' },
  { title: 'Professional Profiles', description: 'Present your work with clarity so the right collaborators notice quickly.' },
  { title: 'Collaboration Workflows', description: 'Move from interest to action with messaging, matching, and shared momentum.' },
  { title: 'Cross-Ecosystem Network', description: 'Bring students, founders, experts, and investors into one connected system.' },
]

const steps = [
  { number: '1', title: 'Sign Up', description: 'Create your account and select your role' },
  { number: '2', title: 'Complete Profile', description: 'Add your skills, experience, and goals' },
  { number: '3', title: 'Explore', description: 'Discover opportunities tailored to you' },
  { number: '4', title: 'Connect', description: 'Network and collaborate with the community' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 z-50 w-full border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/25 via-amber-200/10 to-cyan-300/10 shadow-[0_10px_40px_rgba(215,181,109,0.12)]" />
            <span className="text-lg font-semibold tracking-[0.18em] text-slate-100">INOLAS</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition-colors hover:text-white">Platform</a>
            <a href="#roles" className="transition-colors hover:text-white">Roles</a>
            <a href="#process" className="transition-colors hover:text-white">Process</a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full text-slate-200 hover:bg-white/8"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/auth/login">
              <Button variant="ghost" className="rounded-full px-5 text-slate-200 hover:bg-white/6 hover:text-white">Log In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="rounded-full border border-amber-300/20 bg-primary px-5 text-primary-foreground hover:bg-[#e0c07d]">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[4.5rem] z-40 border-b border-white/8 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6 text-sm text-slate-300">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 transition-colors hover:text-white">Platform</a>
              <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="py-2 transition-colors hover:text-white">Roles</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="py-2 transition-colors hover:text-white">Process</a>
              <div className="mt-2 flex flex-col gap-3">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full rounded-full text-slate-200 hover:bg-white/6 hover:text-white">Log In</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full border border-amber-300/20 bg-primary text-primary-foreground hover:bg-[#e0c07d]">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-20 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute right-[10%] top-28 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-white/4 px-4 py-2 text-sm text-amber-100/90">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              Where ideas meet execution
            </div>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-4xl font-semibold leading-[0.96] text-balance text-white sm:text-5xl lg:text-7xl">
                Innovation Never Off, <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-cyan-200 bg-clip-text text-transparent">Leads A Success.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                INOLAS brings students, founders, professionals, mentors, and investors into one professional ecosystem with cleaner discovery, stronger profiles, and AI support where it actually helps.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="h-12 rounded-full border border-amber-200/10 bg-primary px-7 text-base text-primary-foreground hover:bg-[#e0c07d]">
                  Build Your Profile
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 rounded-full border-white/12 bg-white/4 px-7 text-base text-slate-100 hover:bg-white/8">
                Explore Opportunities
              </Button>
            </div>
            <div className="grid max-w-2xl grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              {['Role-based dashboards', 'Curated matches', 'Human-looking profiles'].map(item => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-slate-200">{item}</div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/4 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/8 bg-slate-950/70 p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Opportunity Feed</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Designed for momentum</h2>
                  </div>
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">Live AI insights</div>
                </div>
                <div className="space-y-4">
                  {[
                    ['Frontend internship', 'Matched to React + UI strengths', '92% fit'],
                    ['Mentor introduction', 'Product design leader available', 'New'],
                    ['Startup collaboration', 'Hiring for product and growth', 'Priority'],
                  ].map(([title, subtitle, badge]) => (
                    <div key={title} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <h3 className="font-medium text-white">{title}</h3>
                        <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">{badge}</span>
                      </div>
                      <p className="text-sm leading-6 text-slate-300">{subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-amber-200/70">Platform</p>
            <h2 className="mb-6 text-4xl font-semibold text-white sm:text-5xl">A product surface with structure, not clutter</h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">Every major action feels intentional: discover, evaluate, connect, and move forward without the usual platform chaos.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full rounded-[1.75rem] border-white/8 bg-white/4 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/20 hover:bg-white/6 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
                  <div className="mb-6 h-12 w-12 rounded-2xl border border-amber-300/12 bg-gradient-to-br from-amber-300/18 to-cyan-300/10" />
                  <h3 className="mb-3 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="process" className="border-t border-white/8 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-amber-200/70">Process</p>
            <h2 className="mb-6 text-4xl font-semibold text-white sm:text-5xl">From sign-up to meaningful connection</h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">The flow is simple on purpose, with clear steps and enough guidance to help people actually finish the journey.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {steps.map((step, i) => (
              <motion.div key={i} variants={itemVariants} className="relative">
                <div className="flex flex-col items-center rounded-[1.75rem] border border-white/8 bg-white/3 px-6 py-8 text-center">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-primary text-sm font-bold text-primary-foreground shadow-[0_10px_30px_rgba(215,181,109,0.18)]">{step.number}</div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{step.description}</p>
                </div>
                {i < steps.length - 1 && <div className="absolute left-[68%] top-7 hidden h-px w-[34%] bg-gradient-to-r from-amber-300/30 to-transparent md:block" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="roles" className="border-t border-white/8 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-amber-200/70">Roles</p>
            <h2 className="mb-6 text-4xl font-semibold text-white sm:text-5xl">Specialized experiences for every participant</h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">One platform, different priorities. Each role gets a more relevant surface and clearer next steps.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {roleData.map((role, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className={`h-full rounded-[1.75rem] border-white/8 bg-gradient-to-br ${role.color} p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/16`}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35">
                    <role.icon className="size-5 text-amber-200" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{role.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{role.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/8 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-gradient-to-r from-white/6 to-white/3 px-8 py-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.22)] sm:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-amber-200/70">Start here</p>
            <h2 className="mb-6 text-4xl font-semibold text-white sm:text-5xl">Make the platform feel like your professional home base</h2>
            <p className="mb-10 text-lg leading-8 text-slate-300">Join INOLAS to present your work better, find stronger matches faster, and grow inside a more coordinated ecosystem.</p>
            <Link href="/auth/signup">
              <Button size="lg" className="h-12 rounded-full border border-amber-200/10 bg-primary px-10 text-lg text-primary-foreground hover:bg-[#e0c07d]">Get Started Now</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-slate-400">
          <p>&copy; 2024 INOLAS. Where Ideas Meet Opportunity.</p>
        </div>
      </footer>
    </div>
  )
}
