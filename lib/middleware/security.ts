import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Advanced rate limiting with Redis-like memory store
interface RateLimitStore {
  count: number;
  resetTime: number;
  attempts: number[];
}

const rateLimitStore = new Map<string, RateLimitStore>();

// Helper function to extract IP safely in Next.js
const getClientIP = (request: NextRequest): string => {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return (request as any).ip || '127.0.0.1';
};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}, 5 * 60 * 1000);

export function advancedRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000,
  blockDuration: number = 60 * 60 * 1000
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
      attempts: [now],
    });
    return { allowed: true };
  }

  // Clean old attempts outside window
  record.attempts = record.attempts.filter(time => now - time < windowMs);

  // Check if blocked
  if (record.count > maxRequests * 2) {
    const blockTime = record.attempts[record.attempts.length - 1] + blockDuration;
    if (now < blockTime) {
      return { allowed: false, retryAfter: Math.ceil((blockTime - now) / 1000) };
    }
    // Reset after block duration
    record.count = 1;
    record.attempts = [now];
    return { allowed: true };
  }

  if (record.attempts.length >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
  }

  record.attempts.push(now);
  record.count++;
  return { allowed: true };
}

// CSRF Protection
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token');
  const cookieToken = request.cookies.get('csrf-token')?.value;
  
  if (!csrfToken || !cookieToken) return false;
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(csrfToken),
      Buffer.from(cookieToken)
    );
  } catch (e) {
    return false;
  }
}

// Security headers
export function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response; // 🔥 SAME RESPONSE RETURN
}

// Device fingerprinting for session security
export function generateDeviceFingerprint(request: NextRequest): string {
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  const ip = getClientIP(request); // FIX: Safe IP extraction
  
  return crypto
    .createHash('sha256')
    .update(`${userAgent}-${acceptLanguage}-${ip}`)
    .digest('hex')
    .substring(0, 32);
}

// IP Geolocation check (basic)
export function isSuspiciousIP(request: NextRequest): boolean {
  const ip = getClientIP(request); // FIX: Safe IP extraction
  
  const suspiciousHeaders = [
    'x-proxy-id',
    'via',
    'forwarded',
  ];
  
  let score = 0;
  suspiciousHeaders.forEach(header => {
    if (request.headers.get(header)) score++;
  });
  
  // Agar multiple proxy headers hain to suspicious hai
  return score > 2;
}
