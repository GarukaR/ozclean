import { NextRequest, NextResponse } from "next/server";
import { Client, Environment } from "square";
import { randomUUID } from "crypto";

// ─── Square client ────────────────────────────────────────────────────────────
const square = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
});

// ─── Service base prices (AUD cents) — keep in sync with your pricing ────────
const SERVICE_PRICES: Record<string, number> = {
  "Residential Cleaning": 16000,   // $160
  "Commercial Cleaning": 25000,    // $250
  "Deep Cleaning": 30000,          // $300
  "Move In / Move Out": 28000,     // $280
  "Window Cleaning": 12000,        // $120
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      address,
      service,
      date,
      time,
      instructions,
    } = body;

    // Validate required fields
    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const basePrice = SERVICE_PRICES[service] ?? 20000;
    const depositAmount = Math.round(basePrice * 0.1); // 10% deposit in cents
    const bookingId = `SC-${Date.now().toString().slice(-6)}`; // e.g. SC-123456

    // Create Square payment link for the 10% deposit
    const { result } = await square.checkoutApi.createPaymentLink({
      idempotencyKey: randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        referenceId: bookingId,
        lineItems: [
          {
            name: `SparkClean Booking Deposit — ${service}`,
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(depositAmount),
              currency: "AUD",
            },
            note: `Booking deposit (10%) for ${service} on ${date} at ${time}. Full service: $${(basePrice / 100).toFixed(2)} AUD. Balance due 24hrs before.`,
          },
        ],
        metadata: {
          bookingId,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          address,
          service,
          date,
          time,
          instructions: instructions ?? "",
        },
      },
      checkoutOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?id=${bookingId}`,
        askForShippingAddress: false,
        merchantSupportEmail: process.env.BOOKING_NOTIFICATION_EMAIL,
      },
      prePopulatedData: {
        buyerEmail: email,
      },
    });

    const paymentUrl = result.paymentLink?.url;

    if (!paymentUrl) {
      throw new Error("Square did not return a payment URL");
    }

    return NextResponse.json({ url: paymentUrl, bookingId });
  } catch (error) {
    console.error("[create-checkout] Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment link. Please try again." },
      { status: 500 }
    );
  }
}