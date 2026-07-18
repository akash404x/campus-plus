'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { Sidebar } from '@/components/dashboard/sidebar'
import { 
  Sparkles,
  ChevronRight,
  Cpu,
  Palette,
  Dumbbell,
  GraduationCap,
  Users,
  Briefcase,
  Music,
  Camera,
  Gamepad2,
  FlaskConical,
  Leaf,
  Globe,
  Heart,
  BookOpen,
  Mic,
  Utensils,
  Film,
  CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'

const interests = [
  { id: 1, name: 'Technology', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Arts & Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { id: 3, name: 'Sports & Fitness', icon: Dumbbell, color: 'from-orange-500 to-amber-500' },
  { id: 4, name: 'Academic', icon: GraduationCap, color: 'from-green-500 to-emerald-500' },
  { id: 5, name: 'Social & Community', icon: Users, color: 'from-violet-500 to-purple-500' },
  { id: 6, name: 'Career & Business', icon: Briefcase, color: 'from-indigo-500 to-blue-500' },
  { id: 7, name: 'Music & Entertainment', icon: Music, color: 'from-purple-500 to-pink-500' },
  { id: 8, name: 'Photography', icon: Camera, color: 'from-yellow-500 to-orange-500' },
  { id: 9, name: 'Gaming', icon: Gamepad2, color: 'from-red-500 to-pink-500' },
  { id: 10, name: 'Science & Research', icon: FlaskConical, color: 'from-teal-500 to-cyan-500' },
  { id: 11, name: 'Environment', icon: Leaf, color: 'from-lime-500 to-green-500' },
  { id: 12, name: 'Travel & Culture', icon: Globe, color: 'from-sky-500 to-blue-500' },
  { id: 13, name: 'Health & Wellness', icon: Heart, color: 'from-red-500 to-rose-500' },
  { id: 14, name: 'Literature', icon: BookOpen, color: 'from-amber-500 to-yellow-500' },
  { id: 15, name: 'Public Speaking', icon: Mic, color: 'from-fuchsia-500 to-pink-500' },
  { id: 16, name: 'Food & Cooking', icon: Utensils, color: 'from-orange-500 to-red-500' },
  { id: 17, name: 'Film & Theater', icon: Film, color: 'from-purple-600 to-indigo-600' },
]

function InterestsContent() {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleInterest = (id: number) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleContinue = () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest')
      return
    }
    if (selectedInterests.length < 3) {
      toast.warning('Select at least 3 interests for better recommendations')
      return
    }
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Interests saved successfully!')
      // Navigate to dashboard or next step
    }, 1500)
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
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/25">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 gradient-text">Select Your Interests</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose at least 3 interests to help us personalize your experience and recommend relevant events, clubs, and opportunities.
            </p>
          </motion.div>

          {/* Interests Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(interest.id)}
              >
                <Card className={`cursor-pointer transition-all border-0 ${
                  selectedInterests.includes(interest.id)
                    ? 'glass-card bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50'
                    : 'glass-card hover:bg-muted/50'
                } rounded-3xl p-6`}>
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${interest.color} flex items-center justify-center mb-4 shadow-lg ${
                      selectedInterests.includes(interest.id) ? 'scale-110' : ''
                    } transition-transform`}>
                      <interest.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{interest.name}</h3>
                    {selectedInterests.includes(interest.id) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-green-500"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Selected</span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Selection Summary */}
          {selectedInterests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <p className="text-lg text-muted-foreground">
                {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
              </p>
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleContinue}
              disabled={isLoading}
              variant="gradient"
              className="h-16 px-12 text-xl rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
            >
              {isLoading ? (
                'Saving...'
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-6 h-6 ml-2" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Skip Option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6"
          >
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => toast.info('You can update your interests later in settings')}
            >
              Skip for now
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default function InterestsPage() {
  return (
    <ProtectedRoute>
      <InterestsContent />
    </ProtectedRoute>
  )
}
