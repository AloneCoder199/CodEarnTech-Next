"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { 
  Check,
  X,
  Sparkles,
  Zap,
  Building2,
  Rocket,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Shield
} from "lucide-react"

// Pricing tiers data
const tiers = [
  {
    id: "starter",
    href: "/contact",
    name: "Starter",
    icon: Zap,
    price: "Rs 45,000",
    priceNote: "Starting from",
    description: "Ideal for startups needing a professional presence fast. High-conversion landing pages.",
    features: [
      { text: "Up to 5 Premium Pages", included: true },
      { text: "Ultra-Fast 5-Day Delivery", included: true }, // Aapki speed highlight ki hai
      { text: "Mobile & Tablet Responsive", included: true },
      { text: "SEO & Speed Optimized (90+ Score)", included: true },
      { text: "Contact Form & WhatsApp Integration", included: true },
      { text: "Free Deployment (Vercel/Netlify)", included: true },
      { text: "2 Rounds of Revisions", included: true },
      { text: "Admin Dashboard", included: false },
    ],
    cta: "Launch My Site",
    ctaSub: "Delivered in just 5 days",
    popular: false,
    color: "from-muted to-muted/50",
    badge: "Fast Track"
  },
  {
    id: "growth",
    href: "/book-call",
    name: "Growth",
    icon: Building2,
    price: "Rs 120,000",
    priceNote: "One-time",
    description: "Full-stack web applications with databases for businesses ready to automate and scale.",
    features: [
      { text: "Everything in Starter, plus:", included: true, isHeader: true },
      { text: "Custom Full-Stack Application", included: true },
      { text: "User Authentication & Database", included: true },
      { text: "Secure Admin Dashboard", included: true },
      { text: "Payment Gateway (Stripe/PayFast)", included: true },
      { text: "15-20 Days Delivery Time", included: true },
      { text: "3 Months Technical Support", included: true },
      { text: "Unlimited Revisions", included: true }
    ],
    cta: "Scale My Business",
    ctaSub: "Most chosen by founders",
    popular: true,
    color: "from-primary/20 to-accent/20",
    badge: "Best Value"
  },
  {
    id: "scale",
    name: "Scale",
    href: "/book-call",
    icon: Rocket,
    price: "Rs 250,000+",
    priceNote: "Custom quote",
    description: "Enterprise SaaS platforms and complex software systems built for massive scale.",
    features: [
      { text: "Everything in Growth, plus:", included: true, isHeader: true },
      { text: "SaaS Architecture & Multi-tenancy", included: true },
      { text: "Advanced AI/ML Integrations", included: true },
      { text: "Scalable AWS/Azure Infrastructure", included: true },
      { text: "Premium Security & Encryption", included: true },
      { text: "Dedicated Project Manager", included: true },
      { text: "1 Year Priority Maintenance", included: true },
      { text: "Code Ownership & Documentation", included: true }
    ],
    cta: "Discuss Enterprise Plan",
    ctaSub: "Custom timeline & features",
    popular: false,
    color: "from-accent/20 to-primary/20",
    badge: "Enterprise"
  }
]

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  // const [showCustomForm, setShowCustomForm] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Transparent Pricing</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Investment that{" "}
            <span className="text-primary">pays for itself</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fixed prices. No hidden fees. No surprises. Choose what fits, or let's build custom.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, idx) => {
            const isHovered = hoveredTier === tier.id
            const isPopular = tier.popular
            
            return (
              <motion.div
                key={tier.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`relative rounded-2xl border-2 transition-all duration-300 ${
                  isPopular
                    ? "bg-card border-primary shadow-xl shadow-primary/10 lg:scale-105 lg:-my-4 z-10"
                    : "bg-card/50 border-border hover:border-primary/30 hover:bg-card"
                } ${isHovered && !isPopular ? 'shadow-lg' : ''}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Tier Badge (non-popular) */}
                {!isPopular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tier.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                      <tier.icon className={`w-6 h-6 ${tier.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                        {tier.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{tier.priceNote}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fidx) => (
                      <li 
                        key={fidx}
                        className={`flex items-start gap-3 ${feature.isHeader ? 'pt-2 border-t border-border' : ''}`}
                      >
                        {feature.included ? (
                          <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${tier.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                            <Check className={`w-3.5 h-3.5 ${tier.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                        ) : (
                          <div className="p-0.5 rounded-full bg-muted shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5 text-muted-foreground/50" />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="space-y-3 ">
  {/* Link ko motion.button ke bahar wrap kiya hai */}
  <Link href={tier.href || "/book-call"}> 
    <motion.button
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
        tier.popular
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90'
          : 'bg-foreground text-background hover:opacity-90'
      }`}
    >
      <span>{tier.cta}</span>
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  </Link>
  
  <p className={`text-xs relative top-5 text-center ${tier.popular ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
    {tier.ctaSub}
  </p>
</div>

                </div>

                {/* Hover glow effect */}
                {isHovered && !prefersReducedMotion && (
                  <motion.div
                    layoutId="hoverGlow"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Custom Pricing CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Not sure which fits?</p>
                <p className="text-sm text-muted-foreground">Every business is unique. Let's find your perfect fit.</p>
              </div>
            </div>
            
            <Link 
  href="/book-call" 
  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
>
  <MessageSquare className="w-4 h-4" />
  <span>Get Custom Quote</span>
</Link>

          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            30-day money-back guarantee
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            No hidden fees ever
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Cancel anytime
          </span>
        </motion.div>

      </div>
    </section>
  )
}