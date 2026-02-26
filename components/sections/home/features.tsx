"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Zap, 
  Shield, 
  Users, 
  Globe, 
  Code2, 
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  Headphones,
  TrendingUp
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Feature data structure
const features = [
  {
    id: "development",
    link: "/services",
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web and mobile solutions using Next.js, React, Node.js, and modern cloud architecture.",
    badge: "Core Service",
    stats: "50+ Projects",
    color: "blue",
    size: "large", // large card
    highlights: ["React & Next.js", "Node.js Backend", "Cloud Deployed"]
  },
  {
    id: "training",
    link: "/training",
    icon: Users,
    title: "Pro-Level Training",
    description: "Industry-focused curriculum with real-world projects and AI tool integration.",
    badge: "Education",
    stats: "100+ Students",
    color: "purple",
    size: "medium",
    highlights: ["Hands-on Projects", "AI Integration", "Career Support"]
  },
  {
    id: "speed",
    link: "/services",
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with 99+ Lighthouse scores and sub-second load times.",
    badge: "Performance",
    stats: "99+ Score",
    color: "amber",
    size: "small",
    highlights: ["Core Web Vitals", "Edge Deployed", "Auto-Optimized"]
  },
  {
    id: "security",
    link: "/privacy-policy",
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance, encryption, and regular audits.",
    badge: "Security",
    stats: "SOC 2",
    color: "emerald",
    size: "small",
    highlights: ["End-to-End Encrypt", "Regular Audits", "GDPR Compliant"]
  },
  {
    id: "support",
    link: "/contact",
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Round-the-clock technical support with dedicated account managers.",
    badge: "Support",
    stats: "Always On",
    color: "rose",
    size: "medium",
    highlights: ["Slack Connect", "2hr Response", "Dedicated Manager"]
  },
  {
    id: "global",
    link: "/services",
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with edge networks in 100+ countries for lowest latency.",
    badge: "Infrastructure",
    stats: "100+ Regions",
    color: "cyan",
    size: "large",
    highlights: ["Edge Network", "Auto-Scaling", "99.99% Uptime"]
  }
]

// Color mappings
const colorMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
  purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800",
  amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
  rose: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-800",
}

const iconColorMap = {
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  amber: "text-amber-600 dark:text-amber-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
}

export function Features() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-primary/20">
            Why Choose Us
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Everything you need to{" "}
            <span className="text-primary">build and scale</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            From concept to deployment, we provide comprehensive solutions that drive 
            real business results. No fluff, just results.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredCard === feature.id
            
            // Determine grid span based on size
            const gridClass = 
              feature.size === "large" ? "md:col-span-2 lg:col-span-2" :
              feature.size === "medium" ? "md:col-span-1 lg:col-span-1" :
              "col-span-1"

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${gridClass} group relative`}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`
                  relative h-full overflow-hidden rounded-2xl border bg-card p-6 lg:p-8
                  transition-all duration-300 ease-out
                  ${isHovered ? 'shadow-lg border-primary/20' : 'shadow-sm border-border hover:border-primary/10'}
                `}>
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className={`
                    absolute inset-0 opacity-0 transition-opacity duration-500
                    ${isHovered ? 'opacity-100' : ''}
                    bg-linear-to-br from-primary/5 via-transparent to-transparent
                  `} />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`
                        p-3 rounded-xl border-2 transition-colors duration-300
                        ${colorMap[feature.color as keyof typeof colorMap]}
                        ${isHovered ? 'scale-110' : ''}
                        transition-transform duration-300
                      `}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <Badge variant="secondary" className="text-xs font-medium">
                        {feature.badge}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6">
                        {feature.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                            <CheckCircle2 className={`w-4 h-4 ${iconColorMap[feature.color as keyof typeof iconColorMap]}`} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom: Stats & Link */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <span className="text-sm font-semibold text-foreground">
                        {feature.stats}
                      </span>
                      
                      <Link 
                        href={`${feature.link}#${feature.id}`}
                        className={`
                          flex items-center gap-1 text-sm font-medium
                          ${iconColorMap[feature.color as keyof typeof iconColorMap]}
                          opacity-0 group-hover:opacity-100 transition-all duration-300
                          translate-x-2 group-hover:translate-x-0
                        `}
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                  {/* Corner accent */}
                  <div className={`
                    absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl
                    transition-opacity duration-500 opacity-0
                    ${isHovered ? 'opacity-20' : ''}
                    ${feature.color === 'blue' ? 'bg-blue-500' : ''}
                    ${feature.color === 'purple' ? 'bg-purple-500' : ''}
                    ${feature.color === 'amber' ? 'bg-amber-500' : ''}
                    ${feature.color === 'emerald' ? 'bg-emerald-500' : ''}
                    ${feature.color === 'rose' ? 'bg-rose-500' : ''}
                    ${feature.color === 'cyan' ? 'bg-cyan-500' : ''}
                  `} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">50+ companies</span> trust us
              </p>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-border" />
            
            <Link 
              href="/contact"
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Start your project today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}