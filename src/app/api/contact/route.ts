import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact"
import { sendContactSubmissionEmail } from "@/lib/resend"

export async function POST(req: NextRequest) {
  try {
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