import { NextRequest, NextResponse } from "next/server"

import { getClientIdentifier, rateLimit } from "@/lib/rate-limit"
import { quoteSchema } from "@/lib/quote"
import { sendQuoteEmails } from "@/lib/resend"

// Each submission sends email, so cap how often one client can post.
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }

export async function POST(req: NextRequest) {
  try {
    const limit = rateLimit(`quote:${getClientIdentifier(req)}`, RATE_LIMIT)

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many quote requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      )
    }

    const body = await req.json()
    const parsed = quoteSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid quote request",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    await sendQuoteEmails({
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      address: data.address,
      service: data.service,
      message: data.message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[quote] Error while sending quote emails:", error)
    return NextResponse.json(
      { error: "Failed to submit quote request. Please try again." },
      { status: 500 }
    )
  }
}