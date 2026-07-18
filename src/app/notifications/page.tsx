"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { 
  Bell,
  Check,
  Trash2,
  Archive,
  Star,
  Calendar,
  MessageSquare,
  Award,
  AlertCircle,
  Info,
  CheckCircle,
  X,
  Filter,
  BellRing,
  Clock,
  ChevronRight
} from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "event" | "message" | "achievement" | "alert" | "info"
  title: string
  message: string
  timestamp: Date
  read: boolean
  important: boolean
  archived: boolean
  category: string
}

function NotificationCenterContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "important" | "archive">("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [pushEnabled, setPushEnabled] = useState(false)

  const categories = ["all", "events", "messages", "achievements", "alerts", "info"]

  const allNotifications: Notification[] = [
    {
      id: "1",
      type: "event",
      title: "Event Reminder: AI Conference 2024",
      message: "The AI Conference starts tomorrow at 9:00 AM. Don't forget to check in!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      important: true,
      archived: false,
      category: "events"
    },
    {
      id: "2",
      type: "message",
      title: "New message from Sarah",
      message: "Hey! Are you joining the hackathon team? We need one more member.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      important: false,
      archived: false,
      category: "messages"
    },
    {
      id: "3",
      type: "achievement",
      title: "Congratulations! New Badge Earned",
      message: "You've earned the 'Code Ninja' badge for completing 50 coding challenges.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
      important: true,
      archived: false,
      category: "achievements"
    },
    {
      id: "4",
      type: "alert",
      title: "Scholarship Deadline Approaching",
      message: "The Google AI Scholarship application deadline is in 3 days. Submit now!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
      important: true,
      archived: false,
      category: "alerts"
    },
    {
      id: "5",
      type: "info",
      title: "Profile Update Successful",
      message: "Your profile has been successfully updated with new skills.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true,
      important: false,
      archived: false,
      category: "info"
    },
    {
      id: "6",
      type: "event",
      title: "RSVP Confirmed: Tech Summit",
      message: "Your RSVP for the Tech Summit has been confirmed. See you there!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
      read: true,
      important: false,
      archived: false,
      category: "events"
    },
    {
      id: "7",
      type: "achievement",
      title: "Milestone Reached: 100 Volunteer Hours",
      message: "Amazing! You've completed 100 hours of volunteer service.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      read: true,
      important: true,
      archived: true,
      category: "achievements"
    },
    {
      id: "8",
      type: "message",
      title: "Club Invitation",
      message: "You've been invited to join the AI/ML Research Club. Accept now!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      read: true,
      important: false,
      archived: true,
      category: "messages"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setNotifications(allNotifications)
      setIsLoading(false)
    }, 1500)
  }, [])

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === "unread") return !notification.read && !notification.archived
    if (activeFilter === "important") return notification.important && !notification.archived
    if (activeFilter === "archive") return notification.archived
    if (activeFilter === "all") return !notification.archived
    return true
  }).filter(notification => {
    if (selectedCategory === "all") return true
    return notification.category === selectedCategory
  })

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length
  const importantCount = notifications.filter(n => n.important && !n.archived).length
  const archivedCount = notifications.filter(n => n.archived).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    toast.success("Marked as read")
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    toast.success("Notification deleted")
  }

  const handleArchive = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, archived: true } : n
    ))
    toast.success("Notification archived")
  }

  const handleUnarchive = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, archived: false } : n
    ))
    toast.success("Notification unarchived")
  }

  const handleTogglePush = () => {
    setPushEnabled(!pushEnabled)
    toast.success(pushEnabled ? "Push notifications disabled" : "Push notifications enabled")
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event": return <Calendar className="w-5 h-5" />
      case "message": return <MessageSquare className="w-5 h-5" />
      case "achievement": return <Award className="w-5 h-5" />
      case "alert": return <AlertCircle className="w-5 h-5" />
      case "info": return <Info className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "event": return "from-blue-500 to-cyan-500"
      case "message": return "from-purple-500 to-pink-500"
      case "achievement": return "from-yellow-500 to-orange-500"
      case "alert": return "from-red-500 to-pink-500"
      case "info": return "from-green-500 to-emerald-500"
      default: return "from-gray-500 to-slate-500"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-14 w-32 rounded-xl" />
              ))}
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-32 w-full rounded-3xl" />
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl border-0 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">Notification Center</h1>
                  <p className="text-lg text-muted-foreground">
                    {unreadCount} unread notifications
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleMarkAllAsRead} className="h-14 px-6 rounded-xl glass-card border-0">
                  <Check className="w-5 h-5 mr-2" />
                  Mark All Read
                </Button>
                <Button 
                  variant={pushEnabled ? "gradient" : "outline"} 
                  onClick={handleTogglePush}
                  className="h-14 px-6 rounded-xl"
                >
                  <BellRing className="w-5 h-5 mr-2" />
                  {pushEnabled ? "Push On" : "Push Off"}
                </Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              <motion.button
                onClick={() => setActiveFilter("all")}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                  activeFilter === "all"
                    ? "gradient-bg text-white shadow-lg shadow-purple-500/25"
                    : "glass-card hover:bg-muted/50 border-0"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-semibold text-base">All</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveFilter("unread")}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                  activeFilter === "unread"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                    : "glass-card hover:bg-muted/50 border-0"
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="font-semibold text-base">Unread</span>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white px-3 py-1 rounded-xl">{unreadCount}</Badge>
                )}
              </motion.button>
              <motion.button
                onClick={() => setActiveFilter("important")}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                  activeFilter === "important"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25"
                    : "glass-card hover:bg-muted/50 border-0"
                }`}
              >
                <Star className="w-5 h-5" />
                <span className="font-semibold text-base">Important</span>
                {importantCount > 0 && (
                  <Badge className="bg-yellow-500 text-white px-3 py-1 rounded-xl">{importantCount}</Badge>
                )}
              </motion.button>
              <motion.button
                onClick={() => setActiveFilter("archive")}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                  activeFilter === "archive"
                    ? "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/25"
                    : "glass-card hover:bg-muted/50 border-0"
                }`}
              >
                <Archive className="w-5 h-5" />
                <span className="font-semibold text-base">Archive</span>
                {archivedCount > 0 && (
                  <Badge variant="secondary" className="px-3 py-1 rounded-xl">{archivedCount}</Badge>
                )}
              </motion.button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4 mt-6">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-base text-muted-foreground">Filter by:</span>
              <div className="flex gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "gradient-bg text-white shadow-lg shadow-purple-500/25"
                        : "glass-card hover:bg-muted/50 border-0"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Notifications Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-600 rounded-full" />

            <AnimatePresence mode="popLayout">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 pl-16"
                >
                  <Bell className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                  <h3 className="text-3xl font-bold mb-4">No notifications</h3>
                  <p className="text-lg text-muted-foreground">
                    {activeFilter === "unread" && "You're all caught up!"}
                    {activeFilter === "important" && "No important notifications"}
                    {activeFilter === "archive" && "No archived notifications"}
                    {activeFilter === "all" && "No notifications to show"}
                  </p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative pl-20 pb-8 last:pb-0"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 w-6 h-6 rounded-full border-4 border-background shadow-lg ${
                      notification.read ? "bg-muted" : `bg-gradient-to-r ${getNotificationColor(notification.type)}`
                    }`} />

                    {/* Notification Card */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`relative ${
                        !notification.read ? "bg-gradient-to-r from-purple-500/5 to-pink-500/5" : ""
                      }`}
                    >
                      <Card className={`glass-card rounded-3xl border-0 p-6 ${
                        !notification.read ? "border-2 border-purple-500/50" : ""
                      } ${notification.important ? "border-2 border-yellow-500/50" : ""}`}>
                        <CardContent className="p-0">
                          <div className="flex items-start gap-6">
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0 text-white shadow-lg`}>
                              {getNotificationIcon(notification.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className={`font-semibold text-xl ${!notification.read ? "text-purple-500" : ""}`}>
                                    {notification.title}
                                  </h3>
                                  <p className="text-base text-muted-foreground mt-2 line-clamp-2">
                                    {notification.message}
                                  </p>
                                </div>
                                {notification.important && (
                                  <Star className="w-6 h-6 text-yellow-500 fill-current flex-shrink-0" />
                                )}
                              </div>

                              {/* Footer */}
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTime(notification.timestamp)}</span>
                                  <Badge variant="outline" className="text-sm px-3 py-1 rounded-xl">
                                    {notification.category}
                                  </Badge>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleMarkAsRead(notification.id)}
                                      className="h-10 w-10 rounded-xl glass-card border-0"
                                    >
                                      <Check className="w-5 h-5" />
                                    </Button>
                                  )}
                                  {activeFilter !== "archive" ? (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleArchive(notification.id)}
                                      className="h-10 w-10 rounded-xl glass-card border-0"
                                    >
                                      <Archive className="w-5 h-5" />
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleUnarchive(notification.id)}
                                      className="h-10 w-10 rounded-xl glass-card border-0"
                                    >
                                      <CheckCircle className="w-5 h-5" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(notification.id)}
                                    className="h-10 w-10 rounded-xl glass-card border-0"
                                  >
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Push Notification Banner */}
          {!pushEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <Card className="glass-card rounded-3xl border-0 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-600/10">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <BellRing className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">Enable Push Notifications</h3>
                      <p className="text-lg text-muted-foreground">
                        Get instant updates on events, messages, and important alerts directly to your device.
                      </p>
                    </div>
                    <Button variant="gradient" onClick={handleTogglePush} className="h-14 px-8 rounded-xl shadow-lg shadow-purple-500/25">
                      Enable
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function NotificationCenterPage() {
  return (
    <ProtectedRoute>
      <NotificationCenterContent />
    </ProtectedRoute>
  )
}
