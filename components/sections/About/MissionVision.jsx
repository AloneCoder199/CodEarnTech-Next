"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { 
  Target, 
  Eye, 
  Rocket,
  Heart,
  Globe,
  Zap,
  ArrowRight,
  Quote
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const coreBeliefs = [
  {
    icon: Heart,
    title: "People First",
    description: "Technology serves people, not the other way around. Every line of code we write solves a real problem for real humans."
  },
  {
    icon: Zap,
    title: "Excellence Always",
    description: "Good enough isn't good enough. We obsess over quality, performance, and user experience in everything we build."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "From Pakistan to the world. We prove that world-class engineering talent exists right here at home."
  }
]

export function MissionVision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/20">
            Our Purpose
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Why we wake up every morning
          </h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-20">
          
          {/* Mission */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative h-full p-8 rounded-2xl bg-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                Our Mission
              </h3>
              <h4 className="text-2xl font-bold text-foreground mb-4">
                Democratize access to world-class technology
              </h4>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                We exist to bridge the gap between ambitious ideas and technical execution. 
                Whether you're a startup with a dream or a student with potential, we provide 
                the tools, training, and support to turn possibility into reality.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Build software that drives real business growth",
                  "Train developers who can compete globally",
                  "Make enterprise-grade tech accessible to everyone"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Rocket className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative h-full p-8 rounded-2xl bg-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                Our Vision
              </h3>
              <h4 className="text-2xl font-bold text-foreground mb-4">
                Pakistan's most trusted technology partner by 2030
              </h4>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                We see a future where "Made in Pakistan" is synonymous with quality, innovation, 
                and reliability. Where our engineers build products used by millions worldwide, 
                and our training programs set the global standard for developer education.
              </p>
              
              <ul className="space-y-3">
                {[
                  "1000+ successful projects delivered",
                  "10,000+ engineers trained and placed",
                  "Recognized as top tech employer in South Asia"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        <Separator className="my-16" />

        {/* Core Beliefs */}
        <motion.div 
          className="mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            What we believe
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {coreBeliefs.map((belief, i) => (
              <motion.div
                key={belief.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <belief.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{belief.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {belief.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative p-8 lg:p-12 rounded-3xl bg-primary/5 border border-primary/10 text-center"
        >
          <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
          <blockquote className="text-xl lg:text-2xl font-medium text-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
            "We don't measure success by lines of code shipped. We measure it by businesses 
            launched, careers transformed, and problems solved."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              CT
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground text-sm">CodEarn Team</div>
              <div className="text-xs text-muted-foreground">Founders & Engineers</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to be part of this journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Work With Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}