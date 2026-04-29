import { zonedTimeToUtc } from 'date-fns-tz'

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
  return zonedTimeToUtc(localIso, 'Australia/Sydney');
}