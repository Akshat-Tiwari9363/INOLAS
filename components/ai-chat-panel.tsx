'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchAPI } from '@/lib/api'
import { usePathname } from 'next/navigation'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function AIChatPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi there! I am your INOLAS AI Assistant. How can I help you today?' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const pathname = usePathname()

  // Do not show on auth pages or landing page (optional check, assuming it's for dashboards mainly)
  // For now, let's keep it global and just hide it if it's the sign-in page, etc.
  if (pathname === '/auth/login' || pathname === '/auth/signup') {
    return null;
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')

    try {
      const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : 'general'
      const data = await fetchAPI('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: newMessage.content, role }),
      })

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply
        }
      ])
    } catch (e) {
      const message = e instanceof Error ? e.message : "Sorry, I'm currently unable to connect to the backend server."
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: message
        }
      ]);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 w-[calc(100vw-2rem)] sm:right-6 sm:w-80 md:w-96 z-50 origin-bottom-right"
          >
            <Card className="border-indigo-500/20 shadow-2xl overflow-hidden flex flex-col h-[70vh] max-h-[500px] bg-background/95 backdrop-blur-xl">
              {/* Header */}
              <div className="p-4 border-b border-border/50 bg-indigo-500/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">INOLAS Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              {/* Chat Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-muted text-foreground rounded-bl-none border border-border/50'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50 bg-muted/20">
                <div className="relative flex items-center">
                  <Input
                    placeholder="Ask me anything..."
                    className="pr-12 bg-background border-border/50 rounded-full focus-visible:ring-indigo-500/50"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 h-8 w-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all transform hover:scale-105"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                  >
                    <Send size={14} className="ml-0.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </motion.div>
    </>
  )
}
