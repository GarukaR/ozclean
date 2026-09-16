import type { NextRequest } from "next/server"

/**
 * Small in-process fixed-window rate limiter for the unauthenticated endpoints that send email.
 *
 * It is deliberately dependency-free: the limit is per server instance, so a horizontally scaled
 * deployment allows up to (limit x instances) requests per window. That is enough to stop casual
 * abuse of the contact/quote forms; move to a shared store (e.g. Redis) if stricter limits are
 * ever needed.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

// Keeps the map from growing without bound on a long-lived instance.
const MAX_TRACKED_KEYS = 10_000

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export function getClientIdentifier(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for")
  if (forwardedFor) {
    // Left-most entry is the original client on Vercel.
    return forwardedFor.split(",")[0].trim()
  }

  return req.headers.get("x-real-ip") ?? "unknown"
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now()
  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    if (windows.size >= MAX_TRACKED_KEYS) {
      for (const [trackedKey, window] of windows) {
        if (window.resetAt <= now) windows.delete(trackedKey)
      }
    }

    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 }
  }

  existing.count += 1
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  if (existing.count > limit) {
    return { allowed: false, remaining: 0, retryAfterSeconds }
  }

  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds }
}
