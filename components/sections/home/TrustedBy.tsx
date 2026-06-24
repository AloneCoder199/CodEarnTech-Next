"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

// --- PLACEHOLDER LOGOS DATA (Aap yahan apne real image paths/SVGs daal dena) ---
const LOGO_CATEGORIES = [
  { id: 1, name: "Alpha Startup", type: "Startup" },
  { id: 2, name: "Apex Local Biz", type: "Local Business" },
  { id: 3, name: "Nexus Enterprise", type: "Client" },
  { id: 4, name: "Future Tech Lab", type: "Partner" },
  { id: 5, name: "Vortex SaaS", type: "Startup" },
  { id: 6, name: "Quantum Systems", type: "Client" },
];

// Double the array for seamless infinite looping animation
const INFINITE_LOGOS = [...LOGO_CATEGORIES, ...LOGO_CATEGORIES];

export const TrustedBy = memo(() => {
  return (
    <section className="relative w-full py-16 bg-background overflow-hidden border-b border-primary/[0.06]">
      {/* Subtle Background Glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[20vh] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Apple Style Minimalist Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/[0.02] border border-primary/10 mb-3"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Instant Trust & Credibility
            </span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground/80 max-w-md"
          >
            Powering fast-growing startups, local giants, and future visionaries.
          </motion.p>
        </div>

        {/* Cinematic Marquee Track Container with Left/Right Edge Fade Masks */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Elite Edge Blending (Left Fade & Right Fade) */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Scrolling Window */}
          <div className="w-full overflow-hidden flex whitespace-nowrap py-4">
            
            <motion.div
              className="flex gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 25, // Velocity control (Slower = more elegant)
                repeat: Infinity,
              }}
              // Hover karne par marquee smoothly slow down ya pause ho jaye gi
              whileHover={{ animationPlayState: "paused" }}
            >
              {INFINITE_LOGOS.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="group relative flex items-center justify-center h-14 w-36 sm:w-44 px-4 rounded-xl border border-primary/[0.03] bg-primary/[0.01] dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                  style={{
                    // Active soft blue glow trigger on hover
                    boxShadow: "group-hover:0 0 25px rgba(var(--color-primary), 0.05)",
                  }}
                >
                  {/* Subtle Indicator Tag inside logo card for developer/client view */}
                  <span className="absolute top-1 right-2 text-[8px] font-mono tracking-tighter opacity-0 group-hover:opacity-40 transition-opacity text-primary">
                    {logo.type}
                  </span>

                  {/* LOGO PLACEHOLDER WRAPPER */}
                  <div className="text-sm font-semibold tracking-tight text-muted-foreground/40 group-hover:text-primary/80 transition-all duration-300 transform group-hover:scale-[1.03]">
                    {/* Janii g, yahan apna <img src="..." /> ya SVG direct replace kar lena */}
                    {logo.name}
                  </div>

                  {/* Absolute Bottom Soft Line Accent on Hover */}
                  <div className="absolute bottom-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />
                </div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
});

TrustedBy.displayName = "TrustedBy";