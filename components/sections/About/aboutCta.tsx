"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { 
  ArrowRight,
  MessageSquare,
  Calendar,
  Zap,
  CheckCircle2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const paths = [
  {
    id: "client",
    badge: "For Businesses",
    title: "Start your project",
    description: "Have an idea? Let's turn it into reality. Free 30-minute strategy call to discuss your requirements.",
    cta: "Book Free Call",
    link: "/book-call",
    features: ["No commitment required", "Detailed proposal", "Fixed price quote"],
    color: "blue"
  },
  {
    id: "student",
    badge: "For Learners",
    title: "Join our bootcamp",
    description: "Ready to become a professional developer? Next batch starts soon. Limited seats available.",
    cta: "Apply Now",
    link: "/enroll",
    features: ["16-week program", "Job placement support", "Pay after placement"],
    color: "purple"
  }
]

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Main Container */}
        <motion.div 
          className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-muted/50 via-background to-muted/50 border border-border overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-0">
                  <Zap className="w-3 h-3 mr-2 inline" />
                  Ready to start?
                </Badge>
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Let's build something{" "}
                <span className="text-primary">great together</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Whether you need a tech partner or want to become one, we're here to help.
              </motion.p>
            </div>

            {/* Two Paths */}
            <div className="grid md:grid-cols-2 gap-6">
              {paths.map((path, i) => (
                <motion.div
                  key={path.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className="group"
                >
                  <div className="h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300">
                    {/* Badge */}
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4
                      ${path.color === 'blue' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' 
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      }
                    `}>
                      {path.badge}
                    </span>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                      {path.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {path.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {path.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 ${path.color === 'blue' ? 'text-blue-500' : 'text-purple-500'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link 
                      href={path.link}
                      className={`
                        inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-semibold transition-all duration-300
                        ${path.color === 'blue'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                        }
                      `}
                    >
                      {path.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Trust Line */}
            <motion.div 
              className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Response within 2 hours</span>
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Free consultation</span>
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No spam, ever</span>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}