'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verification verified janii g
import { 
  FolderHeart, 
  User, 
  Cpu, 
  Briefcase, 
  Mail, 
  ExternalLink,
  Sparkles,
  Github,
  CheckCircle2,
  Send
} from 'lucide-react';

interface PortfolioPreviewProps {
  slug: string;
}

type TabType = 'about' | 'skills' | 'projects' | 'contact';

export default function PortfolioPreview({ slug }: PortfolioPreviewProps) {
  const course = getCourseBySlug(slug);
  const [activeTab, setActiveTab] = useState<TabType>('about');

  if (!course) {
    notFound();
  }

  // Pure data matrices for live rendering inside device viewport
  const studentSkills = ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Git / GitHub"];
  
  const studentProjects = [
    { title: "SaaS Analytics Dashboard", tech: "Next.js • Supabase" },
    { title: "E-Commerce Fluid Storefront", tech: "Tailwind • REST API" }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Structural Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading Architecture */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <FolderHeart className="w-3.5 h-3.5" /> Live Assets Delivery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            The Personal Portfolio <br className="sm:hidden" />You Will <span className="text-primary">Own</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Tap the device interface buttons to preview the professional web ecosystem you will build and launch.
          </p>
        </div>

        {/* 
          COMPACT SPLIT DESIGN MATRIX:
          Mobile: Single tight container block matching device boundaries.
          Desktop: Clean 2-column dashboard layout (Left: Data Guide, Right: Interactive Device).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          
          {/* Left Block: Information Guideline Indicators (Visible context) */}
          <div className="lg:col-span-5 space-y-4 hidden lg:block">
            <div className="border border-border/60 bg-card/50 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest block">[ PRODUCTION OUTPUT ]</span>
              <h4 className="text-sm font-bold text-foreground">100% Personal Authority Brand</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This is not just a layout assignment. It is an fully optimized developer profile structured to showcase your clean repositories directly to technical recruiters.
              </p>
              <div className="space-y-2 pt-2">
                {['Lightweight Static Engine', 'Fully Responsive Framework', 'Global Cloud Live Deploy'].map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: THE ULTRA-COMPACT PORTFOLIO VIEWPORT DEVICE */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-[340px] sm:max-w-[360px] h-[460px] bg-card border-4 border-muted rounded-[2.5rem] shadow-2xl relative flex flex-col justify-between overflow-hidden group hover:border-border transition-all duration-500">
              
              {/* Simulated Device Top Status Notch Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-muted rounded-b-xl z-30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-card/60 block" />
              </div>

              {/* LIVE VIEWFINDER SCREEN CONTENT PANEL */}
              <div className="w-full flex-1 pt-7 pb-16 px-4 overflow-y-auto scrollbar-none bg-background/40 relative z-10 select-none">
                
                {/* Dynamic Switch System Matrix */}
                {activeTab === 'about' && (
                  <div className="space-y-4 pt-4 animate-fadeIn">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary/30 p-0.5 shadow-md shadow-primary/10">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center font-mono font-black text-sm text-foreground">
                          DEV
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-foreground">Your Name Here</h4>
                        <span className="text-[10px] font-mono text-primary font-bold">Junior Full-Stack Engineer</span>
                      </div>
                    </div>
                    <div className="bg-muted/40 border border-border/30 rounded-xl p-3 text-center">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        "I engineer high-performance web applications using semantic modern code blocks. Certified developer focused on architecture and state delivery pipelines."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-3 pt-4 animate-fadeIn">
                    <div className="flex items-center gap-1.5 border-b border-border/40 pb-2">
                      <Cpu className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-black text-foreground tracking-tight">Verified Tech Stack</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {studentSkills.map((sk, sIdx) => (
                        <div key={sIdx} className="bg-muted/50 border border-border/20 rounded-lg p-2 flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                          <span className="text-[10px] font-medium text-foreground tracking-tight truncate">{sk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-3 pt-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-border/40 pb-2">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-black text-foreground tracking-tight">Production Ecosystem</span>
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground">Live Links</span>
                    </div>
                    <div className="space-y-2">
                      {studentProjects.map((p, pIdx) => (
                        <div key={pIdx} className="bg-muted/30 border border-border/40 p-2.5 rounded-xl flex items-center justify-between gap-2 hover:bg-muted/50 transition-colors">
                          <div className="truncate">
                            <h5 className="text-[11px] font-bold text-foreground truncate">{p.title}</h5>
                            <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{p.tech}</p>
                          </div>
                          <ExternalLink className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-3 pt-4 animate-fadeIn">
                    <div className="flex items-center gap-1.5 border-b border-border/40 pb-2">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-black text-foreground tracking-tight">Secure Communications</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-7 w-full rounded-md bg-muted/40 border border-border/30 px-2 flex items-center text-[9px] text-muted-foreground/40">
                        your.email@domain.com
                      </div>
                      <div className="h-12 w-full rounded-md bg-muted/40 border border-border/30 p-2 text-[9px] text-muted-foreground/40 leading-tight">
                        Type professional inquiries directly here...
                      </div>
                      <button type="button" className="w-full h-7 rounded-md bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm shadow-primary/20">
                        <Send className="w-2.5 h-2.5" /> Dispatch Message
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* 
                PREMIUM iOS PHONE NAVIGATION TAB BAR (Saves Extreme Vertical Space)
                Keeps interaction constrained within single box element.
              */}
              <div className="absolute bottom-0 inset-x-0 h-14 bg-card/90 backdrop-blur-md border-t border-border/60 px-3 flex items-center justify-between z-20">
                {(['about', 'skills', 'projects', 'contact'] as TabType[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-300 ${
                        isActive ? 'text-primary scale-105' : 'text-muted-foreground/60 hover:text-muted-foreground'
                      }`}
                    >
                      {tab === 'about' && <User className="w-4 h-4" />}
                      {tab === 'skills' && <Cpu className="w-4 h-4" />}
                      {tab === 'projects' && <Briefcase className="w-4 h-4" />}
                      {tab === 'contact' && <Mail className="w-4 h-4" />}
                      <span className="text-[9px] font-medium tracking-tight mt-0.5 capitalize">
                        {tab}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}