'use client';

import React, { useState, useRef } from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verification verified janii g
import { 
  FolderCode, 
  Terminal, 
  User2, 
  Building2, 
  GraduationCap, 
  Utensils, 
  Dumbbell, 
  Sparkles, 
  ShoppingBag, 
  Layers, 
  Globe,
  MonitorSmartphone,
  ChevronRight
} from 'lucide-react';

interface ProjectsBuildProps {
  slug: string;
}

export default function ProjectsBuild({ slug }: ProjectsBuildProps) {
  const course = getCourseBySlug(slug);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!course) {
    notFound();
  }

  const projectsData = [
    {
      id: "01",
      title: "High-Converting Landing Page",
      desc: "A premium marketing layout optimized heavily for conversions, fluid viewports, and modern copy tracking loops.",
      icon: Terminal,
      skills: ["HTML5 Semantics", "CSS3 Mechanics", "Flexbox", "Viewport Scales"]
    },
    {
      id: "02",
      title: "Personal Authority Dev Portfolio",
      desc: "Your primary digital command center displaying live codebase repositories, clean animations, and contact systems.",
      icon: User2,
      skills: ["CSS Grid Systems", "Typography", "Micro Animations", "Dark Accents"]
    },
    {
      id: "03",
      title: "Corporate Business Hub Portal",
      desc: "Multi-sectional corporate website optimized for fast loading and structural branding visual layouts.",
      icon: Building2,
      skills: ["Advanced Flexbox", "Semantics", "Grid layers", "Bento Layouts"]
    },
    {
      id: "04",
      title: "Institutional Multi-Tier School Site",
      desc: "Information-heavy layout architecture built with clean visual hierarchy, navigation trees, and asset maps.",
      icon: GraduationCap,
      skills: ["Content Hierarchy", "a11y Design", "Table Structs", "Forms"]
    },
    {
      id: "05",
      title: "Fluid Restaurant Menu & Booking UI",
      desc: "A gorgeous luxury food interface featuring sticky interactive categories and clean order sheets.",
      icon: Utensils,
      skills: ["Absolute Positions", "Aspect Ratios", "Overlays", "Components"]
    },
    {
      id: "06",
      title: "Apple-Inspired Creative Agency Site",
      desc: "Ultra-premium minimal styling layout with high-contrast cards, sleek dividers, and aesthetic grids.",
      icon: Sparkles,
      skills: ["Tailwind Utilities", "Fluid Paths", "Transitions", "Glow States"]
    },
    {
      id: "07",
      title: "High-Performance Athletic Gym Site",
      desc: "A bold, dark-themed sport environment containing dynamic schedule rows and dynamic utility cards.",
      icon: Dumbbell,
      skills: ["Vector Layouts", "Grid Align", "Interactivity", "Flex Rows"]
    },
    {
      id: "08",
      title: "E-Commerce Storefront UI",
      desc: "Comprehensive product grid structures with persistent multi-view sorting filters and product cards.",
      icon: ShoppingBag,
      skills: ["Matrix Grids", "Card Actions", "Badging Logic", "Responsive"]
    },
    {
      id: "09",
      title: "Premium Micro-SaaS Landing Page",
      desc: "Futuristic software product layout featuring high-end bento rows, interactive feature blocks, and pristine pricing sections.",
      icon: Layers,
      skills: ["Bento Grids", "Border Masks", "CTA Triggers", "Glassmorphism"]
    },
    {
      id: "10",
      title: "Personal Branding Web Ecosystem",
      desc: "An authoritative premium networking layout connecting all your developed live links into a secure presentation deck.",
      icon: Globe,
      skills: ["DNS Pipelines", "GitHub Engine", "SEO Document Meta", "Ship Validate"]
    }
  ];

  // High-performance real-time scroll matrix positioning tracker
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const totalWidth = container.scrollWidth - container.clientWidth;
    
    if (totalWidth <= 0) return;

    // Calculate precision index based on uniform child element boundaries
    const index = Math.round((scrollLeft / totalWidth) * (projectsData.length - 1));
    
    if (index >= 0 && index < projectsData.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Structural Neon Background Matrix Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading Row Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-24">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
              <FolderCode className="w-3.5 h-3.5" /> Core Build Pipeline
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              10 Production Apps <br />You Will <span className="text-primary">Engineer</span>
            </h2>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-border/60 pl-4 md:pl-0 md:pr-4 py-1">
            <span className="text-xs font-mono font-black text-muted-foreground tracking-widest uppercase block mb-1">[ AUDITED CRITERIA ]</span>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Swipe smoothly to explore the fully functional applications crafted from clean terminal code executions.
            </p>
          </div>
        </div>

        {/* Dynamic Swipe Assist Indicator Box for Mobile Devices */}
        <div className="flex lg:hidden items-center justify-between px-2 mb-4 text-xs font-mono font-bold text-muted-foreground/60 tracking-wider uppercase">
          <span className="flex items-center gap-1">Swipe to view builds</span>
          <span className="flex items-center text-primary font-bold transition-all duration-300">
            {activeIndex + 1} of {projectsData.length} <ChevronRight className="w-3.5 h-3.5 ml-0.5 animate-pulse" />
          </span>
        </div>

        {/* Real-time Tracking Scroll Wrapper */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 pb-8 px-2 -mx-4 sm:mx-0 lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:gap-8 lg:pb-0"
        >
          {projectsData.map((project, idx) => {
            const ProjectIcon = project.icon;
            return (
              <div 
                key={project.id} 
                className="group flex flex-col justify-between bg-card border border-border/60 rounded-[2rem] p-4 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/[0.02] relative overflow-hidden shrink-0 w-[86vw] sm:w-[420px] lg:w-auto snap-center snap-always"
              >
                <div>
                  {/* PREMIUM CSS BROWSER MOCKUP CONTAINER */}
                  <div className="w-full h-44 rounded-2xl bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] bg-muted/40 border border-border/40 relative flex items-center justify-center overflow-hidden mb-5 transition-all duration-500 group-hover:bg-muted/20">
                    
                    <div className="absolute top-3 left-3 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    </div>
                    
                    <div className="absolute top-3 right-4 text-[9px] font-mono font-bold text-muted-foreground/30 uppercase tracking-widest">
                      BUILD_{project.id}
                    </div>

                    <div className="absolute w-16 h-16 rounded-full bg-primary/5 blur-md group-hover:bg-primary/10 transition-colors duration-500" />
                    <ProjectIcon className="w-8 h-8 text-muted-foreground/60 group-hover:text-primary group-hover:scale-110 transition-all duration-500 relative z-10" />

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-4 rounded-md bg-card/80 border border-border/30 flex items-center px-2 justify-between">
                      <div className="flex items-center gap-1 w-full">
                        <MonitorSmartphone className="w-2.5 h-2.5 text-muted-foreground/40" />
                        <span className="text-[7px] text-muted-foreground/50 font-mono tracking-wide truncate w-32">
                          https://project-{project.id}.codearn.live
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PROJECT TITLE BLOCK */}
                  <div className="px-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                        Project #{project.id}
                      </span>
                    </div>
                    <h3 className="text-base font-black tracking-tight text-foreground leading-snug pt-1 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed h-16 overflow-hidden line-clamp-3">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* SKILLS LEARNED MATRIX CHIP LIST */}
                <div className="mt-6 pt-4 border-t border-border/40 px-1">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-muted-foreground/60 block mb-2">
                    Skills Unlocked:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Pagination Dots Matrix for Mobile Navigation */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 mt-4">
          {projectsData.map((_, dotIdx) => (
            <span 
              key={dotIdx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex 
                  ? 'w-6 bg-primary' 
                  : 'w-1.5 bg-border hover:bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}