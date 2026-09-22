"use client";

import { Hammer, Target, RefreshCw, Layers, Gem, Quote } from "lucide-react";

const principles = [
  {
    number: "01",
    icon: Hammer,
    title: "Build, Don't Just Learn",
    body: "Tutorials fade. Real projects stay. Skills are proven when they ship, not when they're understood.",
  },
  {
    number: "02",
    icon: Target,
    title: "Solve Real Problems",
    body: "Technology without purpose is just noise. Every line of code should trace back to a real human need.",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Ship, Learn, Improve",
    body: "Perfection is a delay tactic. Shipping teaches faster than planning. Iteration is the real skill.",
  },
  {
    number: "04",
    icon: Layers,
    title: "Depth Over Hype",
    body: "Trends will pass. Fundamentals will compound. I choose depth — in code, in products, in craft.",
  },
  {
    number: "05",
    icon: Gem,
    title: "Create Value",
    body: "Success is a side effect of usefulness. If it doesn't help someone, it doesn't matter how clever it is.",
  },
];

export default function Beliefs() {
  return (
    <section
      id="beliefs"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      </div>

      {/* Grid pattern */}
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
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            04 — What I Believe
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            The principles behind{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              how I build.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            These aren&apos;t slogans. They are the filters I use before I
            start anything — and the standards I hold myself to while building.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-28">
          {principles.map((principle, index) => {
            // 5 items in 3-col grid — first card spans 2 cols on lg for hero feel
            const isFeature = index === 0;

            return (
              <div
                key={principle.number}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 ${
                  isFeature
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-1"
                    : ""
                }`}
              >
                {/* Top gradient strip on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Floating number */}
                <span className="absolute right-6 top-6 text-5xl font-bold leading-none text-muted-foreground/10 transition-colors duration-300 group-hover:text-primary/20 md:text-6xl">
                  {principle.number}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title */}
                <h3
                  className={`mt-6 font-semibold tracking-tight text-foreground ${
                    isFeature ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {principle.title}
                </h3>

                {/* Body */}
                <p
                  className={`mt-3 leading-relaxed text-muted-foreground ${
                    isFeature ? "max-w-lg text-base md:text-lg" : "text-sm md:text-base"
                  }`}
                >
                  {principle.body}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-12 bg-primary/40 transition-all duration-500 group-hover:w-20" />
              </div>
            );
          })}
        </div>

        {/* Bottom — Founder Quote */}
        <div className="relative mt-24 md:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <Quote className="h-5 w-5 text-primary" />
            </div>

            <blockquote className="mt-8">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                “Your skills become valuable{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  when they solve a real problem.”
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