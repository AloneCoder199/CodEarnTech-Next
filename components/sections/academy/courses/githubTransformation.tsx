'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verification verified janii g
import { 
  Github, 
  GitCommit, 
  GitBranch, 
  GitPullRequest, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Folder,
  Terminal
} from 'lucide-react';

interface GithubTransformationProps {
  slug: string;
}

export default function GithubTransformation({ slug }: GithubTransformationProps) {
  const course = getCourseBySlug(slug);
  const [activeMode, setActiveMode] = useState<'before' | 'after'>('after');

  if (!course) {
    notFound();
  }

  // Fake static array mimicking real active GitHub contribution squares matrix
  const contributionGrid = Array.from({ length: 42 }, (_, i) => {
    // Creating a progressive green intensity graph for the 'After' mode
    if (i < 8) return 'bg-emerald-500/10';
    if (i < 20) return 'bg-emerald-500/40';
    if (i < 32) return 'bg-emerald-500/70';
    return 'bg-emerald-400';
  });

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Structural Tech Background Accents */}
      <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-primary/[0.02] blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-20">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
              <Github className="w-3.5 h-3.5" /> Authority Proofing
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              GitHub Profile <br /> <span className="text-primary">Transformation</span>
            </h2>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-border/60 pl-4 md:pl-0 md:pr-4 py-1">
            <span className="text-xs font-mono font-black text-muted-foreground tracking-widest uppercase block mb-1">[ PROFILE AUDIT ]</span>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              From an invisible ghost profile to an elite Open-Source engine loaded with production metrics.
            </p>
          </div>
        </div>

        {/* MOBILE SPACE CONTROLLER: High-end iOS Style Viewport Segmented Switch */}
        <div className="flex md:hidden bg-muted/60 p-1 rounded-xl max-w-[280px] mx-auto mb-8 border border-border/40">
          <button
            onClick={() => setActiveMode('before')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
              activeMode === 'before' ? 'bg-card text-destructive shadow-sm' : 'text-muted-foreground/60'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" /> Before
          </button>
          <button
            onClick={() => setActiveMode('after')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
              activeMode === 'after' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> After
          </button>
        </div>

        {/* 
          TRANSFORMATION GRAPH GRID:
          Mobile: Shows toggled view inside single bounding container.
          Desktop: Displays premium side-by-side layout comparison framework.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* VIEW BLOCK 01: THE GHOST PROFILE (BEFORE COURSE) */}
          <div className={`border border-border/40 bg-card/30 rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
            activeMode === 'before' ? 'block animate-fadeIn' : 'hidden md:flex opacity-40 hover:opacity-60'
          }`}>
            <div>
              {/* Profile Mockup Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-border/40">
                <div className="w-12 h-12 rounded-full bg-muted animate-pulse shrink-0 border border-border/40 flex items-center justify-center font-mono text-xs text-muted-foreground/30">?</div>
                <div className="space-y-1.5 w-full">
                  <div className="h-3 w-28 bg-muted rounded animate-pulse" />
                  <div className="h-2 w-16 bg-muted/60 rounded animate-pulse" />
                </div>
              </div>

              {/* Empty Readme State Box */}
              <div className="mt-5 border border-dashed border-border rounded-xl p-6 text-center bg-muted/10">
                <Terminal className="w-5 h-5 text-muted-foreground/30 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-muted-foreground/60 font-mono">No Profile Documentation</h4>
                <p className="text-[10px] text-muted-foreground/40 mt-1">This repository has no README.md file configured yet.</p>
              </div>

              {/* Zero Repositories Row Counter */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/40 px-1">
                  <span>Pinned Repositories</span>
                  <span>0 / 6</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="border border-border/20 rounded-xl p-3 bg-muted/5 flex items-center justify-center text-[10px] text-muted-foreground/30 font-mono py-6">
                    [ No pinned repositories found ]
                  </div>
                </div>
              </div>
            </div>

            {/* Empty Contribution Graph Row Frame */}
            <div className="mt-6 pt-4 border-t border-border/40">
              <span className="text-[10px] font-mono text-muted-foreground/40 block mb-2">0 contributions in the last year</span>
              <div className="flex gap-1 overflow-hidden opacity-30">
                {Array.from({ length: 24 }).map((_, idx) => (
                  <span key={idx} className="w-3 h-3 rounded-[2px] bg-muted shrink-0 block" />
                ))}
              </div>
            </div>
          </div>

          {/* VIEW BLOCK 02: THE COMMITS MACHINE (AFTER COURSE MASTERING) */}
          <div className={`border border-primary/20 bg-card rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 shadow-xl shadow-primary/[0.01] relative overflow-hidden ${
            activeMode === 'after' ? 'block animate-fadeIn' : 'hidden md:flex'
          }`}>
            {/* Top Glowing Laser Ribbon Accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <div>
              {/* Profile Mockup Header Premium Loaded */}
              <div className="flex items-center gap-3 pb-5 border-b border-border/40">
                <div className="w-12 h-12 rounded-full bg-primary/10 shrink-0 border border-primary/30 flex items-center justify-center font-mono text-xs text-primary font-black shadow-inner">
                  GIT
                </div>
                <div className="w-full flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-black text-foreground flex items-center gap-1 font-mono">
                      your-username <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> 10 Repositories Active
                    </span>
                  </div>
                  <div className="flex gap-1.5 text-[9px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border/40">
                    <span className="text-foreground font-bold">Pro</span> Verified
                  </div>
                </div>
              </div>

              {/* Professional Custom Markdown Profile README Module */}
              <div className="mt-4 border border-border/60 rounded-xl p-3 bg-muted/30 relative">
                <span className="absolute top-2 right-3 text-[8px] font-mono text-muted-foreground/40 font-bold">README.md</span>
                <h5 className="text-[11px] font-black text-foreground font-mono flex items-center gap-1">
                  👋 Hi, I'm a Full-Stack Dev Engine
                </h5>
                <p className="text-[10px] text-muted-foreground leading-relaxed mt-1 max-w-[260px]">
                  Focused heavily on automated testing, relational database state matrices, and semantic UI delivery components.
                </p>
                <div className="flex gap-1.5 mt-2">
                  {['NextJS', 'TypeScript', 'Supabase'].map((t, idx) => (
                    <span key={idx} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-medium">{t}</span>
                  ))}
                </div>
              </div>

              {/* Pinned Projects Interactive Showcase Panel */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 font-black uppercase tracking-wider px-0.5">
                  <span>Pinned Repositories</span>
                  <span className="text-primary">6 Pinned</span>
                </div>
                
                {/* Simulated Pinned Cards Structure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="border border-border/60 rounded-xl p-2.5 bg-card/60 space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-foreground">
                      <Folder className="w-3 h-3 text-primary shrink-0" /> <span className="truncate">micro-saas-core</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground line-clamp-1">Multi-tenant subscription backend matrix architecture.</p>
                    <div className="flex items-center gap-2 pt-1 text-[8px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> TypeScript</span>
                    </div>
                  </div>
                  <div className="border border-border/60 rounded-xl p-2.5 bg-card/60 space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-foreground">
                      <Folder className="w-3 h-3 text-primary shrink-0" /> <span className="truncate">apple-agency-ui</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground line-clamp-1">Ultra-premium minimalist canvas view transitions.</p>
                    <div className="flex items-center gap-2 pt-1 text-[8px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> HTML/Tailwind</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Highly Rich Active Contribution Green Grid Matrix */}
            <div className="mt-5 pt-3 border-t border-border/40">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 mb-2">
                <span className="font-bold text-foreground flex items-center gap-1">
                  <GitCommit className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> 1,420 contributions this year
                </span>
                <span className="text-[8px]">Max Streak</span>
              </div>
              <div className="grid grid-flow-col grid-rows-3 gap-0.5 overflow-hidden w-full">
                {contributionGrid.map((colorClass, sqIdx) => (
                  <span 
                    key={sqIdx} 
                    className={`h-2 w-2 rounded-[1px] transition-all duration-500 shrink-0 block ${colorClass} hover:scale-110`} 
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}