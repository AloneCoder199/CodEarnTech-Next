'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path double verified
import { 
  Milestone, 
  Flag, 
  BookOpen, 
  Code2, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Globe, 
  Terminal,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface SuccessPathProps {
  slug: string;
}

export default function SuccessPath({ slug }: SuccessPathProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Linear progression matrix mapping datasets
  const timelineSteps = [
    {
      id: "day1",
      phase: "01",
      title: "Day 1",
      desc: "Orientation session, infrastructure setups, and platform dashboard onboarding rules setup.",
      icon: Flag,
      badge: "The Start"
    },
    {
      id: "learning",
      phase: "02",
      title: "Core Learning",
      desc: "Deep-dive structural architecture mechanics, semantic workflows, and clean code principles.",
      icon: BookOpen,
      badge: "In-Progress"
    },
    {
      id: "projects",
      phase: "03",
      title: "Live Projects",
      desc: "Building high-performance, complex commercial production web clones and scalable applications.",
      icon: Code2,
      badge: "Build Phase"
    },
    {
      id: "portfolio",
      phase: "04",
      title: "Portfolio",
      desc: "Bundling projects into a single hyper-optimized, clean production-ready engineer showcase profile.",
      icon: Terminal,
      badge: "Identity"
    },
    {
      id: "certificate",
      phase: "05",
      title: "Certification",
      desc: "Verifiable smart blockchain cryptographic credentials generated upon passing quality metrics evaluation.",
      icon: Award,
      badge: "Verification"
    },
    {
      id: "scholarship",
      phase: "06",
      title: "Scholarship",
      desc: "Top 10% elite high-performers unlock complete fee refunds and next-gen mentorship programs tracking.",
      icon: GraduationCap,
      badge: "Elite Perks"
    },
    {
      id: "freelancing",
      phase: "07",
      title: "Freelancing",
      desc: "Upwork identity optimizations, proposal engineering strategies, and directly global payments sourcing channels.",
      icon: Globe,
      badge: "Monetize"
    },
    {
      id: "internship",
      phase: "08",
      title: "Internship",
      desc: "Direct corporate deployment placement track right inside CodEarn software house systems ecosystem.",
      icon: Briefcase,
      badge: "Deployment"
    }
  ];

  // Active state controller for mobile viewport pagination
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < timelineSteps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Structural Ambient Backlight Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.01] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading Row Module */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold font-mono uppercase tracking-wider">
            <Milestone className="w-3.5 h-3.5" /> Career Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Student <span className="text-primary">Success Path</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Aap ka zero-to-hero pipeline flow framework. Is tarah aap standard syntax parameters seekhne se lekar direct industry production deployments tak scale karein ge.
          </p>
        </div>

        {/* 1. TOP TIMELINE STEPS BAR INDICATOR (Stays super clean on mobile, clicks trigger active slides) */}
        <div className="w-full max-w-2xl mx-auto mb-8 overflow-x-auto no-scrollbar pb-2 px-2">
          <div className="flex items-center justify-between min-w-[480px] md:min-w-0 relative">
            
            {/* Absolute Horizontal Track Line */}
            <div className="absolute top-[18px] left-4 right-4 h-[2px] bg-border/40 z-0" />
            <div 
              className="absolute top-[18px] left-4 h-[2px] bg-primary transition-all duration-300 z-0" 
              style={{ width: `${(activeIndex / (timelineSteps.length - 1)) * 92}%` }}
            />

            {timelineSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isPastOrActive = idx <= activeIndex;
              return (
                <button
                  key={`indicator-${step.id}`}
                  onClick={() => setActiveIndex(idx)}
                  className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    idx === activeIndex
                      ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(var(--primary),0.3)] scale-110'
                      : isPastOrActive
                      ? 'bg-background text-primary border-primary/60'
                      : 'bg-muted text-muted-foreground/60 border-border/60 group-hover:border-border'
                  }`}>
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold transition-colors ${
                    idx === activeIndex ? 'text-primary' : 'text-muted-foreground/50'
                  }`}>
                    P{step.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. RESPONSIVE CARDS CONTAINER LAYER */}
        <div className="relative max-w-md mx-auto lg:max-w-none lg:mt-12">
          
          {/* MOBILE RUNTIME VIEWPORT: Displays Single Active Card Without Grid Breakages */}
          <div className="block lg:hidden w-full px-2">
            {timelineSteps.map((step, index) => {
              if (index !== activeIndex) return null;
              const StepIcon = step.icon;

              return (
                <div 
                  key={`mobile-${step.id}`}
                  className="w-full border border-border bg-card p-6 rounded-2xl shadow-xl space-y-5 animate-in fade-in slide-in-from-right-4 duration-300 relative overflow-hidden"
                >
                  {/* Subtle top visual element */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-primary bg-primary/10 px-2.5 py-0.5 rounded-md tracking-wider">
                      PHASE {step.phase} / 08
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> {step.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 pt-2">
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-primary flex items-center justify-center">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed pl-1 pt-1 min-h-[50px]">
                    {step.desc}
                  </p>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground/60">
                    <span>Academy Standard Track</span>
                    <span className="font-bold text-foreground">Active Module</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP STATIC FLOW MATRIX: Kept standard for large viewports */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-stretch">
            {timelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={`desktop-${step.id}`}
                  className="h-full border border-border/60 bg-card/40 hover:border-primary/30 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:bg-card/80"
                >
                  {index % 4 !== 3 && (
                    <div className="absolute top-10 -right-3 w-6 h-[1px] bg-border/80 z-0" />
                  )}

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md tracking-wider">
                        PHASE {step.phase}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-muted-foreground/40 uppercase tracking-widest">
                        {step.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-muted border border-border/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 flex items-center justify-center">
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed pl-1">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/30 text-[10px] font-mono text-muted-foreground/30">
                    <span>Active Lifecycle</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. EXPLICIT LEFT & RIGHT NAVIGATION BUTTONS CONTROLLERS (Only visible on mobile screens) */}
          <div className="flex lg:hidden items-center justify-center gap-5 mt-6">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? 'border-border/40 text-muted-foreground/30 bg-muted/20 cursor-not-allowed'
                  : 'border-border bg-card text-foreground hover:text-primary hover:border-primary/40 active:scale-95 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="text-xs font-mono font-bold text-muted-foreground/80">
              <span className="text-primary">{activeIndex + 1}</span> / {timelineSteps.length}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === timelineSteps.length - 1}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                activeIndex === timelineSteps.length - 1
                  ? 'border-border/40 text-muted-foreground/30 bg-muted/20 cursor-not-allowed'
                  : 'border-border bg-card text-foreground hover:text-primary hover:border-primary/40 active:scale-95 shadow-sm'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}