"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type JourneyItem = {
  year: string;
  title: string;
  description: string;
  tag?: string;
  image?: string;
  highlight?: boolean;
};

const journey: JourneyItem[] = [
  {
    year: "2019",
    title: "Started Software Journey",
    description:
      "Wrote the first line of code. No roadmap, no mentor — just curiosity and consistency.",
    tag: "Beginning",
  },
  {
    year: "2020",
    title: "First Real Projects",
    description:
      "Moved from tutorials to real problems. Built small tools, websites and scripts that people actually used.",
    tag: "Foundation",
  },
  {
    year: "2021",
    title: "Client & Product Experience",
    description:
      "Worked with clients, learned deadlines, scope, communication and the discipline of shipping.",
    tag: "Experience",
  },
  {
    year: "2022",
    title: "Engineering Growth",
    description:
      "Went deeper into architecture, full-stack systems and scalable product thinking.",
    tag: "Growth",
  },
  {
    year: "2023",
    title: "Community, Teaching & Building",
    description:
      "Started sharing knowledge, helping developers and building in public. Learning became teaching.",
    tag: "Community",
  },
  {
    year: "2024",
    title: "CodEarn",
    description:
      "Founded CodEarn — a technology company built around real problems, real products and real people.",
    tag: "Founder",
    highlight: true,
  },
  {
    year: "2025",
    title: "Products & Experiments",
    description:
      "Shipping products, running experiments, and turning ideas into things that work.",
    tag: "Shipping",
  },
  {
    year: "2026",
    title: "Building the Next Chapter",
    description:
      "The journey is still being written. More products. More impact. More building.",
    tag: "Now",
    highlight: true,
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            02 — The Journey
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From learning to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              building.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Every year added something — a skill, a lesson, a failure, a win.
            This is the timeline of how CodEarn came to be.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20 md:mt-28">
          {/* Central vertical line (desktop) */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2 md:block md:-translate-x-1/2" />

          {/* Left vertical line (mobile) */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-20">
            {journey.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16"
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2 md:top-6">
                    <div className="relative">
                      {/* Outer pulsing ring */}
                      <div
                        className={`absolute inset-0 rounded-full ${
                          item.highlight
                            ? "bg-primary/30"
                            : "bg-primary/20"
                        } animate-ping`}
                      />
                      {/* Inner dot */}
                      <div
                        className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                          item.highlight
                            ? "border-primary bg-primary shadow-lg shadow-primary/50"
                            : "border-primary bg-background"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card — Left side on desktop */}
                  {isLeft && (
                    <div className="hidden md:block">
                      <JourneyCard item={item} align="right" />
                    </div>
                  )}

                  {/* Spacer for the other side */}
                  {isLeft && <div className="hidden md:block" />}

                  {/* Spacer for the other side (when not left) */}
                  {!isLeft && <div className="hidden md:block" />}

                  {/* Card — Right side on desktop OR mobile full */}
                  {!isLeft && (
                    <div className="hidden md:block">
                      <JourneyCard item={item} align="left" />
                    </div>
                  )}

                  {/* Mobile card */}
                  <div className="md:hidden pl-12">
                    <JourneyCard item={item} align="left" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center md:mt-28">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group h-12 rounded-full border-border bg-transparent px-7 hover:bg-accent"
          >
            <Link href="#work">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function JourneyCard({
  item,
  align,
}: {
  item: JourneyItem;
  align: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <div
      className={`group relative ${
        isRight ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
      }`}
    >
      {/* Year Badge */}
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 backdrop-blur-sm ${
          item.highlight
            ? "border-primary/40 bg-primary/10"
            : ""
        }`}
      >
        <Sparkles
          className={`h-3 w-3 ${
            item.highlight ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <span
          className={`text-xs font-semibold tracking-widest uppercase ${
            item.highlight ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {item.year}
        </span>
        {item.tag && (
          <>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-xs font-medium text-muted-foreground">
              {item.tag}
            </span>
          </>
        )}
      </div>

      {/* Card Body */}
      <div
        className={`mt-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10 ${
          item.highlight ? "border-primary/30" : ""
        }`}
      >
        <h3 className="text-lg font-semibold text-foreground md:text-xl">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.description}
        </p>

        {/* Optional image */}
        {item.image && (
          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-video w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* Small arrow on hover */}
        <div
          className={`mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100 ${
            isRight ? "md:justify-end" : ""
          }`}
        >
          <span>Learn more</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}