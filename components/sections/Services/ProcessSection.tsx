"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { 
  MessageSquare,
  Users,
  Search,
  FileText,
  Code2,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Shield,
  Zap
} from "lucide-react"

// Process steps data
const processSteps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Discovery Call",
    subtitle: "15 minutes, zero obligation",
    duration: "Day 1",
    description: "We diagnose your pain point. You explain, I listen. If we're not a fit, I'll tell you honestly—and point you to someone who is.",
    deliverables: ["Problem identified", "Solution outlined", "Timeline estimated"],
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10"
  },
  {
    id: 2,
    icon: Search,
    title: "Deep Dive Audit",
    subtitle: "Finding the real bottlenecks",
    duration: "Days 2-3",
    description: "I analyze your current setup—code, funnels, team workflow. Not surface-level. Root cause analysis that others miss.",
    deliverables: ["Technical audit report", "Conversion leak analysis", "Priority action list"],
    color: "from-indigo-500 to-purple-500",
    iconBg: "bg-indigo-500/10"
  },
  {
    id: 3,
    icon: FileText,
    title: "Strategic Roadmap",
    subtitle: "Clear plan, fixed price",
    duration: "Day 4",
    description: "No surprises. You get a detailed roadmap with milestones, deliverables, and fixed investment. Scope locked, timeline guaranteed.",
    deliverables: ["Milestone-based plan", "Fixed quote", "30-day delivery guarantee"],
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10"
  },
  {
    id: 4,
    icon: Code2,
    title: "Build & Ship",
    subtitle: "Daily updates, real progress",
    duration: "Days 5-30",
    description: "I build. You see. Daily standups, live demos, no ghosting. Mid-course corrections welcomed. This is collaboration, not isolation.",
    deliverables: ["Working product weekly", "Daily progress updates", "Staging environment access"],
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10"
  },
  {
    id: 5,
    icon: Rocket,
    title: "Launch & Optimize",
    subtitle: "Go live with confidence",
    duration: "Day 30+",
    description: "Production deployment, monitoring setup, team handoff. But it doesn't end here—30 days of post-launch support included.",
    deliverables: ["Production launch", "Monitoring dashboard", "30-day support period"],
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10"
  },
  {
    id: 6,
    icon: HeartHandshake,
    title: "Partnership",
    subtitle: "Long-term growth ally",
    duration: "Ongoing",
    description: "Optional: Monthly strategy calls, continuous optimization, revenue-share models for startups. Your success is my success.",
    deliverables: ["Monthly strategy sessions", "Continuous improvements", "Growth partnership options"],
    color: "from-rose-500 to-red-500",
    iconBg: "bg-rose-500/10"
  }
]

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(1)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"])

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            From{" "}
            <span className="text-muted-foreground">pain</span>
            {" "}to{" "}
            <span className="text-primary">production</span>
            {" "}in 30 days
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No black boxes. No surprises. Every step designed for clarity and confidence.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Progress Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div 
              className="w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 lg:space-y-0">
            {processSteps.map((step, idx) => {
              const isLeft = idx % 2 === 0
              const isActive = activeStep === step.id
              
              return (
                <motion.div
                  key={step.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
                    idx !== 0 ? 'lg:mt-12' : ''
                  }`}
                  onMouseEnter={() => setActiveStep(step.id)}
                >
                  {/* Center Node - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.button
                      onClick={() => setActiveStep(step.id)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isActive 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {isActive ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <span className="font-bold text-sm">{step.id}</span>
                      )}
                    </motion.button>
                  </div>

                  {/* Mobile Node */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      isActive ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border'
                    }`}>
                      <span className="font-bold text-sm">{step.id}</span>
                    </div>
                    <div className={`h-px flex-1 ${isActive ? 'bg-primary' : 'bg-border'}`} />
                  </div>

                  {/* Content Card */}
                  <div className={`${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'}`}>
                    <motion.div
                      animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-card border-primary/30 shadow-lg shadow-primary/5' 
                          : 'bg-muted/30 border-border hover:bg-muted/50'
                      }`}
                    >
                      {/* Header */}
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-lg ${step.iconBg}`}>
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {step.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {step.subtitle}
                      </p>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                              {step.description}
                            </p>
                            
                            <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
                              {step.deliverables.map((item, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Click hint */}
                      {!isActive && (
                        <p className={`text-xs text-muted-foreground mt-4 flex items-center gap-1 ${isLeft ? 'lg:justify-end' : ''}`}>
                          Click to expand <ArrowDown className="w-3 h-3" />
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`} />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom Confidence Bar */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-primary/20"
        >
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Clarity at every step. No surprises.
              </h3>
              <p className="text-muted-foreground text-sm">
                Every phase has defined deliverables, fixed timelines, and clear communication. 
                You always know where we are and what's next.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
  {/* Pehla Button: Start Step 1 */}
  <Link 
    href="/book-call" 
    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-center"
  >
    <span>Start Step 1</span>
    <ArrowRight className="w-4 h-4" />
  </Link>
  
  {/* Doosra Button: Guarantee Details */}
  <Link 
  href="/about" 
  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium text-center"
>
  <Users className="w-4 h-4" /> {/* Shield ki jagah Users icon laga dein */}
  <span>Meet the Team</span>
</Link>
</div>

          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center"
        >
          {[
            { icon: Clock, label: "Fixed Timeline", value: "30 Days" },
            { icon: Shield, label: "Money Back", value: "Guarantee" },
            { icon: Zap, label: "Daily Updates", value: "Zero Ghosting" },
            { icon: Sparkles, label: "Deliverables", value: "At Every Step" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border">
              <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// AnimatePresence for expanded content
import { AnimatePresence } from "framer-motion"