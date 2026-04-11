import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: {
        id: true,
        code: true,
        name: true,
        basePriceCents: true,
        isActive: true,
      },
      orderBy: { basePriceCents: "asc" },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("[api/services] Failed to load services:", error);
    return NextResponse.json({ error: "Failed to load services" }, { status: 500 });
  }
}