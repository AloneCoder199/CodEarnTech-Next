"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Trash2, 
  Download, 
  Cookie, 
  Server, 
  Users, 
  Clock, 
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Mail,
  ExternalLink,
  Fingerprint,
  Globe
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const sections = [
  { id: 'introduction', title: 'Introduction', icon: FileText },
  { id: 'collection', title: 'What We Collect', icon: Fingerprint },
  { id: 'usage', title: 'How We Use It', icon: Eye },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'sharing', title: 'Data Sharing', icon: Users },
  { id: 'security', title: 'Security Measures', icon: Lock },
  { id: 'rights', title: 'Your Rights', icon: Shield },
  { id: 'third-party', title: 'Third-Party Services', icon: Globe },
  { id: 'children', title: "Children's Privacy", icon: Users },
  { id: 'updates', title: 'Policy Updates', icon: Clock },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [lastUpdated] = useState('February 18, 2026');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Data, Your Control</span>
            </motion.div>

            <motion.h1 
              
              className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Privacy Policy
            </motion.h1>

            <motion.p 
              
              className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              We build software, not trust empires. Here's exactly how we handle your data — 
              no legal jargon, no hidden clauses.
            </motion.p>

            <motion.div  className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Last updated: {lastUpdated}
              </span>
              <span className="hidden sm:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Version 2.1
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    On this page
                  </h3>
                </div>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-left">{section.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}

                {/* Trust Badge */}
                <div className="mt-8 p-4 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Zero Data Sales</div>
                      <div className="text-xs text-muted-foreground">Never sold, never will</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We don't monetize your data. We monetize software that solves your problems.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <motion.div 
                  id="introduction"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Introduction</h2>
                  </div>
                  
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      At <strong className="text-foreground">CodEarn Tech</strong>, privacy isn't a compliance checkbox — 
                      it's a core engineering principle. We believe that trust is earned through transparency, 
                      not buried in legal fine print.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      This policy explains, in plain English, what data we collect, why we need it, 
                      how we protect it, and — most importantly — your rights over your own information.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Data Minimization', desc: 'We collect only what is essential' },
                      { label: 'Purpose Limitation', desc: 'Used only for stated purposes' },
                      { label: 'User Sovereignty', desc: 'You own and control your data' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="font-semibold text-foreground text-sm mb-1">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* What We Collect */}
                <motion.div 
                  id="collection"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Fingerprint className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Information We Collect</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
                        Personal Information
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We collect personal data only when you explicitly provide it through:
                      </p>
                      <ul className="space-y-3 mb-6">
                        {['Contact forms', 'Waitlist / early access signup', 'Newsletter subscriptions', 'Support inquiries'].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Collected:</strong> Name, email address, company name (optional), and message content.
                        </p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
                        Technical & Usage Data
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Automatically collected, anonymized technical data:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          'Device type & OS',
                          'Browser version',
                          'Pages visited',
                          'Session duration',
                          'Performance metrics',
                          'Error logs (anonymized)'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4 inline mr-2 text-primary" />
                          <strong className="text-foreground">Note:</strong> This data is anonymized and cannot be traced back to individual users.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* How We Use It */}
                <motion.div 
                  id="usage"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">How We Use Your Information</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">
                      Your data serves specific, legitimate purposes — never marketing spam or hidden profiling.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { title: 'Product Improvement', desc: 'Enhancing features based on usage patterns' },
                        { title: 'User Experience', desc: 'Personalizing interface and recommendations' },
                        { title: 'Security Alerts', desc: 'Critical updates and breach notifications' },
                        { title: 'Fraud Prevention', desc: 'Detecting unauthorized access attempts' },
                        { title: 'Legal Compliance', desc: 'Regulatory requirements and tax obligations' },
                        { title: 'Support', desc: 'Resolving technical issues and inquiries' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                      <p className="text-sm text-destructive font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        We never use your data for:
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 ml-6">
                        Third-party advertising • Data broker sales • Behavioral profiling for ad targeting • 
                        Political campaigning • Unauthorized AI training
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Cookies */}
                <motion.div 
                  id="cookies"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Cookies & Tracking</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {[
                        { type: 'Essential', desc: 'Required for basic functionality', required: true },
                        { type: 'Analytics', desc: 'Anonymous usage statistics', required: false },
                        { type: 'Preferences', desc: 'Remember your settings', required: false }
                      ].map((cookie, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground text-sm">{cookie.type}</span>
                            {cookie.required ? (
                              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Required</span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Optional</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{cookie.desc}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      We use only non-intrusive cookies. No aggressive tracking, no cross-site profiling. 
                      You can disable optional cookies in your browser settings, though some features may be limited.
                    </p>
                  </div>
                </motion.div>

                {/* Data Sharing */}
                <motion.div 
                  id="sharing"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Data Sharing Policy</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-8 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Our Promise</h4>
                        <p className="text-sm text-muted-foreground">
                          We do not sell, rent, or trade your personal data. Ever. This includes anonymized datasets 
                          that could potentially be re-identified.
                        </p>
                      </div>
                    </div>

                    <h4 className="font-semibold text-foreground mb-4">Limited exceptions:</h4>
                    <ul className="space-y-4">
                      {[
                        { title: 'Service Providers', desc: 'Trusted infrastructure partners (hosting, email) under strict confidentiality agreements' },
                        { title: 'Legal Requirements', desc: 'Only when required by valid court order or regulatory mandate' },
                        { title: 'Business Transfers', desc: 'In case of merger/acquisition, with continued privacy obligations' }
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{idx + 1}</span>
                          </div>
                          <div>
                            <span className="font-medium text-foreground text-sm">{item.title}:</span>
                            <span className="text-sm text-muted-foreground ml-1">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Security */}
                <motion.div 
                  id="security"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Security Measures</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {[
                        { icon: Lock, label: 'AES-256 Encryption', desc: 'At rest & in transit' },
                        { icon: Server, label: 'SOC 2 Type II', desc: 'Certified infrastructure' },
                        { icon: Shield, label: 'Zero Trust', desc: 'No implicit trust model' },
                        { icon: Clock, label: '24/7 Monitoring', desc: 'Automated threat detection' }
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                            <div className="font-semibold text-foreground text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Security is a process, not a product.</strong> While we implement 
                        industry-standard protections, no internet system is 100% immune. We conduct regular penetration testing, 
                        maintain bug bounty programs, and encrypt all sensitive data using AES-256.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Your Rights */}
                <motion.div 
                  id="rights"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Your Data Rights</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Eye, title: 'Right to Access', desc: 'Request complete copy of your data', action: 'Request Export' },
                      { icon: CheckCircle2, title: 'Right to Rectification', desc: 'Correct inaccurate information', action: 'Update Profile' },
                      { icon: Trash2, title: 'Right to Erasure', desc: 'Delete your data permanently', action: 'Request Deletion' },
                      { icon: Download, title: 'Data Portability', desc: 'Export in machine-readable format', action: 'Download Data' }
                    ].map((right, idx) => {
                      const Icon = right.icon;
                      return (
                        <div key={idx} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">{right.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{right.desc}</p>
                          <button className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                            {right.action}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground text-center">
                      To exercise any right, email us at <strong className="text-primary">privacy@codearntech.com</strong>. 
                      We respond within 72 hours.
                    </p>
                  </div>
                </motion.div>

                {/* Third Party */}
                <motion.div 
                  id="third-party"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Third-Party Services</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">
                      Our platform integrates with select third-party services. Each maintains their own privacy policies:
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Vercel', purpose: 'Hosting & Infrastructure', link: '#' },
                        { name: 'Stripe', purpose: 'Payment Processing', link: '#' },
                        { name: 'Postmark', purpose: 'Email Delivery', link: '#' },
                        { name: 'Plausible Analytics', purpose: 'Privacy-First Analytics', link: '#' }
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                          <div>
                            <div className="font-medium text-foreground">{service.name}</div>
                            <div className="text-xs text-muted-foreground">{service.purpose}</div>
                          </div>
                          <a href={service.link} className="text-sm text-primary flex items-center gap-1 hover:underline">
                            Policy <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Children */}
                <motion.div 
                  id="children"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Children's Privacy</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10 mb-4">
                      <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Age Restriction</h4>
                        <p className="text-sm text-muted-foreground">
                          Our services are not intended for users under 13 years of age. We do not knowingly collect 
                          personal information from children.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If you believe we have inadvertently collected data from a child under 13, please contact us immediately 
                      at <strong className="text-primary">privacy@codearntech.com</strong>. We will delete such information 
                      within 24 hours of verification.
                    </p>
                  </div>
                </motion.div>

                {/* Updates */}
                <motion.div 
                  id="updates"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Policy Updates</h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">
                      We may update this policy as our products evolve or legal requirements change. 
                      Significant changes will be notified via:
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      {['Email notification', 'In-app alert', 'Website banner', 'Changelog entry'].map((method, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground border border-border">
                          {method}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Current Version:</strong> 2.1 (Effective: {lastUpdated})<br />
                        <strong className="text-foreground">Previous Version:</strong> 2.0 (Jan 15, 2026) — 
                        <a href="#" className="text-primary hover:underline ml-1">View Changes</a>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact */}
                <motion.div 
                  id="contact"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Contact Us</h2>
                  </div>

                  <div className="bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 lg:p-12">
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-4">Questions about your privacy?</h3>
                      <p className="text-muted-foreground mb-8">
                        Our engineering team handles privacy inquiries directly. No bots, no scripted responses — 
                        just technical people who understand data protection.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                          href="mailto:privacy@codearntech.com"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                        >
                          <Mail className="w-4 h-4" />
                          privacy@codearntech.com
                        </a>
                        <span className="text-sm text-muted-foreground">
                          Response time: &lt; 72 hours
                        </span>
                      </div>

                      <div className="mt-8 pt-8 border-t border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">CodEarn Tech</strong> •  Innovation Drive, Tech City • 
                          Samundri : Faislabad
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Trust Statement */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-6">
            "User data remains the property of the user."
          </blockquote>
          <p className="text-muted-foreground">
            We build software. We earn trust. We never sell it.
          </p>
        </div>
      </section>
    </div>
  );
}