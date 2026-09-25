"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { contactSchema, type ContactFormData } from "@/lib/contact";
import { FormAlert, FormField, SuccessPanel, TextArea, TextInput, primarySubmitClass } from "@/components/form/FormKit";

// Payload unchanged: { name, email, phone?, message } posted to /api/contact.

// One-tap starters for the message box (the most common reasons people write).
const TOPICS = ["A quick question", "Booking help", "Business / commercial enquiry", "Feedback"];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { message: "" },
  });

  const message = useWatch({ control, name: "message" }) ?? "";

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setSubmitError(body?.error ?? "Failed to submit contact message. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessPanel
        title="Message sent!"
        message="Thanks for reaching out. We'll get back to you within 2 hours."
        actions={[{ label: "Back to Home", href: ROUTES.HOME, primary: true }]}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 flex flex-col gap-5" noValidate>
      <div>
        <h2 className="text-xl font-bold text-brand-text">Send us a message</h2>
        <p className="text-brand-muted text-sm mt-1">We reply within 2 business hours.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Full name" htmlFor="contact-name" error={errors.name?.message}>
          <TextInput id="contact-name" icon={User} autoComplete="name" placeholder="First and last name" invalid={!!errors.name} {...register("name")} />
        </FormField>
        <FormField label="Email" htmlFor="contact-email" error={errors.email?.message}>
          <TextInput id="contact-email" icon={Mail} type="email" inputMode="email" autoComplete="email" placeholder="So we can reply" invalid={!!errors.email} {...register("email")} />
        </FormField>
      </div>
      <FormField label="Phone" optional htmlFor="contact-phone" error={errors.phone?.message} hint="Add it if you'd like a call back.">
        <TextInput id="contact-phone" icon={Phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="04XX XXX XXX" invalid={!!errors.phone} {...register("phone")} />
      </FormField>

      <FormField label="Your message" htmlFor="contact-message" error={errors.message?.message}>
        {!message && (
          <div className="flex flex-wrap gap-1.5 mb-1">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setValue("message", `${topic}: `)}
                className="rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        )}
        <TextArea
          id="contact-message"
          {...register("message")}
          invalid={!!errors.message}
          rows={5}
          placeholder="Your question or what you need cleaned"
        />
      </FormField>

      {submitError && <FormAlert>{submitError}</FormAlert>}

      <Button type="submit" disabled={isSubmitting} className={primarySubmitClass}>
        {isSubmitting ? "Sending..." : <>Send message <ArrowRight className="w-4 h-4" /></>}
      </Button>
    </form>
  );
}
