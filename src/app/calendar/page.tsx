"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock3, Sparkles } from "lucide-react"

const schedule = [
  { title: "Design review", time: "09:00" },
  { title: "Volunteer shift", time: "14:00" },
  { title: "AI mentor session", time: "18:30" },
]

function CalendarContent() {
  const stats = [
    { label: "Upcoming items", value: "8", detail: "This week", icon: CalendarDays, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Focus blocks", value: "3", detail: "Protected time", icon: Clock3, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Calendar"
        subtitle="Map your campus life into a calm and actionable weekly plan."
        description="Sync events, volunteer shifts, and milestone reminders in a premium planner designed for student momentum."
        badge="Planning"
        stats={stats}
        actions={<Button className="rounded-full">Add reminder</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardHeader>
              <CardTitle>Today’s focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>One deep work block remains before your mentorship session.</p>
            </CardContent>
          </Card>
        }
      >
        <Card className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">This week</h3>
                <p className="text-sm text-muted-foreground">A mix of deadlines, events, and restoration time.</p>
              </div>
              <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">Balanced</Badge>
            </div>
            <div className="space-y-3">
              {schedule.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ModulePage>
    </AppShell>
  )
}

export default function CalendarPage() {
  return (
    <ProtectedRoute>
      <CalendarContent />
    </ProtectedRoute>
  )
}
