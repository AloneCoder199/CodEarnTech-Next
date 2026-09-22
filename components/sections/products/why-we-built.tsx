"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";

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

export default function WhyWeBuilt() {
  return (
    <section
      id="why-we-built"
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
            08 — Why We Built It
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Why did CodEarn build{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              GigThink?
            </span>
          </motion.h2>
        </motion.div>

        {/* ============================================================
            MAIN CONTENT — Letter + Photo
        ============================================================ */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 md:mt-28">
          {/* LEFT — Note (letter style) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Paper-style container */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm md:p-12 lg:p-14">
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

              {/* Corner decorations */}
              <div className="absolute right-6 top-6 h-12 w-12 rounded-full border border-primary/20 bg-primary/5" />
              <div className="absolute right-10 top-10 h-4 w-4 rounded-full bg-primary/20" />

              {/* Content */}
              <div className="relative space-y-5 text-base leading-relaxed text-foreground/90 md:text-lg">
                <p>
                  We kept seeing the same gap: people were learning valuable
                  technical and creative skills, but finding clients was still
                  a completely separate challenge.
                </p>

                <p>
                  The problem wasn&apos;t always{" "}
                  <span className="font-semibold text-foreground">
                    capability.
                  </span>
                </p>

                <p>
                  It was the journey between{" "}
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-foreground">
                    &ldquo;I can build this&rdquo;
                  </span>{" "}
                  and{" "}
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-foreground">
                    &ldquo;someone is willing to pay me to build this.&rdquo;
                  </span>
                </p>

                <p>
                  GigThink was created to make that journey more structured —
                  from finding the right opportunity to winning the client and
                  delivering the work.
                </p>
              </div>

              {/* Signature row */}
              <div className="relative mt-8 flex items-center gap-3 border-t border-border pt-6">
                <div className="h-px w-8 bg-primary/40" />
                <div>
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    Muhammad Bilal
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Founder, CodEarn
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Founder Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              {/* Glow behind photo */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl" />

              {/* Rotating dashed ring */}
              <div className="absolute -inset-6 -z-10 hidden rounded-full border border-dashed border-primary/20 [animation:spin_50s_linear_infinite] md:block" />

              {/* Photo frame */}
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/founder-4.webp"
                    alt="Muhammad Bilal — Founder of CodEarn"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Info overlay */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
                      Founder&apos;s Note
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">
                      Muhammad Bilal
                    </p>
                    <p className="text-xs text-white/70">
                      Founder &amp; Software Architect, CodEarn
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating link to founder story */}
              <Link
                href="/founder"
                className="group absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 backdrop-blur-md shadow-lg transition-all hover:border-primary/40 hover:shadow-xl"
              >
                <span className="text-xs font-medium text-foreground">
                  Read the full founder story
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            LARGE QUOTE — Bottom
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-24 md:mt-32"
        >
          {/* Soft glow behind */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-3/4 rounded-full bg-primary/10 blur-[110px]" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            {/* Quote icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <Quote className="h-5 w-5 text-primary" />
            </div>

            {/* Quote */}
            <blockquote className="mt-8">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                Skills create potential.{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Opportunities create outcomes.
                </span>
              </p>

              <footer className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-border" />
                <span className="text-sm font-medium text-muted-foreground">
                  Muhammad Bilal — Founder, CodEarn
                </span>
                <div className="h-px w-8 bg-border" />
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}