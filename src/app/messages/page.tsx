"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, SendHorizonal, Sparkles } from "lucide-react"

const threads = [
  { name: "Maya", role: "Hackathon organizer", preview: "Can you share your portfolio link before Friday?" },
  { name: "Jordan", role: "Volunteer lead", preview: "The shift is confirmed. See you at 9 AM." },
]

function MessagesContent() {
  const [activeThread, setActiveThread] = useState(threads[0].name)
  const stats = [
    { label: "Unread", value: "4", detail: "New this week", icon: MessageSquare, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Saved threads", value: "7", detail: "Pinned for follow-up", icon: Sparkles, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Messages"
        subtitle="Keep campus conversations moving with quick, focused inbox views."
        description="Chat with event organizers, clubs, mentors, and collaborators without leaving the Campus+ experience."
        badge="Inbox"
        stats={stats}
        actions={<Button className="rounded-full">Compose</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p>Messages are grouped by urgency, team, and campus context so nothing gets lost.</p>
            </CardContent>
          </Card>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-3xl border-0 bg-white/80 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search messages" className="rounded-2xl pl-9" />
              </div>
              <div className="space-y-3">
                {threads.map((thread) => (
                  <button key={thread.name} onClick={() => setActiveThread(thread.name)} className={`w-full rounded-2xl border p-4 text-left ${activeThread === thread.name ? "border-violet-300 bg-violet-50 dark:border-violet-500/40 dark:bg-violet-500/10" : "border-border/60 bg-background/60"}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{thread.name}</span>
                      <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{thread.role}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{thread.preview}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
            <CardContent className="space-y-5 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{activeThread}</h3>
                  <p className="text-sm text-muted-foreground">Latest update from your campus network</p>
                </div>
                <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">Online</Badge>
              </div>
              <div className="rounded-2xl bg-background/70 p-4 text-sm text-muted-foreground">Hi! I’m organizing the student showcase and would love your final submission by Friday morning.</div>
              <div className="flex gap-2">
                <Input placeholder="Type a reply" className="rounded-2xl" />
                <Button className="rounded-2xl"><SendHorizonal className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ModulePage>
    </AppShell>
  )
}

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <MessagesContent />
    </ProtectedRoute>
  )
}
