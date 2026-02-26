"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { 
  ArrowRight,
  Play,
  Quote,
  MapPin,
  Calendar,
  Users,
  Rocket
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutHero() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden pt-20"
    >
      {/* Asymmetric Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-muted/30 skew-x-12 transform origin-top-right" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 to-transparent" />
      </div>

      {/* Floating Elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-32 right-20 w-64 h-64 rounded-full bg-linear-to-br from-blue-500/10 to-purple-500/10 blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="min-h-[calc(100vh-5rem)] flex items-center">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-12">
            
            {/* Left Content - 7 columns */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Location Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Samundri, Pakistan</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>Since 2020</span>
              </div>

              {/* Main Headline - Broken for Impact */}
              <div className="space-y-2">
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  We're not
                </motion.h1>
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] text-muted-foreground/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  just another
                </motion.h1>
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-primary">software house.</span>
                </motion.h1>
              </div>

              {/* Subheadline with Strong Hook */}
              <motion.p 
                className="text-xl text-muted-foreground max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                We're the team that turns your "impossible" into shipped products. 
                While others write code, we build businesses. From a small room in 
                Pakistan to powering startups worldwide.
              </motion.p>

              {/* Trust Indicators */}
              <motion.div 
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-white">
                      {String.fromCharCode(64+i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">50+ founders</span>
                  <span className="text-muted-foreground"> trusted us with their vision</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <Button size="lg" asChild className="rounded-full px-8 gap-2 group">
                  <Link href="/contact">
                    Let's Build Together
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild className="rounded-full gap-2">
                  <Link href="/founderstory">
                    <Play className="w-4 h-4" />
                    Founder Story
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - 5 columns - Visual Story */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main Visual Card */}
              <div className="relative">
                {/* Background Card */}
                <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />
                
                {/* Content Card */}
                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                  
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-primary/20 mb-6" />
                  
                  {/* The Hook Quote */}
                  <blockquote className="text-2xl font-medium text-foreground leading-relaxed mb-6">
                    "We don't just deliver projects. 
                    We deliver{' '}
                    <span className="text-primary">the confidence</span>{' '}
                    that your idea will work."
                  </blockquote>
                  
                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      C
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">CodEarn Tech Team</div>
                      <div className="text-sm text-muted-foreground">Founders & Engineers</div>
                    </div>
                  </div>

                  {/* Stats Row Inside Card */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">50+</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center border-x border-border">
                      <div className="text-2xl font-bold text-foreground">100+</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">4+</div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Rocket className="w-4 h-4" />
                  <span className="text-sm font-semibold">Available for projects</span>
                </motion.div>

                {/* Side Badge */}
                <div className="absolute -top-4 -right-4 bg-card border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">15+ Team Members</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-linear-to-b from-border to-transparent" />
        </motion.div>

      </div>
    </section>
  )
}