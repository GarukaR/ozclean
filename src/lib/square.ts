import { SquareClient, SquareEnvironment, Currency } from 'square'
import { randomUUID } from 'crypto'
import { env, isProduction } from '@/env'

if (!env.SQUARE_ACCESS_TOKEN) {
  throw new Error('SQUARE_ACCESS_TOKEN is missing')
}

if (!env.SQUARE_LOCATION_ID) {
  throw new Error('SQUARE_LOCATION_ID is missing')
}

const squareLocationId = env.SQUARE_LOCATION_ID

export const squareClient = new SquareClient({
  token: env.SQUARE_ACCESS_TOKEN,
  environment:
    isProduction
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

export async function createPaymentLink(params: {
  bookingId: string
  totalCents: number
  customerName: string
  customerEmail: string
  service: string
  serviceCount: number
  serviceCountUnit: string
  serviceUnitPriceCents: number
  addons: Array<{
    name: string
    priceCents: number
  }>
  date: string
  time: string
}) {
  try {
    const publicUrl = env.NEXT_PUBLIC_URL

    if (!publicUrl) {
      throw new Error('NEXT_PUBLIC_URL is missing')
    }

    const hasFractionalCount = !Number.isInteger(params.serviceCount)
    const serviceQuantity = hasFractionalCount ? '1' : params.serviceCount.toString()
    const serviceUnitPriceCents = hasFractionalCount
      ? Math.round(params.serviceUnitPriceCents * params.serviceCount)
      : params.serviceUnitPriceCents

    const serviceLineItem = {
      name: `SparkClean payment — ${params.service}`,
      quantity: serviceQuantity,
      basePriceMoney: {
        amount: BigInt(serviceUnitPriceCents),
        currency: Currency.Aud,
      },
      note: hasFractionalCount
        ? `Service subtotal for ${params.serviceCount} ${params.serviceCountUnit} on ${params.date} at ${params.time}.`
        : `Service booked for ${params.serviceCount} ${params.serviceCountUnit} on ${params.date} at ${params.time}.`,
    }

    const addonLineItems = params.addons.map((addon) => ({
      name: addon.name,
      quantity: '1',
      basePriceMoney: {
        amount: BigInt(addon.priceCents),
        currency: Currency.Aud,
      },
      note: `Add-on for ${params.service}.`,
    }))

    const result = await squareClient.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: squareLocationId,
        referenceId: params.bookingId,
        lineItems: [serviceLineItem, ...addonLineItems],
        metadata: {
          bookingId: params.bookingId,
          customerName: params.customerName,
          customerEmail: params.customerEmail,
          totalCents: params.totalCents.toString(),
        },
      },
      checkoutOptions: {
        redirectUrl: `${publicUrl}/booking/success?id=${params.bookingId}`,
        askForShippingAddress: false,
        merchantSupportEmail: env.OWNER_EMAIL ?? env.BOOKING_NOTIFICATION_EMAIL,
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