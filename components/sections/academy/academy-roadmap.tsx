"use client";

const roadmapSteps = [
  {
    phase: "01",
    title: "Learn",
    tag: "Deep Architecture Foundations",
    desc: "No basic loops or syntax cramming. Master Next.js 15 App Router internals, complex design patterns, state engineering, and distributed database schemas.",
    color: "from-primary to-primary/60"
  },
  {
    phase: "02",
    title: "Build",
    tag: "Production-Grade Engineering",
    desc: "Ship multi-tenant enterprise software systems from scratch. Implement 100% automation testing coverages, strict type-safety rules, and optimized query structures.",
    color: "from-chart-4 to-chart-4/60"
  },
  {
    phase: "03",
    title: "Portfolio",
    tag: "Performance-Backed Proofs",
    desc: "Deploy your systems onto global edge networks. Optimize your apps for sub-40ms API server latencies and verified 100% Core Web Vitals Lighthouse scores.",
    color: "from-chart-2 to-chart-2/60"
  },
  {
    phase: "04",
    title: "Internship",
    tag: "Internal Dev Sprint Wing",
    desc: "Step directly into our internal agile workspace. Experience real code push workflows, professional peer pull-request (PR) reviews, and live architecture standups.",
    color: "from-primary to-accent"
  },
  {
    phase: "05",
    title: "Client Projects",
    tag: "Real Market Pressure Handling",
    desc: "Interface with live commercial briefs. Gather requirements directly, manage system scoping limits, and deploy feature patches under absolute live production conditions.",
    color: "from-chart-5 to-chart-5/60"
  },
  {
    phase: "06",
    title: "Job / Freelancing",
    tag: "The Ultimate Market Launch",
    desc: "Enter the global market not as a clueless junior engineer searching for tutorials, but as an authoritative software architect ready to handle real enterprise-level traffic.",
    color: "from-foreground to-muted-foreground"
  }
];

export default function AcademyRoadmap() {
  return (
    <section className="w-full bg-background text-foreground py-24 px-4 sm:px-6 overflow-hidden relative">
      
      {/* Background Subtle Laser Glow Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Head - Crisp Apple Styling */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            The Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-balance">
            The Visual Roadmap From <br />
            Zero To Production Deployer.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground font-light max-w-md mx-auto text-balance">
            Six structured development phases designed to systematically eliminate tutorial dependency and transform your codebase capabilities.
          </p>
        </div>

        {/* The Pipeline Container Layout */}
        <div className="relative">
          
          {/* Central Connecting Core Laser Line (Stays constant left on mobile, center on desktop) */}
          <div className="absolute top-4 bottom-4 left-4 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-chart-4/40 to-border/20 pointer-events-none" />

          {/* Steps Wrapper Loop */}
          <div className="space-y-12 md:space-y-16">
            {roadmapSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row items-start justify-between relative pl-12 md:pl-0 w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* High-Tech Tracking Sequence Node Ring */}
                  <div className="absolute left-[5px] md:left-1/2 md:-translate-x-1/2 top-1.5 z-20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center transition-all duration-300 hover:border-primary group">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>

                  {/* Content Application Tile Block */}
                  <div className="w-full md:w-[45%] group">
                    <div className="bg-card border border-border/70 rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.02] relative overflow-hidden">
                      
                      {/* Accent Corner Gradient Strip */}
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${step.color}`} />

                      {/* Header Segment info */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-xs font-mono font-bold text-primary/80">
                          PHASE // {step.phase}
                        </span>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50 uppercase tracking-wider">
                          {step.tag}
                        </span>
                      </div>

                      {/* Main Title heading */}
                      <h3 className="text-xl font-sans font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>

                      {/* Descriptive contextual brief */}
                      <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                        {step.desc}
                      </p>

                    </div>
                  </div>

                  {/* Spacer Column element for desktop balance layout symmetry */}
                  <div className="hidden md:block w-[45%]" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}