'use client'

import { Card } from '@/components/ui/card'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface SuggestionItem {
  id: string | number;
  title: string;
  subtitle?: string;
  badge?: string;
}

interface AISuggestionsCardProps {
  title: string;
  items: SuggestionItem[];
  actionLabel?: string;
  onActionClick?: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export function AISuggestionsCard({ title, items, actionLabel = "View All", onActionClick }: AISuggestionsCardProps) {
  return (
    <Card className="p-6 border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500 -mr-16 -mt-16" />
      
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Sparkles className="text-indigo-400" size={20} />
        <h3 className="font-bold text-lg">{title}</h3>
      </div>

      <div className="space-y-3 mb-6 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background border border-border/50 hover:border-indigo-500/30 transition-all group/item cursor-pointer"
          >
            <div>
              <p className="font-medium text-sm text-foreground">{item.title}</p>
              {item.subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {item.badge && (
                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                  {item.badge}
                </span>
              )}
              <ArrowRight size={14} className="text-muted-foreground group-hover/item:text-indigo-400 group-hover/item:translate-x-0.5 transition-all opacity-0 group-hover/item:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="w-full text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 text-sm font-medium"
        onClick={onActionClick}
      >
        {actionLabel}
      </Button>
    </Card>
  )
}
