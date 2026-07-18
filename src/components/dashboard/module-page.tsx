"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, LucideIcon } from "lucide-react"

interface StatItem {
  label: string
  value: string
  detail?: string
  icon?: LucideIcon
  tone?: string
}

interface ModulePageProps {
  title: string
  subtitle: string
  description: string
  badge?: string
  actions?: ReactNode
  stats?: StatItem[]
  children: ReactNode
  aside?: ReactNode
}

export function ModulePage({
  title,
  subtitle,
  description,
  badge,
  actions,
  stats,
  children,
  aside,
}: ModulePageProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] border border-border/60 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:bg-slate-900/70"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              {badge ? <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{badge}</Badge> : null}
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-violet-500" />
                Premium Campus+ experience
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
            </div>
            <p className="text-base text-muted-foreground">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </motion.div>

      {stats && stats.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="rounded-2xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur dark:bg-slate-900/70">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className={`rounded-2xl p-3 ${item.tone || "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200"}`}>
                      {Icon ? <Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.detail ? <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p> : null}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-6">{children}</div>
        {aside ? <div className="space-y-6">{aside}</div> : null}
      </div>
    </div>
  )
}
