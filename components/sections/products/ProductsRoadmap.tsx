"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { 
  Rocket,
  Clock,
  Lock,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Server,
  CreditCard,
  BarChart3,
  Globe,
  Smartphone,
  Mail,
  Bell
} from "lucide-react"

// Roadmap data — minimal, curiosity-building
const roadmap = [
  {
    id: 1,
    name: "BillFlow",
    tagline: "ISP billing automation that actually works",
    status: "development", // development, planned, soon
    icon: CreditCard,
    color: "primary",
    description: "From chaos to collections in 2 hours, not 3 days.",
    eta: "Beta live now",
    features: ["Auto invoicing", "Payment tracking", "WhatsApp reminders"]
  },
  {
    id: 2,
    name: "ConnectPro",
    tagline: "Customer support without the headache",
    status: "planned",
    icon: Users,
    color: "accent",
    description: "One inbox. All channels. Zero tickets lost.",
    eta: "Q2 2025",
    features: ["Unified inbox", "Auto-assignment", "SLA tracking"]
  },
  {
    id: 3,
    name: "NetGuard",
    tagline: "Network monitoring that prevents disasters",
    status: "soon",
    icon: Shield,
    color: "muted",
    description: "Know before your customers know.",
    eta: "Q3 2025",
    features: ["Real-time alerts", "Downtime prediction", "Auto-failover"]
  },
  {
    id: 4,
    name: "GrowthEngine",
    tagline: "Find subscribers before they find you",
    status: "soon",
    icon: TrendingUp,
    color: "muted",
    description: "Lead generation built for ISPs.",
    eta: "Q4 2025",
    features: ["Lead scoring", "Auto outreach", "Conversion tracking"]
  },
  {
    id: 5,
    name: "MobileCMD",
    tagline: "Run your ISP from your pocket",
    status: "soon",
    icon: Smartphone,
    color: "muted",
    description: "Full control. Anywhere. Anytime.",
    eta: "2026",
    features: ["iOS & Android", "Push notifications", "One-tap actions"]
  }
]

const statusConfig = {
  development: {
    label: "In Development",
    icon: Rocket,
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary",
    dot: "bg-green-500",
    animate: true
  },
  planned: {
    label: "Planned",
    icon: Clock,
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-600",
    dot: "bg-amber-500",
    animate: false
  },
  soon: {
    label: "Coming Soon",
    icon: Lock,
    bg: "bg-muted",
    border: "border-border",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    animate: false
  }
} as const;

export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Vision</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            What we are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              building next
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One problem at a time. One product at a time. The complete toolkit for modern ISPs.
          </p>
        </motion.div>

        {/* Roadmap Cards */}
        <div className="space-y-4">
          {roadmap.map((product, idx) => {
  // product.status ko as a key treat karein
  const statusKey = product.status as keyof typeof statusConfig;
  const status = statusConfig[statusKey];

  const isExpanded = expandedId === product.id;
  const isDevelopment = product.status === "development";
            
            return (
              <motion.div
                key={product.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setExpandedId(isExpanded ? null : product.id)}
                className={`relative rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isDevelopment
                    ? "bg-card border-primary/30 shadow-lg shadow-primary/5"
                    : "bg-card/50 border-border hover:border-primary/20 hover:bg-card"
                }`}
              >
                {/* Development Glow */}
                {isDevelopment && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                )}

                <div className="relative p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl shrink-0 ${
                      isDevelopment ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <product.icon className={`w-6 h-6 ${
                        isDevelopment ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className={`text-xl font-bold mb-1 ${
                            isDevelopment ? 'text-foreground' : 'text-foreground'
                          }`}>
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.tagline}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bg} ${status.border}`}>
                          <span className={`w-2 h-2 rounded-full ${status.dot} ${status.animate ? 'animate-pulse' : ''}`} />
                          <status.icon className={`w-3.5 h-3.5 ${status.text}`} />
                          <span className={`text-xs font-semibold ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* One-liner description */}
                      <p className="text-foreground font-medium mb-3">
                        {product.description}
                      </p>

                      {/* ETA */}
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {product.eta}
                      </p>

                      {/* Expanded teaser */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-border">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                Key capabilities
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {product.features.map((feature, fidx) => (
                                  <span 
                                    key={fidx}
                                    className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              
                              {isDevelopment && (
                                <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                                  Join beta waitlist
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Expand indicator */}
                    <div className="shrink-0 self-center">
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Progress bar for development */}
                {isDevelopment && (
                  <div className="h-1 bg-muted">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
            <div className="text-left">
              <p className="font-semibold text-foreground">Have a specific problem?</p>
              <p className="text-sm text-muted-foreground">We might already be thinking about it.</p>
            </div>
            <Link 
  href="/book-call" 
  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity whitespace-nowrap text-center cursor-pointer"
>
  <Mail className="w-4 h-4" />
  <span>Suggest a Product</span>
</Link>

          </div>
        </motion.div>

      </div>
    </section>
  )
}