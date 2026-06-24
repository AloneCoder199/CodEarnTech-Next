"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Elite enterprise architectural code tokens for highly realistic simulation
const codeStructure = [
  { text: "import ", cl: "text-primary" },
  { text: "{ ", cl: "text-foreground" },
  { text: "Injectable", cl: "text-chart-4 font-medium" },
  { text: ", ", cl: "text-foreground" },
  { text: "SystemPipeline ", cl: "text-chart-4 font-medium" },
  { text: "} ", cl: "text-foreground" },
  { text: "from ", cl: "text-primary" },
  { text: "'@/core/architecture';\n", cl: "text-chart-2" },
  { text: "import ", cl: "text-primary" },
  { text: "{ ", cl: "text-foreground" },
  { text: "RedisCluster ", cl: "text-chart-4 font-medium" },
  { text: "} ", cl: "text-foreground" },
  { text: "from ", cl: "text-primary" },
  { text: "'@/infra/cache';\n\n", cl: "text-chart-2" },
  { text: "@Injectable", cl: "text-accent-foreground font-semibold" },
  { text: "()\n", cl: "text-foreground" },
  { text: "export class ", cl: "text-primary" },
  { text: "CoreEngine ", cl: "text-foreground font-bold" },
  { text: "implements ", cl: "text-primary italic" },
  { text: "ScalableSystem ", cl: "text-chart-4 font-medium" },
  { text: "{\n", cl: "text-foreground" },
  { text: "  private ", cl: "text-primary" },
  { text: "isProductionReady ", cl: "text-muted-foreground" },
  { text: "= ", cl: "text-primary" },
  { text: "true", cl: "text-primary font-semibold" },
  { text: ";\n\n", cl: "text-foreground" },
  { text: "  async ", cl: "text-primary" },
  { text: "deployToEdge", cl: "text-chart-5 font-semibold" },
  { text: "(cohortId: ", cl: "text-foreground" },
  { text: "string", cl: "text-chart-4" },
  { text: "): ", cl: "text-foreground" },
  { text: "Promise", cl: "text-chart-4" },
  { text: "<", cl: "text-foreground" },
  { text: "void", cl: "text-chart-4" },
  { text: "> {\n", cl: "text-foreground" },
  { text: "    // Bypass standard tutorial loops & stream live data traffic\n", cl: "text-muted-foreground/40 italic text-xs" },
  { text: "    const ", cl: "text-primary" },
  { text: "metrics ", cl: "text-foreground" },
  { text: "= ", cl: "text-primary" },
  { text: "await ", cl: "text-primary" },
  { text: "RedisCluster", cl: "text-chart-4" },
  { text: ".", cl: "text-foreground" },
  { text: "getMetrics", cl: "text-chart-5" },
  { text: "();\n\n", cl: "text-foreground" },
  { text: "    if ", cl: "text-primary" },
  { text: "(metrics.", cl: "text-foreground" },
  { text: "errorRate ", cl: "text-muted-foreground" },
  { text: "=== ", cl: "text-primary" },
  { text: "0 ", cl: "text-chart-2" },
  { text: "&& ", cl: "text-primary" },
  { text: "this", cl: "text-primary italic" },
  { text: ".isProductionReady) {\n", cl: "text-foreground" },
  { text: "      await ", cl: "text-primary font-bold animate-pulse" },
  { text: "SystemPipeline.streamTraffic({\n", cl: "text-foreground" },
  { text: "        cluster: ", cl: "text-muted-foreground" },
  { text: "'edge-asia-south',\n", cl: "text-chart-2" },
  { text: "        strictTypeSafety: ", cl: "text-muted-foreground" },
  { text: "true,\n", cl: "text-primary" },
  { text: "        optimizationLevel: ", cl: "text-muted-foreground" },
  { text: "'O3'\n", cl: "text-chart-2" },
  { text: "      });\n", cl: "text-foreground" },
  { text: "    }\n", cl: "text-foreground" },
  { text: "  }\n", cl: "text-foreground" },
  { text: "}", cl: "text-foreground" }
];

