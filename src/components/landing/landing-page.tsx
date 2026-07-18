"use client"

import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Award, 
  Brain, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Shield,
  MessageSquare,
  BookOpen,
  Target,
  Clock,
  MapPin,
  Download,
  ChevronRight,
  Play,
  Smartphone,
  GraduationCap,
  Rocket,
  Layers,
  ChevronDown,
  HelpCircle
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      setIsLoading(false)
    }
  }, [authLoading])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      heroRef.current.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // GSAP Animations
  useEffect(() => {
    if (typeof window === "undefined") return

    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      })
      
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      })
      
      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Calendar,
      title: "Smart Events",
      description: "Discover and RSVP to campus events tailored to your interests with AI-powered recommendations."
    },
    {
      icon: Users,
      title: "Club Management",
      description: "Join and manage student clubs with seamless collaboration tools and member tracking."
    },
    {
      icon: Award,
      title: "Scholarships",
      description: "Find and apply for scholarships that match your profile with intelligent matching algorithms."
    },
    {
      icon: Brain,
      title: "AI Mentor",
      description: "Get personalized career guidance, resume reviews, and learning roadmaps from AI."
    },
    {
      icon: TrendingUp,
      title: "Volunteer Passport",
      description: "Track your volunteer hours, earn badges, and showcase your impact with a digital passport."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    }
  ]

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "1000+", label: "Events Monthly" },
    { value: "500+", label: "Student Clubs" },
    { value: "95%", label: "Satisfaction Rate" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science",
      avatar: "SJ",
      content: "Campus+ transformed my college experience. The AI mentor helped me land my dream internship!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Administration",
      avatar: "MC",
      content: "The volunteer passport feature is incredible. I've tracked 200+ hours and earned amazing badges.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Psychology",
      avatar: "ER",
      content: "Found scholarships I never knew existed through the intelligent matching system. Highly recommend!",
      rating: 5
    }
  ]

  const aiFeatures = [
    {
      icon: Brain,
      title: "AI Career Coach",
      description: "Personalized career guidance based on your skills, interests, and market trends."
    },
    {
      icon: BookOpen,
      title: "Smart Learning",
      description: "AI-generated learning roadmaps tailored to your goals and learning style."
    },
    {
      icon: MessageSquare,
      title: "24/7 AI Mentor",
      description: "Get instant answers to questions about courses, careers, and campus life."
    },
    {
      icon: Target,
      title: "Resume Review",
      description: "AI-powered resume analysis with actionable improvement suggestions."
    }
  ]

  const howItWorks = [
    {
      step: "01",
      icon: GraduationCap,
      title: "Create Your Profile",
      description: "Set up your profile with your interests, major, and campus preferences."
    },
    {
      step: "02",
      icon: Calendar,
      title: "Discover Events",
      description: "Explore campus events tailored to your interests with AI recommendations."
    },
    {
      step: "03",
      icon: Users,
      title: "Join Communities",
      description: "Connect with clubs, peers, and mentors who share your passions."
    },
    {
      step: "04",
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your growth, earn achievements, and build your portfolio."
    }
  ]

  const faqs = [
    {
      question: "Is Campus+ free to use?",
      answer: "Yes! Campus+ is completely free for students. We believe every student deserves access to tools that help them succeed."
    },
    {
      question: "How does the AI mentor work?",
      answer: "Our AI mentor is trained on vast amounts of educational and career data. It provides personalized recommendations based on your profile, goals, and interactions."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and follow strict privacy protocols. Your data is never sold to third parties."
    },
    {
      question: "Can I use Campus+ on multiple devices?",
      answer: "Yes! Campus+ syncs across all your devices - web, iOS, and Android. Your progress is always up to date."
    },
    {
      question: "How do I join student clubs?",
      answer: "Browse clubs in the Discover section, read about their activities, and request to join. Club admins will review and approve your request."
    },
    {
      question: "What is the Volunteer Passport?",
      answer: "The Volunteer Passport tracks your community service hours, awards badges for milestones, and creates a verified record you can share with employers."
    }
  ]

  const handleScrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleGetStarted = () => {
    router.push(user ? "/dashboard" : "/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <div className="flex gap-4 justify-center mt-8">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Campus+</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-8"
            >
              <button
                type="button"
                onClick={() => handleScrollTo("features")}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("ai")}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                AI Features
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("testimonials")}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Testimonials
              </button>
              <Button variant="ghost" onClick={() => router.push("/login")}>Sign In</Button>
              <Button variant="gradient" onClick={handleGetStarted}>Get Started</Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-600/10" />
        
        {/* Floating Blur Circles */}
        <div className="blur-circle w-96 h-96 bg-purple-500/20 top-20 -left-48 animate-float" />
        <div className="blur-circle w-80 h-80 bg-pink-500/20 top-40 right-0 animate-float" style={{ animationDelay: '2s' }} />
        <div className="blur-circle w-64 h-64 bg-purple-600/20 bottom-20 left-1/4 animate-float" style={{ animationDelay: '4s' }} />

        <div ref={heroRef} className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="gradient" className="mb-6 hero-subtitle px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Campus Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform Your
              <span className="gradient-text block">Campus Experience</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto hero-subtitle leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect, learn, and grow with AI-powered events, clubs, scholarships, 
              and personalized mentorship. Your journey to success starts here.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                variant="gradient"
                className="text-lg px-10 py-6 rounded-2xl shadow-lg shadow-purple-500/25"
                onClick={handleGetStarted}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 rounded-2xl glass-card"
                onClick={() => handleScrollTo("ai")}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              className="mt-16 flex items-center justify-center gap-12 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Instant Setup</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need to
              <span className="gradient-text"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful tools designed to enhance every aspect of your campus life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass-card card-hover rounded-3xl p-8 border-0">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative gradient-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-center text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-item"
              >
                <div className="text-6xl md:text-7xl font-bold mb-3">{stat.value}</div>
                <div className="text-xl opacity-90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              How It
              <span className="gradient-text"> Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get started in minutes and transform your campus experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-primary/10 mb-6">{step.step}</div>
                <Card className="h-full glass-card card-hover rounded-3xl p-8 border-0">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-3">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="ai" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="gradient" className="mb-6 px-4 py-2 text-sm">
              <Brain className="w-4 h-4 mr-2" />
              Powered by AI
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Intelligent Features for
              <span className="gradient-text"> Smart Students</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Leverage cutting-edge AI to accelerate your learning and career growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass-card card-hover rounded-3xl p-8 border-0">
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative gradient-bg-soft">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="gradient" className="mb-6 px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Loved by
              <span className="gradient-text"> Students</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See what students are saying about their Campus+ experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass-card card-hover rounded-3xl p-8 border-0">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/25">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                        <CardDescription className="text-base">{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base leading-relaxed">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <Badge variant="gradient" className="mb-6 px-4 py-2 text-sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked
              <span className="gradient-text"> Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to know about Campus+
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-3xl px-8 border-0">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-bg rounded-[2rem] p-16 md:p-24 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%"
                  }}
                  animate={{
                    y: [null, "-20px"],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Transform Your Campus Life?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students already using Campus+ to achieve their goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-2xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 rounded-2xl bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Campus+</span>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                Transform your campus experience with AI-powered tools and features.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors text-base">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors text-base">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p className="text-base">&copy; 2024 Campus+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
