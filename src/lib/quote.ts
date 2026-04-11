import { z } from "zod"

export const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(3, "Please enter your address or suburb"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please give us a bit more detail (min 10 characters)"),
})

export type QuoteFormData = z.infer<typeof quoteSchema>