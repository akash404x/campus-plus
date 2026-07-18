"use client"

import { useState, useEffect } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { 
  Trophy,
  Award,
  Medal,
  Clock,
  FolderKanban,
  FileText,
  Download,
  Share2,
  Sparkles,
  TrendingUp,
  Target,
  Flame,
  Star,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Wand2,
  Link2
} from "lucide-react"
import { toast } from "sonner"

function PortfolioContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Animated stats
  const volunteerHours = useMotionValue(0)
  const animatedHours = useSpring(volunteerHours, { stiffness: 100, damping: 30 })
  
  const projectsCount = useMotionValue(0)
  const animatedProjects = useSpring(projectsCount, { stiffness: 100, damping: 30 })
  
  const certificatesCount = useMotionValue(0)
  const animatedCertificates = useSpring(certificatesCount, { stiffness: 100, damping: 30 })
  
  const badgesCount = useMotionValue(0)
  const animatedBadges = useSpring(badgesCount, { stiffness: 100, damping: 30 })

  const portfolio = {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex.johnson@campus.edu",
    stats: {
      volunteerHours: 156,
      projects: 12,
      certificates: 8,
      badges: 15
    },
    achievements: [
      { id: 1, title: "Hackathon Winner 2024", description: "First place in Global AI Hackathon", icon: "🏆", date: "March 2024" },
      { id: 2, title: "Dean's List", description: "Academic excellence for 3 consecutive semesters", icon: "⭐", date: "Fall 2023" },
      { id: 3, title: "Best Project Award", description: "Outstanding capstone project recognition", icon: "🎯", date: "December 2023" },
      { id: 4, title: "Community Impact", description: "100+ hours of community service", icon: "❤️", date: "Ongoing" }
    ],
    certificates: [
      { id: 1, name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "January 2024", icon: "☁️" },
      { id: 2, name: "Google UX Design", issuer: "Google", date: "November 2023", icon: "🎨" },
      { id: 3, name: "Meta Frontend Developer", issuer: "Meta", date: "September 2023", icon: "💻" },
      { id: 4, name: "Data Science Fundamentals", issuer: "IBM", date: "July 2023", icon: "📊" }
    ],
    badges: [
      { id: 1, name: "Code Ninja", icon: "🥷", description: "Completed 50+ coding challenges" },
      { id: 2, name: "Team Player", icon: "🤝", description: "Collaborated on 10+ team projects" },
      { id: 3, name: "Fast Learner", icon: "🚀", description: "Learned 5+ new technologies in 6 months" },
      { id: 4, name: "Bug Hunter", icon: "🔍", description: "Found and fixed 100+ bugs" },
      { id: 5, name: "Mentor", icon: "📚", description: "Mentored 5 junior developers" },
      { id: 6, name: "Open Source", icon: "🌟", description: "Contributed to 3 open source projects" }
    ],
    projects: [
      { id: 1, name: "AI Chatbot Platform", description: "Built a chatbot using GPT-4 and React", tech: ["React", "Node.js", "OpenAI"], icon: "🤖", link: "#" },
      { id: 2, name: "E-commerce Dashboard", description: "Full-stack dashboard for inventory management", tech: ["Next.js", "PostgreSQL", "Prisma"], icon: "📦", link: "#" },
      { id: 3, name: "Social Media App", description: "Mobile-first social platform with real-time features", tech: ["React Native", "Firebase", "Socket.io"], icon: "📱", link: "#" },
      { id: 4, name: "Data Visualization Tool", description: "Interactive charts and graphs for data analysis", tech: ["D3.js", "Python", "Flask"], icon: "📈", link: "#" }
    ]
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      volunteerHours.set(portfolio.stats.volunteerHours)
      projectsCount.set(portfolio.stats.projects)
      certificatesCount.set(portfolio.stats.certificates)
      badgesCount.set(portfolio.stats.badges)
    }, 1500)
  }, [])

  const handleDownloadPDF = () => {
    toast.success("Portfolio PDF downloaded!")
  }

  const handleGeneratePortfolio = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      toast.success("Portfolio generated successfully!")
    }, 2000)
  }

  const handleSharePortfolio = () => {
    toast.success("Portfolio link copied to clipboard!")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-48 w-full rounded-3xl" />
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-80 w-full rounded-3xl" />
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
            className="glass-card rounded-3xl border-0 p-8 mb-10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h1 className="text-5xl font-bold gradient-text mb-3">My Portfolio</h1>
                <p className="text-2xl text-muted-foreground mb-2">{portfolio.name} • {portfolio.title}</p>
                <p className="text-base text-muted-foreground">{portfolio.email}</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleDownloadPDF} className="h-14 px-6 rounded-xl glass-card border-0">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="gradient" 
                  onClick={handleGeneratePortfolio}
                  disabled={isGenerating}
                  className="h-14 px-6 rounded-xl shadow-lg shadow-purple-500/25"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Portfolio
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleSharePortfolio} className="h-14 px-6 rounded-xl glass-card border-0">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card rounded-3xl border-0 p-8 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <CardContent className="p-0">
                  <Clock className="w-10 h-10 mx-auto mb-4 text-purple-500" />
                  <motion.div className="text-5xl font-bold gradient-text">
                    {animatedHours.get()}
                  </motion.div>
                  <div className="text-base text-muted-foreground mt-2">Volunteer Hours</div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card rounded-3xl border-0 p-8 text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <CardContent className="p-0">
                  <FolderKanban className="w-10 h-10 mx-auto mb-4 text-blue-500" />
                  <motion.div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    {animatedProjects.get()}
                  </motion.div>
                  <div className="text-base text-muted-foreground mt-2">Projects</div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card rounded-3xl border-0 p-8 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <CardContent className="p-0">
                  <Award className="w-10 h-10 mx-auto mb-4 text-green-500" />
                  <motion.div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {animatedCertificates.get()}
                  </motion.div>
                  <div className="text-base text-muted-foreground mt-2">Certificates</div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-card rounded-3xl border-0 p-8 text-center bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                <CardContent className="p-0">
                  <Medal className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                  <motion.div className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {animatedBadges.get()}
                  </motion.div>
                  <div className="text-base text-muted-foreground mt-2">Badges</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolio.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="glass-card rounded-3xl border-0 p-6 text-center hover:bg-muted/50 transition-all cursor-pointer">
                    <CardContent className="p-0">
                      <div className="text-5xl mb-4">{achievement.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      <Badge variant="secondary" className="text-sm px-3 py-1 rounded-xl">{achievement.date}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-green-500" />
              Certificates
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Card className="glass-card rounded-3xl border-0 p-6 flex items-center gap-6 hover:bg-muted/50 transition-all cursor-pointer">
                    <div className="text-5xl">{cert.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl">{cert.name}</h3>
                      <p className="text-base text-muted-foreground">{cert.issuer}</p>
                      <Badge variant="secondary" className="mt-3 text-sm px-3 py-1 rounded-xl">{cert.date}</Badge>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Medal className="w-8 h-8 text-orange-500" />
              Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {portfolio.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Card className="glass-card rounded-3xl border-0 p-6 text-center hover:bg-muted/50 transition-all cursor-pointer">
                    <CardContent className="p-0">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="font-semibold text-base">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-2">{badge.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-blue-500" />
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolio.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-card rounded-3xl border-0 hover:bg-muted/50 transition-all">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{project.icon}</div>
                          <div>
                            <CardTitle className="text-2xl">{project.name}</CardTitle>
                            <p className="text-base text-muted-foreground mt-2">{project.description}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl glass-card border-0">
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-sm px-3 py-1 rounded-xl">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resume Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-500" />
              Resume
            </h2>
            <Card className="glass-card rounded-3xl border-0 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Alex Johnson - Resume</h3>
                      <p className="text-lg text-muted-foreground">Last updated: March 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleDownloadPDF} className="h-14 px-6 rounded-xl glass-card border-0">
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </Button>
                    <Button variant="gradient" className="h-14 px-6 rounded-xl shadow-lg shadow-purple-500/25">
                      <Link2 className="w-5 h-5 mr-2" />
                      View Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generate Portfolio CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <Card className="glass-card rounded-3xl border-0 p-10 text-center bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-600/20">
              <CardContent className="p-0">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-500" />
                <h3 className="text-3xl font-bold mb-3 gradient-text">Share Your Achievements</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Generate a beautiful portfolio to showcase your achievements, certificates, badges, and projects to potential employers and collaborators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="gradient" 
                    size="lg"
                    onClick={handleGeneratePortfolio}
                    disabled={isGenerating}
                    className="h-16 px-10 text-xl rounded-xl shadow-lg shadow-purple-500/25"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-6 h-6 mr-2 animate-spin" />
                        Generating Portfolio...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-6 h-6 mr-2" />
                        Generate Portfolio
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleSharePortfolio} className="h-16 px-10 text-xl rounded-xl glass-card border-0">
                    <Share2 className="w-6 h-6 mr-2" />
                    Share Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <ProtectedRoute>
      <PortfolioContent />
    </ProtectedRoute>
  )
}
