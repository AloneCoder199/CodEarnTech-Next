"use client";

import React from "react";
import { 
  Server, LayoutGrid, Database, Zap, Bot, 
  Smartphone, Globe, Shield, Cloud, Cpu, Terminal,
  Code, GitBranch, BarChart3, Workflow
} from "lucide-react";

// Data Section: 1-line crisp professional descriptions
const SERVICES_ROW_1 = [
  { title: "SaaS Architecture", description: "Cloud-native distributed systems built for scale.", icon: Server },
  { title: "Enterprise CRM", description: "Custom pipelines built for customer conversion.", icon: LayoutGrid },
  { title: "Microservices", description: "Decoupled modular entities for agile deployment.", icon: Workflow },
  { title: "E-commerce Engine", description: "Blazing fast headless checkout configurations.", icon: Zap },
  { title: "Headless CMS", description: "Decoupled content nodes delivering global data.", icon: Globe },
  { title: "API Development", description: "Secure, highly typesafe REST & GraphQL endpoints.", icon: Code },
  { title: "Database Design", description: "Relational schema layouts built for high throughput.", icon: Database },
];

const SERVICES_ROW_2 = [
  { title: "AI/ML Integration", description: "Smart production pipelines with predictive intelligence.", icon: Bot },
  { title: "Native Mobile Apps", description: "Fluid premium grade interfaces for iOS and Android.", icon: Smartphone },
  { title: "Cloud Infrastructure", description: "Automated serverless configurations on AWS platforms.", icon: Cloud },
  { title: "Cyber Security", description: "End-to-end data pipelines shield critical tokens.", icon: Shield },
  { title: "Process Automation", description: "Eliminate repetitive tasks with optimized runtime engines.", icon: Cpu },
  { title: "DevOps Pipeline", description: "Continuous integration tracks handling rapid deployments.", icon: Terminal },
  { title: "Version Control", description: "Secure structural collaboration workflows utilizing Git hubs.", icon: GitBranch },
  { title: "Data Analytics", description: "Transforming raw systemic matrices into live matrix charts.", icon: BarChart3 },
];

export default function SolutionsHero() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-background overflow-hidden border-b border-neutral-100 dark:border-neutral-900/40 mt-10">
      
      {/* Injecting Global Hardware-Accelerated Marquee Styles for Perfect Hover-Pause */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft var(--duration, 60s) linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight var(--duration, 65s) linear infinite;
        }
        .marquee-track-wrapper:hover .marquee-track {
          animation-play-state: paused !important;
        }
      `}} />

      {/* Decorative Minimal Ambient Light Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-neutral-100/40 to-transparent dark:from-neutral-900/10 pointer-events-none" />

      {/* Header Segment */}
      <div className="max-w-4xl mx-auto px-6 mb-16 sm:mb-20 text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Architectural Solutions.
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto font-normal leading-relaxed">
          CodEarn Tech's engineering ecosystem. Built for absolute scale, high-throughput security, and microsecond precision.
        </p>
      </div>

      {/* Infinite Ribbon Canvas Wrapper with Premium Side Fading Masks */}
      <div className="relative flex flex-col gap-5 w-full select-none [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] marquee-track-wrapper">
        
        {/* Row 1: Right to Left Direction (Slower Speed) */}
        <Marquee direction={1} items={SERVICES_ROW_1} speed="60s" />
        
        {/* Row 2: Left to Right Direction (Slower Speed) */}
        <Marquee direction={-1} items={SERVICES_ROW_2} speed="65s" />
        
      </div>
    </section>
  );
}

interface MarqueeProps {
  direction: number;
  items: typeof SERVICES_ROW_1;
  speed: string;
}

const Marquee = ({ direction, items, speed }: MarqueeProps) => {
  // Triple arrays handle ultra-wide displays securely without breaks
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="flex w-full overflow-hidden relative py-1">
      <div 
        style={{ '--duration': speed } as React.CSSProperties}
        className={`flex gap-4 shrink-0 pr-4 min-w-full marquee-track transform-gpu ${
          direction === 1 ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {duplicatedItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex-none w-[290px] p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 backdrop-blur-xs shadow-3xs transition-all duration-300 hover:border-neutral-400/50 dark:hover:border-neutral-600/50 flex items-start gap-3.5 hover:scale-[1.02] cursor-pointer"
          >
            {/* Clean Rounded Icon Shield wrapper */}
            <div className="w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/30 dark:border-neutral-800/40 flex items-center justify-center text-primary shrink-0 shadow-3xs">
              <item.icon className="w-4 h-4 stroke-[1.85]" />
            </div>
            
            {/* Vertical Stack Text Block */}
            <div className="flex flex-col min-w-0 justify-center h-9">
              <h3 className="text-xs font-bold tracking-tight text-neutral-950 dark:text-neutral-50 truncate">
                {item.title}
              </h3>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-normal line-clamp-1 mt-0.5 leading-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};