import { SquareClient, SquareEnvironment } from 'square'
import { randomUUID } from 'crypto'

if (!process.env.SQUARE_ACCESS_TOKEN) {
  throw new Error('SQUARE_ACCESS_TOKEN is missing')
}

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

export async function createPaymentLink(params: {
  bookingId: string
  totalCents: number
  depositCents: number
  customerName: string
  customerEmail: string
  service: string
  date: string
  time: string
}) {
  try {
    const result = await squareClient.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        referenceId: params.bookingId,
        lineItems: [
          {
            name: `SparkClean Deposit — ${params.service}`,
            quantity: '1',
            basePriceMoney: {
              amount: BigInt(params.depositCents),
              currency: 'AUD',
            },
            note: `Payment deposit for ${params.service} on ${params.date} at ${params.time}.`,
          },
        ],
        metadata: {
          bookingId: params.bookingId,
          customerName: params.customerName,
          customerEmail: params.customerEmail,
          totalCents: params.totalCents.toString(),
          depositCents: params.depositCents.toString(),
        },
      },
      checkoutOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?id=${params.bookingId}`,
        askForShippingAddress: false,
        merchantSupportEmail: process.env.OWNER_EMAIL,
      },
      prePopulatedData: {
        buyerEmail: params.customerEmail,
      },
    })

    return result.paymentLink?.url
  } catch (error) {
    console.error('Square payment link error:', error)
    throw error
  }
}