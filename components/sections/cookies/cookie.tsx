"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  Shield,
  Eye,
  Target,
  Settings,
  Clock,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  Search,
  Lock,
  Globe,
  Server,
  BarChart3,
  Megaphone,
  Info,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const sections = [
  { id: "overview", title: "Overview", icon: Info, shortTitle: "Overview" },
  {
    id: "essential",
    title: "Essential Cookies",
    icon: Lock,
    shortTitle: "Essential",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart3,
    shortTitle: "Analytics",
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: Megaphone,
    shortTitle: "Marketing",
  },
  {
    id: "preferences",
    title: "Preferences",
    icon: Settings,
    shortTitle: "Preferences",
  },
  {
    id: "third-party",
    title: "Third-Party",
    icon: Globe,
    shortTitle: "Third-Party",
  },
  { id: "manage", title: "Manage Cookies", icon: Shield, shortTitle: "Manage" },
];

// Cookie data structure
const cookieCategories = [
  {
    id: "essential",
    title: "Essential Cookies",
    icon: Lock,
    color: "green",
    required: true,
    description:
      "Required for the website to function properly. Cannot be disabled.",
    cookies: [
      { name: "session_id", purpose: "Authentication", duration: "Session" },
      { name: "csrf_token", purpose: "Security", duration: "Session" },
      {
        name: "cookie_consent",
        purpose: "Store preferences",
        duration: "1 year",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    icon: BarChart3,
    color: "blue",
    required: false,
    description: "Help us understand how visitors interact with our website.",
    cookies: [
      {
        name: "_plausible",
        purpose: "Page views",
        duration: "Session",
        provider: "Plausible",
      },
      {
        name: "_ga",
        purpose: "User journey",
        duration: "2 years",
        provider: "Google*",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    icon: Megaphone,
    color: "purple",
    required: false,
    description: "Used to deliver personalized advertisements.",
    cookies: [
      {
        name: "None currently",
        purpose: "We don't use marketing cookies",
        duration: "N/A",
        provider: "N/A",
      },
    ],
  },
  {
    id: "preferences",
    title: "Preference Cookies",
    icon: Settings,
    color: "orange",
    required: false,
    description: "Remember your settings and customize your experience.",
    cookies: [
      { name: "theme_mode", purpose: "Dark/light mode", duration: "1 year" },
      { name: "lang_pref", purpose: "Language selection", duration: "1 year" },
    ],
  },
];

export default function CookiePolicy() {
  const [activeSection, setActiveSection] = useState<string | null>("overview");
  const [consents, setConsents] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: true,
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsNavOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (id: string) => {
    setActiveSection((prev) => (prev === id ? null : id));

    if (isMobile && activeSection !== id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const toggleConsent = (type: keyof typeof consents) => {
    if (type === "essential") return; // Cannot toggle essential
    setConsents((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const savePreferences = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
    // Here you would actually save to cookies/localStorage
  };

  const acceptAll = () => {
    setConsents({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
    savePreferences();
  };

  const rejectAll = () => {
    setConsents({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    savePreferences();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 lg:mb-6 text-center">
              Cookie Policy
            </motion.h1>

            <motion.div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs lg:text-sm text-muted-foreground mb-6 lg:mb-8">
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                No Cookie Walls
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                Updated Feb 2026
              </span>
            </motion.div>

            <motion.div className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-8">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm lg:text-base mb-1 lg:mb-2">
                    Transparency First
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                    We believe you deserve to know exactly what cookies we use
                    and why. No hidden trackers, no surprise third-parties. You
                    have full control over your data.
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
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className="text-left truncate">
                        {section.title}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" />
                      )}
                    </button>
                  );
                })}

                {/* Quick Consent Summary */}
                <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Your Consent
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {Object.entries(consents).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-muted-foreground capitalize">
                          {key}
                        </span>
                        <span
                          className={
                            value ? "text-green-500" : "text-destructive"
                          }
                        >
                          {value ? "On" : "Off"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 space-y-3 lg:space-y-4">
              {/* Overview */}
              <motion.div
                id="overview"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <ClauseCard
                  id="overview"
                  title="What Are Cookies?"
                  icon={Info}
                  isActive={activeSection === "overview"}
                  onToggle={() => toggleSection("overview")}
                  isMobile={isMobile}
                >
                  <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                    <p>
                      Cookies are small text files stored on your device when
                      you visit websites. They help websites remember your
                      preferences, understand how you use the site, and improve
                      your experience.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm">
                          Session
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Deleted when you close browser
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm">
                          Persistent
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Stay for days/months/years
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Server className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm">
                          First-Party
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Set by us only
                        </div>
                      </div>
                    </div>
                  </div>
                </ClauseCard>
              </motion.div>

              {/* Cookie Categories */}
              {cookieCategories.map((category) => (
                <motion.div
                  key={category.id}
                  id={category.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="scroll-mt-24"
                >
                  <ClauseCard
                    id={category.id}
                    title={category.title}
                    icon={category.icon}
                    isActive={activeSection === category.id}
                    onToggle={() => toggleSection(category.id)}
                    isMobile={isMobile}
                    badge={category.required ? "Required" : "Optional"}
                    badgeColor={
                      category.required
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    <div className="space-y-4 text-sm lg:text-base text-muted-foreground">
                      <p>{category.description}</p>

                      {/* Cookie Table */}
                      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
                        <table className="w-full text-xs lg:text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 text-foreground font-medium">
                                Cookie Name
                              </th>
                              <th className="text-left py-2 text-foreground font-medium">
                                Purpose
                              </th>
                              <th className="text-left py-2 text-foreground font-medium">
                                Duration
                              </th>
                              {category.cookies[0] &&
                                "provider" in category.cookies[0] && (
                                  <th className="text-left py-2 text-foreground font-medium">
                                    Provider
                                  </th>
                                )}
                            </tr>
                          </thead>
                          <tbody>
                            {category.cookies.map((cookie, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-border/50"
                              >
                                <td className="py-2 font-mono text-xs">
                                  {cookie.name}
                                </td>
                                <td className="py-2">{cookie.purpose}</td>
                                <td className="py-2">{cookie.duration}</td>
                                {/* Use 'in' to safely check for the property */}
                                {"provider" in cookie && (
                                  <td className="py-2">{cookie.provider}</td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Toggle for optional cookies */}
                      {!category.required && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm font-medium text-foreground">
                            Enable {category.title}
                          </span>
                          <ToggleSwitch
                            enabled={
                              consents[category.id as keyof typeof consents]
                            }
                            onToggle={() =>
                              toggleConsent(
                                category.id as keyof typeof consents,
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </ClauseCard>
                </motion.div>
              ))}

              {/* Third Party */}
              <motion.div
                id="third-party"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <ClauseCard
                  id="third-party"
                  title="Third-Party Services"
                  icon={Globe}
                  isActive={activeSection === "third-party"}
                  onToggle={() => toggleSection("third-party")}
                  isMobile={isMobile}
                >
                  <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                    <p>
                      We use limited third-party services that may set cookies:
                    </p>

                    <div className="space-y-2">
                      {[
                        {
                          name: "Vercel",
                          purpose: "Hosting & Analytics",
                          cookies: "None (server-side only)",
                        },
                        {
                          name: "Stripe",
                          purpose: "Payment processing",
                          cookies: " fraud detection",
                        },
                        {
                          name: "Plausible",
                          purpose: "Privacy-first analytics",
                          cookies: "No personal data",
                        },
                      ].map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <Server className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-foreground">
                                {service.name}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {service.purpose}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Cookies: {service.cookies}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ClauseCard>
              </motion.div>

              {/* Manage Cookies */}
              <motion.div
                id="manage"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <ClauseCard
                  id="manage"
                  title="Manage Your Cookies"
                  icon={Shield}
                  isActive={activeSection === "manage"}
                  onToggle={() => toggleSection("manage")}
                  isMobile={isMobile}
                >
                  <div className="space-y-4 text-sm lg:text-base text-muted-foreground">
                    <p>You can change your cookie preferences at any time:</p>

                    {/* Consent Controls */}
                    <div className="space-y-3 bg-muted/30 rounded-xl p-4">
                      {cookieCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg bg-${category.color}-500/10 flex items-center justify-center`}
                            >
                              <category.icon
                                className={`w-4 h-4 text-${category.color}-500`}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">
                                {category.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {category.required
                                  ? "Always active"
                                  : "Your choice"}
                              </div>
                            </div>
                          </div>
                          {category.required ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              Required
                            </span>
                          ) : (
                            <ToggleSwitch
                              enabled={
                                consents[category.id as keyof typeof consents]
                              }
                              onToggle={() =>
                                toggleConsent(
                                  category.id as keyof typeof consents,
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={savePreferences}
                        className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all"
                      >
                        Save Preferences
                      </button>
                      <button
                        onClick={acceptAll}
                        className="flex-1 px-4 py-2.5 bg-green-500/10 text-green-600 border border-green-500/20 text-sm font-medium rounded-lg hover:bg-green-500/20 transition-all"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={rejectAll}
                        className="flex-1 px-4 py-2.5 bg-muted text-muted-foreground border border-border text-sm font-medium rounded-lg hover:bg-muted/80 transition-all"
                      >
                        Reject Optional
                      </button>
                    </div>

                    {/* Success Message */}
                    <AnimatePresence>
                      {showSaveConfirmation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 inline mr-2" />
                          Preferences saved successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Clear Cookies */}
                    <div className="pt-4 border-t border-border">
                      <button className="flex items-center gap-2 text-destructive text-sm hover:underline">
                        <Trash2 className="w-4 h-4" />
                        Clear all cookies and reset preferences
                      </button>
                    </div>
                  </div>
                </ClauseCard>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 lg:mt-12"
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl lg:rounded-2xl p-6 lg:p-12">
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-3 lg:mb-4">
                      Cookie Questions?
                    </h3>
                    <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
                      Our privacy team can explain any cookie in detail. No
                      technical question is too small.
                    </p>
                    <a
                      href="mailto:privacy@codearntech.com"
                      className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 bg-primary text-primary-foreground text-sm lg:text-base font-semibold rounded-lg lg:rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      Contact Privacy Team
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
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsNavOpen(true)}
              className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </motion.button>

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
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 max-h-[70vh] overflow-hidden lg:hidden"
                  >
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        Cookie Sections
                      </h3>
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
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                            />
                            <span className="text-left">
                              {section.shortTitle}
                            </span>
                            {isActive && (
                              <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
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

// Clause Card Component
function ClauseCard({
  id,
  title,
  icon: Icon,
  children,
  isActive,
  onToggle,
  isMobile,
  badge,
  badgeColor,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
  isMobile: boolean;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div
      id={id}
      className={`bg-card border rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive
          ? "border-primary/30 shadow-lg shadow-primary/5"
          : "border-border hover:border-primary/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 lg:gap-4 p-4 lg:p-6 text-left"
      >
        <div
          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isActive ? "bg-primary/10" : "bg-muted"
          }`}
        >
          <Icon
            className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`}
          />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
            <h3 className="text-base lg:text-xl font-bold text-foreground pr-8 relative flex-1">
              {title}
            </h3>
            {badge && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-medium shrink-0 ${badgeColor}`}
              >
                {badge}
              </span>
            )}
            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              {isActive ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden will-change-transform"
          >
            <div className="px-4 lg:px-6 pb-4 lg:pb-6 pt-2 border-t border-border">
              <div className="mt-3 lg:mt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <motion.div
        initial={false}
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}
