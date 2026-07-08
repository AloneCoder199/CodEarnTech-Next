"use client"

import { useRef, useState, useEffect, memo } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  Phone, 
  CheckCircle,
} from "lucide-react";
import { 
  ArrowRight,
  Construction,
  Zap,
  Users,
  Clock,
  Sparkles,
  Play,
  CheckCircle2,
  Bell,
  Rocket,
  Target,
  ChevronDown,
  X,
  Shield,
  TrendingUp
} from "lucide-react"

// Memoized components for speed
const CountUp = memo(function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(800)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= target) return target
        return prev + Math.floor(Math.random() * 2) + 1
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [target])
  
  return <span>{count.toLocaleString()}</span>
})

const FloatingCard = memo(function FloatingCard({ 
  children, 
  delay, 
  position 
}: { 
  children: React.ReactNode
  delay: number
  position: "left" | "right"
}) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: position === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${position === "left" ? "-left-4" : "-right-4"} top-1/3 p-4 rounded-xl bg-card border border-border shadow-lg hidden xl:block`}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  )
})


const handleUnderConstruction = () => {
  toast.custom((t) => (
    <div className="bg-background border rounded-xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden">
      {/* Gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
      
      {/* Close button */}
      <button 
        onClick={() => toast.dismiss(t)}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Info className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-lg">Product Under Construction</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We are working hard to bring this feature to you soon! Stay tuned for updates.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => toast.dismiss(t)}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Understood!
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast.dismiss(t);
                window.location.href = '/book-call';
              }}
              className="gap-2 border-primary/50 hover:bg-primary/10"
            >
              <Phone className="w-4 h-4" />
              Book a Call
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ), {
    duration: Infinity, // Manual close karna padega
  });
};


export function ProductHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [email, setEmail] = useState("")
  const [showVideo, setShowVideo] = useState(false)
  const [joined, setJoined] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setJoined(true)
      setTimeout(() => setJoined(false), 3000)
      setEmail("")
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Background - Subtle & Professional */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.1, 1], 
            opacity: [0.3, 0.4, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex flex-col justify-center py-20 lg:py-24">
        
        {/* Social Proof Badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              <CountUp target={847} />+ founders on the waitlist
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          {/* Pre-headline */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4"
          >
            From the founder of CodEarn
          </motion.p>

          {/* Product Name */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              LaunchPad
            </span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-tight mb-4"
          >
            We do not just build software.{" "}
            <span className="text-primary">We solve business problems.</span>
          </motion.p>

          {/* Sub-headline */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Built for Pakistani founders: From MVP to scale, without funding, 
            without a technical co-founder, without the usual agency nightmares.
          </motion.p>
        </div>

        {/* Problem Statement */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-10 w-full"
        >
          <div className="p-6 rounded-2xl bg-muted/30 border border-border">
            <p className="text-center text-foreground leading-relaxed text-sm sm:text-base">
              <span className="text-muted-foreground">Every Pakistani founder faces the same challenge:</span>{" "}
              You have the idea, not the capital. You are searching for a technical co-founder, 
              finding none. Agencies seem terrifying.{" "}
              <span className="text-primary font-semibold">LaunchPad is the bridge.</span>
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto w-full mb-10"
        >
          <form onSubmit={handleJoinWaitlist} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground text-base"
                required
              />
              {joined && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </motion.div>
              )}
            </div>
            
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              <Bell className="w-5 h-5" />
              <span>{joined ? "You are on the list!" : "Join Early Access"}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            First 100 members receive 50% off forever • No spam, guaranteed
          </p>
        </motion.div>

        {/* Secondary Actions */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
  {/* Button 1 */}
  <button 
    onClick={handleUnderConstruction}
    className="group inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all"
  >
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
      <Play className="w-3.5 h-3.5 text-primary ml-0.5" />
    </div>
    <span className="text-sm font-medium text-foreground">See How It Works</span>
  </button>

  {/* Button 2 */}
  <button 
    onClick={handleUnderConstruction}
    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
  >
    <Target className="w-4 h-4 text-muted-foreground" />
    <span>View Product Roadmap</span>
  </button>
</motion.div>

        {/* Product Preview */}
   <motion.div
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.8 }}
  className="relative max-w-4xl mx-auto w-full"
>
  <div className="relative aspect-[16/10] rounded-2xl bg-card border border-border overflow-hidden shadow-2xl">
    {/* 📸 IMAGE SECTION: Add your product preview image here */}
    <div className="absolute inset-0">
      <img 
        src="/product.webp" 
        alt="CodEarn Product Preview" 
        className="w-full h-full object-cover opacity-40 blur-[3px] hover:blur-0 transition-all duration-1000"
      />
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
    </div>

    {/* Launch Badge */}
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] sm:text-xs font-bold animate-pulse">
        <Clock className="w-3 h-3" />
        <span>Coming Q2 2026</span>
      </span>
    </div>

    {/* Center Overlay for "Under Development" */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
       <div className="bg-background/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-2xl max-w-sm">
          <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Construction className="w-6 h-6 text-amber-500" />
          </div>
          <h4 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">Something Great is Coming! </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We are meticulously crafting every detail to deliver the excellence you expect. 
            <span className="block mt-3 font-semibold text-primary">"True quality is worth the wait."</span>
          </p>
       </div>
    </div>
  </div>

  {/* Engaging Footer Text (The "Heart-Touching" Line) */}
  <div className="mt-10 text-center space-y-3 px-4">
    <p className="text-lg sm:text-2xl font-semibold text-foreground italic leading-snug">
      "Our mission isn't just to build software—it's to pave the path for your digital success."
    </p>
    <p className="text-sm sm:text-base text-muted-foreground font-medium">
      The future of <span className="text-primary font-bold">CodEarn</span> is brewing. Stay tuned. 
    </p>
  </div>

  {/* Floating Cards - Desktop Only */}
  <FloatingCard delay={1} position="left">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">10x Faster</p>
        <p className="text-xs text-muted-foreground">Optimized Workflow</p>
      </div>
    </div>
  </FloatingCard>

  <FloatingCard delay={1.1} position="right">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Rocket className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">Next-Gen SaaS</p>
        <p className="text-xs text-muted-foreground">Built for Scale</p>
      </div>
    </div>
  </FloatingCard>
</motion.div>



        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

      </div>

      {/* Video Modal */}
      

    </section>
  )
}