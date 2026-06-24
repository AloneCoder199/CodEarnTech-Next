"use client";

export default function AcademyComparison() {
  return (
    <section className="w-full bg-background text-foreground py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header - App Style Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4">
            The Paradigm Shift
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight leading-none text-balance">
            A Radical Shift in How <br className="hidden sm:inline" />
            Engineers Are Built.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground font-light max-w-xl mx-auto text-balance">
            Traditional education leaves you with an unverified certificate. We embed you inside a production pipeline with real software market metrics.
          </p>
        </div>

        {/* Master Comparison Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          
          {/* LEFT COLUMN: Traditional Path (Muted App Tile - 4 Cols on Desktop) */}
          <div className="lg:col-span-4 bg-muted/20 border border-border/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between opacity-60 hover:opacity-80 transition-all duration-300 shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground/70 uppercase">
                  [ 01 // The Old Loop ]
                </span>
                <span className="w-2 h-2 rounded-full bg-destructive/40" />
              </div>
              
              <h3 className="text-xl font-sans font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors mb-3">
                Traditional Courses
              </h3>
              <p className="text-sm text-muted-foreground/80 font-light mb-8 leading-relaxed">
                Passive consumption patterns optimized for platform watch-time metrics, not system deployment readiness.
              </p>

              {/* Traditional Points Block */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-muted/40 p-4 rounded-2xl border border-border/30">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-[10px] font-bold">✕</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-muted-foreground">Theory-Heavy Sandbox</h4>
                    <p className="text-xs text-muted-foreground/60 mt-1 font-light">Endless video playlists, syntax cramming, and zero architecture contexts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-muted/40 p-4 rounded-2xl border border-border/30">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-[10px] font-bold">✕</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-muted-foreground">The &quot;Todo App&quot; Graveyard</h4>
                    <p className="text-xs text-muted-foreground/60 mt-1 font-light">Building tiny isolated codebases that never handle concurrent active user traffic.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/20 text-[11px] font-mono text-muted-foreground/50">
              Result: Stuck in Tutorial Hell.
            </div>
          </div>

          {/* MIDDLE SEPARATOR: The "VS" Mobile Application Badge */}
          <div className="lg:absolute lg:top-1/2 lg:left-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center z-20 my-2 lg:my-0 select-none">
            <div className="bg-background border-2 border-border text-xs font-mono font-bold tracking-wider px-4 py-2 rounded-full shadow-md text-muted-foreground dark:bg-neutral-900">
              VS
            </div>
          </div>

          {/* RIGHT COLUMN: CodEarn Academy Ecosystem (Premium High-Contrast Bento - 8 Cols on Desktop) */}
          <div className="lg:col-span-8 bg-card border border-border/80 rounded-3xl p-6 md:p-8 relative shadow-2xl flex flex-col justify-between overflow-hidden group">
            {/* Ambient Back Glow - Apple Style Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                  [ 02 // The Engineering Node ]
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              <h3 className="text-2xl font-sans font-bold tracking-tight text-foreground mb-3">
                CodEarn Academy Ecosystem
              </h3>
              <p className="text-sm text-muted-foreground font-light mb-8 max-w-xl leading-relaxed">
                An intense, multi-dimensional execution environment modeled exactly after elite Silicon Valley software engineering teams.
              </p>

              {/* Micro Bento Grid inside Mobile Dashboard Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Quadrant 1: Real Projects */}
                <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <div className="text-primary text-xs font-mono font-bold mb-2">01 / PRODUCTION CORE</div>
                    <h4 className="text-sm font-sans font-semibold text-foreground">Real Enterprise Systems</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
                      Write robust multi-tenant backends, custom state management layers, and secure multi-tier architectural applications.
                    </p>
                  </div>
                </div>

                {/* Quadrant 2: Guaranteed Internal Internship */}
                <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <div className="text-primary text-xs font-mono font-bold mb-2">02 / DEPLOYMENT PIPELINE</div>
                    <h4 className="text-sm font-sans font-semibold text-foreground">Internal Intensive Internship</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
                      Work inside real agile sprints. Participate in code refactoring requests, feature scoping, and system optimization reviews.
                    </p>
                  </div>
                </div>

                {/* Quadrant 3: Data-Backed Portfolio */}
                <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <div className="text-primary text-xs font-mono font-bold mb-2">03 / PERFORMANCE PROOF</div>
                    <h4 className="text-sm font-sans font-semibold text-foreground">Data-Backed Portfolio</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
                      Build production platforms optimized for edge networks, tracking lighthouse vitals, and sub-40ms server latency APIs.
                    </p>
                  </div>
                </div>

                {/* Quadrant 4: Client Experience */}
                <div className="bg-accent/40 dark:bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <div className="text-primary text-xs font-mono font-bold mb-2">04 / THE EDGE FACTOR</div>
                    <h4 className="text-sm font-sans font-semibold text-foreground">Direct Client Experience</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
                      Learn to scope client request changes, handle critical database migration rollbacks, and manage feature delivery demands.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/30 relative z-10 flex items-center justify-between text-xs font-mono">
              <span className="text-primary font-semibold">Model Status: Active Engineering Elite</span>
              <span className="text-muted-foreground/60">Cohort 2026 // Next Level</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}