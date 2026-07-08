"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Target, 
  Users, 
  Lightbulb, 
  Heart,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const identityCards = [
  {
    icon: Target,
    title: "Problem Solvers",
    description: "We don't start with code. We start with your business challenge and work backwards to the technology solution.",
    point: "Business-first approach"
  },
  {
    icon: Users,
    title: "Your Tech Partner",
    description: "Not vendors. Not contractors. We're an extension of your team, invested in your success as much as you are.",
    point: "Long-term relationships"
  },
  {
    icon: Lightbulb,
    title: "Product Thinkers",
    description: "Every feature we build answers one question: 'Does this move the business forward?' If not, we don't build it.",
    point: "Outcome-focused development"
  },
  {
    icon: Heart,
    title: "Craftsmen",
    description: "We write code we're proud of. Clean, documented, scalable—because we know someone else will inherit it someday.",
    point: "Quality without compromise"
  }
]

const differentiators = [
  "No junior developers on your project",
  "Direct access to founders",
  "Fixed prices, no scope creep",
  "Source code ownership from day one",
  "30-day post-launch support included"
]

export function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium border-primary/20">
            Who We Are
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
            A team obsessed with{" "}
            <span className="text-primary">outcomes</span>, not output
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most agencies measure success in tickets closed. We measure it in businesses 
            launched, revenue generated, and careers transformed. That's the CodEarn difference.
          </p>
        </div>

        {/* Identity Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {identityCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                    {card.point}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Separator className="my-16" />

        {/* The Difference */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Why Different */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Why teams choose us over typical agencies
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We've been on the client side. We know the frustration of missed deadlines, 
              ballooning budgets, and code that breaks when you need it most. So we built 
              CodEarn to be the partner we wished we had.
            </p>
            
            <ul className="space-y-4">
              {differentiators.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: The Promise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl blur-2xl" />
            <div className="relative p-8 rounded-2xl bg-card border border-border">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">The CodEarn Promise</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    If we don't deliver exactly what we promised, on time and on budget, 
                    you don't pay. No questions, no negotiations. That's how confident 
                    we are in our process.
                  </p>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Client Satisfaction</div>
                    <div className="text-sm text-muted-foreground">Or we fix it free</div>
                  </div>
                </div>

                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Start your project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}