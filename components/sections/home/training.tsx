"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Database, 
  Server, 
  Code2, 
  Layers, 
  Shield, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  Terminal,
  Lock,
  Cloud,
  Cpu,
  GitBranch,
  Container
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const programs = [
  {
    id: "fullstack-saas",
    icon: Layers,
    title: "Full-Stack SaaS Mastery",
    tagline: "Build Production-Ready SaaS Applications",
    duration: "16 Weeks",
    level: "Advanced",
    price: "10K PKR",
    batchSize: "15 Students",
    description: "Learn to architect, build, and deploy scalable SaaS platforms. Not just CRUD apps—real multi-tenant systems with billing, authentication, and business logic.",
    
    focusAreas: [
      {
        icon: Server,
        title: "Backend Architecture",
        desc: "Node.js, Express, PostgreSQL, Redis caching, message queues"
      },
      {
        icon: Database,
        title: "Database Design",
        desc: "Schema design, indexing, transactions, data modeling for scale"
      },
      {
        icon: Shield,
        title: "Security & Auth",
        desc: "JWT, OAuth2, RBAC, encryption, SOC 2 compliance basics"
      },
      {
        icon: Cloud,
        title: "Cloud & DevOps",
        desc: "Docker, AWS, CI/CD, monitoring, auto-scaling"
      }
    ],
    
    curriculum: [
      {
        phase: "Foundation",
        weeks: "Weeks 1-4",
        topics: ["System Design Basics", "Node.js Deep Dive", "Database Fundamentals", "REST & GraphQL APIs"]
      },
      {
        phase: "Core Backend",
        weeks: "Weeks 5-8",
        topics: ["Authentication Systems", "Authorization & RBAC", "Payment Integration (Stripe)", "Email & Notification Systems"]
      },
      {
        phase: "SaaS Architecture",
        weeks: "Weeks 9-12",
        topics: ["Multi-tenancy Patterns", "Business Logic Layer", "Background Jobs & Queues", "Real-time Features (WebSockets)"]
      },
      {
        phase: "Production",
        weeks: "Weeks 13-16",
        topics: ["Testing & TDD", "Performance Optimization", "Security Hardening", "Deployment & Monitoring"]
      }
    ],
    
    projects: [
      {
        name: "Multi-tenant CRM",
        tech: "Next.js, PostgreSQL, Prisma",
        desc: "Role-based access, subscription tiers, activity logs"
      },
      {
        name: "E-commerce API",
        tech: "Node.js, Redis, Stripe",
        desc: "Inventory management, payment webhooks, order processing"
      },
      {
        name: "Real-time Dashboard",
        tech: "WebSockets, ClickHouse, Docker",
        desc: "Live analytics, data aggregation, caching strategies"
      }
    ],
    
    outcomes: [
      "Architect scalable backend systems",
      "Design database schemas for millions of records",
      "Implement complex business logic & workflows",
      "Deploy production-ready SaaS applications",
      "Pass backend engineering interviews"
    ]
  },
  
  {
    id: "backend-specialist",
    icon: Database,
    title: "Backend Engineering Specialist",
    tagline: "Master Server-Side Development",
    duration: "12 Weeks",
    level: "Intermediate to Advanced",
    price: "15K PKR",
    batchSize: "12 Students",
    description: "Deep dive into backend engineering. From API design to distributed systems. For developers who want to specialize in server-side architecture.",
    
    focusAreas: [
      {
        icon: Terminal,
        title: "API Design",
        desc: "RESTful principles, GraphQL, gRPC, API versioning"
      },
      {
        icon: Cpu,
        title: "System Design",
        desc: "Microservices, load balancing, caching strategies"
      },
      {
        icon: Lock,
        title: "Data Security",
        desc: "Encryption, hashing, SQL injection prevention, XSS"
      },
      {
        icon: GitBranch,
        title: "Version Control",
        desc: "Git workflows, CI/CD pipelines, code review practices"
      }
    ],
    
    curriculum: [
      {
        phase: "API Mastery",
        weeks: "Weeks 1-3",
        topics: ["REST Best Practices", "GraphQL Schema Design", "API Documentation", "Error Handling Patterns"]
      },
      {
        phase: "Database Deep Dive",
        weeks: "Weeks 4-6",
        topics: ["Advanced SQL", "NoSQL Patterns", "Data Modeling", "Migration Strategies"]
      },
      {
        phase: "System Architecture",
        weeks: "Weeks 7-9",
        topics: ["Microservices", "Message Queues", "Event-Driven Design", "Service Discovery"]
      },
      {
        phase: "Production Ready",
        weeks: "Weeks 10-12",
        topics: ["Logging & Monitoring", "Performance Tuning", "Security Auditing", "Disaster Recovery"]
      }
    ],
    
    projects: [
      {
        name: "Payment Gateway",
        tech: "Node.js, PostgreSQL, Webhooks",
        desc: "Idempotency, retry logic, transaction management"
      },
      {
        name: "Distributed Cache",
        tech: "Redis, Node.js, Docker",
        desc: "Cache invalidation, rate limiting, session storage"
      },
      {
        name: "Task Scheduler",
        tech: "Bull Queue, MongoDB, AWS Lambda",
        desc: "Job queues, cron jobs, dead letter handling"
      }
    ],
    
    outcomes: [
      "Design RESTful & GraphQL APIs",
      "Optimize database queries for performance",
      "Build fault-tolerant distributed systems",
      "Implement authentication & authorization",
      "Handle 10k+ concurrent users"
    ]
  }
]

