'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface Action {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface AIQuickActionsProps {
  actions: Action[];
}

export function AIQuickActions({ actions }: AIQuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <div className="flex items-center gap-2 mr-2 text-sm font-medium text-muted-foreground">
        <Sparkles size={16} className="text-indigo-400" />
        AI Suggestions:
      </div>
      {actions.map((action, i) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={action.onClick}
            className="border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-foreground transition-all rounded-full px-4 h-8"
          >
            {action.icon && <span className="mr-2 opacity-70">{action.icon}</span>}
            {action.label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
