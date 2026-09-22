// lib/codearn-ai/suggestions-map.ts

/**
 * Contextual follow-up suggestions based on AI response topics.
 * Lightweight keyword matching — no ML needed.
 */

interface SuggestionRule {
  keywords: string[];
  followUps: string[];
}

const RULES: SuggestionRule[] = [
  {
    keywords: ["gigthink", "gig think"],
    followUps: [
      "How does GigThink's match scoring work?",
      "Is GigThink free to use?",
      "Who is GigThink for?",
    ],
  },
  {
    keywords: ["founder", "muhammad bilal", "bilal"],
    followUps: [
      "What is Muhammad Bilal's background?",
      "How can I contact the founder?",
      "What products has the founder built?",
    ],
  },
  {
    keywords: ["codearn", "company"],
    followUps: [
      "What does CodEarn build?",
      "Where is CodEarn based?",
      "How can I work with CodEarn?",
    ],
  },
  {
    keywords: ["contact", "email", "reach"],
    followUps: [
      "What is CodEarn's email?",
      "How can I partner with CodEarn?",
      "Do you offer custom software development?",
    ],
  },
  {
    keywords: ["service", "development", "custom"],
    followUps: [
      "Does CodEarn build mobile apps?",
      "Can CodEarn help with AI integrations?",
      "How much does a project cost?",
    ],
  },
  {
    keywords: ["mentor", "training", "course"],
    followUps: [
      "How do I apply for mentorship?",
      "What topics does the mentorship cover?",
      "Is mentorship free?",
    ],
  },
  {
    keywords: ["product", "saas", "app"],
    followUps: [
      "What other products is CodEarn building?",
      "Is GigThink CodEarn's only live product?",
      "When is the next product launching?",
    ],
  },
];

const FALLBACK: string[] = [
  "What else can you tell me about CodEarn?",
  "What products does CodEarn have?",
  "How can I get in touch?",
];

/**
 * Returns 3 contextual follow-up suggestions.
 */
export function getFollowUps(aiResponse: string): string[] {
  const lower = aiResponse.toLowerCase();

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.followUps;
    }
  }

  return FALLBACK;
}