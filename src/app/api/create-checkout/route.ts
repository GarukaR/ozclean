import { NextRequest, NextResponse } from "next/server";
import { createBookingAndPaymentLink } from "@/server/actions/booking";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      address,
      addressLine2,
      suburb,
      state,
      postcode,
      service,
      addOns,
      date,
      time,
      instructions,
    } = body;

    // Validate required fields
    if (!name || !email || !service || !date || !time || !suburb || !state || !postcode) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    // Call server action
    const result = await createBookingAndPaymentLink({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceCode: service, // Assuming service is a code like 'hourly-cleaning'
      scheduledAt: `${date}T${time}`,
      addressLine1: address,
      addressLine2,
      suburb,
      state,
      postcode,
      instructions,
      addonIds: Array.isArray(addOns) ? addOns : [],
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create booking" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      url: result.paymentUrl,
      bookingId: result.bookingId,
      bookingRef: result.bookingRef,
    });
  } catch (error) {
    console.error("[create-checkout] Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment link. Please try again." },
      { status: 500 }
    );
  }
}