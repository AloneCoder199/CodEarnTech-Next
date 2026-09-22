"use client";

import { motion } from "framer-motion";
import { Search, Brain, MessageSquare } from "lucide-react";

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

const problems = [
  {
    number: "01",
    icon: Search,
    title: "Finding Opportunities",
    description:
      "Potential clients are scattered across platforms, directories, and business websites. Knowing where to look is half the battle.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Understanding the Lead",
    description:
      "Finding a business isn't enough. You need to understand whether there's a real opportunity worth your time and effort.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Starting the Conversation",
    description:
      "Even when you find a good prospect, writing the right first message or proposal takes time — and getting it wrong wastes it.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            02 — The Problem
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Having a skill is not the same as{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              finding clients.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Freelancers can spend months improving their skills while still
            struggling with the hardest part of freelancing: finding the right
            opportunities and turning them into conversations.
          </motion.p>
        </motion.div>

        {/* 3 Problems Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <motion.div
                key={problem.number}
                variants={fadeInUp}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Top gradient strip on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Floating big number in background */}
                <span className="pointer-events-none absolute right-6 top-4 select-none text-6xl font-bold leading-none text-muted-foreground/10 transition-colors duration-300 group-hover:text-primary/15 md:text-7xl">
                  {problem.number}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="relative mt-7 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {problem.title}
                </h3>

                {/* Divider */}
                <div className="relative mt-4 h-px w-12 bg-primary/40 transition-all duration-500 group-hover:w-20" />

                {/* Description */}
                <p className="relative mt-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============================================================
            BOTTOM STATEMENT
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative mt-20 md:mt-24"
        >
          {/* Soft glow behind */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-2/3 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 px-8 py-12 text-center backdrop-blur-sm md:px-14 md:py-16">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />

            {/* Corner dots */}
            <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-primary/40" />
            <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-primary/40" />
            <div className="absolute bottom-6 left-6 h-2 w-2 rounded-full bg-primary/40" />
            <div className="absolute bottom-6 right-6 h-2 w-2 rounded-full bg-primary/40" />

            <p className="text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl">
              GigThink brings these steps{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                into one workflow.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}