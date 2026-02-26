"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  Frown, 
  AlertTriangle, 
  Ghost, 
  MessageSquareX, 
  Code2, 
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Quote,
  X
} from "lucide-react"

const painPoints = [
  {
    id: 1,
    icon: Ghost,
    headline: "The 'Ghost Town' Website Syndrome",
    subtext: "Your platform looks premium, but the inbox is silent. High-end aesthetics mean nothing if your user journey doesn't convert traffic into high-value inquiries.",
    quote: "We've been live for a quarter with zero organic conversion. It's just a digital brochure, not a business asset.",
    author: "Growth Lead, FinTech Startup",
    stat: "82% of SME websites fail to generate more than 5 qualified leads per month."
  },
  {
    id: 2,
    icon: TrendingDown,
    headline: "High Traffic, Low Intent Conversion",
    subtext: "Analytics show 1,000+ sessions, but your revenue stays stagnant. You don't have a traffic problem; you have a 'Leaky Bucket' funnel where users drop off at the critical decision stage.",
    quote: "Our bounce rate is skyrocketing. Visitors land, look around, and vanish. We're burning ad spend with zero ROI.",
    author: "E-commerce Director, Dubai",
    stat: "The average regional conversion rate is stagnant at 0.7%, while optimized ecosystems hit 3.5%."
  },
  {
    id: 3,
    icon: Code2,
    headline: "The 'Code-First, Business-Last' Gap",
    subtext: "Most developers write syntax, not solutions. If your dev team doesn't understand your business model, you end up with expensive features that no one actually uses.",
    quote: "The product was technically 'functional,' but the user flow was completely disconnected from our customer's needs.",
    author: "Product Strategist, Islamabad",
    stat: "70% of software projects fail due to a lack of business-technical alignment."
  },
  {
    id: 4,
    icon: MessageSquareX,
    headline: "Post-Launch Ghosting & Dead Support",
    subtext: "The 'Launch & Leave' agency culture. Once the final payment clears, response times go from minutes to days, leaving you stranded with critical bugs and no roadmap.",
    quote: "A critical bug hit 48 hours after launch. Our agency sent a maintenance invoice instead of a fix. Trust was broken.",
    author: "Co-Founder, SaaS Platform",
    stat: "52% of clients switch agencies within the first 6 months due to poor post-launch communication."
  }
];


export function ProblemAwarenessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activePain, setActivePain] = useState<number | null>(null)
  const [showHope, setShowHope] = useState(false)

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background transition - Dark to Light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-red-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        
        {/* Section Header - Silent Suffering */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
          >
            <Frown className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">Silent Suffering</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Sound{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
              painfully
            </span>
            {" "}familiar?
          </h2>
          
          <p className="text-xl  text-black dark:text-white">
            You're not alone. These are the unspoken truths of tech in Pakistan.
          </p>
        </motion.div>

        {/* Pain Points Grid - Interactive Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {painPoints.map((pain, idx) => (
            <motion.div
              key={pain.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + idx * 0.15 }}
              onClick={() => setActivePain(activePain === pain.id ? null : pain.id)}
              className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 ${
                activePain === pain.id 
                  ? "bg-red-950/20 border-red-500/50 shadow-2xl shadow-red-500/10" 
                  : "bg-card/50 border-border hover:border-red-500/30 hover:bg-red-950/10"
              }`}
            >
              {/* Icon */}
              <div className={`p-4 rounded-2xl w-fit mb-6 transition-colors ${
                activePain === pain.id ? "bg-red-500/20" : "bg-muted"
              }`}>
                <pain.icon className={`w-8 h-8 ${
                  activePain === pain.id ? "text-red-500" : "text-muted-foreground"
                }`} />
              </div>

              {/* Headline */}
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {pain.headline}
              </h3>
              
              {/* Subtext */}
              <p className="text-muted-foreground mb-4">
                {pain.subtext}
              </p>

              {/* Expandable Quote */}
              <AnimatePresence>
                {activePain === pain.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-red-500/20 mt-4">
                      <Quote className="w-6 h-6 text-red-500/30 mb-2" />
                      <p className="text-foreground italic mb-3 text-lg">
                        "{pain.quote}"
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        — {pain.author}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        {pain.stat}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click hint */}
              {activePain !== pain.id && (
                <p className="text-xs text-muted-foreground/60 mt-4 flex items-center gap-1">
                  <span>Click to read real story</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* The Pivot - Hope */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <motion.button
  // Button tab disabled hoga jab showHope true ho jaye
  disabled={showHope}
  onClick={() => setShowHope(true)}
  
  // Jab disabled ho to hover aur tap animation band ho jaye
  whileHover={!showHope ? { scale: 1.05 } : {}}
  whileTap={!showHope ? { scale: 0.95 } : {}}
  
  className={`
    group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all
    ${showHope 
      ? "bg-gray-400 text-gray-200 cursor-not-allowed shadow-none opacity-70" // Disabled Styles
      : "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40" // Active Styles
    }
  `}
>
  <Lightbulb className={`w-5 h-5 transition-transform ${!showHope && "group-hover:rotate-12"}`} />
  <span>{showHope ? "Discovering the solution..." : "But here's the thing..."}</span>
  {!showHope && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
</motion.button>

        </motion.div>

        {/* Hope Expansion */}
        <AnimatePresence>
          {showHope && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 overflow-hidden"
            >
              <div className="p-8 lg:p-12 rounded-3xl bg-linear-to-br from-amber-500/10 via-background to-primary/10 border-2 border-amber-500/30 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />
                
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <Lightbulb className="w-8 h-8 text-amber-500" />
                  </motion.div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    These problems are{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500">
                      common
                    </span>
                    , not{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                      permanent
                    </span>
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Every problem you just read has a solution. Not a hack. Not a shortcut. 
                    But a systematic approach that turns broken processes into revenue engines.
                  </p>

                  {/* Solution Preview */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { text: "Lead Generation Systems", sub: "That actually convert" },
                      { text: "Conversion Architecture", sub: "Traffic → Revenue" },
                      { text: "Founder-Developer Sync", sub: "Vision + Execution" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="p-4 rounded-xl bg-background/50 border border-border"
                      >
                        <p className="font-semibold text-foreground">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </motion.div>
                    ))}
                  </div>

                  <Link href="/book-call">
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 cursor-pointer"
  >
    <span>See How We Fix This</span>
    <ArrowRight className="w-5 h-5" />
  </motion.button>
</Link>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && showHope ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">100+ founders</span> faced these exact problems. 
            Now they're scaling. {" "}
            <button className="text-primary hover:underline font-medium">
              Read their stories →
            </button>
          </p>
        </motion.div>

      </div>
    </section>
  )
}