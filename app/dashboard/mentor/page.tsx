'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { AIQuickActions } from '@/components/ai-quick-actions'
import { AISuggestionsCard } from '@/components/ai-suggestions-card'
import { motion } from 'framer-motion'
import { Users, Calendar, Award, MessageSquare } from 'lucide-react'

const mentorshipRequests = [
  {
    id: 1,
    mentee: 'Aisha Khan',
    role: 'Student',
    goal: 'Learn Full Stack Development',
    experience: 'Beginner',
    status: 'pending',
    date: 'Today',
  },
  {
    id: 2,
    mentee: 'Rajesh Verma',
    role: 'Entrepreneur',
    goal: 'Scale my startup',
    experience: 'Intermediate',
    status: 'accepted',
    date: '2 days ago',
  },
  {
    id: 3,
    mentee: 'Emma Wilson',
    role: 'Professional',
    goal: 'Career transition to Tech',
    experience: 'Intermediate',
    status: 'pending',
    date: '1 week ago',
  },
]

const activeSessions = [
  {
    id: 1,
    mentee: 'Rajesh Verma',
    topic: 'Growth Strategy Discussion',
    date: 'Mar 30, 2024',
    time: '2:00 PM',
    duration: '1 hour',
    status: 'scheduled',
  },
  {
    id: 2,
    mentee: 'Priya Sharma',
    topic: 'Feedback on Business Plan',
    date: 'Mar 31, 2024',
    time: '3:30 PM',
    duration: '45 mins',
    status: 'scheduled',
  },
]

const achievements = [
  {
    id: 1,
    title: 'Top Mentor',
    description: '5+ successful mentorships',
    icon: '⭐',
  },
  {
    id: 2,
    title: 'Trusted Advisor',
    description: '4.9/5 average rating',
    icon: '👑',
  },
  {
    id: 3,
    title: 'Impact Maker',
    description: 'Mentored 15+ people',
    icon: '🚀',
  },
]

const stats = [
  {
    label: 'Active Mentees',
    value: '8',
    icon: Users,
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    label: 'Sessions Completed',
    value: '42',
    icon: Calendar,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    label: 'Rating',
    value: '4.9/5',
    icon: Award,
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    label: 'Messages',
    value: '24',
    icon: MessageSquare,
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

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="mentor" />
      <div className="lg:ml-72">
        <DashboardNavbar userName="Dr. Vikram Singh" />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Vikram! 🌟</h1>
            <p className="text-muted-foreground">Manage your mentorship sessions and guide the next generation</p>
          </motion.div>

          <AIQuickActions actions={[
            { id: 1, label: 'Mentee Requests' },
            { id: 2, label: 'Guidance Topics' },
            { id: 3, label: 'Schedule Review' }
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

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Mentorship Requests */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Mentorship Requests</h2>
                <Button variant="outline" className="border-border">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {mentorshipRequests.map((request, i) => (
                  <motion.div
                    key={request.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-5 border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{request.mentee}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{request.goal}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {request.role}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                              {request.experience}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-3">{request.date}</p>
                          {request.status === 'pending' ? (
                            <div className="flex gap-2">
                              <Button size="sm" className="text-xs h-7 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs h-7 border-border">
                                Decline
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                              Accepted
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>

              <div className="space-y-4">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={achievement.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-4 border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scheduled Sessions */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-5 border-border hover:border-primary/50 transition-colors">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">{session.mentee}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{session.topic}</p>
                    </div>

                    <div className="space-y-2 pb-4 border-b border-border mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-indigo-400" />
                        <span className="text-sm">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-indigo-400" />
                        <span className="text-sm">{session.time} ({session.duration})</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-xs h-7 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                        Join Session
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 border-border">
                        Reschedule
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Guidance Tools */}
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
                  <h3 className="text-xl font-bold mb-2">Mentorship Tools</h3>
                  <p className="text-muted-foreground mb-4">Access resources to enhance your mentoring</p>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    Explore Tools
                  </Button>
                </div>
                <div className="text-4xl">🛠️</div>
              </div>
            </Card>

            <AISuggestionsCard
              title="AI Suggested Mentorship"
              items={[
                { id: 1, title: 'Aisha Khan needs follow-up', subtitle: 'Has pending goal: Learn Full Stack', badge: 'Action Needed' },
                { id: 2, title: 'Suggested Topic: System Design', subtitle: 'Trending in recent mentee requests', badge: 'Trend' }
              ]}
            />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
