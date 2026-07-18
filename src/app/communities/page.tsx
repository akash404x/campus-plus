"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Sparkles, TrendingUp, Compass } from "lucide-react"

const communities = [
  { name: "Innovation Circle", description: "Build with founders and product thinkers in weekly office hours.", members: "1.4k" },
  { name: "Campus Wellness", description: "Share routines, mindfulness, and recovery strategies.", members: "820" },
  { name: "Future Leaders", description: "Leadership workshops, mentorship, and public speaking.", members: "690" },
]

function CommunitiesContent() {
  const stats = [
    { label: "Active spaces", value: "32", detail: "Across student groups", icon: Compass, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "New posts", value: "+89", detail: "This week", icon: TrendingUp, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Communities"
        subtitle="Join rich conversation spaces built for peer discovery and shared momentum."
        description="From wellness circles to startup communities, each space is designed to make collaboration feel native and effortless."
        badge="Community-led"
        stats={stats}
        actions={<Button className="rounded-full">Start a community</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardHeader>
              <CardTitle>Trending topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• AI product design office hours</p>
              <p>• Volunteer bootcamp meetups</p>
              <p>• Study group planning for finals</p>
            </CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {communities.map((community) => (
            <Card key={community.name} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-violet-600" />
                    <h3 className="text-xl font-semibold">{community.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{community.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">{community.members} members</Badge>
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

export default function CommunitiesPage() {
  return (
    <ProtectedRoute>
      <CommunitiesContent />
    </ProtectedRoute>
  )
}
