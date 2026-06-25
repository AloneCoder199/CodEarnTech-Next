'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCourseBySlug } from '../../../../lib/data'; // Path verified janii g
import { 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Timer,
  AlertCircle
} from 'lucide-react';

interface FinalEnrollmentProps {
  slug: string;
}

export default function FinalEnrollment({ slug }: FinalEnrollmentProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Live Counter Simulation Logic for Scarcity Boost
  const totalSeats = 50;
  const [seatsRemaining, setSeatsRemaining] = useState(7);

  useEffect(() => {
    // Simulating a real-time reservation dropping tick to create urgent action intent
    const interval = setInterval(() => {
      setSeatsRemaining((prev) => (prev > 3 ? prev - 1 : prev));
    }, 45000); 
    return () => clearInterval(interval);
  }, []);

  const percentageFilled = ((totalSeats - seatsRemaining) / totalSeats) * 100;

  const valueInclusions = [
    "10 Production Projects",
    "Premium Engineered Portfolio",
    "Professional GitHub Training",
    "Verifiable Smart Certificate",
    "Up to 100% Scholarship Opportunity"
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* High-Fidelity Performance Aura Backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-emerald-500/[0.01] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Main Split Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: THE PREMIUM INCLUSIONS & PRICING TIER */}
          <div className="md:col-span-7 bg-card/30 border border-border/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-border transition-all duration-300">
            
            <div className="space-y-6">
              {/* Badge Header Row */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Complete Access Bundle
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/40 font-bold uppercase tracking-widest">[ secure_tier ]</div>
              </div>

              {/* Pricing Module Header */}
              <div className="space-y-1">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">One-Time Tuition Investment</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">2,000</span>
                  <span className="text-lg font-extrabold text-primary font-mono">PKR</span>
                  <span className="text-xs text-muted-foreground/60 line-through font-mono ml-1">Rs. 25,000</span>
                </div>
              </div>

              {/* Inclusions Micro List Grid (Highly Scannable) */}
              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">Everything Included In Your Portal:</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {valueInclusions.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2.5 group/item">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500/80 group-hover/item:text-emerald-400 transition-colors flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Safe Assurance Tag */}
            <div className="mt-8 pt-4 border-t border-border/30 flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40">
              <AlertCircle className="w-3.5 h-3.5 text-primary/40" /> Zero hidden maintenance charges. Lifetime repository portal support.
            </div>

          </div>

          {/* RIGHT COLUMN: THE URGENCY SCARCITY ENGINE & ACTION BUTTON */}
          <div className="md:col-span-5 bg-gradient-to-b from-card/80 to-card/20 border border-primary/20 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            
            {/* Absolute Ambient Edge Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* SCARCITY COUNTER SUB-SYSTEM */}
            <div className="space-y-5">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-destructive font-bold flex items-center gap-1 uppercase tracking-wider animate-pulse">
                  <Timer className="w-3 h-3" /> Filling Fast
                </span>
                <span className="text-muted-foreground/60 font-bold">{seatsRemaining} / {totalSeats} Seats Left</span>
              </div>

              {/* High-Fidelity Structural Progress Bar Engine */}
              <div className="space-y-2">
                <div className="w-full h-2 bg-muted/60 border border-border/40 rounded-full overflow-hidden p-[2px]">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-amber-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.4)]"
                    style={{ width: `${percentageFilled}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground/50">
                  <span>90% Cohort Batch Filled</span>
                  <span className="font-bold text-foreground">{seatsRemaining} Slots Left</span>
                </div>
              </div>

              {/* Dynamic Warning Alert Bar Box */}
              <div className="p-3 bg-destructive/5 border border-destructive/10 rounded-xl flex gap-2.5 items-start">
                <Users className="w-4 h-4 text-destructive/80 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Applications strictly close automatically once the remaining <span className="text-foreground font-bold font-mono">{seatsRemaining} registration slots</span> are fully verified.
                </p>
              </div>
            </div>

            {/* ACTION FOOTER TARGET HUB: THE LARGE CTA */}
            <div className="space-y-3 mt-6">
              <Link 
  href="/enroll" 
  className="w-full py-4 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden active:scale-[0.98] select-none text-center"
>
  {/* Micro reflection shimmer light gloss */}
  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
  
  Secure My Seat Now 
  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
</Link>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest text-center">
                <Zap className="w-3 h-3 text-primary animate-pulse" /> Instant Portal Activation Link
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}