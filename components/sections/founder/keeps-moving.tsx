"use client";

import { Heart, Compass, BookOpen } from "lucide-react";

const pillars = [
  {
    number: "01",
    label: "Faith",
    icon: Heart,
    body: "Everything I build starts with gratitude. Faith keeps me grounded when things work, and patient when they don't. It reminds me that outcomes are not entirely mine to control — but effort always is.",
    quote: "Trust the process. Do the work. Leave the rest.",
  },
  {
    number: "02",
    label: "Discipline",
    icon: Compass,
    body: "Motivation fades. Discipline doesn't. Showing up every day — even when the work feels small — is what actually compounds over years. Consistency is the quiet engine behind every result.",
    quote: "Small consistent steps beat big inconsistent leaps.",
  },
  {
    number: "03",
    label: "Continuous Learning",
    icon: BookOpen,
    body: "The moment I stop learning is the moment I start falling behind. Every project, every failure, every conversation teaches something. I stay a student — no matter how much I've built.",
    quote: "Stay curious. Stay humble. Keep learning.",
  },
];

export default function KeepsMoving() {
  return (
    <section
      id="grounded"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow — softer, more intimate */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/8" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            09 — What Keeps Me Moving
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            What keeps me{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              grounded while building.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Beyond the code, the products and the plans — these three things
            quietly shape how I live and build every day.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isMiddle = index === 1;

              return (
                <div
                  key={pillar.number}
                  className={`group relative overflow-hidden rounded-3xl border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 md:p-10 ${
                    isMiddle
                      ? "border-primary/30 md:-mt-4"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {/* Top accent */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Soft inner glow (middle card only) */}
                  {isMiddle && (
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
                  )}

                  {/* Number */}
                  <span className="absolute right-8 top-8 font-mono text-xs font-medium tracking-widest text-muted-foreground/50">
                    {pillar.number}
                  </span>

                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                      isMiddle
                        ? "border-primary/40 bg-primary/15"
                        : "border-primary/20 bg-primary/10 group-hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Label */}
                  <h3 className="mt-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {pillar.label}
                  </h3>

                  {/* Divider */}
                  <div className="mt-4 h-px w-10 bg-primary/40 transition-all duration-500 group-hover:w-16" />

                  {/* Body */}
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {pillar.body}
                  </p>

                  {/* Quote */}
                  <div className="mt-6 border-l-2 border-primary/30 pl-4">
                    <p className="text-sm font-medium italic leading-snug text-foreground/80">
                      &ldquo;{pillar.quote}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            Large Quote — Bottom
        ============================================================ */}
        <div className="relative mt-24 md:mt-32">
          {/* Soft glow behind */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-2/3 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            {/* Small ornament */}
            <div className="mx-auto flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-border" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              <div className="h-px w-12 bg-border" />
            </div>

            {/* Quote */}
            <blockquote className="mt-8">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Build with intention.{" "}
                <span className="text-muted-foreground">Stay grateful.</span>{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Keep learning.
                </span>
              </p>

              <footer className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-border" />
                <span className="text-sm font-medium text-muted-foreground">
                  Muhammad Bilal
                </span>
                <div className="h-px w-8 bg-border" />
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}