"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Sparkles, DollarSign, TimerReset } from "lucide-react"

const scholarships = [
  { title: "Excellence in Technology", amount: "$5,000", deadline: "5 days left", eligibility: "GPA 3.5+" },
  { title: "Community Leadership", amount: "$3,000", deadline: "12 days left", eligibility: "Volunteer 50+ hrs" },
]

function ScholarshipsContent() {
  const stats = [
    { label: "Scholarships", value: "14", detail: "Open now", icon: GraduationCap, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Avg award", value: "$4.2k", detail: "Per opportunity", icon: DollarSign, tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Scholarships"
        subtitle="Find funding opportunities that align with your leadership, academic, and service profile."
        description="Campus+ makes it easier to track deadlines, compare awards, and prepare your applications early."
        badge="Funding"
        stats={stats}
        actions={<Button className="rounded-full">View opportunities</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><TimerReset className="h-4 w-4" />Most deadlines are within 30 days.</p>
              <p>Set reminders and build your application checklist in one place.</p>
            </CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {scholarships.map((item) => (
            <Card key={item.title} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.eligibility}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">{item.amount}</Badge>
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

export default function ScholarshipsPage() {
  return (
    <ProtectedRoute>
      <ScholarshipsContent />
    </ProtectedRoute>
  )
}
