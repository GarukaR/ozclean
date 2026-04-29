"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalendarCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  FileText,
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

type ApiServiceOption = {
  id: string;
  code: string;
  name: string;
  basePriceCents: number;
  isActive: boolean;
};

type ApiAddonOption = {
  id: string;
  code: string;
  name: string;
  priceCents: number;
  isActive: boolean;
};

type ApiAvailabilityOption = {
  timeSlot: string; // ISO date string
  isAvailable: boolean; // e.g. ["09:00", "12:00", "15:00"]
}

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
  serviceCount: z.string().optional(),
  serviceCountUnit: z.string().optional(),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  instructions: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const TIME_SLOTS = [
  { label: "9:00 AM – 11:30 AM", value: "09:00" },
  { label: "12:00 PM – 2:30 PM", value: "12:00" },
  { label: "3:00 PM – 5:30 PM", value: "15:00" },
];

function getCountConfigFromService(serviceValue: string): {
  label: string;
  unit: string;
  min: number;
  step: string;
  requiresInteger: boolean;
} | null {
  const unitRate = getServiceUnitRate(serviceValue);
  const rawUnit = unitRate?.unit;

  if (!rawUnit) {
    return null;
  }

  if (rawUnit === "hr") {
    return {
      label: "Number of Hours",
      unit: "hours",
      min: 2,
      step: "0.5",
      requiresInteger: false,
    };
  }

  const unit = rawUnit.endsWith("s") ? rawUnit : `${rawUnit}s`;
  const label = `Number of ${unit.charAt(0).toUpperCase() + unit.slice(1)}`;

  return {
    label,
    unit,
    min: 1,
    step: "1",
    requiresInteger: true,
  };
}

function getServiceRateFromService(serviceValue: string): number {
  return getServiceUnitRate(serviceValue)?.rate ?? 0;
}

function getServiceUnitRate(
  serviceValue: string,
): { rate: number; unit: string } | null {
  const match = serviceValue.match(/=\s*\$(\d+)\s*\/\s*([a-zA-Z]+)/);
  if (!match) {
    return null;
  }

  const rate = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  if (!Number.isFinite(rate) || rate <= 0) {
    return null;
  }

  return { rate, unit };
}