const features = [
  {
    icon: Briefcase,
    title: "Real Business Projects",
    desc: "Not todo apps. Build actual SaaS features used by real companies."
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    desc: "Weekly code reviews with senior engineers from top tech companies."
  },
  {
    icon: TrendingUp,
    title: "Job Placement Support",
    desc: "Resume optimization, mock interviews, and direct referrals."
  },
  {
    icon: Award,
    title: "Industry Certificate",
    desc: "Recognized by 50+ companies in Pakistan and UAE."
  }
]

export function Training() {
  const [activeProgram, setActiveProgram] = useState(programs[0].id)

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium border-primary/20">
            Professional Training
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Learn to build{" "}
            <span className="text-primary">enterprise SaaS</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop learning syntax. Start architecting systems. Our programs focus on 
            backend engineering, business logic, and scalable architecture—the skills 
            that separate $500 developers from $5,000 engineers.
          </p>
        </div>

        {/* Why Different - Key Message */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              We don't teach you to code.
              <br />
              <span className="text-primary">We teach you to engineer.</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Other Courses</h4>
                  <p className="text-sm text-muted-foreground">To-do lists, weather apps, basic CRUD. Frontend-heavy with copy-paste backend.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">CodEarn Tech</h4>
                  <p className="text-sm text-muted-foreground">Multi-tenant SaaS, payment systems, business logic, security, scalability. Backend-first approach.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Program Selection Tabs */}
        <Tabs value={activeProgram} onValueChange={setActiveProgram} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:max-w-xl lg:mx-auto p-1 bg-muted rounded-full">
            {programs.map((program) => (
              <TabsTrigger 
                key={program.id} 
                value={program.id}
                className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm py-3 text-sm font-medium"
              >
                <program.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                {program.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {programs.map((program) => (
            <TabsContent key={program.id} value={program.id} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Program Header Card */}
                  <Card className="border-2 border-primary/20 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                              <program.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">{program.title}</h3>
                              <p className="text-primary font-medium">{program.tagline}</p>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground max-w-2xl text-lg">
                            {program.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 lg:flex-col lg:items-end">
                          <Badge variant="secondary" className="text-base px-4 py-2">
                            <Clock className="w-4 h-4 mr-2" />
                            {program.duration}
                          </Badge>
                          <Badge variant="outline" className="text-base px-4 py-2 border-primary/20">
                            <Users className="w-4 h-4 mr-2" />
                            {program.batchSize}
                          </Badge>
                          <div className="text-3xl font-bold text-foreground">{program.price}</div>
                        </div>
                      </div>

                      <Separator className="my-8" />

                      {/* Focus Areas - Backend Heavy */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          What You'll Master
                        </h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {program.focusAreas.map((area, i) => (
                            <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/20 transition-colors group">
                              <area.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                              <h5 className="font-semibold text-foreground mb-1 text-sm">{area.title}</h5>
                              <p className="text-xs text-muted-foreground leading-relaxed">{area.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Curriculum Timeline */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                          <Container className="w-4 h-4" />
                          16-Week Curriculum
                        </h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {program.curriculum.map((phase, i) => (
                            <div key={i} className="relative">
                              <div className="p-4 rounded-xl bg-card border border-border h-full">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                    {i + 1}
                                  </span>
                                  <span className="text-xs font-medium text-primary">{phase.weeks}</span>
                                </div>
                                <h5 className="font-semibold text-foreground mb-3 text-sm">{phase.phase}</h5>
                                <ul className="space-y-2">
                                  {phase.topics.map((topic, j) => (
                                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {i < program.curriculum.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-border" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real Projects */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Real-World Projects
                        </h4>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {program.projects.map((project, i) => (
                            <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
                              <h5 className="font-semibold text-foreground mb-2 text-sm">{project.name}</h5>
                              <p className="text-xs text-primary font-medium mb-2">{project.tech}</p>
                              <p className="text-xs text-muted-foreground">{project.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            By The End, You Can:
                          </h4>
                          <ul className="space-y-3">
                            {program.outcomes.map((outcome, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                          <h4 className="font-bold text-foreground mb-2">Ready to level up?</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Next batch starts ... 
                          </p>
                          <Button size="lg" asChild className="rounded-full w-full gap-2">
                            <Link href={`/enroll?program=${program.id}`}>
                              Apply Now
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                          <p className="text-xs text-muted-foreground mt-3">
                            Limited seats. Application review required.
                          </p>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Not sure which program is right for you?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Schedule a free 15-minute consultation. We'll assess your current skills 
            and recommend the best path to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-full gap-2">
              <Link href="/book-call">
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}