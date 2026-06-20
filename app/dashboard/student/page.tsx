'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { AIQuickActions } from '@/components/ai-quick-actions'
import { AISuggestionsCard } from '@/components/ai-suggestions-card'
import { fetchAPI } from '@/lib/api'
import { motion } from 'framer-motion'
import { Briefcase, BookOpen, TrendingUp, Award } from 'lucide-react'

const recommendedOpportunities = [
  {
    id: 1,
    title: 'Frontend Developer Internship',
    company: 'TechStart Co.',
    duration: '3 months',
    stipend: '₹10,000/month',
    skills: ['React', 'Tailwind CSS', 'JavaScript'],
    status: 'new',
  },
  {
    id: 2,
    title: 'UI/UX Design Internship',
    company: 'Creative Labs',
    duration: '2 months',
    stipend: 'Certificate + Exposure',
    skills: ['Figma', 'Design Thinking'],
    status: 'trending',
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    duration: '4 months',
    stipend: '₹15,000/month',
    skills: ['Python', 'SQL', 'Machine Learning'],
    status: 'new',
  },
]

const learningPaths = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    progress: 45,
    skills: ['React', 'Node.js', 'MongoDB'],
    lastUpdated: '2 days ago',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    progress: 30,
    skills: ['Design Principles', 'Figma'],
    lastUpdated: 'Today',
  },
  {
    id: 3,
    title: 'Digital Marketing Basics',
    progress: 60,
    skills: ['SEO', 'Content Marketing'],
    lastUpdated: '1 week ago',
  },
]

const stats = [
  {
    label: 'Applications',
    value: '8',
    icon: Briefcase,
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    label: 'Learning Hours',
    value: '124',
    icon: BookOpen,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    label: 'Skills Gained',
    value: '12',
    icon: Award,
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    label: 'Mentors Connected',
    value: '3',
    icon: TrendingUp,
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

export default function StudentDashboard() {
  const [statsData, setStatsData] = useState<any[]>(stats)
  const [userName, setUserName] = useState("Student")

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const name = localStorage.getItem("userName") || "Student"
        setUserName(name)
        const data = await fetchAPI('/dashboard/student/stats')
        if (data.stats && data.stats.length > 0) {
          const iconMap: Record<string, any> = { 'Applications': Briefcase, 'Learning Hours': BookOpen, 'Skills Gained': Award, 'Mentors': TrendingUp, 'Mentors Connected': TrendingUp }
          const colorMap: Record<string, string> = { 'Applications': 'from-indigo-500/20 to-purple-500/20', 'Learning Hours': 'from-purple-500/20 to-pink-500/20', 'Skills Gained': 'from-blue-500/20 to-indigo-500/20', 'Mentors': 'from-cyan-500/20 to-blue-500/20', 'Mentors Connected': 'from-cyan-500/20 to-blue-500/20' }

          const mappedStats = data.stats.map((s: any) => ({
            ...s,
            icon: iconMap[s.label] || Briefcase,
            color: colorMap[s.label] || 'from-indigo-500/20 to-purple-500/20'
          }))
          setStatsData(mappedStats)
        }
      } catch (e) {
        console.error("Failed to load dashboard stats", e)
      }
    }
    loadDashboardData()
  }, [])


  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="student" />
      <div className="lg:ml-72">
        <DashboardNavbar userName={userName} />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-10">
          {/* Welcome section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">Welcome back, {userName.split(' ')[0]} 👋</h1>
            <p className="text-lg text-muted-foreground">Here&apos;s what&apos;s happening in your learning journey</p>
          </motion.div>

          <AIQuickActions actions={[
            { id: 1, label: 'What should I learn next?' },
            { id: 2, label: 'Improve my profile' },
            { id: 3, label: 'Find a Mentor' }
          ]} />

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {statsData.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className={`p-8 bg-gradient-to-br ${stat.color} border-border/50 hover:border-indigo-500/30 transition-all`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
                        <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                        <Icon className="text-indigo-400" size={24} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Recommended Opportunities */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recommended Opportunities</h2>
                <Button size="sm" variant="outline" className="border-border/40 hover:bg-muted/30 text-xs">
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {recommendedOpportunities.map((opp, i) => (
                  <motion.div
                    key={opp.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-5 border-border/40 hover:border-indigo-500/40 hover:bg-muted/20 transition-all duration-200 cursor-pointer group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">
                              {opp.title}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                              opp.status === 'new'
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {opp.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{opp.company}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span>{opp.duration}</span>
                            <span>•</span>
                            <span className="font-semibold text-indigo-400">{opp.stipend}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {opp.skills.map(skill => (
                              <span
                                key={skill}
                                className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 h-8 text-xs">
                          Apply
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress tracker */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold mb-6">Learning Progress</h2>

              <div className="space-y-3">
                {learningPaths.map((path, i) => (
                  <motion.div
                    key={path.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-4 border-border/40 hover:border-indigo-500/40 hover:bg-muted/20 transition-all duration-200">
                      <div className="mb-3">
                        <h3 className="font-semibold text-sm mb-1">{path.title}</h3>
                        <p className="text-xs text-muted-foreground">{path.lastUpdated}</p>
                      </div>

                      <div>
                        <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden mb-1.5">
                          <motion.div
                            className="h-full bg-indigo-600 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${path.progress}%` }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{path.progress}%</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <AISuggestionsCard
                  title="AI Recommendations"
                  items={[
                    { id: 1, title: 'React Performance Patterns', subtitle: 'Skill suggestion based on your path', badge: 'High Match' },
                    { id: 2, title: 'Frontend Intern @ TechStart', subtitle: 'Internship recommendation', badge: 'Apply Now' }
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
