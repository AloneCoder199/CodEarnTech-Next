"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const storyBlocks = [
  {
    number: "01",
    title: "Where I Started",
    body: "I didn't start with a company or a clear plan. I started with curiosity — a computer, an internet connection, and a stubborn need to understand how things actually work.",
  },
  {
    number: "02",
    title: "What I Discovered",
    body: "Programming wasn't just syntax. It was a way of thinking — breaking big problems into small pieces and building solutions that didn't exist before.",
  },
  {
    number: "03",
    title: "What Changed Me",
    body: "Real projects. Real clients. Real failures. Each one taught me something no course could — that building for people is harder, and far more meaningful, than building for yourself.",
  },
  {
    number: "04",
    title: "Why It Mattered",
    body: "I realized the gap wasn't talent or tools. It was access — to guidance, to opportunity, to a place where builders could actually grow. That gap became the reason CodEarn exists.",
  },
];

export default function HumanStory() {
  return (
    <section
      id="story"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            01 — The Human Behind CodEarn
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Before CodEarn, there was a problem{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              I wanted to understand.
            </span>
          </h2>
        </div>

        {/* Main Layout */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — Story Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl" />

                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
                  <div 
  className="relative aspect-[4/5] w-full select-none" 
  onContextMenu={(e) => e.preventDefault()}
>
  {/* Actual Image */}
  <Image
    src="/founder-2.webp"
    alt="Muhammad Bilal — the journey"
    fill
    className="object-cover pointer-events-none"
    draggable={false}
  />

  {/* Invisible Protection Layer */}
  <div className="absolute inset-0 z-10 bg-transparent" />

  {/* Bottom gradient */}
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent z-20" />

  {/* Caption on image (Selectable text) */}
  <div className="absolute bottom-6 left-6 right-6 z-30 select-text">
    <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
      The beginning
    </p>
    <p className="mt-1 text-sm font-medium text-white">
      Where every builder starts — with a question.
    </p>
  </div>
</div>

                </div>

                {/* Small floating label */}
                <div className="absolute -right-4 top-8 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                  <span className="text-primary">●</span> Real Story
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Story Blocks */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {storyBlocks.map((block) => (
                <div
                  key={block.number}
                  className="group relative border-l-2 border-border pl-6 transition-colors hover:border-primary"
                >
                  {/* Number Badge */}
                  <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background text-[9px] font-bold text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                    {block.number.slice(-1)}
                  </div>

                  {/* Block Title */}
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    {block.title}
                  </h3>

                  {/* Block Body */}
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom — Personal Quote */}
        <div className="relative mt-24 md:mt-32">
          {/* Big quote mark */}
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-8 w-8 text-primary/40" />

            <blockquote className="mt-6">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                “I didn&apos;t start to build a company.{" "}
                <span className="text-muted-foreground">
                  I started to solve a problem I couldn&apos;t ignore.”
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