"use client";
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  X, 
  Phone, 
  Construction,
  Rocket,
} from "lucide-react";
import { useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  Users, 
  Sparkles,
  Play,
  Calendar,
  Lock,
  Server
} from 'lucide-react';

// Optimized animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

interface ConstructionAlertProps {
  type: 'demo' | 'trial';
}

const handleConstructionAlert = ({ type }: ConstructionAlertProps) => {
  const isDemo = type === 'demo';
  
  toast.custom((t) => (
    <div className="bg-background border rounded-2xl shadow-2xl p-6 w-full max-w-lg relative overflow-hidden">
      {/* Animated gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 animate-gradient" />
      
      {/* Close button */}
      <button 
        onClick={() => toast.dismiss(t)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        {/* Dynamic Icon */}
        <div className="relative">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            isDemo 
              ? 'bg-purple-500/20 text-purple-600' 
              : 'bg-green-500/20 text-green-600'
          }`}>
            {isDemo ? <Rocket className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-3 h-3 text-yellow-900" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 pr-6">
          {/* Title */}
          <div>
            <h3 className="font-bold text-xl tracking-tight">
              {isDemo ? 'Live Demo' : 'Free Trial'} Coming Soon!
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                isDemo 
                  ? 'bg-purple-500/20 text-purple-600 border-purple-500/30' 
                  : 'bg-green-500/20 text-green-600 border-green-500/30'
              }`}>
                {isDemo ? 'DEMO' : 'TRIAL'}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Construction className="w-3 h-3" />
                Under Construction
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Our apologies! We are currently <strong className="text-foreground">fine-tuning</strong> the 
              infrastructure to ensure you get a flawless, world-class experience.
            </p>
            <p>
              At <strong className="text-primary">CodEarn Tech</strong>, we believe in delivering 
              perfection, not just software.
            </p>
            
            {/* Divider */}
            <div className="h-px bg-border my-3" />
            
            <p className="text-foreground font-semibold">
              Would you like to discuss your specific requirements with us directly instead?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.dismiss(t)}
              className="gap-2 flex-1 border-primary/50 hover:bg-primary/10"
            >
              <Clock className="w-4 h-4" />
              I Can Wait!
            </Button>

            <Button 
              size="sm"
              onClick={() => {
                toast.dismiss(t);
                window.location.href = '/book-call';
              }}
              className="gap-2 flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone className="w-4 h-4" />
              Book a Strategy Call
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none ${
        isDemo ? 'bg-purple-500/10' : 'bg-green-500/10'
      }`} />
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
    </div>
  ), {
    duration: Infinity,
  });
};

// Helper functions for easy usage
const showDemoAlert = () => handleConstructionAlert({ type: 'demo' });
const showTrialAlert = () => handleConstructionAlert({ type: 'trial' });

export { handleConstructionAlert, showDemoAlert, showTrialAlert };


const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [spotCount, setSpotCount] = useState(47);
  
  // Simulate live spot counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotCount(prev => {
        if (prev > 12) return prev - Math.floor(Math.random() * 2);
        return prev;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Setup in under 10 minutes",
    "Cancel anytime"
  ];

  const trustBadges = [
    { icon: <Shield className="w-4 h-4" />, label: "SOC 2 Compliant" },
    { icon: <Lock className="w-4 h-4" />, label: "256-bit Encryption" },
    { icon: <Server className="w-4 h-4" />, label: "99.9% Uptime SLA" }
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 pointer-events-none" />
      
      {/* Floating particles effect (CSS-only for performance) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative"
        >
          {/* Main CTA Card */}
          <motion.div 
            className="relative rounded-3xl bg-card border border-border overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <motion.div  className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Limited Beta Access
                  </span>
                </motion.div>

                <motion.h2 
                  className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight"
                >
                  Ready to stop fighting<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                    your network tools?
                  </span>
                </motion.h2>

                <motion.p 
                  
                  className="text-lg text-muted-foreground mb-8 max-w-md"
                >
                  Join 200+ ISPs who've switched to infrastructure that actually understands their business. No sales calls, no BS.
                </motion.p>

                {/* Urgency Counter */}
                <motion.div 
                  
                  className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-sm font-medium text-destructive">
                    Only {spotCount} beta spots remaining this month
                  </span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-4 mb-8">
  {/* Start Free Trial Button */}
  <button 
    onClick={() => handleConstructionAlert({ type: 'demo' })}
    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="relative flex items-center gap-2">
      Start Free Trial
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </span>
  </button>
  
  {/* Schedule Demo Button */}
  <button 
    onClick={() => handleConstructionAlert({ type: 'demo' })}
    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300 hover:border-primary/20 cursor-pointer"
  >
    <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
    Schedule Demo
  </button>
</motion.div>

                {/* Benefit Pills */}
                <motion.div  className="flex flex-wrap gap-3">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Content - Interactive Preview/Stats */}
              <div className="relative bg-muted/50 p-8 lg:p-12 xl:p-16 flex flex-col justify-center border-l border-border">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />

                <motion.div variants={staggerContainer} className="relative space-y-6">
                  {/* Quick Stats */}
                  <motion.div  className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs font-medium text-muted-foreground">Setup Time</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">10 min</div>
                      <div className="text-xs text-muted-foreground">Average</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-background border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">ROI Timeline</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">48 hrs</div>
                      <div className="text-xs text-muted-foreground">To break even</div>
                    </div>
                  </motion.div>

                  {/* Trust Stack */}
                  <motion.div  className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">No Credit Card Required</div>
                        <div className="text-xs text-muted-foreground">Start instantly, upgrade when ready</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">200+ ISPs Onboarded</div>
                        <div className="text-xs text-muted-foreground">Serving 500K+ end customers</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Security Badges */}
                  <motion.div  className="pt-4 border-t border-border">
                    <div className="flex flex-wrap items-center gap-4">
                      {trustBadges.map((badge, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className="text-primary">{badge.icon}</span>
                          <span>{badge.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative gradient orb */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Trust Bar */}
          <motion.div 
            
            className="mt-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left"
          >
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span> from 127 reviews
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Free migration assistance
              </span>
              <span className="hidden lg:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                24/7 engineer support
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;