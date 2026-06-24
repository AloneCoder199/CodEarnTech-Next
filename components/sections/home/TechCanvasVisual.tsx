"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Shield, 
  Zap, 
  Terminal, 
  Activity,
  Maximize2
} from "lucide-react";

// --- SOLUTION DATA LAYER (PURE VALUE & SOLUTION LANGUAGE) ---
const SOLUTIONS = [
  {
    id: "01",
    label: "SaaS Infrastructure",
    actionTitle: "Multi-Tenant Subscription Engines",
    description: "We architect decoupled multi-tenant pipelines featuring ironclad data isolation, dynamic database pooling, and global subscription synchronization layer engineered for infinite user scaling.",
    metrics: "99.99% Fault Tolerance // <45ms Core Isolation Latency",
    features: ["Dynamic Tenant Provisioning", "Row-Level Security (RLS)", "Stripe Matrix Integration"],
    visualType: "saas"
  },
  {
    id: "02",
    label: "Business Automation",
    actionTitle: "Autonomous Workflow Architectures",
    description: "Eliminate expensive operational friction. We model and execute automated business logic engines that intercept, process, and synchronize legacy cross-platform data triggers without human oversight.",
    metrics: "Zero Manual Overhead // 14x Operational Velocity",
    features: ["Event-Driven Webhooks", "Fail-Safe Retry Queues", "Real-Time State Machines"],
    visualType: "automation"
  },
  {
    id: "03",
    label: "Web Platforms",
    actionTitle: "High-Authority Digital Ecosystems",
    description: "Web deployment engineered as high-velocity conversion pipelines. Blindingly fast edge-rendered architectures optimized for deep SEO dominance, semantic structure, and cinematic layouts.",
    metrics: "100% Core Web Vitals Score // Optimized Conversion Matrix",
    features: ["Next.js Edge Optimization", "Server-Side Generation (ISR)", "Global Content Caching"],
    visualType: "web"
  },
  {
    id: "04",
    label: "Mobile Applications",
    actionTitle: "Offline-First Cross-Platform Systems",
    description: "Retain high-value users across iOS and Android ecosystems. We build fluid, native-performing applications optimized with offline sync states, background workers, and low-footprint battery algorithms.",
    metrics: "Native 60FPS Fluid Rendering // Absolute Sync State Consistency",
    features: ["Expo & React Native Architecture", "Local SQLite Caching Engine", "Micro-Interactions Flow"],
    visualType: "mobile"
  }
];

