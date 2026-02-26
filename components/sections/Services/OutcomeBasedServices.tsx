"use client"

import { useRef, useState, useCallback, memo } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { 
  TrendingUp, 
  Rocket, 
  Users, 
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Sparkles
} from "lucide-react"

// Memoized components for speed
const ServiceCard = memo(function ServiceCard({ 
  service, 
  isActive, 
  onClick 
}: { 
  service: typeof services[0]
  isActive: boolean
  onClick: () => void
}) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isActive 
          ? "bg-card border-primary/30 shadow-xl shadow-primary/5 col-span-2 row-span-2" 
          : "bg-card/50 border-border hover:border-primary/20 hover:bg-card"
      }`}
      style={{ willChange: "transform, opacity" }}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`} />
      
      <div className="relative p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
            <service.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-lg leading-tight mb-1 transition-colors ${isActive ? 'text-foreground' : 'text-foreground'}`}>
              {service.headline}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {service.problem}
            </p>
          </div>
          
          {service.popular && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          )}
        </div>

        {/* Expanded Content - Clean & Informational */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Result Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{service.result}</span>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
              <Shield className="w-4 h-4 text-accent" />
              <span>{service.guarantee}</span>
            </div>

            {/* CTA Row */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                <p className="text-2xl font-bold text-foreground">{service.price}</p>
              </div>
              
              <Link 
  href="/book-call" 
  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
>
  <span>{service.cta}</span>
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</Link>

            </div>
          </motion.div>
        )}

        {/* Collapsed Preview */}
        {!isActive && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">{service.price}</span>
            <span className="text-xs font-medium text-primary flex items-center gap-1">
              Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
})

// Services data - Clean & Professional
const services = [
  {
    id: 1,
    icon: TrendingUp,
    headline: "Conversion Systems That Actually Convert",
    problem: "Traffic without leads is just vanity metrics.",
    features: [
      "Landing pages optimized for your audience",
      "Automated lead capture workflows",
      "A/B tested conversion elements"
    ],
    result: "3x qualified leads in 90 days",
    guarantee: "50% increase or we keep working free",
    price: "50K PKR",
    cta: "Fix My Funnel",
    popular: true
  },
  {
    id: 2,
    icon: Rocket,
    headline: "MVP to Market in 30 Days",
    problem: "6-month timelines kill startups before they start.",
    features: [
      "Rapid prototyping & validation",
      "Daily founder sync (zero ghosting)",
      "Production-ready architecture"
    ],
    result: "Live product with paying users",
    guarantee: "30-day delivery or money back",
    price: "50K PKR",
    cta: "Launch Fast",
    popular: false
  },
  {
    id: 3,
    icon: Users,
    headline: "Developer Training That Sticks",
    problem: "Hired talent that can't ship production code.",
    features: [
      "Project-based learning system",
      "CI/CD pipeline implementation",
      "Code review culture setup"
    ],
    result: "Team ships weekly, not monthly",
    guarantee: "Measurable velocity in 60 days",
    price: "Custom",
    cta: "Train Team",
    popular: false
  },
  {
    id: 4,
    icon: Shield,
    headline: "Sleep-Sound Product Partnership",
    problem: "Post-launch panic when things break.",
    features: [
      "24/7 monitoring & alerts",
      "4-hour critical bug response",
      "Monthly strategy sessions"
    ],
    result: "99.9% uptime, zero 3AM calls",
    guarantee: "Miss SLA = free month",
    price: "5K/mo",
    cta: "Get Coverage",
    popular: false
  }
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [activeId, setActiveId] = useState(1)
  const prefersReducedMotion = useReducedMotion()

  const handleCardClick = useCallback((id: number) => {
    setActiveId(id)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header - Clean SaaS Style */}
        <motion.div 
          className="text-center mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built for{" "}
            <span className="text-primary">outcomes</span>, not outputs
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every engagement starts with your business goal and ends with a measurable result.
          </p>
        </motion.div>

        {/* Bento Grid Layout - Speed Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={activeId === service.id}
              onClick={() => handleCardClick(service.id)}
            />
          ))}
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Not sure what you need?</p>
                <p className="text-sm text-muted-foreground">15-minute diagnostic call. Zero obligation.</p>
              </div>
            </div>
            
            <Link 
  href="/book-call" 
  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity text-center"
>
  Book Free Call
  <ArrowRight className="w-4 h-4" />
</Link>

          </div>
        </motion.div>

      </div>
    </section>
  )
}