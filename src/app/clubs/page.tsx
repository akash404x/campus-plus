"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Users, Sparkles, Heart, Compass } from "lucide-react"

const clubs = [
  { name: "AI Builders", members: 284, focus: "Product + research", vibe: "Fast-moving" },
  { name: "Campus Creatives", members: 198, focus: "Design + storytelling", vibe: "Visual" },
  { name: "Launch Lab", members: 156, focus: "Startups & pitch", vibe: "Founder-first" },
]

function ClubsContent() {
  const [query, setQuery] = useState("")
  const [joined, setJoined] = useState<string[]>(["AI Builders"])

  const filtered = clubs.filter((club) => `${club.name} ${club.focus}`.toLowerCase().includes(query.toLowerCase()))

  const stats = [
    { label: "Active clubs", value: "18", detail: "Across campus", icon: Users, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "New members", value: "+146", detail: "This month", icon: Sparkles, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Clubs"
        subtitle="Join communities aligned to your interests, lifestyle, and goals."
        description="Whether you are building, creating, or leading, Campus+ helps you find your ideal circle."
        badge="Student communities"
        stats={stats}
        actions={<Button className="rounded-full">Discover clubs</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardHeader>
              <CardTitle>Why clubs matter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Students who join at least two communities are 3x more likely to engage with campus events.</p>
              <div className="flex items-center gap-2 text-violet-600"><Heart className="h-4 w-4" /> Curated matches based on your interests</div>
            </CardContent>
          </Card>
        }
      >
        <Card className="rounded-3xl border-0 bg-white/80 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
          <CardContent className="space-y-5 p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clubs by focus or vibe" className="rounded-2xl pl-9" />
            </div>
            <div className="grid gap-4">
              {filtered.map((club) => {
                const isJoined = joined.includes(club.name)
                return (
                  <motion.div key={club.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{club.name}</h3>
                          <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{club.vibe}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{club.focus}</p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" />{club.members} members</p>
                      </div>
                      <Button className="rounded-full" variant={isJoined ? "outline" : "default"} onClick={() => setJoined((prev) => prev.includes(club.name) ? prev.filter((item) => item !== club.name) : [...prev, club.name])}>
                        {isJoined ? "Joined" : "Join club"}
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </ModulePage>
    </AppShell>
  )
}

export default function ClubsPage() {
  return (
    <ProtectedRoute>
      <ClubsContent />
    </ProtectedRoute>
  )
}
