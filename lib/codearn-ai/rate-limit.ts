// lib/codearn-ai/rate-limit.ts

/**
 * In-memory sliding-window rate limiter.
 *
 * Note: This is per-server-instance. On Vercel (serverless), each
 * cold start has its own memory. For production with multiple
 * instances, upgrade to Redis or Supabase later.
 *
 * Good enough for MVP.
 */

interface RateLimitEntry {
  timestamps: number[]; // ms timestamps of recent requests
}

const store = new Map<string, RateLimitEntry>();

/* ============================================================
   CONFIG
============================================================ */
function getLimit(): number {
  return parseInt(process.env.CODEARN_AI_RATE_LIMIT || "40", 10);
}

function getWindowMs(): number {
  const hours = parseFloat(
    process.env.CODEARN_AI_RATE_WINDOW_HOURS || "1"
  );
  return hours * 60 * 60 * 1000;
}

/* ============================================================
   CLEANUP — remove stale entries occasionally
============================================================ */
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 min

function maybeCleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const cutoff = now - windowMs;
  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

/* ============================================================
   CHECK + CONSUME
============================================================ */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterSeconds?: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const limit = getLimit();
  const windowMs = getWindowMs();
  const now = Date.now();

  maybeCleanup(windowMs);

  const entry = store.get(identifier) || { timestamps: [] };

  // Drop timestamps outside the window
  const cutoff = now - windowMs;
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  // Compute reset time (when the oldest entry expires)
  const oldestInWindow = entry.timestamps[0];
  const resetAt = oldestInWindow
    ? new Date(oldestInWindow + windowMs)
    : new Date(now + windowMs);

  if (entry.timestamps.length >= limit) {
    // Over the limit
    const retryAfterSeconds = Math.ceil(
      (resetAt.getTime() - now) / 1000
    );
    store.set(identifier, entry);
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      retryAfterSeconds,
    };
  }

  // Consume one slot
  entry.timestamps.push(now);
  store.set(identifier, entry);

  return {
    allowed: true,
    remaining: limit - entry.timestamps.length,
    resetAt,
  };
}

/* ============================================================
   IDENTIFIER — IP-based
============================================================ */
export function getClientIdentifier(headers: Headers): string {
  // Try common headers first (Vercel, Cloudflare, standard)
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (ip) return `ip:${ip}`;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return `ip:${realIp}`;

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return `ip:${cfIp}`;

  // Fallback — very unlikely on Vercel
  return "ip:unknown";
}