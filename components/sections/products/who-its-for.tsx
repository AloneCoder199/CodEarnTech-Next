"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Rocket,
  Building2,
  Store,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

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

const audiences = [
  {
    number: "01",
    icon: Briefcase,
    title: "Freelancers",
    description:
      "Find better opportunities and spend less time figuring out where to start.",
    highlights: [
      "AI-curated leads",
      "Faster proposals",
      "Client tracking",
    ],
  },
  {
    number: "02",
    icon: Rocket,
    title: "New Freelancers",
    description:
      "Move from learning skills to actively looking for your first clients — with guidance at every step.",
    highlights: [
      "Structured workflow",
      "Proposal templates",
      "Zero overwhelm",
    ],
  },
  {
    number: "03",
    icon: Building2,
    title: "Agencies",
    description:
      "Build a repeatable prospecting and outreach workflow for your team — without juggling five different tools.",
    highlights: [
      "Team workflows",
      "Shared pipeline",
      "Client CRM",
    ],
  },
  {
    number: "04",
    icon: Store,
    title: "Service Businesses",
    description:
      "Discover businesses that may need your services and organize your outreach in one place.",
    highlights: [
      "Local discovery",
      "Outreach tracking",
      "Project management",
    ],
  },
];

export default function WhoItsFor() {
  return (
    <section
      id="who-its-for"
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
            07 — Who It&apos;s For
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Built for people who{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              sell their skills.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Whether you&apos;re just starting out or scaling a team, GigThink
            adapts to how you work.
          </motion.p>
        </motion.div>

        {/* ============================================================
            4 AUDIENCE CARDS
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-28"
        >
          {audiences.map((audience) => {
            const Icon = audience.icon;

            return (
              <motion.div
                key={audience.number}
                variants={fadeInUp}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Top gradient strip on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Floating big number */}
                <span className="pointer-events-none absolute right-5 top-3 select-none text-5xl font-bold leading-none text-muted-foreground/10 transition-colors duration-300 group-hover:text-primary/15 md:text-6xl">
                  {audience.number}
                </span>

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                {/* Title */}
                <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {audience.title}
                </h3>

                {/* Divider */}
                <div className="relative mt-3 h-px w-10 bg-primary/40 transition-all duration-500 group-hover:w-16" />

                {/* Description */}
                <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {audience.description}
                </p>

                {/* Highlights */}
                <ul className="relative mt-5 space-y-1.5 border-t border-border pt-4">
                  {audience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-xs text-foreground/80"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============================================================
            BOTTOM CTA STRIP
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
                  Sound like you?
                </p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                  If you sell your skills,{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    GigThink was built for you.
                  </span>
                </p>
              </div>

              {/* Right — CTA */}
              <Link
                href="https://gigthink.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-2 self-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 md:self-auto"
              >
                Try GigThink
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}