"use client";

import { memo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Headset, 
  Compass, 
  BarChart3,
  ArrowUpRight
} from "lucide-react";

// --- WHY CODEARN DYNAMIC DATA MATRIX ---
const PILLARS = [
  {
    id: 1,
    category: "ENGINEERING",
    title: "High-Velocity Deployment",
    description: "We bypass standard agency bureaucracy. Our optimized sprint frameworks ensure production-ready code is shipped rapidly without ever compromising structural integrity.",
    icon: Zap,
  },
  {
    id: 2,
    category: "ENGINEERING",
    title: "Cloud-Native Scalability",
    description: "Architectures built for extreme loads. We decouple application layers using global edge workers and modular database paradigms prepared for infinite scaling.",
    icon: Cpu,
  },
  {
    id: 3,
    category: "ENGINEERING",
    title: "Zero-Trust Security Matrix",
    description: "Ironclad protection from the ground up. We enforce row-level security parameters, rigorous data isolation protocols, and cryptographic token verification.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    category: "EXPERIENCE",
    title: "Direct Engineering Support",
    description: "No middle-men or non-technical account managers. You get direct, real-time synchronous channels with the core engineers building your infrastructure.",
    icon: Headset,
  },
  {
    id: 5,
    category: "EXPERIENCE",
    title: "Cinematic Human Interfaces",
    description: "We don't just design layouts; we craft digital user systems. Buttery smooth micro-interactions engineered explicitly to maximize user retention and brand authority.",
    icon: Compass,
  },
  {
    id: 6,
    category: "EXPERIENCE",
    title: "ROI-Driven Acceleration",
    description: "Every line of code we execute is benchmarked against conversion metrics, system latency overheads, and your overall business growth trajectory.",
    icon: BarChart3,
  },
];

export const WhyCodEarnPinned = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Desktop Track Height Map (h-[450vh] gives plenty of smooth scrolling headroom for 6 items)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth tracker line linked to scroll velocity
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  // 2. Real-Time Range Breakdown Matrix for 6 Steps
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.16) {
      setActiveIndex(0);
    } else if (latest >= 0.16 && latest < 0.33) {
      setActiveIndex(1);
    } else if (latest >= 0.33 && latest < 0.50) {
      setActiveIndex(2);
    } else if (latest >= 0.50 && latest < 0.66) {
      setActiveIndex(3);
    } else if (latest >= 0.66 && latest < 0.83) {
      setActiveIndex(4);
    } else {
      setActiveIndex(5);
    }
  });

  return (
    /* Outer Box Track - Desktop handles the lock pinning track duration */
    <div ref={containerRef} className="relative h-auto md:h-[450vh] bg-background w-full">
      
      {/* Sticky Viewport Gate - Freezes screen state during user interactions */}
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex items-center py-20 md:py-0 overflow-hidden">
        
        {/* Soft Core Mesh Aura Vector */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] bg-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Fixed Content Header Anchor + Progressive Matrix Tracker */}
            <div className="col-span-1 md:col-span-5 flex flex-col items-start w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  Core Differentiation Matrix
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
                Engineered Differently. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/90 to-primary/60 font-semibold">
                  Built Explicitly For Scale.
                </span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-8">
                We dismantle generic agency paradigms. CodEarn functions as an elite tactical extension of your architecture to maximize system performance.
              </p>

              {/* 6-Step Visual Timeline Progress Rail (Desktop Only) */}
              <div className="hidden md:flex relative items-center gap-4 w-full max-w-[240px] pt-5 border-t border-primary/10">
                <div className="absolute left-[7px] top-5 bottom-0 w-[2px] bg-primary/[0.06] rounded-full" />
                <motion.div 
                  className="absolute left-[7px] top-5 w-[2px] bg-primary rounded-full origin-top"
                  style={{ scaleY, height: "calc(100% - 20px)" }}
                />
                <div className="flex flex-col gap-3 pl-6 w-full">
                  {PILLARS.map((item, idx) => (
                    <div 
                      key={item.id}
                      className={`text-[10px] font-mono font-bold tracking-wider transition-all duration-300 ${
                        idx === activeIndex ? "text-primary translate-x-1" : "text-muted-foreground/20"
                      }`}
                    >
                      0{item.id} — {item.title.split(" ")[0].toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Pinned In-Place Crossfade Container (Desktop) / Clean Flow Stack (Mobile) */}
            <div className="col-span-1 md:col-span-7 w-full relative">
              
              {/* DESKTOP BOX: Standardized Dimension Viewport to completely prevent screen overflow */}
              <div className="hidden md:relative md:block w-full h-[340px] lg:h-[300px]">
                <AnimatePresence mode="wait">
                  {PILLARS.map((item, index) => {
                    if (index !== activeIndex) return null;
                    const IconComponent = item.icon;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.97, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -12 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 p-8 lg:p-10 rounded-[24px] border border-primary/10 bg-background shadow-[0_35px_70px_-30px_rgba(var(--color-primary),0.06)] flex flex-col justify-between overflow-hidden"
                      >
                        {/* Interactive Aura Matrix Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-primary">
                              // {item.category} // SYSTEM_PILLAR_0{item.id}
                            </span>
                            <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/[0.04] text-primary">
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>

                          <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-3">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>

                        <div className="relative z-10 flex items-center gap-1.5 mt-4 text-primary">
                          <span className="text-[10px] font-bold tracking-wider uppercase">Operational Logic Verified</span>
                          <ArrowUpRight className="w-3 h-3 text-primary" />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* MOBILE VIEWPORT: Fluid Stream Layout to handle layout bounds safely */}
              <div className="flex flex-col gap-5 md:hidden w-full">
                {PILLARS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className="p-6 rounded-[22px] border border-primary/10 bg-background/60 backdrop-blur-sm flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-primary">
                          0{item.id} // {item.category}
                        </span>
                        <div className="p-2 rounded-lg bg-primary/[0.04] text-primary">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

WhyCodEarnPinned.displayName = "WhyCodEarnPinned";