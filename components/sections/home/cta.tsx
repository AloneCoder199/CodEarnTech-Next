"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  Zap,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Clock,
  Shield,
  Users,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const clientPath = {
  id: "client",
  icon: Briefcase,
  title: "Start Your Project",
  subtitle: "For Businesses & Startups",
  description: "Ready to build something great? Let's discuss your project requirements and create a roadmap to success.",
  badge: "Free Consultation",
  features: [
    "Free 30-minute discovery call",
    "Detailed project proposal",
    "Transparent pricing estimate",
    "Timeline & milestone planning"
  ],
  cta: "Book Strategy Call",
  link: "/book-call",
  secondaryCta: "View Pricing",
  trustBadges: ["50+ Projects Delivered", "2-Week MVP Guarantee", "Source Code Included"]
}

const studentPath = {
  id: "student",
  icon: GraduationCap,
  title: "Join Bootcamp",
  subtitle: "For Aspiring Developers",
  description: "Transform your career with hands-on training. Learn to build production-ready SaaS applications from industry experts.",
  badge: "Next Batch: Jan 15",
  features: [
    "16-week intensive program",
    "Real-world SaaS projects",
    "1-on-1 mentorship included",
    "Job placement support"
  ],
  cta: "Apply Now",
  link: "/enroll?program=fullstack-saas",
  secondaryCta: "Download Syllabus",
  trustBadges: ["100+ Students Trained", "85% Placement Rate", "Industry Certificate"]
}

const quickLinks = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 3219515138",
    subtext: "Mon-Sat, 9AM-6PM",
    href: "tel:+923219515138"
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@codearntech.com",
    subtext: "Response within 24h",
    href: "mailto:hello@codearntech.com"
  },
  {
    icon: Calendar,
    label: "Schedule",
    value: "Book a Call",
    subtext: "15-min free consultation",
    href: "/book-call"
  }
]

export function CTA() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-primary/20">
            <Zap className="w-3 h-3 mr-2 inline" />
            Ready to Get Started?
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Let's build something{" "}
            <span className="text-primary">extraordinary</span> together
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a business looking for a tech partner or a developer ready to level up, 
            we have the perfect path for you.
          </p>
        </div>

        {/* Dual Path Cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {[clientPath, studentPath].map((path) => {
            const Icon = path.icon
            const isHovered = hoveredCard === path.id

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(path.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`
                  relative h-full overflow-hidden transition-all duration-300 border-2
                  ${isHovered ? 'border-primary shadow-xl shadow-primary/10' : 'border-border'}
                `}>
                  {/* Hover Gradient */}
                  <div className={`
                    absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent
                    transition-opacity duration-500
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `} />

                  <CardContent className="relative p-8 lg:p-10">
                    {/* Badge */}
                    <Badge className={`
                      mb-6 px-3 py-1 text-xs font-semibold
                      ${path.id === 'client' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}
                    `}>
                      {path.badge}
                    </Badge>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`
                        w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                        ${path.id === 'client' ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-600' : 'bg-purple-100 dark:bg-purple-950/50 text-purple-600'}
                      `}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{path.title}</h3>
                        <p className="text-sm text-muted-foreground">{path.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {path.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {path.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                          <CheckCircle2 className={`
                            w-5 h-5 shrink-0
                            ${path.id === 'client' ? 'text-blue-600' : 'text-purple-600'}
                          `} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="space-y-3">
                      <Button 
                        size="lg" 
                        asChild 
                        className={`
                          w-full rounded-full gap-2 text-base font-semibold
                          ${path.id === 'client' 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-purple-600 hover:bg-purple-700'
                          }
                        `}
                      >
                        <Link href={path.link}>
                          {path.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <div className="flex flex-wrap gap-2">
                        {path.trustBadges.map((badge, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Contact Options */}
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">
            Or reach out directly
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {quickLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</div>
                  <div className="font-semibold text-foreground truncate">{link.value}</div>
                  <div className="text-xs text-muted-foreground">{link.subtext}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>100% Secure & Confidential</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Response within 24 hours</span>
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Join 150+ satisfied clients</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}