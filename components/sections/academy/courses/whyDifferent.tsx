import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path mapping verified janii g
import { Check, X, ShieldAlert, Sparkles, HelpCircle, Flame } from 'lucide-react';

interface WhyDifferentProps {
  slug: string;
}

export default function WhyDifferent({ slug }: WhyDifferentProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Pure data matrix for comparative items
  const comparisonFeatures = [
    {
      title: "Core Curriculum",
      normal: "Theory Only & Outdated Slides",
      bootcamp: "10 Real-World Production Projects",
      desc: "We skip boring theoretical loops to put you straight into live terminal execution mechanics."
    },
    {
      title: "Identity Asset",
      normal: "No Portfolio (Only Simple Assignments)",
      bootcamp: "Premium Structural Portfolio Architecture",
      desc: "Build a single premium command center displaying all your live production links elegantly."
    },
    {
      title: "Version Control",
      normal: "Zero or Basic Zip-File Submissions",
      bootcamp: "Complete Green GitHub Contribution Flow",
      desc: "Establish flawless professional corporate branching systems, commits, and clean tracking records."
    },
    {
      title: "Market Transition",
      normal: "No Freelancing Guidance (Left Stranded)",
      bootcamp: "High-Converting Fiverr/Upwork Engine",
      desc: "Direct specialized training on customized profile configurations, gig ranking algorithm models, and premium proposal drafting."
    }
  ];

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden border-b border-border/40">
      {/* Dynamic Background Glow mapping to course color variables */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" /> Market Comparison
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Why This Bootcamp Is <span className="text-primary">Different</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
            Stop investing your energy into generic tutorial loops. See how our strict product-driven roadmap shatters traditional learning structures.
          </p>
        </div>

        {/* Responsive Grid Structure Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-stretch">
          
          {/* ================= COLUMN 1: FEATURES TEXT (DESKTOP ONLY) ================= */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between py-8 pr-6">
            <div className="space-y-2">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                // Evaluation Matrix
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every line item is audited to guarantee structural superiority over traditional local bootcamps.
              </p>
            </div>
            
            {/* Iterative placeholder rows to dynamically align vertically with sibling columns */}
            <div className="space-y-[5.2rem] my-auto pt-24">
              {comparisonFeatures.map((feat, idx) => (
                <div key={idx} className="group">
                  <h4 className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground/80 mt-1 leading-normal max-w-[240px]">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-muted-foreground/40">
              CODIFYING ACADEMY STANDARDS // v2.6
            </div>
          </div>

          {/* ================= COLUMN 2: NORMAL COURSES (MUTED BLOCK) ================= */}
          <div className="col-span-1 lg:col-span-4 rounded-[2rem] bg-muted/20 border border-border/40 p-6 sm:p-8 flex flex-col justify-between opacity-60 dark:opacity-40 hover:opacity-80 transition-opacity duration-300">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="text-xs font-mono font-black tracking-wider uppercase">Standard Legacy Courses</span>
              </div>

              <div className="space-y-12 lg:space-y-[4.6rem] lg:pt-10">
                {comparisonFeatures.map((feat, idx) => (
                  <div key={idx} className="space-y-2">
                    {/* Mobile Only Header view helper */}
                    <span className="block lg:hidden text-[11px] font-mono font-bold text-muted-foreground/50 uppercase tracking-wider">
                      {feat.title}
                    </span>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive shrink-0 mt-0.5">
                        <X className="w-3 h-3 stroke-[3]" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground leading-snug">
                        {feat.normal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/20 text-[10px] font-mono text-muted-foreground/50 text-center lg:text-left">
              TRADITIONAL LOCAL TRAINING LIMITS
            </div>
          </div>

          {/* ================= COLUMN 3: OUR BOOTCAMP (THE SPOTLIGHT MATRIX) ================= */}
          <div className="col-span-1 lg:col-span-4 rounded-[2.5rem] bg-gradient-to-b from-card to-card/90 border-2 border-primary shadow-2xl shadow-primary/[0.04] p-6 sm:p-8 flex flex-col justify-between relative lg:-translate-y-4 transform lg:scale-[1.03] transition-all duration-300 z-20 group">
            
            {/* Top Right Corner Glowing Accent Badge */}
            <div className={`absolute top-6 right-6 w-20 h-20 bg-gradient-to-br ${course.color || 'from-primary to-cyan-500'} blur-2xl rounded-full opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500`} />

            <div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-4 h-4 animate-pulse shrink-0" />
                  <span className="text-xs font-mono font-black tracking-widest uppercase">CodEarn Framework</span>
                </div>
                <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                  Recommended
                </span>
              </div>

              <div className="space-y-12 lg:space-y-[4.6rem] lg:pt-10 relative z-10">
                {comparisonFeatures.map((feat, idx) => (
                  <div key={idx} className="space-y-2">
                    {/* Mobile Only Header view helper */}
                    <span className="block lg:hidden text-[11px] font-mono font-bold text-primary/70 uppercase tracking-wider">
                      {feat.title}
                    </span>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5 shadow-sm shadow-emerald-500/10">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground leading-snug">
                          {feat.bootcamp}
                        </p>
                        {/* Subtext explanation visibility toggle for seamless rendering across screen viewport breakpoints */}
                        <p className="block lg:hidden text-xs text-muted-foreground mt-1 leading-normal">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-[10px] font-mono font-bold text-primary tracking-wider relative z-10">
              <span>UPGRADED VALUE METRIC</span>
              <span>10X VELOCITY</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}