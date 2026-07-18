"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { 
  Send,
  Bot,
  User,
  Sparkles,
  Briefcase,
  FileText,
  Code,
  GraduationCap,
  Map,
  Trophy,
  History,
  X,
  ChevronRight,
  Copy,
  Check
} from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatHistory {
  id: string
  title: string
  date: Date
  messages: Message[]
}

function AIMentorContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Mentor. I can help you with:\n\n- **Career Advice** - Get guidance on your career path\n- **Resume Review** - Improve your resume\n- **Coding Help** - Debug and understand code\n- **Scholarships** - Find funding opportunities\n- **Roadmap** - Plan your learning journey\n- **Competitions** - Discover hackathons and contests\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestedQuestions = [
    "What career path should I choose?",
    "Review my resume for software engineering",
    "Help me debug this React code",
    "Find scholarships for computer science",
    "Create a learning roadmap for web development",
    "Upcoming hackathons I can join"
  ]

  const quickActions = [
    { icon: Briefcase, label: "Career Advice", color: "from-blue-500 to-cyan-500" },
    { icon: FileText, label: "Resume Review", color: "from-purple-500 to-pink-500" },
    { icon: Code, label: "Coding Help", color: "from-green-500 to-emerald-500" },
    { icon: GraduationCap, label: "Scholarships", color: "from-yellow-500 to-orange-500" },
    { icon: Map, label: "Roadmap", color: "from-red-500 to-pink-500" },
    { icon: Trophy, label: "Competitions", color: "from-indigo-500 to-purple-500" }
  ]

  const chatHistories: ChatHistory[] = [
    { id: "1", title: "Career Guidance", date: new Date(), messages: [] },
    { id: "2", title: "Resume Review", date: new Date(Date.now() - 86400000), messages: [] },
    { id: "3", title: "Coding Help", date: new Date(Date.now() - 172800000), messages: [] }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(content),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("career") || lowerMessage.includes("path")) {
      return `Based on your interests, here are some career paths to consider:\n\n**Software Engineering**\n- High demand, competitive salaries\n- Requires strong problem-solving skills\n- Continuous learning required\n\n**Data Science**\n- Growing field with AI/ML focus\n- Strong math and statistics background\n- Great for analytical minds\n\n**Product Management**\n- Bridge between tech and business\n- Requires communication skills\n- Strategic thinking essential\n\nWould you like me to elaborate on any of these paths?`
    }
    
    if (lowerMessage.includes("resume")) {
      return `Here are some tips for improving your resume:\n\n1. **Quantify achievements** - Use numbers to show impact\n   - Example: "Increased efficiency by 40%"\n\n2. **Tailor to the job** - Match keywords from job description\n\n3. **Keep it concise** - 1-2 pages maximum\n\n4. **Use action verbs** - Led, Built, Created, Improved\n\n5. **Include projects** - Show practical experience\n\n\`\`\`javascript\n// Example project description\nBuilt a full-stack application\nusing React and Node.js that\nserved 10,000+ users\n\`\`\`\n\nWould you like me to review your specific resume?`
    }
    
    if (lowerMessage.includes("code") || lowerMessage.includes("debug")) {
      return `I'd be happy to help with coding! Please share:\n\n1. The code you're working on\n2. The error you're encountering\n3. What you've tried so far\n\nHere's an example of how to format your code:\n\n\`\`\`javascript\nfunction example() {\n  console.log("Hello World");\n}\n\`\`\`\n\nI can help with:\n- Debugging\n- Code optimization\n- Best practices\n- Architecture decisions`
    }
    
    if (lowerMessage.includes("scholarship")) {
      return `Here are some scholarship opportunities:\n\n**For Computer Science Students:**\n\n1. **Google Scholarship**\n   - $10,000 award\n   - Deadline: March 31\n   - Requires: GPA 3.0+\n\n2. **Microsoft Scholarship**\n   - $5,000 award\n   - Deadline: April 15\n   - Requires: Project portfolio\n\n3. **AWS Cloud Scholarship**\n   - Full cloud certification\n   - Rolling applications\n   - Requires: Basic cloud knowledge\n\nWould you like more details on any of these?`
    }
    
    if (lowerMessage.includes("roadmap") || lowerMessage.includes("learn")) {
      return `Here's a suggested learning roadmap:\n\n**Phase 1: Fundamentals (1-2 months)**\n- HTML/CSS\n- JavaScript basics\n- Git & GitHub\n\n**Phase 2: Frontend (2-3 months)**\n- React or Vue\n- State management\n- Responsive design\n\n**Phase 3: Backend (2-3 months)**\n- Node.js or Python\n- Databases (SQL/NoSQL)\n- APIs\n\n**Phase 4: Advanced (3-4 months)**\n- System design\n- Testing\n- DevOps basics\n\nWould you like resources for any specific phase?`
    }
    
    if (lowerMessage.includes("competition") || lowerMessage.includes("hackathon")) {
      return `Upcoming competitions and hackathons:\n\n**Hackathons:**\n\n1. **Global Hackathon 2024**\n   - Date: April 20-22\n   - Prize: $50,000\n   - Theme: AI for Good\n\n2. **Student Code Challenge**\n   - Date: May 5-7\n   - Prize: $10,000\n   - Theme: Open Topic\n\n**Competitions:**\n\n1. **ICPC Regional**\n   - Date: October\n   - Team-based programming\n\n2. **Google Code Jam**\n   - Date: Rounds throughout year\n   - Individual competition\n\nInterested in any of these?`
    }
    
    return `I understand you're asking about "${userMessage}". Let me help you with that.\n\nI can assist you with:\n- Career guidance\n- Resume reviews\n- Coding help\n- Scholarship information\n- Learning roadmaps\n- Competition details\n\nCould you provide more details so I can give you a more specific answer?`
  }

  const handleQuickAction = (label: string) => {
    const questions: Record<string, string> = {
      "Career Advice": "What career path should I choose?",
      "Resume Review": "Review my resume for software engineering",
      "Coding Help": "Help me debug this React code",
      "Scholarships": "Find scholarships for computer science",
      "Roadmap": "Create a learning roadmap for web development",
      "Competitions": "Upcoming hackathons I can join"
    }
    handleSendMessage(questions[label])
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success("Code copied to clipboard!")
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    let formatted = content
    
    // Code blocks
    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const isCopied = copiedCode === code.trim()
      return `
        <div class="relative my-4">
          <div class="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border-b">
            <span class="text-sm font-mono text-muted-foreground">${lang || 'code'}</span>
            <button onclick="navigator.clipboard.writeText(\`${code.trim()}\`)" class="text-sm text-muted-foreground hover:text-foreground">
              ${isCopied ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>'}
            </button>
          </div>
          <pre class="bg-muted/50 p-4 rounded-b-lg overflow-x-auto text-sm"><code class="font-mono">${code.trim()}</code></pre>
        </div>
      `
    })
    
    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    
    // Bold
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Italic
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>')
    
    return formatted
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="glass-card border-b border-border/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">AI Mentor</h1>
                <p className="text-base text-muted-foreground">Your personal career guide</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setShowHistory(!showHistory)} className="h-12 w-12 rounded-xl glass-card border-0">
                <History className="w-6 h-6" />
              </Button>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-base rounded-xl shadow-lg shadow-green-500/25">
                <Sparkles className="w-4 h-4 mr-2" />
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card border-b border-border/50 p-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickAction(action.label)}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl glass-card border-0 hover:bg-muted/50 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-base">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                )}
                <Card className={`max-w-[80%] ${
                  message.role === "user" 
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg shadow-purple-500/25" 
                    : "glass-card border-0"
                } rounded-3xl`}>
                  <CardContent className="p-6">
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    <div className={`text-sm mt-3 ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </CardContent>
                </Card>
                {message.role === "user" && (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                    <User className="w-7 h-7 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            
                        {/* Typing Animation */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <Card className="glass-card border-0 rounded-3xl">
                    <CardContent className="p-6">
                      <div className="flex gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="w-3 h-3 rounded-full bg-purple-500"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                          className="w-3 h-3 rounded-full bg-purple-500"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                          className="w-3 h-3 rounded-full bg-purple-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="glass-card border-t border-border/50 p-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-base text-muted-foreground mb-4">Suggested questions:</p>
              <div className="flex flex-wrap gap-3">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(question)}
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl glass-card border-0 hover:bg-muted/50 transition-all text-base"
                  >
                    <span>{question}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="glass-card border-t border-border/50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                placeholder="Ask me anything about your career, coding, or learning journey..."
                className="flex-1 h-16 text-lg rounded-2xl glass-card border-0 focus:border-purple-500"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="h-16 w-16 rounded-2xl gradient-bg shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Chat History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-96 glass-card border-l border-border/50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-semibold text-xl">Chat History</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)} className="h-10 w-10 rounded-xl glass-card border-0">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-3">
              {chatHistories.map((history) => (
                <motion.button
                  key={history.id}
                  whileHover={{ x: 5 }}
                  className="w-full text-left p-4 rounded-2xl glass-card border-0 hover:bg-muted/50 transition-colors"
                >
                  <div className="font-medium text-lg">{history.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {history.date.toLocaleDateString()}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AIMentorPage() {
  return (
    <ProtectedRoute>
      <AIMentorContent />
    </ProtectedRoute>
  )
}
