// "use client";

// export default function AcademyComparison() {
//   return (
//     <section className="w-full bg-background text-foreground py-20 px-4 sm:px-6 overflow-hidden">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Section Header - App Style Minimalist Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
//           <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4">
//             The Paradigm Shift
//           </div>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight leading-none text-balance">
//             A Radical Shift in How <br className="hidden sm:inline" />
//             Engineers Are Built.
//           </h2>
//           <p className="mt-4 text-base md:text-lg text-muted-foreground font-light max-w-xl mx-auto text-balance">
//             Traditional education leaves you with an unverified certificate. We embed you inside a production pipeline with real software market metrics.
//           </p>
//         </div>

//         {/* Master Comparison Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          
//           {/* LEFT COLUMN: Traditional Path (Muted App Tile - 4 Cols on Desktop) */}
//           <div className="lg:col-span-4 bg-muted/20 border border-border/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between opacity-60 hover:opacity-80 transition-all duration-300 shadow-sm group">
//             <div>
//               <div className="flex items-center justify-between mb-8">
//                 <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground/70 uppercase">
//                   [ 01 // The Old Loop ]
//                 </span>
//                 <span className="w-2 h-2 rounded-full bg-destructive/40" />
//               </div>
              
//               <h3 className="text-xl font-sans font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors mb-3">
//                 Traditional Courses
//               </h3>
//               <p className="text-sm text-muted-foreground/80 font-light mb-8 leading-relaxed">
//                 Passive consumption patterns optimized for platform watch-time metrics, not system deployment readiness.
//               </p>

//               {/* Traditional Points Block */}
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3 bg-muted/40 p-4 rounded-2xl border border-border/30">
//                   <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
//                     <span className="text-destructive text-[10px] font-bold">✕</span>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-mono font-semibold text-muted-foreground">Theory-Heavy Sandbox</h4>
//                     <p className="text-xs text-muted-foreground/60 mt-1 font-light">Endless video playlists, syntax cramming, and zero architecture contexts.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 bg-muted/40 p-4 rounded-2xl border border-border/30">
//                   <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
//                     <span className="text-destructive text-[10px] font-bold">✕</span>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-mono font-semibold text-muted-foreground">The &quot;Todo App&quot; Graveyard</h4>
//                     <p className="text-xs text-muted-foreground/60 mt-1 font-light">Building tiny isolated codebases that never handle concurrent active user traffic.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 pt-4 border-t border-border/20 text-[11px] font-mono text-muted-foreground/50">
//               Result: Stuck in Tutorial Hell.
//             </div>
//           </div>

//           {/* MIDDLE SEPARATOR: The "VS" Mobile Application Badge */}
//           <div className="lg:absolute lg:top-1/2 lg:left-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center z-20 my-2 lg:my-0 select-none">
//             <div className="bg-background border-2 border-border text-xs font-mono font-bold tracking-wider px-4 py-2 rounded-full shadow-md text-muted-foreground dark:bg-neutral-900">
//               VS
//             </div>
//           </div>

//           {/* RIGHT COLUMN: CodEarn Academy Ecosystem (Premium High-Contrast Bento - 8 Cols on Desktop) */}
//           <div className="lg:col-span-8 bg-card border border-border/80 rounded-3xl p-6 md:p-8 relative shadow-2xl flex flex-col justify-between overflow-hidden group">
//             {/* Ambient Back Glow - Apple Style Glow */}
//             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
            
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-8">
//                 <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
//                   [ 02 // The Engineering Node ]
//                 </span>
//                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//               </div>

//               <h3 className="text-2xl font-sans font-bold tracking-tight text-foreground mb-3">
//                 CodEarn Academy Ecosystem
//               </h3>
//               <p className="text-sm text-muted-foreground font-light mb-8 max-w-xl leading-relaxed">
//                 An intense, multi-dimensional execution environment modeled exactly after elite Silicon Valley software engineering teams.
//               </p>

//               {/* Micro Bento Grid inside Mobile Dashboard Style */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
//                 {/* Quadrant 1: Real Projects */}
//                 <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
//                   <div>
//                     <div className="text-primary text-xs font-mono font-bold mb-2">01 / PRODUCTION CORE</div>
//                     <h4 className="text-sm font-sans font-semibold text-foreground">Real Enterprise Systems</h4>
//                     <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
//                       Write robust multi-tenant backends, custom state management layers, and secure multi-tier architectural applications.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quadrant 2: Guaranteed Internal Internship */}
//                 <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
//                   <div>
//                     <div className="text-primary text-xs font-mono font-bold mb-2">02 / DEPLOYMENT PIPELINE</div>
//                     <h4 className="text-sm font-sans font-semibold text-foreground">Internal Intensive Internship</h4>
//                     <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
//                       Work inside real agile sprints. Participate in code refactoring requests, feature scoping, and system optimization reviews.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quadrant 3: Data-Backed Portfolio */}
//                 <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
//                   <div>
//                     <div className="text-primary text-xs font-mono font-bold mb-2">03 / PERFORMANCE PROOF</div>
//                     <h4 className="text-sm font-sans font-semibold text-foreground">Data-Backed Portfolio</h4>
//                     <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
//                       Build production platforms optimized for edge networks, tracking lighthouse vitals, and sub-40ms server latency APIs.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quadrant 4: Client Experience */}
//                 <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
//                   <div>
//                     <div className="text-primary text-xs font-mono font-bold mb-2">04 / THE EDGE FACTOR</div>
//                     <h4 className="text-sm font-sans font-semibold text-foreground">Direct Client Experience</h4>
//                     <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
//                       Learn to scope client request changes, handle critical database migration rollbacks, and manage feature delivery demands.
//                     </p>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             <div className="mt-8 pt-4 border-t border-border/30 relative z-10 flex items-center justify-between text-xs font-mono">
//               <span className="text-primary font-semibold">Model Status: Active Engineering Elite</span>
//               <span className="text-muted-foreground/60">Cohort 2026 // Next Level</span>
//             </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

