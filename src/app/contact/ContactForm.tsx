"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Phone, Mail, MessageSquare, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please give us a bit more detail"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FieldWrapper({ label, icon: Icon, error, children }: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-brand-text flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-brand-muted" />
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-5">
      <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-brand" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-brand-text">Message Sent!</h3>
        <p className="text-brand-muted text-sm mt-1 max-w-xs">
          Thanks for reaching out. We&apos;ll get back to you within 2 hours.
        </p>
      </div>
      <Button asChild className="bg-brand hover:bg-brand-dark text-white">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Contact form submitted:", data);
    setSubmitted(true);
  };

  if (submitted) return <SuccessState />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-5">
      <div>
        <p className="font-bold text-brand-text text-lg mb-1">Send us a message</p>
        <p className="text-brand-muted text-sm">Fill in the form and we&apos;ll get back to you within 2 hours.</p>
      </div>
      <div className="h-px bg-brand-border" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper label="Full Name" icon={User} error={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder="Jane Smith"
            className="border-brand-border focus:border-brand"
          />
        </FieldWrapper>
        <FieldWrapper label="Email Address" icon={Mail} error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="jane@email.com"
            className="border-brand-border focus:border-brand"
          />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Phone (optional)" icon={Phone} error={errors.phone?.message}>
        <Input
          {...register("phone")}
          type="tel"
          placeholder="+61 4XX XXX XXX"
          className="border-brand-border focus:border-brand"
        />
      </FieldWrapper>
      <FieldWrapper label="Your Message" icon={MessageSquare} error={errors.message?.message}>
        <Textarea
          {...register("message")}
          placeholder="How can we help? Tell us about your cleaning needs, ask a question, or just say hello..."
          rows={5}
          className="border-brand-border focus:border-brand resize-none"
        />
      </FieldWrapper>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand hover:bg-brand-dark text-white font-semibold h-12 text-base shadow-md shadow-brand/20"
      >
        {isSubmitting ? "Sending..." : "Send Message →"}
      </Button>
    </form>
  );
}
