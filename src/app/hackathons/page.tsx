"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock3, Trophy, Sparkles, Rocket } from "lucide-react"

const hackathons = [
  { title: "AI Builder Sprint", date: "Aug 12 • 48 hrs", prize: "$7,500", type: "Open" },
  { title: "Social Impact Prototype", date: "Sep 03 • 24 hrs", prize: "$3,200", type: "Community" },
]

function HackathonsContent() {
  const stats = [
    { label: "Upcoming sprints", value: "6", detail: "Next 30 days", icon: Rocket, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Prize pool", value: "$25k", detail: "Across active challenges", icon: Trophy, tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Hackathons"
        subtitle="Turn bold ideas into shipped prototypes with structured sprints and mentors."
        description="Campus+ highlights fast-moving challenges, prize pools, and guided support so students can compete with confidence."
        badge="Build fast"
        stats={stats}
        actions={<Button className="rounded-full">Join a sprint</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Mentor support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/90">
              <p>AI mentor suggestions are included for team formation, product flow, and pitch prep.</p>
            </CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.title} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-violet-600" />
                    <h3 className="text-xl font-semibold">{hackathon.title}</h3>
                  </div>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4" />{hackathon.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200">{hackathon.prize}</Badge>
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

export default function HackathonsPage() {
  return (
    <ProtectedRoute>
      <HackathonsContent />
    </ProtectedRoute>
  )
}
