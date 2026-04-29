import { NextRequest, NextResponse } from "next/server"
import { quoteSchema } from "@/lib/quote"
import { sendQuoteEmails } from "@/lib/resend"

export async function POST(req: NextRequest) {
  try {
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