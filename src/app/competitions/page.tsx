"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Trophy, TimerReset } from "lucide-react"

const competitions = [
  { title: "Design for Impact", deadline: "4 days left", prize: "$4,000" },
  { title: "Case Study Challenge", deadline: "12 days left", prize: "$2,500" },
]

function CompetitionsContent() {
  const stats = [
    { label: "Open contests", value: "11", detail: "This month", icon: Trophy, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Deadline pressure", value: "Low", detail: "Most close soon", icon: TimerReset, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Competitions"
        subtitle="Push your work into the spotlight with curated contests and recognition-ready submissions."
        description="Whether you are building, pitching, or creating, Campus+ surfaces opportunities that match your strength."
        badge="Recognition"
        stats={stats}
        actions={<Button className="rounded-full">Explore contests</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardHeader>
              <CardTitle>Fast facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Students with a portfolio tip are 2x more likely to be shortlisted.</p>
              <p>All competitions include submission guidance and reminders.</p>
            </CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {competitions.map((competition) => (
            <Card key={competition.title} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <h3 className="text-xl font-semibold">{competition.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{competition.deadline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200">{competition.prize}</Badge>
                  <Button variant="outline" className="rounded-full">Apply</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ModulePage>
    </AppShell>
  )
}

export default function CompetitionsPage() {
  return (
    <ProtectedRoute>
      <CompetitionsContent />
    </ProtectedRoute>
  )
}
