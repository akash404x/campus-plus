"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  Flag,
  ChevronRight,
  ArrowLeft,
  CalendarPlus,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Sparkles,
  User,
  Map
} from "lucide-react"
import { toast } from "sonner"

function EventDetailsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isRsvped, setIsRsvped] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [countdown,_setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const event = {
    id: 1,
    title: "Tech Innovation Summit 2024",
    description: "Join us for the biggest tech event of the year featuring industry leaders, hands-on workshops, and networking opportunities. This summit brings together students, professionals, and enthusiasts to explore the latest trends in technology.",
    organizer: {
      name: "Tech Club",
      avatar: "🎓",
      verified: true,
      followers: 1250
    },
    date: "March 15, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "Main Auditorium, Campus Center",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    totalSeats: 500,
    seatsLeft: 234,
    image: "🚀",
    category: "Technology",
    price: "Free",
    requirements: [
      "Valid student ID",
      "Laptop for workshops",
      "Basic programming knowledge"
    ],
    timeline: [
      { time: "9:00 AM", title: "Registration & Breakfast", description: "Check-in and networking" },
      { time: "10:00 AM", title: "Opening Keynote", description: "Welcome address by Dean" },
      { time: "11:00 AM", title: "Panel Discussion", description: "Industry leaders share insights" },
      { time: "12:30 PM", title: "Lunch Break", description: "Networking lunch" },
      { time: "2:00 PM", title: "Workshops", description: "Hands-on sessions" },
      { time: "4:00 PM", title: "Closing Ceremony", description: "Awards and certificates" }
    ],
    gallery: ["🚀", "💻", "🎯", "🎨", "🏆", "🎪"],
    faq: [
      {
        question: "Is this event free for all students?",
        answer: "Yes, this event is completely free for all students with a valid student ID."
      },
      {
        question: "Do I need to bring my own laptop?",
        answer: "Yes, please bring your laptop for the hands-on workshop sessions."
      },
      {
        question: "Will food be provided?",
        answer: "Yes, breakfast and lunch will be provided to all registered attendees."
      },
      {
        question: "Can I get a certificate of participation?",
        answer: "Yes, certificates will be awarded to all attendees who complete the full event."
      }
    ],
    relatedEvents: [
      { id: 2, title: "AI Workshop: Machine Learning", date: "March 20, 2024", image: "🤖" },
      { id: 3, title: "Career Fair: Tech Giants", date: "March 25, 2024", image: "💼" },
      { id: 4, title: "Hackathon 2024", date: "April 5, 2024", image: "💻" }
    ]
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)

    // Countdown timer
    const eventDate = new Date("2024-03-15T10:00:00")
    const interval = setInterval(() => {
      const now = new Date()
      const diff = eventDate.getTime() - now.getTime()
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        _setCountdown({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const toggleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved" : "Saved to bookmarks")
  }

  const toggleRsvp = () => {
    setIsRsvped(!isRsvped)
    toast.success(isRsvped ? "RSVP cancelled" : "RSVP confirmed!")
  }

  const handleShare = () => {
    toast.success("Link copied to clipboard!")
  }

  const handleAddToCalendar = () => {
    toast.success("Added to calendar!")
  }

  const handleReport = () => {
    toast.success("Report submitted")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Skeleton className="h-[500px] w-full rounded-3xl" />
            <Skeleton className="h-16 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-40 w-full" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-80 w-full rounded-3xl" />
                <Skeleton className="h-80 w-full rounded-3xl" />
              </div>
              <div className="space-y-8">
                <Skeleton className="h-64 w-full rounded-3xl" />
                <Skeleton className="h-64 w-full rounded-3xl" />
              </div>
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
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-[500px] bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/20 rounded-3xl overflow-hidden mb-8"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
              style={{ opacity: headerOpacity }}
            />
            
            {/* Animated Background Elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/30 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-8 h-full flex items-end pb-12 relative z-10">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1"
              >
                <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base rounded-xl">
                  {event.category}
                </Badge>
                <h1 className="text-6xl font-bold mb-6 gradient-text">
                  {event.title}
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-lg">
                  <span className="text-7xl">{event.image}</span>
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6" />
                    <span>By {event.organizer.name}</span>
                    {event.organizer.verified && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3"
              >
                <Button variant="outline" size="icon" onClick={toggleSave} className="h-14 w-14 rounded-2xl glass-card border-0">
                  <Heart className={`w-6 h-6 ${isSaved ? "fill-current text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare} className="h-14 w-14 rounded-2xl glass-card border-0">
                  <Share2 className="w-6 h-6" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleReport} className="h-14 w-14 rounded-2xl glass-card border-0">
                  <Flag className="w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-4 gap-6 mb-10"
          >
            <Card className="glass-card rounded-2xl border-0 p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <span className="text-base text-muted-foreground">Date</span>
                </div>
                <p className="font-semibold text-lg">{event.date}</p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl border-0 p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-pink-500" />
                  <span className="text-base text-muted-foreground">Time</span>
                </div>
                <p className="font-semibold text-lg">{event.time}</p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl border-0 p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span className="text-base text-muted-foreground">Location</span>
                </div>
                <p className="font-semibold text-lg">{event.location}</p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl border-0 p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-green-500" />
                  <span className="text-base text-muted-foreground">Seats Left</span>
                </div>
                <p className="font-semibold text-lg text-green-600">{event.seatsLeft} / {event.totalSeats}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <Card className="glass-card rounded-3xl border-0 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardContent className="p-0">
                <div className="flex items-center justify-center gap-10">
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text">
                      {countdown.days}
                    </div>
                    <div className="text-base text-muted-foreground mt-2">Days</div>
                  </div>
                  <div className="text-5xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text">
                      {countdown.hours}
                    </div>
                    <div className="text-base text-muted-foreground mt-2">Hours</div>
                  </div>
                  <div className="text-5xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text">
                      {countdown.minutes}
                    </div>
                    <div className="text-base text-muted-foreground mt-2">Minutes</div>
                  </div>
                  <div className="text-5xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text">
                      {countdown.seconds}
                    </div>
                    <div className="text-base text-muted-foreground mt-2">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl">About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl">Event Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {event.timeline.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex gap-6"
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                            {index !== event.timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/50 to-transparent mt-3" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                              <Clock className="w-5 h-5 text-purple-500" />
                              <span className="font-semibold text-lg">{item.time}</span>
                            </div>
                            <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                            <p className="text-base text-muted-foreground">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.requirements.map((req, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.0 + index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                          <span className="text-lg">{req}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl">Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      {event.gallery.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-5xl cursor-pointer"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl">FAQ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.faq.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.4 + index * 0.1 }}
                          className="border-2 rounded-2xl overflow-hidden glass-card border-0"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                          >
                            <span className="font-semibold text-lg">{faq.question}</span>
                            {expandedFaq === index ? (
                              <ChevronUp className="w-6 h-6" />
                            ) : (
                              <ChevronDown className="w-6 h-6" />
                            )}
                          </button>
                          <motion.div
                            initial={false}
                            animate={{
                              height: expandedFaq === index ? "auto" : 0,
                              opacity: expandedFaq === index ? 1 : 0
                            }}
                            className="overflow-hidden"
                          >
                            <p className="p-6 text-base text-muted-foreground">{faq.answer}</p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Organizer Card */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-4xl shadow-lg shadow-purple-500/25">
                        {event.organizer.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl flex items-center gap-2">
                          {event.organizer.name}
                          {event.organizer.verified && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </h3>
                        <p className="text-base text-muted-foreground">{event.organizer.followers} followers</p>
                      </div>
                    </div>
                    <Button variant="gradient" className="w-full h-12 rounded-xl">Follow</Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <Map className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full h-12 rounded-xl glass-card border-0">
                      <MapPin className="w-5 h-5 mr-2" />
                      Open in Google Maps
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <Button 
                  variant={isRsvped ? "outline" : "gradient"} 
                  size="lg"
                  className="w-full text-xl h-14 rounded-xl"
                  onClick={toggleRsvp}
                >
                  {isRsvped ? "✓ RSVP'd" : "RSVP Now"}
                </Button>
                <Button variant="outline" size="lg" className="w-full h-14 rounded-xl glass-card border-0" onClick={handleAddToCalendar}>
                  <CalendarPlus className="w-6 h-6 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" size="lg" className="w-full h-14 rounded-xl glass-card border-0" onClick={handleShare}>
                  <Share2 className="w-6 h-6 mr-2" />
                  Share Event
                </Button>
              </motion.div>

              {/* Related Events */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Related Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.relatedEvents.map((related, index) => (
                        <motion.div
                          key={related.id}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-4 p-4 rounded-2xl glass-card hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="text-4xl">{related.image}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-base">{related.title}</h4>
                            <p className="text-sm text-muted-foreground">{related.date}</p>
                          </div>
                          <ChevronRight className="w-6 h-6 text-muted-foreground" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <Button variant="outline" className="rounded-2xl h-14 px-8 glass-card border-0">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Explore
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default function EventDetailsPage() {
  return (
    <ProtectedRoute>
      <EventDetailsContent />
    </ProtectedRoute>
  )
}
