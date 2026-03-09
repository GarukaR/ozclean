"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  CalendarCheck, CheckCircle2,
  User, Mail, Phone, MapPin, Clock, Sparkles, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your address or suburb"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  instructions: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const PLANS = new Set(["Essential Plan", "Standard Plan", "Premium Plan"]);

const SERVICE_GROUPS = [
  {
    label: "Plans",
    options: ["Essential Plan", "Standard Plan", "Premium Plan"],
  },
  {
    label: "Individual Services",
    options: [
      "Residential Cleaning",
      "Commercial Cleaning",
      "Deep Cleaning",
      "Move In / Move Out",
      "Window Cleaning",
    ],
  },
];

const TIME_SLOTS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
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
        <h2 className="text-2xl font-bold text-brand-text">Booking Request Sent!</h2>
        <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
          Thanks for booking with SparkClean. We&apos;ll confirm your appointment
          via email within 2 hours.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button asChild className="bg-brand hover:bg-brand-dark text-white">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-brand-border">
          <Link href="/services">Browse Services</Link>
        </Button>
      </div>
    </div>
  );
}

export default function BookingForm({
  preselectedService,
}: {
  tierLabel?: string;
  preselectedService?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(preselectedService ?? "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service: preselectedService ?? "" },
  });

  const onSubmit = async (data: BookingFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Booking submitted:", data);
    setSubmitted(true);
  };

  if (submitted) return <SuccessState />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6">

      {/* Plan banner */}
      {PLANS.has(selectedService) && (
        <div className="flex items-center gap-2 bg-brand/8 border border-brand/20 rounded-xl px-4 py-3">
          <Sparkles className="w-4 h-4 text-brand shrink-0" />
          <p className="text-sm text-brand font-medium">
            Selected plan: <span className="font-bold">{selectedService}</span>
          </p>
        </div>
      )}

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

      {/* Service & scheduling */}
      <div>
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest mb-4">
          Service & Schedule
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper label="Service Type" icon={Sparkles} error={errors.service?.message}>
            <Select defaultValue={preselectedService} onValueChange={(v) => { setValue("service", v, { shouldValidate: true }); setSelectedService(v); }}>
              <SelectTrigger className="border-brand-border focus:border-brand focus:ring-brand">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_GROUPS.map(({ label, options }) => (
                  <SelectGroup key={label}>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Preferred Date" icon={CalendarCheck} error={errors.date?.message}>
            <Input
              {...register("date")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper label="Preferred Time" icon={Clock} error={errors.time?.message}>
            <Select onValueChange={(v) => setValue("time", v, { shouldValidate: true })}>
              <SelectTrigger className="border-brand-border focus:border-brand focus:ring-brand">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        </div>
      </div>

      <div className="h-px bg-brand-border" />

      {/* Special instructions */}
      <FieldWrapper label="Special Instructions (optional)" icon={FileText} error={errors.instructions?.message}>
        <Textarea
          {...register("instructions")}
          placeholder="E.g. pet in the house, focus on the kitchen, access code is 1234..."
          rows={4}
          className="border-brand-border focus:border-brand focus:ring-brand resize-none"
        />
      </FieldWrapper>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand hover:bg-brand-dark text-white font-semibold h-12 text-base shadow-md shadow-brand/20 transition-all"
      >
        {isSubmitting ? "Submitting..." : "Confirm Booking →"}
      </Button>

      <p className="text-center text-xs text-brand-muted">
        By submitting you agree to our{" "}
        <Link href="/terms" className="text-brand hover:underline underline-offset-2">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-brand hover:underline underline-offset-2">
          Privacy Policy
        </Link>.
      </p>
    </form>
  );
}
