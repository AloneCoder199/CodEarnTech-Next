"use client"

import { useRef, useState, useEffect, memo } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence, Variants } from "framer-motion"
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  GraduationCap,
  ArrowRight,
  Check,
  Layers,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Memoized components for performance
const ServiceButton = memo(({ 
  service, 
  isActive, 
  onClick, 
  colors 
}: { 
  service: any, 
  isActive: boolean, 
  onClick: () => void,
  colors: any
}) => {
  const Icon = service.icon
  
  return (
    <motion.button
      onClick={onClick}
      layout
      className={`
        w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-colors duration-200
        ${isActive 
          ? `${colors.bg} ${colors.border}` 
          : 'bg-card border-border hover:border-primary/20'
        }
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <motion.div 
          layout
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
            ${isActive ? colors.bg : 'bg-muted'}
          `}
        >
          <Icon className={`w-5 h-5 ${isActive ? colors.icon : 'text-muted-foreground'}`} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-sm sm:text-base ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
              {service.title}
            </h3>
          </div>
          <p className={`text-xs sm:text-sm mt-1 truncate ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
            {service.tagline}
          </p>
        </div>
      </div>
    </motion.button>
  )
})

ServiceButton.displayName = "ServiceButton"

// Optimized animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideVariants: Variants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

const services = [
  {
    id: "web",
    icon: Code2,
    title: "Web Development",
    tagline: "Modern, scalable web applications",
    description: "We build fast, accessible, and SEO-friendly web applications using Next.js, React, and TypeScript. From marketing sites to complex dashboards that handle millions of requests.",
    features: [
      "Next.js 14 with App Router",
      "Server-side rendering & SEO",
      "REST & GraphQL API integration",
      "Performance optimization (90+ Lighthouse)",
      "Accessibility compliance (WCAG 2.1)"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    color: "blue",
    stats: { projects: "35+", avgScore: "94" }
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    tagline: "Cross-platform native experiences",
    description: "Single codebase, multiple platforms. We deliver iOS and Android apps that feel native, perform smoothly, and scale with your user base using React Native and Flutter.",
    features: [
      "React Native & Flutter expertise",
      "Native module integration",
      "Offline-first architecture",
      "Push notifications & deep linking",
      "App Store & Play Store publishing"
    ],
    technologies: ["React Native", "Flutter", "Firebase", "Redux", "TypeScript"],
    color: "purple",
    stats: { projects: "15+", stores: "12" }
  },
  {
    id: "saas",
    icon: Cloud,
    title: "SaaS Platforms",
    tagline: "End-to-end software solutions",
    description: "Complete SaaS development from idea to scale. Multi-tenant architecture, subscription billing, admin dashboards, and the infrastructure to handle growth without breaking.",
    features: [
      "Multi-tenant database design",
      "Stripe subscription management",
      "Role-based access control (RBAC)",
      "Real-time features & notifications",
      "Auto-scaling cloud infrastructure"
    ],
    technologies: ["PostgreSQL", "Redis", "Docker", "AWS", "Kubernetes"],
    color: "emerald",
    stats: { platforms: "8", users: "50K+" }
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Pro Training",
    tagline: "Real-world developer education",
    description: "Not theory. Not tutorials. We train developers by building actual SaaS products alongside them. Graduates leave with portfolio projects that impress hiring managers.",
    features: [
      "16-week intensive bootcamp",
      "Build 3 production-ready projects",
      "1-on-1 mentorship from seniors",
      "Job placement assistance",
      "Lifetime community access"
    ],
    technologies: ["Full Stack", "System Design", "DevOps", "Career Prep"],
    color: "amber",
    stats: { graduates: "100+", placement: "85%" }
  }
]

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business, users, and goals. No code until we understand the problem completely.",
    icon: Layers
  },
  {
    number: "02",
    title: "Strategy",
    description: "Technical architecture, feature prioritization, and roadmap. We plan for scale from day one.",
    icon: Code2
  },
  {
    number: "03",
    title: "Build",
    description: "Agile development with weekly demos. You see progress, give feedback, and we iterate fast.",
    icon: Zap
  },
  {
    number: "04",
    title: "Launch",
    description: "Deployment, monitoring, and optimization. Plus 30 days of free support to ensure smooth sailing.",
    icon: Check
  }
]

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
    icon: "text-blue-600 dark:text-blue-400",
    light: "bg-blue-100/50 dark:bg-blue-900/20"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-300",
    icon: "text-purple-600 dark:text-purple-400",
    light: "bg-purple-100/50 dark:bg-purple-900/20"
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: "text-emerald-600 dark:text-emerald-400",
    light: "bg-emerald-100/50 dark:bg-emerald-900/20"
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
    icon: "text-amber-600 dark:text-amber-400",
    light: "bg-amber-100/50 dark:bg-amber-900/20"
  }
}

export function WhatWeDo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [activeService, setActiveService] = useState("web")
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Check mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const currentService = services.find(s => s.id === activeService) || services[0]
  const colors = colorMap[currentService.color as keyof typeof colorMap]

  // Optimized animation props
  const motionProps = prefersReducedMotion ? {} : {
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    variants: containerVariants
  }

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs sm:text-sm font-medium border-primary/20">
            What We Do
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-foreground">
            End-to-end solutions for{" "}
            <span className="text-primary">ambitious teams</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From first line of code to scaling infrastructure, we handle the technical 
            complexity so you can focus on growing your business.
          </p>
        </motion.div>

        {/* Services Interactive Display - Mobile Optimized */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24">
          
          {/* Left: Service Selector - Horizontal scroll on mobile */}
          <div className="lg:col-span-4">
            {/* Mobile: Horizontal scroll */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible snap-x snap-mandatory">
              {services.map((service) => {
                const isActive = activeService === service.id
                const serviceColors = colorMap[service.color as keyof typeof colorMap]
                
                return (
                  <div key={service.id} className="snap-start flex-shrink-0 w-[280px] sm:w-auto lg:w-full">
                    <ServiceButton
                      service={service}
                      isActive={isActive}
                      onClick={() => setActiveService(service.id)}
                      colors={serviceColors}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Service Detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                variants={prefersReducedMotion ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`
                  h-full p-6 sm:p-8 rounded-2xl border-2 ${colors.border} ${colors.bg}
                `}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center"
                    >
                      <currentService.icon className={`w-6 h-6 ${colors.icon}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">{currentService.title}</h3>
                      <p className="text-sm text-muted-foreground">{currentService.tagline}</p>
                    </div>
                  </div>
                  
                  {/* Stats - Horizontal on mobile */}
                  <div className="flex sm:flex-col gap-4 sm:gap-2 sm:text-right">
                    {Object.entries(currentService.stats).map(([key, value], i) => (
                      <motion.div 
                        key={key}
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                      >
                        <span className={`text-xl sm:text-2xl font-bold ${colors.text}`}>{value}</span>
                        <span className="text-xs text-muted-foreground ml-1 sm:ml-0 sm:block capitalize">{key}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator className={`my-6 ${colors.border}`} />

                {/* Description */}
                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base"
                >
                  {currentService.description}
                </motion.p>

                {/* Two Column Layout - Stack on mobile */}
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Features */}
                  <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                      What you get
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {currentService.features.map((feature, i) => (
                        <motion.li 
                          key={i}
                          initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm"
                        >
                          <div className={`
                            w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${colors.light}
                          `}>
                            <Check className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${colors.icon}`} />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentService.technologies.map((tech, i) => (
                        <motion.span 
                          key={tech}
                          initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className={`
                            px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium border
                            ${colors.bg} ${colors.border} ${colors.text}
                          `}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link 
                        href={`/services?${currentService.id}`}
                        className={`
                          inline-flex items-center gap-2 mt-6 sm:mt-8 text-xs sm:text-sm font-semibold
                          ${colors.text} hover:gap-3 transition-all
                        `}
                      >
                        Learn more
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    </motion.div>
                  </motion.div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <Separator className="my-12 sm:my-16" />

        {/* Process Section */}
        <motion.div 
          className="mb-12 sm:mb-16"
          {...motionProps}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              How we work
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A battle-tested process that delivers results. Transparent, collaborative, 
              and focused on your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                {/* Connector Line - Hidden on mobile, visible on lg */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-border to-transparent" />
                )}
                
                <motion.div 
                  className="p-4 sm:p-6 rounded-xl bg-card border border-border h-full"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-muted-foreground/20">{step.number}</span>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-2xl bg-muted/50 border border-border text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
            Not sure what you need?
          </h3>
          <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto px-4">
            Book a free 30-minute strategy call. We'll help you figure out the right 
            approach for your specific situation.
          </p>
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/book-call"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}