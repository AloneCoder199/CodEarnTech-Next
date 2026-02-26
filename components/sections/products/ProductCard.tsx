"use client"

import { useRef, useState } from "react"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  X, 
  Phone, 
  CheckCircle,
  Sparkles,
  Construction
} from "lucide-react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { 
  AlertTriangle,
  CheckCircle2,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  Users,
  Wrench,
  ArrowRight,
  Play,
  Pause,
  ChevronRight,
  Lock,
  Server,
  CreditCard,
  Receipt,
  BarChart3
} from "lucide-react"

// ISP Billing Product Data
const product = {
  name: "BillFlow",
  tagline: "ISP Billing Automation Platform",
  status: "beta", // beta, alpha, coming-soon
  problem: {
    headline: "ISPs lose 40% revenue to billing chaos",
    points: [
      "Manual invoice generation takes 3+ days monthly",
      "Payment tracking across 5+ different systems",
      "Late payments with zero automated reminders",
      "No real-time visibility into revenue leaks"
    ]
  },
  solution: {
    headline: "One platform. Full automation. Zero chaos.",
    features: [
      {
        icon: Zap,
        title: "Auto Invoice Generation",
        desc: "Generate 1000+ invoices in 2 minutes, not 3 days"
      },
      {
        icon: CreditCard,
        title: "Unified Payment Gateway",
        desc: "Cash, bank, mobile wallets — all tracked automatically"
      },
      {
        icon: Clock,
        title: "Smart Reminders",
        desc: "WhatsApp, SMS, email — before due date, not after"
      },
      {
        icon: BarChart3,
        title: "Real-Time Dashboard",
        desc: "See who paid, who delayed, who churned — live"
      }
    ]
  },
  result: {
    headline: "60% faster billing. 35% fewer late payments.",
    metrics: [
      { value: "60%", label: "Time Saved", sub: "3 days → 2 hours" },
      { value: "35%", label: "Late Payment Reduction", sub: "Automated reminders" },
      { value: "99.9%", label: "Accuracy", sub: "Zero manual errors" },
      { value: "3x", label: "Faster Collections", sub: "Real-time tracking" }
    ]
  },
  trust: {
    status: "Currently in closed beta",
    users: "3 ISPs testing internally",
    launch: "Public launch Q1 2025",
    security: "Bank-grade encryption"
  }
}

const handleBetaAlert = () => {
  toast.custom((t) => (
    <div className="bg-background border rounded-2xl shadow-2xl p-6 w-full max-w-lg relative overflow-hidden">
      {/* Animated gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient" />
      
      {/* Close button */}
      <button 
        onClick={() => toast.dismiss(t)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
            <Construction className="w-7 h-7 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-3 h-3 text-yellow-900" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 pr-6">
          <div>
            <h3 className="font-bold text-xl tracking-tight">
              We're Still Crafting Perfection!
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-600 text-xs font-semibold border border-yellow-400/30">
                BETA
              </span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Our apologies! The <strong className="text-foreground">Beta Access</strong> and{' '}
              <strong className="text-foreground">Live Demos</strong> are currently under heavy 
              development as we fine-tune the experience for you.
            </p>
            <p className="text-foreground font-medium">
              Would you like to discuss your project with us directly instead?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => toast.dismiss(t)}
              className="gap-2 flex-1"
            >
              <CheckCircle className="w-4 h-4" />
              Understood
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast.dismiss(t);
                window.location.href = '/book-call';
              }}
              className="gap-2 flex-1 border-green-500/50 text-green-600 hover:bg-green-500/10 hover:text-green-700"
            >
              <Phone className="w-4 h-4" />
              Book a Call Now
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
    </div>
  ), {
    duration: Infinity,
  });
};


