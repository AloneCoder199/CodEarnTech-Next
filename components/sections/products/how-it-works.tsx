"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Zap, FileText, Send, Trophy } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Browse the AI Opportunity Feed — curated matches based on your skills, preferences and market. No more endless scrolling on job boards.",
    image: "/products/gigthink-opportunity-feed.png",
    imageAlt: "GigThink Opportunity Feed with AI-curated matches",
    imageLabel: "Opportunity Feed",
  },
  {
    number: "02",
    icon: Zap,
    title: "Check Your Match Score",
    description:
      "Every opportunity comes with a match score and a clear \u201cWhy This?\u201d breakdown — so you know exactly where you stand before you apply.",
    image: "/products/gigthink-opportunity-feed.png",
    imageAlt: "GigThink match scoring with reasoning breakdown",
    imageLabel: "Match Scoring",
  },
  {
    number: "03",
    icon: FileText,
    title: "Generate Your Proposal",
    description:
      "Open Proposal Lab and generate a personalized, winning proposal in minutes — tailored to the client and the actual job.",
    image: "/products/gigthink-proposal-lab.png",
    imageAlt: "GigThink Proposal Lab — AI proposal generation",
    imageLabel: "Proposal Lab",
  },
  {
    number: "04",
    icon: Send,
    title: "Send and Follow Up",
    description:
      "Send your proposal and let Auto Follow-ups handle the reminders — so no opportunity ever slips through the cracks.",
    image: "/products/gigthink-dashboard.png",
    imageAlt: "GigThink dashboard with follow-up tracking",
    imageLabel: "Auto Follow-ups",
  },
  {
    number: "05",
    icon: Trophy,
    title: "Win, Deliver, Repeat",
    description:
      "Track clients, manage projects, and build a pipeline that keeps your income growing — all from one dashboard.",
    image: "/products/gigthink-dashboard-clean.png",
    imageAlt: "GigThink dashboard — clients, projects and pipeline",
    imageLabel: "Client & Project Dashboard",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
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
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-medium tracking-[0.25em] text-primary uppercase"
          >
            04 — How It Works
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            From first look to signed project — in{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              five steps.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            GigThink is designed to remove friction at every stage — from
            discovering the right opportunity to winning the client.
          </motion.p>
        </motion.div>

        {/* ============================================================
            STEPS
        ============================================================ */}
        <div className="mt-20 space-y-20 md:mt-28 md:space-y-32">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isReversed = index % 2 === 1; // alternate layout

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                {/* TEXT — Left or Right */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  {/* Step number + icon row */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
                        Step {step.number}
                      </p>
                      <div className="mt-1 h-px w-8 bg-primary/40" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {step.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-8 flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold tracking-wider text-foreground">
                      {step.number}
                    </span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                        style={{
                          width: `${
                            ((index + 1) / steps.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground">
                      05
                    </span>
                  </div>
                </div>

                {/* IMAGE — Right or Left */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:order-1" : ""
                  }`}
                >
                  <div className="group relative">
                    {/* Glow behind image */}
                    <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl" />

                    {/* Browser frame */}
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/20">
                      {/* Browser chrome bar */}
                      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5 backdrop-blur-sm">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-400/70" />
                          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                          <span className="h-2 w-2 rounded-full bg-green-400/70" />
                        </div>
                        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-0.5">
                          <span className="text-[9px] text-muted-foreground">
                            gigthink.com/{step.imageLabel.toLowerCase().replace(/\s+/g, "-")}
                          </span>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-primary/5 via-muted/30 to-primary/10">
                        <Image
                          src={step.image}
                          alt={step.imageAlt}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />

                        {/* Fallback label (shows if image missing) */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity">
                          <span className="rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                            {step.imageLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}