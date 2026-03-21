"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalendarCheck,
  User, Mail, Phone, MapPin, Clock, Sparkles, FileText
} from "lucide-react";

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

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BOOKING_ADDONS,
  BOOKING_FLAT_RATE_OPTIONS,
  BOOKING_HOURLY_OPTIONS,
  BOOKING_WHEELY_BIN_SERVICE,
} from "@/lib/services";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your address or suburb"),
  addressLine2: z.string().optional(),
  suburb: z.string().min(1, "Please enter your suburb"),
  state: z.string().min(1, "Please enter your state"),
  postcode: z.string().min(4, "Please enter a valid postcode"),
  service: z.string().min(1, "Please select a service"),
  addOns: z.array(z.string()).optional(),
  hours: z.string().optional(),
  binCount: z.string().optional(),
  hourlyRate: z.string().optional(),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  instructions: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const PLANS = new Set(["Essential Plan", "Standard Plan", "Premium Plan"]);

const FLAT_RATE_LOOKUP = new Map(
  BOOKING_FLAT_RATE_OPTIONS.map((option) => [option.value, option.price])
);

const ADDON_LOOKUP = new Map(BOOKING_ADDONS.map((addon) => [addon.id, addon.price]));

const SERVICE_GROUPS = [
  {
    label: "Residential Cleaning - Flat Rate",
    options: BOOKING_FLAT_RATE_OPTIONS.map((option) => option.value),
  },
  {
    label: "Residential Cleaning - Hourly Rate",
    options: BOOKING_HOURLY_OPTIONS.map((opt) => opt.value),
  },
  {
    label: "Additional Services",
    options: [BOOKING_WHEELY_BIN_SERVICE.value],
  },
];

const TIME_SLOTS = [
  "9:00 AM – 11:30 AM",
  "12:00 PM – 2:30 PM",
  "3:00 PM – 5:30 PM",
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

export default function BookingForm({
  preselectedService,
}: {
  tierLabel?: string;
  preselectedService?: string;
}) {
  // const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(preselectedService ?? "");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [hours, setHours] = useState("2");
  const [binCount, setBinCount] = useState("1");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const isHourlyService = selectedService.toLowerCase().includes("hourly");
  const isWheelyBinService = selectedService.includes("Wheely Bin Cleaning");
  
  // Extract hourly rate from the selected service string
  const getHourlyRate = () => {
    const match = selectedService.match(/=\s*\$(\d+)\/hr/);
    return match ? parseInt(match[1]) : 0;
  };

  const hourlyRate = isHourlyService ? getHourlyRate() : 0;
  const totalHours = parseFloat(hours) || 0;
  const totalBins = parseInt(binCount) || 0;
  const baseServiceTotal = isHourlyService
    ? hourlyRate * totalHours
    : isWheelyBinService
      ? BOOKING_WHEELY_BIN_SERVICE.rate * totalBins
      : FLAT_RATE_LOOKUP.get(selectedService) ?? null;

  const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
    return sum + (ADDON_LOOKUP.get(addOnId) ?? 0);
  }, 0);

  const estimatedTotal = baseServiceTotal;
  const grandTotal = baseServiceTotal !== null ? baseServiceTotal + addOnTotal : null;

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
    setCheckoutError(null);
    const payload = {
      ...data,
      addOns: selectedAddOns,
      ...(isHourlyService ? { hours, hourlyRate: String(hourlyRate) } : {}),
      ...(isWheelyBinService ? { binCount } : {}),
    };

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Something went wrong");

      // Redirect to Square hosted payment page
      window.location.href = json.url;

    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError("Something went wrong creating your booking. Please try again or call us on +61 3 9123 4567.");
    }
  };

  // if (submitted) return <SuccessState />;

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
        <div className="grid grid-cols-1 gap-4">
          
          <FieldWrapper label="Service Type" icon={Sparkles} error={errors.service?.message}>
            <Select
              defaultValue={preselectedService}
              onValueChange={(v) => {
                setValue("service", v, { shouldValidate: true });
                setSelectedService(v);
              }}
            >
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

          {selectedService && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest">
                Optional Add-ons
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BOOKING_ADDONS.map((addon) => {
                  const checked = selectedAddOns.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-white px-3 py-2 cursor-pointer hover:border-brand/40"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAddOns((prev) => [...prev, addon.id]);
                              return;
                            }
                            setSelectedAddOns((prev) => prev.filter((id) => id !== addon.id));
                          }}
                          className="h-4 w-4 accent-brand"
                        />
                        <span className="text-sm text-brand-text">{addon.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-brand">+${addon.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hourly/bin booking: show quantity input and estimated total */}
          {(isHourlyService || isWheelyBinService) && (
            <div className="bg-brand/8 border border-brand/20 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isHourlyService && (
                  <FieldWrapper label="Number of Hours" icon={Clock} error={errors.hours?.message}>
                    <Input
                      type="number"
                      min="2"
                      step="0.5"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="2"
                      className="border-brand-border focus:border-brand focus:ring-brand"
                    />
                    <p className="text-xs text-brand-muted mt-1">Minimum 2 hours</p>
                  </FieldWrapper>
                )}

                {isWheelyBinService && (
                  <FieldWrapper label="Number of Bins" icon={Sparkles} error={errors.binCount?.message}>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      value={binCount}
                      onChange={(e) => setBinCount(e.target.value)}
                      placeholder="1"
                      className="border-brand-border focus:border-brand focus:ring-brand"
                    />
                    <p className="text-xs text-brand-muted mt-1">Minimum 1 bin</p>
                  </FieldWrapper>
                )}
              </div>

              {estimatedTotal !== null && (
                <div className="bg-white rounded-lg p-3 border border-brand-border">
                  <p className="text-xs text-brand-muted uppercase tracking-wide font-semibold mb-1">Estimated Total</p>
                  <p className="text-2xl font-bold text-brand">
                    ${estimatedTotal.toFixed(0)} AUD
                  </p>
                  {isHourlyService && (
                    <p className="text-xs text-brand-muted mt-1">
                      {totalHours} hours × ${hourlyRate}/hr
                    </p>
                  )}
                  {isWheelyBinService && (
                    <p className="text-xs text-brand-muted mt-1">
                      {totalBins} bins × ${BOOKING_WHEELY_BIN_SERVICE.rate}/bin
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {grandTotal !== null && (
            <div className="bg-brand-accent-bg border border-brand-accent-border rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent-dark">
                Booking Total Preview
              </p>
              <div className="flex items-center justify-between text-sm text-brand-text">
                <span>Service total</span>
                <span>${baseServiceTotal?.toFixed(0)} AUD</span>
              </div>
              <div className="flex items-center justify-between text-sm text-brand-text">
                <span>Add-ons total</span>
                <span>${addOnTotal.toFixed(0)} AUD</span>
              </div>
              <div className="h-px bg-brand-accent-border" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-brand-text">Estimated total</span>
                <span className="text-xl font-black text-brand-accent-dark">${grandTotal.toFixed(0)} AUD</span>
              </div>
            </div>
          )}

          <p className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-2 text-sm font-medium">
            For any service not listed, please contact us directly or get a quote.
          </p>
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
      {checkoutError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-600 leading-relaxed">{checkoutError}</p>
        </div>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand hover:bg-brand-dark text-white font-semibold h-12 text-base shadow-md shadow-brand/20 transition-all"
      >
        {isSubmitting ? "Redirecting to payment..." : "Confirm Booking →"}
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
