'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verified janii g
import { 
  CheckCircle, 
  Laptop, 
  Wifi, 
  Languages, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';

interface CourseRequirementsProps {
  slug: string;
}

export default function CourseRequirements({ slug }: CourseRequirementsProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Straightforward minimal requirements dataset
  const checklist = [
    {
      id: "laptop",
      title: "Personal Laptop or PC",
      desc: "Minimum 4GB RAM (8GB recommended). Any basic dual-core processor will work perfectly for development.",
      icon: Laptop
    },
    {
      id: "internet",
      title: "Stable Internet",
      desc: "A reliable connection for attending classes, downloading packages, and pushing code repositories.",
      icon: Wifi
    },
    {
      id: "english",
      title: "Basic English Reading",
      desc: "You don't need fluent speaking skills. Just basic reading to understand documentation and error logs.",
      icon: Languages
    },
    {
      id: "commitment",
      title: "Strong Commitment",
      desc: "At least 2 hours of daily dedicated practice. Consistency matters more than high grades here.",
      icon: Flame
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Balanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start max-w-4xl mx-auto">
          
          {/* LEFT SIDE: Heading and Frame Pitch */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold font-mono uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Prerequisites
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              What You Need To <br /> <span className="text-primary">Get Started</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              You do not need prior coding experience or expensive gaming computers. If you meet these 4 simple checkpoints, you are completely ready to join the academy ecosystem.
            </p>
          </div>

          {/* RIGHT SIDE: The Requirements Grid Stack */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {checklist.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  className="group p-5 bg-card/40 border border-border/60 hover:border-primary/20 rounded-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Icon Header block */}
                    <div className="p-2.5 w-10 h-10 rounded-xl bg-muted border border-border/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {/* Content Block */}
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tiny Status Tag */}
                  <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/40 group-hover:text-emerald-500/60 transition-colors">
                    <CheckCircle className="w-3 h-3 text-muted-foreground/30 group-hover:text-emerald-500/50 transition-colors" /> Required Asset
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