"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Sparkles, TrendingUp, Trophy } from "lucide-react"

const achievements = [
  { title: "Momentum streak", detail: "7 consecutive weeks of participation", icon: Trophy },
  { title: "Impact builder", detail: "Completed 3 volunteer initiatives", icon: Award },
  { title: "Skill accelerator", detail: "Finished 4 AI and product learning quests", icon: Sparkles },
]

function AchievementsContent() {
  const stats = [
    { label: "Badges earned", value: "12", detail: "Across campus", icon: Trophy, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Progress", value: "82%", detail: "Towards next milestone", icon: TrendingUp, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Achievements"
        subtitle="Celebrate progress with a visible record of your growth and effort."
        description="Campus+ turns engagement into a story you can share with mentors, employers, and peers."
        badge="Milestones"
        stats={stats}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardContent className="p-6 text-sm text-muted-foreground">Your milestones are automatically updated as you RSVP, volunteer, and build new skills.</CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {achievements.map((item) => (
            <Card key={item.title} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
                <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">Unlocked</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </ModulePage>
    </AppShell>
  )
}

export default function AchievementsPage() {
  return (
    <ProtectedRoute>
      <AchievementsContent />
    </ProtectedRoute>
  )
}
