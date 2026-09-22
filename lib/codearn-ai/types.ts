// lib/codearn-ai/types.ts

/* ============================================================
   CHAT MESSAGE
============================================================ */
export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/* ============================================================
   API REQUEST
============================================================ */
export interface ChatRequest {
  message: string;
  conversationId?: string;
  history?: ChatMessage[];
  isRegenerate?: boolean;
}

/* ============================================================
   API RESPONSE — SUCCESS
============================================================ */
export interface ChatResponse {
  success: true;
  reply: string;
  conversationId: string;
  meta: {
    model: string;
    responseTimeMs: number;
    rateLimit: {
      remaining: number;
      resetAt: string;
    };
  };
}

/* ============================================================
   API RESPONSE — ERROR
============================================================ */
export type ChatErrorCode =
  | "INVALID_INPUT"        // Bad request / too long / empty
  | "RATE_LIMITED"         // Our own rate limiter triggered
  | "AI_RATE_LIMITED"      // Groq upstream rate limit (after retries)
  | "PROMPT_INJECTION"     // Detected injection attempt
  | "AI_ERROR"             // Groq failed for other reason
  | "SERVER_ERROR";        // Unexpected server error

export interface ChatErrorResponse {
  success: false;
  error: string;
  code: ChatErrorCode;
  meta?: {
    retryAfter?: number; // seconds until retry is allowed
  };
}

export type ApiResponse = ChatResponse | ChatErrorResponse;