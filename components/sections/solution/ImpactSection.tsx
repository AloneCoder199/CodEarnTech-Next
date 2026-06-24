"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, TrendingUp, ShieldCheck, Zap } from "lucide-react";

const IMPACT_METRICS = [
  { label: "Active Operators", value: "5,000+", icon: Users },
  { label: "Performance Boost", value: "40%", icon: Zap },
  { label: "System Uptime", value: "99.9%", icon: ShieldCheck },
  { label: "Revenue Growth", value: "2x", icon: TrendingUp },
];

export default function ImpactSection() {
  return (
    <section className="py-24 bg-background px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {IMPACT_METRICS.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="mb-4 p-3 rounded-2xl bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground mb-1">
        {value}
      </h3>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
}