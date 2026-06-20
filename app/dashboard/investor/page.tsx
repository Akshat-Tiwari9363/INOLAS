'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { AIQuickActions } from '@/components/ai-quick-actions'
import { AISuggestionsCard } from '@/components/ai-suggestions-card'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Target, Zap } from 'lucide-react'

const investmentOpportunities = [
  {
    id: 1,
    name: 'AI Learning Platform',
    founder: 'Priya Sharma',
    sector: 'EdTech',
    fundingGoal: '₹50L',
    raised: '₹20L',
    equity: '15%',
    matchScore: 92,
    stage: 'Seed',
  },
  {
    id: 2,
    name: 'HealthTech Solutions',
    founder: 'Dr. Arjun Patel',
    sector: 'Healthcare',
    fundingGoal: '₹1Cr',
    raised: '₹40L',
    equity: '20%',
    matchScore: 88,
    stage: 'Series A',
  },
  {
    id: 3,
    name: 'SustainableAg Tech',
    founder: 'Ravi Kumar',
    sector: 'AgriTech',
    fundingGoal: '₹75L',
    raised: '₹30L',
    equity: '18%',
    matchScore: 85,
    stage: 'Seed',
  },
]

const portfolio = [
  {
    id: 1,
    name: 'CloudFlow',
    sector: 'Cloud Computing',
    investmentDate: 'Jan 2023',
    invested: '₹25L',
    currentValue: '₹45L',
    returnPercent: '+80%',
  },
  {
    id: 2,
    name: 'BlockVault',
    sector: 'Blockchain',
    investmentDate: 'Jun 2023',
    invested: '₹15L',
    currentValue: '₹18L',
    returnPercent: '+20%',
  },
]

const stats = [
  {
    label: 'Total Portfolio',
    value: '₹2.5Cr',
    icon: DollarSign,
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    label: 'Active Investments',
    value: '8',
    icon: TrendingUp,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    label: 'Average Return',
    value: '35%',
    icon: Zap,
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    label: 'Opportunities',
    value: '24',
    icon: Target,
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

export default function InvestorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="investor" />
      <div className="lg:ml-72">
        <DashboardNavbar userName="Priya Investments" />

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Investment Dashboard 💰</h1>
            <p className="text-muted-foreground">Discover and manage promising investment opportunities</p>
          </motion.div>

          <AIQuickActions actions={[
            { id: 1, label: 'Promising startups' },
            { id: 2, label: 'Investment Insights' },
            { id: 3, label: 'Portfolio Analysis' }
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

          {/* Two column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Opportunities */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Opportunities</h2>
                <Button variant="outline" className="border-border">
                  Browse All
                </Button>
              </div>

              <div className="space-y-4">
                {investmentOpportunities.map((opp, i) => (
                  <motion.div
                    key={opp.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-5 border-border hover:border-primary/50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {opp.name}
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                              {opp.stage}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Founded by <span className="font-semibold text-foreground">{opp.founder}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{opp.sector}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Match Score</p>
                              <p className="font-bold text-lg text-primary">{opp.matchScore}%</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-300">{opp.matchScore}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Goal</p>
                          <p className="font-semibold text-sm">{opp.fundingGoal}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Raised</p>
                          <p className="font-semibold text-sm text-green-400">{opp.raised}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Equity</p>
                          <p className="font-semibold text-sm">{opp.equity}</p>
                        </div>
                      </div>

                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(parseInt(opp.raised.replace(/[^0-9]/g, '')) / parseInt(opp.fundingGoal.replace(/[^0-9]/g, ''))) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>

                      <Button size="sm" className="text-xs h-7 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                        View Details
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Portfolio Summary */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Your Portfolio</h2>

              <div className="space-y-4">
                {portfolio.map((inv, i) => (
                  <motion.div
                    key={inv.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-4 border-border hover:border-primary/50 transition-colors">
                      <h3 className="font-semibold mb-1">{inv.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{inv.sector}</p>

                      <div className="space-y-2 pb-3 border-b border-border mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Invested</span>
                          <span className="font-semibold">{inv.invested}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Current</span>
                          <span className="font-semibold text-green-400">{inv.currentValue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{inv.investmentDate}</span>
                        <span className={`text-sm font-bold ${
                          inv.returnPercent.includes('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {inv.returnPercent}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Investment Assistant */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AISuggestionsCard
              title="AI Startup Analysis"
              actionLabel="Ask AI Assistant"
              items={[
                { id: 1, title: 'Evaluate HealthTech Solutions', subtitle: 'Strong match for your portfolio strategy', badge: '88% Match' },
                { id: 2, title: 'Sector Trend: AgriTech', subtitle: 'Increasing seed-stage funding opportunities', badge: 'Insight' }
              ]}
            />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
