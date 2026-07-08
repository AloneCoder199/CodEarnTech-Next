"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";

export const EliteQuantumCTA = memo(() => {
  return (
    <section className="relative w-full py-20 bg-background overflow-hidden px-6">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Subtle Branding Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary/80">
            CodEarn Architecture
          </span>
        </div>

        {/* Tight, Clean Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-foreground mb-4 leading-tight">
          Ready to Scale?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-md mx-auto">
          Let’s architect your next SaaS project with precision. 15-minute audit, zero fluff.
        </p>

        {/* Perfectly Proportioned Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-all shadow-md"
        >
          <span>Book Strategy Call</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
        
        <p className="mt-4 text-[10px] text-muted-foreground/50 tracking-tight">
          No obligation. Just pure engineering insight.
        </p>

      </div>
    </section>
  );
});

EliteQuantumCTA.displayName = "EliteQuantumCTA";