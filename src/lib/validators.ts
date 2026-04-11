import { prisma } from './prisma'

export async function validateBookingPrice(params: {
  serviceCode: string
  addonIds: string[]
  serviceCount?: number
}): Promise<{ basePrice: number; serviceCount: number; serviceSubtotal: number; addonsTotal: number; total: number }> {
  // Get service from DB
  const service = await prisma.service.findUnique({
    where: { code: params.serviceCode },
  })

  if (!service || !service.isActive) {
    throw new Error('Invalid or inactive service')
  }

  const serviceCount = params.serviceCount ?? 1
  if (!Number.isFinite(serviceCount) || serviceCount <= 0) {
    throw new Error('Invalid service count')
  }

  // Get add-ons from DB
  const addons = await prisma.addon.findMany({
    where: {
      code: { in: params.addonIds },
      isActive: true,
    },
  })

  if (addons.length !== params.addonIds.length) {
    throw new Error('One or more add-ons are invalid or inactive')
  }

  const basePrice = service.basePriceCents
  const serviceSubtotal = Math.round(basePrice * serviceCount)
  const addonsTotal = addons.reduce((sum: number, addon: { priceCents: number }) => sum + addon.priceCents, 0)
  const total = serviceSubtotal + addonsTotal

  return { basePrice, serviceCount, serviceSubtotal, addonsTotal, total }
}