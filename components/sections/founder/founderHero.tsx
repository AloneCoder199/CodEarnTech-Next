"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import { ArrowDownRight, Quote, Sparkles, MapPin, Calendar, ChevronRight } from "lucide-react"

// Text scramble hook for that "hacker" effect
function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState("")
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  
  useEffect(() => {
    if (!trigger) return
    
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      
      if (iteration >= text.length) {
        clearInterval(interval)
      }
      
      iteration += 1 / 2
    }, 30)
    
    return () => clearInterval(interval)
  }, [trigger, text])
  
  return display || text
}

export  default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
   const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
   useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const spotlightX = useSpring(mouseX, springConfig)
  const spotlightY = useSpring(mouseY, springConfig)
  
  // 3D tilt effect for image
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  
  // Scramble text effects
  const firstName = useTextScramble("Muhammad", isInView)
  const lastName = useTextScramble("Bilal", isInView)

  // Founder data - authentic and meaningful
  const founder = {
    name: "Muhammad Bilal",
    role: "Founder & Chief Architect",
    company: "CodEarn Tech",
    location: "Pakistan",
    experience: "2019 — Present",
    tagline: "Building technology that builds people.",
    story: {
      hook: "From a village with no internet to architecting digital futures.",
      belief: "I don't just write code. I bridge the gap between what is and what could be. Every product we ship carries a piece of that journey—from limitation to possibility."
    },
    stats: [
      { value: "5+", label: "Years", sublabel: "Crafting Code" },
      { value: "100+", label: "Developers", sublabel: "Mentored" },
      { value: "50+", label: "Products", sublabel: "Shipped" }
    ],
    expertise: ["System Architecture", "Team Building", "Product Strategy"]
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30 selection:text-primary top-10"
    >
      {/* Cinematic Lighting Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base ambient */}
        <div className="absolute inset-0 bg-linear-to-br from-background via-muted/30 to-background" />
        
        {/* Animated spotlight following mouse */}
        <motion.div
          className="absolute w-200 h-200 rounded-full bg-primary/5 blur-[150px] opacity-60"
          style={{
            x: spotlightX,
            y: spotlightY,
            translateX: "-50%",
            translateY: "-50%",
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
        
        {/* Secondary accent light */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-150 h-150 rounded-full bg-accent/10 blur-[120px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid with fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        
        {/* Noise texture overlay for premium feel */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Floating Tech Particles */}
{mounted && (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const duration = 10 + Math.random() * 10
      const delay = Math.random() * 5

      return (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          initial={{ x, y, opacity: 0 }}
          animate={{ y: y - 120, opacity: [0, 1, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "linear",
          }}
        />
      )
    })}
  </div>
)}
      {/* Main Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center py-24 lg:py-0"
        style={{ opacity }}
      >
        
        {/* Asymmetric Layout with 3D perspective */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[90vh] perspective-1000">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1 space-y-5 relative"
            style={{ y: contentY }}
          >
            {/* Role Badge with glow effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="relative text-sm font-semibold text-primary tracking-wider uppercase">
                  {founder.role}
                </span>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted/50 border border-border/50 text-muted-foreground backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wide">{founder.location}</span>
              </div>
            </motion.div>

            {/* Name with Scramble Effect */}
            <div className="space-y-2 relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-5xl sm:text-5xl lg:text-5xl xl:text-8xl font-bold tracking-tighter text-foreground leading-[0.9] font-mono">
                  {firstName}
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tighter leading-[0.9]">
                  <span className="relative inline-block">
                    <span className="absolute -inset-2 bg-linear-to-r from-primary/20 to-accent/20 blur-2xl rounded-full" />
                    <span className="relative text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-accent">
                      {lastName}
                    </span>
                  </span>
                </h1>
              </motion.div>
            </div>

            {/* Company & Experience */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 text-muted-foreground"
            >
              <span className="text-xl font-semibold text-foreground">{founder.company}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <div className="flex items-center gap-2 text-sm font-mono">
                <Calendar className="w-4 h-4 text-primary/70" />
                <span>{founder.experience}</span>
              </div>
            </motion.div>

            {/* Expertise Tags
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {founder.expertise.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div> */}

            {/* The Hook - Premium Border Treatment */}
            <motion.div 
              className="relative pl-5 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary via-primary/50 to-transparent rounded-full" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight tracking-tight">
                {founder.story.hook}
              </p>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {founder.story.belief}
              </p>
            </motion.div>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-6 "
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base overflow-hidden shadow-2xl shadow-primary/25 bottom-5"
              >
                <span className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Explore Journey</span>
                <ArrowDownRight className="relative w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
              </motion.button>
              
              {/* <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all duration-300 text-foreground font-medium"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button> */}
            </motion.div>

          </motion.div>

          {/* Right - 3D Image with Tilt */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-2 relative"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.div 
              ref={imageRef}
              className="relative aspect-4/5 max-w-md mx-auto lg:max-w-none"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Multi-layered frame effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-[3rem] rotate-6 transform t-translate-z-5 blur-sm" />
              <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-primary/10 rounded-[3rem] -rotate-3 transform -translate-z-2.5" />
              
              {/* Main Image Container with Glass */}
              <div className="relative h-full rounded-[2.5rem] overflow-hidden border border-border/50 bg-muted shadow-2xl shadow-primary/10 backdrop-blur-xl">
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent z-10 pointer-events-none"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />
                
                <Image
                  src="/founder.webp"
                  alt={`${founder.name} — ${founder.role}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent" />
                
                {/* Floating Stats Card - Premium Glass */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-background/60 backdrop-blur-2xl border border-white/10 shadow-2xl"
                  initial={{ opacity: 0, y: 40, rotateX: 20 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
                  style={{ transformStyle: "preserve-3d", translateZ: "30px" }}
                >
                  <div className="grid grid-cols-3 gap-4 divide-x divide-border/30">
                    {founder.stats.map((stat, index) => (
                      <div key={index} className={`text-center ${index !== 0 ? 'pl-4' : ''}`}>
                        <motion.div 
                          className="text-3xl font-bold text-foreground mb-1 font-mono"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                          {stat.sublabel}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Floating Quote - 3D positioned */}
      <motion.div 
  className="absolute -top-4 -left-4 lg:-left-10 p-4 rounded-2xl bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-52.5 hidden sm:block group"
  initial={{ opacity: 0, x: -30, rotate: -6 }}
  animate={isInView ? { opacity: 1, x: 0, rotate: -3 } : {}}
  transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
  whileHover={{ y: -5, rotate: 0, borderColor: "rgba(var(--primary), 0.5)" }} 
>
  {/* Top Accent Line (Decorative) */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary/50 rounded-full" />

  <Quote className="w-5 h-5 text-primary mb-2 opacity-80" />
  
  <p className="text-[13px] text-white/90 leading-[1.4] font-medium tracking-tight">
    "Every limitation is just an <span className="text-primary italic">undeclared variable</span> waiting to be solved."
  </p>

  <div className="mt-4 flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
    <div className="shrink-0 w-7 h-7 rounded-lg bg-linear-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-inner">
      M
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[11px] font-bold text-white truncate uppercase tracking-wide">
        Founder's Code
      </span>
      <div className="flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] text-white/50 font-mono">EST 2024</span>
      </div>
    </div>
  </div>
</motion.div>



              {/* Decorative orbs */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-1/3 -right-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>

        </div>

        {/* Premium Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
        >
          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-border/50 flex justify-center pt-2 bg-background/20 backdrop-blur-sm"
          >
            <motion.div 
              className="w-1 h-2 rounded-full bg-primary/60"
              animate={{ opacity: [1, 0.2, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  )
}