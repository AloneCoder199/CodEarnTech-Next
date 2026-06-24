"use client";

import { useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Shield,
  Zap,
  Clock,
  HeadphonesIcon,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from "lucide-react";

/* ================= TYPES ================= */
type FooterLink = {
  name: string;
  href: string;
  desc?: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

/* ================= DATA ================= */
const footerLinks: Record<string, FooterSection> = {
  product: {
    title: "Products",
    links: [
      { name: "Web Development", href: "/solutions?web", desc: "Modern & scalable apps" },
      { name: "Mobile Apps", href: "/solutions?mobile", desc: "iOS & Android solutions" },
      { name: "SaaS Platforms", href: "/solutions?saas", desc: "Startup to enterprise" },
      { name: "API solutions", href: "/solutions?api", desc: "Secure backend systems" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about", desc: "Our mission, vision, and team" },
      { name: "Services", href: "/solutions", desc: "Custom web, mobile, and SaaS" },
      { name: "Training", href: "/training", desc: "Master industry-leading tech skills" },
      { name: "Products", href: "/products", desc: "Innovative digital tools" },
      { name: "Blog", href: "/blogs", desc: "Latest tech insights & updates" },
      { name: "Contact Us", href: "/contact", desc: "Let's talk and build together" },
    ],
  },
  resources: {
    title: "Courses",
    links: [
      { name: "Web Development", href: "/training?web-development", desc: "Next.js, React, and Frontend" },
      { name: "Mobile App Development", href: "/training?mobile-apps", desc: "Cross-platform React Native" },
      { name: "SaaS Architecture", href: "/training?saas-design", desc: "Learn to build and scale products" },
      { name: "UI/UX Design", href: "/training?ui-ux", desc: "Beautiful user experiences" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy", desc: "Data protection rules" },
      { name: "Terms of Service", href: "/terms", desc: "Standard rules & agreements" },
      { name: "Cookie Policy", href: "/cookies", desc: "Information on experience tracking" },
    ],
  },
};

const trustBadges = [
  { icon: Shield, label: "Enterprise Security", desc: "SOC 2 compliant" },
  { icon: Zap, label: "High Performance", desc: "99.9% uptime" },
  { icon: Clock, label: "Fast Delivery", desc: "Agile methodology" },
  { icon: HeadphonesIcon, label: "24/7 Support", desc: "Always available" },
];

/* ================= ACCORDION SECTION COMPONENT (MOBILE) ================= */
const MobileAccordionSection = memo(
  ({ sectionKey, section }: { sectionKey: string; section: FooterSection }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-border/60 py-3">
        {/* Clickable Header Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left text-[13px] font-medium tracking-wide text-foreground py-1"
        >
          <span>{section.title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4 stroke-[1.5]" />
          </motion.div>
        </button>

        {/* Smooth Height Reveal Container */}
        <div className="overflow-hidden">
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "collapsed"}
            variants={{
              open: { height: "auto", marginTop: 10, opacity: 1 },
              collapsed: { height: 0, marginTop: 0, opacity: 0 }
            }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="space-y-3 pl-1 pb-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex flex-col gap-0.5 text-[13px] text-muted-foreground active:text-foreground transition-colors"
                  >
                    <span className="font-normal">{link.name}</span>
                    {link.desc && (
                      <span className="text-[11px] text-muted-foreground/60">
                        {link.desc}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    );
  }
);
MobileAccordionSection.displayName = "MobileAccordionSection";

/* ================= MAIN FOOTER COMPONENT ================= */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground relative overflow-hidden pb-16 lg:pb-0">
      {/* Subtle linear background glow */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/10 to-transparent pointer-events-none" />
      
      {/* -------- TRUST BAR -------- */}
      <div className="border-b border-border/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustBadges.map((item) => (
              <div key={item.label} className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-muted/40 border border-border/40 transition-colors">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{item.label}</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------- MAIN BODY CONTENT -------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 lg:py-16 relative">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Brand Left Column */}
          <div className="lg:col-span-4 space-y-5">
            {/* SAME EXACT ORIGINAL LOGO UNCHANGED */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-codearn-blue to-codearn-purple rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition" />

                <div className="relative w-12 h-12 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                  <Image
                    src="/logo.webp"
                    alt="CodEarn Tech Logo"
                    fill
                    sizes="(max-width: 768px) 100px, 150px" 
                    className="object-contain"
                    priority 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="text-gradient">CodEarn</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Tech
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              Building enterprise-grade SaaS platforms and digital products that scale. 
              From startup to Fortune 500, we deliver excellence.
            </p>

            {/* Apple Styled Contact List */}
            <div className="space-y-2.5 pt-1">
              <a 
                href="mailto:hello@codearntech.com" 
                className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="h-4 w-4 stroke-[1.5]" />
                <span>hello@codearntech.com</span>
              </a>
              
              <a 
                href="tel:+923219515138" 
                className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Phone className="h-4 w-4 stroke-[1.5]" />
                <span>+92 321 9515138</span>
              </a>
              
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground font-light">
                <MapPin className="h-4 w-4 stroke-[1.5]" />
                <span>Pakistan • Global Delivery</span>
              </div>
            </div>

            {/* Micro Badges Status Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-medium tracking-wide text-emerald-600 dark:text-emerald-400 uppercase">
                  Systems Operational
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border/60">
                <ShieldCheck className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-tight">
                  E2E Encrypted
                </span>
              </div>
            </div>
          </div>

          {/* Links Section (Responsive Blocks) */}
          <div className="lg:col-span-8 w-full">
            
            {/* 1. DESKTOP ONLY DIRECTORY LAYOUT */}
            <div className="hidden md:grid grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key} className="space-y-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="group flex flex-col text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          <span className="flex items-center gap-0.5 font-normal">
                            {link.name}
                            <ChevronRight className="h-2.5 w-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </span>
                          {link.desc && (
                            <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors mt-0.5 font-light">
                              {link.desc}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 2. MOBILE ONLY APPLE ACCORDION DROP-DOWNS */}
            <div className="md:hidden flex flex-col border-t border-border/60 mt-2">
              {Object.entries(footerLinks).map(([key, section]) => (
                <MobileAccordionSection 
                  key={key} 
                  sectionKey={key} 
                  section={section} 
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* -------- BOTTOM LEGAL & COPYRIGHT BAR -------- */}
      <div className="border-t border-border/40 bg-muted/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            
            {/* Copyright Note */}
            <div className="flex items-center gap-1.5 order-2 md:order-1 font-light text-center sm:text-left">
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>© {new Date().getFullYear()} CodEarn Tech. Built for Excellence.</span>
            </div>

            {/* Quick Legal Hyperlinks */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 order-1 md:order-2">
              {footerLinks.legal.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-foreground transition-colors text-[11px] font-normal tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}