export function HeroProductSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "result">("problem")
  const [isPlaying, setIsPlaying] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Wrench className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Our Product</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Meet{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              {product.name}
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {product.tagline}
          </p>
        </motion.div>

        {/* Main Product Card */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left - Product Preview */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl bg-card border border-border overflow-hidden shadow-2xl">
              {/* Product Screenshot Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30">
                {/* Mock Dashboard UI */}
                <div className="absolute inset-4 sm:inset-6 rounded-xl bg-card border border-border overflow-hidden">
                  {/* Header */}
                  <div className="h-12 sm:h-14 border-b border-border flex items-center px-4 gap-3 bg-muted/20">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Server className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">{product.name}</span>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-4 grid grid-cols-12 gap-3 h-[calc(100%-3.5rem)]">
                    {/* Sidebar */}
                    <div className="col-span-3 space-y-2 hidden sm:block">
                      <div className="h-8 rounded bg-primary/10" />
                      <div className="h-8 rounded bg-muted" />
                      <div className="h-8 rounded bg-muted" />
                      <div className="h-8 rounded bg-muted" />
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-span-12 sm:col-span-9 space-y-3">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="text-lg font-bold text-foreground">₹2.4M</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Pending</p>
                          <p className="text-lg font-bold text-foreground">₹340K</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Overdue</p>
                          <p className="text-lg font-bold text-red-500">₹89K</p>
                        </div>
                      </div>
                      
                      {/* Chart Area */}
                      <div className="flex-1 min-h-[120px] rounded-lg bg-muted/30 p-3">
                        <div className="flex items-end justify-between h-full gap-1">
                          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div 
                              key={i} 
                              className="w-full bg-primary/20 rounded-t"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Recent Activity */}
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded bg-muted/20">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-foreground">Invoice #{(2048 + i).toString()}</p>
                              <p className="text-[10px] text-muted-foreground">Paid via JazzCash</p>
                            </div>
                            <span className="text-xs font-semibold text-green-500">+₹2,400</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold">
                  <Wrench className="w-3 h-3" />
                  {product.trust.status}
                </span>
              </div>

              {/* Play Button for Demo */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
            </div>

            {/* Trust Indicators Below Preview */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/30 border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Testing With</p>
                  <p className="text-sm font-semibold text-foreground">{product.trust.users}</p>
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-muted/30 border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Security</p>
                  <p className="text-sm font-semibold text-foreground">{product.trust.security}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Problem / Solution / Result */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex p-1 rounded-xl bg-muted border border-border">
              {(["problem", "solution", "result"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[320px]">
              <AnimatePresence mode="wait">
                
                {/* PROBLEM */}
                {activeTab === "problem" && (
                  <motion.div
                    key="problem"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10"
                  >
                    <div className="flex items-center gap-2 mb-4 text-red-500">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-wider">The Problem</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {product.problem.headline}
                    </h3>
                    
                    <ul className="space-y-3">
                      {product.problem.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* SOLUTION */}
                {activeTab === "solution" && (
                  <motion.div
                    key="solution"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2 mb-4 text-primary">
                        <Zap className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">The Solution</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {product.solution.headline}
                      </h3>
                    </div>

                    <div className="grid gap-3">
                      {product.solution.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-xl bg-card border border-border flex items-start gap-4"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <feature.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {feature.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* RESULT */}
                {activeTab === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 mb-4">
                      <div className="flex items-center gap-2 mb-4 text-green-500">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">The Result</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground">
                        {product.result.headline}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {product.result.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-xl bg-card border border-border text-center"
                        >
                          <p className="text-2xl font-bold text-primary mb-1">
                            {metric.value}
                          </p>
                          <p className="text-xs font-semibold text-foreground mb-0.5">
                            {metric.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {metric.sub}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-3">
  {/* Join Beta Waitlist Button */}
  <button 
    onClick={handleBetaAlert}
    className="flex-1 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
  >
    <span>Join Beta Waitlist</span>
    <ArrowRight className="w-4 h-4" />
  </button>
  
  {/* Schedule Demo Button */}
  <button 
    onClick={handleBetaAlert}
    className="py-3 px-6 rounded-xl border border-border bg-card hover:bg-muted transition-colors font-medium text-sm cursor-pointer"
  >
    Schedule Demo
  </button>
</div>

              
              <p className="text-xs text-center text-muted-foreground mt-3">
                {product.trust.launch} • Free for beta testers
              </p>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  )
}