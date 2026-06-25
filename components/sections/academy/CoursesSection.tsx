"use client"
import React from 'react';
import Link from 'next/link';
import { courses, ICourse } from '../../../lib/data'; // Adjusted import to match the updated courses array
import { Calendar, Layers, Award, Users, ArrowUpRight, ArrowRight } from 'lucide-react';

export default function CoursesSection() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Live Programs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Available <span className="text-primary">Courses</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Pick a bootcamp, build real-world products, and transition directly into the tech industry.
          </p>
        </div>

        {/* Course Rows Container */}
        <div className="space-y-6">
          {courses.map((course: ICourse) => (
            <div 
              key={course.id}
              className="group relative w-full bg-card border border-border/60 rounded-[2rem] p-4 md:p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
            >
              {/* Dynamic App-Store Row Layout Splitter */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-8">
                
                {/* 1. THUMBNAIL AREA (Dynamic color gradient inject) */}
                <Link href={`/training/${course.slug}`} className="block shrink-0 z-10">
                  <div className={`relative w-full h-32 md:w-56 md:h-36 rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-gradient-to-br ${course.color} flex flex-col justify-between p-4 text-white shadow-md transition-transform duration-500 group-hover:scale-[1.02]`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
                    
                    <span className="text-[10px] font-mono tracking-widest bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full w-fit uppercase font-semibold">
                      {course.duration}
                    </span>
                    
                    <div>
                      <h4 className="text-sm font-bold tracking-tight leading-tight line-clamp-2">
                        {course.shortTitle}
                      </h4>
                      <p className="text-[11px] opacity-80 mt-1 font-mono">
                        10 Production-Grade Apps
                      </p>
                    </div>
                  </div>
                </Link>

                {/* 2. CORE INFORMATION PANEL */}
                <div className="flex-1 flex flex-col justify-between z-10">
                  <div>
                    {/* Course Title and Description */}
                    <Link href={`/training/${course.slug}`} className="hover:text-primary transition-colors inline-block">
                      <h3 className="text-lg md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {course.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary" />
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1 font-medium">
                      {course.shortDescription}
                    </p>

                    {/* Meta Info Matrix Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-4 bg-muted/30 p-3 rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs text-foreground font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs text-foreground font-medium">10 Real Projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs text-foreground font-medium">Verified Certificate</span>
                      </div>
                      <div className="hidden md:flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs text-foreground font-medium">50 Students Only</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. PRICE & CTA ACTION BLOCK */}
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3 pt-3 md:pt-0 border-t border-border/40 md:border-none shrink-0 z-10">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-muted-foreground block">
                      Investment Fee
                    </span>
                    <div className="flex flex-col items-start md:items-end gap-0.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl md:text-2xl font-black text-foreground">
                          {course.discountPrice || course.price}
                        </span>
                        <span className="text-xs font-bold text-primary">PKR</span>
                      </div>
                      {course.discountPrice && (
                        <span className="text-[11px] text-muted-foreground line-through decoration-destructive/60">
                          {course.price} PKR
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Buttons Group */}
                  <div className="flex items-center gap-2 w-fit">
                    <Link 
                      href={`/training/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
                    >
                      Details
                    </Link>
                    <Link 
                      href={`/enroll`}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-md shadow-primary/10"
                    >
                      Enroll <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </div>

              {/* Background Accent Hover Light Glow */}
              <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-primary/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}