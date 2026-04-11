import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { prisma } from "@/lib/prisma";
import { sendBookingEmails } from "@/lib/resend";
import { env, isProduction } from "@/env";
import crypto from "crypto";

// ─── Clients ──────────────────────────────────────────────────────────────────
const publicUrl = env.NEXT_PUBLIC_URL;

if (!publicUrl) {
  throw new Error("NEXT_PUBLIC_URL is missing");
}

if (!env.SQUARE_ACCESS_TOKEN) {
  throw new Error("SQUARE_ACCESS_TOKEN is missing");
}

if (!env.SQUARE_WEBHOOK_SIGNATURE) {
  throw new Error("SQUARE_WEBHOOK_SIGNATURE is missing");
}

const squareWebhookSignature = env.SQUARE_WEBHOOK_SIGNATURE;

const square = new SquareClient({
  token: env.SQUARE_ACCESS_TOKEN,
  environment:
    isProduction
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

// ─── Verify Square webhook signature ─────────────────────────────────────────
function verifySquareSignature(
  body: string,
  signature: string,
  url: string
): boolean {
  if (!signature) {
    return false;
  }

  const hmac = crypto.createHmac(
    "sha256",
    squareWebhookSignature
  );
  hmac.update(url + body);
  const expected = hmac.digest("base64");
  const received = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (received.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(received, expectedBuffer);
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

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatAddress(booking: {
  addressLine1: string;
  addressLine2: string | null;
  suburb: string;
  state: string;
  postcode: string;
}): string {
  const addressParts = [
    booking.addressLine1,
    booking.addressLine2,
    `${booking.suburb}, ${booking.state} ${booking.postcode}`,
  ].filter(Boolean);

  return addressParts.join(", ");
}

type BookingAddonSnapshot = {
  code?: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
};

type ServiceSelectionSnapshot = {
  count: number;
  unitLabel: string;
  unitPriceCents: number;
  subtotalCents: number;
};

type BookingSnapshot = {
  serviceSelection?: ServiceSelectionSnapshot;
  addons: BookingAddonSnapshot[];
};

function parseBookingSnapshot(addons: unknown): BookingSnapshot {
  const parsedAddons: BookingAddonSnapshot[] = [];

  const pushAddon = (item: unknown) => {
    if (typeof item !== "object" || item === null) {
      return;
    }

    const maybeName = "name" in item ? item.name : undefined;
    const maybeCode = "code" in item ? item.code : undefined;

    const maybeUnitPriceCents =
      "unitPriceCents" in item
        ? item.unitPriceCents
        : "priceCents" in item
          ? item.priceCents
          : undefined;

    const maybeQuantity = "quantity" in item ? item.quantity : 1;
    const maybeLineTotalCents =
      "lineTotalCents" in item
        ? item.lineTotalCents
        : typeof maybeUnitPriceCents === "number" && typeof maybeQuantity === "number"
          ? maybeUnitPriceCents * maybeQuantity
          : undefined;

    if (
      typeof maybeName !== "string" ||
      typeof maybeUnitPriceCents !== "number" ||
      typeof maybeQuantity !== "number" ||
      typeof maybeLineTotalCents !== "number"
    ) {
      return;
    }

    parsedAddons.push({
      code: typeof maybeCode === "string" ? maybeCode : undefined,
      name: maybeName,
      unitPriceCents: maybeUnitPriceCents,
      quantity: maybeQuantity,
      lineTotalCents: maybeLineTotalCents,
    });
  };

  let serviceSelection: ServiceSelectionSnapshot | undefined;

  if (!Array.isArray(addons)) {
    if (typeof addons === "object" && addons !== null) {
      const maybeServiceSelection =
        "serviceSelection" in addons ? addons.serviceSelection : undefined;

      if (typeof maybeServiceSelection === "object" && maybeServiceSelection !== null) {
        const maybeQuantity =
          "count" in maybeServiceSelection
            ? maybeServiceSelection.count
            : "quantity" in maybeServiceSelection
              ? maybeServiceSelection.quantity
              : undefined;
        const maybeUnitLabel =
          "unitLabel" in maybeServiceSelection ? maybeServiceSelection.unitLabel : undefined;
        const maybeUnitPriceCents =
          "unitPriceCents" in maybeServiceSelection
            ? maybeServiceSelection.unitPriceCents
            : undefined;
        const maybeSubtotalCents =
          "subtotalCents" in maybeServiceSelection
            ? maybeServiceSelection.subtotalCents
            : undefined;

        if (
          typeof maybeQuantity === "number" &&
          typeof maybeUnitLabel === "string" &&
          typeof maybeUnitPriceCents === "number" &&
          typeof maybeSubtotalCents === "number"
        ) {
          serviceSelection = {
            count: maybeQuantity,
            unitLabel: maybeUnitLabel,
            unitPriceCents: maybeUnitPriceCents,
            subtotalCents: maybeSubtotalCents,
          };
        }
      }

      const maybeAddons = "addons" in addons ? addons.addons : undefined;
      if (Array.isArray(maybeAddons)) {
        maybeAddons.forEach(pushAddon);
      }
    }

    return {
      serviceSelection,
      addons: parsedAddons,
    };
  }

  addons.forEach(pushAddon);

  return {
    serviceSelection,
    addons: parsedAddons,
  };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-square-hmacsha256-signature") ?? "";
    const url = `${publicUrl}/api/webhook`;

    // Verify the webhook is genuinely from Square
    if (!verifySquareSignature(rawBody, signature, url)) {
      console.warn("[webhook] Invalid Square signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let event: unknown;
    try {
      event = JSON.parse(rawBody);
    } catch (error) {
      console.error("[webhook] Invalid JSON payload:", error);
      return NextResponse.json({ received: true, error: "Invalid payload" });
    }

    if (
      typeof event !== "object" ||
      event === null ||
      !("type" in event) ||
      !("data" in event)
    ) {
      return NextResponse.json({ received: true });
    }

    const eventType = (event as { type?: string }).type;
    if (eventType !== "payment.created" && eventType !== "payment.updated") {
      return NextResponse.json({ received: true });
    }

    const payment = (event as {
      data?: {
        object?: {
          payment?: {
            id?: string;
            status?: string;
            orderId?: string;
            order_id?: string;
            totalMoney?: { amount?: number | string };
            total_money?: { amount?: number | string };
            amountMoney?: { amount?: number | string };
            amount_money?: { amount?: number | string };
          };
        };
      };
    }).data?.object?.payment;

    if (!payment) {
      return NextResponse.json({ received: true });
    }

    if (payment.status !== "COMPLETED") {
      return NextResponse.json({ received: true });
    }

    const paymentId = payment.id;
    if (!paymentId) {
      console.error("[webhook] Missing payment id in event payload");
      return NextResponse.json({ received: true, error: "Missing paymentId" });
    }

    let orderId = payment.orderId ?? payment.order_id;
    let paidCents = Number(
      payment.totalMoney?.amount ??
        payment.total_money?.amount ??
        payment.amountMoney?.amount ??
        payment.amount_money?.amount ??
        0
    );

    // Some webhook payloads are sparse. Backfill critical fields from Payments API.
    if (!orderId || paidCents <= 0) {
      const paymentResult = await square.payments.get({ paymentId });
      const fullPayment = paymentResult.payment as
        | {
            orderId?: string;
            order_id?: string;
            totalMoney?: { amount?: number | string };
            total_money?: { amount?: number | string };
            amountMoney?: { amount?: number | string };
            amount_money?: { amount?: number | string };
          }
        | undefined;

      orderId = orderId ?? fullPayment?.orderId ?? fullPayment?.order_id;
      paidCents =
        paidCents > 0
          ? paidCents
          : Number(
              fullPayment?.totalMoney?.amount ??
                fullPayment?.total_money?.amount ??
                fullPayment?.amountMoney?.amount ??
                fullPayment?.amount_money?.amount ??
                0
            );
    }

    if (!orderId) {
      console.error("[webhook] Missing orderId on completed payment:", paymentId);
      return NextResponse.json({ received: true, error: "Missing orderId" });
    }

    const orderResult = await square.orders.get({ orderId });
    const order = orderResult.order;
    const meta = order?.metadata ?? {};
    const bookingId = meta.bookingId;

    if (!bookingId) {
      console.error("[webhook] Missing bookingId in Square metadata for payment:", payment.id);
      return NextResponse.json({ received: true, error: "Missing bookingId" });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      console.error("[webhook] Booking not found for bookingId:", bookingId);
      return NextResponse.json({ received: true, error: "Booking not found" });
    }

    if (booking.status === "CONFIRMED" || booking.paymentStatus === "PAID") {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const updateResult = await prisma.booking.updateMany({
      where: {
        id: bookingId,
        status: { not: "CONFIRMED" },
        paymentStatus: { not: "PAID" },
      },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        squarePaymentId: paymentId,
        totalPaidCents: paidCents,
        confirmedAt: new Date(),
      },
    });

    if (updateResult.count === 0) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const scheduledAt = booking.scheduledAt;
    const totalCents = booking.totalCents;
    const bookingPricingFields = booking as typeof booking & {
      serviceSubtotalCents?: number;
      serviceCount?: number;
      serviceCountUnit?: string;
    };
    const snapshot = parseBookingSnapshot(booking.addons);
    const addons = snapshot.addons;
    const serviceAmountCents =
      (bookingPricingFields.serviceSubtotalCents ?? 0) > 0
        ? (bookingPricingFields.serviceSubtotalCents ?? 0)
        : snapshot.serviceSelection?.subtotalCents ?? Math.max(totalCents - booking.addonsSubtotalCents, 0);
    const serviceCount =
      (bookingPricingFields.serviceCount ?? 0) > 0
        ? (bookingPricingFields.serviceCount ?? 1)
        : snapshot.serviceSelection?.count ?? 1;
    const serviceCountUnit =
      bookingPricingFields.serviceCountUnit || snapshot.serviceSelection?.unitLabel || "service";

    const emailProps = {
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      service: booking.service,
      date: formatDate(scheduledAt.toISOString()),
      time: formatTime(scheduledAt),
      address: formatAddress(booking),
      instructions: booking.instructions ?? "",
      paidAmount: formatMoney(paidCents),
      serviceAmount: formatMoney(serviceAmountCents),
      serviceCount,
      serviceCountUnit,
      addonsTotal: formatMoney(booking.addonsSubtotalCents),
      totalAmount: formatMoney(totalCents),
      addons: addons.map((addon) => ({
        name: addon.name,
        quantity: addon.quantity,
        unitPrice: formatMoney(addon.unitPriceCents),
        lineTotal: formatMoney(addon.lineTotalCents),
      })),
      bookingId: booking.bookingRef,
      squarePaymentId: paymentId,
    };

    // Keep webhook thin: all booking email rendering/sending is centralized in src/lib/resend.ts.
    await sendBookingEmails(emailProps);

    console.log(
      `[webhook] Booking ${bookingId} processed — emails sent to ${emailProps.customerEmail} and owner`
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[webhook] Error processing payment:", error);
    return NextResponse.json({ received: true, error: String(error) });
  }
}
