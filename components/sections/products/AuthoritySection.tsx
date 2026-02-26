"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Shield, 
  ShieldCheck,
  Construction,
  Zap, 
  Heart, 
  Users, 
  Star, 
  Quote,
  CheckCircle2,
  Radio,
  MessageCircle
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const TrustAuthoritySection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const values = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Engineer-First",
      description: "Built by engineers who understand the grind, not marketers who just sell it."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Radical Transparency",
      description: "Open roadmap, public changelogs, and honest communication about what works and what doesn't."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Speed & Reliability",
      description: "Zero tolerance for downtime. We know every second of outage costs you customers."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "ISP DNA",
      description: "We don't just serve ISPs—we think like them. Your problems are our problems."
    }
  ];

  const testimonials = [
    {
      quote: "Finally, a tool built by people who actually understand what we deal with daily. No fluff, just works.",
      author: "Rahul Sharma",
      role: "CTO, FastNet Broadband",
      rating: 5
    },
    {
      quote: "Switched from a legacy solution and never looked back. These guys clearly have ISP experience.",
      author: "Priya Patel",
      role: "Network Engineer, CityLink",
      rating: 5
    },
    {
      quote: "The transparency is refreshing. They told us upfront what they can't do yet, instead of overpromising.",
      author: "Amit Kumar",
      role: "Founder, RuralConnect",
      rating: 5
    }
  ];


  
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        //   variants={fadeInUp}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Built with Trust</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Why ISPs trust us with their<br className="hidden lg:block" /> critical infrastructure
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not another faceless SaaS company. We're engineers who built the tool we wished we had when running ISPs.
          </p>
        </motion.div>

        {/* Founder Message + Video Section */}
       <motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 mt-12" // mt-12 se thora nichay kiya hai
>
  {/* Founder Image Side */}
  <div className="relative group cursor-help">
    {/* Outer Glow Effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="relative aspect-[4/5] sm:aspect-video bg-muted rounded-2xl overflow-hidden border border-border shadow-2xl">
      {/* 📸 FOUNDER IMAGE */}
      <img 
        src="/founder.webp" 
        alt="Founder of CodEarn Tech"
        className="w-full h-full object-cover transition-all duration-700 blur-lg group-hover:blur-0 scale-110 group-hover:scale-100"
      />

      {/* 💬 HOVER MESSAGE: Yeh sirf hover par nazar aayega */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
        <div className="bg-background/95 p-6 rounded-2xl border border-primary/30 shadow-2xl max-w-[280px] text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
             <Construction className="w-6 h-6 text-primary" />
           </div>
           <h4 className="text-lg font-bold text-foreground mb-2">A Personal Note ✉️</h4>
           <p className="text-[13px] text-muted-foreground leading-relaxed">
             "Deepest apologies! We are currently <b>handcrafting</b> this product to perfection. I promise the wait will be worth the transformation your business deserves."
           </p>
           <div className="mt-4 pt-3 border-t border-border">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">-Muhammad Bilal</p>
           </div>
        </div>
      </div>

      {/* Default Label (Before Hover) */}
      <div className="absolute inset-0 flex items-center justify-center group-hover:hidden transition-all">
        <div className="bg-background/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-xl">
           <p className="text-xs font-bold text-foreground flex items-center gap-2">
             <MessageCircle className="w-4 h-4 text-primary animate-pulse" />
             REVEAL FOUNDER'S MESSAGE
           </p>
        </div>
      </div>
    </div>
  </div>

  {/* Message Side */}
  <div className="space-y-6">
    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
      <ShieldCheck className="w-4 h-4" />
      <span>Directly from the Visionary</span>
    </div>
    
    <blockquote className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed italic">
      "True innovation isn't about being first; it's about being right. We are building the future, one precise line of code at a time."
    </blockquote>
    
    <div className="flex items-center gap-4 pt-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background shadow-lg flex items-center justify-center">
        <span className="text-xl font-bold text-primary-foreground">AK</span>
      </div>
      <div>
        <div className="font-bold text-xl text-foreground tracking-tight">Muhammad Bilal</div>
        <div className="text-sm text-muted-foreground font-medium">Founder & Former ISP Architect</div>
      </div>
    </div>
  </div>
</motion.div>

        {/* Engineer-First Positioning Banner */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        //   variants={fadeInUp}
          className="relative mb-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl" />
          <div className="relative px-8 py-12 lg:px-16 lg:py-16 rounded-3xl border border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Built by Engineers, Not Marketers</h3>
                  <p className="text-muted-foreground max-w-xl">
                    Our team speaks BGP, OSPF, and VLANs natively. We don't have a sales team—we have engineers who answer your technical questions directly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                    >
                      E{i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="block font-semibold text-foreground">12 Engineers</span>
                  <span>0 Salespeople</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
            //   variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Early Tester Feedback */}
       

        {/* Community Badge */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        //   variants={fadeInUp}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-3xl opacity-50" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-10 lg:px-12 lg:py-12 rounded-3xl border border-primary/20 bg-card overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
            
            <div className="relative flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary text-primary-foreground">
                    COMMUNITY
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Since 2023</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  Built with ISPs, Not Just for Them
                </h3>
                <p className="text-muted-foreground max-w-lg">
                  Our roadmap is shaped by 50+ ISP operators who beta tested early versions. You're not just a customer—you're a co-creator.
                </p>
              </div>
            </div>

            <div className="relative flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground shadow-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-primary border-2 border-card flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm">
                  +45
                </div>
              </div>
              
              <div className="hidden lg:block h-8 w-px bg-border" />
              
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>50+ Beta Testers</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Open Roadmap</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustAuthoritySection;