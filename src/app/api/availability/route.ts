import { NextResponse } from "next/server";

export async function GET() {
	try {
		return NextResponse.json(
			{
				success: true,
				data: [],
				message: "Availability endpoint is ready.",
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{
				success: false,
				message: "Internal server error.",
			},
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		return NextResponse.json(
			{
				success: true,
				received: body,
				message: "Availability request received.",
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid request body.",
			},
			{ status: 400 }
		);
	}
}
