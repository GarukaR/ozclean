import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const addons = await prisma.addon.findMany({
      where: { isActive: true },
      select: {
        id: true,
        code: true,
        name: true,
        priceCents: true,
        isActive: true,
      },
      orderBy: { priceCents: "asc" },
    });

    return NextResponse.json({ addons });
  } catch (error) {
    console.error("[api/addons] Failed to load add-ons:", error);
    return NextResponse.json({ error: "Failed to load add-ons" }, { status: 500 });
  }
}