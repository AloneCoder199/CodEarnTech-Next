// app/api/codearn-ai/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/codearn-ai/system-prompt";
import {
  validateResponse,
  detectPromptInjection,
  sanitizeUserInput,
} from "@/lib/codearn-ai/guardrails";
import { callGroq } from "@/lib/codearn-ai/groq-client";
import {
  checkRateLimit,
  getClientIdentifier,
} from "@/lib/codearn-ai/rate-limit";
import type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  ChatErrorResponse,
  ChatErrorCode,
} from "@/lib/codearn-ai/types";

/* ============================================================
   RUNTIME CONFIG
============================================================ */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ============================================================
   LIMITS — tuned for Groq free tier
============================================================ */
const MAX_MESSAGE_LENGTH = parseInt(
  process.env.CODEARN_AI_MAX_MESSAGE_LENGTH || "500",
  10
);

// Conversation turns kept in memory (user + assistant = 2x)
// Reduced from 10 to 6 to save tokens within TPM limit
const MAX_TURNS = parseInt(
  process.env.CODEARN_AI_MAX_CONVERSATION_TURNS || "6",
  10
);

// Max tokens reserved for the AI response
const MAX_RESPONSE_TOKENS = 400;

/* ============================================================
   HELPERS
============================================================ */
function errorResponse(
  code: ChatErrorCode,
  error: string,
  status: number,
  meta?: ChatErrorResponse["meta"]
): NextResponse<ChatErrorResponse> {
  return NextResponse.json(
    { success: false, error, code, meta },
    { status }
  );
}

function randomId(): string {
  return (
    Math.random().toString(36).slice(2, 10) +
    Date.now().toString(36)
  );
}

/**
 * Maps a Groq-thrown error to our API error code + HTTP status.
 * Called only after Groq has exhausted its internal retries.
 */
function mapGroqError(err: unknown): {
  code: ChatErrorCode;
  message: string;
  status: number;
} {
  const msg = err instanceof Error ? err.message : String(err);

  if (msg.includes("429") || msg.toLowerCase().includes("rate limit")) {
    return {
      code: "AI_RATE_LIMITED",
      message:
        "The AI is briefly busy. Please try again in a few seconds.",
      status: 429,
    };
  }

  if (msg.includes("timed out")) {
    return {
      code: "AI_ERROR",
      message: "The AI took too long to respond. Please try again.",
      status: 504,
    };
  }

  return {
    code: "AI_ERROR",
    message:
      "The AI is temporarily unavailable. Please try again in a moment.",
    status: 503,
  };
}

/* ============================================================
   POST /api/codearn-ai/chat
============================================================ */
export async function POST(
  req: NextRequest
): Promise<NextResponse<ChatResponse | ChatErrorResponse>> {
  const startTime = Date.now();

  try {
    /* --------------------------------------------------------
       STEP 1 — Parse request body
    -------------------------------------------------------- */
    let body: ChatRequest;
    try {
      body = await req.json();
    } catch {
      return errorResponse(
        "INVALID_INPUT",
        "Invalid request body.",
        400
      );
    }

    /* --------------------------------------------------------
       STEP 2 — Validate message
    -------------------------------------------------------- */
    if (!body?.message || typeof body.message !== "string") {
      return errorResponse(
        "INVALID_INPUT",
        "Message is required.",
        400
      );
    }

    const sanitized = sanitizeUserInput(body.message);

    if (!sanitized) {
      return errorResponse(
        "INVALID_INPUT",
        "Message is empty.",
        400
      );
    }

    if (sanitized.length > MAX_MESSAGE_LENGTH) {
      return errorResponse(
        "INVALID_INPUT",
        `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`,
        400
      );
    }

    /* --------------------------------------------------------
       STEP 3 — Prompt injection guard
    -------------------------------------------------------- */
    if (detectPromptInjection(sanitized)) {
      console.warn("[CodEarn AI] Prompt injection attempt blocked");

      return NextResponse.json(
        {
          success: true,
          reply:
            "I can help with questions about CodEarn, its products, services, and founder — but I can't provide internal instructions.",
          conversationId: body.conversationId || randomId(),
          meta: {
            model: process.env.GROQ_MODEL || "unknown",
            responseTimeMs: Date.now() - startTime,
            rateLimit: {
              remaining: 0,
              resetAt: new Date().toISOString(),
            },
          },
        },
        { status: 200 }
      );
    }

    /* --------------------------------------------------------
       STEP 4 — Our own rate limit (per user / IP)
    -------------------------------------------------------- */
    const identifier = getClientIdentifier(req.headers);
    const rl = checkRateLimit(identifier);

    if (!rl.allowed) {
      return errorResponse(
        "RATE_LIMITED",
        `You've reached the hourly limit. Try again in ${Math.ceil(
          (rl.retryAfterSeconds || 0) / 60
        )} minute(s).`,
        429,
        { retryAfter: rl.retryAfterSeconds }
      );
    }

    /* --------------------------------------------------------
       STEP 5 — Build conversation history
       Trim to last N turns and ensure only valid messages.
    -------------------------------------------------------- */
    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (m): m is ChatMessage =>
              !!m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-MAX_TURNS * 2) // keep last N turns (user+assistant)
      : [];

    const messages: ChatMessage[] = [
      ...history,
      { role: "user", content: sanitized },
    ];

    /* --------------------------------------------------------
       STEP 6 — Call Groq (with internal retries)
    -------------------------------------------------------- */
    let groqResult;
    try {
      groqResult = await callGroq({
        systemPrompt: buildSystemPrompt(),
        messages,
        maxTokens: MAX_RESPONSE_TOKENS,
      });
    } catch (err) {
      console.error("[CodEarn AI] Groq call failed:", err);

      const mapped = mapGroqError(err);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    /* --------------------------------------------------------
       STEP 7 — Guardrail: validate the AI response
    -------------------------------------------------------- */
    const validation = validateResponse(groqResult.reply);

    const finalReply = validation.safe
      ? groqResult.reply
      : validation.sanitized || groqResult.reply;

    if (!validation.safe) {
      console.warn(
        "[CodEarn AI] Guardrail triggered:",
        validation.reason
      );
    }

    /* --------------------------------------------------------
       STEP 8 — Return response
    -------------------------------------------------------- */
    const response: ChatResponse = {
      success: true,
      reply: finalReply,
      conversationId: body.conversationId || randomId(),
      meta: {
        model: groqResult.model,
        responseTimeMs: Date.now() - startTime,
        rateLimit: {
          remaining: rl.remaining,
          resetAt: rl.resetAt.toISOString(),
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("[CodEarn AI] Unhandled error:", err);
    return errorResponse(
      "SERVER_ERROR",
      "Something went wrong. Please try again.",
      500
    );
  }
}

/* ============================================================
   OPTIONS — CORS preflight (for local dev)
============================================================ */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}