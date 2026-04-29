import test from "node:test";
import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const baseUrl = process.env.BOOKING_TEST_BASE_URL ?? "http://localhost:3000";

async function getJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();
  return { response, body };
}

async function postJson(path, payload) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  return { response, body };
}

test.after(async () => {
  await prisma.$disconnect();
});

test("catalog APIs return active services and add-ons", async () => {
  const [servicesResult, addonsResult] = await Promise.all([
    getJson("/api/services"),
    getJson("/api/addons"),
  ]);

  assert.equal(servicesResult.response.ok, true);
  assert.equal(addonsResult.response.ok, true);
  assert.ok(Array.isArray(servicesResult.body.services));
  assert.ok(Array.isArray(addonsResult.body.addons));
  assert.ok(servicesResult.body.services.length > 0);
  assert.ok(addonsResult.body.addons.length > 0);
}
);

test("flat-rate checkout total matches DB pricing", async () => {
  const service = await prisma.service.findUnique({
    where: { code: "1 Bedroom Apartment/House Cleaning = 150 AUD" },
  });
  const addon = await prisma.addon.findUnique({
    where: { code: "inside-oven" },
  });

  assert.ok(service);
  assert.ok(addon);

  const expectedTotal = service.basePriceCents + addon.priceCents;
  const email = `flat.test.${Date.now()}@gmail.com`;
  const date = "2098-04-25";
  let bookingId;

  try {
    const submitResult = await postJson("/api/create-checkout", {
      name: "Flat Test",
      email,
      phone: "0412345678",
      address: "100 Swan St",
      suburb: "Richmond",
      state: "VIC",
      postcode: "3121",
      service: service.code,
      addOns: [addon.code],
      date,
      time: "09:00",
      instructions: "Flat booking integrity test",
    });

    assert.equal(submitResult.response.ok, true);
    assert.equal(typeof submitResult.body.bookingId, "string");
    assert.equal(typeof submitResult.body.bookingRef, "string");

    bookingId = submitResult.body.bookingId;

    const booking = await prisma.booking.findUnique({
      where: { id: submitResult.body.bookingId },
    });

    assert.ok(booking);
    assert.equal(booking.totalCents, expectedTotal);
    assert.equal(booking.serviceSubtotalCents, service.basePriceCents);
    assert.equal(booking.addonsSubtotalCents, addon.priceCents);
    assert.equal(booking.serviceCount, 1);
    assert.equal(booking.serviceCountUnit, "service");
  } finally {
    if (bookingId) {
      await prisma.booking.delete({ where: { id: bookingId } });
    }
  }
});

test("hourly checkout accepts decimals and rejects undersized bookings", async () => {
  const service = await prisma.service.findUnique({
    where: { code: "Hourly Cleaning (Weekly) = $50/hr" },
  });
  const addon = await prisma.addon.findUnique({
    where: { code: "inside-fridge" },
  });

  assert.ok(service);
  assert.ok(addon);

  const decimalCount = 2.5;
  const expectedServiceSubtotal = Math.round(service.basePriceCents * decimalCount);
  const email = `hourly.test.${Date.now()}@gmail.com`;
  const validDate = "2098-04-26";
  let hourlyBookingId;

  try {
    const validResult = await postJson("/api/create-checkout", {
      name: "Hourly Test",
      email,
      phone: "0412345678",
      address: "200 Bridge Rd",
      suburb: "Richmond",
      state: "VIC",
      postcode: "3121",
      service: service.code,
      addOns: [addon.code],
      serviceCount: String(decimalCount),
      serviceCountUnit: "hours",
      date: validDate,
      time: "12:00",
      instructions: "Hourly booking integrity test",
    });

    assert.equal(validResult.response.ok, true);
    hourlyBookingId = validResult.body.bookingId;

    const hourlyBooking = await prisma.booking.findUnique({
      where: { id: validResult.body.bookingId },
    });

    assert.ok(hourlyBooking);
    assert.equal(hourlyBooking.serviceSubtotalCents, expectedServiceSubtotal);
    assert.equal(hourlyBooking.addonsSubtotalCents, addon.priceCents);
    assert.equal(hourlyBooking.totalCents, expectedServiceSubtotal + addon.priceCents);
    assert.equal(hourlyBooking.serviceCountUnit, "hours");

    const invalidResult = await postJson("/api/create-checkout", {
      name: "Hourly Invalid Test",
      email: `hourly.invalid.${Date.now()}@gmail.com`,
      phone: "0412345678",
      address: "300 Church St",
      suburb: "Richmond",
      state: "VIC",
      postcode: "3121",
      service: service.code,
      addOns: [],
      serviceCount: "1",
      serviceCountUnit: "hours",
      date: validDate,
      time: "15:00",
      instructions: "Hourly invalid integrity test",
    });

    assert.equal(invalidResult.response.ok, false);
    assert.match(invalidResult.body.error, /at least 2 hours/i);
  } finally {
    if (hourlyBookingId) {
      await prisma.booking.delete({ where: { id: hourlyBookingId } });
    }
  }
});

test("booking availability hides occupied slots and rejects duplicates", async () => {
  const service = await prisma.service.findUnique({
    where: { code: "1 Bedroom Apartment/House Cleaning = 150 AUD" },
  });

  assert.ok(service);

  const date = "2099-05-15";
  const slot = "12:00";
  let createdBookingId;

  try {
    const availabilityBefore = await getJson(`/api/bookings/availability?date=${date}`);
    assert.equal(availabilityBefore.response.ok, true);
    assert.equal(availabilityBefore.body.date, date);
    assert.equal(
      availabilityBefore.body.availability.find((item) => item.value === slot)?.available,
      true
    );

    const firstBooking = await postJson("/api/create-checkout", {
      name: "Availability Test",
      email: `availability.test.${Date.now()}@gmail.com`,
      phone: "0412345678",
      address: "400 Collins St",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      service: service.code,
      addOns: [],
      date,
      time: slot,
      instructions: "Availability integrity test",
    });

    assert.equal(firstBooking.response.ok, true);
    createdBookingId = firstBooking.body.bookingId;

    const availabilityAfter = await getJson(`/api/bookings/availability?date=${date}`);
    assert.equal(availabilityAfter.response.ok, true);
    assert.equal(
      availabilityAfter.body.availability.find((item) => item.value === slot)?.available,
      false
    );

    const duplicateBooking = await postJson("/api/create-checkout", {
      name: "Availability Duplicate Test",
      email: `availability.duplicate.${Date.now()}@gmail.com`,
      phone: "0412345678",
      address: "401 Collins St",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      service: service.code,
      addOns: [],
      date,
      time: slot,
      instructions: "Duplicate slot test",
    });

    assert.equal(duplicateBooking.response.ok, false);
    assert.match(duplicateBooking.body.error, /no longer available/i);
  } finally {
    if (createdBookingId) {
      await prisma.booking.delete({ where: { id: createdBookingId } });
    }
  }
});