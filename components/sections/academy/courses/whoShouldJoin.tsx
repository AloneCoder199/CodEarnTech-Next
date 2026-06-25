'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Verified mapping path janii g
import { 
  Target, 
  GraduationCap, 
  Compass, 
  Briefcase, 
  TrendingUp, 
  Shuffle, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface WhoShouldJoinProps {
  slug: string;
}

export default function WhoShouldJoin({ slug }: WhoShouldJoinProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Pure focused profile segmentation dataset
  const targetProfiles = [
    {
      id: "students",
      title: "University Students",
      badge: "Skill Sync",
      desc: "Bache jo local degrees ke purane curriculum se pareshan hain aur academia ke sath-sath high-paying marketable skills deploy karna chahte hain.",
      icon: GraduationCap,
      gridSpan: "md:col-span-3 lg:col-span-3"
    },
    {
      id: "beginners",
      title: "Absolute Beginners",
      badge: "Zero to One",
      desc: "Jinhe coding ka 'C' bhi nahi pata. Hum bilkul base zero se logic building aur problem-solving paradigms start karenge.",
      icon: Compass,
      gridSpan: "md:col-span-3 lg:col-span-3"
    },
    {
      id: "freelancers",
      title: "Traditional Freelancers",
      badge: "Stack Upgrade",
      desc: "Jo WordPress ya basic templates par stuck hain aur ab modern architecture seekh kar Upwork aur Fiverr par premium international clients scale karna chahte hain.",
      icon: Briefcase,
      gridSpan: "md:col-span-2 lg:col-span-2"
    },
    {
      id: "job-seekers",
      title: "Active Job Seekers",
      badge: "Portfolio Ready",
      desc: "Jo tech interviews aur test assignments clear karne ke liye ek solid, production-ready, dynamic GitHub active portfolio design karna chahte hain.",
      icon: TrendingUp,
      gridSpan: "md:col-span-2 lg:col-span-2"
    },
    {
      id: "switchers",
      title: "Career Switchers",
      badge: "Domain Pivot",
      desc: "Non-tech fields (Sales, Marketing, Admin) ya puraani tech domains se nikal kar software industry ke high-growth segment mein shift hone wale professionals.",
      icon: Shuffle,
      gridSpan: "md:col-span-2 lg:col-span-2"
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Background Micro Tech Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-primary/[0.01] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Title Row Framework */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" /> Ideal Candidate Fit
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Is This Sandbox Ecosystem <br /> <span className="text-primary">Built For You?</span>
            </h2>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-border/60 pl-4 md:pl-0 md:pr-4 py-1">
            <span className="text-xs font-mono font-black text-muted-foreground tracking-widest uppercase block mb-1">[ AUDIENCE SEGMENTS ]</span>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Hum koi generic tutorials nahi bech rahe. Agar aap niche diye gaye 5 categories mein se kisi ek mein fit hote hain, then welcome home.
            </p>
          </div>
        </div>

        {/* 
          ASYMMETRIC MULTI-SPAN MOCK GRID:
          Mobile: Clean 1-column responsive layout cards.
          Tablet/Desktop: 6-column balanced layout matching 3+3 and 2+2+2 structural symmetry.
        */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {targetProfiles.map((profile) => {
            const IconComponent = profile.icon;
            return (
              <div
                key={profile.id}
                className={`group border border-border/60 bg-card/40 hover:bg-card hover:border-primary/20 p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${profile.gridSpan}`}
              >
                {/* Micro Tech Ambient Highlight Ring */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.01] group-hover:bg-primary/[0.03] blur-xl rounded-full transition-all duration-500" />
                
                <div>
                  {/* Card Header Module */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="p-2.5 rounded-xl bg-muted border border-border/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground/80 border border-border/20">
                      {profile.badge}
                    </span>
                  </div>

                  {/* Card Core Content Text Segment */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-1">
                      {profile.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                      {profile.desc}
                    </p>
                  </div>
                </div>

                {/* Card Interactive Footer Anchor */}
                <div className="mt-6 pt-3 border-t border-border/30 flex items-center justify-between text-[10px] font-mono text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors" /> Direct Track Match
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}