"use client"; // Added directive because Lucide icons render beautifully with interactive elements

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path check kar lena aapne folder ke mutabiq
import { 
  Calendar, 
  CreditCard, 
  BarChart2, 
  Layers, 
  Award, 
  GraduationCap, 
  ArrowRight,
  Terminal // Fallback generic icon for course tag
} from 'lucide-react';

interface CourseDetailHeroProps {
  slug: string;
}

export default function CourseDetailHero({ slug }: CourseDetailHeroProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Pure data mappings with absolute Lucide elements references
  const quickInfoCards = [
    { id: 1, label: 'Duration', value: course.duration, icon: Calendar, color: 'text-blue-500 bg-blue-500/10' },
    { id: 2, label: 'Investment Fee', value: `${course.discountPrice || course.price} PKR`, icon: CreditCard, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 3, label: 'Skill Level', value: course.level, icon: BarChart2, color: 'text-purple-500 bg-purple-500/10' },
    { id: 4, label: 'Projects Track', value: '10 Real Projects', icon: Layers, color: 'text-amber-500 bg-amber-500/10' },
    { id: 5, label: 'Certification', value: 'Verified Professional', icon: Award, color: 'text-cyan-500 bg-cyan-500/10' },
    { id: 6, label: 'Scholarship', value: 'Top 10 Students', icon: GraduationCap, color: 'text-pink-500 bg-pink-500/10' },
  ];

  return (
    <section className="relative w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
      {/* Dynamic Background Spotlight Glow element */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r ${course.color || 'from-primary/20 to-blue-500/20'} blur-[120px] opacity-20 pointer-events-none rounded-full`} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Micro Badge Element */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 uppercase tracking-wider font-mono">
          <Terminal className="w-3.5 h-3.5" /> 
          <span>{course.tags?.[0] || 'Tech'} Bootcamp 2026</span>
        </div>

        {/* Dynamic Colon Header Splitter Engine */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
          {course.title.includes(':') ? (
            course.title.split(':').map((part, index) => (
              <span 
                key={index} 
                className={index === 1 ? `block bg-gradient-to-r ${course.color || 'from-primary to-blue-500'} bg-clip-text text-transparent mt-2` : ''}
              >
                {part}{index === 0 ? ':' : ''}
              </span>
            ))
          ) : (
            <>
              {course.title}
              <span className={`block bg-gradient-to-r ${course.color || 'from-primary to-blue-500'} bg-clip-text text-transparent mt-2`}>
                {course.shortTitle}
              </span>
            </>
          )}
        </h1>

        <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-8">
          {course.shortDescription}
        </p>

        {/* High-Impact Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/enroll"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
          >
            Enroll In Bootcamp
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <span className="text-xs font-mono text-muted-foreground font-semibold bg-muted/50 border border-border/40 px-3 py-1 rounded-lg">
            ⚡ Limited to 50 Students Only
          </span>
        </div>

        {/* Unified Quick Info Component Cards Mapping Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-left">
          {quickInfoCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id} 
                className="bg-card border border-border/60 rounded-2xl p-4 transition-all duration-300 hover:border-border hover:bg-muted/20 flex flex-col justify-between shadow-sm group"
              >
                <div className={`w-8 h-8 rounded-xl ${card.color} flex items-center justify-center shrink-0 mb-3 transition-transform duration-300 group-hover:scale-105`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                    {card.label}
                  </span>
                  <span className="text-sm font-bold text-foreground block tracking-tight line-clamp-1">
                    {card.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