// --- ABSTRACT ANIMATED TECH VISUALS FOR CANVAS ---
const TechCanvasVisual = ({ type }: { type: string }) => {
  return (
    <div className="relative w-full h-48 bg-primary/[0.02] rounded-xl border border-primary/5 flex items-center justify-center overflow-hidden font-mono text-[10px] text-primary/40 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-primary),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-primary),0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      {type === "saas" && (
        <div className="w-full flex flex-col gap-2 relative z-10">
          <div className="flex justify-between items-center px-3 py-1.5 rounded-md border border-primary/10 bg-background/80">
            <span className="text-primary font-bold">tenant_router.tf</span>
            <span className="text-green-500/70 animate-pulse">● active</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 border border-primary/5 bg-background/40 rounded">db_pool_A</div>
            <div className="p-2 border border-primary/5 bg-background/40 rounded">db_pool_B</div>
            <div className="p-2 border border-primary/10 bg-primary/[0.03] text-primary rounded">db_pool_C</div>
          </div>
        </div>
      )}

      {type === "automation" && (
        <div className="relative flex items-center justify-between w-full max-w-xs z-10">
          <div className="p-2 rounded-lg border border-primary/10 bg-background">Trigger_Webhook</div>
          <motion.div 
            animate={{ x: [0, 120], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="h-0.5 w-4 bg-primary absolute left-24"
          />
          <div className="p-2 rounded-lg border border-primary/10 bg-primary/[0.04] text-primary font-bold">State_Machine_Engine</div>
        </div>
      )}

      {type === "web" && (
        <div className="w-full flex flex-col gap-1 relative z-10 px-4">
          <div className="text-[9px] text-muted-foreground/60">// EDGE EDGE_RENDER_PIPELINE</div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">GET</span>
            <span className="text-foreground font-semibold">/solutions/multi-tenant-architecture</span>
          </div>
          <div className="w-full bg-primary/[0.05] h-1.5 rounded-full mt-2 overflow-hidden">
            <motion.div 
              animate={{ width: ["0%", "100%"] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
              className="bg-primary h-full w-1/2 rounded-full" 
            />
          </div>
        </div>
      )}

      {type === "mobile" && (
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-28 border border-primary/20 rounded-xl bg-background/80 p-2 flex flex-col gap-1 justify-between">
            <div className="w-full h-2 bg-primary/20 rounded-sm" />
            <div className="w-full h-12 bg-primary/[0.03] border border-primary/5 rounded-sm flex items-center justify-center"><Terminal className="w-3 h-3 text-primary/30" /></div>
            <div className="w-full h-2 bg-primary rounded-sm animate-pulse" />
          </div>
          <div className="flex flex-col gap-1 text-[9px]">
            <div className="text-primary font-bold">⚡ sqlite_sync_layer</div>
            <div>[OK] Cache Mutated Records</div>
            <div className="text-muted-foreground/40">[IDLE] Background Sync Worker</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SolutionsEngine = memo(() => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full py-20 sm:py-32 bg-background border-b border-primary/[0.03] overflow-hidden">
      
      {/* Structural Ambient Shadow Grid */}
      <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-primary/[0.01] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
        
        {/* Section Title Blueprint Layout */}
        <div className="mb-16 md:mb-24 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              Operational Competence Matrix
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Architectural Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-muted-foreground/40 font-normal">
              Engineered For Market Dominance.
            </span>
          </h2>
        </div>

        {/* MAIN STRUCTURAL LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE COLUMN: Concept 3 Horizon Rows Menu (Desktop Only for Premium Interaction) */}
          <div className="hidden md:flex md:col-span-5 flex-col w-full relative">
            
            {/* Tracking Glowing Physics Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-primary/[0.05]" />

            {SOLUTIONS.map((item, idx) => {
              const isSelected = idx === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => setActiveTab(idx)}
                  className="relative flex flex-col items-start text-left pl-6 py-6 border-b border-primary/[0.03] group outline-none"
                >
                  {/* Left Accent Bar Transition */}
                  {isSelected && (
                    <motion.div 
                      layoutId="horizonActiveIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.5)]"
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    />
                  )}

                  <span className={`text-[10px] font-mono font-semibold tracking-wider mb-1 transition-colors duration-300 ${
                    isSelected ? "text-primary" : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                  }`}>
                    {item.id} // {item.label.toUpperCase()}
                  </span>

                  <h3 className={`text-lg lg:text-xl font-bold tracking-tight transition-all duration-300 ${
                    isSelected ? "text-foreground translate-x-1" : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
                  }`}>
                    {item.actionTitle}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE COLUMN: Concept 2 Immersive Fluid Tab Canvas Viewport (Desktop) */}
          <div className="hidden md:block md:col-span-7 w-full h-[540px] lg:h-[490px] relative">
            <AnimatePresence mode="wait">
              {SOLUTIONS.map((item, index) => {
                if (index !== activeTab) return null;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-8 lg:p-10 rounded-[24px] border border-primary/10 bg-background shadow-[0_40px_90px_-30px_rgba(var(--color-primary),0.05)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Canvas Meta Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/5">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                          <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase">
                            SYSTEM FRAMEWORK READY
                          </span>
                        </div>
                        <Maximize2 className="w-3 h-3 text-muted-foreground/30" />
                      </div>

                      {/* Premium Copywriting Language */}
                      <h4 className="text-2xl font-extrabold tracking-tight text-foreground mb-3">
                        {item.actionTitle}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-normal mb-6">
                        {item.description}
                      </p>

                      {/* Dynamic Live Tech Visual Block */}
                      <TechCanvasVisual type={item.visualType} />
                    </div>

                    {/* Footer System Analytics Metrics Seal */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-primary/5 mt-4">
                      <div className="text-[10px] font-mono text-muted-foreground/60 tracking-tight flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-primary shrink-0" />
                        <span>{item.metrics}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-[11px] font-bold uppercase tracking-wider">
                        <span>Deploy Stack</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* MOBILE VIEWPORT LAYOUT: Zero-clipping Pure Padded Stream Sequence */}
          {/* ------------------------------------------------------------- */}
          <div className="flex flex-col gap-6 md:hidden w-full">
            {SOLUTIONS.map((item) => (
              <div 
                key={item.id}
                className="p-6 rounded-[22px] border border-primary/10 bg-background shadow-sm flex flex-col gap-5"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase block mb-1">
                    {item.id} // {item.label}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                    {item.actionTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Mobile Inline Visual Block */}
                <TechCanvasVisual type={item.visualType} />

                <div className="pt-4 border-t border-primary/5 flex flex-col gap-2">
                  <div className="text-[9px] font-mono text-muted-foreground/70 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary shrink-0" />
                    <span>{item.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
});

SolutionsEngine.displayName = "SolutionsEngine";