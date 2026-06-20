'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { motion } from 'framer-motion'
import { Mail, MapPin, Link as LinkIcon, Edit2, Share2 } from 'lucide-react'
import { useParams } from 'next/navigation'

const profileData = {
  student: {
    name: 'Alex Johnson',
    role: 'Student',
    bio: 'Aspiring full-stack developer passionate about creating innovative solutions',
    location: 'Bangalore, India',
    email: 'alex@example.com',
    website: 'alexjohnson.dev',
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JavaScript'],
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution',
        link: '#',
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management tool',
        link: '#',
      },
    ],
    experience: [
      {
        role: 'Intern Frontend Developer',
        company: 'TechStart Co.',
        duration: 'Jun 2023 - Aug 2023',
      },
    ],
  },
  startup: {
    name: 'TechStart Co.',
    role: 'Startup',
    bio: 'Innovative edtech platform revolutionizing online learning',
    location: 'San Francisco, CA',
    email: 'hello@techstart.com',
    website: 'techstart.com',
    skills: ['EdTech', 'AI/ML', 'Mobile Dev', 'Cloud Infrastructure'],
    projects: [
      {
        title: 'AI Tutor Platform',
        description: 'Personalized learning experiences with AI',
        link: '#',
      },
    ],
    experience: [
      {
        role: 'Founded',
        company: 'TechStart Co.',
        duration: 'Jan 2022 - Present',
      },
    ],
  },
  professional: {
    name: 'Alex Kumar',
    role: 'Professional',
    bio: 'Experienced full-stack developer with 5+ years in tech',
    location: 'Mumbai, India',
    email: 'alex.kumar@example.com',
    website: 'alexkumar.dev',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    projects: [
      {
        title: 'Enterprise SaaS Platform',
        description: 'Cloud-based business management solution',
        link: '#',
      },
    ],
    experience: [
      {
        role: 'Senior Developer',
        company: 'Tech Company Inc.',
        duration: 'Jan 2021 - Present',
      },
      {
        role: 'Full Stack Developer',
        company: 'StartupX',
        duration: 'Jun 2018 - Dec 2020',
      },
    ],
  },
  investor: {
    name: 'Priya Investments',
    role: 'Investor',
    bio: 'Angel investor focused on early-stage tech startups in AI and fintech',
    location: 'Delhi, India',
    email: 'priya@investments.com',
    website: 'priyainvestments.com',
    skills: ['VC Investing', 'AI', 'Fintech', 'SaaS', 'EdTech'],
    projects: [],
    experience: [
      {
        role: 'Angel Investor',
        company: 'Self',
        duration: '2020 - Present',
      },
      {
        role: 'Investment Manager',
        company: 'Venture Capital Firm',
        duration: '2015 - 2020',
      },
    ],
  },
  mentor: {
    name: 'Dr. Vikram Singh',
    role: 'Mentor',
    bio: 'Experienced industry leader helping entrepreneurs and developers succeed',
    location: 'Pune, India',
    email: 'vikram@mentor.com',
    website: 'vikramsingh.dev',
    skills: ['Leadership', 'Startup Strategy', 'Tech Mentoring', 'Business Development'],
    projects: [],
    experience: [
      {
        role: 'CTO',
        company: 'Tech Innovations Ltd.',
        duration: '2015 - Present',
      },
      {
        role: 'Founder',
        company: 'Previous Startup',
        duration: '2010 - 2015',
      },
    ],
  },
}

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

export default function ProfilePage() {
  const params = useParams()
  const role = params.role as string
  const profile = profileData[role as keyof typeof profileData] || profileData.student

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} />
      <div className="lg:ml-72">
        <DashboardNavbar userName={profile.name} />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Cover and profile header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative h-40 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-border mb-6 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
            </Card>

            <div className="relative -mt-16 px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-end gap-4">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white border-4 border-card">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{profile.name}</h1>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                        {profile.role}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin size={16} />
                        {profile.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 gap-2">
                    <Edit2 size={18} />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-border gap-2">
                    <Share2 size={18} />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio and contact */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="lg:col-span-2">
              <motion.div variants={itemVariants}>
                <Card className="p-6 border-border mb-8">
                  <h2 className="text-xl font-bold mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{profile.bio}</p>
                </Card>
              </motion.div>

              {profile.experience.length > 0 && (
                <motion.div variants={itemVariants}>
                  <Card className="p-6 border-border mb-8">
                    <h2 className="text-xl font-bold mb-4">Experience</h2>
                    <div className="space-y-4">
                      {profile.experience.map((exp, i) => (
                        <div key={i} className="pb-4 border-b border-border last:border-0">
                          <h3 className="font-semibold mb-1">{exp.role}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{exp.company}</p>
                          <p className="text-xs text-muted-foreground">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {profile.projects.length > 0 && (
                <motion.div variants={itemVariants}>
                  <Card className="p-6 border-border">
                    <h2 className="text-xl font-bold mb-4">Projects</h2>
                    <div className="space-y-4">
                      {profile.projects.map((project, i) => (
                        <div key={i} className="pb-4 border-b border-border last:border-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">
                              <LinkIcon size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 border-border">
                  <h3 className="text-lg font-bold mb-4">Contact</h3>
                  <div className="space-y-3">
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Mail size={18} className="text-indigo-400 flex-shrink-0" />
                      <span className="text-sm truncate">{profile.email}</span>
                    </a>
                    <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <LinkIcon size={18} className="text-indigo-400 flex-shrink-0" />
                      <span className="text-sm truncate">{profile.website}</span>
                    </a>
                  </div>
                </Card>
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 border-border">
                  <h3 className="text-lg font-bold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Quick actions */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 border-border">
                  <h3 className="text-lg font-bold mb-4">Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full border-border justify-start">
                      Download CV
                    </Button>
                    <Button variant="outline" className="w-full border-border justify-start">
                      Request Meeting
                    </Button>
                    <Button variant="outline" className="w-full border-border justify-start">
                      Connect
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
