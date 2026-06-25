import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug, ICourse } from '../../../../lib/data'; // Path verification mandatory hai janii g
import { CheckCircle2, XCircle, Target, Sparkles, AlertCircle, ShieldCheck, Briefcase } from 'lucide-react';

interface CourseOverviewProps {
  slug: string;
}

export default function CourseOverview({ slug }: CourseOverviewProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // --- FULLY DETAILED FALLBACK DATA (For fields not explicitly present in current ICourse object) ---
  const defaultLearningOutcomes = [
    "Master advanced state management and architectural patterns used by production-grade software houses.",
    "Build secure backend pipelines, custom data modeling, and seamless real-time database integrations.",
    "Optimize applications for enterprise-grade deployment with advanced performance fine-tuning.",
    "Develop elite collaborative coding workflows using advanced version control systems and CI/CD automation."
  ];

  const defaultWhoIsFor = [
    "Ambitious absolute beginners or tech enthusiasts prepared to put in raw hard work daily.",
    "Intermediate developers aiming to bridge the critical gap between tutorials and senior production code.",
    "Entrepreneurs wanting to rapidly engineer, build, and ship their own secure SaaS web or mobile products."
  ];

  const defaultWhoIsNotFor = [
    "Shortcut seekers looking for immediate financial reward without mastering core software architecture first.",
    "Individuals unable or unwilling to dedicate at least 2 consecutive hours of daily hands-on coding.",
    "Anyone looking for theoretical, text-heavy lecture streams rather than strict product-driven execution."
  ];

  const defaultExpectedOutcomes = [
    "Direct placement eligibility in active dev teams or internal live enterprise projects at CodEarn Tech.",
    "A world-class engineering portfolio containing up to 10 live, highly scalable web/mobile apps.",
    "Confidence to confidently command premium developer compensation scales in international remote tech roles."
  ];

  // --- REAL DATA MAPPING WITH DATA.TS FIELDS ---
  // 1. Student kya seekhega -> Maps to 'whatYouWillLearn' array from your data.ts
  const learningOutcomes = course.whatYouWillLearn && course.whatYouWillLearn.length > 0 
    ? course.whatYouWillLearn 
    : defaultLearningOutcomes;

  // 2. Course kis ke liye hai -> Maps to 'requirements' array from your data.ts
  const whoIsFor = course.requirements && course.requirements.length > 0 
    ? course.requirements 
    : defaultWhoIsFor;

  // 3. Course kis ke liye nahi hai -> Optional schema fallback protection
  const whoIsNotFor = (course as any).whoIsItNotFor || defaultWhoIsNotFor;

  // 4. Expected outcomes -> Optional schema fallback protection
  const expectedOutcomes = (course as any).expectedOutcomes || defaultExpectedOutcomes;

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Grid: Asymmetric Dual-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: 40% STICKY SIDEBAR ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 uppercase tracking-wider font-mono">
                <Target className="w-3.5 h-3.5" /> Course Roadmap
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Course Overview & <span className="text-primary">Fitment Matrix</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-sm">
                Understand exactly what this bootcamp demands and how it bridges the gap between raw coding logic and industry engineering.
              </p>
            </div>

            {/* Premium Sticky High-Impact Expected Outcome Card */}
            <div className="relative group bg-gradient-to-br from-card to-muted/40 border border-border/80 rounded-[2rem] p-6 shadow-xl shadow-primary/[0.01] overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color || 'from-primary/10 to-transparent'} blur-2xl rounded-full opacity-40 pointer-events-none`} />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-mono font-bold tracking-wider text-foreground uppercase">
                  The Ultimate Target
                </h4>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">Expected ROI & Outcomes</h3>
              <ul className="space-y-3">
                {expectedOutcomes.map((outcome:any, idx:any) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-muted-foreground leading-relaxed">
                    <Briefcase className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: 60% FLOW CONTENT ================= */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section A: What is this course? & Detailed Explanation */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-mono tracking-wider text-primary uppercase">
                // 01 . What Is This Bootcamp?
              </h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg font-semibold text-foreground leading-relaxed">
                  {course.title} is an intensive, product-first deployment engine designed for builders. 
                  We skip trivial theoretical loops to put you straight into real production ecosystems.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Section B: What Student Will Learn */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-mono tracking-wider text-primary uppercase">
                // 02 . What You Will Engineer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:border-primary/20 hover:bg-muted/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-foreground leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section C: Ideal Candidate Filters */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-mono tracking-wider text-primary uppercase">
                // 03 . Candidate Fitment Filter
              </h3>
              
              <div className="bg-card border border-border/60 rounded-[2rem] overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60 shadow-sm">
                
                {/* Left Split: Who this is for (Requirements) */}
                <div className="p-6 sm:p-8 space-y-4 bg-emerald-500/[0.01]">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                    <h4 className="text-sm font-bold uppercase tracking-wider font-mono">
                      Who This Is For
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {whoIsFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Split: Who this is NOT for */}
                <div className="p-6 sm:p-8 space-y-4 bg-destructive/[0.01]">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="text-sm font-bold uppercase tracking-wider font-mono">
                      Who This Is NOT For
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {whoIsNotFor.map((item:any, idx:any) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                        <XCircle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
          
        </div>
        
      </div>
    </section>
  );
}