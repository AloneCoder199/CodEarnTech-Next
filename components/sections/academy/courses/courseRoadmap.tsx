import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path configuration janii g
import { Terminal, Code2, FolderGit2, CheckCircle, Flame, Calendar } from 'lucide-react';

interface CourseRoadmapProps {
  slug: string;
}

export default function CourseRoadmap({ slug }: CourseRoadmapProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Pure dynamic structural data array for 4 weeks roadmap
  const timelineData = [
    {
      week: "Week 01",
      phaseTitle: "Foundations & Structural Architecture",
      skills: ["HTML / Semantic Markup", "CSS3 / Flexbox & Grid Systems", "Responsive Design Systems"],
      projects: ["Project #1: Modern Corporate Landing Page", "Project #2: High-Converting Premium Product Showcase"]
    },
    {
      week: "Week 02",
      phaseTitle: "Dynamic Mechanics & Collaborative Tooling",
      skills: ["JavaScript (ES6+) Core Logic", "GitHub Workflow & Version Control", "AI Prompt Engineering Tools"],
      projects: ["Project #3: Interactive Dynamic Web App", "Project #4: Real-world Team Repo Collaboration", "Project #5: AI-Assisted Component Architecture"]
    },
    {
      week: "Week 03",
      phaseTitle: "Commercial Scaling & Core Identity",
      skills: ["High-Performance Business Websites", "Portfolio Website Architecture"],
      projects: ["Project #6: Multi-page SaaS Business Hub", "Project #7: Personal Authority Dev Portfolio", "Project #8: Client-Ready Operational Template"]
    },
    {
      week: "Week 04",
      phaseTitle: "Deployment Mechanics & Global Monetization",
      skills: ["Production Level Portfolio Optimization", "GitHub Profile Optimization Matrix", "Freelancing Engines & Client Pitching"],
      projects: ["Project #9: Cloud-Deployed Production Application", "Project #10: Multi-Platform Live Marketplace Launch"]
    }
  ];

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40">
      
      {/* Background Decorative Matrix Line */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" /> 30-Day Execution Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Complete Training <span className="text-primary">Roadmap</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
            Four weeks of intense, high-octane building. No filler lectures—just pure architectural advancement and live project rollouts.
          </p>
        </div>

        {/* Pipeline Timeline Stream Wrapper */}
        <div className="relative border-l border-border/80 ml-4 sm:ml-12 pl-6 sm:pl-12 space-y-16">
          
          {timelineData.map((phase, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Glowing Node Dot Counter */}
              <div className="absolute -left-[35px] sm:-left-[59px] top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary shadow-sm shadow-primary/40 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-200">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Main Week Timeline Card Layout */}
              <div className="space-y-6">
                
                {/* Meta Row: Week Tag & Phase Title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="inline-block text-xs font-mono font-black tracking-widest bg-muted text-foreground border border-border/60 px-3 py-1 rounded-lg w-max shadow-sm">
                    {phase.week}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {phase.phaseTitle}
                  </h3>
                </div>

                {/* Sub Grid Split Block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  
                  {/* Skill Core Targets Column Block (Left 5 Columns) */}
                  <div className="md:col-span-5 p-5 sm:p-6 rounded-2xl bg-card border border-border/50 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-3">
                        <Code2 className="w-3.5 h-3.5" /> Core Engineering Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted/60 border border-border/40 text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-muted"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/40 uppercase">
                      // Stack Layer Loaded
                    </div>
                  </div>

                  {/* Production Builds Output Column Block (Right 7 Columns) */}
                  <div className="md:col-span-7 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-card to-muted/20 border border-border/60 flex flex-col justify-between space-y-4 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-[10px] font-mono font-bold text-emerald-500/20 tracking-wider">
                      [ SHIPPED ]
                    </div>
                    
                    <div>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1.5 mb-3">
                        <FolderGit2 className="w-3.5 h-3.5" /> Production Buildouts
                      </h4>
                      <ul className="space-y-2.5">
                        {phase.projects.map((proj, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs font-medium text-foreground leading-relaxed">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{proj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-[10px] font-mono text-emerald-500/60 flex items-center gap-1">
                      <Terminal className="w-3 h-3" /> Status: Compile Success
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Bottom Callout Banner element */}
        <div className="mt-20 p-6 rounded-[2rem] bg-muted/30 border border-border/50 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            <Flame className="w-4 h-4 text-primary inline-block mr-1.5 -translate-y-0.5" />
            **Note:** This is a zero-fluff pipeline. Missing 2 consecutive execution periods without code submissions will flag your repo visibility inside CodEarn Tech systems.
          </p>
        </div>

      </div>
    </section>
  );
}