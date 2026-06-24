"use client";

import { memo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Globe, 
  Layers,
  CheckCircle2,
  XCircle
} from "lucide-react";

const BOTTLENECKS = [
  {
    id: 1,
    tag: "Operations",
    problem: "Manual Operations & Workflow Bottlenecks",
    solution: "Automate Your Entire Business Workflow",
    description: "Stop wasting thousands of engineering and operational hours on repetitive tasks. We build hyper-automated triggers that connect your entire system seamlessly.",
    icon: Cpu,
  },
  {
    id: 2,
    tag: "Revenue",
    problem: "Low Sales & Fragmented Conversions",
    solution: "High-Converting Lead Generation Systems",
    description: "Turn cold traffic into predictable, revenue-generating pipelines. Our architectures integrate optimized data tracking, behavior triggers, and premium user flows.",
    icon: TrendingUp,
  },
  {
    id: 3,
    tag: "Authority",
    problem: "No Premium Digital Presence & Footprint",
    solution: "Professional Digital Infrastructure",
    description: "Establish instant industry authority. We engineer custom web ecosystems that are blindingly fast, SEO-optimized, and visually breathtaking.",
    icon: Globe,
  },
  {
    id: 4,
    tag: "Infrastructure",
    problem: "System Scaling Errors & Database Lag",
    solution: "Scalable Custom SaaS Architecture",
    description: "Prepare your application for millions of real-time concurrent requests. Decoupled edge servers, global distribution, and clean, modular database designs.",
    icon: Layers,
  },
];

export const ProblemsWeSolve = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll matrix for desktop tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest >= 0.25 && latest < 0.5) setActiveIndex(1);
    else if (latest >= 0.5 && latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    /* Desktop par track h-[300vh] rahega pinning ke liye, 
      lekin mobile par h-auto ho jayega taake fluidly scroll ho sake.
    */
    <div ref={containerRef} className="relative h-auto md:h-[280vh] bg-background w-full">
      
      {/* STICKY CONTAINER: Desktop par screens lock karega, mobile par normal block rahega */}
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex items-center py-16 md:py-0 overflow-hidden">
        
        {/* Ambient Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] bg-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Clean Editorial Content Header */}
            <div className="col-span-1 md:col-span-5 flex flex-col items-start w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  Transformation Matrix
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-5">
                Problems We <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/70 font-semibold">
                  Solve Conceptually.
                </span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
                We replace broken digital footprints and operational bottlenecks with production-ready, ultra-scalable ecosystems.
              </p>

              {/* Dynamic Timeline Indicator - Hidden on Mobile for clean space */}
              <div className="hidden md:flex relative items-center gap-4 w-full max-w-[240px] pt-5 border-t border-primary/10">
                <div className="absolute left-[7px] top-5 bottom-0 w-[2px] bg-primary/[0.06] rounded-full" />
                <motion.div 
                  className="absolute left-[7px] top-5 w-[2px] bg-primary rounded-full origin-top"
                  style={{ scaleY, height: "calc(100% - 20px)" }}
                />
                <div className="flex flex-col gap-3.5 pl-6 w-full">
                  {BOTTLENECKS.map((item, idx) => (
                    <div 
                      key={item.id}
                      className={`text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                        idx === activeIndex ? "text-primary translate-x-1" : "text-muted-foreground/30"
                      }`}
                    >
                      0{idx + 1} — {item.tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Absolute Stack Window (Desktop) & Clean Responsive List (Mobile) */}
            <div className="col-span-1 md:col-span-7 w-full relative">
              
              {/* DESKTOP VIEW: Elite In-Place Crossfade Animation Stack */}
              <div className="hidden md:relative md:block w-full h-[360px] lg:h-[340px]">
                {BOTTLENECKS.map((item, index) => {
                  const isActive = index === activeIndex;
                  const IconComponent = item.icon;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : -15,
                        scale: isActive ? 1 : 0.98,
                        pointerEvents: isActive ? "auto" : "none"
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 p-8 lg:p-10 rounded-[24px] border border-primary/10 bg-background shadow-[0_30px_70px_-30px_rgba(var(--color-primary),0.06)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-primary">
                            {item.tag} System
                          </span>
                          <div className="p-2.5 rounded-xl bg-primary/[0.04] border border-primary/10 text-primary">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Friction Line */}
                        <div className="flex items-center gap-2 mb-2.5 opacity-25 blur-[0.2px]">
                          <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-xs font-medium tracking-wide text-muted-foreground line-through decoration-muted-foreground">
                            {item.problem}
                          </span>
                        </div>

                        {/* Resolution Title */}
                        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>{item.solution}</span>
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-4 text-primary">
                        <span className="text-[10px] font-bold tracking-wider uppercase">Deploy Architecture</span>
                        <ArrowRight className="w-3 h-3 animate-pulse" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* MOBILE VIEW: Completely fluid vertical list with clean padding and no overflow */}
              <div className="flex flex-col gap-5 md:hidden w-full">
                {BOTTLENECKS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className="p-6 rounded-[20px] border border-primary/10 bg-background/50 backdrop-blur-sm shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-primary">
                            {item.tag}
                          </span>
                          <div className="p-2 rounded-lg bg-primary/[0.04] text-primary">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2 opacity-40">
                          <span className="text-xs text-muted-foreground line-through">{item.problem}</span>
                        </div>

                        <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
                          {item.solution}
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

ProblemsWeSolve.displayName = "ProblemsWeSolve";