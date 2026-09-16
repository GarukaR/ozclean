import { fromZonedTime, formatInTimeZone } from 'date-fns-tz'

export const BOOKING_TIME_ZONE = 'Australia/Sydney';

export const BOOKING_TIME_SLOTS = [
  { label: "9:00 AM – 11:30 AM", value: "09:00" },
  { label: "12:00 PM – 2:30 PM", value: "12:00" },
  { label: "3:00 PM – 5:30 PM", value: "15:00" },
] as const;

export type BookingTimeSlot = (typeof BOOKING_TIME_SLOTS)[number];

export function isBookingTimeSlot(value: string): value is BookingTimeSlot["value"] {
  return BOOKING_TIME_SLOTS.some((slot) => slot.value === value);
}

export function getScheduledAtForSlot(date: string, time: string): Date {
  // Interpret the provided local date and slot time in Australia/Sydney timezone
  // and convert it to a UTC Date for consistent storage and comparisons.
  const localIso = `${date}T${time}:00`;
  return fromZonedTime(localIso, BOOKING_TIME_ZONE);
}

// Bookings are stored in UTC, so every customer-facing date/time must be rendered back in the
// booking timezone. Formatting with the server's local zone shifts a 9:00 AM Sydney slot to the
// previous day on a UTC host.
export function formatBookingDate(scheduledAt: Date): string {
  return formatInTimeZone(scheduledAt, BOOKING_TIME_ZONE, 'EEEE, d MMMM yyyy');
}

export function formatBookingTime(scheduledAt: Date): string {
  const slotValue = formatInTimeZone(scheduledAt, BOOKING_TIME_ZONE, 'HH:mm');
  const slot = BOOKING_TIME_SLOTS.find((candidate) => candidate.value === slotValue);
  return slot ? slot.label : formatInTimeZone(scheduledAt, BOOKING_TIME_ZONE, 'h:mm a');
}

export function getTodayInBookingTimeZone(now: Date = new Date()): string {
  return formatInTimeZone(now, BOOKING_TIME_ZONE, 'yyyy-MM-dd');
}

/**
 * Earliest date a customer may book (same-day bookings are not accepted). Computed in the booking
 * timezone so the date input cannot offer a date the server will reject.
 */
export function getMinimumBookingDate(now: Date = new Date()): string {
  const today = getTodayInBookingTimeZone(now);
  const tomorrow = new Date(`${today}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}
