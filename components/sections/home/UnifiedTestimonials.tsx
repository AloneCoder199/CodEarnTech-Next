"use client";

import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  Play, 
  Github, 
  Linkedin, 
  Quote, 
  Tv, 
  GraduationCap, 
  Briefcase, 
  ArrowUpRight,
  ShieldCheck,
  MoveHorizontal
} from "lucide-react";

// --- TELEMETRY DATA LAYERS ---
const TESTIMONIALS_DATA = {
  video: [
    {
      id: "v1",
      name: "Zain Raza",
      role: "Full-Stack Dev @ Remote US",
      duration: "01:42",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
      metric: "From $0 to $3K+/mo Contract"
    },
    {
      id: "v2",
      name: "Ayesha Khan",
      role: "Next.js Engineer @ DubiTech",
      duration: "02:15",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
      metric: "Bypassed 3 Interview Rounds"
    },
    {
      id: "v3",
      name: "Hamza Nabeel",
      role: "SaaS Builder @ Internal Studio",
      duration: "01:10",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      metric: "Shipped Live Production App"
    }
  ],
  student: [
    {
      id: "s1",
      name: "Ahsan Bilal",
      status: "PLACED // CODEARN STUDIO",
      review: "The production repositories provided here are real-world grade. Documenting performance telemetry and database optimization logs completely flipped my GitHub authority.",
      platform: "GitHub Vetted",
      initials: "AB"
    },
    {
      id: "s2",
      name: "Maria Fatima",
      status: "REMOTE CONTRACT // EU",
      review: "I discontinued my traditional university degree tracks because standard academia was outdated. The distributed system engineering concepts taught here got me my first global contract.",
      platform: "LinkedIn Verified",
      initials: "MF"
    },
    {
      id: "s3",
      name: "Usman Ghani",
      status: "ALUMNI // INDIE BUILDER",
      review: "We didn't build generic clone templates. We managed live multi-tenant state and scaling patterns. The technical panels that interviewed me were blown away by my database case study.",
      platform: "System Logged",
      initials: "UG"
    }
  ],
  client: [
    {
      id: "c1",
      name: "David Vance",
      status: "FOUNDER // NEXUS SAAS",
      review: "CodEarn delivered an elite, multi-tenant Edge infrastructure ahead of deadline. Their code architecture parameters match Silicon Valley operational standards perfectly.",
      platform: "Clutch 5.0/5",
      initials: "DV"
    },
    {
      id: "c2",
      name: "Sarah Jenkins",
      status: "PRODUCT HEAD // FINEDGE",
      review: "Exceptional system design implementation. The PostgreSQL sharding and Cloudflare workers setup they deployed cut our data orchestration latency by exactly 40%.",
      platform: "Upwork Verified",
      initials: "SJ"
    },
    {
      id: "c3",
      name: "M. Al-Suwaidi",
      status: "CEO // EMIRATES LOGISTICS",
      review: "Highly scalable React Native dashboards and real-time secure routing channels. Their technical team works with an extreme level of architectural authority.",
      platform: "Enterprise Auth",
      initials: "AS"
    }
  ]
};

type TabType = "video" | "student" | "client";

