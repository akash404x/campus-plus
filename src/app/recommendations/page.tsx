"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { 
  Sparkles,
  Calendar,
  Trophy,
  GraduationCap,
  Briefcase,
  Users,
  Heart,
  X,
  Bookmark,
  TrendingUp,
  Target,
  Flame,
  Clock,
  MapPin,
  ChevronRight,
  RefreshCw,
  Filter,
  CheckCircle,
  Star
} from "lucide-react"
import { toast } from "sonner"

interface Recommendation {
  id: string
  type: "event" | "competition" | "scholarship" | "internship" | "club" | "volunteer"
  title: string
  description: string
  image: string
  date?: string
  deadline?: string
  location?: string
  reason: string
  matchScore: number
  saved: boolean
  dismissed: boolean
}

function RecommendationsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set())

  const userInterests = ["Technology", "AI/ML", "Web Development", "Data Science"]
  const userSkills = ["JavaScript", "Python", "React", "Node.js", "SQL"]
  const previousActivity = ["Tech Summit 2024", "Hackathon Winner", "Volunteer at Food Bank"]

  const filterOptions = [
    { id: "all", label: "All", icon: Sparkles },
    { id: "events", label: "Events", icon: Calendar },
    { id: "competitions", label: "Competitions", icon: Trophy },
    { id: "scholarships", label: "Scholarships", icon: GraduationCap },
    { id: "internships", label: "Internships", icon: Briefcase },
    { id: "clubs", label: "Clubs", icon: Users },
    { id: "volunteer", label: "Volunteer", icon: Heart }
  ]

  const allRecommendations: Recommendation[] = [
    {
      id: "1",
      type: "event",
      title: "AI & ML Conference 2024",
      description: "Join industry leaders discussing the latest in artificial intelligence and machine learning.",
      image: "🤖",
      date: "April 15, 2024",
      location: "Tech Hub, San Francisco",
      reason: "Based on your interest in AI/ML",
      matchScore: 95,
      saved: false,
      dismissed: false
    },
    {
      id: "2",
      type: "competition",
      title: "Global AI Hackathon",
      description: "48-hour hackathon focused on building innovative AI solutions with $50,000 in prizes.",
      image: "💻",
      date: "May 1-3, 2024",
      location: "Virtual",
      reason: "Previous hackathon participation",
      matchScore: 92,
      saved: false,
      dismissed: false
    },
    {
      id: "3",
      type: "scholarship",
      title: "Google AI Research Scholarship",
      description: "$25,000 scholarship for students pursuing AI research with mentorship from Google engineers.",
      image: "🎓",
      deadline: "March 30, 2024",
      reason: "Matches your skills in AI/ML",
      matchScore: 90,
      saved: false,
      dismissed: false
    },
    {
      id: "4",
      type: "internship",
      title: "Software Engineer Intern - Meta",
      description: "12-week summer internship working on React Native and backend services.",
      image: "🏢",
      date: "Summer 2024",
      location: "Menlo Park, CA",
      reason: "Matches your React and Node.js skills",
      matchScore: 88,
      saved: false,
      dismissed: false
    },
    {
      id: "5",
      type: "club",
      title: "AI/ML Research Club",
      description: "Weekly meetings to discuss papers, work on projects, and prepare for conferences.",
      image: "🧠",
      location: "Campus Center",
      reason: "Based on your interest in AI/ML",
      matchScore: 85,
      saved: false,
      dismissed: false
    },
    {
      id: "6",
      type: "volunteer",
      title: "Code for Good Initiative",
      description: "Volunteer to build software solutions for non-profit organizations.",
      image: "❤️",
      date: "Ongoing",
      location: "Remote",
      reason: "Previous volunteer activity",
      matchScore: 83,
      saved: false,
      dismissed: false
    },
    {
      id: "7",
      type: "event",
      title: "Web Development Workshop",
      description: "Hands-on workshop covering latest React patterns and Next.js best practices.",
      image: "🌐",
      date: "April 20, 2024",
      location: "Tech Hub",
      reason: "Matches your Web Development interest",
      matchScore: 80,
      saved: false,
      dismissed: false
    },
    {
      id: "8",
      type: "scholarship",
      title: "Microsoft Future Leaders",
      description: "$15,000 scholarship for underrepresented students in tech with mentorship program.",
      image: "💰",
      deadline: "April 15, 2024",
      reason: "Based on your technology interests",
      matchScore: 78,
      saved: false,
      dismissed: false
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setRecommendations(allRecommendations)
      setIsLoading(false)
    }, 1500)
  }, [])

  const filteredRecommendations = recommendations.filter(rec => {
    if (activeFilter === "all") return true
    return rec.type === activeFilter
  })

  const handleSave = (id: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
        toast.success("Removed from saved")
      } else {
        newSet.add(id)
        toast.success("Saved to recommendations")
      }
      return newSet
    })
  }

  const handleDismiss = (id: string) => {
    setRecommendations(prev => prev.map(rec => 
      rec.id === id ? { ...rec, dismissed: true } : rec
    ))
    toast.success("Recommendation dismissed")
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setRecommendations(allRecommendations)
      setIsLoading(false)
      toast.success("Recommendations refreshed")
    }, 1000)
  }

  const getReasonIcon = (reason: string) => {
    if (reason.includes("interest")) return <Target className="w-4 h-4" />
    if (reason.includes("skill")) return <Star className="w-4 h-4" />
    if (reason.includes("activity")) return <TrendingUp className="w-4 h-4" />
    return <Sparkles className="w-4 h-4" />
  }

  const getReasonColor = (reason: string) => {
    if (reason.includes("interest")) return "from-blue-500 to-cyan-500"
    if (reason.includes("skill")) return "from-purple-500 to-pink-500"
    if (reason.includes("activity")) return "from-green-500 to-emerald-500"
    return "from-yellow-500 to-orange-500"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "event": return <Calendar className="w-5 h-5" />
      case "competition": return <Trophy className="w-5 h-5" />
      case "scholarship": return <GraduationCap className="w-5 h-5" />
      case "internship": return <Briefcase className="w-5 h-5" />
      case "club": return <Users className="w-5 h-5" />
      case "volunteer": return <Heart className="w-5 h-5" />
      default: return <Sparkles className="w-5 h-5" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-10 w-24 flex-shrink-0 rounded-xl" />
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Personalized Recommendations
              </h1>
              <p className="text-muted-foreground mt-1">
                Curated just for you based on your interests and activity
              </p>
            </div>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* User Profile Summary */}
          <Card className="border-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Interests:</span>
                  <div className="flex gap-1">
                    {userInterests.map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-pink-500" />
                  <span className="text-sm">Skills:</span>
                  <div className="flex gap-1">
                    {userSkills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((filter, index) => (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-muted/50 hover:bg-muted border border-border"
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span className="font-medium">{filter.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="container mx-auto px-4 pb-8">
        <AnimatePresence mode="popLayout">
          {filteredRecommendations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Sparkles className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No recommendations found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className="border-2 hover:border-purple-500/50 transition-all overflow-hidden group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                            {rec.image}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{rec.title}</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              {getTypeIcon(rec.type)}
                              <span className="text-xs text-muted-foreground capitalize">{rec.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-purple-500">
                          <Flame className="w-4 h-4" />
                          <span className="font-bold">{rec.matchScore}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {rec.description}
                      </p>

                      {/* Reason Label */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Badge className={`bg-gradient-to-r ${getReasonColor(rec.reason)} text-white`}>
                          {getReasonIcon(rec.reason)}
                          <span className="ml-1 text-xs">{rec.reason}</span>
                        </Badge>
                      </motion.div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        {rec.date && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{rec.date}</span>
                          </div>
                        )}
                        {rec.deadline && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {rec.deadline}</span>
                          </div>
                        )}
                        {rec.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{rec.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleSave(rec.id)}
                        >
                          <Bookmark className={`w-4 h-4 mr-2 ${savedItems.has(rec.id) ? "fill-current" : ""}`} />
                          {savedItems.has(rec.id) ? "Saved" : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDismiss(rec.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button variant="gradient" size="sm" className="flex-1">
                          View
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Saved Items Section */}
      {savedItems.size > 0 && (
        <div className="container mx-auto px-4 pb-8">
          <Card className="border-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 fill-current text-purple-500" />
                Saved Recommendations ({savedItems.size})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations
                  .filter(rec => savedItems.has(rec.id))
                  .map((rec) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
                    >
                      <div className="text-2xl">{rec.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground capitalize">{rec.type}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(rec.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function RecommendationsPage() {
  return (
    <ProtectedRoute>
      <RecommendationsContent />
    </ProtectedRoute>
  )
}
