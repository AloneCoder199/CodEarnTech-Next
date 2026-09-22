// lib/codearn-ai/groq-client.ts

import type { ChatMessage } from "./types";

/* ============================================================
   CONFIGURATION
============================================================ */
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Retry strategy for rate limits (429) and server errors (5xx)
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2_000; // 2s → 4s → 8s
const REQUEST_TIMEOUT_MS = 30_000;

// Default max_tokens for AI response.
// Kept low to leave headroom within Groq's free-tier TPM (8,000/min).
const DEFAULT_MAX_TOKENS = 400;

/* ============================================================
   ENV CONFIG LOADER
============================================================ */
interface GroqConfig {
  apiKey: string;
  model: string;
  temperature: number;
}

function getConfig(): GroqConfig {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const temperature = parseFloat(
    process.env.CODEARN_AI_TEMPERATURE || "0.5"
  );

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is missing. Add it to .env.local before running."
    );
  }

  return { apiKey, model, temperature };
}

/* ============================================================
   TYPES
============================================================ */
export interface GroqCallOptions {
  systemPrompt: string;
  messages: ChatMessage[];
  maxTokens?: number;
}

export interface GroqCallResult {
  reply: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/* ============================================================
   RETRY-AFTER PARSER
   Groq may send the wait time via:
     1. The standard `Retry-After` HTTP header
     2. The JSON body: "try again in 6.5s"
============================================================ */
function parseRetryAfterMs(
  response: Response,
  bodyText: string
): number | null {
  // 1) Standard header
  const headerValue = response.headers.get("retry-after");
  if (headerValue) {
    const seconds = parseFloat(headerValue);
    if (!isNaN(seconds)) {
      return Math.ceil(seconds * 1000) + 500; // +0.5s safety margin
    }
  }

  // 2) JSON body fallback
  try {
    const parsed = JSON.parse(bodyText);
    const message: string = parsed?.error?.message ?? "";
    const match = message.match(/try again in ([\d.]+)s/i);
    if (match) {
      const seconds = parseFloat(match[1]);
      if (!isNaN(seconds)) {
        return Math.ceil(seconds * 1000) + 1000; // +1s safety margin
      }
    }
  } catch {
    // Body wasn't JSON — ignore
  }

  return null;
}

/* ============================================================
   SLEEP HELPER
============================================================ */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ============================================================
   MAIN CALL — with retries + timeout
============================================================ */
export async function callGroq(
  options: GroqCallOptions
): Promise<GroqCallResult> {
  const { apiKey, model, temperature } = getConfig();
  const {
    systemPrompt,
    messages,
    maxTokens = DEFAULT_MAX_TOKENS,
  } = options;

  // OpenAI-compatible format: system prompt first, then messages
  const groqMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const requestBody = JSON.stringify({
    model,
    messages: groqMessages,
    temperature,
    max_tokens: maxTokens,
    top_p: 0.9,
    stream: false,
  });

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: requestBody,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      /* --------------------------------------------------------
         SUCCESS
      -------------------------------------------------------- */
      if (response.ok) {
        const data = await response.json();
        const reply =
          data?.choices?.[0]?.message?.content?.trim() || "";

        if (!reply) {
          throw new Error("Groq returned an empty response.");
        }

        return {
          reply,
          model: data?.model || model,
          usage: data?.usage
            ? {
                promptTokens: data.usage.prompt_tokens,
                completionTokens: data.usage.completion_tokens,
                totalTokens: data.usage.total_tokens,
              }
            : undefined,
        };
      }

      /* --------------------------------------------------------
         ERROR — decide if retryable
      -------------------------------------------------------- */
      const bodyText = await response.text();
      const status = response.status;

      // Retry only on rate-limit (429) or server errors (5xx)
      const isRetryable = status === 429 || status >= 500;

      // Log the raw error for debugging
      console.error(
        `[Groq] attempt ${attempt + 1}/${MAX_RETRIES + 1} failed`,
        status,
        bodyText.slice(0, 300)
      );

      if (!isRetryable) {
        // Non-retryable: bad request, unauthorized, model not found, etc.
        throw new Error(
          `Groq API returned ${status}. Please try again.`
        );
      }

      lastError = new Error(
        `Groq API returned ${status}. Please try again.`
      );

      // If retries exhausted, stop
      if (attempt === MAX_RETRIES) break;

      // Compute wait time
      const retryAfterMs = parseRetryAfterMs(response, bodyText);
      const backoffMs =
        retryAfterMs ??
        BASE_DELAY_MS * Math.pow(2, attempt) +
          Math.floor(Math.random() * 1_000);

      console.warn(
        `[Groq] retryable ${status} — waiting ${backoffMs}ms before retry`
      );

      await sleep(backoffMs);
    } catch (err) {
      clearTimeout(timeoutId);

      // Network timeout → may be retryable
      if (err instanceof Error && err.name === "AbortError") {
        lastError = new Error(
          "AI request timed out. Please try again."
        );

        if (attempt === MAX_RETRIES) break;

        console.warn(
          `[Groq] timeout — retrying after ${BASE_DELAY_MS}ms`
        );
        await sleep(BASE_DELAY_MS);
        continue;
      }

      // Any other thrown error (non-retryable) — bubble up immediately
      throw err;
    }
  }

  // All retries exhausted
  throw lastError || new Error("Groq request failed after retries.");
}