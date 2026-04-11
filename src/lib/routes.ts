export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  SERVICES: "/services",
  QUOTE: "/quote",
  BOOKING: "/booking",
  BOOKING_SUCCESS: "/booking/success",
} as const;

export function bookingWithService(service: string): string {
  return `${ROUTES.BOOKING}?service=${encodeURIComponent(service)}`;
}