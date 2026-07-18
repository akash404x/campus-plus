"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Filter,
  Heart,
  Clock,
  ChevronRight,
  Sparkles,
  Share2,
  Flame,
  TrendingUp,
  Map,
  Bookmark,
  SlidersHorizontal,
  X,
  CalendarDays,
  Navigation
} from "lucide-react"
import { toast } from "sonner"

function ExploreContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("trending")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [rsvpedEvents, setRsvpedEvents] = useState<number[]>([])
  const [isInView, setIsInView] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const categories = ["All", "Technology", "Academic", "Sports", "Arts", "Social", "Career"]

  const tabs = [
    { id: "trending", label: "Trending", icon: Flame },
    { id: "popular", label: "Popular", icon: TrendingUp },
    { id: "upcoming", label: "Upcoming", icon: CalendarDays },
    { id: "nearby", label: "Nearby", icon: Map },
    { id: "saved", label: "Saved", icon: Bookmark },
  ]

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      category: "Technology",
      date: "Tomorrow, 10:00 AM",
      location: "Main Auditorium",
      attendees: 234,
      image: "🚀",
      description: "Join us for the biggest tech event of the year featuring industry leaders.",
      organizer: "Tech Club",
      isSaved: false,
      isRsvped: false,
      distance: "0.5 km",
      trending: true,
      popular: true
    },
    {
      id: 2,
      title: "Career Fair: Tech Giants",
      category: "Career",
      date: "Friday, 2:00 PM",
      location: "Student Center",
      attendees: 156,
      image: "💼",
      description: "Meet recruiters from top tech companies and explore opportunities.",
      organizer: "Career Services",
      isSaved: false,
      isRsvped: false,
      distance: "0.3 km",
      trending: false,
      popular: true
    },
    {
      id: 3,
      title: "AI Workshop: Machine Learning",
      category: "Technology",
      date: "Saturday, 9:00 AM",
      location: "Lab 3",
      attendees: 45,
      image: "🤖",
      description: "Hands-on workshop covering ML fundamentals and practical applications.",
      organizer: "AI Research Group",
      isSaved: false,
      isRsvped: false,
      distance: "1.2 km",
      trending: true,
      popular: false
    },
    {
      id: 4,
      title: "Basketball Tournament",
      category: "Sports",
      date: "Sunday, 3:00 PM",
      location: "Sports Complex",
      attendees: 89,
      image: "🏀",
      description: "Inter-college basketball tournament with exciting matches.",
      organizer: "Sports Club",
      isSaved: false,
      isRsvped: false,
      distance: "0.8 km",
      trending: false,
      popular: true
    },
    {
      id: 5,
      title: "Art Exhibition: Modern Perspectives",
      category: "Arts",
      date: "Monday, 11:00 AM",
      location: "Art Gallery",
      attendees: 67,
      image: "🎨",
      description: "Showcase of modern art pieces from talented student artists.",
      organizer: "Art Society",
      isSaved: false,
      isRsvped: false,
      distance: "0.4 km",
      trending: true,
      popular: false
    },
    {
      id: 6,
      title: "Debate Championship Finals",
      category: "Academic",
      date: "Tuesday, 4:00 PM",
      location: "Lecture Hall A",
      attendees: 120,
      image: "🎤",
      description: "Final round of the annual debate championship.",
      organizer: "Debate Society",
      isSaved: false,
      isRsvped: false,
      distance: "0.6 km",
      trending: false,
      popular: true
    },
    {
      id: 7,
      title: "Music Festival: Campus Beats",
      category: "Arts",
      date: "Next Weekend",
      location: "Open Air Theater",
      attendees: 450,
      image: "🎵",
      description: "Annual music festival featuring student bands and artists.",
      organizer: "Music Club",
      isSaved: false,
      isRsvped: false,
      distance: "0.2 km",
      trending: true,
      popular: true
    },
    {
      id: 8,
      title: "Hackathon 2024",
      category: "Technology",
      date: "In 2 weeks",
      location: "Tech Hub",
      attendees: 200,
      image: "💻",
      description: "48-hour coding marathon with amazing prizes.",
      organizer: "Coding Club",
      isSaved: false,
      isRsvped: false,
      distance: "0.7 km",
      trending: true,
      popular: true
    }
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const toggleSave = (eventId: number) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
    toast.success(savedEvents.includes(eventId) ? "Removed from saved" : "Saved to bookmarks")
  }

  const toggleRsvp = (eventId: number) => {
    setRsvpedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
    toast.success(rsvpedEvents.includes(eventId) ? "RSVP cancelled" : "RSVP confirmed!")
  }

  const handleShare = (eventId: number) => {
    toast.success("Link copied to clipboard!")
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    
    // Tab filtering
    let matchesTab = true
    if (activeTab === "trending") matchesTab = event.trending
    else if (activeTab === "popular") matchesTab = event.popular
    else if (activeTab === "saved") matchesTab = savedEvents.includes(event.id)
    
    return matchesSearch && matchesCategory && matchesTab
  })

  const loadMore = () => {
    setPage(prev => prev + 1)
    setHasMore(false) // For demo purposes
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-14 w-64" />
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-32" />
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card rounded-3xl border-0">
                  <Skeleton className="h-56 w-full rounded-t-3xl" />
                  <CardHeader>
                    <Skeleton className="h-6 w-40 mb-3" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                placeholder="Search events, clubs, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 text-lg rounded-2xl glass-card border-0"
              />
            </div>
            <Button 
              variant="outline" 
              className="h-16 rounded-2xl glass-card border-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {showFilters && <X className="w-5 h-5 ml-2" />}
            </Button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-8 glass-card rounded-3xl border-0"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-base font-medium mb-3 block">Date Range</label>
                    <select className="w-full p-4 rounded-xl bg-background border-2">
                      <option>All Dates</option>
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-base font-medium mb-3 block">Distance</label>
                    <select className="w-full p-4 rounded-xl bg-background border-2">
                      <option>Any Distance</option>
                      <option>Within 1 km</option>
                      <option>Within 5 km</option>
                      <option>Within 10 km</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-base font-medium mb-3 block">Price</label>
                    <select className="w-full p-4 rounded-xl bg-background border-2">
                      <option>All Prices</option>
                      <option>Free</option>
                      <option>Under $10</option>
                      <option>Under $50</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <Button variant="gradient" className="rounded-xl h-12 px-8">Apply Filters</Button>
                  <Button variant="outline" className="rounded-xl h-12 px-8 glass-card border-0">Reset</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "glass-card hover:bg-muted/50 border-0"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium text-base">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex gap-4 overflow-x-auto pb-2 mt-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-2xl whitespace-nowrap transition-all text-base ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "glass-card hover:bg-muted/50 border-0"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass-card card-hover rounded-3xl border-0 overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-7xl">
                    {event.image}
                    {event.trending && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-base rounded-xl">
                        <Flame className="w-4 h-4 mr-2" />
                        Trending
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSave(event.id)}
                      className="absolute top-4 right-4 glass-card border-0 hover:bg-background/80"
                    >
                      <Heart className={`w-6 h-6 ${savedEvents.includes(event.id) ? "fill-current text-red-500" : ""}`} />
                    </Button>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-xl">{event.category}</Badge>
                        <CardTitle className="text-2xl mb-3">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-base">{event.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-base text-muted-foreground">
                        <Calendar className="w-5 h-5" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-3 text-base text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-3 text-base text-muted-foreground">
                        <Users className="w-5 h-5" />
                        {event.attendees} attending
                      </div>
                      {activeTab === "nearby" && (
                        <div className="flex items-center gap-3 text-base text-muted-foreground">
                          <Navigation className="w-5 h-5" />
                          {event.distance} away
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant={rsvpedEvents.includes(event.id) ? "outline" : "gradient"} 
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => toggleRsvp(event.id)}
                      >
                        {rsvpedEvents.includes(event.id) ? "RSVP'd" : "RSVP Now"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-12 w-12 rounded-xl glass-card border-0"
                        onClick={() => handleShare(event.id)}
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl glass-card border-0">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold mb-3">No events found</h3>
              <p className="text-lg text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>

        {/* Pagination / Load More */}
        {filteredEvents.length > 0 && hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
            ref={loadMoreRef}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-2xl h-14 px-10 glass-card border-0"
              onClick={loadMore}
            >
              Load More Events
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-center gap-3 mt-8"
          >
            <Button variant="outline" size="icon" disabled={page === 1} className="h-12 w-12 rounded-xl glass-card border-0">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Button>
            {[1, 2, 3].map((pageNum) => (
              <Button
                key={pageNum}
                variant={page === pageNum ? "gradient" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-xl"
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            ))}
            <Button variant="outline" size="icon" disabled={!hasMore} className="h-12 w-12 rounded-xl glass-card border-0">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
        </div>
      </main>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <ProtectedRoute>
      <ExploreContent />
    </ProtectedRoute>
  )
}
