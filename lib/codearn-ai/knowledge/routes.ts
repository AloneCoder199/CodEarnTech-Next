// lib/codearn-ai/knowledge/routes.ts

/**
 * All public routes on the CodEarn website.
 * The AI uses this to give users accurate, clickable links.
 *
 * ⚠️ Keep this updated when adding/removing pages.
 */

export interface SiteRoute {
  path: string;
  title: string;
  description: string;
  keywords: string[]; // for AI matching
}

export const routes: SiteRoute[] = [
  /* ============================================================
     HOME
  ============================================================ */
  {
    path: "/",
    title: "Home",
    description: "CodEarn homepage — software products and services overview.",
    keywords: ["home", "main", "landing"],
  },

  /* ============================================================
     COMPANY
  ============================================================ */
  {
    path: "/about",
    title: "About",
    description:
      "Learn about CodEarn — who we are, what we build, and our mission.",
    keywords: ["about", "company", "who we are", "mission"],
  },
  {
    path: "/founder",
    title: "Founder Story",
    description:
      "Muhammad Bilal's founder story — his journey, beliefs, and why he built CodEarn.",
    keywords: ["founder", "muhammad bilal", "bilal", "story", "journey"],
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Get in touch with CodEarn — projects, partnerships, support, demos, and general inquiries.",
    keywords: ["contact", "email", "reach out", "get in touch", "support"],
  },
  {
    path: "/book-call",
    title: "Book a Call",
    description:
      "Schedule a call with the CodEarn team to discuss your project.",
    keywords: ["call", "schedule", "book", "meeting", "consultation"],
  },

  /* ============================================================
     PRODUCTS & SERVICES
  ============================================================ */
  {
    path: "/products",
    title: "Products",
    description:
      "CodEarn's software products — GigThink (live) and what's being built next.",
    keywords: ["products", "gigthink", "saas", "software", "apps"],
  },
  {
    path: "/solutions",
    title: "Solutions",
    description:
      "Custom software solutions — SaaS, web apps, automation, and AI integrations.",
    keywords: ["solutions", "custom software", "services", "development"],
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Real projects and outcomes from CodEarn's work with clients.",
    keywords: ["case studies", "portfolio", "projects", "work", "clients"],
  },

  /* ============================================================
     LEARNING & TRAINING
  ============================================================ */
  {
    path: "/training",
    title: "Training",
    description:
      "Practical software training and mentorship programs from CodEarn.",
    keywords: ["training", "courses", "learning", "mentorship", "education"],
  },
  {
    path: "/enroll",
    title: "Enroll",
    description:
      "Enroll in CodEarn's training programs and courses.",
    keywords: ["enroll", "sign up", "join", "register", "course"],
  },

  /* ============================================================
     CONTENT
  ============================================================ */
  {
    path: "/blogs",
    title: "Blog",
    description:
      "Notes from the CodEarn team — engineering, product, and founder thoughts.",
    keywords: ["blog", "articles", "posts", "writing", "journal"],
  },

  /* ============================================================
     AI
  ============================================================ */
  {
    path: "/codearn-ai",
    title: "CodEarn AI",
    description:
      "The official AI assistant for CodEarn — ask anything about the company.",
    keywords: ["ai", "assistant", "chat", "codearn ai"],
  },

  /* ============================================================
     LEGAL
  ============================================================ */
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How CodEarn collects, uses, and protects user data.",
    keywords: ["privacy", "data", "policy"],
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms governing the use of CodEarn's websites and products.",
    keywords: ["terms", "service", "legal"],
  },
  {
    path: "/cookies",
    title: "Cookie Policy",
    description:
      "Information about cookies and tracking used on CodEarn websites.",
    keywords: ["cookies", "tracking"],
  },
];

/* ============================================================
   EXTERNAL LINKS (separate from internal routes)
============================================================ */
export const externalLinks = {
  gigthink: {
    url: "https://gigthink.com",
    title: "GigThink",
    description: "CodEarn's live product — AI-powered sales workspace.",
  },
};

/* ============================================================
   HELPER — Find a route by keyword
============================================================ */
export function findRouteByKeyword(query: string): SiteRoute | null {
  const lower = query.toLowerCase();
  return (
    routes.find((r) =>
      r.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    ) || null
  );
}

/* ============================================================
   SITE SUMMARY — compact list for the AI
============================================================ */
export function getSiteSummary(): string {
  return routes
    .map((r) => `• ${r.path} — ${r.title}: ${r.description}`)
    .join("\n");
}