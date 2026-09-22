"use client";

import { AlertCircle, Lightbulb, Rocket, ArrowDown } from "lucide-react";

const steps = [
  {
    number: "01",
    label: "The Problem",
    heading: "What I Saw",
    icon: AlertCircle,
    body: "Developers were learning endlessly but not building. Businesses were paying for software that never solved the real problem. Talent existed everywhere — opportunity didn't.",
    points: [
      "Learning without shipping",
      "Tools built without understanding users",
      "Skill present, access missing",
    ],
  },
  {
    number: "02",
    label: "The Insight",
    heading: "What I Realized",
    icon: Lightbulb,
    body: "The gap wasn't talent or technology. It was the space in between — where learning meets real building, and where builders meet real opportunity. That space needed to exist.",
    points: [
      "Real problems need real builders",
      "Skills grow when they ship",
      "Opportunity should be built, not waited for",
    ],
  },
  {
    number: "03",
    label: "The Mission",
    heading: "What CodEarn Became",
    icon: Rocket,
    body: "CodEarn was built as that space — a technology company where software, products and people are developed around real problems, not trends. Not just a company. A vehicle.",
    points: [
      "Build useful technology",
      "Ship real products",
      "Create opportunity for builders",
    ],
  },
];

export default function WhyCodEarn() {
  return (
    <section
      id="why"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            03 — Why I Built CodEarn
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            I didn&apos;t want to simply build software.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              I wanted to build around problems that matter.
            </span>
          </h2>
        </div>

        {/* 3-Step Visual: PROBLEM → INSIGHT → MISSION */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Card */}
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
                  {/* Top gradient strip */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground/60 uppercase">
                      {step.number}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="mt-6 text-xs font-medium tracking-[0.2em] text-primary uppercase">
                    {step.label}
                  </p>

                  {/* Heading */}
                  <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
                    {step.heading}
                  </h3>

                  {/* Body */}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.body}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow between cards (desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-md">
                      <ArrowDown className="h-3.5 w-3.5 rotate-[-90deg] text-primary" />
                    </div>
                  </div>
                )}

                {/* Arrow between cards (mobile) */}
                {index < steps.length - 1 && (
                  <div className="mt-6 flex justify-center lg:hidden">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-md">
                      <ArrowDown className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Large Statement */}
        <div className="relative mt-24 md:mt-32">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-64 w-3/4 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-border bg-card/50 px-8 py-14 text-center backdrop-blur-sm md:px-16 md:py-20">
            {/* Corner accent */}
            <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-primary/40" />
            <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-primary/40" />
            <div className="absolute left-6 bottom-6 h-3 w-3 rounded-full bg-primary/40" />
            <div className="absolute right-6 bottom-6 h-3 w-3 rounded-full bg-primary/40" />

            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              CODEARN
            </p>

            <div className="mx-auto mt-6 h-px w-16 bg-border" />

            <p className="mt-8 text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
              is not just a company.
            </p>

            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
              It is the vehicle through which I want to build{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                useful technology, products and opportunities.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}