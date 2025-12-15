import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// Create rate limiter (if using Upstash/Vercel KV)
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour per IP
});

// Simple in-memory rate limiter (for development/self-hosted)
const inMemoryRatelimit = new Map<
  string,
  { count: number; resetTime: number }
>();

function simpleRateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 60 * 60 * 1000,
): boolean {
  const now = Date.now();
  const record = inMemoryRatelimit.get(ip);

  if (!record || now > record.resetTime) {
    inMemoryRatelimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  // Try multiple headers to get the real client IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a default value
  return "unknown";
}

export async function proxy(request: NextRequest) {
  // Only apply rate limiting to newsletter API
  if (request.nextUrl.pathname === "/api/newsletter/subscribe") {
    const ip = getClientIP(request);

    try {
      // Use Upstash rate limiter if available, otherwise fall back to in-memory
      let success: boolean;

      if (process.env.KV_REST_API_URL) {
        const { success: rateLimitSuccess } = await ratelimit.limit(ip);
        success = rateLimitSuccess;
      } else {
        success = simpleRateLimit(ip);
      }

      if (!success) {
        return NextResponse.json(
          {
            message: "Too many subscription attempts. Please try again later.",
            success: false,
          },
          { status: 429 },
        );
      }
    } catch (error) {
      console.error("Rate limiting error:", error);
      // If rate limiting fails, allow the request to continue
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/newsletter/:path*"],
};
