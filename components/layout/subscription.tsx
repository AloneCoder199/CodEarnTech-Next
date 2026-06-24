"use client";

import { SubscriptionForm } from "../subscription-form";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users } from "lucide-react";

export default function SubscribeSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-xl mx-auto px-6 text-center">
        
        {/* Compact, Clean Header */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
          Stay in the loop.
        </h2>
        
        <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
          Curated SaaS blueprints and CodEarn tech drops, delivered without the noise.
        </p>

        {/* Minimalist Form Wrapper - No heavy hover scales, just clean focus */}
        <div className="mb-8">
          <SubscriptionForm />
        </div>
        
        {/* Subtle Trust Indicators - Removing the grid/mesh clutter */}
        <div className="flex justify-center items-center gap-6">
          {[
            { icon: Users, text: "5k+ Operators" },
            { icon: ShieldCheck, text: "Private" },
            { icon: Zap, text: "No Spam" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/70">
              <item.icon className="w-3 h-3" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}