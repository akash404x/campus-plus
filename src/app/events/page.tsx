"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarDays, Clock3, MapPin, Bookmark, Sparkles, QrCode, Users, Search, CircleCheckBig } from "lucide-react"

const eventData = [
  {
    id: 1,
    title: "Campus AI Summit",
    category: "Featured",
    time: "Tomorrow · 10:00 AM",
    location: "North Hall",
    attendees: 184,
    description: "A premium networking session with founders, researchers, and student builders.",
  },
  {
    id: 2,
    title: "Community Wellness Circle",
    category: "Wellness",
    time: "Thu · 6:30 PM",
    location: "Riverside Studio",
    attendees: 72,
    description: "Join a guided reflection and mindful movement session between classes.",
  },
  {
    id: 3,
    title: "Startup Mixer Night",
    category: "Networking",
    time: "Fri · 7:00 PM",
    location: "Innovation Hub",
    attendees: 132,
    description: "Meet founders, investors, and campus innovators over curated conversations.",
  },
]

function EventsContent() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [bookmarked, setBookmarked] = useState<number[]>([])
  const [rsvped, setRsvped] = useState<number[]>([])

  const filteredEvents = useMemo(() => {
    return eventData.filter((event) => {
      const matchesQuery = `${event.title} ${event.description}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === "All" || event.category === filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  const stats = [
    { label: "Live events", value: "24", detail: "Tonight & this week", icon: CalendarDays, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "RSVPs", value: "3.2k", detail: "Growing fast", icon: Users, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
    { label: "Bookmarks", value: "12", detail: "Saved for later", icon: Bookmark, tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Events"
        subtitle="Discover curated campus moments with RSVP, bookmarks, and live planning tools."
        description="Stay on top of networking nights, well-being sessions, and student-run showcases in one polished workspace."
        badge="Live discovery"
        stats={stats}
        actions={[
          <Button key="1" variant="outline" className="rounded-full"><QrCode className="mr-2 h-4 w-4" />Generate QR</Button>,
          <Button key="2" variant="default" className="rounded-full">Create event</Button>,
        ]}
        aside={
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">This week’s pulse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/90">
                <p>4 high-intent events matched to your profile and current schedule.</p>
                <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" />Peak activity begins on Thursday.</div>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
              <CardHeader>
                <CardTitle>Popular filters</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {['All', 'Featured', 'Wellness', 'Networking'].map((item) => (
                  <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-2 text-sm ${filter === item ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                    {item}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        }
      >
        <Card className="rounded-3xl border-0 bg-white/80 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur dark:bg-slate-900/70">
          <CardContent className="space-y-5 p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, speakers, or themes" className="rounded-2xl pl-9" />
            </div>
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const isBookmarked = bookmarked.includes(event.id)
                const isRsvped = rsvped.includes(event.id)
                return (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">{event.category}</Badge>
                          <span className="text-sm text-muted-foreground">{event.attendees} attendees</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{event.time}</span>
                          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:min-w-[180px]">
                        <Button variant="outline" className="rounded-full" onClick={() => setBookmarked((prev) => prev.includes(event.id) ? prev.filter((id) => id !== event.id) : [...prev, event.id])}>
                          <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />{isBookmarked ? 'Saved' : 'Save'}
                        </Button>
                        <Button className="rounded-full" onClick={() => setRsvped((prev) => prev.includes(event.id) ? prev.filter((id) => id !== event.id) : [...prev, event.id])}>
                          {isRsvped ? <><CircleCheckBig className="mr-2 h-4 w-4" />RSVP’d</> : <><Sparkles className="mr-2 h-4 w-4" />RSVP</>}
                        </Button>
                      </div>
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

export default function EventsPage() {
  return (
    <ProtectedRoute>
      <EventsContent />
    </ProtectedRoute>
  )
}
