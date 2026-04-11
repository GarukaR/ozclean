import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const services = [
  { code: '1 Bedroom Apartment/House Cleaning = 150 AUD', name: '1 Bedroom Apartment/House Cleaning', basePriceCents: 15000 },
  { code: '2 Bedroom Apartment/House Cleaning = 175 AUD', name: '2 Bedroom Apartment/House Cleaning', basePriceCents: 17500 },
  { code: '3 Bedroom Apartment/House Cleaning = 205 AUD', name: '3 Bedroom Apartment/House Cleaning', basePriceCents: 20500 },
  { code: '3 Bedroom Apartment/House Cleaning 2-Storey House = 220 AUD', name: '3 Bedroom Apartment/House Cleaning 2-Storey House', basePriceCents: 22000 },
  { code: '4 Bedroom Apartment/House Cleaning = 250 AUD', name: '4 Bedroom Apartment/House Cleaning', basePriceCents: 25000 },
  { code: '4 Bedroom Apartment/House Cleaning 2-Storey House = 280 AUD', name: '4 Bedroom Apartment/House Cleaning 2-Storey House', basePriceCents: 28000 },
  { code: 'Hourly Cleaning (One-off) = $60/hr', name: 'Hourly Cleaning (One-off)', basePriceCents: 6000 },
  { code: 'Hourly Cleaning (Weekly) = $50/hr', name: 'Hourly Cleaning (Weekly)', basePriceCents: 5000 },
  { code: 'Hourly Cleaning (Fortnightly) = $55/hr', name: 'Hourly Cleaning (Fortnightly)', basePriceCents: 5500 },
  { code: 'Hourly Cleaning (Monthly) = $55/hr', name: 'Hourly Cleaning (Monthly)', basePriceCents: 5500 },
  { code: 'Wheely Bin Cleaning = $35/bin', name: 'Wheely Bin Cleaning', basePriceCents: 3500 },
]

const addons = [
  { code: 'inside-oven', name: 'Inside oven', priceCents: 4500 },
  { code: 'inside-fridge', name: 'Inside fridge', priceCents: 3500 },
  { code: 'interior-windows', name: 'Interior windows', priceCents: 6000 },
  { code: 'exterior-windows', name: 'Exterior windows', priceCents: 8000 },
  { code: 'balcony-outdoor', name: 'Balcony / outdoor area', priceCents: 5000 },
  { code: 'garage', name: 'Garage', priceCents: 6500 },
  { code: 'flyscreen-cleaning', name: 'Flyscreen cleaning', priceCents: 4000 },
]

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { code: service.code },
      update: {
        name: service.name,
        basePriceCents: service.basePriceCents,
        isActive: true,
      },
      create: {
        code: service.code,
        name: service.name,
        basePriceCents: service.basePriceCents,
        isActive: true,
      },
    })
  }

  for (const addon of addons) {
    await prisma.addon.upsert({
      where: { code: addon.code },
      update: {
        name: addon.name,
        priceCents: addon.priceCents,
        isActive: true,
      },
      create: {
        code: addon.code,
        name: addon.name,
        priceCents: addon.priceCents,
        isActive: true,
      },
    })
  }

  console.log(`Seeded ${services.length} services and ${addons.length} addons.`)
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
