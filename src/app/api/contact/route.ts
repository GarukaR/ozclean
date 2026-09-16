import { NextRequest, NextResponse } from "next/server"

import { getClientIdentifier, rateLimit } from "@/lib/rate-limit"
import { contactSchema } from "@/lib/contact"
import { sendContactSubmissionEmail } from "@/lib/resend"

// Each submission sends email, so cap how often one client can post.
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }

export async function POST(req: NextRequest) {
  try {
    const limit = rateLimit(`contact:${getClientIdentifier(req)}`, RATE_LIMIT)

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      )
    }

    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid contact request",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    await sendContactSubmissionEmail({
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      message: data.message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[contact] Error while sending contact email:", error)
    return NextResponse.json(
      { error: "Failed to submit contact message. Please try again." },
      { status: 500 }
    )
  }
}