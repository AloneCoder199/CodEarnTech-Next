"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  TrendingUp, 
  XCircle, 
  CheckCircle2, 
  Layers,
  ArrowUpRight,
  Database,
  UtensilsCrossed,
  ShoppingBag
} from "lucide-react";

// --- CASE STUDIES DATA LAYER (PURE VALUE TRANSFORMATION) ---
const CASE_STUDIES = [
  {
    id: "01",
    tabLabel: "FoodTech Scaling",
    client: "High-Volume Hospitality Chain",
    problem: "Losing 35% of potential digital revenue due to fragmented third-party aggregators, phone call backlogs, and critical checkout drop-offs during peak hours.",
    solution: "Engineered a custom, direct-to-consumer edge-rendered ordering engine with instant checkout pipelines and real-time kitchen display webhooks.",
    result: "+40% Net Orders",
    resultSub: "Expansion within 60 days of deployment",
    icon: UtensilsCrossed,
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "02",
    tabLabel: "E-Commerce Velocity",
    client: "Global Direct-to-Consumer Brand",
    problem: "Severe database lag and overselling errors caused by delayed inventory synchronization across multi-channel storefronts and regional warehouses.",
    solution: "Deployed an event-driven serverless synchronization matrix utilizing global edge workers and lightning-fast Redis cache layers.",
    result: "14x Sync Speed",
    resultSub: "Zero inventory synchronization mismatch errors",
    icon: ShoppingBag,
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    id: "03",
    tabLabel: "SaaS Database Optimization",
    client: "B2B Analytics Enterprise",
    problem: "Enterprise client churn increasing due to slow, unoptimized analytical queries taking up to 8.4 seconds to generate real-time user reports.",
    solution: "Re-architected the legacy database layer into partitioned PostgreSQL structures with automated read-replicas and isolated dynamic indexing nodes.",
    result: "<32ms Queries",
    resultSub: "99.2% reduction in core analytical report latency",
    icon: Database,
    accentColor: "from-purple-500 to-pink-600"
  }
];

