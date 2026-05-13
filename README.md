This is a [Next.js](https://nextjs.org) project for OzClean.

Open [https://www.ozclean.au/) in your browser.

1. Create a Neon project and copy the pooled connection string into `DATABASE_URL`.
2. Copy the direct connection string into `DIRECT_URL`.
3. Deploy this repo to Vercel from GitHub.
4. Add the environment variables from `.env.example` in the Vercel project settings.
5. Set `NEXT_PUBLIC_URL` to your Vercel production URL, for example `https://your-app.vercel.app`.
6. Run Prisma migrations after deployment with:
```bash
npx prisma migrate deploy
```
7. Configure Square webhooks to point to `https://your-app.vercel.app/api/webhook`.
   

## Security

- If any live secrets have been exposed, rotate them before publishing staging or production.
See [SECURITY.md](SECURITY.md) for the secret rotation order and verification checklist.

## Square Setup

1. Go to the Square Developer Dashboard and create an app.
2. Copy the sandbox access token for local testing or the production access token for live traffic into `SQUARE_ACCESS_TOKEN`.
3. Open Locations in Square and copy the location ID into `SQUARE_LOCATION_ID`.
4. Create a webhook subscription for the app and copy the webhook signature key into `SQUARE_WEBHOOK_SIGNATURE`.
5. Set the webhook URL to `${NEXT_PUBLIC_URL}/api/webhook` and subscribe to payment events.

## Environment Variables

Copy `.env.example` to `.env.local` for local development and fill in:

## Notes

- The booking flow charges full payment through Square and sends confirmation after webhook verification.
- If you change a service slug or booking option label, keep `src/components/Services.tsx`, `src/app/services/page.tsx`, and `src/lib/services.ts` in sync.
- For staging on Vercel, use `NEXT_PUBLIC_URL` with the Vercel domain and keep `DATABASE_URL`/`DIRECT_URL` pointed at Neon.

## Booking and Email Flow

Canonical rule: booking emails are rendered and sent only from `src/lib/resend.ts` via `sendBookingEmails(payload)`. The webhook should not send emails directly(Separation of Concerns).

### Bookings Workflow 

1. Customer submits booking form in `src/app/booking/BookingForm.tsx`.
2. Form calls `GET /api/bookings/availability` when a date is selected so booked slots can be hidden immediately.
3. Form calls `POST /api/create-checkout` in `src/app/api/create-checkout/route.ts`.
4. Server action `createBookingAndPaymentLink` in `src/server/actions/booking.ts` validates price, checks slot availability again, creates DB booking, and requests Square payment link.
5. Square payment link is created in `src/lib/square.ts` with booking metadata.
6. Square redirects customer to success page after payment.
7. Square webhook posts to `src/app/api/webhook/route.ts`.
8. Webhook verifies signature, confirms booking payment state, builds email payload, and calls `sendBookingEmails`.
9. `src/lib/resend.ts` renders `src/emails/BookingConfirmation.tsx` and `src/emails/BookingNotification.tsx`, then sends both via Resend.

```
