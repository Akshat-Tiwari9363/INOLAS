'use client'

import { Search, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DashboardNavbarProps {
  userName?: string
}

export function DashboardNavbar({ userName = 'User' }: DashboardNavbarProps) {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/8 bg-slate-950/55 backdrop-blur-xl">
      <div className="flex h-[4.5rem] items-center justify-between gap-4 pl-16 pr-4 sm:pl-6 lg:pl-8 lg:pr-8">
        {/* Search — hidden on mobile */}
        <div className="hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search people, roles, and opportunities"
              className="h-11 rounded-full border-white/8 bg-white/5 pl-11 text-sm text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Spacer for mobile so right items stay right */}
        <div className="flex-1 md:hidden" />

        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="relative rounded-full border border-white/8 bg-white/4 hover:bg-white/8">
            <Bell className="text-slate-300" size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-300" />
          </Button>

          <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/4 px-2.5 py-2">
            <div className="hidden sm:flex flex-col items-end pr-2">
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-slate-400">Online now</p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/8">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/15 bg-primary text-xs font-bold text-primary-foreground">
                {userName.charAt(0).toUpperCase()}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
