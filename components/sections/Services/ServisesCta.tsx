"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight,
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Clock,
  Sparkles,
  MessageSquare,
  Zap,
  Target,
  ChevronDown,
  X
} from "lucide-react"

// Countdown hook for urgency
function useCountdown(days: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: days,
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return timeLeft
}

export function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activePath, setActivePath] = useState<"business" | "student" | null>(null)
  const [showForm, setShowForm] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  // Urgency timers
  const clientTimer = useCountdown(3) // 3 days left for client spots
  const studentTimer = useCountdown(7) // 7 days for enrollment

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Ready When You Are</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Let's build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              something great
            </span>
            {" "}together
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're a founder ready to scale, or a student ready to learn — 
            I'm here to help you win.
          </p>
        </motion.div>

        {/* Two Path Cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          
          {/* Path 1: Business/Clients */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setActivePath("business")}
            onMouseLeave={() => setActivePath(null)}
            className={`relative p-8 lg:p-10 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
              activePath === "business" 
                ? "bg-card border-primary shadow-2xl shadow-primary/20 scale-[1.02]" 
                : "bg-card/50 border-border hover:border-primary/30"
            }`}
          >
            {/* Urgency Badge */}
            <div className="absolute -top-3 left-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                <Clock className="w-3 h-3" />
                Only 2 client spots left
              </span>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-2xl transition-colors ${
                activePath === "business" ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Briefcase className={`w-8 h-8 ${
                  activePath === "business" ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Scale Your Business</h3>
                <p className="text-muted-foreground">Custom software that drives revenue</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Target className="w-4 h-4 text-primary shrink-0" />
                <span>MVP to production in 30 days</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Zap className="w-4 h-4 text-primary shrink-0" />
                <span>Direct founder access, zero layers</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                <span>4-hour response guarantee</span>
              </li>
            </ul>

            {/* Countdown */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6">
              <p className="text-xs text-muted-foreground mb-2">Next available slot starts in:</p>
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                  {clientTimer.days}d
                </span>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                  {clientTimer.hours}h
                </span>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                  {clientTimer.minutes}m
                </span>
              </div>
            </div>

            <Link href="/book-call" className="block w-full">
  <motion.button
    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
  >
    <Calendar className="w-5 h-5" />
    <span>Book Free Strategy Call</span>
    <ArrowRight className="w-5 h-5" />
  </motion.button>
</Link>

            
            <p className="text-xs text-center text-muted-foreground mt-3">
              15 minutes. Zero obligation. Pure strategy.
            </p>
          </motion.div>

          {/* Path 2: Students/Learning */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            onMouseEnter={() => setActivePath("student")}
            onMouseLeave={() => setActivePath(null)}
            className={`relative p-8 lg:p-10 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
              activePath === "student" 
                ? "bg-card border-accent shadow-2xl shadow-accent/20 scale-[1.02]" 
                : "bg-card/50 border-border hover:border-accent/30"
            }`}
          >
            {/* Urgency Badge */}
            <div className="absolute -top-3 left-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                <Users className="w-3 h-3" />
                Batch starts Now
              </span>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-2xl transition-colors ${
                activePath === "student" ? 'bg-accent/10' : 'bg-muted'
              }`}>
                <GraduationCap className={`w-8 h-8 ${
                  activePath === "student" ? 'text-accent' : 'text-muted-foreground'
                }`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Learn Real Development</h3>
                <p className="text-muted-foreground">Backend-first, project-based training</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Target className="w-4 h-4 text-accent shrink-0" />
                <span>Build production systems, not tutorials</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Zap className="w-4 h-4 text-accent shrink-0" />
                <span>Live client projects from day one</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Briefcase className="w-4 h-4 text-accent shrink-0" />
                <span>Job-ready in 16 weeks, not years</span>
              </li>
            </ul>

            {/* Countdown */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6">
              <p className="text-xs text-muted-foreground mb-2">Enrollment closes in:</p>
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="px-2 py-1 rounded bg-accent/10  font-bold text-black dark:text-white ">
                  {studentTimer.days}d
                </span>
                <span className="px-2 py-1 rounded bg-accent/10  font-bold text-black dark:text-white ">
                  {studentTimer.hours}h
                </span>
                <span className="px-2 py-1 rounded bg-accent/10  font-bold text-black dark:text-white ">
                  {studentTimer.minutes}m
                </span>
              </div>
            </div>

            <Link href="/enroll" className="block w-full"> {/* Isay /enroll ya /courses se link karein */}
  <motion.button
    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full py-4 px-6 rounded-xl bg-accent text-accent-foreground font-bold text-lg shadow-lg shadow-accent/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
  >
    <GraduationCap className="w-5 h-5" />
    <span>Enroll in Next Batch</span>
    <ArrowRight className="w-5 h-5" />
  </motion.button>
</Link>

            
            <p className="text-xs text-center text-muted-foreground mt-3">
              Limited to 15 students. 6 spots remaining.
            </p>
          </motion.div>
        </div>

        {/* Trust Line */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-2">
            Not sure which path? Let's talk.
          </p>
          <Link 
  href="/book-call" // Apna number yahan likhein
  target="_blank" 
  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer"
>
  <MessageSquare className="w-4 h-4" />
  <span>Ask me anything — I reply within 4 hours</span>
</Link>

        </motion.div>

        {/* Booking Form Modal */}
        

      </div>
    </section>
  )
}