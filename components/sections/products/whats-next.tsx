"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Package, Compass } from "lucide-react";

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
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const principles = [
  {
    number: "01",
    icon: Package,
    title: "More products.",
    description:
      "GigThink is the beginning. We're building software around real problems we discover in the market — not trends.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Stronger CodEarn.",
    description:
      "Growing the company, the products, and the community of builders and creators around them.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Better GigThink.",
    description:
      "Continuous improvement — sharper match scoring, better proposals, and features that real users ask for.",
  },
];

export default function WhatsNext() {
  return (
    <section
      id="whats-next"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            10 — What&apos;s Next
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            What&apos;s next for{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              CodEarn?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            GigThink is only the beginning. Here&apos;s what we&apos;re focused
            on — without promising things before they&apos;re real.
          </motion.p>
        </motion.div>

        {/* ============================================================
            3 PRINCIPLES / DIRECTIONS
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 md:mt-28"
        >
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const isMiddle = index === 1;

            return (
              <motion.div
                key={principle.number}
                variants={fadeInUp}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 md:p-10 ${
                  isMiddle
                    ? "border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 md:-mt-4"
                    : "border-border bg-card/60 hover:border-primary/40 hover:bg-card"
                }`}
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Inner glow (middle) */}
                {isMiddle && (
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                )}

                {/* Header row — Icon + Number */}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 ${
                      isMiddle
                        ? "border-primary/40 bg-primary/15"
                        : "border-primary/20 bg-primary/10 group-hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground/60">
                    {principle.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative mt-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {principle.title}
                </h3>

                {/* Divider */}
                <div className="relative mt-4 h-px w-12 bg-primary/40 transition-all duration-500 group-hover:w-20" />

                {/* Description */}
                <p className="relative mt-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============================================================
            HONEST PROMISE — Full width card
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-20 md:mt-28"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl" />

          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />

            {/* Inner glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-primary/15 blur-[100px]" />

            <div className="relative px-8 py-12 text-center md:px-14 md:py-16">
              {/* Small icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>

              {/* Main statement */}
              <p className="mt-8 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                We won&apos;t announce products before{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  they&apos;re ready.
                </span>
              </p>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                When the next one is real, useful and ready for people —
                you&apos;ll see it here. Not before.
              </p>

              {/* Divider */}
              <div className="mx-auto mt-10 flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-border" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                <div className="h-px w-12 bg-border" />
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="https://gigthink.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Try GigThink
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                </Link>

                <Link
                  href="/founder"
                  className="group/cta2 inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-accent"
                >
                  About CodEarn
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta2:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}