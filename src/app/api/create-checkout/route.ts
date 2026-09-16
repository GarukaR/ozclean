import { NextRequest, NextResponse } from "next/server";
import { createBookingAndPaymentLink } from "@/server/actions/booking";
import { prisma } from "@/lib/prisma";
import {
  isBookingTimeSlot,
  getScheduledAtForSlot,
  getTodayInBookingTimeZone,
} from "@/lib/booking-slots";
import { releaseExpiredPendingBookings } from "@/lib/booking-holds";
import { getClientIdentifier, rateLimit } from "@/lib/rate-limit";

type ServiceCountConfig = {
  unit: string;
  min: number;
  requireInteger: boolean;
};

function getServiceCountConfig(serviceRecord: {
  pricingUnit: string;
  minQuantity: number;
  allowDecimalQuantity: boolean;
}): ServiceCountConfig | null {
  const unit = serviceRecord.pricingUnit.trim().toLowerCase();

  if (unit === "service") {
    return null;
  }

  const unitLabelMap: Record<string, string> = {
    hour: "hours",
    hr: "hours",
    bin: "bins",
    service: "services",
  };

  const label = unitLabelMap[unit] ?? (unit.endsWith("s") ? unit : `${unit}s`);
  return {
    unit: label,
    min: serviceRecord.minQuantity,
    requireInteger: !serviceRecord.allowDecimalQuantity,
  };
}

// Each submission writes a booking row and calls Square, so cap how often one client can post.
const RATE_LIMIT = { limit: 10, windowMs: 10 * 60 * 1000 };

export async function POST(req: NextRequest) {
  try {
    const limit = rateLimit(`create-checkout:${getClientIdentifier(req)}`, RATE_LIMIT);

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many booking attempts. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

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
      serviceCount,
      serviceCountUnit,
      hours,
      binCount,
    } = body;

    // Validate required fields
    if (!name || !email || !service || !date || !time || !suburb || !state || !postcode) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
      return NextResponse.json({ error: "Please choose a valid booking date." }, { status: 400 });
    }

    if (!isBookingTimeSlot(String(time))) {
      return NextResponse.json(
        { error: "Please choose one of the available booking time slots." },
        { status: 400 }
      );
    }

    // Disallow same-day bookings: compare against the current date in the booking timezone
    const todaySydney = getTodayInBookingTimeZone();
    if (String(date) <= todaySydney) {
      return NextResponse.json({ error: 'Bookings must be made at least one day in advance.' }, { status: 400 });
    }

    const serviceCode = String(service);
    const serviceRecord = await prisma.service.findUnique({
      where: { code: serviceCode },
      select: {
        code: true,
        isActive: true,
        pricingUnit: true,
        minQuantity: true,
        allowDecimalQuantity: true,
      },
    });

    if (!serviceRecord || !serviceRecord.isActive) {
      return NextResponse.json({ error: "Selected service is unavailable." }, { status: 400 });
    }

    const scheduledAt = getScheduledAtForSlot(String(date), String(time));
    await releaseExpiredPendingBookings(prisma, scheduledAt);

    const existingBooking = await prisma.booking.findFirst({
      where: {
        scheduledAt,
        status: { not: "CANCELLED" },
      },
      select: { id: true },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "Selected time slot is no longer available. Please choose another time." },
        { status: 409 }
      );
    }

    const countConfig = getServiceCountConfig(serviceRecord);

    let normalizedServiceCount = 1;
    let normalizedServiceCountUnit = "service";

    if (countConfig) {
      const rawCount = serviceCount ?? hours ?? binCount;
      const parsedCount = Number(rawCount);

      if (!Number.isFinite(parsedCount) || parsedCount < countConfig.min) {
        return NextResponse.json(
          { error: `This service requires at least ${countConfig.min} ${countConfig.unit}.` },
          { status: 400 }
        );
      }

      if (countConfig.requireInteger && !Number.isInteger(parsedCount)) {
        return NextResponse.json(
          { error: `This service requires a whole-number count of ${countConfig.unit}.` },
          { status: 400 }
        );
      }

      normalizedServiceCount = parsedCount;
      normalizedServiceCountUnit = countConfig.unit;
    }

    // Call server action
    const result = await createBookingAndPaymentLink({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceCode,
      scheduledAt: `${date}T${time}`,
      addressLine1: address,
      addressLine2,
      suburb,
      state,
      postcode,
      instructions,
      addonIds: Array.isArray(addOns) ? addOns : [],
      serviceCount: normalizedServiceCount,
      serviceCountUnit: (serviceCountUnit as string) || normalizedServiceCountUnit,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create booking" },
        { status: result.conflict ? 409 : 400 }
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