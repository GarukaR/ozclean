import { NextRequest, NextResponse } from "next/server";
import { createBookingAndPaymentLink } from "@/server/actions/booking";
import { prisma } from "@/lib/prisma";
import { isBookingTimeSlot, getScheduledAtForSlot } from "@/lib/booking-slots";
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

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

    // Disallow same-day bookings: compute current date in Australia/Sydney timezone
    const nowSydney = toZonedTime(new Date(), 'Australia/Sydney');
    const todaySydney = format(nowSydney, 'yyyy-MM-dd');
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