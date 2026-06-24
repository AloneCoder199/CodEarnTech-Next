// lib/data.ts

export interface IResource {
  title: string;
  fileUrl: string;
  fileType: string;
}

export interface StudentCertificate {
  id: string;
  courseTitle: string;
  certificateNumber: string; // Required
  verificationUrl: string;   // Required
  grade: string;             // Required
  issueDate: string;
  downloadUrl: string;
  thumbnail?: string;        // Optional (kyunke ? laga hai)
}

export const myCertificates: StudentCertificate[] = [
  {
    id: "CET-0001",
    courseTitle: "Next.js Mastery",
    certificateNumber: "CET-2026-001", // Add kiya
    verificationUrl: "https://codearntech.cloud", // Add kiya
    grade: "A+", // Add kiya
    issueDate: "Feb 2026",
    downloadUrl: "/certs/nextjs.pdf"
  }
];


export interface ITopic {
  id: string;
  title: string;
  description: string;
  duration: string;
  isPreview: boolean;
  videoUrl?: string;
  resources?: IResource[];
}

export interface IModule {
  id: string;
  title: string;
  description: string;
  order: number;
  isPreview: boolean;
  topics: ITopic[];
}

export interface ICourse {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  totalModules: number;
  totalTopics: number;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  icon: string;
  color: string;
  featured: boolean;
  modules: IModule[];
  whatYouWillLearn: string[];
  requirements: string[];
  tags: string[];
}

