"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
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

export default function ProductsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px] dark:bg-primary/15" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              CodEarn Products
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We build products that solve{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              real problems.
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            CodEarn is building a growing portfolio of practical software
            products. For now, we&apos;re focused on one product, one problem,
            and one real customer outcome at a time.
          </motion.p>

          {/* Status chip */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium tracking-wide text-foreground md:text-sm">
              1 Product Live
            </span>
            <span className="text-border">•</span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground md:text-sm">
              More in Development
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Link href="#live-product">
                Explore Our Live Product
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group h-12 rounded-full border-border bg-transparent px-7 hover:bg-accent"
            >
              <Link href="/founder">
                Meet the Founder
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={fadeInUp}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium tracking-wider text-muted-foreground uppercase"
          >
            <span>Built by CodEarn</span>
            <span className="text-primary">•</span>
            <span>Founder-led</span>
            <span className="text-primary">•</span>
            <span>Building globally</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="mt-20 flex justify-center md:mt-24">
        <div className="flex flex-col items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
          <span>Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}