"use client"

import React, { useEffect, useRef, useState } from 'react';
import { 
  Briefcase, 
  Bot, 
  FolderGit2, 
  Github, 
  Award, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    id: "01",
    title: "Project Based Learning",
    description: "Real projects instead of theory. We believe in building hands-on applications that prepare you for real-world development challenges.",
    icon: Briefcase,
  },
  {
    id: "02",
    title: "AI Assisted Development",
    description: "Modern AI tools ka practical use. Learn how to leverage LLMs, AI coding assistants, and automation to write cleaner code 10x faster.",
    icon: Bot,
  },
  {
    id: "03",
    title: "Portfolio Building",
    description: "Professional portfolio creation. Stand out from the crowd with production-grade projects hosted globally with absolute premium case studies.",
    icon: FolderGit2,
  },
  {
    id: "04",
    title: "GitHub Training",
    description: "Complete GitHub workflow. Master branching strategies, pull requests, code reviews, and CI/CD pipelines used by elite remote engineering teams.",
    icon: Github,
  },
  {
    id: "05",
    title: "Certificate",
    description: "Verified completion certificate. Earn industry-recognized credentials to validate your skills and fast-track your hiring process.",
    icon: Award,
  },
  {
    id: "06",
    title: "Scholarship Program",
    description: "Top students ke liye scholarship. Exceptional performers get exclusive financial backings, premium mentorship, and direct job placements.",
    icon: GraduationCap,
  },
];

export default function ScrollPinnedWhyLearn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;

      // Calculate how much the section has scrolled relative to viewport
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      
      // rect.top negative tab hota hai jab section top par lock ho jata hai
      const scrolledDistance = -rect.top; 
      
      let progress = scrolledDistance / totalScrollableHeight;
      progress = Math.max(0, Math.min(1, progress)); // Bound between 0 and 1

      // Calculate max horizontal translation distance for the track
      const maxTranslate = track.scrollWidth - track.parentElement!.clientWidth;
      const currentTranslate = progress * maxTranslate;

      // Apply GPU-accelerated smooth transformation
      track.style.transform = `translate3d(-${currentTranslate}px, 0px, 0px)`;

      // Dynamic Active Dot Indicator update based on track progress
      const calculatedIndex = Math.min(
          Math.floor(progress * features.length),
        features.length - 1
      );
      setActiveIndex(calculatedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    /* h-[500vh] controls how long the section stays pinned. More height = slower, premium scroll */
    <section ref={containerRef} className="relative h-[450vh] bg-background w-full">
      
      {/* Sticky Frame: This container stays fixed on screen during the scroll duration */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-12 md:py-0">
        
        {/* Background Premium Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        {/* ================= LEFT/TOP SIDE: FIXED TEXT AREA ================= */}
        <div className="w-full md:w-[30%] flex flex-col justify-center z-20 mb-8 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ecosystem Overview
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Why Learn <br className="hidden md:block" />
            With <span className="text-primary">Us?</span>
          </h2>
          
          <p className="text-muted-foreground text-sm sm:text-base max-w-sm leading-relaxed mb-6">
            Keep scrolling down to explore the modern application-driven pillars we built for your engineering growth.
          </p>

          {/* Apple-style Interactive Bottom Progress Dots */}
          <div className="flex items-center gap-2 pt-4 border-t border-border/40">
            {features.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= RIGHT/BOTTOM SIDE: HORIZONTAL TRACK ================= */}
        <div className="w-full md:w-[65%] overflow-visible md:overflow-hidden relative z-10 flex items-center">
          
          {/* Moving Reel Strip */}
          <div 
            ref={trackRef} 
            className="flex gap-6 md:gap-8 will-change-transform py-6"
            style={{ transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
          >
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              const isSelected = activeIndex === idx;

              return (
                <div
                  key={feature.id}
                  className={`
                    w-[290px] sm:w-[350px] md:w-[400px] shrink-0 p-8 rounded-[2.5rem] border bg-card 
                    transition-all duration-500 flex flex-col justify-between h-[360px] md:h-[400px]
                    ${isSelected 
                      ? 'border-primary/40 shadow-2xl shadow-primary/5 bg-gradient-to-br from-card to-primary/[0.015] scale-100' 
                      : 'border-border/60 opacity-40 scale-[0.96] blur-[0.2px]'
                    }
                  `}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                        ${isSelected ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20' : 'bg-primary/10 text-primary'}
                      `}>
                        <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-muted-foreground/40 bg-muted px-3 py-1 rounded-full">
                        TRACK // {feature.id}
                      </span>
                    </div>

                    {/* Main Text Content */}
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Decorative Flow Accent */}
                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <span className="text-xs font-medium text-primary/40 group-hover:text-primary transition-colors flex items-center gap-1">
                      Core Feature <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}