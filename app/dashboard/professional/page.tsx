'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { AIQuickActions } from '@/components/ai-quick-actions'
import { AISuggestionsCard } from '@/components/ai-suggestions-card'
import { motion } from 'framer-motion'
import { Briefcase, Clock, DollarSign, Star } from 'lucide-react'

const activeProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    client: 'StartupX Inc.',
    status: 'In Progress',
    completion: 65,
    budget: '₹80,000',
    deadline: 'Apr 15',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    client: 'TechVentures',
    status: 'In Progress',
    completion: 40,
    budget: '₹1,20,000',
    deadline: 'May 20',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'UI/UX Redesign',
    client: 'Creative Agency',
    status: 'In Progress',
    completion: 85,
    budget: '₹45,000',
    deadline: 'Apr 1',
    priority: 'High',
  },
]

const availableGigs = [
  {
    id: 1,
    title: 'Website Maintenance',
    company: 'Local Business Co.',
    rate: '₹500/hour',
    hours: '5-10 hrs/week',
    skills: ['Web Development', 'HTML/CSS', 'JavaScript'],
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Freelance Designer',
    company: 'Design Studio',
    rate: '₹800/hour',
    hours: '15-20 hrs/week',
    skills: ['Graphic Design', 'Adobe XD', 'UI Design'],
    rating: 4.8,
  },
]

const stats = [
  {
    label: 'Active Projects',
    value: '3',
    icon: Briefcase,
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    label: 'Hours This Month',
    value: '120',
    icon: Clock,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    label: 'Total Earnings',
    value: '₹2.45L',
    icon: DollarSign,
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    label: 'Average Rating',
    value: '4.9',
    icon: Star,
    color: 'from-cyan-500/20 to-blue-500/20',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function ProfessionalDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="professional" />
      <div className="lg:ml-72">
        <DashboardNavbar userName="Alex Kumar" />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Alex! 💼</h1>
            <p className="text-muted-foreground">Manage your freelance projects and opportunities</p>
          </motion.div>

          <AIQuickActions actions={[
            { id: 1, label: 'Best gigs to apply' },
            { id: 2, label: 'Skill upgrades' },
            { id: 3, label: 'Pricing tips' }
          ]} />

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className={`p-6 bg-gradient-to-br ${stat.color} border-border`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-muted-foreground text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/10">
                        <Icon className="text-indigo-400" size={20} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Active Projects */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Active Projects</h2>
                <Button variant="outline" className="border-border">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {activeProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-5 border-border hover:border-primary/50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.priority === 'High'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {project.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{project.client}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{project.budget}</p>
                          <p className="text-xs text-muted-foreground">{project.deadline}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-1">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.completion}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{project.completion}% Complete</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Available Gigs */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Available Gigs</h2>

              <div className="space-y-4">
                {availableGigs.map((gig, i) => (
                  <motion.div
                    key={gig.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-4 border-border hover:border-primary/50 transition-colors">
                      <div className="mb-3">
                        <h3 className="font-semibold mb-1">{gig.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{gig.company}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Star size={14} className="text-yellow-500" />
                          <span className="text-xs font-semibold">{gig.rating}</span>
                        </div>
                      </div>

                      <div className="mb-3 pb-3 border-b border-border">
                        <p className="text-sm font-semibold text-primary mb-1">{gig.rate}</p>
                        <p className="text-xs text-muted-foreground">{gig.hours}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {gig.skills.slice(0, 2).map(skill => (
                          <span
                            key={skill}
                            className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <Button size="sm" className="w-full text-xs h-7 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                        Apply Now
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Earnings summary */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <Card className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Earning Insights</h3>
                  <p className="text-muted-foreground mb-4">Track your income and performance trends</p>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    View Details
                  </Button>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </Card>

            <AISuggestionsCard
              title="AI Recommended Work"
              items={[
                { id: 1, title: 'Senior React Developer Gig', subtitle: 'Match based on your recent delivery', badge: '99% Match' },
                { id: 2, title: 'Increase hourly rate to ₹900', subtitle: 'Based on market demand for your skills', badge: 'Pricing' }
              ]}
            />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
