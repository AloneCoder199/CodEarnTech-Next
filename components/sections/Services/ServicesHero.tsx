"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import {  AnimatePresence } from "framer-motion"

import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Phone,
  Calendar,
  Sparkles,
  Play,
  X
} from "lucide-react"
import Link from "next/link"

// Urgency countdown hook
function useCountdown(initialMinutes: number) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return { minutes, seconds, isExpired }
}

// Pain point data
const painPoints = [
  { icon: AlertCircle, text: "Projects delayed by months" },
  { icon: AlertCircle, text: "Developers ghosting mid-project" },
  { icon: AlertCircle, text: "Code that breaks on launch" },
  { icon: AlertCircle, text: "Hidden costs piling up" }
]

// Trust indicators
const trustStats = [
  { value: "100+", label: "Projects Delivered", icon: CheckCircle2 },
  { value: "47", label: "My Rejections → Success", icon: TrendingUp },
  { value: "5+", label: "Years Experience", icon: Clock },
  { value: "0", label: "Projects Abandoned", icon: Shield }
]

// Services preview
const services = [
  {
    title: "Full-Stack Development",
    description: "React, Next.js, Node.js — production-ready apps",
    price: "From 30K PKR",
    popular: true
  },
  {
    title: "MVP in 30 Days",
    description: "Idea to launch. Fast. Clean. Investor-ready.",
    price: "From 50K PKR",
    popular: false
  },
  {
    title: "Team Training",
    description: "Your team learns while we build together",
    price: "Custom",
    popular: false
  }
]

export function ServicesHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [showVideo, setShowVideo] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  
  // Urgency countdown - 15 minutes
  const { minutes, seconds, isExpired } = useCountdown(15)
  
  // Spots remaining (fake scarcity)
  const [spotsLeft, setSpotsLeft] = useState(3)

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        <motion.div 
          className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16 min-h-screen flex flex-col justify-center">
        
        {/* Top Urgency Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative  left-0 right-0 z-50 bg-linear-to-r from-red-600 via-orange-500 to-red-600 text-white py-2 px-4 text-center text-sm font-medium"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 animate-pulse" />
              Only {spotsLeft} consultation spots left this month
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4" />
              {!isExpired ? (
                <>Offer expires in {minutes}:{seconds.toString().padStart(2, '0')}</>
              ) : (
                <>Offer expired - Wait for next batch</>
              )}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
          
          {/* Left Content - Pain & Solution */}
          <div className="space-y-8">
            
            {/* Pain Hit - Immediate attention */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Tired of failed software projects?</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Finally, a developer who{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  delivers
                </span>
                {" "}what they promise
              </h1>
            </motion.div>

            {/* Pain Points - Relatable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-2xl p-6 border border-border"
            >
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Sound familiar?
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {painPoints.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-2 text-foreground"
                  >
                    <point.icon className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-sm">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solution Statement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              I don't just write code. I <span className="text-foreground font-semibold">ship products</span> that scale. 
              From a village with no internet to building systems for 100+ clients. 
              Your project isn't just another ticket—it's a promise I intend to keep.
            </motion.p>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {trustStats.map((stat, idx) => (
                <div key={idx} className="text-center p-4 rounded-xl bg-card border border-border">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/book-call"> {/* Link ko bahar rakhein taake poora button clickable ho */}
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-xl shadow-primary/25 overflow-hidden"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    <Calendar className="relative w-5 h-5" />
    <span className="relative">Book Free Strategy Call</span>
    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </motion.button>
</Link>
            </motion.div>

            {/* Social Proof Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="text-sm text-muted-foreground flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Join 100+ founders who trusted their vision to CodEarn Tech</span>
            </motion.p>

          </div>

          {/* Right - Services Preview Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">Services</h3>
              <span className="text-xs text-muted-foreground">Starting prices</span>
            </div>

            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  service.popular 
                    ? "bg-primary/5 border-primary shadow-lg shadow-primary/10" 
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Most Popular
                  </span>
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-foreground text-lg">{service.title}</h4>
                  <span className="text-primary font-bold">{service.price}</span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                
              </motion.div>
            ))}

            {/* Mini Testimonial */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-foreground italic mb-2">
                    "Bilal delivered our MVP in 28 days. Other agencies quoted 6 months. 
                    Best investment we made."
                  </p>
                  <p className="text-xs text-muted-foreground">
                    — Ahmed R., Founder, TechStart Pakistan
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-video bg-card rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Video placeholder - Embed your Loom/YouTube here</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}