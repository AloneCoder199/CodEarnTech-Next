"use client";

import { memo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Terminal, 
  GitFork, 
  Layers, 
  Compass, 
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  ArrowUpRight
} from "lucide-react";

// --- 6 HIGH-VALUE ACADEMY CARDS ---
const ACADEMY_STAGES = [
  {
    id: 1,
    tag: "PHASE_01 // RUNTIME_CORE",
    title: "Production-Grade Infrastructure",
    description: "No basic todo-apps or superficial clones. From week one, you will commit clean code directly into live, edge-rendered SaaS repositories and manage complex multi-tenant backend architectures.",
    icon: Code2,
  },
  {
    id: 2,
    tag: "PHASE_02 // COMPUTE_NODES",
    title: "Advanced Distributed Architecture",
    description: "Master high-load engineering systems. You will construct highly optimized database schema architectures, implement multi-node decoupling, and deploy globally fast Cloudflare Edge workers.",
    icon: Cpu,
  },
  {
    id: 3,
    tag: "PHASE_03 // PRODUCTION_VETTING",
    title: "CodEarn Studio Integration Path",
    description: "The top 10% of engineering performers bypass standard hiring queues entirely. You transition directly into internal client-facing development sprints at CodEarn as a paid developer.",
    icon: GitFork,
  },
  {
    id: 4,
    tag: "PHASE_04 // ECOSYSTEM_CONTRIBUTION",
    title: "Production Open Source Sprints",
    description: "Build undeniable global authority. Our senior engineers guide you to contribute feature extensions and optimization pull-requests directly into mainstream open-source frameworks.",
    icon: Terminal,
  },
  {
    id: 5,
    tag: "PHASE_05 // STRUCTURAL_LEDGER",
    title: "High-Authority Portfolio Ledger",
    description: "We re-architect your entire digital identity. We teach you to document system telemetry, architectural trade-offs, and data migrations so your profile becomes irresistible to engineering panels.",
    icon: Layers,
  },
  {
    id: 6,
    tag: "PHASE_06 // GLOBAL_ROUTING",
    title: "High-Ticket Placement Engineering",
    description: "Complete resume refactoring, international contract tax optimization, high-intensity technical mock interviews, and direct routing pipelines to premium remote setups across Europe and Silicon Valley.",
    icon: Compass,
  },
];

export const AcademyUniversalDeck = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Universal Scroll Pinning track height (Works on both Desktop & Mobile perfectly)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth tracking event mapping for 6 cards
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.16) setActiveIndex(0);
    else if (latest >= 0.16 && latest < 0.33) setActiveIndex(1);
    else if (latest >= 0.33 && latest < 0.50) setActiveIndex(2);
    else if (latest >= 0.50 && latest < 0.66) setActiveIndex(3);
    else if (latest >= 0.66 && latest < 0.83) setActiveIndex(4);
    else setActiveIndex(5);
  });

  return (
    /* Outer Scroll Headroom - Universal height validation */
    <div ref={containerRef} className="relative h-[550vh] bg-background w-full">
      
      {/* Sticky Gate Viewport - Keeps screen frozen across all devices until sequence ends */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden py-4 sm:py-0">
        
        {/* Soft Background Mesh Vector */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[45vh] bg-primary/[0.012] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10 h-[90vh] sm:h-auto flex flex-col justify-center">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center h-full md:h-auto">
            
            {/* ------------------------------------------------------------- */}
            {/* UNIFIED LEFT/TOP ANCHOR BLOCK: Auto-scales cleanly            */}
            {/* ------------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-5 flex flex-col items-start text-left w-full shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-2 sm:mb-4">
                <Globe className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-primary uppercase">
                  Vetted Incubation Engine
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-2 sm:mb-4">
                Become Industry <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/50 font-semibold">
                  Expert.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mb-4 sm:mb-6 hidden sm:block">
                We eliminate traditional academia noise. CodEarn Academy operates as a live production lab inside a running software house, explicitly engineered to transform builders into high-ticket remote engineers.
              </p>

              {/* Apple Mirror Finish Matte Button (Responsive Sizing) */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-foreground text-background text-[11px] sm:text-xs font-bold tracking-wide shadow-md overflow-hidden transition-all duration-300 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <span>Explore Academy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Step Segment Telemetry Tracker Line (Adaptive positions for Mobile) */}
              <div className="flex items-center gap-4 mt-4 sm:mt-12 md:mt-16 pt-3 sm:pt-5 border-t border-primary/10 w-full max-w-full sm:max-w-[260px]">
                <div className="flex gap-1 w-full">
                  {ACADEMY_STAGES.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-[2px] sm:h-[3px] rounded-full transition-all duration-500 ${
                        idx <= activeIndex ? "bg-primary flex-1" : "bg-primary/[0.08] w-1.5 sm:w-2"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[8px] sm:text-[9px] text-muted-foreground/40 shrink-0">
                  0{activeIndex + 1} / 06
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* UNIFIED RIGHT/BOTTOM COLUMN: 3D Overlapping Percentage Deck    */}
            {/* ------------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-7 w-full relative flex-1 md:flex-none h-[50vh] sm:h-[360px] lg:h-[320px] mt-2 sm:mt-0">
              
              {ACADEMY_STAGES.map((stage, index) => {
                const IconComponent = stage.icon;
                
                // Pure state mathematics for deck layering positioning
                const isPast = index < activeIndex;
                const isCurrent = index === activeIndex;
                const isFuture = index > activeIndex;

                return (
                  <motion.div
                    key={stage.id}
                    initial={false}
                    animate={{
                      /* Percentage values completely ensure safe fluid rendering across all screens */
                      y: isFuture ? "130%" : "0%",
                      scale: isPast ? 1 - (activeIndex - index) * 0.035 : 1,
                      opacity: isFuture ? 0 : isPast ? 0.4 - (activeIndex - index) * 0.08 : 1,
                      z: isPast ? -index : index,
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 22 }}
                    style={{ 
                      pointerEvents: isCurrent ? "auto" : "none",
                      transformOrigin: "top center"
                    }}
                    className="absolute inset-0 p-5 sm:p-8 lg:p-10 rounded-[22px] sm:rounded-[28px] border border-primary/10 bg-background shadow-[0_30px_70px_-30px_rgba(var(--color-primary),0.08)] flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Internal Smooth Inner Highlight Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] to-transparent pointer-events-none" />

                    <div>
                      {/* Card Identity Top Row */}
                      <div className="flex items-center justify-between mb-3 sm:mb-6">
                        <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-primary">
                          // {stage.tag}
                        </span>
                        <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-primary/10 bg-primary/[0.03] text-primary transition-all duration-300">
                          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* Card Content Header */}
                      <h3 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-1.5 sm:mb-3">
                        {stage.title}
                      </h3>
                      
                      {/* Card Scroll Body Description */}
                      <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground/90 leading-relaxed font-normal">
                        {stage.description}
                      </p>
                    </div>

                    {/* Operational Footer Details */}
                    <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-primary/[0.04] text-[8px] font-mono text-muted-foreground/30">
                      <span>INCUBATION PROTOCOL SECURED</span>
                      <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary/40" />
                    </div>
                  </motion.div>
                );
              })}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

AcademyUniversalDeck.displayName = "AcademyUniversalDeck";