"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { 
  XCircle,
  CheckCircle2,
  User,
  Clock,
  MessageSquare,
  HeartHandshake,
  Shield,
  Zap,
  Target,
  ArrowRight,
  Quote,
  Sparkles
} from "lucide-react"

// Differentiators data - US vs THEM
const differentiators = [
  {
    id: 1,
    icon: Target,
    title: "No Fake Promises",
    subtitle: "Real commitments, real results",
    us: {
      headline: "Guaranteed outcomes",
      points: [
        "50% lead increase or we keep working free",
        "30-day MVP delivery or full refund",
        "Measurable metrics, not vanity numbers"
      ],
      badge: "Result-Based"
    },
    them: {
      headline: "Scope-based billing",
      points: [
        "Hours logged, not results delivered",
        "Scope creep = endless invoices",
        "'Best effort' clauses in contracts"
      ],
      badge: "Traditional"
    }
  },
  {
    id: 2,
    icon: Clock,
    title: "Clear Timelines",
    subtitle: "Deadlines that actually mean something",
    us: {
      headline: "Fixed delivery dates",
      points: [
        "30-day MVP guarantee",
        "Daily progress updates",
        "Milestone-based payments"
      ],
      badge: "Predictable"
    },
    them: {
      headline: "Elastic timelines",
      points: [
        "'2 weeks' becomes 6 months",
        "No visibility until deadline missed",
        "Payment due regardless of delay"
      ],
      badge: "Risky"
    }
  },
  {
    id: 3,
    icon: User,
    title: "Direct Founder Access",
    subtitle: "You talk to the builder, not the salesperson",
    us: {
      headline: "Muhammad Bilal, always",
      points: [
        "Daily standups with founder",
        "Technical decisions by doer, not delegator",
        "No account manager filter"
      ],
      badge: "Personal"
    },
    them: {
      headline: "Layered communication",
      points: [
        "Sales → Account Manager → Developer",
        "Message lost in translation",
        "Founder unavailable post-sale"
      ],
      badge: "Impersonal"
    }
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Real Support, Not Tickets",
    subtitle: "When things break, we fix them. Period.",
    us: {
      headline: "Human-to-human support",
      points: [
        "WhatsApp direct line to founder",
        "4-hour critical bug response",
        "Proactive monitoring, not reactive firefighting"
      ],
      badge: "Responsive"
    },
    them: {
      headline: "Ticket queue abyss",
      points: [
        "Submit ticket, wait 48 hours",
        "Escalation hell for urgent issues",
        "Support outsourced, context lost"
      ],
      badge: "Slow"
    }
  },
  {
    id: 5,
    icon: HeartHandshake,
    title: "Partnership Mindset",
    subtitle: "Your success is our success",
    us: {
      headline: "Invested in your growth",
      points: [
        "Revenue-share options for startups",
        "Monthly strategy sessions included",
        "Introduce you to investors/clients"
      ],
      badge: "Aligned"
    },
    them: {
      headline: "Transaction complete",
      points: [
        "Invoice paid = relationship over",
        "Maintenance contracts with zero value",
        "Next client, next invoice"
      ],
      badge: "Transactional"
    }
  }
]

// Testimonial data
const testimonial = {
  quote: "I fired 2 agencies before finding CodEarn. The difference? Bilal actually answers his phone at 11PM when production is down. That's not a service, that's a partnership.",
  author: "Ahmed R.",
  role: "CTO",
  company: "TechStart Pakistan",
  metric: "99.9% uptime since switch"
}

export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [activeId, setActiveId] = useState(1)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Trust</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Why we're{" "}
            <span className="text-primary">not</span>{" "}
            like other agencies
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've been on both sides. We know what broken promises feel like. Here's our commitment to doing it differently.
          </p>
        </motion.div>

        {/* US vs THEM Comparison */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left - Navigation */}
          <div className="lg:col-span-4 space-y-3">
            {differentiators.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveId(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeId === item.id
                    ? "bg-card border-primary/30 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    activeId === item.id ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <item.icon className={`w-5 h-5 transition-colors ${
                      activeId === item.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold transition-colors ${
                      activeId === item.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right - Comparison Cards */}
          <div className="lg:col-span-8">
            {differentiators.map((item) => (
              activeId === item.id && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {/* THEM - What others do */}
                  <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {item.them.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-muted-foreground mb-4">
                      {item.them.headline}
                    </h4>
                    <ul className="space-y-3">
                      {item.them.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* US - What we do */}
                  <div className="p-6 rounded-2xl bg-card border-2 border-primary/20 shadow-lg shadow-primary/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {item.us.badge}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        {item.us.headline}
                      </h4>
                      <ul className="space-y-3">
                        {item.us.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>

        {/* Testimonial - Social Proof */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-primary/20">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
            
            <blockquote className="relative text-lg lg:text-xl text-foreground leading-relaxed mb-6 pl-8">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="flex items-center justify-between pl-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:block text-right">
                <p className="text-2xl font-bold text-primary">{testimonial.metric}</p>
                <p className="text-xs text-muted-foreground">Since partnership</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Still have doubts? Let's talk through your specific concerns.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <MessageSquare className="w-5 h-5" />
            <span>Ask Me Anything</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}