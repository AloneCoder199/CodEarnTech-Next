"use client"
import React from 'react';
import { 
  Terminal, 
  UserCheck, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const phases = [
  {
    id: "01",
    phaseTitle: "Phase 1: Core Engineering",
    tagline: "The Foundation Build",
    bgGradient: "from-blue-500/10 to-transparent",
    icon: Terminal,
    steps: [
      { name: "Beginner", desc: "Zero coding experience se start, core concepts aur fundamentals ka absolute scratch se setup." },
      { name: "Build Projects", desc: "Theory ko skip kar ke direct hands-on application building aur production architectures par kaam." }
    ]
  },
  {
    id: "02",
    phaseTitle: "Phase 2: Professional Identity",
    tagline: "The Launchpad Setup",
    bgGradient: "from-primary/10 to-transparent",
    icon: UserCheck,
    steps: [
      { name: "Portfolio Creation", desc: "Apne top premium tools aur production-grade built projects ko ek high-end deployment site par showcase karna." },
      { name: "GitHub Setup", desc: "Repositories optimization, clean commits history, commercial-grade READMEs aur open-source mapping." },
      { name: "Certificate", desc: "Industry-recognized skills verification card jo direct LinkedIn aur recruiters feed par stand-out kare." }
    ]
  },
  {
    id: "03",
    phaseTitle: "Phase 3: Commercial Mastery",
    tagline: "The Market Monetization",
    bgGradient: "from-emerald-500/10 to-transparent",
    icon: Briefcase,
    steps: [
      { name: "Scholarship Program", desc: "Top performers ke liye 1-Month advanced mentorship track, absolute real agency ecosystem experience." },
      { name: "Freelancing Training", desc: "Fiverr/Upwork setup, high-conversion gigs creation, winning proposals writing, aur client retention skills." },
      { name: "Internship Opportunity", desc: "Software house (CodEarn) ke real commercial SaaS products par remote junior developer scale par placement." }
    ]
  }
];

export default function LearningPath() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Soft Ambient Light Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              Career Roadmap
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              The Student <span className="text-primary">Transformation</span> Journey
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mt-2 leading-relaxed">
              We don't just teach code. We structuralize your transition from an absolute beginner to a commercial field engineering professional.
            </p>
          </div>

          {/* Minimalist Phase Badge Summary */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground/60 bg-muted/40 p-2 rounded-xl border border-border/40">
            <span>BEGINNER</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-primary">3 PHASES</span>
            <ArrowRight className="w-3 h-3" />
            <span>JUNIOR DEVELOPER</span>
          </div>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {phases.map((phase, pIdx) => {
            const IconComponent = phase.icon;

            return (
              <div 
                key={phase.id}
                className={`
                  relative rounded-[2.2rem] border border-border/60 bg-card p-6 md:p-8 
                  transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5
                  flex flex-col justify-between overflow-hidden group
                  bg-gradient-to-br ${phase.bgGradient}
                `}
              >
                <div>
                  {/* Phase Top Meta Row */}
                  <div className="flex items-center justify-between mb-8 border-b border-border/30 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background border border-border/60 flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground tracking-tight">
                          {phase.phaseTitle}
                        </h3>
                        <p className="text-[11px] font-medium text-muted-foreground">
                          {phase.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-black font-mono tracking-tighter opacity-10 text-foreground group-hover:opacity-20 transition-opacity">
                      {phase.id}
                    </span>
                  </div>

                  {/* Sub-steps Vertical Inner Deck */}
                  <div className="space-y-6 relative">
                    {phase.steps.map((step, sIdx) => (
                      <div key={sIdx} className="relative flex gap-4 items-start group/step">
                        
                        {/* Micro Step Timeline Line Connector */}
                        {sIdx !== phase.steps.length - 1 && (
                          <div className="absolute left-[10px] top-[24px] w-[1px] h-[calc(100%+12px)] bg-border/60 group-hover:bg-primary/20 transition-colors" />
                        )}

                        {/* Node Bullet Point */}
                        <div className="w-5 h-5 rounded-full bg-background border-2 border-border/80 flex items-center justify-center shrink-0 mt-0.5 relative z-10 transition-colors group-hover/step:border-primary">
                          <CheckCircle2 className="w-3 h-3 text-primary scale-0 group-hover/step:scale-100 transition-transform duration-300" />
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 group-hover/step:scale-0 transition-transform duration-200" />
                        </div>

                        {/* Step Main Text Details */}
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-foreground tracking-tight group-hover/step:text-primary transition-colors">
                            {step.name}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Border Gradient Accent */}
                <div className="h-[2px] w-1/3 bg-gradient-to-r from-primary/40 to-transparent mt-8 rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}