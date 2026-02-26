"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  Mail,
  Shield, 
  Clock, 
  Server, 
  Code2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  FileText,
  GitBranch,
  History,
  Zap,
  Lock,
  Globe,
  CreditCard,
  Users,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Hammer,
  Menu,
  X,
  ArrowUp
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const sections = [
  { id: 'acceptance', title: 'Acceptance', icon: CheckCircle2, shortTitle: 'Acceptance' },
  { id: 'service', title: 'Service Description', icon: Server, shortTitle: 'Service' },
  { id: 'accounts', title: 'Account Terms', icon: Users, shortTitle: 'Accounts' },
  { id: 'acceptable-use', title: 'Acceptable Use', icon: Shield, shortTitle: 'Use Policy' },
  { id: 'payment', title: 'Payment', icon: CreditCard, shortTitle: 'Billing' },
  { id: 'sla', title: 'SLA', icon: Clock, shortTitle: 'SLA' },
  { id: 'intellectual', title: 'Intellectual Property', icon: FileText, shortTitle: 'IP Rights' },
  { id: 'termination', title: 'Termination', icon: XCircle, shortTitle: 'Termination' },
  { id: 'liability', title: 'Liability', icon: Scale, shortTitle: 'Liability' },
  { id: 'disputes', title: 'Disputes', icon: MessageSquare, shortTitle: 'Disputes' },
  { id: 'changes', title: 'Changes', icon: History, shortTitle: 'Updates' },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string | null>('acceptance');
  const [lastUpdated] = useState('February 18, 2026');
  const [version] = useState('3.2.1');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsNavOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Single accordion behavior - only one open at a time
  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
    
    // Scroll to section on mobile when opened
    if (isMobile && activeSection !== id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // Account for floating nav
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div  className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1 
              
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 lg:mb-6 text-center"
            >
              Terms of Service
            </motion.h1>

            <motion.div  className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs lg:text-sm text-muted-foreground mb-6 lg:mb-8">
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <GitBranch className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                v{version}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {lastUpdated}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                Valid
              </span>
            </motion.div>

            <motion.div  className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-8">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Hammer className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm lg:text-base mb-1 lg:mb-2">Engineer-First Legal</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                    Legal docs should be readable as code. Each section has a <span className="text-primary font-medium">TL;DR</span> summary. 
                    No corporate judo.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Sections
                  </h3>
                </div>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-left truncate">{section.title}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" />}
                    </button>
                  );
                })}

                <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Stats
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Read time</span>
                      <span className="font-medium text-foreground">8 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sections</span>
                      <span className="font-medium text-foreground">11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area - Mobile Optimized */}
            <div className="lg:col-span-9 space-y-3 lg:space-y-4">
              {/* Acceptance */}
              <ClauseCard 
                id="acceptance"
                title="1. Acceptance of Terms"
                icon={CheckCircle2}
                tldr="By using our service, you agree to these terms. Don't agree? Don't use it."
                isActive={activeSection === 'acceptance'}
                onToggle={() => toggleSection('acceptance')}
                isMobile={isMobile}
              >
                <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>
                    By accessing CodEarn Tech's services, you agree to be bound by these Terms. 
                    If you're using this on behalf of an organization, you confirm you have authority to bind them.
                  </p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border">
                    <h4 className="font-semibold text-foreground text-sm mb-1.5">Age Requirement</h4>
                    <p className="text-sm">You must be 18+ or legal age in your jurisdiction. By using the Service, you confirm this.</p>
                  </div>
                </div>
              </ClauseCard>

              {/* Service */}
              <ClauseCard 
                id="service"
                title="2. Service Description"
                icon={Server}
                tldr="We provide ISP management software. We own the platform, you own your data."
                isActive={activeSection === 'service'}
                onToggle={() => toggleSection('service')}
                isMobile={isMobile}
              >
                <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>Cloud-based network management tools for ISPs and network operators.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold text-green-600 text-sm mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Included
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Network monitoring</li>
                        <li>• Customer management</li>
                        <li>• Automated billing</li>
                        <li>• API access</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <h4 className="font-semibold text-destructive text-sm mb-2 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Not Included
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Physical infrastructure</li>
                        <li>• Internet connectivity</li>
                        <li>• End-user devices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* Accounts */}
              <ClauseCard 
                id="accounts"
                title="3. Account Terms"
                icon={Users}
                tldr="Keep your password safe. Don't share accounts. You're responsible for your credentials."
                isActive={activeSection === 'accounts'}
                onToggle={() => toggleSection('accounts')}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="space-y-2">
                    <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">Security</h4>
                        <p className="text-xs lg:text-sm">Maintain confidentiality of credentials. You're responsible for all account activity.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">Breach Notification</h4>
                        <p className="text-xs lg:text-sm">Notify us immediately of unauthorized access or security breaches.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* Acceptable Use */}
              <ClauseCard 
                id="acceptable-use"
                title="4. Acceptable Use Policy"
                icon={Shield}
                tldr="Don't be evil. No illegal stuff, spam, or hacking. We terminate for violations."
                isActive={activeSection === 'acceptable-use'}
                onToggle={() => toggleSection('acceptable-use')}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <SeverityBadge 
                    level="critical" 
                    title="Prohibited"
                    items={['Illegal activities', 'Malware distribution', 'Hacking attempts', 'DDoS attacks', 'Child exploitation']}
                  />
                  <SeverityBadge 
                    level="warning" 
                    title="Restricted"
                    items={['Spam', 'Crypto mining', 'Excessive API calls', 'Reverse engineering']}
                  />
                </div>
              </ClauseCard>

              {/* Payment */}
              <ClauseCard 
                id="payment"
                title="5. Payment & Billing"
                icon={CreditCard}
                tldr="Pay on time or get paused. No refunds for partial months. We credit for our downtime."
                isActive={activeSection === 'payment'}
                onToggle={() => toggleSection('payment')}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4">
                    <div className="p-2 lg:p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-lg lg:text-2xl font-bold text-foreground">14d</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Free trial</div>
                    </div>
                    <div className="p-2 lg:p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-lg lg:text-2xl font-bold text-foreground">Mo</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Billing</div>
                    </div>
                    <div className="p-2 lg:p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-lg lg:text-2xl font-bold text-foreground">7d</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Grace</div>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm">Fees charged monthly in advance. 7-day grace period before suspension. 30-day data retention after cancellation.</p>
                </div>
              </ClauseCard>

              {/* SLA */}
              <ClauseCard 
                id="sla"
                title="6. Service Level Agreement"
                icon={Clock}
                tldr="99.9% uptime guarantee. Service credits if we fail. Maintenance doesn't count."
                isActive={activeSection === 'sla'}
                onToggle={() => toggleSection('sla')}
                isMobile={isMobile}
              >
                <div className="space-y-4 text-sm lg:text-base text-muted-foreground">
                  <div className="p-4 lg:p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">Uptime</h4>
                      <span className="text-xl lg:text-2xl font-bold text-primary">99.9%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '99.9%' }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs lg:text-sm">
                      <div><div className="font-semibold text-foreground">43.8m</div><div className="text-[10px] lg:text-xs text-muted-foreground">Monthly</div></div>
                      <div><div className="font-semibold text-foreground">10.1m</div><div className="text-[10px] lg:text-xs text-muted-foreground">Weekly</div></div>
                      <div><div className="font-semibold text-foreground">1.44m</div><div className="text-[10px] lg:text-xs text-muted-foreground">Daily</div></div>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* Intellectual */}
              <ClauseCard 
                id="intellectual"
                title="7. Intellectual Property"
                icon={FileText}
                tldr="We own our code, you own your data. You get a license to use, not ownership."
                isActive={activeSection === 'intellectual'}
                onToggle={() => toggleSection('intellectual')}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-primary text-sm mb-2">We Own</h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Software & code</li>
                        <li>• UI/UX designs</li>
                        <li>• Documentation</li>
                        <li>• Trademarks</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold text-green-600 text-sm mb-2">You Own</h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Your data</li>
                        <li>• Network configs</li>
                        <li>• Reports</li>
                        <li>• Custom integrations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* Termination */}
              <ClauseCard 
                id="termination"
                title="8. Termination"
                icon={XCircle}
                tldr="Cancel anytime. We can terminate for violations. 30-day data export window."
                isActive={activeSection === 'termination'}
                onToggle={() => toggleSection('termination')}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="flex items-center gap-3 text-xs lg:text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span>30d: Full access</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <span>90d: Backup</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
                      <span>90d+: Deleted</span>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* Liability */}
              <ClauseCard 
                id="liability"
                title="9. Limitation of Liability"
                icon={Scale}
                tldr="Not liable for indirect damages. Max liability = 12 months of fees you paid."
                isActive={activeSection === 'liability'}
                onToggle={() => toggleSection('liability')}
                isMobile={isMobile}
              >
                <div className="p-3 lg:p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-sm lg:text-base text-muted-foreground">
                  <h4 className="font-semibold text-yellow-600 text-sm mb-2">Liability Cap</h4>
                  <p className="text-xs lg:text-sm">Our total liability is limited to the amount you paid us in the 12 months preceding the claim.</p>
                </div>
              </ClauseCard>

              {/* Disputes */}
              <ClauseCard 
                id="disputes"
                title="10. Dispute Resolution"
                icon={MessageSquare}
                tldr="Talk first, arbitrate second. No class actions. Delaware law applies."
                isActive={activeSection === 'disputes'}
                onToggle={() => toggleSection('disputes')}
                isMobile={isMobile}
              >
                <div className="flex flex-col gap-2 text-sm lg:text-base text-muted-foreground">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</span>
                    <span className="text-sm">Direct resolution (30 days)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</span>
                    <span className="text-sm">Non-binding mediation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</span>
                    <span className="text-sm">AAA arbitration in Delaware</span>
                  </div>
                </div>
              </ClauseCard>

              {/* Changes */}
              <ClauseCard 
                id="changes"
                title="11. Changes to Terms"
                icon={History}
                tldr="30 days notice for major changes. Continued use = acceptance."
                isActive={activeSection === 'changes'}
                onToggle={() => toggleSection('changes')}
                isMobile={isMobile}
              >
                <div className="text-sm lg:text-base text-muted-foreground">
                  <p className="mb-3">Material changes notified via email and in-app 30 days in advance.</p>
                  <div className="flex items-center gap-2 text-xs lg:text-sm p-2 rounded-lg bg-muted/50">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span>Current: v{version} ({lastUpdated})</span>
                  </div>
                </div>
              </ClauseCard>

              {/* Contact CTA */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                
                className="mt-8 lg:mt-12"
              >
                <div className="bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl lg:rounded-2xl p-6 lg:p-12">
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-3 lg:mb-4">Questions?</h3>
                    <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
                      Our legal team speaks engineer. Straight answers, no legalese.
                    </p>
                    <a 
                      href="mailto:legal@codearntech.com"
                      className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 bg-primary text-primary-foreground text-sm lg:text-base font-semibold rounded-lg lg:rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      legal@codearntech.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating Navigation */}
      <AnimatePresence>
        {isMobile && (
          <>
            {/* Floating Menu Button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsNavOpen(true)}
              className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </motion.button>

            {/* Bottom Sheet Navigation */}
            <AnimatePresence>
              {isNavOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsNavOpen(false)}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                  />
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 max-h-[70vh] overflow-hidden lg:hidden"
                  >
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Jump to Section</h3>
                      <button 
                        onClick={() => setIsNavOpen(false)}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-[50vh] p-2">
                      {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                          <button
                            key={section.id}
                            onClick={() => {
                              toggleSection(section.id);
                              setIsNavOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              isActive 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-muted-foreground hover:bg-muted'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="text-left">{section.shortTitle}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-4 border-t border-border bg-muted/30">
                      <button 
                        onClick={() => {
                          scrollToTop();
                          setIsNavOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground"
                      >
                        <ArrowUp className="w-4 h-4" />
                        Back to Top
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Optimized Clause Card Component
function ClauseCard({ 
  id, 
  title, 
  icon: Icon, 
  tldr, 
  children, 
  isActive, 
  onToggle,
  isMobile
}: { 
  id: string;
  title: string;
  icon: React.ElementType;
  tldr: string;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
  isMobile: boolean;
}) {
  return (
    <div 
      id={id}
      className={`bg-card border rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border hover:border-primary/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 lg:gap-4 p-4 lg:p-6 text-left"
      >
        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isActive ? 'bg-primary/10' : 'bg-muted'
        }`}>
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-base lg:text-xl font-bold text-foreground mb-1.5 lg:mb-2 pr-8 relative">
            {title}
            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              {isActive ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </span>
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] lg:text-xs font-bold">TL;DR</span>
            <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{tldr}</p>
          </div>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden will-change-transform"
          >
            <div className="px-4 lg:px-6 pb-4 lg:pb-6 pt-2 border-t border-border">
              <div className="mt-3 lg:mt-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Severity Badge Component - Mobile Optimized
function SeverityBadge({ 
  level, 
  title, 
  items 
}: { 
  level: 'critical' | 'warning';
  title: string;
  items: string[];
}) {
  const colors = {
    critical: 'bg-destructive/5 border-destructive/20 text-destructive',
    warning: 'bg-yellow-500/5 border-yellow-500/20 text-yellow-600'
  };

  return (
    <div className={`p-3 lg:p-4 rounded-lg border ${colors[level]}`}>
      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
        {level === 'critical' ? <AlertTriangle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-background/50 border border-current/20">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}