export const UnifiedTestimonials = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>("video");
  const [stackIndex, setStackIndex] = useState(0);

  // Tab change hone par mobile stack position reset karne ke liye
  useEffect(() => {
    setStackIndex(0);
  }, [activeTab]);

  const activeItems = TESTIMONIALS_DATA[activeTab];

  return (
    <section className="relative w-full py-16 sm:py-28 bg-background border-b border-primary/[0.03] overflow-hidden">
      
      {/* Background Micro Matrix Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-primary),0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-primary),0.005)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 max-w-6xl w-full relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
            <ShieldCheck className="w-3 h-3 text-primary" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase">
              PROVEN ENTRUST PROTOCOL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Ecosystem Authority.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
            Real software shipped to worldwide enterprises, engineered alongside builders who bypassed traditional academic loops.
          </p>
        </div>

        {/* PILL SELECTOR */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="inline-flex p-1 rounded-full bg-primary/[0.03] border border-primary/10 backdrop-blur-md relative">
            <button
              onClick={() => setActiveTab("video")}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 z-10 flex items-center gap-1.5 ${
                activeTab === "video" ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Video Reels</span>
              {activeTab === "video" && (
                <motion.div layoutId="activeTabIndicator" className="absolute inset-0 bg-foreground rounded-full -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>

            <button
              onClick={() => setActiveTab("student")}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 z-10 flex items-center gap-1.5 ${
                activeTab === "student" ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Grad Engineers</span>
              {activeTab === "student" && (
                <motion.div layoutId="activeTabIndicator" className="absolute inset-0 bg-foreground rounded-full -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>

            <button
              onClick={() => setActiveTab("client")}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 z-10 flex items-center gap-1.5 ${
                activeTab === "client" ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Global Clients</span>
              {activeTab === "client" && (
                <motion.div layoutId="activeTabIndicator" className="absolute inset-0 bg-foreground rounded-full -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP VIEWPORT: PREMIUM 3-COLUMN GRID DISPLAY               */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
          <AnimatePresence mode="wait">
            {activeTab === "video" && TESTIMONIALS_DATA.video.map((video) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="relative aspect-[9/14] rounded-[24px] border border-primary/10 overflow-hidden bg-muted group shadow-sm hover:border-primary/20 transition-all duration-500"
              >
                <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 font-mono text-[8px] tracking-wider text-background/60 bg-background/20 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-full">LENGTH // {video.duration}</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-background/95 border border-primary/10 text-foreground shadow-lg transform group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-500 cursor-pointer z-20">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-mono font-bold text-primary tracking-wide uppercase">{video.metric}</span>
                  <h4 className="text-base font-bold text-white tracking-tight">{video.name}</h4>
                  <p className="text-[11px] text-zinc-400 font-normal">{video.role}</p>
                </div>
              </motion.div>
            ))}

            {activeTab === "student" && TESTIMONIALS_DATA.student.map((student) => (
              <motion.div 
                key={student.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-8 rounded-[24px] border border-primary/10 bg-primary/[0.01] hover:bg-background hover:border-primary/20 hover:shadow-[0_30px_60px_-25px_rgba(var(--color-primary),0.04)] flex flex-col justify-between items-start text-left relative min-h-[280px] transition-all duration-500 group"
              >
                <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/[0.02] pointer-events-none group-hover:text-primary/[0.04] transition-colors duration-500" />
                <div>
                  <div className="flex items-center justify-between w-full mb-5">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-primary">{student.status}</span>
                    <div className="flex gap-2 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300">
                      <Github className="w-3.5 h-3.5 cursor-pointer hover:text-foreground" />
                      <Linkedin className="w-3.5 h-3.5 cursor-pointer hover:text-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal mb-6">"{student.review}"</p>
                </div>
                <div className="flex items-center gap-3 w-full pt-4 border-t border-primary/[0.03]">
                  <div className="w-8 h-8 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center font-mono font-bold text-xs text-primary shrink-0">{student.initials}</div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold tracking-tight text-foreground truncate">{student.name}</h4>
                    <div className="font-mono text-[8px] text-muted-foreground/40 uppercase">{student.platform}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {activeTab === "client" && TESTIMONIALS_DATA.client.map((client) => (
              <motion.div 
                key={client.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-8 rounded-[24px] border border-primary/10 bg-primary/[0.01] hover:bg-background hover:border-primary/20 hover:shadow-[0_30px_60px_-25px_rgba(var(--color-primary),0.04)] flex flex-col justify-between items-start text-left relative min-h-[280px] transition-all duration-500 group"
              >
                <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/[0.02] pointer-events-none group-hover:text-primary/[0.04] transition-colors duration-500" />
                <div>
                  <div className="flex items-center justify-between w-full mb-5">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-primary">{client.status}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal mb-6">"{client.review}"</p>
                </div>
                <div className="flex items-center gap-3 w-full pt-4 border-t border-primary/[0.03]">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs shrink-0">{client.initials}</div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold tracking-tight text-foreground truncate">{client.name}</h4>
                    <div className="font-mono text-[8px] text-muted-foreground/40 uppercase">{client.platform}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEWPORT: ULTRA-PREMIUM TINDER-STYLE STACK DECK        */}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden flex flex-col items-center justify-center w-full px-2">
          
          {/* Main Dynamic Stack Viewport Frame */}
          <div className="relative w-full max-w-[320px] h-[440px] flex items-center justify-center">
            {/* Layers rendering logic (3 items render mechanism loop back to front) */}
            {[2, 1, 0].map((depth) => {
              const cardIndex = (stackIndex + depth) % activeItems.length;
              const item = activeItems[cardIndex];
              const isTopCard = depth === 0;

              return (
                <MobileCardWrapper
                  key={`${activeTab}-${item.id}`}
                  item={item}
                  type={activeTab}
                  depth={depth}
                  isTopCard={isTopCard}
                  onSwipeAway={() => setStackIndex((prev) => prev + 1)}
                />
              );
            })}
          </div>

          {/* Real-time Interaction Instruction Indicator */}
          <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.02] border border-primary/5 text-muted-foreground/50 animate-pulse">
            <MoveHorizontal className="w-3 h-3 text-primary" />
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
              Swipe left / right to toggle logs
            </span>
          </div>

        </div>

      </div>
    </section>
  );
});

// -----------------------------------------------------------------
// MOBILE STACK CARD IMPLEMENTATION CORE SYSTEM NODE
// -----------------------------------------------------------------
interface MobileCardWrapperProps {
  item: any;
  type: TabType;
  depth: number;
  isTopCard: boolean;
  onSwipeAway: () => void;
}

const MobileCardWrapper = ({ item, type, depth, isTopCard, onSwipeAway }: MobileCardWrapperProps) => {
  const x = useMotionValue(0);
  
  // Motion dynamic values maps: Generates tilt angles and opacities as user drags the top item
  const rotate = useTransform(x, [-150, 150], [-12, 12]);
  const opacityExit = useTransform(x, [-150, -100, 0, 100, 150], [0, 0.5, 1, 0.5, 0]);

  const handleDragEnd = (_e: any, info: any) => {
    if (!isTopCard) return;
    
    // Check threshold distance trigger point
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 400) {
      onSwipeAway();
    }
  };

  return (
    <motion.div
      style={{
        x: isTopCard ? x : 0,
        rotate: isTopCard ? rotate : 0,
        opacity: isTopCard ? opacityExit : (depth === 2 ? 0.35 : 0.85),
        zIndex: 30 - depth,
        cursor: isTopCard ? "grab" : "inherit",
      }}
      animate={{
        scale: 1 - depth * 0.05,
        y: depth * 14,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 26,
      }}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={isTopCard ? { cursor: "grabbing" } : {}}
      className="absolute w-full h-full rounded-[24px] border border-primary/10 overflow-hidden bg-background select-none shadow-xl shadow-black/10 flex flex-col justify-between"
    >
      
      {/* CARD INTERIOR CONTENT BASED ON ACTIVE META TYPE */}
      {type === "video" ? (
        <div className="relative w-full h-full flex flex-col justify-end p-5">
          <img src={item.thumbnail} alt={item.name} className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-95" />
          
          <div className="absolute top-4 left-4 font-mono text-[8px] tracking-wider text-background/60 bg-background/20 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-full">LENGTH // {item.duration}</div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-full bg-background border border-primary/10 text-foreground shadow-md pointer-events-none">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>

          <div className="relative z-10 text-left flex flex-col gap-0.5">
            <span className="text-[8px] font-mono font-bold text-primary tracking-wide uppercase">{item.metric}</span>
            <h4 className="text-sm font-bold text-white tracking-tight">{item.name}</h4>
            <p className="text-[10px] text-zinc-400 font-normal">{item.role}</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between items-start text-left bg-gradient-to-b from-primary/[0.01] to-transparent relative">
          <Quote className="absolute top-5 right-5 w-12 h-12 text-primary/[0.02] pointer-events-none" />
          
          <div className="w-full">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-[8px] font-mono font-bold tracking-widest text-primary">{item.status}</span>
              {type === "student" ? (
                <div className="flex gap-1.5 text-muted-foreground/30">
                  <Github className="w-3 h-3" />
                  <Linkedin className="w-3 h-3" />
                </div>
              ) : (
                <ArrowUpRight className="w-3 h-3 text-muted-foreground/30" />
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed font-normal">"{item.review}"</p>
          </div>

          <div className="flex items-center gap-2.5 w-full pt-3.5 border-t border-primary/[0.03]">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 ${
              type === "client" ? "bg-foreground text-background" : "bg-primary/5 border border-primary/10 text-primary"
            }`}>
              {item.initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold tracking-tight text-foreground truncate">{item.name}</h4>
              <div className="font-mono text-[7px] text-muted-foreground/40 uppercase">{item.platform}</div>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};

UnifiedTestimonials.displayName = "UnifiedTestimonials";