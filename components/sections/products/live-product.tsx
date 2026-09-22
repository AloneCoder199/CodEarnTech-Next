"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Search, Zap, FileText, Send, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* 5-step flow around the screenshot */
const flowSteps = [
  { icon: Search, label: "Find" },
  { icon: Zap, label: "Match" },
  { icon: FileText, label: "Pitch" },
  { icon: Send, label: "Propose" },
  { icon: Trophy, label: "Win" },
];

export default function LiveProduct() {
  return (
    <section
      id="live-product"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      </div>

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
            01 — Live Product
          </motion.span>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex items-center justify-center gap-4"
          >
            {/* GigThink Logo */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-lg shadow-primary/5 md:h-16 md:w-16">
              <Image
                src="/products/gigthink-logo.jpeg"
                alt="GigThink logo"
                fill
                className="object-contain p-1.5 dark:invert"
              />
            </div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Meet{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                GigThink
              </span>
            </motion.h2>
          </motion.div>

          {/* Positioning */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-xl font-medium tracking-tight text-foreground/90 md:text-2xl"
          >
            Win more clients. Close more deals.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            GigThink is an AI-powered workspace that helps freelancers and
            agencies find the right work, win the client, and execute the
            project — all in one place.
          </motion.p>

          {/* Status + CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-9 flex flex-col items-center gap-5"
          >
            {/* LIVE badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold tracking-widest text-green-600 uppercase dark:text-green-400">
                Live
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Link
                  href="https://gigthink.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GigThink
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-border bg-transparent px-7 hover:bg-accent"
              >
                <Link href="#how-it-works">
                  See How It Works
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================================
            DASHBOARD VISUAL + FLOATING ELEMENTS
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-20 max-w-6xl md:mt-24"
        >
          {/* Glow behind visual */}
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl" />

          {/* Browser frame */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 md:rounded-3xl">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3 backdrop-blur-sm">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1">
                <span className="text-[10px] text-muted-foreground">
                  gigthink.com/dashboard
                </span>
              </div>
            </div>

            {/* Screenshot */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/products/gigthink-dashboard.png"
                alt="GigThink dashboard — find the right work, win the client, execute the project"
                fill
                priority
                className="object-cover object-top"
              />
              {/* Bottom fade for smooth blend */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent" />
            </div>
          </div>

          {/* ============================================================
              FLOATING — 5-Step Flow (Left side, desktop)
          ============================================================ */}
          <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="flex flex-col gap-3">
              {flowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-card/90 px-3 py-2 backdrop-blur-md shadow-lg shadow-primary/5"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              FLOATING — Live Status (Top right)
          ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="absolute -right-4 top-20 hidden items-center gap-2.5 rounded-xl border border-border bg-card/90 px-3.5 py-2.5 backdrop-blur-md shadow-lg shadow-primary/5 md:flex lg:-right-8"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>
            <div className="leading-none">
              <p className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Status
              </p>
              <p className="mt-1 text-xs font-semibold text-foreground">
                Live on gigthink.com
              </p>
            </div>
          </motion.div>

          {/* ============================================================
              FLOATING — USP Badge (Bottom right)
          ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 right-4 hidden max-w-[240px] rounded-2xl border border-border bg-card/95 p-4 backdrop-blur-md shadow-xl shadow-primary/10 md:block lg:-right-8"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                The USP
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-foreground/90">
              Every opportunity comes with a{" "}
              <span className="font-semibold text-foreground">
                match score
              </span>{" "}
              and a transparent{" "}
              <span className="font-semibold text-foreground">
                &ldquo;Why This?&rdquo;
              </span>{" "}
              breakdown.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}