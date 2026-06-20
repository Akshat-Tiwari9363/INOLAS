'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  role: string
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    console.log('[v0] Logging out')
    window.location.href = '/'
  }

  const menuItems = [
    {
      label: 'Dashboard',
      href: `/dashboard/${role}`,
      icon: LayoutDashboard,
    },
    {
      label: 'Profile',
      href: `/dashboard/${role}/profile`,
      icon: User,
    },
    {
      label: 'Messages',
      href: `/dashboard/${role}/messages`,
      icon: MessageSquare,
    },
    {
      label: 'Settings',
      href: `/dashboard/${role}/settings`,
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border border-white/10 bg-slate-950/70 text-foreground backdrop-blur-xl"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 h-screen w-72 border-r border-white/8 bg-[linear-gradient(180deg,rgba(9,15,27,0.96),rgba(13,23,39,0.88))] pt-16 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 lg:pt-0 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="space-y-10 p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/25 to-cyan-300/10" />
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Workspace</p>
              <span className="text-lg font-semibold tracking-[0.12em] text-white">INOLAS</span>
            </div>
          </Link>

          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="mb-1 text-xs uppercase tracking-[0.24em] text-slate-400">Current role</p>
            <p className="text-base font-semibold capitalize text-white">{role}</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200',
                    isActive
                      ? 'border border-amber-300/12 bg-amber-300/10 font-medium text-amber-100'
                      : 'text-slate-400 hover:bg-white/6 hover:text-white',
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-white/8 pt-8">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 rounded-2xl text-slate-400 hover:bg-white/6 hover:text-white"
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
