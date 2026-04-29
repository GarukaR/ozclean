import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { BOOKING_TIME_SLOTS, getScheduledAtForSlot } from "@/lib/booking-slots";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Please provide a valid booking date." }, { status: 400 });
  }

  try {
    const requestedSlots = BOOKING_TIME_SLOTS.map((slot) => ({
      ...slot,
      scheduledAt: getScheduledAtForSlot(date, slot.value),
    }));

    const bookedSlots = await prisma.booking.findMany({
      where: {
        scheduledAt: {
          in: requestedSlots.map((slot) => slot.scheduledAt),
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        scheduledAt: true,
      },
    });

    const bookedTimestamps = new Set(bookedSlots.map((booking) => booking.scheduledAt.getTime()));

    const availability = requestedSlots.map((slot) => ({
      label: slot.label,
      value: slot.value,
      available: !bookedTimestamps.has(slot.scheduledAt.getTime()),
    }));

    return NextResponse.json({
      date,
      availability,
      fullyBooked: availability.every((slot) => !slot.available),
    });
  } catch (error) {
    console.error("[booking-availability] Failed to load availability:", error);
    return NextResponse.json({ error: "Failed to load availability." }, { status: 500 });
  }
}