"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Star,
  Zap,
  Shield,
  Users,
  Globe,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- 1. MEMOIZED COMPONENTS (Performance ke liye) ---
const TrustBadge = memo(({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300">
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-[10px] sm:text-xs font-bold text-foreground/70 uppercase tracking-widest">{text}</span>
  </div>
));
TrustBadge.displayName = "TrustBadge";

// --- 2. ELITE SaaS BACKGROUND (SVG Grid + Animated Beams) ---
export const SaaSBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      // ✅ Performance Fix: Direct CSS variables update (No State Re-renders)
      containerRef.current.style.setProperty("--mouse-x", `${x}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-background [--mouse-x:50%] [--mouse-y:50%]"
    >
      {/* 1. PROFESSIONAL GRID SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.25]">
        <defs>
          <pattern id="pro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          {/* Mask for soft edges */}
          <radialGradient id="fade-mask" cx="30%" cy="30%" r="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pro-grid)" className="text-muted-foreground" />
      </svg>

      {/* 2. MOUSE FOLLOW GLOW (The "Grow" Effect) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            oklch(var(--primary) / 0.15),
            transparent 80%
          )`,
        }}
      />

      {/* 3. SAAS FLOWING LINES (Optimized motion.div) */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] h-[1px] w-full bg-linear-to-r from-transparent via-primary/50 to-transparent"
        />
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute left-[20%] w-[1px] h-full bg-linear-to-b from-transparent via-primary/30 to-transparent"
        />
      </div>

      {/* 4. PREMIUM TOP GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(var(--primary)/0.12),transparent_70%)]" />
    </div>
  );
};

// --- 3. ANIMATED COUNTER ---
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const end = to;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32"
    >
      <SaaSBackground />


      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-md hover:border-primary/50 transition-all duration-500 relative top-5"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors ">
                Innovation meets Engineering
              </span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[115px] font-black tracking-tighter mb-8 leading-[0.85] text-foreground mt-15"
          >
            We Build <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/60">
              Digital Excellence
              <motion.svg 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute -bottom-2 left-0 w-full h-4 text-primary/30" 
                viewBox="0 0 500 20" 
                fill="none"
              >
              
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Scalable <span className="text-foreground font-bold">SaaS architecture</span> for modern enterprises. 
            High-performance code that drives multi-million dollar growth.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-24">
            <Button
              size="lg"
              className="h-16 px-10 rounded-full bg-primary text-primary-foreground text-lg font-bold shadow-[0_20px_40px_-15px_rgba(var(--primary),0.4)]  transition-all duration-300 group border-0"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-16 px-10 rounded-full border-2 bg-background/50 backdrop-blur-md text-lg font-bold hover:bg-muted transition-all duration-300"
            >
              <Link href="/enroll" className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" /> Join Academy
              </Link>
            </Button>
          </div>

          {/* Trust Section */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-24">
            <TrustBadge icon={Shield} text="ISO Certified" />
            <TrustBadge icon={Star} text="Top Rated Agency" />
            <TrustBadge icon={Globe} text="Global Delivery" />
          </div>

          {/* Stats Section */}
          <div className="pt-16 border-t border-border/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Successful Projects", value: 500, suffix: "+", icon: CheckCircle2 },
                { label: "Students Trained", value: 1000, suffix: "+", icon: Users },
                { label: "Global Presence", value: 30, suffix: "+", icon: Award },
                { label: "Expert Support", value: 24, suffix: "/7", icon: Zap },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-4xl sm:text-6xl font-black mb-2 tracking-tighter">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}