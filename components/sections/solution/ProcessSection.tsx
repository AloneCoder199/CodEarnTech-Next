"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Layout, Code, CheckCircle, Rocket, LifeBuoy } from "lucide-react";

const STEPS = [
  { title: "Discovery", desc: "Understanding the core business requirements.", icon: Search },
  { title: "Planning", desc: "Defining architectural roadmaps.", icon: PenTool },
  { title: "Design", desc: "Crafting premium UX/UI interfaces.", icon: Layout },
  { title: "Development", desc: "Building with scalable clean code.", icon: Code },
  { title: "Testing", desc: "Ensuring zero-bug performance.", icon: CheckCircle },
  { title: "Launch", desc: "Deploying to production infrastructure.", icon: Rocket },
  { title: "Support", desc: "Continuous optimization and monitoring.", icon: LifeBuoy },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-24 bg-background relative">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4">The Workflow.</h2>
          <p className="text-muted-foreground">Engineering excellence, step by step.</p>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 bg-primary origin-top"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between sm:justify-normal">
                {/* Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-[5px] w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" />

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`w-[calc(100%-40px)] sm:w-[40%] ${idx % 2 === 0 ? "sm:ml-auto sm:pl-12" : "sm:mr-auto sm:pr-12 sm:text-right"}`}
                >
                  <div className="p-6 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all">
                    <step.icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}