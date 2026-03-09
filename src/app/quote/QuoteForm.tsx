"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CheckCircle2, User, Mail, Phone, MapPin, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(3, "Please enter your address or suburb"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please give us a bit more detail (min 10 characters)"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const SERVICES = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Move In / Move Out",
  "Window Cleaning",
  "Not sure — need advice",
];

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
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-6">
      <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-brand" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-brand-text">Quote Request Received!</h2>
        <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
          Thanks for reaching out! We&apos;ll review your details and send a
          personalised quote to your email within 2 hours.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button asChild className="bg-brand hover:bg-brand-dark text-white">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-brand-border">
          <Link href="/book">Book Directly Instead</Link>
        </Button>
      </div>
    </div>
  );
}

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Quote submitted:", data);
    setSubmitted(true);
  };

  if (submitted) return <SuccessState />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6">

      {/* Personal details */}
      <div>
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest mb-4">
          Your Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper label="Full Name" icon={User} error={errors.name?.message}>
            <Input
              {...register("name")}
              placeholder="Jane Smith"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper label="Email Address" icon={Mail} error={errors.email?.message}>
            <Input
              {...register("email")}
              type="email"
              placeholder="jane@email.com"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper label="Phone Number" icon={Phone} error={errors.phone?.message}>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="+61 4XX XXX XXX"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper label="Address / Suburb" icon={MapPin} error={errors.address?.message}>
            <Input
              {...register("address")}
              placeholder="Richmond, VIC"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
        </div>
      </div>

      <div className="h-px bg-brand-border" />

      {/* Service & message */}
      <div>
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest mb-4">
          Service Details
        </p>
        <div className="flex flex-col gap-4">
          <FieldWrapper label="Service Interested In" icon={Sparkles} error={errors.service?.message}>
            <Select onValueChange={(v) => setValue("service", v, { shouldValidate: true })}>
              <SelectTrigger className="border-brand-border focus:border-brand focus:ring-brand">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Tell us more" icon={MessageSquare} error={errors.message?.message}>
            <Textarea
              {...register("message")}
              placeholder="E.g. 3 bedroom house in Richmond, needs fortnightly clean, have a dog..."
              rows={5}
              className="border-brand-border focus:border-brand focus:ring-brand resize-none"
            />
          </FieldWrapper>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand hover:bg-brand-dark text-white font-semibold h-12 text-base shadow-md shadow-brand/20"
      >
        {isSubmitting ? "Sending..." : "Request My Free Quote →"}
      </Button>

      <p className="text-center text-xs text-brand-muted">
        No commitment required. We&apos;ll never spam you.
      </p>
    </form>
  );
}
