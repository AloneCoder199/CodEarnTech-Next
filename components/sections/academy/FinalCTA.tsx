"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      
      {/* Hyper-Radiant Ambient Mesh Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[160px] rounded-full pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Main Bento Banner Container */}
        <div className="relative rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-card to-muted/30 p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-primary/[0.01] group">
          
          {/* Subtle Grid overlay for high-tech aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider animate-bounce">
              <Zap className="w-3 h-3 fill-primary" />
              Limited Seats Available
            </div>

            {/* Massive Commanding Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1] md:leading-[1.05]">
              Start Building Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary/80 bg-[size:200%_auto] animate-text">
                Future Today
              </span>
            </h2>

            {/* High-Conversion Subtitle - Fixed to professional simple English */}
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto font-light">
              Your 30-day structural technical journey is waiting for you. No degrees required and zero fluff—just practical software engineering to build your real-world portfolio.
            </p>

            {/* High-Fidelity Interactive CTA Button Stack - Integrated Next.js Link /enroll */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/enroll"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-black tracking-tight shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 group/btn cursor-pointer select-none"
              >
                Enroll In Batch 1
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>

            {/* Trust Matrix Footer Row */}
            <div className="pt-8 border-t border-border/40 mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center text-xs font-medium text-muted-foreground">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>One-time 2000 PKR</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Max 50 Slots / Batch</span>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-1.5 border-t md:border-t-0 border-border/30 pt-3 md:pt-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[11px] tracking-wide uppercase text-foreground/80">
                  Instant Access Guaranteed
                </span>
              </div>
            </div>

          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none rounded-tr-full" />
        </div>

      </div>
    </section>
  );
}
