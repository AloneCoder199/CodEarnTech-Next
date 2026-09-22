"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Target,
  FileText,
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

const trustItems = [
  { icon: CheckCircle2, label: "Live today" },
  { icon: Zap, label: "Free to start" },
  { icon: Target, label: "AI match scoring" },
  { icon: FileText, label: "Proposals in minutes" },
];

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow — strongest for finale */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px] dark:bg-primary/15" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
      </div>

      {/* Grid pattern — brighter for finale */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Finale Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm"
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

          {/* Inner glows */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="pointer-events-none absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />

          <div className="relative grid grid-cols-1 gap-12 p-8 md:p-14 lg:grid-cols-12 lg:gap-16 lg:p-20">
            {/* ============================================================
                LEFT — Content
            ============================================================ */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  Ready to start?
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h2
                variants={fadeInUp}
                className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]"
              >
                Ready to turn your skills into{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  opportunities?
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                Explore GigThink and see how a more structured approach to
                client acquisition can work for you. No setup fees. No
                learning curve. Just a clearer path from skills to income.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                {/* Primary CTA */}
                <Link
                  href="https://gigthink.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/40"
                >
                  Try GigThink
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/founder"
                  className="group/btn2 inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-8 text-base font-medium text-foreground transition-all hover:border-primary/30 hover:bg-accent"
                >
                  Learn About CodEarn
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn2:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust line */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6"
              >
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* ============================================================
                RIGHT — GigThink Visual
            ============================================================ */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto max-w-sm"
              >
                {/* Glow behind */}
                <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-3xl" />

                {/* Rotating dashed ring */}
                <div className="absolute -inset-6 -z-10 hidden rounded-full border border-dashed border-primary/20 [animation:spin_50s_linear_infinite] md:block" />

                {/* GigThink logo card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 shadow-2xl shadow-primary/10">
                  {/* Grid pattern inside */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

                  {/* Content */}
                  <div className="relative flex flex-col items-center text-center">
                    {/* Logo */}
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-lg shadow-primary/10">
                      <Image
                        src="/products/gigthink-logo.png"
                        alt="GigThink"
                        fill
                        className="object-contain p-2 dark:invert"
                      />
                    </div>

                    {/* Name */}
                    <p className="mt-6 text-xl font-bold tracking-tight text-foreground">
                      Gig<span className="text-primary">Think</span>
                    </p>

                    {/* Tagline */}
                    <p className="mt-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Win More Clients. Close More Deals.
                    </p>

                    {/* Divider */}
                    <div className="mt-6 h-px w-16 bg-border" />

                    {/* Live indicator */}
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-green-600 uppercase dark:text-green-400">
                        Live
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating badge — top right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -right-4 top-6 hidden items-center gap-2 rounded-xl border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md md:flex"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-semibold tracking-wider text-foreground uppercase">
                    Free to start
                  </span>
                </motion.div>

                {/* Floating badge — bottom left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -left-4 bottom-8 hidden rounded-xl border border-border bg-card/95 px-3.5 py-2.5 shadow-lg backdrop-blur-md md:block"
                >
                  <p className="text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Available on
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] font-semibold text-foreground">
                    gigthink.com
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}