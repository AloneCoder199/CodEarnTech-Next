"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Headphones } from "lucide-react";

export default function FounderLetter() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fake progress animation for demo (jab tak actual audio nahi)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return p + 0.5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Agar actual audio file ho to use karo
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying((p) => !p);
  };

  return (
    <section
      id="letter"
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
            08 — A Letter From The Founder
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            A note from me to the person{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              building from zero.
            </span>
          </h2>
        </div>

        {/* Letter Layout */}
        <div className="relative mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ============================================================
                LEFT — The Letter
            ============================================================ */}
            <div className="lg:col-span-7">
              {/* Paper-style container */}
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm md:p-12 lg:p-14">
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

                {/* Corner decoration */}
                <div className="absolute right-6 top-6 h-12 w-12 rounded-full border border-primary/20 bg-primary/5" />
                <div className="absolute right-10 top-10 h-4 w-4 rounded-full bg-primary/20" />

                {/* Letter content */}
                <div className="relative space-y-5 text-base leading-relaxed text-foreground/90 md:text-lg">
                  <p className="font-medium text-foreground">Dear Builder,</p>

                  <p>
                    I know exactly where you are right now. The doubts. The late
                    nights. The tutorials you started and never finished. The
                    projects you built and never shipped. The comparison with
                    people who seem to be five steps ahead of you.
                  </p>

                  <p>
                    I&apos;ve been there. I still am, some days. And I want you
                    to know something important:{" "}
                    <span className="font-semibold text-foreground">
                      none of that means you&apos;re behind.
                    </span>{" "}
                    It means you&apos;re building.
                  </p>

                  <p>
                    The people who succeed aren&apos;t the ones with the perfect
                    plan. They&apos;re the ones who keep going when the plan
                    falls apart. They ship when it&apos;s not ready. They ask
                    when they don&apos;t understand. They build even when
                    nobody&apos;s watching.
                  </p>

                  <p>
                    CodEarn exists because I believe in that version of you — the
                    one who refuses to wait for permission. The one who
                    understands that skills become valuable the moment they
                    solve something real for someone real.
                  </p>

                  <p>
                    So if you&apos;re reading this, and you&apos;re building
                    something — anything — know that I&apos;m building too.
                    Somewhere, right now, we&apos;re on the same road.
                  </p>

                  <p>
                    Keep going. Keep shipping. Keep learning. The world needs
                    more people like you.
                  </p>

                  {/* Sign off */}
                  <div className="pt-6">
                    <p className="text-foreground/90">With respect,</p>
                    <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                      Muhammad Bilal
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Founder, CodEarn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
                RIGHT — Founder Photo + Signature + Voice Player
            ============================================================ */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                {/* Founder Photo */}
                <div className="relative">
                  {/* Glow */}
                  <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
  <div 
    className="relative aspect-[4/5] w-full select-none"
    onContextMenu={(e) => e.preventDefault()} // 👈 Right-click block karne ke liye
  >
    {/* Actual Image */}
    <Image
      src="/founder-3.webp"
      alt="Muhammad Bilal — Founder of CodEarn"
      fill
      className="object-cover pointer-events-none" // 👈 Image click/drag block karne ke liye
      draggable={false}
    />

    {/* Invisible Protection Layer */}
    <div className="absolute inset-0 z-10 bg-transparent" />

    {/* Bottom gradient */}
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-20" />

    {/* Caption (Selectable text on top layer) */}
    <div className="absolute bottom-5 left-5 right-5 z-30 select-text">
      <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
        Founder&apos;s Note
      </p>
      <p className="mt-1 text-sm font-medium text-white">
        Written on a late night, for anyone building from zero.
      </p>
    </div>
  </div>
</div>

                </div>

                {/* Voice Player */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card">
                  {/* Top strip */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

                  {/* Hidden actual audio (jab file ho) */}
                  <audio
                    ref={audioRef}
                    src="/founder/letter-audio.mp3"
                    onEnded={() => {
                      setIsPlaying(false);
                      setProgress(0);
                    }}
                  />

                  {/* Label */}
                  <div className="flex items-center gap-2">
                    <Headphones className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                      Listen to this letter
                    </span>
                  </div>

                  {/* Player row */}
                  <div className="mt-4 flex items-center gap-4">
                    {/* Play button */}
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause letter" : "Play letter"}
                      className="group/btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="ml-0.5 h-5 w-5" />
                      )}
                    </button>

                    {/* Progress + time */}
                    <div className="flex-1">
                      {/* Progress bar */}
                      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Time labels */}
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span>{formatTime((progress / 100) * 163)}</span>
                        <span>2:43</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        Muhammad Bilal
                      </p>
                      <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                        Founder
                      </p>
                    </div>

                    {/* Waveform dots */}
                    <div className="flex items-end gap-0.5">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 rounded-full bg-primary/60 transition-all duration-300 ${
                            isPlaying ? "animate-pulse" : ""
                          }`}
                          style={{
                            height: `${8 + Math.sin(i) * 6 + 6}px`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}