function FieldWrapper({
  label,
  icon: Icon,
  error,
  children,
}: {
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
  preselectedService?: string;
}) {
  // const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(
    preselectedService ?? "",
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [serviceCount, setServiceCount] = useState("1");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [services, setServices] = useState<ApiServiceOption[]>([]);
  const [addons, setAddons] = useState<ApiAddonOption[]>([]);
  const [availability, setAvailability] = useState<ApiAvailabilityOption[]>([]);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      setCatalogError(null);
      setIsCatalogLoading(true);
      try {
        const [servicesRes, addonsRes, availabilityRes] = await Promise.all([
          fetch("/api/services", { cache: "no-store" }),
          fetch("/api/addons", { cache: "no-store" }),
          fetch("/api/availability", { cache: "no-store" }),
        ]);

        if (!servicesRes.ok || !addonsRes.ok || !availabilityRes.ok) {
          throw new Error("Unable to load booking options");
        }

        const [servicesData, addonsData, availabilityData] = await Promise.all([
          servicesRes.json() as Promise<{ services?: ApiServiceOption[] }>,
          addonsRes.json() as Promise<{ addons?: ApiAddonOption[] }>,
          availabilityRes.json() as Promise<{ availability?: ApiAvailabilityOption[] }>,
        ]);

        if (!mounted) return;
        setServices(servicesData.services ?? []);
        setAddons(addonsData.addons ?? []);
        setAvailability(availabilityData.availability ?? []);
      } catch (error) {
        console.error("[BookingForm] Failed to load service catalog:", error);
        if (!mounted) return;
        setCatalogError(
          "Could not load live pricing options. Please refresh and try again.",
        );
      } finally {
        if (mounted) setIsCatalogLoading(false);
      }
    }

    void loadCatalog();
    return () => {
      mounted = false;
    };
  }, []);

  const { flatRateLookup, addonLookup, serviceGroups } = useMemo(() => {
    const flatRates = services
      .filter((service) => !getServiceUnitRate(service.code))
      .map((service) => ({
        value: service.code,
        price: service.basePriceCents / 100,
      }));

    const hourly = services.filter(
      (service) => getServiceUnitRate(service.code)?.unit === "hr",
    );
    const additional = services.filter((service) => {
      const unit = getServiceUnitRate(service.code)?.unit;
      return Boolean(unit && unit !== "hr");
    });

    const groups = [
      {
        label: "Residential Cleaning - Flat Rate",
        options: flatRates.map((option) => option.value),
      },
      {
        label: "Residential Cleaning - Hourly Rate",
        options: hourly.map((service) => service.code),
      },
      {
        label: "Additional Services",
        options: additional.map((service) => service.code),
      },
    ].filter((group) => group.options.length > 0);

    return {
      flatRateLookup: new Map(
        flatRates.map((option) => [option.value, option.price]),
      ),
      addonLookup: new Map(
        addons.map((addon) => [addon.code, addon.priceCents / 100]),
      ),
      serviceGroups: groups,
    };
  }, [services, addons, availability]);

  const countConfig = getCountConfigFromService(selectedService);
  const serviceRate = getServiceRateFromService(selectedService);
  const parsedServiceCount = Number(serviceCount) || 0;
  const baseServiceTotal = countConfig
    ? serviceRate * parsedServiceCount
    : (flatRateLookup.get(selectedService) ?? null);

  const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
    return sum + (addonLookup.get(addOnId) ?? 0);
  }, 0);

  const estimatedTotal = baseServiceTotal;
  const grandTotal =
    baseServiceTotal !== null ? baseServiceTotal + addOnTotal : null;

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
      ...(countConfig
        ? {
            serviceCount,
            serviceCountUnit: countConfig.unit,
          }
        : {}),
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
      setCheckoutError(
        "Something went wrong creating your booking. Please try again or call us on +61 3 9123 4567.",
      );
    }
  };

  // if (submitted) return <SuccessState />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6">
      {/* Personal details */}
      <div>
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest mb-4">
          Your Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper
            label="Full Name"
            icon={User}
            error={errors.name?.message}
          >
            <Input
              {...register("name")}
              placeholder="Jane Smith"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper
            label="Email Address"
            icon={Mail}
            error={errors.email?.message}
          >
            <Input
              {...register("email")}
              type="email"
              placeholder="jane@email.com"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper
            label="Phone Number"
            icon={Phone}
            error={errors.phone?.message}
          >
            <Input
              {...register("phone")}
              type="tel"
              placeholder="+61 4XX XXX XXX"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper
            label="Address / Suburb"
            icon={MapPin}
            error={errors.address?.message}
          >
            <Input
              {...register("address")}
              placeholder="123 Main St"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper
            label="Suburb"
            icon={MapPin}
            error={errors.suburb?.message}
          >
            <Input
              {...register("suburb")}
              placeholder="Richmond"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper
            label="State"
            icon={MapPin}
            error={errors.state?.message}
          >
            <Input
              {...register("state")}
              placeholder="VIC"
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>
          <FieldWrapper
            label="Postcode"
            icon={MapPin}
            error={errors.postcode?.message}
          >
            <Input
              {...register("postcode")}
              placeholder="3121"
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
          <FieldWrapper
            label="Service Type"
            icon={Sparkles}
            error={errors.service?.message}
          >
            <Select
              disabled={isCatalogLoading}
              defaultValue={preselectedService}
              onValueChange={(v) => {
                setValue("service", v, { shouldValidate: true });
                setSelectedService(v);
                const nextConfig = getCountConfigFromService(v);
                if (nextConfig) {
                  setServiceCount(String(nextConfig.min));
                }
              }}
            >
              <SelectTrigger className="border-brand-border focus:border-brand focus:ring-brand">
                <SelectValue
                  placeholder={
                    isCatalogLoading
                      ? "Loading services..."
                      : "Select a service"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {serviceGroups.map(({ label, options }) => (
                  <SelectGroup key={label}>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
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
                {addons.map((addon) => {
                  const checked = selectedAddOns.includes(addon.code);
                  const addonPrice = addon.priceCents / 100;
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
                              setSelectedAddOns((prev) => [
                                ...prev,
                                addon.code,
                              ]);
                              return;
                            }
                            setSelectedAddOns((prev) =>
                              prev.filter((id) => id !== addon.code),
                            );
                          }}
                          className="h-4 w-4 accent-brand"
                        />
                        <span className="text-sm text-brand-text">
                          {addon.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-brand">
                        +${addonPrice}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Count-based services: show quantity input and estimated total */}
          {countConfig && (
            <div className="bg-brand/8 border border-brand/20 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper
                  label={countConfig.label}
                  icon={countConfig.unit === "hours" ? Clock : Sparkles}
                >
                  <Input
                    type="number"
                    min={String(countConfig.min)}
                    step={countConfig.step}
                    value={serviceCount}
                    onChange={(e) => setServiceCount(e.target.value)}
                    placeholder={String(countConfig.min)}
                    className="border-brand-border focus:border-brand focus:ring-brand"
                  />
                  <p className="text-xs text-brand-muted mt-1">
                    Minimum {countConfig.min} {countConfig.unit}
                  </p>
                </FieldWrapper>
              </div>

              {estimatedTotal !== null && (
                <div className="bg-white rounded-lg p-3 border border-brand-border">
                  <p className="text-xs text-brand-muted uppercase tracking-wide font-semibold mb-1">
                    Estimated Total
                  </p>
                  <p className="text-2xl font-bold text-brand">
                    ${estimatedTotal.toFixed(0)} AUD
                  </p>
                  <p className="text-xs text-brand-muted mt-1">
                    {parsedServiceCount} {countConfig.unit} × ${serviceRate}/
                    {countConfig.unit === "hours"
                      ? "hr"
                      : countConfig.unit.slice(0, -1)}
                  </p>
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
                <span className="font-semibold text-brand-text">
                  Estimated total
                </span>
                <span className="text-xl font-black text-brand-accent-dark">
                  ${grandTotal.toFixed(0)} AUD
                </span>
              </div>
            </div>
          )}

          {catalogError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {catalogError}
            </p>
          )}

          <p className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-2 text-sm font-medium">
            For any service not listed, please contact us directly or get a
            quote.
          </p>
          <FieldWrapper
            label="Preferred Date"
            icon={CalendarCheck}
            error={errors.date?.message}
          >
            <Input
              {...register("date")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="border-brand-border focus:border-brand focus:ring-brand"
            />
          </FieldWrapper>

          <FieldWrapper
            label="Preferred Time"
            icon={Clock}
            error={errors.time?.message}
          >
            <Select
              onValueChange={(v) =>
                setValue("time", v, { shouldValidate: true })
              }
            >
              <SelectTrigger className="border-brand-border focus:border-brand focus:ring-brand">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availability.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        </div>
      </div>

      <div className="h-px bg-brand-border" />

      {/* Special instructions */}
      <FieldWrapper
        label="Special Instructions (optional)"
        icon={FileText}
        error={errors.instructions?.message}
      >
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
          <p className="text-sm text-red-600 leading-relaxed">
            {checkoutError}
          </p>
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
        You&apos;ll pay the full amount securely at checkout to confirm this
        booking.
      </p>

      <p className="text-center text-xs text-brand-muted">
        By submitting you agree to our{" "}
        <Link
          href="/terms"
          className="text-brand hover:underline underline-offset-2"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-brand hover:underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
