"use client"

import React, { useEffect, useState } from "react";
import { 
  Loader2, 
  Sparkles, 
  Zap, 
  Layers,
  Cpu,
  Globe
} from "lucide-react";

interface PageLoaderProps {
  message?: string;
  subMessage?: string;
  variant?: "default" | "minimal" | "branded";
  showProgress?: boolean;
}

const loadingMessages = [
  "Initializing secure connection...",
  "Loading digital assets...",
  "Preparing your workspace...",
  "Optimizing performance...",
  "Almost there..."
];

export const PageLoader = ({ 
  message = "Loading experience...",
  subMessage = "Please wait while we prepare everything for you",
  variant = "default",
  showProgress = true
}: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dots, setDots] = useState("");

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (variant === "minimal") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="relative">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full border border-primary/20 opacity-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        
        {/* Logo/Brand Icon */}
        <div className="relative mb-8">
          {/* Outer rings */}
          <div className="absolute inset-0 h-24 w-24 -m-4 animate-pulse rounded-full bg-primary/5" />
          <div className="absolute inset-0 h-20 w-20 -m-2 animate-ping rounded-full bg-primary/10 opacity-30" />
          
          {/* Main loader container */}
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-2xl shadow-primary/25 animate-pulse">
            <Layers className="h-8 w-8 text-primary-foreground animate-spin-slow" />
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 h-16 w-16 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary" />
          </div>
          <div className="absolute inset-0 h-16 w-16 animate-spin-reverse" style={{ animationDuration: '4s' }}>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
          </div>
        </div>

        {/* Brand Name */}
        {variant === "branded" && (
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CodEarn
            </span>
          </div>
        )}

        {/* Main Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-2 text-center tracking-tight">
          {message}
          <span className="text-primary">{dots}</span>
        </h2>

        {/* Sub Message */}
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xs leading-relaxed">
          {subMessage}
        </p>

        {/* Progress Section */}
        {showProgress && (
          <div className="w-full space-y-3">
            {/* Progress bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer" />
              </div>
            </div>

            {/* Progress stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                {loadingMessages[currentMessage]}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        {/* Feature badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { icon: Zap, label: "Fast" },
            { icon: Globe, label: "Secure" },
            { icon: Cpu, label: "Optimized" }
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium animate-fade-in"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <item.icon className="w-3 h-3" />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary/5 to-transparent pointer-events-none" />

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;