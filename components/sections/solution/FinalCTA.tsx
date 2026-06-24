"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Soft gradient background instead of heavy black block */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        
        {/* Clean, airy heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-6">
          Ready to scale your architecture?
        </h2>
        
        {/* Soft, readable subtext */}
        <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto leading-relaxed">
          Let’s turn your requirements into a production-ready reality. Engineering precision, delivered.
        </p>

        {/* Buttons - Apple "Button-Style" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm transition-all hover:opacity-90"
          >
            Book Strategy Call <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-background text-foreground font-medium text-sm transition-all hover:bg-secondary"
          >
            View Case Studies
          </motion.button>
        </div>

        {/* Subtle footer */}
        <p className="mt-10 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-semibold">
          No obligation. Engineering-led consultation.
        </p>
      </div>
    </section>
  );
}