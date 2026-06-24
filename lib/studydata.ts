// 1. Enums for Type Safety (Prevents spelling mistakes in data)
export type TechStackType = 

  | "Next.js" | "TypeScript" | "Node.js" | "PostgreSQL" | "AWS Lambda"
  | "React" | "Tailwind CSS" | "GraphQL" | "D3.js" | "FastAPI"
  | "Shopify Hydrogen" | "Stripe" | "Vercel" | "Redis" | "Docker";

export type ServiceType = 

  | "UI/UX Redesign" | "Full-Stack Development" | "Cloud Architecture"
  | "Frontend Engineering" | "Data Visualization" | "Performance Optimization"
  | "Headless Commerce" | "Mobile App Development" | "CI/CD Deployment";

// 2. Clear & Robust Interfaces
export interface Metric {
  value: string | number; 
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string; 
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  timeline: string;
  services: ServiceType[];   
  techStack: TechStackType[]; 
  coverImage: string;          // Main high-res showcase image
  galleryImages?: string[];    // Project screenshots gallery
  challenge: string;           
  detailedChallenge: string[]; // Breakdown paragraphs for absolute depth
  solution: string;            
  detailedSolution: string[];  // Breakdown paragraphs for engineering depth
  keyFeatures: string[];       // Top milestones achieved during execution
  metrics: Metric[];
  testimonial?: Testimonial;  
  featured: boolean;          
}

