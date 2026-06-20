'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Bell, Lock, User, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const { role } = useParams()
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile')
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: 'Bangalore, India',
    bio: 'Aspiring full-stack developer',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('[v0] Saving settings:', formData)
  }

  const handleLogout = () => {
    console.log('[v0] Logging out')
    window.location.href = '/'
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role as string} />
      <div className="lg:ml-72">
        <DashboardNavbar userName="User" />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Settings</h1>
            <p className="text-lg text-muted-foreground mb-10">Manage your account preferences</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="flex flex-row lg:flex-col overflow-x-auto gap-2 pb-1">
                  {tabs.map(tab => {
                    const Icon = tab.icon
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30'
                            : 'text-muted-foreground hover:bg-muted/30'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <Icon size={18} />
                        <span>{tab.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Settings Content */}
              <motion.div
                className="lg:col-span-3"
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <Card className="p-8 border-border/30">
                      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-input/50 border-border/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-input/50 border-border/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="bg-input/50 border-border/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-input/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500/50"
                            rows={4}
                          />
                        </div>

                        <Button
                          type="button"
                          onClick={handleSave}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Save Changes
                        </Button>
                      </form>
                    </Card>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <Card className="p-8 border-border/30">
                      <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

                      {[
                        { label: 'Email Notifications', description: 'Receive updates via email' },
                        { label: 'Message Alerts', description: 'Get notified for new messages' },
                        { label: 'Opportunity Updates', description: 'Stay updated on new opportunities' },
                        { label: 'Mentorship Requests', description: 'Get notified for mentorship requests' },
                      ].map((notif, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center justify-between py-4 border-b border-border/20 last:border-b-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div>
                            <p className="font-medium">{notif.label}</p>
                            <p className="text-sm text-muted-foreground">{notif.description}</p>
                          </div>
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded cursor-pointer accent-indigo-600"
                            defaultChecked
                          />
                        </motion.div>
                      ))}

                      <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Save Preferences
                      </Button>
                    </Card>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <Card className="p-8 border-border/30">
                      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-input/50 border-border/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-input/50 border-border/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-input/50 border-border/50"
                          />
                        </div>

                        <Button
                          type="button"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Update Password
                        </Button>
                      </form>
                    </Card>

                    <Card className="p-8 border-border/30 border-red-500/30 bg-red-500/5">
                      <h2 className="text-2xl font-bold mb-4 text-red-500">Danger Zone</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you log out, you will need to log in again to access your account.
                      </p>
                      <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
                        <LogOut className="mr-2" size={18} />
                        Log Out
                      </Button>
                    </Card>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
