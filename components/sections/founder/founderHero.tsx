


"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FounderHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/15" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--background))]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — CONTENT */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                The Person Behind CodEarn
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Muhammad{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Bilal
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-xl font-medium text-foreground/80 md:text-2xl">
              Founder &amp; Software Architect
            </p>

            {/* Positioning Statement */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Building software products, businesses and technology
              experiences around{" "}
              <span className="font-medium text-foreground">
                real-world problems
              </span>
              .
            </p>

            {/* Location chip (optional) */}
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Pakistan • Building globally</span>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Link href="https://www.linkedin.com/in/mbilal1205/" target="_blank">
                  Explore My Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-border bg-transparent px-7 hover:bg-accent"
              >
                <Link href="/contact">
                  Connect With Me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Trust Line */}
            <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <span>Software Engineer</span>
              <span className="text-primary">•</span>
              <span>Founder</span>
              <span className="text-primary">•</span>
              <span>Product Builder</span>
              <span className="text-primary">•</span>
              <span>Educator</span>
            </div>
          </div>

          {/* RIGHT — VISUAL */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Rotating Ring */}
              <div className="absolute -inset-6 -z-10 rounded-full border border-dashed border-primary/20 [animation:spin_40s_linear_infinite]" />

              {/* Glow behind image */}
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-2xl" />

              {/* Portrait Frame */}
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
                <div 
  className="relative aspect-[4/5] w-full select-none" 
  onContextMenu={(e) => e.preventDefault()}
>
  {/* Actual Image */}
  <Image
    src="/founder.webp"
    alt="Muhammad Bilal — Founder of CodEarn"
    fill
    priority
    className="object-cover pointer-events-none"
    draggable={false}
  />

  {/* Invisible Protection Layer (Z-index text se neche rakha hai) */}
  <div className="absolute inset-0 z-10 bg-transparent" />

  {/* Bottom gradient overlay */}
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-20" />

  {/* Name on image (Z-index high rakha hai taake text copy ho sakay) */}
  <div className="absolute bottom-5 left-5 right-5 z-30 select-text">
    <p className="text-sm font-semibold text-white">
      Muhammad Bilal
    </p>
    <p className="text-xs text-white/70">
      Founder &amp; Software Architect
    </p>
  </div>
</div>

              </div>

              {/* Floating Tag — Top Left */}
              <div className="absolute -left-4 top-8 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                <span className="text-primary">●</span> Founder
              </div>

              {/* Floating Tag — Top Right */}
              <div className="absolute -right-4 top-24 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                <span className="text-primary">●</span> Software Architect
              </div>

              {/* Floating Tag — Bottom Left */}
              <div className="absolute -left-6 bottom-24 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                <span className="text-primary">●</span> Builder
              </div>

              {/* Currently Building Card */}
              <div className="absolute -bottom-6 -right-4 w-56 rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-md">
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Currently Building
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    CodEarn
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    GigThink
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    SaaS Products
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-20 flex justify-center lg:mt-28">
        <div className="flex flex-col items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
          <span>Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}