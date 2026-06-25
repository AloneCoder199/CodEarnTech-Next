'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verification verified janii g
import { 
  Cpu, 
  Code2, 
  Terminal, 
  Globe, 
  Layers, 
  Sparkles, 
  GitBranch, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface ToolsUsedProps {
  slug: string;
}

export default function ToolsUsed({ slug }: ToolsUsedProps) {
  const course = getCourseBySlug(slug);
  const [selectedTool, setSelectedTool] = useState<string | null>("vscode");

  if (!course) {
    notFound();
  }

  // Hyper-targeted engineering tooling data stack
  const toolsDataset = [
    {
      id: "vscode",
      name: "VS Code",
      category: "IDE / Environment",
      runtimeContext: "Aapka primary code engine jahan industry-standard keyboard shortcuts, structural linting, aur ultra-fast debugging protocols set honge.",
      icon: Code2,
      accent: "from-blue-500/10 to-cyan-500/5 text-blue-400 border-blue-500/20"
    },
    {
      id: "github",
      name: "GitHub",
      category: "Version Control",
      runtimeContext: "Production code repositories ka markaz. Branches management, code backup, aur automated action pipelines deploy karna seekhein.",
      icon: GitBranch,
      accent: "from-purple-500/10 to-pink-500/5 text-purple-400 border-purple-500/20"
    },
    {
      id: "html",
      name: "HTML5",
      category: "Core Structure",
      runtimeContext: "Web application ka strict semantic blueprint infrastructure jo modern SEO crawler bots aur accessible web parsing standards par poora utray.",
      icon: Terminal,
      accent: "from-orange-500/10 to-amber-500/5 text-orange-400 border-orange-500/20"
    },
    {
      id: "css",
      name: "CSS3 / Tailwind",
      category: "Styling Matrix",
      runtimeContext: "Advanced layouts, micro-interactions, responsive aspect-ratios, aur modern variables based dark mode engineering design framework.",
      icon: Layers,
      accent: "from-cyan-500/10 to-blue-500/5 text-cyan-400 border-cyan-500/20"
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Engine Runtime",
      runtimeContext: "Core execution logic, complex asynchronous state mapping, API integration layers, aur real-time data handling calculations.",
      icon: Zap,
      accent: "from-yellow-500/10 to-amber-500/5 text-yellow-400 border-yellow-500/20"
    },
    {
      id: "aitools",
      name: "AI Copilots / IDEs",
      category: "Velocity Tools",
      runtimeContext: "Cursor, v0, aur customized advanced LLM text prompts ka use kar ke boilerplate code generation speed ko 10x scale karne ka tarika.",
      icon: Sparkles,
      accent: "from-emerald-500/10 to-teal-500/5 text-emerald-400 border-emerald-500/20"
    },
    {
      id: "vercel",
      name: "Vercel Edge",
      category: "Cloud Deployment",
      runtimeContext: "Serverless server endpoints, static assets loading optimization, aur continuous server integrations directly linked with main GitHub branches.",
      icon: Globe,
      accent: "from-indigo-500/10 to-violet-500/5 text-indigo-400 border-indigo-500/20"
    },
    {
      id: "netlify",
      name: "Netlify",
      category: "Static Cloud",
      runtimeContext: "Production build static content edge networking platforms par globally secure redirect rule-maps ke sath instant setup framework.",
      icon: Cpu,
      accent: "from-teal-500/10 to-cyan-500/5 text-teal-400 border-teal-500/20"
    }
  ];

  const currentActiveTool = toolsDataset.find(t => t.id === selectedTool) || toolsDataset[0];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Structural Mesh Ambient Backlight */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-primary/[0.01] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading Module Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" /> Industry Toolkit
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Production Stack <br /> <span className="text-primary">& Automation Tools</span>
            </h2>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-border/60 pl-4 md:pl-0 md:pr-4 py-1">
            <span className="text-xs font-mono font-black text-muted-foreground tracking-widest uppercase block mb-1">[ THE ARMORY ]</span>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Hum purani theoretical tech standard books nahi open karte. Aap in exact software stacks par direct code deploy karna seekhein ge jo high-tier agencies use karti hain.
            </p>
          </div>
        </div>

        {/* 
          COMPACT GRID INTERACTION MATRIX:
          Left Pane: 2-column micro buttons array (optimized heavily for mobile interaction).
          Right Pane: Context inspector terminal that avoids vertical text bloat.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-4xl mx-auto items-start">
          
          {/* LEFT INTERACTIVE TOGGLE TILES PANEL */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 w-full">
            {toolsDataset.map((tool) => {
              const ToolIcon = tool.icon;
              const isSelected = selectedTool === tool.id;
              
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl text-left border transition-all duration-300 relative group overflow-hidden ${
                    isSelected 
                      ? `bg-gradient-to-br ${tool.accent} border-primary/40 shadow-md` 
                      : 'bg-card/40 border-border/60 hover:border-border hover:bg-card/80'
                  }`}
                >
                  <div className={`p-2 rounded-lg border transition-colors ${
                    isSelected 
                      ? 'bg-background border-primary/20 text-primary' 
                      : 'bg-muted/80 border-border/40 text-muted-foreground group-hover:text-foreground'
                  }`}>
                    <ToolIcon className="w-4 h-4" />
                  </div>
                  
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate">{tool.name}</h4>
                    <p className="text-[9px] font-mono text-muted-foreground/60 tracking-wider uppercase truncate">{tool.category}</p>
                  </div>

                  {/* Absolute edge indicator micro line */}
                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT VIEWPORT INLINE CONTEXT INSPECTOR INSPECTION FRAME */}
          <div className="lg:col-span-5 w-full">
            <div className="border border-border/60 bg-card p-5 rounded-2xl relative shadow-xl min-h-[170px] sm:min-h-[190px] flex flex-col justify-between">
              
              {/* Terminal Code Mirror Top Dots Frame */}
              <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/40 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 block" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest font-black">[ runtime_logs ]</span>
              </div>

              {/* Dynamic Text Transformation Content Context Block */}
              <div className="space-y-2 animate-fadeIn key={currentActiveTool.id}">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-primary font-bold">{`course_stack_manifest >`}</span>
                  <h3 className="text-xs font-black text-foreground font-mono">{currentActiveTool.name}</h3>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed font-mono pl-1 text-justify">
                  {currentActiveTool.runtimeContext}
                </p>
              </div>

              {/* Action Blueprint Footprint Tag */}
              <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-primary/60">
                <span className="flex items-center gap-1 italic text-muted-foreground/40">
                  Status: 100% Production Ready
                </span>
                <span className="flex items-center gap-0.5 text-primary uppercase font-bold tracking-wider">
                  Live Matrix <ArrowRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}