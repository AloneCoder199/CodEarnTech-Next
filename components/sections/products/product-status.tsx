"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Target,
  TrendingUp,
  Users,
  Sparkles,
  Compass,
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

const focusAreas = [
  {
    icon: Target,
    title: "Match Accuracy",
    description: "Improving the AI match scoring so the right opportunities rise to the top.",
  },
  {
    icon: Sparkles,
    title: "Proposal Quality",
    description: "Making generated proposals sharper, more personalized and more likely to win.",
  },
  {
    icon: Users,
    title: "Real User Feedback",
    description: "Learning from how people actually use GigThink — not from assumptions.",
  },
  {
    icon: TrendingUp,
    title: "Next Features",
    description: "Building the improvements that matter most to active users.",
  },
];

export default function ProductStatus() {
  return (
    <section
      id="product-status"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
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
            09 — Product Status
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Where GigThink is{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              today.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            We&apos;d rather tell you exactly where we are — than make
            promises we can&apos;t keep.
          </motion.p>
        </motion.div>

        {/* ============================================================
            STATUS CARD — LIVE
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-20 max-w-5xl md:mt-24"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-green-500/30 bg-gradient-to-br from-card via-card to-green-500/5 backdrop-blur-sm">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0" />

            {/* Inner glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green-500/15 blur-[100px]" />

            <div className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-12 md:gap-10 md:p-12 lg:p-14">
              {/* Left — Status + Stage */}
              <div className="md:col-span-7">
                {/* LIVE badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-bold tracking-widest text-green-600 uppercase dark:text-green-400">
                    Live
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  GigThink is available today.
                </h3>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Freelancers and agencies can sign up, connect their skills
                  and start discovering opportunities right now.
                </p>

                {/* Current Stage */}
                <div className="mt-8 rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Compass className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                      Current Stage
                    </p>
                  </div>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    Live MVP — actively improving
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                    Built in the open. Shipped, tested and refined with real users.
                  </p>
                </div>
              </div>

              {/* Right — Status visual: Stacked indicators */}
              <div className="md:col-span-5">
                <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm">
                  {/* Grid inside */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="relative">
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                      Status Overview
                    </p>

                    <ul className="mt-5 space-y-4">
                      {[
                        { label: "Public Launch", value: "Live" },
                        { label: "User Signups", value: "Open" },
                        { label: "Product Focus", value: "Refining" },
                        { label: "Next Release", value: "In Progress" },
                      ].map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <span className="text-xs text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            FOCUS AREAS — 4 cards
        ============================================================ */}
        <div className="mt-20 md:mt-28">
          {/* Sub-heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              What we&apos;re focused on right now
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="mt-3 text-sm text-muted-foreground md:text-base"
            >
              The work happening behind the scenes — one improvement at a time.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <motion.div
                  key={area.title}
                  variants={fadeInUp}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Top strip on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Title */}
                  <h4 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {area.title}
                  </h4>

                  {/* Divider */}
                  <div className="mt-3 h-px w-8 bg-primary/40 transition-all duration-500 group-hover:w-14" />

                  {/* Description */}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ============================================================
            BOTTOM STATEMENT — Honest Positioning
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-20 md:mt-28"
        >
          {/* Soft glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-32 w-2/3 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>

            {/* Statement */}
            <p className="mt-8 text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl">
              We&apos;re continuing to improve GigThink based on{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                real usage and real feedback.
              </span>
            </p>

            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              No vanity metrics. No inflated numbers. Just honest work, shipped
              consistently.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}