export const CaseStudiesMatrix = memo(() => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full py-20 sm:py-32 bg-background overflow-hidden border-b border-primary/[0.02]">
      
      {/* Background Subtle Gradient Aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vw] h-[50vh] bg-primary/[0.015] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              Proven Engineering Performance
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Value Transformation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground/50 font-normal">
              In Black And White.
            </span>
          </h2>
        </div>

        {/* INTERACTIVE CONTROLS: Apple Style Tabs Selector (Desktop) */}
        <div className="hidden md:flex items-center justify-start gap-2 border-b border-primary/[0.06] mb-12 max-w-2xl">
          {CASE_STUDIES.map((study, idx) => {
            const isSelected = idx === activeTab;
            return (
              <button
                key={study.id}
                onClick={() => setActiveTab(idx)}
                className="relative pb-4 px-4 text-xs font-semibold tracking-wide outline-none transition-colors duration-300"
              >
                <span className={isSelected ? "text-primary font-bold" : "text-muted-foreground/40 hover:text-muted-foreground/70"}>
                  {study.tabLabel}
                </span>
                
                {/* Underline Slider Track */}
                {isSelected && (
                  <motion.div 
                    layoutId="caseStudyActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP VIEWPORT: Immersive Linear Pipeline Layout           */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block w-full min-h-[380px] relative">
          <AnimatePresence mode="wait">
            {CASE_STUDIES.map((study, index) => {
              if (index !== activeTab) return null;
              const IconComponent = study.icon;

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full grid grid-cols-12 gap-8 items-center"
                >
                  
                  {/* STEP 1: PROBLEM BOX (Left Side) */}
                  <div className="col-span-4 p-7 rounded-[22px] border border-primary/5 bg-background shadow-sm relative flex flex-col justify-between h-[320px]">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground/40 mb-4">
                        <XCircle className="w-4 h-4 text-red-500/60" />
                        <span className="text-[10px] font-mono tracking-widest font-bold uppercase">THE BOTTLENECK</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                        {study.problem}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/20 font-bold">STAGE_01</span>
                  </div>

                  {/* INTERACTIVE PIPELINE TRACK (The Connector Line) */}
                  <div className="col-span-1 flex items-center justify-center relative h-full">
                    <div className="w-full h-[1px] bg-primary/10 absolute left-0 right-0 z-0" />
                    <div className="p-2 rounded-full bg-primary/[0.03] border border-primary/10 relative z-10 bg-background text-primary">
                      <ArrowRight className="w-3 h-3 animate-pulse" />
                    </div>
                  </div>

                  {/* STEP 2: SOLUTION BOX (Middle) */}
                  <div className="col-span-4 p-7 rounded-[22px] border border-primary/10 bg-background shadow-md relative flex flex-col justify-between h-[320px]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-[10px] font-mono tracking-widest font-bold uppercase">DEPLOYED ARCHITECTURE</span>
                        </div>
                        <IconComponent className="w-4 h-4 text-primary/40" />
                      </div>
                      <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono text-muted-foreground/30">
                      <span>CLIENT: {study.client.toUpperCase()}</span>
                      <span className="font-bold">STAGE_02</span>
                    </div>
                  </div>

                  {/* INTERACTIVE PIPELINE TRACK (The Connector Line) */}
                  <div className="col-span-1 flex items-center justify-center relative h-full">
                    <div className="w-full h-[1px] bg-primary/10 absolute left-0 right-0 z-0" />
                    <div className="p-2 rounded-full bg-primary/[0.03] border border-primary/10 relative z-10 bg-background text-primary">
                      <ArrowRight className="w-3 h-3 animate-pulse" />
                    </div>
                  </div>

                  {/* STEP 3: RESULT BOX - METRIC HERO (Right Side) */}
                  <div className="col-span-2 p-6 rounded-[22px] border border-primary/10 bg-gradient-to-b from-primary/[0.02] to-primary/[0.04] shadow-xl relative flex flex-col justify-between h-[320px] overflow-hidden text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--color-primary),0.03),transparent_60%)]" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-primary mb-2">PROVEN ROI IMPACT</span>
                      <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 leading-none">
                        {study.result}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-normal max-w-[130px] mx-auto">
                        {study.resultSub}
                      </p>
                    </div>
                    
                    <div className="relative z-10 text-[9px] font-mono text-primary font-bold tracking-wider uppercase flex items-center justify-center gap-0.5">
                      <span>Verified</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>


        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEWPORT: Zero-Clipping Fluid Vertical Pipelines      */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col gap-12 md:hidden w-full">
          {CASE_STUDIES.map((study) => {
            const IconComponent = study.icon;
            return (
              <div key={study.id} className="w-full flex flex-col gap-4 relative">
                
                {/* Meta Client Title */}
                <div className="flex items-center gap-2 px-1">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold tracking-tight text-foreground">{study.tabLabel} // {study.client}</span>
                </div>

                {/* Vertical Connected Chain Stack */}
                <div className="flex flex-col gap-3 w-full pl-3 border-l-2 border-primary/10 relative">
                  
                  {/* Mobile Problem Block */}
                  <div className="p-5 rounded-xl border border-primary/5 bg-background">
                    <span className="text-[9px] font-mono text-red-500/70 font-bold block mb-1">THE BOTTLENECK</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{study.problem}</p>
                  </div>

                  {/* Mobile Solution Block */}
                  <div className="p-5 rounded-xl border border-primary/10 bg-background shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-mono text-primary font-bold">THE SOLUTION ARCHITECTURE</span>
                      <IconComponent className="w-3 h-3 text-primary/40" />
                    </div>
                    <p className="text-xs text-foreground font-medium leading-relaxed">{study.solution}</p>
                  </div>

                  {/* Mobile Result Block */}
                  <div className="p-5 rounded-xl border border-primary/10 bg-primary/[0.02] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono text-primary font-bold block mb-0.5">VERIFIED ROI</span>
                      <h4 className="text-xl font-black text-foreground">{study.result}</h4>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{study.resultSub}</p>
                    </div>
                    <div className="p-2 rounded-full bg-background border border-primary/10 text-primary">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

CaseStudiesMatrix.displayName = "CaseStudiesMatrix";