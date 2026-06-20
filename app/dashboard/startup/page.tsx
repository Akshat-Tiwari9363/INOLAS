'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { AIQuickActions } from '@/components/ai-quick-actions'
import { AISuggestionsCard } from '@/components/ai-suggestions-card'
import { motion } from 'framer-motion'
import { Users, FileText, TrendingUp, Target } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager',
    status: 'online',
    avatar: 'SC',
  },
  {
    id: 2,
    name: 'Mike Johnson',
    role: 'Lead Developer',
    status: 'online',
    avatar: 'MJ',
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Designer',
    status: 'away',
    avatar: 'EW',
  },
]

const postedTasks = [
  {
    id: 1,
    title: 'Backend API Development',
    applicants: 12,
    budget: '₹50,000 - ₹80,000',
    deadline: 'Mar 30',
    status: 'Open',
    skills: ['Node.js', 'MongoDB', 'REST API'],
  },
  {
    id: 2,
    title: 'Mobile App Design',
    applicants: 8,
    budget: '₹30,000 - ₹50,000',
    deadline: 'Apr 5',
    status: 'In Progress',
    skills: ['UI/UX', 'Figma', 'Mobile Design'],
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    applicants: 15,
    budget: '₹25,000 - ₹35,000',
    deadline: 'Mar 28',
    status: 'Open',
    skills: ['Digital Marketing', 'Social Media'],
  },
]

const performanceMetrics = [
  {
    label: 'Active Tasks',
    value: '5',
    icon: Target,
    color: 'from-indigo-500/20 to-purple-500/20',
    change: '+2 from last week',
  },
  {
    label: 'Team Size',
    value: '12',
    icon: Users,
    color: 'from-purple-500/20 to-pink-500/20',
    change: '+1 new member',
  },
  {
    label: 'Completion Rate',
    value: '94%',
    icon: TrendingUp,
    color: 'from-blue-500/20 to-indigo-500/20',
    change: '+3% from last month',
  },
  {
    label: 'Total Budget',
    value: '₹3.5L',
    icon: FileText,
    color: 'from-cyan-500/20 to-blue-500/20',
    change: 'Allocated',
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

export default function StartupDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="startup" />
      <div className="lg:ml-72">
        <DashboardNavbar userName="TechStart Co." />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-10">
          {/* Welcome section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">Welcome, TechStart Inc. 🚀</h1>
            <p className="text-lg text-muted-foreground">Manage your team, tasks, and growth</p>
          </motion.div>

          <AIQuickActions actions={[
            { id: 1, label: 'Best candidates for your task' },
            { id: 2, label: 'Improve your job post' },
            { id: 3, label: 'Growth Strategies' }
          ]} />

          {/* Performance metrics */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {performanceMetrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className={`p-8 bg-gradient-to-br ${metric.color} border-border/50 hover:border-indigo-500/30 transition-all`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-muted-foreground text-sm font-medium mb-2">{metric.label}</p>
                        <p className="text-4xl font-bold text-foreground">{metric.value}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                        <Icon className="text-indigo-400" size={24} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.change}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Posted Tasks */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Posted Tasks</h2>
                <Button size="sm" variant="outline" className="border-border/50 hover:bg-card/50 text-xs">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {postedTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 border-border/50 hover:border-indigo-500/30 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors">
                              {task.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.status === 'Open'
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {task.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.applicants} applicants</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-indigo-400 text-sm">{task.budget}</p>
                          <p className="text-xs text-muted-foreground">{task.deadline}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {task.skills.map(skill => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Team Overview */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Team Members</h2>

              <div className="space-y-4 mb-6">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-5 border-border/50 hover:border-indigo-500/30 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base">{member.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${
                              member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                            <span className="text-xs text-muted-foreground capitalize">{member.status}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-border/50 hover:bg-card/50">
                + Invite Team Member
              </Button>
            </motion.div>
          </div>

          {/* AI Growth Suggestions */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AISuggestionsCard
              title="AI Insights & Hiring"
              actionLabel="View All Insights"
              items={[
                { id: 1, title: 'Hire a UX Designer', subtitle: 'Based on your recent product engagement', badge: 'High Priority' },
                { id: 2, title: 'Optimize Task Budget', subtitle: 'Allocate more for Backend API based on market rates', badge: 'Strategy' }
              ]}
            />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
