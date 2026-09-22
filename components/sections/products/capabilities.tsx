"use client";

import { motion } from "framer-motion";
import {
  Rss,
  Sparkles,
  Search,
  FileText,
  Send,
  Wand2,
  Users,
  FolderKanban,
  UserCircle,
  BarChart3,
  Star,
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
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const featured = {
  icon: Sparkles,
  title: "Match Scoring with Reasoning",
  badge: "USP",
  description:
    "Every opportunity comes with a match score and a transparent \u201cWhy This?\u201d breakdown — skill fit, budget, location, competition. So you never waste time on the wrong lead again.",
  highlights: [
    "Match score per opportunity",
    "Transparent reasoning",
    "Save hours of filtering",
  ],
};

const capabilities = [
  {
    icon: Rss,
    title: "AI Opportunity Feed",
    description:
      "Curated, high-match opportunities delivered to you — no more endless scrolling.",
  },
  {
    icon: Search,
    title: "Lead Finder",
    description:
      "Discover potential clients and businesses based on your skills and target market.",
  },
  {
    icon: FileText,
    title: "Proposal Lab",
    description:
      "Generate personalized, winning proposals in minutes — tailored to each opportunity.",
  },
  {
    icon: Send,
    title: "Auto Follow-ups",
    description:
      "Automated reminders ensure no deal slips through the cracks — ever.",
  },
  {
    icon: Wand2,
    title: "AI Parser",
    description:
      "Turn any job description into structured insights — skills, budget, and red flags.",
  },
  {
    icon: Users,
    title: "Client CRM",
    description:
      "Track every client, every conversation, every opportunity — all in one place.",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "Manage active work, deadlines, and deliverables without leaving GigThink.",
  },
  {
    icon: UserCircle,
    title: "Career Profile",
    description:
      "Your professional identity inside GigThink — skills, experience, portfolio.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analytics",
    description:
      "See your proposals, projects, opportunities and results at a glance.",
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            05 — Key Capabilities
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Everything you need to turn{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              skills into income.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Ten core capabilities — each built to remove friction from a
            different part of the freelancing journey.
          </motion.p>
        </motion.div>

        {/* ============================================================
            FEATURED CAPABILITY — Match Scoring (USP)
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative mt-20 md:mt-24"
        >
          <div className="group relative overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

            {/* Inner glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />

            <div className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-12 md:gap-10 md:p-12 lg:p-14">
              {/* Left — Icon + Badge + Text */}
              <div className="md:col-span-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 transition-all duration-300 group-hover:scale-105">
                    <featured.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                      {featured.badge}
                    </span>
                  </div>
                </div>

                <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  {featured.title}
                </h3>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {featured.description}
                </p>

                {/* Highlights */}
                <ul className="mt-7 flex flex-wrap gap-2">
                  {featured.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-foreground/90"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Visual Mock: Score Card */}
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

                  {/* Mock content */}
                  <div className="relative">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        Opportunity
                      </span>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-green-600 dark:text-green-400">
                          Strong 80%
                        </span>
                      </div>
                    </div>

                    {/* Client name */}
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Senior Backend Developer
                    </p>

                    {/* Divider */}
                    <div className="mt-4 h-px bg-border" />

                    {/* Why This label */}
                    <p className="mt-4 text-[10px] font-semibold tracking-widest text-primary uppercase">
                      Why This?
                    </p>

                    {/* Reasons */}
                    <ul className="mt-3 space-y-2">
                      {[
                        "Skill match",
                        "Budget fits",
                        "Location fits",
                        "Low competition",
                      ].map((reason) => (
                        <li
                          key={reason}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span className="h-1 w-1 rounded-full bg-primary" />
                          {reason}
                        </li>
                      ))}
                    </ul>

                    {/* Footer CTA mock */}
                    <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                      <div className="flex h-7 flex-1 items-center justify-center rounded-lg border border-border bg-background/50 text-[10px] font-medium text-muted-foreground">
                        View
                      </div>
                      <div className="flex h-7 flex-1 items-center justify-center rounded-lg bg-primary text-[10px] font-semibold text-primary-foreground">
                        Generate Proposal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            GRID — 9 Capabilities
        ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-10"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;

            return (
              <motion.div
                key={cap.title}
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
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {cap.title}
                </h3>

                {/* Divider */}
                <div className="mt-3 h-px w-8 bg-primary/40 transition-all duration-500 group-hover:w-14" />

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center text-xs tracking-wider text-muted-foreground/70 uppercase md:text-sm"
        >
          All features live today — more coming as we learn from real users.
        </motion.p>
      </div>
    </section>
  );
}