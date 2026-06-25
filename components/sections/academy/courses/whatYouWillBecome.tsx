import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verification janii g
import { 
  Terminal, 
  Cpu, 
  GitBranch, 
  LayoutTemplate, 
  Globe, 
  Rocket, 
  ArrowUpRight, 
  Activity
} from 'lucide-react';

interface WhatYouWillBecomeProps {
  slug: string;
}

export default function WhatYouWillBecome({ slug }: WhatYouWillBecomeProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden border-b border-border/40">
      {/* Background Subtle Mesh Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Day 31: Production Ready
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            What You Will <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Become</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
            Skip the generic completion certificates. By the end of this timeline, your capabilities are strictly divided into raw engineering skills and market execution channels.
          </p>
        </div>

        {/* Split Architecture Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* ================= LEFT COLUMN: TECHNICAL CORE (THE ENGINE) ================= */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-card to-card/60 border border-border/80 shadow-sm relative group">
            <div className="absolute top-6 right-6 text-xs font-mono font-bold text-primary/40 tracking-widest">
              [ ENGINE_CORE ]
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
                  Technical Core
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  The underlying technical stack and operational architecture you command.
                </p>
              </div>

              {/* Skill Cards Stack */}
              <div className="space-y-4">
                
                {/* Card 1: Build Responsive Websites */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Build Responsive Websites</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Architect fluid fluid grids, pixel-perfect modern breakpoints, and utility-first production layouts from scratch.
                    </p>
                  </div>
                </div>

                {/* Card 2: Use AI Development Tools */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Use AI Development Tools</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Harness high-velocity prompt pipelines to synthesize complex boilerplates and automate repetitive component structures.
                    </p>
                  </div>
                </div>

                {/* Card 3: Manage GitHub Projects */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Manage GitHub Projects</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Maintain standard corporate branching models, commit structures, and flawless version-control history matrices.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>METRICS: 100% DEPLOYABLE</span>
              <span>VERIFIED ENGINE</span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: MARKET VELOCITY (THE HUSTLE) ================= */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-card to-card/60 border border-border/80 shadow-sm relative group">
            <div className="absolute top-6 right-6 text-xs font-mono font-bold text-emerald-500/40 tracking-widest">
              [ COMMERCIAL_HUSTLE ]
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
                  Market Velocity
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  The active monetization models and professional commercial outputs.
                </p>
              </div>

              {/* Skill Cards Stack */}
              <div className="space-y-4">
                
                {/* Card 1: Create Portfolio */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 hover:border-emerald-500/20 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Create High-Converting Portfolio</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Establish an authoritative personal brand hub that showcases up to 10 of your live application environments.
                    </p>
                  </div>
                </div>

                {/* Card 2: Deploy Websites */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 hover:border-emerald-500/20 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Deploy Websites Live</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Push static configurations and cloud modules directly onto live web servers with custom DNS routing setups.
                    </p>
                  </div>
                </div>

                {/* Card 3: Start Freelancing */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 hover:border-emerald-500/20 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Start Client Acquisition</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Configure high-converting marketplace gigs, write premium custom client proposals, and pitch globally.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-emerald-500">
              <span className="flex items-center gap-1">
                MONETIZATION ASSETS READY <ArrowUpRight className="w-3 h-3" />
              </span>
              <span>LIVE FREELANCING</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}