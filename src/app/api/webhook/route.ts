import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { Resend } from "resend";
import { render } from "@react-email/render";
import BookingConfirmation from "@/emails/BookingConfirmation";
import BookingNotification from "@/emails/BookingNotification";
import crypto from "crypto";

// ─── Clients ──────────────────────────────────────────────────────────────────
const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.NODE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

// ─── Verify Square webhook signature ─────────────────────────────────────────
function verifySquareSignature(
  body: string,
  signature: string,
  url: string
): boolean {
  const hmac = crypto.createHmac(
    "sha256",
    process.env.SQUARE_WEBHOOK_SIGNATURE!
  );
  hmac.update(url + body);
  const expected = hmac.digest("base64");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// ─── Format currency from cents ───────────────────────────────────────────────
function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// ─── Format date for emails ───────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-square-hmacsha256-signature") ?? "";
    const url = `${process.env.NEXT_PUBLIC_URL}/api/webhook`;

    // Verify the webhook is genuinely from Square
    if (!verifySquareSignature(rawBody, signature, url)) {
      console.warn("[webhook] Invalid Square signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Only process successful payments
    if (event.type !== "payment.completed") {
      return NextResponse.json({ received: true });
    }

    const payment = event.data?.object?.payment;
    if (!payment) {
      return NextResponse.json({ received: true });
    }

    // Pull booking metadata from the Square order
    const orderId = payment.orderId;
    const orderResult = await square.orders.get({ orderId });
    const order = orderResult.order;
    const meta = order?.metadata ?? {};

    const {
      bookingId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      service,
      date,
      time,
      instructions,
    } = meta;

    // Calculate amounts
    const depositCents = Number(payment.totalMoney?.amount ?? 0);
    // Reverse-calculate total from deposit (deposit = 10% of total)
    const totalCents = depositCents * 10;
    const balanceCents = totalCents - depositCents;

    const emailProps = {
      customerName: customerName ?? "Customer",
      customerEmail: customerEmail ?? "",
      customerPhone: customerPhone ?? "",
      service: service ?? "Cleaning Service",
      date: formatDate(date ?? new Date().toISOString()),
      time: time ?? "",
      address: address ?? "",
      instructions: instructions ?? "",
      depositAmount: formatMoney(depositCents),
      totalAmount: formatMoney(totalCents),
      balanceDue: formatMoney(balanceCents),
      bookingId: bookingId ?? payment.id,
      squarePaymentId: payment.id,
    };

    // Send both emails in parallel
    await Promise.all([
      // 1. Confirmation to customer
      resend.emails.send({
        from: "SparkClean <bookings@sparkclean.com.au>",
        to: emailProps.customerEmail,
        subject: `Booking Confirmed — ${service} on ${emailProps.date}`,
        html: await render(BookingConfirmation(emailProps)),
      }),

      // 2. Notification to business owner
      resend.emails.send({
        from: "SparkClean Bookings <bookings@sparkclean.com.au>",
        to: process.env.BOOKING_NOTIFICATION_EMAIL!,
        subject: `New Booking — ${customerName} · ${service} · ${emailProps.date}`,
        html: await render(BookingNotification(emailProps)),
      }),
    ]);

    console.log(`[webhook] Booking ${bookingId} processed — emails sent to ${customerEmail} and owner`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[webhook] Error processing payment:", error);
    // Return 200 to prevent Square from retrying — log the error instead
    return NextResponse.json({ received: true, error: String(error) });
  }
}