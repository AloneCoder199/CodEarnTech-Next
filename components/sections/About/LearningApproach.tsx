"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion"
import { 
  BookOpen, 
  Code2, 
  Users, 
  Target, 
  Zap, 
  Award,
  Clock,
  Laptop,
  MessageSquare,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Layers,
  GitBranch,
  Terminal,
  Database,
  Globe
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const learningPhilosophy = [
  {
    icon: Target,
    title: "Outcome-Based Learning",
    description: "We don't teach syntax. We teach problem-solving. Every concept is tied to a real business scenario you'll face in your career.",
    details: [
      "Learn by building actual SaaS products, not toy examples",
      "Every assignment mirrors real industry challenges",
      "Graduate with 3 production-ready portfolio projects"
    ]
  },
  {
    icon: Code2,
    title: "Code-First Methodology",
    description: "From day one, you're writing code. Theory is explained through implementation, not PowerPoint slides.",
    details: [
      "80% hands-on coding, 20% conceptual explanation",
      "Live coding sessions with senior engineers",
      "Code reviews that teach, not just criticize"
    ]
  },
  {
    icon: Users,
    title: "Mentorship, Not Lectures",
    description: "You're not a number in a batch. Every student gets personal attention from engineers who've built systems at scale.",
    details: [
      "1-on-1 weekly sessions with assigned mentors",
      "Direct access to instructors via Slack",
      "Career guidance from industry veterans"
    ]
  }
]

const curriculumStructure = [
  {
    phase: "Foundation",
    weeks: "Weeks 1-4",
    focus: "Core Concepts & Tools",
    icon: BookOpen,
    color: "blue",
    topics: [
      { name: "JavaScript Deep Dive", hours: "40h", type: "Core" },
      { name: "Async Programming", hours: "20h", type: "Core" },
      { name: "Git & Version Control", hours: "15h", type: "Tool" },
      { name: "System Design Basics", hours: "25h", type: "Concept" }
    ],
    project: "Build a CLI tool from scratch",
    outcome: "Solid programming fundamentals"
  },
  {
    phase: "Frontend Mastery",
    weeks: "Weeks 5-8",
    focus: "Modern React & UI Engineering",
    icon: Laptop,
    color: "purple",
    topics: [
      { name: "React Architecture", hours: "35h", type: "Core" },
      { name: "State Management", hours: "25h", type: "Core" },
      { name: "Tailwind & Design Systems", hours: "20h", type: "Skill" },
      { name: "Testing (Jest, RTL)", hours: "20h", type: "Practice" }
    ],
    project: "E-commerce dashboard with real API",
    outcome: "Production-ready frontend skills"
  },
  {
    phase: "Backend Engineering",
    weeks: "Weeks 9-12",
    focus: "Server-Side & Databases",
    icon: Database,
    color: "emerald",
    topics: [
      { name: "Node.js & Express", hours: "30h", type: "Core" },
      { name: "PostgreSQL & ORMs", hours: "30h", type: "Core" },
      { name: "API Design & Security", hours: "25h", type: "Concept" },
      { name: "Authentication Systems", hours: "15h", type: "Practice" }
    ],
    project: "Multi-tenant SaaS backend",
    outcome: "Scalable backend architecture skills"
  },
  {
    phase: "Full Stack & Deploy",
    weeks: "Weeks 13-16",
    focus: "Integration & Production",
    icon: Globe,
    color: "amber",
    topics: [
      { name: "Next.js Full Stack", hours: "30h", type: "Core" },
      { name: "DevOps & CI/CD", hours: "20h", type: "Tool" },
      { name: "Performance Optimization", hours: "20h", type: "Skill" },
      { name: "Career Preparation", hours: "30h", type: "Career" }
    ],
    project: "Complete SaaS platform launch",
    outcome: "Job-ready full stack engineer"
  }
]

const teachingMethods = [
  {
    icon: Terminal,
    title: "Live Coding Sessions",
    description: "Watch senior engineers build real features in real-time. Ask questions, suggest approaches, learn the thought process.",
    frequency: "Daily, 2 hours"
  },
  {
    icon: GitBranch,
    title: "Code Reviews",
    description: "Every line of your code is reviewed by professionals. Learn best practices, patterns, and industry standards.",
    frequency: "Twice weekly"
  },
  {
    icon: MessageSquare,
    title: "Peer Programming",
    description: "Work in pairs on complex problems. Learn to communicate technical ideas and collaborate like you would in a real team.",
    frequency: "3x per week"
  },
  {
    icon: Briefcase,
    title: "Mock Interviews",
    description: "Practice technical and behavioral interviews with engineers who've hired dozens of developers.",
    frequency: "Weekly, final 4 weeks"
  }
]

const studentSupport = [
  {
    icon: Clock,
    title: "24/7 Community Access",
    description: "Stuck at 2 AM? Our Discord community of students, alumni, and mentors is always active."
  },
  {
    icon: Layers,
    title: "Lifetime Resources",
    description: "All recordings, notes, and code repositories remain accessible even after graduation."
  },
  {
    icon: Award,
    title: "Job Placement Program",
    description: "Resume reviews, portfolio optimization, and direct referrals to our hiring partner network."
  }
]

const colorMap = {
  blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
  emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
  amber: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
}

export function LearningApproach() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-primary/20">
            <Lightbulb className="w-3 h-3 mr-2 inline" />
            How We Teach
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Learning that actually{" "}
            <span className="text-primary">prepares you for work</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most bootcamps teach you to code. We teach you to think like an engineer, 
            collaborate like a teammate, and deliver like a professional.
          </p>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {learningPhilosophy.map((item, i) => (
            <motion.div
              key={item.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                
                <ul className="space-y-3">
                  {item.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <Separator className="my-20" />

        {/* Curriculum Timeline */}
        <div className="mb-24">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              16-Week Curriculum Breakdown
            </h3>
            <p className="text-muted-foreground">
              Every week is designed to build upon the last. No filler content—only what you need to become job-ready.
            </p>
          </motion.div>

          <div className="space-y-8">
            {curriculumStructure.map((phase, i) => {
              const Icon = phase.icon
              const colors = colorMap[phase.color as keyof typeof colorMap]
              
              return (
                <motion.div
                  key={phase.phase}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {i < curriculumStructure.length - 1 && (
                    <div className="absolute left-8 top-full h-8 w-px bg-gradient-to-b from-border to-transparent hidden lg:block" />
                  )}
                  
                  <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Phase Header */}
                    <div className="lg:col-span-3 flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${colors}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary mb-1">{phase.weeks}</div>
                        <h4 className="text-xl font-bold text-foreground">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{phase.focus}</p>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="lg:col-span-6">
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.topics.map((topic, j) => (
                          <motion.div
                            key={topic.name}
                            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + j * 0.05 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/20 transition-colors"
                          >
                            <div>
                              <div className="font-medium text-sm text-foreground">{topic.name}</div>
                              <div className="text-xs text-muted-foreground">{topic.hours} • {topic.type}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Project & Outcome */}
                    <div className="lg:col-span-3 space-y-3">
                      <div className={`p-4 rounded-xl border ${colors}`}>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Capstone Project</div>
                        <div className="font-medium text-sm">{phase.project}</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="w-4 h-4 text-primary" />
                        <span>{phase.outcome}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <Separator className="my-20" />

        {/* Teaching Methods */}
        <div className="mb-24">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How You'll Learn
            </h3>
            <p className="text-muted-foreground">
              Multiple formats ensure concepts stick. We adapt to how you learn best.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachingMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{method.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{method.description}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Clock className="w-3 h-3" />
                  {method.frequency}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="my-20" />

        {/* Support System */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Support that doesn't end when class does
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Learning to code is hard. Doing it alone is harder. That's why we've built 
                a support system that carries you from your first line of code to your first job offer.
              </p>
              
              <div className="space-y-6">
                {studentSupport.map((support, i) => (
                  <motion.div
                    key={support.title}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <support.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{support.title}</h4>
                      <p className="text-sm text-muted-foreground">{support.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl blur-2xl" />
              <div className="relative p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    85%
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">Placement Rate</div>
                    <div className="text-muted-foreground">Within 3 months of graduation</div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Starting Salary</span>
                    <span className="font-semibold text-foreground">1000K - 5000K/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Hiring Partners</span>
                    <span className="font-semibold text-foreground">5+ Companies</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Student Satisfaction</span>
                    <span className="font-semibold text-foreground">4.9/5.0</span>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground italic">
                    "The mentorship was the game-changer. Having access to senior engineers who 
                    reviewed my code and explained their thought process—that's what made the difference."
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    <div>
                      <div className="font-medium text-sm text-foreground">Ahmed Khan</div>
                      <div className="text-xs text-muted-foreground">Now at Systems Limited</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to transform your career?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our next batch starts soon. Limited seats available. Apply now and secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enroll"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Apply for Bootcamp
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              Applications reviewed on rolling basis. Early applicants receive priority.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}