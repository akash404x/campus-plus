"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Sparkles, Wand2 } from "lucide-react"

function ResumeContent() {
  const [name, setName] = useState("Alex Morgan")
  const [role, setRole] = useState("Product designer & builder")
  const [summary, setSummary] = useState("I turn ideas into polished digital experiences with a calm, strategic approach.")

  const stats = [
    { label: "Templates", value: "4", detail: "Polished options", icon: FileText, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "AI score", value: "92/100", detail: "Resume strength", icon: Wand2, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Resume Builder"
        subtitle="Turn your student experience into a polished, interview-ready story."
        description="Use Campus+ to shape your resume around your projects, achievements, and community impact."
        badge="Career-ready"
        stats={stats}
        actions={<Button className="rounded-full">Generate resume</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardContent className="p-6 text-sm text-muted-foreground">The builder uses your achievements, certificates, and portfolio evidence to generate a stronger draft.</CardContent>
          </Card>
        }
      >
        <Card className="rounded-3xl border-0 bg-white/80 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-2xl" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} className="rounded-2xl" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Professional summary</label>
              <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-28 rounded-2xl" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">Leadership</Badge>
              <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">Product</Badge>
              <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">UX</Badge>
            </div>
          </CardContent>
        </Card>
      </ModulePage>
    </AppShell>
  )
}

export default function ResumePage() {
  return (
    <ProtectedRoute>
      <ResumeContent />
    </ProtectedRoute>
  )
}