// 3. Strictly Typed Professional Detailed Data Array (FIXED)
export const caseStudies: CaseStudy[] = [
  {
    id: "fintech-revolution",
    title: "FinTech Revolution",
    subtitle: "Scaling a digital banking app to 1M+ users with military-grade security.",
    client: "Apex Global Finance (USA)",
    timeline: "3 Months",
    services: ["UI/UX Redesign", "Full-Stack Development", "Cloud Architecture"],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS Lambda", "Redis"],
    coverImage: "/images/portfolio/fintech-hero.jpg",
    galleryImages: [
      "/images/portfolio/fintech-dashboard.jpg",
      "/images/portfolio/fintech-analytics.jpg",
      "/images/portfolio/fintech-mobile.jpg"
    ],
    challenge: "The client's legacy system suffered from high latency (4.5s average load time) and frequent security vulnerabilities during peak transaction hours, leading to a 35% drop in user retention.",
    detailedChallenge: [
      "Our initial deep-dive audit revealed massive relational database locks occurring every Friday evening during peak salary transfers. The monolithic Node.js backend was unable to handle multi-threaded processing natively.",
      "Furthermore, the frontend layout lacked micro-interactions, making multi-currency shifting slow and confusing. This resulted in an alarming rate of abandoned wire transfers.",
      "Security compliance was also on the line, as arbitrary payload inspection lacked strict TLS termination hooks at the edge layers."
    ],
    solution: "We completely overhauled the core architecture using a serverless microservices model, built a sleek, high-conversion user interface with Next.js, and optimized database queries using Redis caching.",
    detailedSolution: [
      "We broken down the monolith into lightweight, stateless AWS Lambda functions backed by Next.js server-side caching policies. Database reads were offloaded to localized Redis nodes.",
      "The layout was entirely re-engineered with a dark-mode first design language, implementing zero-layout-shift (CLS) states for transaction histories.",
      "End-to-end security compliance was established using AWS IAM isolated parameters and rigid AES-256 field-level database encryption."
    ],
    keyFeatures: [
      "Biometric cross-device login sync under 120ms",
      "Automated multi-currency ledger routing engine",
      "Military-grade field level database encryption policies"
    ],
    metrics: [
      { value: "99.99%", label: "Uptime Achieved" },
      { value: "+140%", label: "Transaction Vol." },
      { value: "0.8s", label: "Page Load Time" }
    ],
    testimonial: {
      quote: "Their attention to detail and ability to scale our platform from MVP to a million-user application was truly remarkable. The design is as smooth as Apple products.",
      author: "Sarah Johnson",
      role: "CTO, Apex Global Finance",
      avatarUrl: "/images/avatars/sarah.jpg"
    },
    featured: true
  },
  {
    id: "saas-analytics",
    title: "SaaS Analytics Platform",
    subtitle: "Empowering decision-makers with a custom real-time visualization engine.",
    client: "DataVibe Insights",
    timeline: "2 Months",
    services: ["Frontend Engineering", "Data Visualization", "Performance Optimization"],
    techStack: ["React", "Tailwind CSS", "GraphQL", "D3.js", "FastAPI", "Docker"],
    coverImage: "/images/portfolio/saas-hero.jpg",
    galleryImages: [
      "/images/portfolio/saas-charts.jpg",
      "/images/portfolio/saas-settings.jpg"
    ],
    challenge: "Heavy data pipelines caused severe browser lag. Enterprise clients were unable to render real-time charts with more than 10,000 concurrent data points.",
    detailedChallenge: [
      "The previous application structured real-time metrics using heavy SVG nodes within standard React renders. This completely blocked the main browser thread during extensive reporting generation.",
      "Network payloads were over-fetching massive historical datasets instead of streaming real-time situational changes, triggering extreme server computational bills."
    ],
    solution: "Implemented canvas-based rendering alongside GraphQL subscriptions, dropping data fetch latency to sub-100ms and ensuring flawless 60fps chart interactions.",
    detailedSolution: [
      "We custom-built a hardware-accelerated Canvas engine inside React using raw D3.js coordinates, allowing effortless processing of up to 250,000 active telemetry streams.",
      "GraphQL subscriptions were orchestrated to stream differential packets instead of full database clones, reducing client processing load to virtually nothing."
    ],
    keyFeatures: [
      "Custom 60fps hardware-accelerated Canvas charting pipeline",
      "Dynamic delta-stream telemetry payload architecture",
      "Isolated containerized deployment nodes via Docker instances"
    ],
    metrics: [
      { value: "200k+", label: "Concurrent Users" },
      { value: "Sub-100ms", label: "Query Latency" },
      { value: "62%", label: "Server Cost Cut" }
    ],
    testimonial: {
      quote: "The interface feels lightning fast. Our enterprise tier customers can now query multi-year metrics without a single millisecond of UI freezing.",
      author: "David Chen",
      role: "Head of Product, DataVibe",
      avatarUrl: "/images/avatars/david.jpg"
    },
    featured: false
  },
  {
    id: "eshop-pro",
    title: "E-Shop Pro Ecosystem",
    subtitle: "Next-Gen headless commerce platform yielding lightning-fast checkout speeds.",
    client: "Vogue Retail",
    timeline: "4 Months",
    services: ["Headless Commerce", "Mobile App Development", "CI/CD Deployment"],
    techStack: ["Next.js", "Shopify Hydrogen", "Tailwind CSS", "Stripe", "Vercel"],
    coverImage: "/images/portfolio/eshop-hero.jpg",
    galleryImages: [
      "/images/portfolio/eshop-checkout.jpg",
      "/images/portfolio/eshop-catalog.jpg"
    ],
    challenge: "A slow, monolithic platform was destroying mobile conversion rates. Every 1-second delay in checkout was costing the client $50k monthly.",
    detailedChallenge: [ // Fixed from challenge_detailed to detailedChallenge
      "The mobile layout suffered from severe hydration delays due to bulky, non-optimized e-commerce platform plug-ins running sequentially during page initialization.",
      "The check-out funnel contained five complex visual pages, creating massive friction and user fatigue during high-volume global flash sales."
    ],
    solution: "Migrated to a headless setup using Shopify Hydrogen and Next.js, creating an ultra-minimalist, single-tap checkout stream optimized for mobile devices.",
    detailedSolution: [
      "By decoupling the front-end from the back-end catalog via Shopify's GraphQL Storefront API, we ensured catalog visual fragments load completely statically from Vercel edge networks.",
      "We designed an incremental single-tap animated checkout module using Stripe Elements that completely bypasses legacy navigation structures."
    ],
    keyFeatures: [
      "Decoupled Edge cached storefront layout distribution",
      "Single-tap modular checkout orchestration with Stripe hooks",
      "Automated automated localized global tax matching systems"
    ],
    metrics: [
      { value: "0.5s", label: "Checkout Speed" },
      { value: "+48%", label: "Conversion Rate" },
      { value: "Zero", label: "Downtime Black Friday" }
    ],
    featured: false
  }
];
