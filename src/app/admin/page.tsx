"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { 
  LayoutDashboard,
  BarChart3,
  Users,
  Calendar,
  Building2,
  Trophy,
  GraduationCap,
  Heart,
  Award,
  FileText,
  Bell,
  CheckCircle,
  Settings,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Ban,
  Shield,
  Download,
  RefreshCw
} from "lucide-react"
import { toast } from "sonner"

type AdminTab = "dashboard" | "analytics" | "users" | "events" | "clubs" | "competitions" | "scholarships" | "volunteer" | "certificates" | "reports" | "notifications" | "content" | "settings"

function AdminContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sidebarItems = [
    { id: "dashboard" as AdminTab, icon: LayoutDashboard, label: "Dashboard" },
    { id: "analytics" as AdminTab, icon: BarChart3, label: "Analytics" },
    { id: "users" as AdminTab, icon: Users, label: "Manage Users" },
    { id: "events" as AdminTab, icon: Calendar, label: "Manage Events" },
    { id: "clubs" as AdminTab, icon: Building2, label: "Manage Clubs" },
    { id: "competitions" as AdminTab, icon: Trophy, label: "Manage Competitions" },
    { id: "scholarships" as AdminTab, icon: GraduationCap, label: "Manage Scholarships" },
    { id: "volunteer" as AdminTab, icon: Heart, label: "Manage Volunteer" },
    { id: "certificates" as AdminTab, icon: Award, label: "Certificates" },
    { id: "reports" as AdminTab, icon: FileText, label: "Reports" },
    { id: "notifications" as AdminTab, icon: Bell, label: "Notifications" },
    { id: "content" as AdminTab, icon: CheckCircle, label: "Content Approval" },
    { id: "settings" as AdminTab, icon: Settings, label: "Settings" }
  ]

  const stats = [
    { label: "Total Users", value: "12,458", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Active Events", value: "234", change: "+8%", icon: Calendar, color: "from-purple-500 to-pink-500" },
    { label: "Total Clubs", value: "89", change: "+5%", icon: Building2, color: "from-green-500 to-emerald-500" },
    { label: "Volunteer Hours", value: "45,678", change: "+23%", icon: Heart, color: "from-orange-500 to-yellow-500" }
  ]

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@email.com", role: "Student", status: "Active", joined: "2 days ago" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", role: "Organizer", status: "Active", joined: "5 days ago" },
    { id: 3, name: "Bob Johnson", email: "bob@email.com", role: "Student", status: "Pending", joined: "1 week ago" },
    { id: 4, name: "Alice Williams", email: "alice@email.com", role: "Admin", status: "Active", joined: "2 weeks ago" }
  ]

  const pendingContent = [
    { id: 1, type: "Event", title: "Tech Summit 2024", submittedBy: "Jane Smith", date: "2 hours ago" },
    { id: 2, type: "Club", title: "AI Research Club", submittedBy: "John Doe", date: "5 hours ago" },
    { id: 3, type: "Competition", title: "Hackathon Challenge", submittedBy: "Bob Johnson", date: "1 day ago" }
  ]

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleAction = (action: string) => {
    toast.success(`${action} successful`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Skeleton className="w-64 h-screen" />
          <div className="flex-1 p-8 space-y-6">
            <Skeleton className="h-32 w-full" />
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed left-0 top-0 h-64 w-64 bg-card border-r border-border z-50 lg:static lg:h-screen ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        <nav className="space-y-2 px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-0">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <h1 className="text-2xl font-bold capitalize">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                              <stat.icon className="w-6 h-6" />
                            </div>
                            <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'}>
                              {stat.change}
                            </Badge>
                          </div>
                          <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentUsers.map((user, index) => (
                          <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                                {user.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Pending Content Approval</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingContent.map((content, index) => (
                          <motion.div
                            key={content.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{content.type}</Badge>
                                <h4 className="font-medium">{content.title}</h4>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                By {content.submittedBy} • {content.date}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleAction("Approved")}>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleAction("Rejected")}>
                                <X className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Analytics Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          <span className="text-sm text-muted-foreground">Page Views</span>
                        </div>
                        <h3 className="text-3xl font-bold">1.2M</h3>
                        <p className="text-sm text-green-500">+23% from last month</p>
                      </div>
                      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="w-5 h-5 text-purple-500" />
                          <span className="text-sm text-muted-foreground">Active Users</span>
                        </div>
                        <h3 className="text-3xl font-bold">45.6K</h3>
                        <p className="text-sm text-green-500">+18% from last month</p>
                      </div>
                      <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-muted-foreground">Event RSVPs</span>
                        </div>
                        <h3 className="text-3xl font-bold">8.9K</h3>
                        <p className="text-sm text-red-500">-5% from last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Manage Users</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="gradient" size="sm">
                          <Users className="w-4 h-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <Badge variant="outline" className="mt-1">{user.role}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Ban className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Manage Events</CardTitle>
                      <Button variant="gradient" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Event
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Event management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "clubs" && (
              <motion.div
                key="clubs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Manage Clubs</CardTitle>
                      <Button variant="gradient" size="sm">
                        <Building2 className="w-4 h-4 mr-2" />
                        Create Club
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Club management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "competitions" && (
              <motion.div
                key="competitions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Manage Competitions</CardTitle>
                      <Button variant="gradient" size="sm">
                        <Trophy className="w-4 h-4 mr-2" />
                        Create Competition
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Competition management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "scholarships" && (
              <motion.div
                key="scholarships"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Manage Scholarships</CardTitle>
                      <Button variant="gradient" size="sm">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Add Scholarship
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Scholarship management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "volunteer" && (
              <motion.div
                key="volunteer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Manage Volunteer Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Volunteer program management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Certificate Management</CardTitle>
                      <Button variant="gradient" size="sm">
                        <Award className="w-4 h-4 mr-2" />
                        Issue Certificate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Certificate management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Reports</CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Reports and analytics interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>System Notifications</CardTitle>
                      <Button variant="gradient" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Send Notification
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Notification management interface</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Content Approval Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingContent.map((content, index) => (
                        <motion.div
                          key={content.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-border"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge>{content.type}</Badge>
                              <h4 className="font-semibold">{content.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Submitted by {content.submittedBy} • {content.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleAction("Approved")}>
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction("Rejected")}>
                              <X className="w-4 h-4 mr-2 text-red-500" />
                              Reject
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Admin Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Auto-Refresh Data</h4>
                          <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                        </div>
                      </div>
                      <Button variant="gradient" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">Export Data</h4>
                          <p className="text-sm text-muted-foreground">Download all platform data</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Skeleton className="w-8 h-8" /></div>}>
        <AdminContent />
      </Suspense>
    </ProtectedRoute>
  )
}
