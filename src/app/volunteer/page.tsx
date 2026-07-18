"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Clock3, Users } from "lucide-react"

const opportunities = [
  { title: "Campus sustainability drive", hours: "4 hrs", date: "Sunday", spots: "12 spots" },
  { title: "Mentor junior students", hours: "2 hrs", date: "Weekly", spots: "8 spots" },
]

function VolunteerContent() {
  const stats = [
    { label: "Opportunities", value: "9", detail: "Ready to join", icon: Heart, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Hours tracked", value: "142", detail: "This semester", icon: Clock3, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Volunteer"
        subtitle="Turn service into a visible, rewarding part of your campus story."
        description="Log hours, join impact-driven teams, and earn recognition for the work that matters most."
        badge="Service"
        stats={stats}
        actions={<Button className="rounded-full">Explore opportunities</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p>Volunteer passport updates are synced with completed service hours and verified events.</p>
              <p className="flex items-center gap-2"><Users className="h-4 w-4" />Community impact is tracked automatically.</p>
            </CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {opportunities.map((item) => (
            <Card key={item.title} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.date} · {item.hours}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">{item.spots}</Badge>
                  <Button variant="outline" className="rounded-full">Join</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ModulePage>
    </AppShell>
  )
}

export default function VolunteerPage() {
  return (
    <ProtectedRoute>
      <VolunteerContent />
    </ProtectedRoute>
  )
}