export const courses: ICourse[] = [
  {
    "id": "1",
    "slug": "vibe-coding-ai-mastery",
    "title": "Vibe Coding: The AI-First Mastery",
    "shortTitle": "AI Vibe Coding",
    "description": "Master the art of AI-augmented development. Learn to build high-end products using Cursor, v0, and intuitive rapid-prototyping workflows. Focus on flow state and shipping fast.",
    "shortDescription": "Build high-end products with AI-augmented workflows",
    "level": "Advanced",
    "duration": "4 Weeks",
    "totalModules": 12,
    "totalTopics": 156,
    "price": 25000,
    "discountPrice": 2000,
    "thumbnail": "/courses/vibe-coding.jpg",
    "icon": "✨",
    "color": "from-purple-600 to-pink-600",
    "featured": true,
    "whatYouWillLearn": [
      "AI-First Architecture & Flow State",
      "Cursor IDE & Copilot Advanced Prompts",
      "Intuitive UI with v0 and Tailwind",
      "Autonomous Backend Orchestration",
      "AI-Augmented Data Modeling",
      "Real-time Intelligence & Context",
      "Rapid Prototyping & Iteration",
      "Production-grade AI Deployment"
    ],
    "requirements": [
      "Modern JavaScript/TypeScript basics",
      "Experience with AI tools (Cursor/ChatGPT)",
      "Curiosity for high-velocity building"
    ],
    "tags": ["Vibe-Coding", "AI-First", "Next.js", "Cursor", "Rapid-Ship"],
    "modules": [
      {
        "id": "m1",
        "title": "Vibe Coding Foundations",
        "description": "Mastering the AI-augmented development workflow",
        "order": 1,
        "isPreview": true,
        "topics": [
          { "id": "t1", "title": "The Vibe Coding Manifesto", "description": "Understanding AI-first development", "duration": "45 min", "isPreview": true },
          { "id": "t2", "title": "AI-Augmented Architecture", "description": "Designing for AI assistance", "duration": "60 min", "isPreview": true },
          { "id": "t3", "title": "Cursor & Tooling Mastery", "description": "Optimizing your coding environment", "duration": "50 min", "isPreview": false },
          { "id": "t4", "title": "Rapid Project scaffolding", "description": "Setting up AI-ready monorepos", "duration": "55 min", "isPreview": false },
          { "id": "t5", "title": "Prompt Engineering Basics", "description": "Writing context-aware prompts", "duration": "40 min", "isPreview": false },
          { "id": "t6", "title": "Code Synthesis Logic", "description": "Guiding AI to clean code", "duration": "35 min", "isPreview": false },
          { "id": "t7", "title": "Component-First Workflow", "description": "Using AI for UI generation", "duration": "65 min", "isPreview": false },
          { "id": "t8", "title": "Intuitive Design Systems", "description": "Building consistent AI-UI", "duration": "70 min", "isPreview": false }
        ]
      },
      {
        "id": "m2",
        "title": "Intelligent Auth & Security",
        "description": "Secure auth flows with AI-assisted logic",
        "order": 2,
        "isPreview": false,
        "topics": [
          { "id": "t9", "title": "Auth Architecture Planning", "description": "Designing intelligent auth", "duration": "40 min", "isPreview": false },
          { "id": "t10", "title": "Clerk & AI Integration", "description": "Fast auth implementation", "duration": "55 min", "isPreview": false },
          { "id": "t11", "title": "Session vs State", "description": "Managing user state flow", "duration": "50 min", "isPreview": false },
          { "id": "t12", "title": "Adaptive RBAC", "description": "Dynamic role-based systems", "duration": "60 min", "isPreview": false },
          { "id": "t13", "title": "Team & Organization Sync", "description": "Multi-user account logic", "duration": "75 min", "isPreview": false },
          { "id": "t14", "title": "Granular Permissions", "description": "Scaling auth logic", "duration": "65 min", "isPreview": false },
          { "id": "t15", "title": "AI-Powered Magic Links", "description": "Modern sign-in flows", "duration": "45 min", "isPreview": false },
          { "id": "t16", "title": "Smart 2FA", "description": "Implementing secure auth", "duration": "55 min", "isPreview": false },
          { "id": "t17", "title": "Security-First AI Coding", "description": "OWASP for AI apps", "duration": "70 min", "isPreview": false },
          { "id": "t18", "title": "Automated Auth Tests", "description": "Verifying auth with AI", "duration": "50 min", "isPreview": false }
        ]
      },
      {
        "id": "m3",
        "title": "Data Modeling with AI",
        "description": "Structured data for intelligent applications",
        "order": 3,
        "isPreview": false,
        "topics": [
          { "id": "t19", "title": "Schema Design Principles", "description": "AI-driven database design", "duration": "60 min", "isPreview": false },
          { "id": "t20", "title": "Prisma & AI Schemas", "description": "Modeling complex data", "duration": "65 min", "isPreview": false },
          { "id": "t21", "title": "Data Isolation Patterns", "description": "Multi-tenant logic", "duration": "70 min", "isPreview": false },
          { "id": "t22", "title": "Optimized Querying", "description": "Query strategies for speed", "duration": "75 min", "isPreview": false },
          { "id": "t23", "title": "Smart Connection Pooling", "description": "Managing serverless loads", "duration": "50 min", "isPreview": false },
          { "id": "t24", "title": "Versioned Migrations", "description": "Safe schema evolution", "duration": "45 min", "isPreview": false },
          { "id": "t25", "title": "Resilient Backups", "description": "Automated recovery", "duration": "55 min", "isPreview": false },
          { "id": "t26", "title": "AI-Aware Caching", "description": "Redis for smart caching", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        "id": "m4",
        "title": "Monetizing AI Products",
        "description": "Seamless billing for AI services",
        "order": 4,
        "isPreview": false,
        "topics": [
          { "id": "t27", "title": "Stripe AI Integration", "description": "Configuring payment flows", "duration": "40 min", "isPreview": false },
          { "id": "t28", "title": "Subscription Economics", "description": "AI usage-based models", "duration": "55 min", "isPreview": false },
          { "id": "t29", "title": "Intelligent Checkouts", "description": "Optimized payment UX", "duration": "60 min", "isPreview": false },
          { "id": "t30", "title": "Async Webhooks", "description": "Handling payment events", "duration": "65 min", "isPreview": false },
          { "id": "t31", "title": "Billing History UI", "description": "User account dashboards", "duration": "50 min", "isPreview": false },
          { "id": "t32", "title": "Automated Dunning", "description": "Recovering payments", "duration": "45 min", "isPreview": false },
          { "id": "t33", "title": "Global Tax Compliance", "description": "Handling digital sales", "duration": "55 min", "isPreview": false },
          { "id": "t34", "title": "Metered Billing Logic", "description": "Track usage per token", "duration": "70 min", "isPreview": false }
        ]
      },
      {
        "id": "m5",
        "title": "Frontend Velocity",
        "description": "Building UI with v0 and AI speed",
        "order": 5,
        "isPreview": false,
        "topics": [
          { "id": "t35", "title": "Next.js App Router Flow", "description": "Modern app architecture", "duration": "65 min", "isPreview": false },
          { "id": "t36", "title": "Streaming UI Patterns", "description": "Instant loading states", "duration": "70 min", "isPreview": false },
          { "id": "t37", "title": "Suspense & Transitions", "description": "Smooth UX transitions", "duration": "60 min", "isPreview": false },
          { "id": "t38", "title": "State Management Patterns", "description": "Optimizing reactive state", "duration": "75 min", "isPreview": false },
          { "id": "t39", "title": "Real-time AI Features", "description": "Socket.io integration", "duration": "65 min", "isPreview": false },
          { "id": "t40", "title": "Asset Handling", "description": "Smart media storage", "duration": "55 min", "isPreview": false },
          { "id": "t41", "title": "AI-Powered Search", "description": "Semantic search UX", "duration": "70 min", "isPreview": false },
          { "id": "t42", "title": "Notification Engines", "description": "Intelligent alerts", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        "id": "m6",
        "title": "Backend Orchestration",
        "description": "Building intelligent APIs fast",
        "order": 6,
        "isPreview": false,
        "topics": [
          { "id": "t43", "title": "API Strategy", "description": "REST vs RPC vs AI APIs", "duration": "55 min", "isPreview": false },
          { "id": "t44", "title": "Type-Safe APIs", "description": "tRPC for speed", "duration": "70 min", "isPreview": false },
          { "id": "t45", "title": "Smart Rate Limiting", "description": "Protecting AI quotas", "duration": "50 min", "isPreview": false },
          { "id": "t46", "title": "Seamless Versioning", "description": "Evolving APIs", "duration": "45 min", "isPreview": false },
          { "id": "t47", "title": "Docs Generation", "description": "Automated API docs", "duration": "40 min", "isPreview": false },
          { "id": "t48", "title": "Background AI Jobs", "description": "BullMQ processing", "duration": "65 min", "isPreview": false },
          { "id": "t49", "title": "Cron & Scheduling", "description": "Automated agents", "duration": "50 min", "isPreview": false },
          { "id": "t50", "title": "Edge Intelligence", "description": "Edge function deployment", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        "id": "m7",
        "title": "Deployment Velocity",
        "description": "Automated deployment pipelines",
        "order": 7,
        "isPreview": false,
        "topics": [
          { "id": "t51", "title": "Docker Strategy", "description": "Containerizing AI apps", "duration": "70 min", "isPreview": false },
          { "id": "t52", "title": "Compose Workflows", "description": "Dev-container environments", "duration": "55 min", "isPreview": false },
          { "id": "t53", "title": "CI/CD Automation", "description": "Deploy with GitHub Actions", "duration": "75 min", "isPreview": false },
          { "id": "t54", "title": "Vercel Optimization", "description": "Deployment best practices", "duration": "45 min", "isPreview": false },
          { "id": "t55", "title": "Cloud Fundamentals", "description": "AWS/GCP for AI", "duration": "80 min", "isPreview": false },
          { "id": "t56", "title": "Orchestration Basics", "description": "Scaling containers", "duration": "90 min", "isPreview": false },
          { "id": "t57", "title": "Secret Management", "description": "Environment security", "duration": "50 min", "isPreview": false },
          { "id": "t58", "title": "DB Deployment", "description": "Managed cloud databases", "duration": "65 min", "isPreview": false }
        ]
      },
      {
        "id": "m8",
        "title": "Quality Assurance",
        "description": "AI-assisted testing strategies",
        "order": 8,
        "isPreview": false,
        "topics": [
          { "id": "t59", "title": "The Testing Pyramid", "description": "Testing AI components", "duration": "45 min", "isPreview": false },
          { "id": "t60", "title": "Fast Unit Tests", "description": "Jest & AI feedback", "duration": "60 min", "isPreview": false },
          { "id": "t61", "title": "React Component Tests", "description": "Testing UI logic", "duration": "65 min", "isPreview": false },
          { "id": "t62", "title": "E2E Automation", "description": "Playwright flows", "duration": "70 min", "isPreview": false },
          { "id": "t63", "title": "API Contract Testing", "description": "Mocking services", "duration": "55 min", "isPreview": false },
          { "id": "t64", "title": "Visual Regression", "description": "AI-UI validation", "duration": "50 min", "isPreview": false },
          { "id": "t65", "title": "Perf Metrics", "description": "Lighthouse CI automation", "duration": "45 min", "isPreview": false },
          { "id": "t66", "title": "Quality Reporting", "description": "Metrics that matter", "duration": "40 min", "isPreview": false }
        ]
      },
      {
        "id": "m9",
        "title": "AI Security Protocols",
        "description": "Enterprise-grade security",
        "order": 9,
        "isPreview": false,
        "topics": [
          { "id": "t67", "title": "Hardened Headers", "description": "CSP/Security basics", "duration": "50 min", "isPreview": false },
          { "id": "t68", "title": "Attack Prevention", "description": "Blocking injection", "duration": "60 min", "isPreview": false },
          { "id": "t69", "title": "Data Protection", "description": "Encryption standards", "duration": "55 min", "isPreview": false },
          { "id": "t70", "title": "Privacy Compliance", "description": "GDPR/AI ethics", "duration": "65 min", "isPreview": false },
          { "id": "t71", "title": "Audit Readiness", "description": "SOC2 framework", "duration": "70 min", "isPreview": false },
          { "id": "t72", "title": "Security Assessments", "description": "Pen testing patterns", "duration": "75 min", "isPreview": false },
          { "id": "t73", "title": "Dependency Safety", "description": "Snyk automated audits", "duration": "45 min", "isPreview": false },
          { "id": "t74", "title": "Incident Strategy", "description": "Response automation", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        "id": "m10",
        "title": "User Observability",
        "description": "Monitoring and AI analytics",
        "order": 10,
        "isPreview": false,
        "topics": [
          { "id": "t75", "title": "Tracking Architecture", "description": "Event tracking design", "duration": "55 min", "isPreview": false },
          { "id": "t76", "title": "Product Insights", "description": "Segment & Mixpanel", "duration": "60 min", "isPreview": false },
          { "id": "t77", "title": "Error Intelligence", "description": "Sentry & AI logs", "duration": "50 min", "isPreview": false },
          { "id": "t78", "title": "Perf Observability", "description": "Real-user metrics", "duration": "55 min", "isPreview": false },
          { "id": "t79", "title": "Log Strategy", "description": "Centralized logging", "duration": "50 min", "isPreview": false },
          { "id": "t80", "title": "Alerting Logic", "description": "PagerDuty orchestration", "duration": "45 min", "isPreview": false },
          { "id": "t81", "title": "Visual Dashboards", "description": "Data visualization", "duration": "65 min", "isPreview": false },
          { "id": "t82", "title": "Experimentation", "description": "A/B testing flows", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        "id": "m11",
        "title": "Scaling Architectures",
        "description": "Growing to million users",
        "order": 11,
        "isPreview": false,
        "topics": [
          { "id": "t83", "title": "Traffic Management", "description": "Intelligent load balancing", "duration": "55 min", "isPreview": false },
          { "id": "t84", "title": "Auto-scaling Logic", "description": "Scaling groups", "duration": "70 min", "isPreview": false },
          { "id": "t85", "title": "Data Partitioning", "description": "Sharding strategy", "duration": "80 min", "isPreview": false },
          { "id": "t86", "title": "Global Edge Delivery", "description": "CDN implementation", "duration": "50 min", "isPreview": false },
          { "id": "t87", "title": "Edge Computing", "description": "Vercel Edge functions", "duration": "65 min", "isPreview": false },
          { "id": "t88", "title": "Service Decomposition", "description": "Microservices patterns", "duration": "90 min", "isPreview": false },
          { "id": "t89", "title": "Event-Driven Flow", "description": "Kafka & EventBridge", "duration": "85 min", "isPreview": false },
          { "id": "t90", "title": "Cost Efficiency", "description": "Cloud cost optimization", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        "id": "m12",
        "title": "Growth & Launch",
        "description": "Shipping fast and scaling",
        "order": 12,
        "isPreview": false,
        "topics": [
          { "id": "t91", "title": "Launch Checklist", "description": "Production readiness", "duration": "50 min", "isPreview": false },
          { "id": "t92", "title": "Beta Management", "description": "Early adopter program", "duration": "45 min", "isPreview": false },
          { "id": "t93", "title": "Go-to-Market", "description": "Marketing for devs", "duration": "60 min", "isPreview": false },
          { "id": "t94", "title": "User Activation", "description": "Onboarding flows", "duration": "55 min", "isPreview": false },
          { "id": "t95", "title": "Support Automation", "description": "AI support tools", "duration": "50 min", "isPreview": false },
          { "id": "t96", "title": "Feature Flag Control", "description": "LaunchDarkly patterns", "duration": "55 min", "isPreview": false },
          { "id": "t97", "title": "Retention Strategy", "description": "Churn reduction data", "duration": "65 min", "isPreview": false },
          { "id": "t98", "title": "Scaling Culture", "description": "Hiring & team vibe", "duration": "70 min", "isPreview": false }
        ]
      }
    ]
  },

  // Course 2: Advanced Backend
  // {
  //   id: "2",
  //   slug: "advanced-backend",
  //   title: "Advanced Backend Engineering",
  //   shortTitle: "Backend Pro",
  //   description: "Master backend development with Node.js, microservices, distributed systems, and high-performance architecture.",
  //   shortDescription: "Build scalable backend systems like top tech companies",
  //   level: "Advanced",
  //   duration: "20 Weeks",
  //   totalModules: 10,
  //   totalTopics: 128,
  //   price:  40000,
  //   discountPrice: 15000,
  //   thumbnail: "/courses/backend-pro.jpg",
  //   icon: "⚙️",
  //   color: "from-emerald-600 to-teal-600",
  //   featured: true,
  //   whatYouWillLearn: [
  //     "Node.js Internals & Event Loop",
  //     "Microservices Architecture",
  //     "Distributed Systems Design",
  //     "Message Queues & Event Streaming",
  //     "Database Scaling & Optimization",
  //     "Caching Strategies & Redis",
  //     "API Gateway & Load Balancing",
  //     "Security & Authentication Patterns"
  //   ],
  //   requirements: [
  //     "Strong JavaScript/TypeScript knowledge",
  //     "Basic backend development experience",
  //     "Understanding of HTTP protocols"
  //   ],
  //   tags: ["Node.js", "Microservices", "Redis", "Kafka", "PostgreSQL"],
  //   modules: [
  //     {
  //       id: "b1",
  //       title: "Node.js Deep Dive",
  //       description: "Understanding Node.js internals and performance",
  //       order: 1,
  //       isPreview: true,
  //       topics: [
  //         { id: "bt1", title: "Event Loop Explained", description: "How Node.js works under the hood", duration: "60 min", isPreview: true },
  //         { id: "bt2", title: "V8 Engine Optimization", description: "Hidden classes and inline caching", duration: "55 min", isPreview: true },
  //         { id: "bt3", title: "Memory Management", description: "Garbage collection deep dive", duration: "65 min", isPreview: false },
  //         { id: "bt4", title: "Streams & Buffers", description: "Efficient data handling", duration: "70 min", isPreview: false },
  //         { id: "bt5", title: "Cluster Module", description: "Utilizing all CPU cores", duration: "50 min", isPreview: false },
  //         { id: "bt6", title: "Worker Threads", description: "True parallelism in Node.js", duration: "75 min", isPreview: false },
  //         { id: "bt7", title: "Performance Profiling", description: "Clinic.js and 0x", duration: "60 min", isPreview: false },
  //         { id: "bt8", title: "Native Addons", description: "C++ addons with node-gyp", duration: "80 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b2",
  //       title: "TypeScript & Tooling",
  //       description: "Production-grade TypeScript setup",
  //       order: 2,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt9", title: "Advanced Types", description: "Conditional and mapped types", duration: "65 min", isPreview: false },
  //         { id: "bt10", title: "Type Guards & Narrowing", description: "Runtime type safety", duration: "55 min", isPreview: false },
  //         { id: "bt11", title: "Decorator Patterns", description: "Metadata and reflection", duration: "60 min", isPreview: false },
  //         { id: "bt12", title: "TSConfig Deep Dive", description: "Compiler options explained", duration: "50 min", isPreview: false },
  //         { id: "bt13", title: "Monorepo with NX", description: "Enterprise project structure", duration: "70 min", isPreview: false },
  //         { id: "bt14", title: "SWC & esbuild", description: "Fast compilation", duration: "45 min", isPreview: false },
  //         { id: "bt15", title: "Type Generation", description: "OpenAPI to TypeScript", duration: "55 min", isPreview: false },
  //         { id: "bt16", title: "Testing Types", description: "tsd and type testing", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b3",
  //       title: "Database Mastery",
  //       description: "Advanced database concepts and optimization",
  //       order: 3,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt17", title: "PostgreSQL Advanced", description: "Window functions and CTEs", duration: "70 min", isPreview: false },
  //         { id: "bt18", title: "Indexing Strategies", description: "B-tree, GIN, GiST indexes", duration: "65 min", isPreview: false },
  //         { id: "bt19", title: "Query Optimization", description: "EXPLAIN ANALYZE deep dive", duration: "75 min", isPreview: false },
  //         { id: "bt20", title: "Connection Pooling", description: "PgBouncer configuration", duration: "55 min", isPreview: false },
  //         { id: "bt21", title: "Read Replicas", description: "Scaling read operations", duration: "60 min", isPreview: false },
  //         { id: "bt22", title: "Database Sharding", description: "Horizontal partitioning", duration: "80 min", isPreview: false },
  //         { id: "bt23", title: "MongoDB Patterns", description: "Schema design for NoSQL", duration: "65 min", isPreview: false },
  //         { id: "bt24", title: "Elasticsearch", description: "Full-text search", duration: "70 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b4",
  //       title: "Caching & Performance",
  //       description: "High-performance caching strategies",
  //       order: 4,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt25", title: "Caching Fundamentals", description: "Cache-aside vs write-through", duration: "50 min", isPreview: false },
  //         { id: "bt26", title: "Redis Deep Dive", description: "Data structures and commands", duration: "75 min", isPreview: false },
  //         { id: "bt27", title: "Redis Clustering", description: "High availability setup", duration: "65 min", isPreview: false },
  //         { id: "bt28", title: "Cache Invalidation", description: "Strategies and patterns", duration: "60 min", isPreview: false },
  //         { id: "bt29", title: "Rate Limiting", description: "Sliding window algorithms", duration: "55 min", isPreview: false },
  //         { id: "bt30", title: "CDN Caching", description: "Edge caching strategies", duration: "50 min", isPreview: false },
  //         { id: "bt31", title: "Application Caching", description: "In-memory vs distributed", duration: "45 min", isPreview: false },
  //         { id: "bt32", title: "Cache Warming", description: "Proactive cache population", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b5",
  //       title: "Microservices Architecture",
  //       description: "Designing distributed systems",
  //       order: 5,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt33", title: "Service Boundaries", description: "Domain-driven design", duration: "70 min", isPreview: false },
  //         { id: "bt34", title: "Inter-service Communication", description: "Sync vs async patterns", duration: "65 min", isPreview: false },
  //         { id: "bt35", title: "gRPC Implementation", description: "Protocol buffers", duration: "75 min", isPreview: false },
  //         { id: "bt36", title: "GraphQL Federation", description: "Schema stitching", duration: "80 min", isPreview: false },
  //         { id: "bt37", title: "Circuit Breakers", description: "Resilience patterns", duration: "60 min", isPreview: false },
  //         { id: "bt38", title: "Service Discovery", description: "Consul/etcd", duration: "55 min", isPreview: false },
  //         { id: "bt39", title: "API Gateway", description: "Kong/AWS API Gateway", duration: "70 min", isPreview: false },
  //         { id: "bt40", title: "Sidecar Pattern", description: "Service mesh intro", duration: "65 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b6",
  //       title: "Message Queues & Events",
  //       description: "Asynchronous communication patterns",
  //       order: 6,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt41", title: "Message Queue Patterns", description: "Point-to-point vs pub-sub", duration: "55 min", isPreview: false },
  //         { id: "bt42", title: "RabbitMQ", description: "AMQP protocol", duration: "70 min", isPreview: false },
  //         { id: "bt43", title: "Apache Kafka", description: "Distributed event streaming", duration: "85 min", isPreview: false },
  //         { id: "bt44", title: "Event Sourcing", description: "CQRS pattern", duration: "75 min", isPreview: false },
  //         { id: "bt45", title: "Outbox Pattern", description: "Reliable event publishing", duration: "60 min", isPreview: false },
  //         { id: "bt46", title: "Saga Pattern", description: "Distributed transactions", duration: "70 min", isPreview: false },
  //         { id: "bt47", title: "Dead Letter Queues", description: "Error handling", duration: "50 min", isPreview: false },
  //         { id: "bt48", title: "Event Schema Evolution", description: "Backward compatibility", duration: "55 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b7",
  //       title: "Authentication & Security",
  //       description: "Enterprise security patterns",
  //       order: 7,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt49", title: "OAuth 2.0 & OIDC", description: "Authorization frameworks", duration: "75 min", isPreview: false },
  //         { id: "bt50", title: "JWT Security", description: "Best practices and pitfalls", duration: "60 min", isPreview: false },
  //         { id: "bt51", title: "API Security", description: "OWASP API Top 10", duration: "70 min", isPreview: false },
  //         { id: "bt52", title: "Secret Management", description: "Vault/AWS Secrets", duration: "55 min", isPreview: false },
  //         { id: "bt53", title: "mTLS", description: "Mutual authentication", duration: "65 min", isPreview: false },
  //         { id: "bt54", title: "WAF & DDoS", description: "Cloudflare/AWS WAF", duration: "50 min", isPreview: false },
  //         { id: "bt55", title: "Audit Logging", description: "Compliance tracking", duration: "45 min", isPreview: false },
  //         { id: "bt56", title: "Penetration Testing", description: "Security assessments", duration: "60 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b8",
  //       title: "Observability",
  //       description: "Monitoring and debugging at scale",
  //       order: 8,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt57", title: "Structured Logging", description: "Winston/Pino best practices", duration: "50 min", isPreview: false },
  //         { id: "bt58", title: "Distributed Tracing", description: "Jaeger/Zipkin", duration: "70 min", isPreview: false },
  //         { id: "bt59", title: "Metrics Collection", description: "Prometheus and Grafana", duration: "65 min", isPreview: false },
  //         { id: "bt60", title: "Health Checks", description: "Liveness and readiness", duration: "45 min", isPreview: false },
  //         { id: "bt61", title: "Error Tracking", description: "Sentry integration", duration: "55 min", isPreview: false },
  //         { id: "bt62", title: "APM Tools", description: "New Relic/Datadog", duration: "60 min", isPreview: false },
  //         { id: "bt63", title: "Log Aggregation", description: "ELK stack", duration: "70 min", isPreview: false },
  //         { id: "bt64", title: "Alerting", description: "PagerDuty integration", duration: "50 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b9",
  //       title: "DevOps & Deployment",
  //       description: "Production deployment strategies",
  //       order: 9,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt65", title: "Docker Best Practices", description: "Multi-stage builds", duration: "60 min", isPreview: false },
  //         { id: "bt66", title: "Kubernetes Basics", description: "Pods, services, deployments", duration: "80 min", isPreview: false },
  //         { id: "bt67", title: "Helm Charts", description: "K8s package management", duration: "65 min", isPreview: false },
  //         { id: "bt68", title: "CI/CD Pipelines", description: "GitHub Actions/GitLab CI", duration: "75 min", isPreview: false },
  //         { id: "bt69", title: "Infrastructure as Code", description: "Terraform/Pulumi", duration: "85 min", isPreview: false },
  //         { id: "bt70", title: "Blue-Green Deployment", description: "Zero-downtime deploys", duration: "55 min", isPreview: false },
  //         { id: "bt71", title: "Feature Flags", description: "LaunchDarkly/Unleash", duration: "50 min", isPreview: false },
  //         { id: "bt72", title: "Chaos Engineering", description: "Gremlin/Litmus", duration: "60 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "b10",
  //       title: "System Design",
  //       description: "Designing scalable architectures",
  //       order: 10,
  //       isPreview: false,
  //       topics: [
  //         { id: "bt73", title: "Scalability Fundamentals", description: "Horizontal vs vertical", duration: "55 min", isPreview: false },
  //         { id: "bt74", title: "Load Balancing", description: "Algorithms and strategies", duration: "60 min", isPreview: false },
  //         { id: "bt75", title: "CAP Theorem", description: "Trade-offs in distributed systems", duration: "50 min", isPreview: false },
  //         { id: "bt76", title: "Consistent Hashing", description: "Data distribution", duration: "65 min", isPreview: false },
  //         { id: "bt77", title: "Idempotency", description: "Safe retries", duration: "45 min", isPreview: false },
  //         { id: "bt78", title: "Backpressure", description: "Flow control", duration: "55 min", isPreview: false },
  //         { id: "bt79", title: "Design Patterns", description: "SAGA, CQRS, Event Sourcing", duration: "70 min", isPreview: false },
  //         { id: "bt80", title: "Case Studies", description: "Netflix, Uber architectures", duration: "75 min", isPreview: false }
  //       ]
  //     }
  //   ]
  // },

  // // Course 3: Vibe Coding
  // {
  //   id: "3",
  //   slug: "vibe-coding",
  //   title: "Vibe Coding Masterclass",
  //   shortTitle: "Vibe Coding",
  //   description: "Learn AI-assisted development with Cursor, GitHub Copilot, and modern AI tools. Code at the speed of thought.",
  //   shortDescription: "10x your productivity with AI-powered development",
  //   level: "All Levels",
  //   duration: "8 Weeks",
  //   totalModules: 6,
  //   totalTopics: 72,
  //   price: 25000,
  //   discountPrice: 8000,
  //   thumbnail: "/courses/vibe-coding.jpg",
  //   icon: "🤖",
  //   color: "from-pink-600 to-rose-600",
  //   featured: false,
  //   whatYouWillLearn: [
  //     "AI-Assisted Development Workflow",
  //     "Cursor IDE Mastery",
  //     "GitHub Copilot Advanced",
  //     "Prompt Engineering for Code",
  //     "AI Code Review & Debugging",
  //     "Automated Testing with AI",
  //     "Documentation Generation",
  //     "No-Code/Low-Code Integration"
  //   ],
  //   requirements: [
  //     "Basic programming knowledge in any language",
  //     "Openness to AI-assisted workflows",
  //     "Git fundamentals"
  //   ],
  //   tags: ["AI", "Cursor", "Copilot", "Productivity", "Automation"],
  //   modules: [
  //     {
  //       id: "v1",
  //       title: "AI-Assisted Development Fundamentals",
  //       description: "Understanding the vibe coding philosophy",
  //       order: 1,
  //       isPreview: true,
  //       topics: [
  //         { id: "vt1", title: "What is Vibe Coding?", description: "AI-assisted development explained", duration: "40 min", isPreview: true },
  //         { id: "vt2", title: "AI Tools Landscape", description: "Cursor, Copilot, Claude, ChatGPT", duration: "50 min", isPreview: true },
  //         { id: "vt3", title: "Setting Up Cursor IDE", description: "Configuration and shortcuts", duration: "45 min", isPreview: false },
  //         { id: "vt4", title: "Context Windows Explained", description: "How AI understands code", duration: "35 min", isPreview: false },
  //         { id: "vt5", title: "Human-AI Collaboration", description: "Best practices for pairing", duration: "40 min", isPreview: false },
  //         { id: "vt6", title: "Code Review with AI", description: "Automated PR reviews", duration: "35 min", isPreview: false },
  //         { id: "vt7", title: "Ethics of AI Coding", description: "Copyright and attribution", duration: "30 min", isPreview: false },
  //         { id: "vt8", title: "Future of Development", description: "Where is this heading?", duration: "45 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "v2",
  //       title: "Cursor IDE Mastery",
  //       description: "Deep dive into Cursor features",
  //       order: 2,
  //       isPreview: false,
  //       topics: [
  //         { id: "vt9", title: "Cursor Interface", description: "Panels and shortcuts", duration: "40 min", isPreview: false },
  //         { id: "vt10", title: "Tab Completion", description: "Smart code suggestions", duration: "35 min", isPreview: false },
  //         { id: "vt11", title: "Inline Editing", description: "Cmd+K magic", duration: "45 min", isPreview: false },
  //         { id: "vt12", title: "Composer Mode", description: "Multi-file changes", duration: "50 min", isPreview: false },
  //         { id: "vt13", title: "Chat Interface", description: "Natural language coding", duration: "40 min", isPreview: false },
  //         { id: "vt14", title: "Context Providers", description: "Files, docs, web", duration: "35 min", isPreview: false },
  //         { id: "vt15", title: "Custom Rules", description: ".cursorrules file", duration: "30 min", isPreview: false },
  //         { id: "vt16", title: "Extensions & Themes", description: "Customization", duration: "25 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "v3",
  //       title: "Prompt Engineering for Developers",
  //       description: "Writing effective prompts for code generation",
  //       order: 3,
  //       isPreview: false,
  //       topics: [
  //         { id: "vt17", title: "Prompt Structure", description: "Context + Intent + Format", duration: "40 min", isPreview: false },
  //         { id: "vt18", title: "Code Explanation Prompts", description: "Understanding legacy code", duration: "35 min", isPreview: false },
  //         { id: "vt19", title: "Refactoring Prompts", description: "Improving existing code", duration: "45 min", isPreview: false },
  //         { id: "vt20", title: "Test Generation", description: "Automated testing prompts", duration: "40 min", isPreview: false },
  //         { id: "vt21", title: "Debug Prompts", description: "Finding and fixing bugs", duration: "50 min", isPreview: false },
  //         { id: "vt22", title: "Architecture Prompts", description: "System design with AI", duration: "45 min", isPreview: false },
  //         { id: "vt23", title: "Few-Shot Prompting", description: "Examples in prompts", duration: "35 min", isPreview: false },
  //         { id: "vt24", title: "Chain of Thought", description: "Step-by-step reasoning", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "v4",
  //       title: "Building with AI",
  //       description: "Practical projects with AI assistance",
  //       order: 4,
  //       isPreview: false,
  //       topics: [
  //         { id: "vt25", title: "Project Setup", description: "AI-assisted scaffolding", duration: "35 min", isPreview: false },
  //         { id: "vt26", title: "Feature Implementation", description: "Building complete features", duration: "55 min", isPreview: false },
  //         { id: "vt27", title: "UI Generation", description: "Tailwind + AI", duration: "45 min", isPreview: false },
  //         { id: "vt28", title: "API Development", description: "Backend with AI help", duration: "50 min", isPreview: false },
  //         { id: "vt29", title: "Database Design", description: "Schema generation", duration: "40 min", isPreview: false },
  //         { id: "vt30", title: "Authentication Flow", description: "Auth implementation", duration: "45 min", isPreview: false },
  //         { id: "vt31", title: "Payment Integration", description: "Stripe with AI", duration: "40 min", isPreview: false },
  //         { id: "vt32", title: "Deployment", description: "Vercel/Netlify setup", duration: "35 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "v5",
  //       title: "Advanced AI Techniques",
  //       description: "Power user features and workflows",
  //       order: 5,
  //       isPreview: false,
  //       topics: [
  //         { id: "vt33", title: "Multi-Model Workflow", description: "Claude + GPT + Cursor", duration: "45 min", isPreview: false },
  //         { id: "vt34", title: "Image to Code", description: "Figma/Sketch to React", duration: "50 min", isPreview: false },
  //         { id: "vt35", title: "Voice Coding", description: "Whisper integration", duration: "40 min", isPreview: false },
  //         { id: "vt36", title: "Documentation Generation", description: "Auto docs from code", duration: "35 min", isPreview: false },
  //         { id: "vt37", title: "Code Migration", description: "AI-assisted refactoring", duration: "55 min", isPreview: false },
  //         { id: "vt38", title: "Regex & SQL", description: "Complex patterns with AI", duration: "40 min", isPreview: false },
  //         { id: "vt39", title: "Algorithm Design", description: "Solving with AI", duration: "45 min", isPreview: false },
  //         { id: "vt40", title: "Performance Optimization", description: "AI-suggested improvements", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "v6",
  //       title: "Production & Team Workflows",
  //       description: "Using AI in professional environments",
  //       order: 6,
  //       isPreview: false,
  //       topics: [
  //         { id: "vt41", title: "Team Onboarding", description: "AI for new developers", duration: "35 min", isPreview: false },
  //         { id: "vt42", title: "Code Standards", description: "Maintaining consistency", duration: "40 min", isPreview: false },
  //         { id: "vt43", title: "PR Descriptions", description: "Automated documentation", duration: "30 min", isPreview: false },
  //         { id: "vt44", title: "Meeting Summaries", description: "AI note-taking", duration: "25 min", isPreview: false },
  //         { id: "vt45", title: "Learning New Tech", description: "AI as mentor", duration: "35 min", isPreview: false },
  //         { id: "vt46", title: "Interview Prep", description: "AI-assisted studying", duration: "40 min", isPreview: false },
  //         { id: "vt47", title: "Side Projects", description: "Building faster", duration: "30 min", isPreview: false },
  //         { id: "vt48", title: "Future Skills", description: "Staying relevant", duration: "35 min", isPreview: false }
  //       ]
  //     }
  //   ]
  // },

  // // Course 4: JS Mastery
  // {
  //   id: "4",
  //   slug: "js-mastery",
  //   title: "JavaScript Mastery Bootcamp",
  //   shortTitle: "JS Mastery",
  //   description: "Complete JavaScript from zero to hero. Master ES6+, async programming, functional concepts, and modern patterns.",
  //   shortDescription: "Master JavaScript from fundamentals to advanced patterns",
  //   level: "Beginner",
  //   duration: "16 Weeks",
  //   totalModules: 8,
  //   totalTopics: 96,
  //   price: 20000,
  //   discountPrice: 10000,
  //   thumbnail: "/courses/js-mastery.jpg",
  //   icon: "⚡",
  //   color: "from-yellow-500 to-orange-600",
  //   featured: true,
  //   whatYouWillLearn: [
  //     "JavaScript Fundamentals Deep Dive",
  //     "ES6+ Modern Syntax",
  //     "Asynchronous Programming",
  //     "Functional Programming",
  //     "DOM Manipulation & Events",
  //     "Object-Oriented Patterns",
  //     "Error Handling & Debugging",
  //     "Performance Optimization"
  //   ],
  //   requirements: [
  //     "Basic HTML & CSS knowledge",
  //     "No prior programming required",
  //     "Willingness to practice daily"
  //   ],
  //   tags: ["JavaScript", "ES6", "DOM", "Async", "Functional"],
  //   modules: [
  //     {
  //       id: "j1",
  //       title: "JavaScript Fundamentals",
  //       description: "Core concepts every developer must know",
  //       order: 1,
  //       isPreview: true,
  //       topics: [
  //         { id: "jt1", title: "Variables & Data Types", description: "let, const, var deep dive", duration: "45 min", isPreview: true },
  //         { id: "jt2", title: "Operators & Expressions", description: "Arithmetic to logical", duration: "40 min", isPreview: true },
  //         { id: "jt3", title: "Control Flow", description: "if/else, switch, ternary", duration: "50 min", isPreview: false },
  //         { id: "jt4", title: "Loops & Iteration", description: "for, while, do-while", duration: "45 min", isPreview: false },
  //         { id: "jt5", title: "Functions Basics", description: "Declarations vs expressions", duration: "55 min", isPreview: false },
  //         { id: "jt6", title: "Scope & Closures", description: "Lexical scoping explained", duration: "60 min", isPreview: false },
  //         { id: "jt7", title: "Hoisting & TDZ", description: "How JS executes", duration: "50 min", isPreview: false },
  //         { id: "jt8", title: "Strict Mode", description: "Better error catching", duration: "35 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j2",
  //       title: "Data Structures",
  //       description: "Working with complex data",
  //       order: 2,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt9", title: "Arrays Deep Dive", description: "Methods and mutations", duration: "65 min", isPreview: false },
  //         { id: "jt10", title: "Objects & Properties", description: "Key-value mastery", duration: "60 min", isPreview: false },
  //         { id: "jt11", title: "Maps & Sets", description: "Modern collections", duration: "50 min", isPreview: false },
  //         { id: "jt12", title: "Destructuring", description: "Clean extraction", duration: "45 min", isPreview: false },
  //         { id: "jt13", title: "Spread & Rest", description: "Modern syntax", duration: "40 min", isPreview: false },
  //         { id: "jt14", title: "Array Methods", description: "map, filter, reduce", duration: "70 min", isPreview: false },
  //         { id: "jt15", title: "Object Methods", description: "Keys, values, entries", duration: "45 min", isPreview: false },
  //         { id: "jt16", title: "JSON Handling", description: "Serialization", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j3",
  //       title: "Functions Advanced",
  //       description: "Mastering functional concepts",
  //       order: 3,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt17", title: "Arrow Functions", description: "Concise syntax", duration: "40 min", isPreview: false },
  //         { id: "jt18", title: "Higher-Order Functions", description: "Functions as values", duration: "55 min", isPreview: false },
  //         { id: "jt19", title: "Callbacks", description: "Asynchronous patterns", duration: "50 min", isPreview: false },
  //         { id: "jt20", title: "IIFE Pattern", description: "Module pattern", duration: "35 min", isPreview: false },
  //         { id: "jt21", title: "Currying", description: "Partial application", duration: "45 min", isPreview: false },
  //         { id: "jt22", title: "Composition", description: "Function combining", duration: "50 min", isPreview: false },
  //         { id: "jt23", title: "Recursion", description: "Self-calling functions", duration: "55 min", isPreview: false },
  //         { id: "jt24", title: "Memoization", description: "Performance caching", duration: "45 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j4",
  //       title: "Object-Oriented JS",
  //       description: "Classes and prototypes",
  //       order: 4,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt25", title: "Prototypes", description: "Inheritance chain", duration: "60 min", isPreview: false },
  //         { id: "jt26", title: "Constructor Functions", description: "Object creation", duration: "45 min", isPreview: false },
  //         { id: "jt27", title: "ES6 Classes", description: "Modern OOP", duration: "55 min", isPreview: false },
  //         { id: "jt28", title: "Inheritance", description: "extends and super", duration: "50 min", isPreview: false },
  //         { id: "jt29", title: "Encapsulation", description: "Private fields", duration: "45 min", isPreview: false },
  //         { id: "jt30", title: "Polymorphism", description: "Method overriding", duration: "40 min", isPreview: false },
  //         { id: "jt31", title: "Static Methods", description: "Class-level methods", duration: "35 min", isPreview: false },
  //         { id: "jt32", title: "Design Patterns", description: "Singleton, Factory", duration: "55 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j5",
  //       title: "Asynchronous JavaScript",
  //       description: "Promises, async/await, and event loop",
  //       order: 5,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt33", title: "Event Loop", description: "How JS handles async", duration: "65 min", isPreview: false },
  //         { id: "jt34", title: "Callbacks & Callback Hell", description: "Pyramid of doom", duration: "45 min", isPreview: false },
  //         { id: "jt35", title: "Promises", description: "Then, catch, finally", duration: "60 min", isPreview: false },
  //         { id: "jt36", title: "Promise Methods", description: "all, race, allSettled", duration: "50 min", isPreview: false },
  //         { id: "jt37", title: "Async/Await", description: "Syntactic sugar", duration: "55 min", isPreview: false },
  //         { id: "jt38", title: "Error Handling", description: "Try/catch in async", duration: "45 min", isPreview: false },
  //         { id: "jt39", title: "Fetch API", description: "HTTP requests", duration: "50 min", isPreview: false },
  //         { id: "jt40", title: "AbortController", description: "Cancelling requests", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j6",
  //       title: "DOM & Browser APIs",
  //       description: "Interacting with web pages",
  //       order: 6,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt41", title: "DOM Tree", description: "Document structure", duration: "45 min", isPreview: false },
  //         { id: "jt42", title: "Selecting Elements", description: "querySelector family", duration: "40 min", isPreview: false },
  //         { id: "jt43", title: "Modifying Elements", description: "Content and attributes", duration: "50 min", isPreview: false },
  //         { id: "jt44", title: "Creating Elements", description: "Dynamic content", duration: "45 min", isPreview: false },
  //         { id: "jt45", title: "Event Listeners", description: "Handling interactions", duration: "60 min", isPreview: false },
  //         { id: "jt46", title: "Event Delegation", description: "Performance pattern", duration: "45 min", isPreview: false },
  //         { id: "jt47", title: "Forms & Validation", description: "User input handling", duration: "55 min", isPreview: false },
  //         { id: "jt48", title: "Local Storage", description: "Client-side storage", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j7",
  //       title: "Modern JavaScript",
  //       description: "ES6+ features and tooling",
  //       order: 7,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt49", title: "Template Literals", description: "String interpolation", duration: "35 min", isPreview: false },
  //         { id: "jt50", title: "Modules", description: "Import/export", duration: "50 min", isPreview: false },
  //         { id: "jt51", title: "Optional Chaining", description: "Safe property access", duration: "40 min", isPreview: false },
  //         { id: "jt52", title: "Nullish Coalescing", description: "?? operator", duration: "30 min", isPreview: false },
  //         { id: "jt53", title: "BigInt & Symbol", description: "New primitives", duration: "45 min", isPreview: false },
  //         { id: "jt54", title: "Generators", description: "Lazy evaluation", duration: "55 min", isPreview: false },
  //         { id: "jt55", title: "Proxies", description: "Meta-programming", duration: "60 min", isPreview: false },
  //         { id: "jt56", title: "Intl API", description: "Internationalization", duration: "40 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "j8",
  //       title: "Real-World Projects",
  //       description: "Building complete applications",
  //       order: 8,
  //       isPreview: false,
  //       topics: [
  //         { id: "jt57", title: "Todo App", description: "CRUD operations", duration: "55 min", isPreview: false },
  //         { id: "jt58", title: "Weather App", description: "API integration", duration: "60 min", isPreview: false },
  //         { id: "jt59", title: "Quiz Application", description: "Interactive UI", duration: "65 min", isPreview: false },
  //         { id: "jt60", title: "E-commerce Cart", description: "State management", duration: "70 min", isPreview: false },
  //         { id: "jt61", title: "Chat Application", description: "Real-time updates", duration: "75 min", isPreview: false },
  //         { id: "jt62", title: "Image Gallery", description: "Async loading", duration: "50 min", isPreview: false },
  //         { id: "jt63", title: "Form Validation", description: "Regex and logic", duration: "55 min", isPreview: false },
  //         { id: "jt64", title: "Portfolio Site", description: "Putting it together", duration: "80 min", isPreview: false }
  //       ]
  //     }
  //   ]
  // },

  // // Course 5: Full Stack with Next.js
  // {
  //   id: "5",
  //   slug: "fullstack-nextjs",
  //   title: "Full-Stack Development with Next.js",
  //   shortTitle: "Next.js Pro",
  //   description: "Build production-ready full-stack applications with Next.js 14, React Server Components, and modern backend patterns.",
  //   shortDescription: "Complete full-stack development with Next.js 14",
  //   level: "Intermediate",
  //   duration: "18 Weeks",
  //   totalModules: 9,
  //   totalTopics: 108,
  //   price: 35000,
  //   discountPrice: 10000,
  //   thumbnail: "/courses/nextjs-pro.jpg",
  //   icon: "▲",
  //   color: "from-slate-700 to-slate-900",
  //   featured: true,
  //   whatYouWillLearn: [
  //     "Next.js 14 App Router Deep Dive",
  //     "React Server Components",
  //     "Server Actions & Mutations",
  //     "Authentication with NextAuth",
  //     "Database Integration with Prisma",
  //     "Real-time with Server-Sent Events",
  //     "Deployment & Edge Functions",
  //     "Performance Optimization"
  //   ],
  //   requirements: [
  //     "Solid React fundamentals",
  //     "Basic TypeScript knowledge",
  //     "Understanding of REST APIs"
  //   ],
  //   tags: ["Next.js", "React", "Prisma", "TypeScript", "Tailwind"],
  //   modules: [
  //     {
  //       id: "n1",
  //       title: "Next.js Foundations",
  //       description: "Understanding the Next.js ecosystem",
  //       order: 1,
  //       isPreview: true,
  //       topics: [
  //         { id: "nt1", title: "Why Next.js?", description: "Framework overview", duration: "40 min", isPreview: true },
  //         { id: "nt2", title: "App vs Pages Router", description: "Architecture differences", duration: "50 min", isPreview: true },
  //         { id: "nt3", title: "Project Setup", description: "create-next-app deep dive", duration: "45 min", isPreview: false },
  //         { id: "nt4", title: "File Conventions", description: "Routing conventions", duration: "40 min", isPreview: false },
  //         { id: "nt5", title: "Layout System", description: "Nested layouts", duration: "55 min", isPreview: false },
  //         { id: "nt6", title: "Navigation", description: "Link and useRouter", duration: "40 min", isPreview: false },
  //         { id: "nt7", title: "Loading States", description: "loading.js patterns", duration: "45 min", isPreview: false },
  //         { id: "nt8", title: "Error Handling", description: "error.js boundaries", duration: "50 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n2",
  //       title: "React Server Components",
  //       description: "Understanding RSC architecture",
  //       order: 2,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt9", title: "Server vs Client", description: "Component types", duration: "60 min", isPreview: false },
  //         { id: "nt10", title: "Server Components", description: "Rendering on server", duration: "55 min", isPreview: false },
  //         { id: "nt11", title: "Client Components", description: "Interactive components", duration: "50 min", isPreview: false },
  //         { id: "nt12", title: "Component Boundaries", description: "Where to split", duration: "45 min", isPreview: false },
  //         { id: "nt13", title: "Data Fetching", description: "Async components", duration: "65 min", isPreview: false },
  //         { id: "nt14", title: "Streaming", description: "Progressive rendering", duration: "55 min", isPreview: false },
  //         { id: "nt15", title: "Caching", description: "Fetch cache strategies", duration: "60 min", isPreview: false },
  //         { id: "nt16", title: "Revalidation", description: "ISR and on-demand", duration: "50 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n3",
  //       title: "Styling & UI",
  //       description: "Modern styling approaches",
  //       order: 3,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt17", title: "Tailwind Integration", description: "Utility-first CSS", duration: "55 min", isPreview: false },
  //         { id: "nt18", title: "CSS Modules", description: "Scoped styles", duration: "40 min", isPreview: false },
  //         { id: "nt19", title: "Styled Components", description: "CSS-in-JS options", duration: "45 min", isPreview: false },
  //         { id: "nt20", title: "UI Libraries", description: "shadcn/ui, MUI, Chakra", duration: "50 min", isPreview: false },
  //         { id: "nt21", title: "Dark Mode", description: "next-themes setup", duration: "40 min", isPreview: false },
  //         { id: "nt22", title: "Responsive Design", description: "Mobile-first approach", duration: "45 min", isPreview: false },
  //         { id: "nt23", title: "Animations", description: "Framer Motion", duration: "55 min", isPreview: false },
  //         { id: "nt24", title: "Images", description: "next/image optimization", duration: "50 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n4",
  //       title: "Backend with Next.js",
  //       description: "API routes and server actions",
  //       order: 4,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt25", title: "Route Handlers", description: "API in App Router", duration: "55 min", isPreview: false },
  //         { id: "nt26", title: "HTTP Methods", description: "GET, POST, PUT, DELETE", duration: "50 min", isPreview: false },
  //         { id: "nt27", title: "Dynamic Routes", description: "Params and segments", duration: "45 min", isPreview: false },
  //         { id: "nt28", title: "Middleware", description: "Request interception", duration: "60 min", isPreview: false },
  //         { id: "nt29", title: "Server Actions", description: "Form mutations", duration: "70 min", isPreview: false },
  //         { id: "nt30", title: "useFormStatus", description: "Pending states", duration: "40 min", isPreview: false },
  //         { id: "nt31", title: "useOptimistic", description: "Optimistic updates", duration: "45 min", isPreview: false },
  //         { id: "nt32", title: "Validation", description: "Zod integration", duration: "50 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n5",
  //       title: "Database Integration",
  //       description: "Prisma and data management",
  //       order: 5,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt33", title: "Prisma Setup", description: "ORM configuration", duration: "50 min", isPreview: false },
  //         { id: "nt34", title: "Schema Design", description: "Model definitions", duration: "60 min", isPreview: false },
  //         { id: "nt35", title: "CRUD Operations", description: "Create, read, update, delete", duration: "65 min", isPreview: false },
  //         { id: "nt36", title: "Relations", description: "One-to-many, many-to-many", duration: "70 min", isPreview: false },
  //         { id: "nt37", title: "Migrations", description: "Schema evolution", duration: "45 min", isPreview: false },
  //         { id: "nt38", title: "Seeding", description: "Test data", duration: "40 min", isPreview: false },
  //         { id: "nt39", title: "Raw Queries", description: "Complex SQL", duration: "45 min", isPreview: false },
  //         { id: "nt40", title: "Connection Pooling", description: "Serverless optimization", duration: "50 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n6",
  //       title: "Authentication",
  //       description: "Secure auth implementation",
  //       order: 6,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt41", title: "NextAuth.js Setup", description: "Configuration basics", duration: "55 min", isPreview: false },
  //         { id: "nt42", title: "OAuth Providers", description: "Google, GitHub login", duration: "60 min", isPreview: false },
  //         { id: "nt43", title: "Credentials Provider", description: "Email/password", duration: "65 min", isPreview: false },
  //         { id: "nt44", title: "Session Management", description: "JWT vs database", duration: "55 min", isPreview: false },
  //         { id: "nt45", title: "Protected Routes", description: "Middleware auth", duration: "50 min", isPreview: false },
  //         { id: "nt46", title: "Role-Based Access", description: "Authorization", duration: "60 min", isPreview: false },
  //         { id: "nt47", title: "Magic Links", description: "Passwordless auth", duration: "45 min", isPreview: false },
  //         { id: "nt48", title: "Security Best Practices", description: "OWASP for Next.js", duration: "55 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n7",
  //       title: "Advanced Patterns",
  //       description: "Production-ready techniques",
  //       order: 7,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt49", title: "Parallel Routes", description: "@folder pattern", duration: "50 min", isPreview: false },
  //         { id: "nt50", title: "Intercepting Routes", description: "Modal patterns", duration: "55 min", isPreview: false },
  //         { id: "nt51", title: "Route Groups", description: "Layout organization", duration: "40 min", isPreview: false },
  //         { id: "nt52", title: "Suspense Boundaries", description: "Loading states", duration: "45 min", isPreview: false },
  //         { id: "nt53", title: "Error Boundaries", description: "Graceful failures", duration: "50 min", isPreview: false },
  //         { id: "nt54", title: "Parallel Data Fetching", description: "Promise.all", duration: "45 min", isPreview: false },
  //         { id: "nt55", title: "Infinite Scrolling", description: "Intersection Observer", duration: "55 min", isPreview: false },
  //         { id: "nt56", title: "Search & Filter", description: "URL state management", duration: "60 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n8",
  //       title: "Real-time & Edge",
  //       description: "Modern runtime features",
  //       order: 8,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt57", title: "Server-Sent Events", description: "Real-time updates", duration: "55 min", isPreview: false },
  //         { id: "nt58", title: "WebSockets", description: "Socket.io integration", duration: "65 min", isPreview: false },
  //         { id: "nt59", title: "Edge Runtime", description: "Middleware and routes", duration: "60 min", isPreview: false },
  //         { id: "nt60", title: "Edge Functions", description: "Global distribution", duration: "50 min", isPreview: false },
  //         { id: "nt61", title: "Vercel KV", description: "Redis at edge", duration: "45 min", isPreview: false },
  //         { id: "nt62", title: "Vercel Postgres", description: "Serverless SQL", duration: "50 min", isPreview: false },
  //         { id: "nt63", title: "Image Optimization", description: "Edge processing", duration: "40 min", isPreview: false },
  //         { id: "nt64", title: "Analytics", description: "Vercel Analytics", duration: "35 min", isPreview: false }
  //       ]
  //     },
  //     {
  //       id: "n9",
  //       title: "Deployment & Production",
  //       description: "Going live with confidence",
  //       order: 9,
  //       isPreview: false,
  //       topics: [
  //         { id: "nt65", title: "Vercel Deployment", description: "Git integration", duration: "45 min", isPreview: false },
  //         { id: "nt66", title: "Environment Variables", description: "Secrets management", duration: "40 min", isPreview: false },
  //         { id: "nt67", title: "Custom Domains", description: "DNS configuration", duration: "35 min", isPreview: false },
  //         { id: "nt68", title: "Preview Deployments", description: "Branch previews", duration: "30 min", isPreview: false },
  //         { id: "nt69", title: "Performance Tuning", description: "Core Web Vitals", duration: "55 min", isPreview: false },
  //         { id: "nt70", title: "SEO Optimization", description: "Metadata API", duration: "50 min", isPreview: false },
  //         { id: "nt71", title: "Sitemap & Robots", description: "Search engine setup", duration: "35 min", isPreview: false },
  //         { id: "nt72", title: "Monitoring", description: "Error tracking", duration: "40 min", isPreview: false }
  //       ]
  //     }
  //   ]
  // }
];

// Helper functions
export const getCourseBySlug = (slug: string): ICourse | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getFeaturedCourses = (): ICourse[] => {
  return courses.filter(course => course.featured);
};

export const getCourseStats = () => {
  const totalCourses = courses.length;
  const totalModules = courses.reduce((acc, course) => acc + course.totalModules, 0);
  const totalTopics = courses.reduce((acc, course) => acc + course.totalTopics, 0);
  const avgPrice = Math.round(courses.reduce((acc, course) => acc + course.price, 0) / courses.length);
  
  return { totalCourses, totalModules, totalTopics, avgPrice };
};