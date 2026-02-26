"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { 
  XCircle, 
  AlertTriangle, 
  GraduationCap, 
  Code2, 
  Building2, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  Layers
} from "lucide-react"

// Optimized counter hook
function useCounter(target: number, trigger: boolean, duration: number = 2) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!trigger) return
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [trigger, target, duration])
  
  return count
}

// 3D Tilt Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => { x.set(0); y.set(0) }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  )
}

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Counters
  const gapPercentage = useCounter(85, isInView, 2)
  const theoryPercentage = useCounter(90, isInView, 2)
  const unemploymentPercentage = useCounter(65, isInView, 2)

  // Problem data
  const problems = [
    {
      icon: GraduationCap,
      title: "Theory-Heavy Education",
      stat: `${theoryPercentage}%`,
      description: "Training institutes focus 90% on theory, 10% on practical implementation. Students graduate without writing production-level code.",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Code2,
      title: "Frontend-Only Trap",
      stat: "Surface Level",
      description: "Most courses stop at HTML/CSS/JavaScript. Backend architecture, databases, APIs, and system design remain untouched.",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Building2,
      title: "No Real Projects",
      stat: "0 Experience",
      description: "Students never work with real clients, deadlines, or team workflows. Job market demands experience they don't have.",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Users,
      title: "Industry Disconnect",
      stat: `${gapPercentage}% Gap`,
      description: "Massive gap between academic curriculum and industry requirements. Graduates are unemployable without months of retraining.",
      color: "from-yellow-500 to-lime-500",
      bgColor: "bg-yellow-500/10"
    }
  ]

  const solutionPoints = [
    "Backend-first approach with real system architecture",
    "Live client projects from day one",
    "Team-based development environment",
    "Professional workflows & industry standards",
    "Product-based learning, not tutorial-based"
  ]

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </motion.div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-12"
        style={{ opacity }}
      >
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
          >
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">The Problem</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Why Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Developers Fail</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The tech education system is broken. Institutes produce graduates who can't build real software.
          </motion.p>
        </div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
            >
              <TiltCard className="h-full">
                <div className="relative h-full p-8 rounded-3xl bg-card border border-border overflow-hidden group hover:border-red-500/30 transition-all duration-500">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl ${problem.bgColor}`}>
                        <problem.icon className={`w-7 h-7 text-transparent bg-clip-text bg-gradient-to-br ${problem.color}`} style={{ color: 'inherit' }} />
                      </div>
                      <span className={`text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r ${problem.color}`}>
                        {problem.stat}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-red-500 transition-colors duration-300">
                      {problem.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${problem.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* The Gap Visualization */}
        <motion.div 
          className="relative p-8 lg:p-12 rounded-3xl bg-muted/50 border border-border mb-20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-primary/5" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                The Reality Check
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Traditional institutes charge <span className="text-foreground font-semibold">thousands of dollars</span> and teach outdated curricula. Students finish courses but can't crack technical interviews or contribute to real projects.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-foreground">No backend architecture knowledge</span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-foreground">Zero database design experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-foreground">Never deployed to production</span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-foreground">No API or microservices exposure</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Animated circles */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-red-500/20"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-4 rounded-full border-2 border-orange-500/20"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-8 rounded-full border-2 border-amber-500/20"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-foreground font-mono mb-2">
                      {unemploymentPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">
                      Unemployable Graduates
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solution Preview */}
        <motion.div 
          className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">The Solution</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                How CodEarn Tech <span className="text-primary">Fixes This</span>
              </h3>
              
              <ul className="space-y-4">
                {solutionPoints.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    </div>
                    <span className="text-foreground font-medium">{point}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <span>See Our Approach</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="p-6 rounded-2xl bg-card border border-border"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Target className="w-8 h-8 text-primary mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">Real</div>
                  <div className="text-sm text-muted-foreground">Client Projects</div>
                </motion.div>
                
                <motion.div 
                  className="p-6 rounded-2xl bg-card border border-border mt-8"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Layers className="w-8 h-8 text-accent mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">Full</div>
                  <div className="text-sm text-muted-foreground">Stack Deep Dive</div>
                </motion.div>
                
                <motion.div 
                  className="p-6 rounded-2xl bg-card border border-border"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <TrendingUp className="w-8 h-8 text-emerald-500 mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">Job</div>
                  <div className="text-sm text-muted-foreground">Ready Skills</div>
                </motion.div>
                
                <motion.div 
                  className="p-6 rounded-2xl bg-card border border-border mt-8"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Building2 className="w-8 h-8 text-orange-500 mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">Industry</div>
                  <div className="text-sm text-muted-foreground">Standards</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {[
            { label: "Students Trapped", value: "10,000+", sub: "In theory cycles" },
            { label: "Institutes", value: "500+", sub: "Teaching outdated skills" },
            { label: "Industry Gap", value: "$2B+", sub: "Lost productivity" },
            { label: "Our Solution", value: "100%", sub: "Practical focus" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="text-3xl font-bold text-foreground font-mono mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}