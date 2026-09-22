"use client";

import { motion } from "framer-motion";
import {
  Search,
  Zap,
  Brain,
  FileText,
  Trophy,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const flowSteps = [
  {
    number: "01",
    icon: Search,
    label: "Discover",
    description:
      "Find businesses and opportunities from the AI Opportunity Feed.",
  },
  {
    number: "02",
    icon: Zap,
    label: "Match",
    description:
      "See which opportunities actually fit — with match scores and reasoning you can trust.",
  },
  {
    number: "03",
    icon: Brain,
    label: "Analyze",
    description:
      "Understand the client's needs before you reach out.",
  },
  {
    number: "04",
    icon: FileText,
    label: "Propose",
    description:
      "Generate personalized, winning proposals in minutes.",
  },
  {
    number: "05",
    icon: Trophy,
    label: "Win",
    description:
      "Track follow-ups, manage clients, and deliver projects.",
  },
];

export default function ProductFlow() {
  return (
    <section
      id="product-flow"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-medium tracking-[0.25em] text-primary uppercase"
          >
            03 — The Product
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            From prospect to client — in{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              one workspace.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            GigThink structures the entire journey — from finding the right
            opportunity to delivering the project. Five steps. One place.
          </motion.p>
        </motion.div>

        {/* ============================================================
            5-STEP FLOW
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative mt-20 md:mt-28"
        >
          {/* Horizontal connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[4.5rem] hidden lg:block">
            <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === flowSteps.length - 1;

              return (
                <motion.div
                  key={step.label}
                  variants={fadeInUp}
                  className="relative"
                >
                  {/* Card */}
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
                    {/* Top gradient strip on hover */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Icon */}
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Number */}
                    <span className="mt-5 font-mono text-xs font-semibold tracking-widest text-primary">
                      STEP {step.number}
                    </span>

                    {/* Label */}
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {step.label}
                    </h3>

                    {/* Divider */}
                    <div className="mt-4 h-px w-10 bg-primary/40 transition-all duration-500 group-hover:w-16" />

                    {/* Description */}
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between cards (desktop) */}
                  {!isLast && (
                    <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:flex">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-md">
                        <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* Arrow between cards (mobile/tablet) */}
                  {!isLast && (
                    <div className="mt-6 flex justify-center lg:hidden">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-md">
                        <ArrowDown className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ============================================================
            BOTTOM SUMMARY STRIP
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative mt-20 md:mt-24"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-32 w-2/3 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />

            <div className="relative flex flex-col items-center gap-6 px-8 py-10 md:flex-row md:justify-between md:px-12 md:py-12">
              {/* Left — Text */}
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                  The Result
                </p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                  One workflow. From first look to{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    signed project.
                  </span>
                </p>
              </div>

              {/* Right — Flow recap */}
              <div className="flex items-center gap-2">
                {flowSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      {idx < flowSteps.length - 1 && (
                        <span className="text-primary/40">·</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}