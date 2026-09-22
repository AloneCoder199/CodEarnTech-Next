"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Target,
  FileText,
  ArrowUpRight,
  Play,
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
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ============================================================
   SCREENS — each can be 'image' or 'video'
============================================================ */
const screens = [
  {
    number: "01",
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Your opportunities at a glance.",
    description:
      "Clients, proposals, projects and opportunities — all visible in one clean view, ready to act on.",
    mediaType: "image" as const,
    image: "/products/gigthink-dashboard-clean.png",
    alt: "GigThink dashboard — clients, proposals, projects overview",
    url: "gigthink.com/dashboard",
  },
  {
    number: "02",
    icon: Target,
    label: "Opportunity Feed",
    title: "Understand who you're approaching and why.",
    description:
      "AI-curated matches with a transparent match score and a \u201cWhy This?\u201d breakdown — so you know which leads are actually worth your time.",
    mediaType: "video" as const,
    video: "/products/gigthink-feed-demo.mp4",
    poster: "/products/gigthink-opportunity-feed.png",
    alt: "GigThink opportunity feed with AI match scores — demo video",
    url: "gigthink.com/feed",
    featured: true,
    duration: "0:45",
  },
  {
    number: "03",
    icon: FileText,
    label: "Proposal Lab",
    title: "From opportunity to professional proposal.",
    description:
      "Turn a qualified lead into a personalized, structured proposal in minutes — not hours.",
    mediaType: "image" as const,
    image: "/products/gigthink-dashboard.png",
    alt: "GigThink Proposal Lab — generate winning proposals",
    url: "gigthink.com/proposal-lab",
  },
];

export default function ProductExperience() {
  return (
    <section
      id="product-experience"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-1/3 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            06 — Product Experience
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Built to keep your{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              workflow moving.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            A clean, focused interface — because your attention belongs on
            clients, not on software.
          </motion.p>
        </motion.div>

        {/* ============================================================
            SCREENS
        ============================================================ */}
        <div className="mt-20 space-y-16 md:mt-28 md:space-y-24">
          {screens.map((screen) => {
            const Icon = screen.icon;
            const isFeatured = screen.featured;
            const isVideo = screen.mediaType === "video";

            return (
              <motion.div
                key={screen.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Screen header */}
                <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
                  {/* Left — Icon + Label + Title */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all ${
                        isFeatured
                          ? "border-primary/40 bg-primary/15"
                          : "border-primary/20 bg-primary/10"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
                          {screen.number} — {screen.label}
                        </p>
                        {isVideo && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-primary uppercase">
                            <Play className="h-2.5 w-2.5 fill-primary" />
                            Demo
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 max-w-xl text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl lg:text-3xl">
                        {screen.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right — URL badge */}
                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur-sm md:self-auto">
                    <ArrowUpRight className="h-3 w-3 text-primary" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {screen.url}
                    </span>
                  </div>
                </div>

                {/* Media — Browser frame */}
                <div className="group relative">
                  {/* Glow behind frame */}
                  <div
                    className={`pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] blur-3xl transition-opacity duration-500 ${
                      isFeatured
                        ? "bg-gradient-to-tr from-primary/25 via-primary/10 to-transparent"
                        : "bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent group-hover:from-primary/25"
                    }`}
                  />

                  <div
                    className={`relative overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all duration-500 md:rounded-3xl ${
                      isFeatured
                        ? "border-primary/30 shadow-primary/15"
                        : "border-border shadow-primary/10 group-hover:border-primary/30 group-hover:shadow-primary/20"
                    }`}
                  >
                    {/* Top accent line (only featured) */}
                    {isFeatured && (
                      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                    )}

                    {/* Browser chrome bar */}
                    <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3 backdrop-blur-sm">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1">
                        <span className="truncate text-[10px] text-muted-foreground">
                          {screen.url}
                        </span>
                      </div>
                      {/* Duration chip (only video) */}
                      {isVideo && screen.duration && (
                        <span className="hidden items-center gap-1 rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                          {screen.duration}
                        </span>
                      )}
                    </div>

                    {/* Media content */}
                    <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-primary/5 via-muted/30 to-primary/10">
                      {isVideo ? (
                        <>
                          {/* VIDEO */}
                          <video
                            className="absolute inset-0 h-full w-full object-cover"
                            poster={screen.poster}
                            controls
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          >
                            <source src={screen.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                          {/* Play overlay — hides on hover/play */}
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md md:h-16 md:w-16">
                              <Play className="ml-0.5 h-6 w-6 fill-white text-white md:h-7 md:w-7" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* IMAGE */}
                          <Image
                            src={screen.image!}
                            alt={screen.alt}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                            sizes="(max-width: 1024px) 100vw, 90vw"
                          />

                          {/* Bottom fade */}
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/60 to-transparent" />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:ml-auto md:max-w-xl md:text-right md:text-base">
                    {screen.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================
            BOTTOM LINE
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-20 md:mt-28"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-32 w-2/3 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-border" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              <div className="h-px w-12 bg-border" />
            </div>

            <p className="mt-8 text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl">
              A clean product. A clear workflow.{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                A better way to win clients.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}