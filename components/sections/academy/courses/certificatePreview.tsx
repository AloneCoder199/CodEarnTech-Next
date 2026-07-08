'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '../../../../lib/data'; // Path verification verified janii g
import { 
  Award, 
  CheckCircle2, 
  CalendarDays, 
  FileCheck, 
  QrCode, 
  ShieldCheck, 
  Sparkles,
  Users
} from 'lucide-react';

interface CertificatePreviewProps {
  slug: string;
}

export default function CertificatePreview({ slug }: CertificatePreviewProps) {
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Pure strict data framework for criteria validation audit
  const criteriaPoints = [
    {
      id: "01",
      title: "85% Lecture Attendance",
      desc: "Live class tracking data and interactive code-along system checkpoints verified automatically.",
      icon: Users,
    },
    {
      id: "02",
      title: "10 Production Builds Committed",
      desc: "All 10 bootcamp software repositories must be fully pushed and audited on your live GitHub engine.",
      icon: FileCheck,
    },
    {
      id: "03",
      title: "Final Capstone Evaluation",
      desc: "Deploy a secure multi-tenant web ecosystem that passes our strict speed and scaling validation loops.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative border-b border-border/40 overflow-hidden">
      
      {/* Structural Ambient Background Lighting Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading Row Architecture */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Direct Verification Assets
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Earn Your Cryptographic <br className="hidden sm:block" /> <span className="text-primary">Engineering Credentials</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Unlock a globally shareable, verifiable certification upon mastering the production criteria guidelines.
          </p>
        </div>

        {/* 
          SPLIT LAYOUT MATRIX:
          Mobile: Neat stacking that fits perfectly inside tight margins.
          Desktop: Beautiful 2-column spatial grid layout.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          
          {/* Left Block: THE HIGH-FIDELITY CSS CERTIFICATE MOCKUP */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-[440px] aspect-[1.414/1] bg-card border border-border/60 rounded-2xl p-4 sm:p-6 relative shadow-2xl overflow-hidden group hover:border-primary/20 transition-all duration-500">
              
              {/* Premium Geometric Security Borders and Watermark Borders */}
              <div className="absolute inset-2 border border-muted/60 rounded-xl pointer-events-none" />
              <div className="absolute inset-2.5 border border-dashed border-border/40 rounded-xl pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/[0.02] blur-xl rounded-full group-hover:bg-primary/[0.04] transition-all duration-500" />

              {/* Certificate Internal Grid Content Header */}
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-black text-primary tracking-widest uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse" /> CodEarn Academy
                  </div>
                  <div className="text-[7px] text-muted-foreground/40 font-mono tracking-wider">VERIFICATION ID: CET-2026-99X8</div>
                </div>
                {/* Simulated Verification Smart QR Code Element */}
                <div className="p-1 bg-muted/40 border border-border/30 rounded-lg shrink-0 group-hover:border-primary/20 transition-colors">
                  <QrCode className="w-6 h-6 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                </div>
              </div>

              {/* Main Credentials Core Content Body block */}
              <div className="text-center mt-6 sm:mt-8 space-y-2 relative z-10">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">[ CERTIFICATE OF EXCELLENCE ]</h4>
                <p className="text-[9px] text-muted-foreground/40 italic">This cryptographic registry proudly certifies that</p>
                
                {/* Dynamically Styled Student Name Placeholder Field */}
                <div className="py-1 border-b border-border/60 max-w-[200px] mx-auto">
                  <span className="text-sm font-black tracking-tight text-foreground font-mono">YOUR FULL NAME</span>
                </div>
                
                <p className="text-[8px] sm:text-[9px] text-muted-foreground/60 max-w-[280px] mx-auto leading-relaxed pt-1">
                  has successfully completed all intensive pipeline builds, architecture assessments, and live repository validation audits for:
                </p>
                <div className="text-[11px] font-extrabold tracking-tight text-primary font-mono uppercase">
                  {course.title || "Full-Stack Software Engineering"}
                </div>
              </div>

              {/* Bottom Authority Endorsement Signature Strip Area */}
              <div className="flex justify-between items-end mt-8 sm:mt-12 px-2 relative z-10">
                <div className="text-left space-y-0.5">
                  <div className="text-[9px] font-mono font-black tracking-tight text-foreground border-b border-border/40 pb-0.5 w-20 text-center italic">Subhan.Dev</div>
                  <div className="text-[7px] font-mono text-muted-foreground/40 uppercase tracking-wider">Director Core</div>
                </div>
                
                {/* Simulated Verification Security Emblem Badge Graphic */}
                <div className="w-8 h-8 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Award className="w-4 h-4 text-primary" />
                </div>

                <div className="text-right space-y-0.5">
                  <div className="text-[8px] font-mono font-black text-foreground flex items-center gap-0.5 justify-end">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> Secure
                  </div>
                  <div className="text-[7px] font-mono text-muted-foreground/40 uppercase tracking-wider">Cloud Verified</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: THE AUDITED PERFORMANCE REQUIREMENTS CHECKS LIST */}
          <div className="lg:col-span-5 space-y-3 w-full">
            <span className="text-[10px] font-mono font-black text-muted-foreground/60 uppercase tracking-widest block mb-1 px-1">[ LOCK CRITERIA ]</span>
            
            {criteriaPoints.map((point) => {
              const PointIcon = point.icon;
              return (
                <div 
                  key={point.id} 
                  className="group flex gap-4 bg-card/40 border border-border/60 hover:border-border p-3.5 rounded-2xl transition-all duration-300 items-start"
                >
                  <div className="p-2 rounded-xl bg-muted/60 border border-border/30 text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 shrink-0">
                    <PointIcon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {point.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}