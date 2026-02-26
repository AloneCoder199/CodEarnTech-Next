"use client"

import { useRef, useState, useEffect, memo } from "react"
import Link from "next/link";
import { motion, useInView, useReducedMotion, AnimatePresence, useAnimation } from "framer-motion"
import { 
  XCircle,
  CheckCircle2,
  Swords,
  Zap,
  Shield,
  Trophy,
  Sparkles,
  ArrowRight,
  MessageSquare
} from "lucide-react"

// Memoized VS Card for speed
const VSCard = memo(function VSCard({ 
  type, 
  data, 
  isActive,
  isWinner 
}: { 
  type: "them" | "us"
  data: typeof differentiators[0]["us"]
  isActive: boolean
  isWinner: boolean
}) {
  const isUs = type === "us"
  
  return (
    <motion.div
      initial={false}
      animate={isActive ? {
        scale: isWinner ? [1, 1.02, 1] : 1,
        y: isWinner ? [0, -5, 0] : 0
      } : {}}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-6 lg:p-8 border-2 overflow-hidden ${
        isUs 
          ? "bg-card border-primary/30 shadow-xl shadow-primary/10"
          : "bg-muted/30 border-border/50 grayscale-[0.3]"
      }`}
      style={{ willChange: "transform" }}
    >
      {/* Winner glow effect */}
      {isUs && isWinner && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-6">
        <motion.div 
          animate={isActive && isUs ? {
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5 }}
          className={`p-3 rounded-xl ${isUs ? 'bg-primary/10' : 'bg-muted'}`}
        >
          {isUs ? (
            <Trophy className="w-6 h-6 text-primary" />
          ) : (
            <XCircle className="w-6 h-6 text-muted-foreground" />
          )}
        </motion.div>
        
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isUs ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {isUs ? 'CodEarn Tech' : 'Traditional Agencies'}
          </span>
          <h3 className={`text-xl font-bold ${isUs ? 'text-foreground' : 'text-muted-foreground'}`}>
            {data.headline}
          </h3>
        </div>

        {/* VS Badge */}
        {isActive && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
              isUs ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
            {isUs ? 'WIN' : 'LOSE'}
          </motion.div>
        )}
      </div>

      {/* Points */}
      <ul className="relative space-y-4">
        {data.points.map((point, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: isUs ? 20 : -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <motion.div
              animate={isActive && isUs ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360, 360]
              } : {}}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
            >
              {isUs ? (
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
              )}
            </motion.div>
            <span className={`text-sm leading-relaxed ${isUs ? 'text-foreground' : 'text-muted-foreground'}`}>
              {point}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Score bar */}
      <div className="relative mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className={isUs ? 'text-primary font-semibold' : 'text-muted-foreground'}>
            {isUs ? 'Trust Score' : 'Risk Level'}
          </span>
          <span className={isUs ? 'text-primary font-bold' : 'text-muted-foreground'}>
            {isUs ? '98%' : 'High'}
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isActive ? { width: isUs ? '98%' : '35%' } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${isUs ? 'bg-primary' : 'bg-muted-foreground/30'}`}
          />
        </div>
      </div>
    </motion.div>
  )
})

// Differentiators data
const differentiators = [
  {
    id: 1,
    icon: Zap,
    title: "Promises vs Proof",
    us: {
      headline: "Guaranteed Outcomes",
      points: [
        "50% lead increase or free continued work",
        "30-day MVP delivery or full refund",
        "Measurable metrics, not vanity reports"
      ]
    },
    them: {
      headline: "Scope-Based Billing",
      points: [
        "Hours logged, results not guaranteed",
        "Scope creep = endless invoices",
        "'Best effort' clauses protect them, not you"
      ]
    }
  },
  {
    id: 2,
    icon: Swords,
    title: "Deadlines vs Delays",
    us: {
      headline: "Fixed Delivery Dates",
      points: [
        "30-day MVP guarantee in contract",
        "Daily progress visibility",
        "Milestone-based payments, not upfront"
      ]
    },
    them: {
      headline: "Elastic Timelines",
      points: [
        "'2 weeks' becomes 6 months",
        "No visibility until deadline missed",
        "Payment due regardless of delays"
      ]
    }
  },
  {
    id: 3,
    icon: Shield,
    title: "Access vs Abstraction",
    us: {
      headline: "Founder Direct Line",
      points: [
        "Daily standups with Muhammad Bilal",
        "Technical decisions by builder",
        "No account manager filter"
      ]
    },
    them: {
      headline: "Layered Communication",
      points: [
        "Sales → Manager → Developer chain",
        "Message lost in translation",
        "Founder unavailable post-sale"
      ]
    }
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Support vs Silence",
    us: {
      headline: "Human-First Response",
      points: [
        "WhatsApp direct to founder",
        "4-hour critical bug response",
        "Proactive monitoring, not reactive"
      ]
    },
    them: {
      headline: "Ticket Queue Abyss",
      points: [
        "Submit ticket, wait 48-72 hours",
        "Escalation hell for urgent issues",
        "Support outsourced, context lost"
      ]
    }
  }
]

export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeId, setActiveId] = useState(1)
  const [battleMode, setBattleMode] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimation()

  // Auto-play battle animation
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    
    const sequence = async () => {
      setBattleMode(true)
      await controls.start("visible")
    }
    
    sequence()
  }, [isInView, prefersReducedMotion, controls])

  const activeItem = differentiators.find(d => d.id === activeId) || differentiators[0]

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            background: battleMode 
              ? "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%)"
              : "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.03) 0%, transparent 50%)"
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header - Battle Style */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Swords className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">The Difference</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            <span className="text-muted-foreground">Them</span>
            <motion.span 
              animate={battleMode ? { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: battleMode ? Infinity : 0, repeatDelay: 3 }}
              className="inline-block mx-3 text-primary"
            >
              VS
            </motion.span>
            <span className="text-primary">Us</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Same industry. Same tools. Completely different outcome.
          </p>
        </motion.div>

        {/* Battle Arena */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* Left - Selector Tabs */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {differentiators.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveId(item.id)
                  setBattleMode(true)
                }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-shrink-0 lg:w-full text-left p-4 rounded-xl border transition-all ${
                  activeId === item.id
                    ? "bg-card border-primary shadow-md"
                    : "bg-transparent border-transparent hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeId === item.id ? 'bg-primary/10' : 'bg-muted'}`}>
                    <item.icon className={`w-5 h-5 ${activeId === item.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="hidden lg:block">
                    <p className={`font-semibold text-sm ${activeId === item.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Center - VS Battle Ground */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* VS Badge - Center */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-xl shadow-primary/30 hidden lg:flex"
                >
                  VS
                </motion.div>

                {/* Mobile Title */}
                <div className="lg:hidden text-center mb-4">
                  <span className="text-sm font-bold text-primary">{activeItem.title}</span>
                </div>

                {/* Battle Cards */}
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
                  {/* THEM - Left */}
                  <VSCard 
                    type="them" 
                    data={activeItem.them} 
                    isActive={true}
                    isWinner={false}
                  />

                  {/* US - Right */}
                  <VSCard 
                    type="us" 
                    data={activeItem.us} 
                    isActive={true}
                    isWinner={true}
                  />
                </div>

                {/* Winner Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
                >
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-primary font-bold">Winner:</span> Clear accountability, measurable results, founder access
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Trust Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { value: "100+", label: "Projects Won", sub: "0 abandoned" },
            { value: "4hrs", label: "Avg Response", sub: "Not 48" },
            { value: "30", label: "Day Guarantee", sub: "Not 'soon'" },
            { value: "1", label: "Founder Direct", sub: "No layers" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border text-center"
            >
              <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4 text-sm">
            See the difference in action. No sales pitch, just proof.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <MessageSquare className="w-5 h-5" />
            <Link href="/book-call" >Talk to Our Experts</Link>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}