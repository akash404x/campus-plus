"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { 
  User,
  Clock,
  Award,
  Trophy,
  Download,
  Share2,
  QrCode,
  Star,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Medal,
  Crown,
  Shield,
  Heart,
  Zap,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"

function VolunteerPassportContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const animatedProgress = useSpring(progress, { stiffness: 100, damping: 30 })

  const volunteer = {
    name: "Alex Johnson",
    email: "alex.johnson@campus.edu",
    avatar: "🎓",
    totalHours: 156,
    currentLevel: "Gold",
    nextLevel: "Platinum",
    levelProgress: 75,
    rank: 12,
    totalVolunteers: 500,
    qrCode: "VP-2024-ALEX-156",
    badges: [
      { id: 1, name: "First Steps", icon: "🚀", description: "Completed first volunteer activity", earned: true },
      { id: 2, name: "Dedicated", icon: "⭐", description: "50+ volunteer hours", earned: true },
      { id: 3, name: "Team Player", icon: "🤝", description: "Participated in 10+ team events", earned: true },
      { id: 4, name: "Leader", icon: "👑", description: "Led 5+ volunteer activities", earned: true },
      { id: 5, name: "Community Hero", icon: "🦸", description: "100+ volunteer hours", earned: true },
      { id: 6, name: "Event Master", icon: "🎯", description: "Organized 3+ major events", earned: false },
      { id: 7, name: "Mentor", icon: "📚", description: "Mentored 5+ new volunteers", earned: false },
      { id: 8, name: "Legend", icon: "🏆", description: "200+ volunteer hours", earned: false }
    ],
    activities: [
      { id: 1, title: "Campus Cleanup Drive", date: "March 10, 2024", hours: 4, location: "Main Campus", type: "Environmental" },
      { id: 2, title: "Food Bank Volunteer", date: "March 5, 2024", hours: 3, location: "Community Center", type: "Community" },
      { id: 3, title: "Tech Workshop Helper", date: "February 28, 2024", hours: 5, location: "Tech Hub", type: "Education" },
      { id: 4, title: "Charity Run Support", date: "February 20, 2024", hours: 6, location: "City Park", type: "Sports" },
      { id: 5, title: "Library Organization", date: "February 15, 2024", hours: 3, location: "Campus Library", type: "Education" }
    ],
    certificates: [
      { id: 1, name: "Volunteer Excellence 2023", date: "December 2023", status: "Earned" },
      { id: 2, name: "Community Service Award", date: "June 2023", status: "Earned" },
      { id: 3, name: "Leadership Certificate", date: "March 2023", status: "Earned" }
    ],
    leaderboard: [
      { rank: 1, name: "Sarah Chen", hours: 245, avatar: "👩‍💻", level: "Diamond" },
      { rank: 2, name: "Mike Johnson", hours: 220, avatar: "👨‍💼", level: "Diamond" },
      { rank: 3, name: "Emily Davis", hours: 198, avatar: "👩‍🎓", level: "Platinum" },
      { rank: 4, name: "James Wilson", hours: 185, avatar: "👨‍🔬", level: "Platinum" },
      { rank: 5, name: "Lisa Brown", hours: 172, avatar: "👩‍🏫", level: "Gold" }
    ]
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
    setTimeout(() => setProgress(volunteer.levelProgress), 2000)
  }, [])

  const handleDownloadPDF = () => {
    toast.success("Passport PDF downloaded!")
  }

  const handleShareProfile = () => {
    toast.success("Public profile link copied!")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-64 w-full" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        style={{ opacity: headerOpacity }}
        className="sticky top-0 z-50 glass border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Volunteer Passport
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleDownloadPDF}>
                <Download className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShareProfile}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-2 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-600/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse" />
            <CardContent className="p-8 relative">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar & QR Code */}
                <div className="flex items-center gap-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl shadow-2xl"
                  >
                    {volunteer.avatar}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="w-24 h-24 bg-white rounded-xl p-2 shadow-lg"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-4xl font-bold mb-2">{volunteer.name}</h2>
                    <p className="text-muted-foreground mb-4">{volunteer.email}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Crown className="w-4 h-4 mr-1" />
                        {volunteer.currentLevel} Volunteer
                      </Badge>
                      <Badge variant="outline">
                        <Trophy className="w-4 h-4 mr-1" />
                        Rank #{volunteer.rank} of {volunteer.totalVolunteers}
                      </Badge>
                    </div>
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {volunteer.totalHours}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Hours</div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {volunteer.badges.filter(b => b.earned).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Badges</div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress & Level */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{volunteer.currentLevel}</span>
                    <span className="text-muted-foreground">{volunteer.nextLevel}</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${animatedProgress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold">{animatedProgress.get()}%</span>
                    <span className="text-muted-foreground ml-2">to {volunteer.nextLevel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Leaderboard Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-6xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    #{volunteer.rank}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">of {volunteer.totalVolunteers}</div>
                    <div className="text-green-600 font-semibold">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      +3 this month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-yellow-500" />
                Badges & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {volunteer.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                      badge.earned
                        ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30"
                        : "bg-muted/30 border-muted opacity-50"
                    }`}
                  >
                    <div className={`text-4xl mb-2 ${badge.earned ? "" : "grayscale"}`}>
                      {badge.icon}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {badge.earned && (
                      <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Timeline */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="border-2 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteer.activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                      className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                        {activity.type === "Environmental" && "🌱"}
                        {activity.type === "Community" && "🤝"}
                        {activity.type === "Education" && "📚"}
                        {activity.type === "Sports" && "🏃"}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {activity.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-500">{activity.hours}h</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Card className="border-2 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteer.certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.date}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {cert.status}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-8"
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {volunteer.leaderboard.map((person, index) => (
                  <motion.div
                    key={person.rank}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      person.rank === 1
                        ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50"
                        : person.rank === 2
                        ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-2 border-gray-400/50"
                        : person.rank === 3
                        ? "bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-2 border-orange-600/50"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                      {person.rank}
                    </div>
                    <div className="text-3xl">{person.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{person.name}</h4>
                      <p className="text-sm text-muted-foreground">{person.level}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-500">{person.hours}h</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="gradient" size="lg" className="text-lg" onClick={handleDownloadPDF}>
            <Download className="w-5 h-5 mr-2" />
            Download Passport PDF
          </Button>
          <Button variant="outline" size="lg" className="text-lg" onClick={handleShareProfile}>
            <Share2 className="w-5 h-5 mr-2" />
            Share Public Profile
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

export default function VolunteerPassportPage() {
  return (
    <ProtectedRoute>
      <VolunteerPassportContent />
    </ProtectedRoute>
  )
}
