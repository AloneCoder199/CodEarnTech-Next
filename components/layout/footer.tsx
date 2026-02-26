"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Shield,
  Zap,
  Clock,
  HeadphonesIcon,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";

/* ================= TYPES ================= */
type FooterLink = {
  name: string;
  href: string;
  desc?: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

/* ================= DATA - CLEAN & MEANINGFUL ================= */

const footerLinks: Record<string, FooterSection> = {
  product: {
    title: "Products",
    links: [
      { name: "Web Development", href: "/services?web", desc: "Modern & scalable apps" },
      { name: "Mobile Apps", href: "/services?mobile", desc: "iOS & Android solutions" },
      { name: "SaaS Platforms", href: "/services?saas", desc: "Startup to enterprise" },
      { name: "API Services", href: "/services?api", desc: "Secure backend systems" },
    ],
  },
  company: {
    title: "Company",
  links: [
  { 
    name: "About Us", 
    href: "/about", 
    desc: "Our mission, vision, and the team behind CodEarn Tech" 
  },
  { 
    name: "Services", 
    href: "/services", 
    desc: "Custom web, mobile, and SaaS solutions for your business" 
  },
  { 
    name: "Training", 
    href: "/training", 
    desc: "Master industry-leading tech skills with expert mentors" 
  },
  { 
    name: "Products", 
    href: "/products", 
    desc: "Innovative digital tools and ready-to-launch SaaS platforms" 
  },
  { 
    name: "Blog", 
    href: "/blogs", 
    desc: "Latest tech insights, tutorials, and industry updates" 
  },
  { 
    name: "Contact Us", 
    href: "/contact", 
    desc: "Have a project in mind? Let’s talk and build together" 
  },
],


  },
  resources: {
    title: "Courses",
links: [
  { 
    name: "Web Development", 
    href: "/training?web-development", 
    desc: "Master Next.js, React, and Modern Frontend" 
  },
  { 
    name: "Mobile App Development", 
    href: "/training?mobile-apps", 
    desc: "Build cross-platform apps with React Native" 
  },
  { 
    name: "SaaS Architecture", 
    href: "/training?saas-design", 
    desc: "Learn to build and scale your own products" 
  },
  { 
    name: "UI/UX Design", 
    href: "/training?ui-ux", 
    desc: "Crafting beautiful and user-centric digital experiences" 
  },
],

  },
  legal: {
    title: "Legal",
    links: [
  { 
    name: "Privacy Policy", 
    href: "/privacy-policy", 
    desc: "How we protect and manage your personal data" 
  },
  { 
    name: "Terms of Service", 
    href: "/terms", 
    desc: "The standard rules and agreements for using our platform" 
  },
  { 
    name: "Cookie Policy", 
    href: "/cookies", 
    desc: "Information about how we use cookies to improve your experience" 
  },
  
],

  },
};

const trustBadges = [
  { icon: Shield, label: "Enterprise Security", desc: "SOC 2 compliant" },
  { icon: Zap, label: "High Performance", desc: "99.9% uptime" },
  { icon: Clock, label: "Fast Delivery", desc: "Agile methodology" },
  { icon: HeadphonesIcon, label: "24/7 Support", desc: "Always available" },
];

// Social links ready for paste
const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:bg-sky-500/10 hover:text-sky-500" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:bg-blue-500/10 hover:text-blue-500" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:bg-blue-600/10 hover:text-blue-600" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:bg-pink-500/10 hover:text-pink-500" },
];

/* ================= COMPONENT ================= */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground relative overflow-hidden">
      {/* Subtle linear background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 to-transparent pointer-events-none" />
      
      {/* Trust Bar - Professional */}
      <div className="border-b border-border relative">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((item) => (
              <div key={item.label} className="flex items-center gap-3 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 relative">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Brand Column - Professional Logo */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo with webp support */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden group-hover:ring-2 ring-primary/20 transition-all duration-300">
                <Image
  src="/logo.webp"
  alt="CodEarn Tech Logo"
  fill
  // ✅ Ye line add karein: 
  // Iska matlab hai: mobile par 100px aur desktop par bhi 150px approx
  sizes="(max-width: 768px) 100px, 150px" 
  className="object-contain"
  priority // ✅ Logo ke liye priority zaroori hai taake FCP behtar ho
/>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  CodEarn <span className="text-primary">Tech</span>
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Software Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Building enterprise-grade SaaS platforms and digital products that scale. 
              From startup to Fortune 500, we deliver excellence.
            </p>

            {/* Contact Info - Clean */}
            <div className="space-y-3">
              <a 
                href="mailto:hello@codearntech.com" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="group-hover:underline">hello@codearntech.com</span>
              </a>
              
              <a 
                href="tel:+923219515138" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="group-hover:underline">+92 321 9515138</span>
              </a>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Pakistan • Global Delivery</span>
              </div>
            </div>

            {/* Social Links - Ready for paste */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
  {/* Live Status - Gives a Professional Tech Feel */}
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
      Systems Operational
    </span>
  </div>

  {/* Security Badge */}
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">
      E2E Encrypted Data
    </span>
  </div>
</div>

          </div>

          {/* Links Grid - Clean 4 Column */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.values(footerLinks).map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    {section.title}
                    <div className="h-px flex-1 bg-border" />
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="group flex flex-col gap-0.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <span className="flex items-center gap-1 font-medium">
                            {link.name}
                            <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </span>
                          {link.desc && (
                            <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
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
          </div>
        </div>
      </div>

      {/* Bottom Bar - Professional */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>© {new Date().getFullYear()} CodEarn Tech. All rights reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerLinks.legal.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200 text-xs uppercase tracking-wider font-medium"
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







