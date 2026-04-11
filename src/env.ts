import { z } from "zod"

const RawEnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).optional(),
	DATABASE_URL: z.string().optional(),
	DIRECT_URL: z.string().optional(),
	NEXT_PUBLIC_URL: z.string().optional(),
	SQUARE_ACCESS_TOKEN: z.string().optional(),
	SQUARE_LOCATION_ID: z.string().optional(),
	SQUARE_WEBHOOK_SIGNATURE: z.string().optional(),
	RESEND_API_KEY: z.string().optional(),
	RESEND_FROM: z.string().optional(),
	RESEND_FROM_CUSTOMER: z.string().optional(),
	RESEND_FROM_OWNER: z.string().optional(),
	RESEND_DEV_TO: z.string().optional(),
	BOOKING_NOTIFICATION_EMAIL: z.string().optional(),
	OWNER_EMAIL: z.string().optional(),
})

const rawEnv = RawEnvSchema.parse(process.env)

function clean(value: string | undefined): string | undefined {
	const trimmed = value?.trim()
	return trimmed ? trimmed : undefined
}

function ensureHttpsPublicUrl(urlValue: string): void {
	const parsedUrl = new URL(urlValue)
	if (parsedUrl.protocol !== "https:") {
		throw new Error("NEXT_PUBLIC_URL must use https in production")
	}
}

export const env = {
	NODE_ENV: rawEnv.NODE_ENV ?? "development",
	DATABASE_URL: clean(rawEnv.DATABASE_URL),
	DIRECT_URL: clean(rawEnv.DIRECT_URL),
	NEXT_PUBLIC_URL: clean(rawEnv.NEXT_PUBLIC_URL),
	SQUARE_ACCESS_TOKEN: clean(rawEnv.SQUARE_ACCESS_TOKEN),
	SQUARE_LOCATION_ID: clean(rawEnv.SQUARE_LOCATION_ID),
	SQUARE_WEBHOOK_SIGNATURE: clean(rawEnv.SQUARE_WEBHOOK_SIGNATURE),
	RESEND_API_KEY: clean(rawEnv.RESEND_API_KEY),
	RESEND_FROM: clean(rawEnv.RESEND_FROM),
	RESEND_FROM_CUSTOMER: clean(rawEnv.RESEND_FROM_CUSTOMER),
	RESEND_FROM_OWNER: clean(rawEnv.RESEND_FROM_OWNER),
	RESEND_DEV_TO: clean(rawEnv.RESEND_DEV_TO),
	BOOKING_NOTIFICATION_EMAIL: clean(rawEnv.BOOKING_NOTIFICATION_EMAIL),
	OWNER_EMAIL: clean(rawEnv.OWNER_EMAIL),
} as const

export const isProduction = env.NODE_ENV === "production"

if (isProduction) {
	const missing: string[] = []

	if (!env.DATABASE_URL) missing.push("DATABASE_URL")
	if (!env.DIRECT_URL) missing.push("DIRECT_URL")
	if (!env.NEXT_PUBLIC_URL) missing.push("NEXT_PUBLIC_URL")
	if (!env.SQUARE_ACCESS_TOKEN) missing.push("SQUARE_ACCESS_TOKEN")
	if (!env.SQUARE_LOCATION_ID) missing.push("SQUARE_LOCATION_ID")
	if (!env.SQUARE_WEBHOOK_SIGNATURE) missing.push("SQUARE_WEBHOOK_SIGNATURE")
	if (!env.RESEND_API_KEY) missing.push("RESEND_API_KEY")

	const hasSharedSender = Boolean(env.RESEND_FROM)
	const hasSplitSenders = Boolean(env.RESEND_FROM_CUSTOMER && env.RESEND_FROM_OWNER)
	if (!hasSharedSender && !hasSplitSenders) {
		missing.push("RESEND_FROM (or RESEND_FROM_CUSTOMER and RESEND_FROM_OWNER)")
	}

	if (!env.BOOKING_NOTIFICATION_EMAIL && !env.OWNER_EMAIL) {
		missing.push("BOOKING_NOTIFICATION_EMAIL (or OWNER_EMAIL)")
	}

	if (missing.length > 0) {
		throw new Error(`[env] Missing required environment variable(s): ${missing.join(", ")}`)
	}

	try {
		ensureHttpsPublicUrl(env.NEXT_PUBLIC_URL!)
	} catch (error) {
		throw new Error(`[env] NEXT_PUBLIC_URL must be a valid public URL in production. ${String(error)}`)
	}
}
