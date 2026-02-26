"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { 
  Target, 
  Users, 
  Rocket, 
  Globe, 
  Code2, 
  GraduationCap, 
  Heart, 
  TrendingUp,
  Quote,
  Sparkles,
  ArrowRight,
  CheckCircle2
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
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [trigger, target, duration])
  
  return count
}

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

export function IntroductionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  // Animated counters
  const studentsCount = useCounter(100000, isInView, 2.5)
  const projectsCount = useCounter(50, isInView, 2)
  const yearsCount = useCounter(5, isInView, 1.5)
  
  // Founder data
  const founder = {
  name: "Muhammad Bilal",
  role: "Founder & Lead Developer",
  tagline: "Bridging the Gap Between Learning and Industry-Grade Engineering.",
  
  struggle: {
    title: "The Journey: From Constraints to Creation",
    points: [
      "Originating from a remote village with zero initial access to the internet or modern tech resources.",
      "Navigating an industry where traditional software houses offered little mentorship to self-taught talent.",
      "Overcoming systemic competition and skepticism by proving skill through consistent output.",
      "Driven by unwavering faith (Tawakkul) and a relentless work ethic to break the cycle of limitation."
    ]
  },

  vision: {
    title: "Mission 2025: Engineering the Future",
    points: [
      "Empowering a generation of 100,000+ students with high-end, production-ready technical skills.",
      "Establishing high-velocity partnerships with international clients to showcase Pakistani talent globally.",
      "Architecting and deploying a suite of scalable software products that solve real-world problems.",
      "Transforming Pakistan into a dominant global tech hub through elite engineering standards."
    ]
  },

  beliefs: [
    "Frontend is the art, but Backend is the soul—true engineering lies beneath the surface.",
    "Real growth happens in high-pressure, team-based environments, not in isolation.",
    "Technical skill is secondary; understanding the client’s business experience is the ultimate priority.",
    "Democratizing high-end technology—making elite-level coding education accessible to every dreamer."
  ]
};

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-size-[64px_64px][mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">The Story</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Beyond The <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Code</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {founder.tagline}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Story Card - Spans 2 columns */}
          <motion.div 
            className="lg:col-span-2 lg:row-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <TiltCard className="h-full">
              <div className="relative h-full p-8 lg:p-10 rounded-3xl bg-card border border-border overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">Est. 2019</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    Why CodEarn Tech?
                  </h3>
                  
                  <div className="space-y-6 text-muted-foreground leading-relaxed grow">
  <p className="text-lg leading-snug">
    While analyzing the current educational landscape, I observed a critical gap: most institutes fixate heavily on <span className="text-foreground font-semibold">surface-level Frontend aesthetics</span>. They leave students in the dark regarding complex backend architectures, scalable database systems, and the rigorous workflows required by top-tier tech firms.
  </p>
  
  <p className="text-base">
    The reality of the industry is clear—until a developer masters <span className="text-primary font-semibold">Backend logic, API orchestration, and collaborative team-based environments</span>, they remain a hobbyist. To bridge the gap to becoming a <span className="text-foreground font-semibold underline decoration-primary/30 underline-offset-4">Professional Software Engineer</span>, one must build products that handle real-world traffic and data.
  </p>

  <div className="relative mt-6 p-5 rounded-r-xl border-l-4 border-primary bg-primary/5 transition-all hover:bg-primary/10">
    <p className="text-[15px] font-medium italic text-foreground/90">
      "CodEarn Tech was founded on this very mission: to move beyond syntax and tutorials. We don't just teach you how to write code; we cultivate the sophisticated <span className="text-primary not-italic font-bold">Engineering Mindset</span> required to lead the global tech industry."
    </p>
  </div>
</div>


                  {/* Beliefs Tags */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {founder.beliefs.map((belief, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-muted border border-border text-foreground"
                      >
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        {belief}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Struggle Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TiltCard className="h-full">
              <div className="h-full p-6 lg:p-8 rounded-3xl bg-linear-to-br from-card to-muted border border-border hover:border-primary/20 transition-all duration-300">
                <div className="p-3 rounded-xl bg-orange-500/10 w-fit mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{founder.struggle.title}</h3>
                <ul className="space-y-3">
                  {founder.struggle.points.map((point, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground/80 italic font-medium tracking-wide">
  "While human support was scarce, the Divine guidance of Allah was my constant strength."
</p>

                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <TiltCard className="h-full">
              <div className="h-full p-6 lg:p-8 rounded-3xl bg-linear-to-br from-card to-muted border border-border hover:border-primary/20 transition-all duration-300">
                <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{founder.vision.title}</h3>
                <ul className="space-y-3">
                  {founder.vision.points.map((point, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          {/* Stats Row - Spans 3 columns */}
          <motion.div 
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { icon: Users, value: studentsCount, suffix: "+", label: "Students Target", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: Code2, value: projectsCount, suffix: "+", label: "Projects Delivered", color: "text-purple-500", bg: "bg-purple-500/10" },
              { icon: Rocket, value: yearsCount, suffix: "+", label: "Years Building", color: "text-orange-500", bg: "bg-orange-500/10" }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden group hover:border-primary/20 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-foreground font-mono mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                {/* Hover glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>

          {/* Philosophy Card - Full width */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="relative p-8 lg:p-12 rounded-3xl bg-linear-to-r from-primary/5 via-card to-accent/5 border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-center lg:text-left">
  <h3 className="text-2xl lg:text-4xl font-extrabold text-foreground mb-6 tracking-tight">
    A Foundation Built on <span className="text-primary">Faith</span>
  </h3>
  <div className="space-y-4">
    <p className="text-lg lg:text-xl text-muted-foreground leading-[1.6] font-medium">
      "Every milestone achieved and every boundary broken is a testament to the <span className="text-primary font-bold italic">Infinite Grace of Allah (SWT)</span>. We move forward with the firm conviction that our future growth is anchored in Divine Blessings."
    </p>
    
    <p className="text-base lg:text-lg text-muted-foreground/90 leading-relaxed">
      CodEarn Tech transcends the traditional definition of a software company; it is a <span className="text-foreground font-bold border-b-2 border-primary/40">sacred mission</span> to empower talent and serve the community through excellence in engineering.
    </p>
  </div>
</div>

                
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                    M
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{founder.name}</div>
                    <div className="text-sm text-muted-foreground">{founder.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}