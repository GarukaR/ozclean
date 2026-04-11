This is a [Next.js](https://nextjs.org) project for SparkClean.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment Setup

1. Deploy this app on your preferred host.
2. Set `NEXT_PUBLIC_URL` to your public app URL.
3. Set `DATABASE_URL` and `DIRECT_URL` to your Postgres connection strings.

## Square Setup

1. Go to the Square Developer Dashboard and create an app.
2. Copy the sandbox access token for local testing or the production access token for live traffic into `SQUARE_ACCESS_TOKEN`.
3. Open Locations in Square and copy the location ID into `SQUARE_LOCATION_ID`.
4. Create a webhook subscription for the app and copy the webhook signature key into `SQUARE_WEBHOOK_SIGNATURE`.
5. Set the webhook URL to `${NEXT_PUBLIC_URL}/api/webhook` and subscribe to payment events.

## Resend Setup

1. Create a Resend API key and place it in `RESEND_API_KEY`.
2. Verify your sending domain in Resend before going live.
3. Set `RESEND_FROM` (or `RESEND_FROM_CUSTOMER` and `RESEND_FROM_OWNER`) to a sender on your verified domain.
4. Set `BOOKING_NOTIFICATION_EMAIL` (or `OWNER_EMAIL`) to the inbox that should receive booking alerts.
5. For local testing, optionally set `RESEND_DEV_TO` to force all outgoing emails to your own inbox.

## Environment Variables

Copy `.env.example` to `.env.local` for local development and fill in:

- `SQUARE_ACCESS_TOKEN`
- `SQUARE_LOCATION_ID`
- `SQUARE_WEBHOOK_SIGNATURE`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_FROM_CUSTOMER`
- `RESEND_FROM_OWNER`
- `RESEND_DEV_TO`
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_URL`
- `BOOKING_NOTIFICATION_EMAIL`
- `OWNER_EMAIL`

## Notes

- The booking flow charges full payment through Square and sends confirmation after webhook verification.
- If you change a service slug or booking option label, keep `src/components/Services.tsx`, `src/app/services/page.tsx`, and `src/lib/services.ts` in sync.

## Booking and Email Flow

Canonical rule: booking emails are rendered and sent only from `src/lib/resend.ts` via `sendBookingEmails(payload)`. The webhook should not send emails directly.

### Request Lifecycle

1. Customer submits booking form in `src/app/booking/BookingForm.tsx`.
2. Form calls `POST /api/create-checkout` in `src/app/api/create-checkout/route.ts`.
3. Server action `createBookingAndPaymentLink` in `src/server/actions/booking.ts` validates price, creates DB booking, and requests Square payment link.
4. Square payment link is created in `src/lib/square.ts` with booking metadata.
5. Square redirects customer to success page after payment.
6. Square webhook posts to `src/app/api/webhook/route.ts`.
7. Webhook verifies signature, confirms booking payment state, builds email payload, and calls `sendBookingEmails`.
8. `src/lib/resend.ts` renders `src/emails/BookingConfirmation.tsx` and `src/emails/BookingNotification.tsx`, then sends both via Resend.

### Mermaid Diagram

```mermaid
flowchart TD
	A[BookingForm.tsx] --> B[/api/create-checkout]
	B --> C[createBookingAndPaymentLink]
	C --> D[(Postgres Booking: PENDING_PAYMENT)]
	C --> E[createPaymentLink in square.ts]
	E --> F[Square Hosted Checkout]
	F --> G[/booking/success]
	F --> H[/api/webhook]
	H --> I[Verify signature + load booking]
	I --> J[(Update Booking: CONFIRMED and PAID)]
	I --> K[sendBookingEmails in lib/resend.ts]
	K --> L[BookingConfirmation email]
	K --> M[BookingNotification email]
	L --> N[Customer Inbox]
	M --> O[Owner Inbox]
```
