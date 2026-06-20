'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Send, Search } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const conversations = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Mentor',
    lastMessage: 'Great work on the project!',
    timestamp: '5m ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'TechStart Co.',
    role: 'Company',
    lastMessage: 'Interview scheduled for tomorrow',
    timestamp: '1h ago',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Developer',
    lastMessage: 'Let\'s sync on the design',
    timestamp: '2h ago',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'Emma Williams',
    role: 'Designer',
    lastMessage: 'Check the latest mockups',
    timestamp: '1 day ago',
    unread: 0,
    online: false,
  },
]

const messages = [
  {
    id: 1,
    sender: 'Sarah Chen',
    content: 'Hi! How are you doing with the learning path?',
    timestamp: '10:30 AM',
    isSent: false,
  },
  {
    id: 2,
    sender: 'You',
    content: 'Great! I\'ve completed 45% of the Full Stack course',
    timestamp: '10:35 AM',
    isSent: true,
  },
  {
    id: 3,
    sender: 'Sarah Chen',
    content: 'Excellent progress! Keep it up. Let me know if you have any questions.',
    timestamp: '10:40 AM',
    isSent: false,
  },
]

export default function MessagesPage() {
  const { role } = useParams()
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [message, setMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Sending message:', message)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardSidebar role={role as string} />
      <div className="flex-1 flex flex-col lg:ml-72">
        <DashboardNavbar userName="User" />

        {/* Main content */}
        <main className="flex-1 flex gap-4 lg:gap-8 p-4 sm:p-6 lg:p-8 overflow-hidden min-h-0">
          {/* Conversations List */}
          <motion.div
            className="hidden lg:flex lg:w-80 flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 bg-input/50 border-border/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {conversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedConversation.id === conv.id
                      ? 'bg-indigo-500/20 border border-indigo-500/30'
                      : 'border border-transparent hover:bg-muted/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{conv.name}</h3>
                      {conv.online && <div className="w-2 h-2 rounded-full bg-green-500" />}
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{conv.role}</p>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            className="flex-1 flex flex-col border border-border/30 rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-border/30 bg-gradient-to-br from-card/50 to-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold">{selectedConversation.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedConversation.online && (
                    <span className="flex items-center gap-2 text-xs text-green-500">
                      <div className="w-2 h-2 rounded-full bg-green-500" /> Online
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`max-w-xs lg:max-w-md ${msg.isSent ? 'order-2' : 'order-1'}`}>
                    <Card
                      className={`p-4 rounded-lg ${
                        msg.isSent
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-muted border-border/30'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </Card>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{msg.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-6 border-t border-border/30">
              <div className="flex gap-3">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-input/50 border-border/50"
                />
                <Button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