export default function AcademyHero() {
  const [typedCount, setTypedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const totalCharacters = codeStructure.reduce((acc, segment) => acc + segment.text.length, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const typingInterval = setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= totalCharacters) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTypedCount(0);
          }, 4000); // Elegant 4 seconds hold on completion
          return prev;
        }
        return prev + 1;
      });
    }, 25); // Faster, sharper 25ms clean typing flow

    return () => clearInterval(typingInterval);
  }, [mounted, totalCharacters, typedCount]);

  let characterCursorCounter = 0;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden pt-32 pb-20 px-6">
      
      {/* Apple-style Soft Blue Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/60 dark:bg-secondary border border-border/80 px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-accent-foreground">
            Cohort 2026 // Limited Seats Available
          </span>
        </div>

        {/* Massive Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-sans font-bold tracking-tighter leading-[1.05] max-w-4xl text-balance">
          Become A Professional <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">Software Engineer</span>, 
          <span className="block text-muted-foreground font-light mt-2">Not Just A Course Student.</span>
        </h1>

        {/* Clean Sub-headline */}
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed text-balance">
          Stop copying repositories and watching endless video playlists. Master actual system architecture, clean enterprise code writing, production scaling, and real CI/CD pipelines through hardcore engineering mentorship.
        </p>

        {/* Action Call buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/enroll"
            className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground font-sans font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/95 hover:scale-[1.02] shadow-xl shadow-primary/20 active:scale-[0.98]"
          >
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            Apply Now
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-transparent border border-border text-foreground font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-accent/40"
          >
            Explore Curriculum
          </Link>
        </div>
      </div>

      {/* Floating Dynamic Terminal Screen Layout */}
      <div className="w-full max-w-4xl mx-auto mt-20 relative px-4 group">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 h-20 w-full" />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-[1.5rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />
        
        <div className="relative border border-border/80 bg-card rounded-[1.5rem] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-left">
          
          {/* Mac window header panel */}
          <div className="bg-muted/80 px-4 py-3 border-b border-border/60 flex items-center justify-between select-none">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive/40 block" />
              <span className="w-3 h-3 rounded-full bg-chart-4/40 block" />
              <span className="w-3 h-3 rounded-full bg-chart-2/40 block" />
            </div>
            <span className="text-muted-foreground/70 font-sans text-xs">core_engine.ts // Elite Engineering Node</span>
            <div className="w-8" />
          </div>
          
          {/* Fixed & Clean Typewriter Box Layout */}
          <div className="p-6 overflow-x-auto min-h-[420px] bg-card/50 flex flex-col justify-start">
            <div className="whitespace-pre font-mono text-xs sm:text-sm tracking-normal leading-relaxed text-muted-foreground m-0 p-0 block">
              {mounted && (
                <>
                  {codeStructure.map((segment, idx) => {
                    if (characterCursorCounter >= typedCount) return null;

                    const segmentLength = segment.text.length;
                    if (characterCursorCounter + segmentLength <= typedCount) {
                      characterCursorCounter += segmentLength;
                      return <span key={idx} className={segment.cl}>{segment.text}</span>;
                    } else {
                      const visibleLength = typedCount - characterCursorCounter;
                      characterCursorCounter += visibleLength;
                      return <span key={idx} className={segment.cl}>{segment.text.slice(0, visibleLength)}</span>;
                    }
                  })}
                  
                  {/* Global Blinking Indicator Caret */}
                  <span 
                    className="inline-block w-[6px] h-[14px] bg-primary ml-0.5 animate-pulse" 
                    style={{ verticalAlign: "baseline" }} 
                  />
                </>
              )}
              
              {!mounted && (
                <span className="text-muted-foreground/30 font-sans text-xs">// Secure architecture instance initializing...</span>
              )}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}