// Single source of truth for the business contact details shown to customers.
export const BUSINESS_PHONE = "+61 428 276 935";
export const BUSINESS_PHONE_HREF = "tel:+61428276935";
export const BUSINESS_EMAIL = "info@ozclean.au";
// Verified on ABN Lookup (abr.business.gov.au), sole trader, VIC 3976, not registered for GST.
export const BUSINESS_ABN = "49 595 600 465";
export const BUSINESS_EMAIL_HREF = `mailto:${BUSINESS_EMAIL}`;

// Opening hours — must match the Google Business Profile exactly.
export const BUSINESS_HOURS_SUMMARY = "Mon–Sat, 9am–5pm";
export const BUSINESS_HOURS = [
  { day: "Monday – Saturday", hours: "9:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Public Holidays", hours: "By appointment" },
];
export const BUSINESS_OPENING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const BUSINESS_OPENS = "09:00";
export const BUSINESS_CLOSES = "17:00";
