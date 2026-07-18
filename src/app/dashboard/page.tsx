"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { AppShell } from "@/components/dashboard/app-shell"
import { 
  Search, 
  Calendar, 
  Users, 
  Award, 
  Brain, 
  Clock, 
  MapPin,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Heart,
  BookOpen,
  MessageSquare,
  Star,
  Trophy,
  Flame,
  Zap,
  Target,
  Cpu,
  Palette,
  Dumbbell,
  Briefcase,
  GraduationCap,
  Globe,
  Bell
} from "lucide-react"

function DashboardContent() {
  const { user, userProfile } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getDisplayName = () => {
    const normalizeName = (value?: string | null) => {
      if (!value) return ""

      const trimmed = value.trim()
      if (!trimmed) return ""

      const hasSpace = /\s/.test(trimmed)
      const looksLikeUsername = /^[a-z0-9._-]+$/i.test(trimmed) && !hasSpace

      if (looksLikeUsername) return ""
      return trimmed
    }

    const firebaseName = normalizeName(user?.displayName)
    if (firebaseName) return firebaseName

    const profile = userProfile as Record<string, unknown> | null
    const firestoreNameCandidates = [
      normalizeName(profile?.displayName as string | undefined),
      normalizeName(profile?.fullName as string | undefined),
      normalizeName(profile?.name as string | undefined),
    ]

    const readableFirestoreName = firestoreNameCandidates.find(Boolean)
    if (readableFirestoreName) return readableFirestoreName

    const firstName = normalizeName(profile?.firstName as string | undefined)
    const lastName = normalizeName(profile?.lastName as string | undefined)
    if (firstName || lastName) {
      return [firstName, lastName].filter(Boolean).join(" ")
    }

    const emailLocalPart = user?.email?.split("@")[0] || ""
    if (!emailLocalPart) return "User"

    const parts = emailLocalPart
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)

    if (!parts.length) return "User"

    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const displayName = getDisplayName()

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const categories = [
    { id: "all", name: "All", icon: Globe, color: "from-purple-500 to-pink-500" },
    { id: "tech", name: "Technology", icon: Cpu, color: "from-blue-500 to-cyan-500" },
    { id: "arts", name: "Arts", icon: Palette, color: "from-pink-500 to-rose-500" },
    { id: "sports", name: "Sports", icon: Dumbbell, color: "from-orange-500 to-amber-500" },
    { id: "academic", name: "Academic", icon: GraduationCap, color: "from-green-500 to-emerald-500" },
    { id: "social", name: "Social", icon: Users, color: "from-violet-500 to-purple-500" },
    { id: "career", name: "Career", icon: Briefcase, color: "from-indigo-500 to-blue-500" },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "Tomorrow, 10:00 AM",
      location: "Main Auditorium",
      attendees: 234,
      image: "🚀",
      category: "tech",
      featured: true
    },
    {
      id: 2,
      title: "Career Fair: Tech Giants",
      date: "Friday, 2:00 PM",
      location: "Student Center",
      attendees: 156,
      image: "💼",
      category: "career",
      featured: false
    },
    {
      id: 3,
      title: "AI Workshop: Machine Learning",
      date: "Saturday, 9:00 AM",
      location: "Lab 3",
      attendees: 45,
      image: "🤖",
      category: "tech",
      featured: false
    },
    {
      id: 4,
      title: "Art Exhibition: Digital Dreams",
      date: "Sunday, 11:00 AM",
      location: "Art Gallery",
      attendees: 89,
      image: "🎨",
      category: "arts",
      featured: false
    }
  ]

  const recommendedEvents = [
    {
      id: 1,
      title: "Hackathon 2024",
      date: "Next Weekend",
      location: "Tech Hub",
      attendees: 120,
      image: "💻",
      match: "95% match",
      category: "tech"
    },
    {
      id: 2,
      title: "Photography Workshop",
      date: "This Thursday",
      location: "Studio B",
      attendees: 25,
      image: "📸",
      match: "88% match",
      category: "arts"
    }
  ]

  const competitions = [
    {
      id: 1,
      title: "Code Warriors Challenge",
      prize: "$10,000",
      deadline: "3 days",
      participants: 234,
      image: "🏆",
      category: "tech"
    },
    {
      id: 2,
      title: "Business Pitch Competition",
      prize: "$5,000",
      deadline: "1 week",
      participants: 89,
      image: "🎯",
      category: "career"
    },
    {
      id: 3,
      title: "Gaming Tournament",
      prize: "$2,000",
      deadline: "2 weeks",
      participants: 156,
      image: "🎮",
      category: "social"
    }
  ]

  const trendingClubs = [
    {
      id: 1,
      name: "Coding Club",
      members: 450,
      category: "Technology",
      image: "💻"
    },
    {
      id: 2,
      name: "Debate Society",
      members: 320,
      category: "Academic",
      image: "🎤"
    },
    {
      id: 3,
      name: "Photography Club",
      members: 280,
      category: "Arts",
      image: "📸"
    }
  ]

  const scholarships = [
    {
      id: 1,
      title: "Excellence in Technology",
      amount: "$5,000",
      deadline: "5 days left",
      eligibility: "GPA 3.5+"
    },
    {
      id: 2,
      title: "Community Leadership",
      amount: "$3,000",
      deadline: "12 days left",
      eligibility: "Volunteer 50+ hours"
    },
    {
      id: 3,
      title: "Innovation Grant",
      amount: "$10,000",
      deadline: "20 days left",
      eligibility: "Project proposal"
    }
  ]

  const volunteerOpportunities = [
    {
      id: 1,
      title: "Campus Cleanup Drive",
      hours: 4,
      date: "This Sunday",
      spots: 15
    },
    {
      id: 2,
      title: "Mentor Junior Students",
      hours: 2,
      date: "Weekly",
      spots: 8
    },
    {
      id: 3,
      title: "Tech Support for Seniors",
      hours: 3,
      date: "Flexible",
      spots: 20
    }
  ]

  const recentActivity = [
    { id: 1, action: "RSVP'd to Tech Summit", time: "2 hours ago" },
    { id: 2, action: "Joined Coding Club", time: "1 day ago" },
    { id: 3, action: "Completed 5 volunteer hours", time: "2 days ago" },
    { id: 4, action: "Earned 'Early Bird' badge", time: "3 days ago" }
  ]

  const quickActions = [
    { icon: Calendar, label: "Events", color: "bg-purple-500" },
    { icon: Users, label: "Clubs", color: "bg-blue-500" },
    { icon: Award, label: "Scholarships", color: "bg-green-500" },
    { icon: Heart, label: "Volunteer", color: "bg-pink-500" },
    { icon: Brain, label: "AI Mentor", color: "bg-indigo-500" },
    { icon: BookOpen, label: "Courses", color: "bg-orange-500" }
  ]

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-7xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-14 w-full" />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="glass-card rounded-3xl border-0">
                    <CardHeader>
                      <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...Array(3)].map((_, j) => (
                          <Skeleton key={j} className="h-20 w-full rounded-xl" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="glass-card rounded-3xl border-0">
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[...Array(4)].map((_, j) => (
                          <Skeleton key={j} className="h-16 w-full rounded-xl" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-5xl font-bold mb-3">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {displayName}! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's what's happening on campus today
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                placeholder="Search events, clubs, scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 text-lg rounded-2xl glass-card border-0"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-purple-500/25`
                      : 'glass-card hover:bg-muted/50'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="font-medium text-base">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="cursor-pointer glass-card card-hover rounded-2xl border-0 p-6">
                    <CardContent className="p-0 flex flex-col items-center justify-center">
                      <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center mb-3 shadow-lg`}>
                        <action.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Events */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-yellow-500" />
                        </div>
                        Recommended for You
                      </CardTitle>
                      <Button variant="ghost" size="lg">
                        View All
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-colors cursor-pointer border border-purple-500/20"
                        >
                          <div className="text-5xl">{event.image}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl">{event.title}</h3>
                            <div className="flex items-center gap-6 text-base text-muted-foreground mt-2">
                              <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base">{event.match}</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl">Upcoming Events</CardTitle>
                      <Button variant="ghost" size="lg">
                        View All
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center gap-6 p-6 rounded-2xl glass-card hover:bg-muted/50 transition-colors cursor-pointer ${event.featured ? 'border-2 border-purple-500/30' : ''}`}
                        >
                          <div className="text-5xl">{event.image}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-xl">{event.title}</h3>
                              {event.featured && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">Featured</Badge>}
                            </div>
                            <div className="flex items-center gap-6 text-base text-muted-foreground mt-2">
                              <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-base px-4 py-2">{event.attendees} going</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Competitions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                        Competitions
                      </CardTitle>
                      <Button variant="ghost" size="lg">
                        View All
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {competitions.map((competition) => (
                        <motion.div
                          key={competition.id}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 transition-colors cursor-pointer text-center border border-yellow-500/20"
                        >
                          <div className="text-5xl mb-3">{competition.image}</div>
                          <h3 className="font-semibold text-base">{competition.title}</h3>
                          <div className="mt-3 space-y-2">
                            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{competition.prize}</div>
                            <div className="text-sm text-muted-foreground">{competition.deadline}</div>
                            <Badge variant="outline" className="text-sm">{competition.participants} participants</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Trending Clubs */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                          <Flame className="w-6 h-6 text-orange-500" />
                        </div>
                        Trending Clubs
                      </CardTitle>
                      <Button variant="ghost" size="lg">
                        View All
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {trendingClubs.map((club) => (
                        <motion.div
                          key={club.id}
                          whileHover={{ scale: 1.05 }}
                          className="p-6 rounded-2xl glass-card hover:bg-muted/50 transition-colors cursor-pointer text-center"
                        >
                          <div className="text-5xl mb-3">{club.image}</div>
                          <h3 className="font-semibold text-lg">{club.name}</h3>
                          <p className="text-base text-muted-foreground">{club.members} members</p>
                          <Badge variant="outline" className="mt-3">{club.category}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Scholarships */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-green-500" />
                        </div>
                        Scholarships
                      </CardTitle>
                      <Button variant="ghost" size="lg">
                        View All
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scholarships.map((scholarship) => (
                        <motion.div
                          key={scholarship.id}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-6 p-6 rounded-2xl glass-card hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/25">
                            <Award className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{scholarship.title}</h3>
                            <p className="text-base text-muted-foreground">{scholarship.eligibility}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-2xl text-primary">{scholarship.amount}</div>
                            <Badge variant="outline" className="mt-2">{scholarship.deadline}</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* AI Mentor Widget */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="gradient-bg rounded-3xl p-8 text-white shadow-xl shadow-purple-500/25">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Brain className="w-7 h-7" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">AI Mentor</CardTitle>
                        <CardDescription className="text-white/80 text-base">Your personal assistant</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="secondary" className="w-full justify-start h-12 text-base rounded-xl">
                        <MessageSquare className="w-5 h-5 mr-3" />
                        Start Chat
                      </Button>
                      <Button variant="secondary" className="w-full justify-start h-12 text-base rounded-xl">
                        <BookOpen className="w-5 h-5 mr-3" />
                        Get Career Advice
                      </Button>
                      <Button variant="secondary" className="w-full justify-start h-12 text-base rounded-xl">
                        <Award className="w-5 h-5 mr-3" />
                        Review Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Volunteer Opportunities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Volunteer</CardTitle>
                    <CardDescription className="text-base">Make a difference</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {volunteerOpportunities.map((opportunity) => (
                        <motion.div
                          key={opportunity.id}
                          whileHover={{ scale: 1.02 }}
                          className="p-5 rounded-2xl glass-card hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <h4 className="font-semibold text-base">{opportunity.title}</h4>
                          <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                            <span>{opportunity.hours}h</span>
                            <span>{opportunity.date}</span>
                            <Badge variant="outline" className="text-sm">{opportunity.spots} spots</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4">
                            <div className="w-3 h-3 rounded-full bg-primary mt-2" />
                            <div>
                              <p className="text-base">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 pb-6"
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(139,92,246,0.35)] p-6 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-cyan-500/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-transparent bg-clip-text">
                Campus+
              </div>
              <div className="mt-3 space-y-1 text-[11px] sm:text-[12px] text-[#9CA3AF]">
                <p>© 2026 Campus+</p>
                <p>Developed by Akash Singh</p>
                <p>Version 1.0</p>
              </div>
            </div>
          </motion.div>
        </div>
      </AppShell>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
