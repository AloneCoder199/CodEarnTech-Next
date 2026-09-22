// lib/codearn-ai/knowledge/index.ts

import { company } from "./company";
import { founder } from "./founder";
import { products } from "./products";
import { gigthink } from "./gigthink";
import { services } from "./services";
import { training } from "./training";
import { contact } from "./contact";
import { policies } from "./policies";
import { faqs } from "./faqs";

/**
 * CodEarn AI Knowledge Base — Single Source of Truth
 *
 * This is the ONLY data the AI is allowed to use.
 * Do not add unverified information here.
 */
export const codearnKnowledge = {
  company,
  founder,
  products,
  gigthink,
  services,
  training,
  contact,
  policies,
  faqs,
};

export type CodEarnKnowledge = typeof codearnKnowledge;