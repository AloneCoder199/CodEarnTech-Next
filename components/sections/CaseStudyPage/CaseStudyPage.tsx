import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "../../../lib/studydata";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center md:text-left">
        <span className="text-primary font-mono tracking-widest text-sm uppercase block mb-3 font-semibold">
          Our Proven Impact
        </span>
        <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight max-w-4xl leading-tight">
          Products we built <br className="hidden md:inline" />
          <span className="text-muted-foreground">that scale to millions.</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl font-light">
          We combine hyper-clean engineering with minimalist design aesthetics to solve complex business bottlenecks.
        </p>
      </section>

      {/* Production-Grade Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((project, index) => {
            // First item spreads larger horizontally for editorial typography hierarchy
            const isLarge = index === 0;
            return (
              <Link
                href={`/case-studies/${project.id}`}
                key={project.id}
                className={`group relative rounded-[2rem] overflow-hidden border border-border/80 bg-card p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] hover:border-primary/20 hover:-translate-y-1 ${
                  isLarge ? "md:col-span-2 min-h-[32rem]" : "min-h-[26rem]"
                }`}
              >
                {/* Image Dynamic Overlay Background */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500 mix-blend-luminosity dark:mix-blend-overlay">
                  <Image 
                    src={project.coverImage} 
                    alt={`${project.title} abstract background preview`}
                    fill
                    sizes={isLarge ? "(max-w-768px) 100vw, 66vw" : "(max-w-768px) 100vw, 33vw"}
                    priority={index === 0}
                    className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  {/* Premium Dark Gradient Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-transparent" />
                </div>

                {/* Content Layer (Kept relative to stay above background image) */}
                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-muted/60 dark:bg-muted/20 backdrop-blur-md px-3 py-1 rounded-full">
                      {project.client}
                    </span>
                    <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </div>
                  <h3 className={`font-sans font-bold text-foreground mt-6 tracking-tight ${isLarge ? "text-3xl md:text-5xl" : "text-2xl"}`}>
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground font-light text-base max-w-lg leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* High-Impact Micro Metrics inside grid item footer */}
                <div className="relative z-10 mt-12 pt-6 border-t border-border/40 flex items-center gap-8">
                  {project.metrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
                        {metric.value}
                      </div>
                      <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
