"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  GraduationCap,
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  ChevronDown,
  X,
  Zap,
  Shield,
  Users,
  Code2,
  Rocket,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const services = [
  {
    id: "web",
    link : "/book-call",
    icon: Globe,
    title: "Web Development",
    tagline: "Next.js & React Solutions",
    shortDesc: "Blazing-fast, SEO-friendly web applications using modern tech stack.",
    fullDesc: "We build enterprise-grade web applications that scale. From marketing websites to complex dashboards, our solutions are optimized for performance, accessibility, and conversion.",
    price: "From 30K PKR",
    timeline: "2-4 weeks",
    popular: true,
    color: "blue",
    stats: { projects: "50+", satisfaction: "98%" },
    
    // Detailed deliverables
    deliverables: [
      { title: "Custom Next.js Architecture", desc: "Server-side rendering, API routes, and optimal performance" },
      { title: "Responsive Design System", desc: "Mobile-first approach with Tailwind CSS and shadcn/ui" },
      { title: "API Integration", desc: "RESTful and GraphQL APIs with proper error handling" },
      { title: "SEO & Analytics", desc: "Meta tags, structured data, and Google Analytics setup" },
      { title: "Performance Optimization", desc: "Core Web Vitals 90+ score guarantee" }
    ],
    
    process: [
      "Discovery & Requirements",
      "Wireframing & Design",
      "Development & Testing",
      "Deployment & Training"
    ],
    
    idealFor: ["Startups", "SMEs", "Enterprise"],
    techStack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Node.js"]
  },
  {
    id: "mobile",
    link : "/book-call",
    icon: Smartphone,
    title: "Mobile Apps",
    tagline: "iOS & Android Development",
    shortDesc: "Native-like mobile experiences with React Native and Flutter.",
    fullDesc: "Cross-platform mobile applications that feel native. Single codebase, multiple platforms, faster time-to-market without compromising on user experience.",
    price: "From 40K PKR",
    timeline: "4-8 weeks",
    popular: false,
    color: "purple",
    stats: { projects: "25+", satisfaction: "96%" },
    
    deliverables: [
      { title: "Cross-Platform Development", desc: "React Native or Flutter for iOS and Android" },
      { title: "App Store Publishing", desc: "Complete submission and approval process" },
      { title: "Push Notifications", desc: "Firebase Cloud Messaging integration" },
      { title: "Offline Support", desc: "Local data persistence and sync" },
      { title: "Biometric Authentication", desc: "Face ID and fingerprint login" }
    ],
    
    process: [
      "UX Research & Prototyping",
      "UI Design & Approval",
      "Development & QA Testing",
      "Store Submission & Launch"
    ],
    
    idealFor: ["Consumer Apps", "Business Tools", "E-commerce"],
    techStack: ["React Native", "Flutter", "Firebase", "Redux", "TypeScript"]
  },
  {
    id: "saas",
    link : "/book-call",
    icon: Cloud,
    title: "SaaS Platforms",
    tagline: "Scalable Software Solutions",
    shortDesc: "End-to-end SaaS with multi-tenancy and subscription management.",
    fullDesc: "Complete software-as-a-service platforms with user management, billing, admin dashboards, and API infrastructure. Built to scale from day one.",
    price: "From 50K PKR",
    timeline: "8-12 weeks",
    popular: true,
    color: "emerald",
    stats: { projects: "15+", satisfaction: "100%" },
    
    deliverables: [
      { title: "Multi-tenant Architecture", desc: "Secure data isolation between organizations" },
      { title: "Subscription Management", desc: "Stripe integration with multiple pricing tiers" },
      { title: "Admin Dashboard", desc: "User management, analytics, and system controls" },
      { title: "API Development", desc: "RESTful APIs with documentation" },
      { title: "Security & Compliance", desc: "SOC 2 ready, encryption at rest and in transit" }
    ],
    
    process: [
      "Architecture Planning",
      "MVP Development",
      "Beta Testing & Feedback",
      "Production Launch"
    ],
    
    idealFor: ["B2B Startups", "Enterprise Tools", "Marketplaces"],
    techStack: ["Next.js", "PostgreSQL", "Redis", "Docker", "AWS"]
  },
  {
    id: "training",
     link : "/enroll",
    icon: GraduationCap,
    title: "Pro Training",
    tagline: "Developer Bootcamps",
    shortDesc: "Intensive training with real projects and job placement support.",
    fullDesc: "Transform your career with hands-on training. Learn by building real projects with modern tech stack. Job placement support included.",
    price: "From 2K PKR",
    timeline: "12 weeks",
    popular: false,
    color: "orange",
    stats: { students: "100+", placement: "85%" },
    
    deliverables: [
      { title: "Live Real-world Projects", desc: "Build portfolio-worthy applications" },
      { title: "1-on-1 Mentorship", desc: "Weekly sessions with industry experts" },
      { title: "Job Placement Support", desc: "Resume review and interview prep" },
      { title: "Industry Certificate", desc: "Recognized by top companies" },
      { title: "Lifetime Community Access", desc: "Network with alumni and mentors" }
    ],
    
    process: [
      "Foundation & Basics",
      "Project-based Learning",
      "Advanced Concepts",
      "Career Preparation"
    ],
    
    idealFor: ["Students", "Career Switchers", "Upskillers"],
    techStack: ["JavaScript", "React", "Node.js", "MongoDB", "Git"]
  }
]

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
    icon: "text-blue-600 dark:text-blue-400",
    light: "bg-blue-100 dark:bg-blue-900/30"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-300",
    icon: "text-purple-600 dark:text-purple-400",
    light: "bg-purple-100 dark:bg-purple-900/30"
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: "text-emerald-600 dark:text-emerald-400",
    light: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-700 dark:text-orange-300",
    icon: "text-orange-600 dark:text-orange-400",
    light: "bg-orange-100 dark:bg-orange-900/30"
  }
}

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium border-primary/20">
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Solutions built for{" "}
            <span className="text-primary">real impact</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Click on any service to see detailed deliverables, process, and pricing. 
            No hidden fees, just transparent value.
          </p>
        </div>

        {/* Services Stack */}
        <div className="space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon
            const isExpanded = expandedId === service.id
            const colors = colorMap[service.color as keyof typeof colorMap]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`
                  overflow-hidden transition-all duration-300 border-2
                  ${isExpanded ? 'border-primary shadow-lg' : 'border-border hover:border-primary/20'}
                `}>
                  
                  {/* Collapsed Header - Always Visible */}
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="w-full p-6 lg:p-8 text-left group"
                  >
                    <div className="flex items-center gap-5 lg:gap-6">
                      {/* Icon */}
                      <div className={`
                        shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300
                        ${colors.bg} ${colors.border} ${colors.text}
                        ${isExpanded ? 'scale-110' : 'group-hover:scale-105'}
                      `}>
                        <Icon className="w-7 h-7 lg:w-8 lg:h-8" />
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                            {service.title}
                          </h3>
                          {service.popular && (
                            <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm font-medium ${colors.text}`}>
                          {service.tagline}
                        </p>
                        
                        {/* Quick Stats - Hidden when expanded */}
                        <div className={`
                          flex items-center gap-4 mt-2 text-sm transition-all duration-300
                          ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}
                        `}>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {service.timeline}
                          </span>
                          <span className="flex items-center gap-1.5 font-semibold text-foreground">
                            {/* <DollarSign className="w-4 h-4" /> */}
                            {service.price}
                          </span>
                          <span className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {service.stats.projects || service.stats.students} delivered
                          </span>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className={`
                        shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isExpanded 
                          ? 'bg-primary border-primary text-primary-foreground rotate-180' 
                          : 'bg-background border-border text-muted-foreground group-hover:border-primary/30'
                        }
                      `}>
                        {isExpanded ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <CardContent className="px-6 lg:px-8 pb-8 pt-0">
                          <Separator className="mb-8" />
                          
                          <div className="grid lg:grid-cols-3 gap-8">
                            
                            {/* Left: Description & Deliverables */}
                            <div className="lg:col-span-2 space-y-8">
                              <div>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Rocket className="w-4 h-4" />
                                  About this service
                                </h4>
                                <p className="text-foreground/90 leading-relaxed text-lg">
                                  {service.fullDesc}
                                </p>
                              </div>

                              {/* Deliverables */}
                              <div>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                  <Check className="w-4 h-4" />
                                  What's included
                                </h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                  {service.deliverables.map((item, i) => (
                                    <div key={i} className={`
                                      p-4 rounded-lg border transition-colors duration-200
                                      ${colors.light} ${colors.border}
                                    `}>
                                      <h5 className={`font-semibold text-sm mb-1 ${colors.text}`}>
                                        {item.title}
                                      </h5>
                                      <p className="text-xs text-muted-foreground leading-relaxed">
                                        {item.desc}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Process */}
                              <div>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                  <Zap className="w-4 h-4" />
                                  Our Process
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                  {service.process.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <span className={`
                                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                        ${colors.bg} ${colors.text} ${colors.border} border
                                      `}>
                                        {i + 1}
                                      </span>
                                      <span className="text-sm text-foreground/80">{step}</span>
                                      {i < service.process.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right: Sidebar Info */}
                            <div className="space-y-6">
                              
                              {/* Pricing Card */}
                              <div className="p-6 rounded-xl bg-card border-2 border-border">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                  Investment
                                </h4>
                                <div className="mb-4">
                                  <span className="text-3xl font-bold text-foreground">{service.price}</span>
                                  <span className="text-muted-foreground text-sm ml-2">starting</span>
                                </div>
                                <div className="space-y-2 text-sm mb-6">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Timeline</span>
                                    <span className="font-medium">{service.timeline}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Satisfaction</span>
                                    <span className="font-medium text-emerald-600">{service.stats.satisfaction || service.stats.placement}</span>
                                  </div>
                                </div>
                                <Button asChild className="w-full rounded-full gap-2">
                                  <Link href={`${service.link}?service=${service.id}`}>
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </div>

                              {/* Tech Stack */}
                              <div>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Code2 className="w-4 h-4" />
                                  Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {service.techStack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="font-normal">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Ideal For */}
                              <div>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Shield className="w-4 h-4" />
                                  Ideal For
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {service.idealFor.map((item) => (
                                    <span key={item} className={`
                                      px-3 py-1 rounded-full text-xs font-medium border
                                      ${colors.bg} ${colors.border} ${colors.text}
                                    `}>
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>

                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Not sure which service fits you?
              </h3>
              <p className="text-muted-foreground">
                Book a free 15-minute consultation. We'll help you choose the right solution.
              </p>
            </div>
            <Button variant="outline" size="lg" asChild className="rounded-full gap-2">
              <Link href="/book-call?type=consultation">
                Schedule Free Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}