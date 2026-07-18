'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home,
  Calendar,
  Trophy,
  GraduationCap,
  Users,
  MessageSquare,
  Brain,
  FolderOpen,
  FileText,
  Award,
  Calendar as CalendarIcon,
  Settings,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bell,
  Heart,
  ShieldCheck,
  UserCircle2,
  TrendingUp,
  Compass
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Clubs', href: '/clubs', icon: Users },
  { name: 'Communities', href: '/communities', icon: Compass },
  { name: 'Hackathons', href: '/hackathons', icon: Sparkles },
  { name: 'Competitions', href: '/competitions', icon: Trophy },
  { name: 'Scholarships', href: '/scholarships', icon: GraduationCap },
  { name: 'Volunteer', href: '/volunteer', icon: Heart },
  { name: 'AI Mentor', href: '/ai-mentor', icon: Brain },
  { name: 'Recommendations', href: '/recommendations', icon: TrendingUp },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Achievements', href: '/achievements', icon: Award },
  { name: 'Certificates', href: '/certificates', icon: Award },
  { name: 'Volunteer Passport', href: '/volunteer-passport', icon: ShieldCheck },
  { name: 'Resume Builder', href: '/resume', icon: FileText },
  { name: 'Portfolio Builder', href: '/portfolio', icon: FolderOpen },
  { name: 'Profile', href: '/profile', icon: UserCircle2 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, userProfile, logout } = useAuth()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass-sidebar h-screen sticky top-0 left-0 z-50 flex flex-col border-r border-border/50"
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Campus+</span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? 'gradient' : 'ghost'}
                  className={`w-full justify-start h-12 rounded-xl transition-all ${
                    isActive 
                      ? 'shadow-lg shadow-purple-500/25' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border/50">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl glass-card">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.photoURL || '/placeholder-avatar.jpg'} />
                  <AvatarFallback className="gradient-bg text-white font-semibold">
                    {userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {userProfile?.displayName || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="flex-1">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="flex-1"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.photoURL || '/placeholder-avatar.jpg'} />
                <AvatarFallback className="gradient-bg text-white font-semibold">
                  {userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-8 w-8"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}
