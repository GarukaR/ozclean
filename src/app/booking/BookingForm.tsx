"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Clock,
  Home,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  Sparkles,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BOOKING_TIME_SLOTS, getMinimumBookingDate } from "@/lib/booking-slots";
import { BUSINESS_PHONE } from "@/lib/business";
import { ROUTES } from "@/lib/routes";
import {
  ChoiceCard,
  FormAlert,
  FormField,
  OptionTile,
  SegmentedTabs,
  Stepper,
  StickyActions,
  TextArea,
  TextInput,
  primarySubmitClass,
} from "@/components/form/FormKit";

// ─── Guided booking: Service → Date & time → Your details → Review & pay ─────
// Only the presentation changed. The catalogue/availability fetches, price
// maths, validation schema and the /api/create-checkout payload (then the
// redirect to Square) are the same as the previous single-page form.

type ApiServiceOption = {
  id: string;
  code: string;
  name: string;
  basePriceCents: number;
  isActive: boolean;
  pricingUnit: string;
  minQuantity: number;
  allowDecimalQuantity: boolean;
};

type ApiAddonOption = {
  id: string;
  code: string;
  name: string;
  priceCents: number;
  isActive: boolean;
};

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

const PLANS = new Set(["Essential Plan", "Standard Plan", "Premium Plan"]);

const STEPS = ["Service", "Date & time", "Your details", "Review & pay"];
const STEP_FIELDS: (keyof BookingFormData)[][] = [
  ["service"],
  ["date", "time"],
  ["name", "email", "phone", "address", "suburb", "state", "postcode"],
  [],
];

const UNIT_LABELS: Record<string, string> = {
  hour: "hours",
  hr: "hours",
  bin: "bins",
};

type CountConfig = {
  label: string;
  unit: string;
  min: number;
  step: string;
  requiresInteger: boolean;
};

function pluraliseUnit(pricingUnit: string): string {
  const unit = pricingUnit.trim().toLowerCase();
  return UNIT_LABELS[unit] ?? (unit.endsWith("s") ? unit : `${unit}s`);
}

/**
 * Quantity rules come from the service record (pricingUnit / minQuantity / allowDecimalQuantity),
 * which is the same source the server validates against.
 */
function getCountConfig(service: ApiServiceOption | undefined): CountConfig | null {
  if (!service || service.pricingUnit.trim().toLowerCase() === "service") {
    return null;
  }

  const unit = pluraliseUnit(service.pricingUnit);

  return {
    label: `Number of ${unit.charAt(0).toUpperCase() + unit.slice(1)}`,
    unit,
    min: service.minQuantity,
    step: service.allowDecimalQuantity ? "0.5" : "1",
    requiresInteger: !service.allowDecimalQuantity,
  };
}

function getUnitSuffix(pricingUnit: string): string {
  const unit = pricingUnit.trim().toLowerCase();
  return unit === "hour" || unit === "hr" ? "hr" : unit;
}

// Short tile title, e.g. "3 bed · 2-storey", "Weekly", "Wheelie bins".
function tileTitle(service: ApiServiceOption): string {
  const unit = service.pricingUnit.trim().toLowerCase();
  if (unit === "service") {
    const beds = service.name.match(/(\d+)\s*Bedroom/i)?.[1];
    if (beds) return `${beds} bed${/2-Storey/i.test(service.name) ? " · 2-storey" : ""}`;
  }
  if (unit === "hour" || unit === "hr") {
    return service.name.replace("Hourly Cleaning", "").replace(/[()]/g, "").trim() || service.name;
  }
  if (unit === "bin") return "Wheelie bins";
  return service.name;
}

function formatPrice(service: ApiServiceOption): string {
  const dollars = `$${(service.basePriceCents / 100).toFixed(0)}`;
  const unit = service.pricingUnit.trim().toLowerCase();
  return unit === "service" ? dollars : `${dollars}/${getUnitSuffix(unit)}`;
}

function formatDateLong(value: string): string {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
}

export default function BookingForm({
  preselectedService,
}: {
  tierLabel?: string;
  preselectedService?: string;
}) {
  const [step, setStep] = useState(0);
  const [serviceTab, setServiceTab] = useState("");
  const [showAddOns, setShowAddOns] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [selectedService, setSelectedService] = useState(preselectedService ?? "");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [serviceCount, setServiceCount] = useState("1");
  const [selectedTime, setSelectedTime] = useState("");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [services, setServices] = useState<ApiServiceOption[]>([]);
  const [addons, setAddons] = useState<ApiAddonOption[]>([]);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [slotAvailability, setSlotAvailability] = useState<Record<string, boolean> | null>(null);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      setCatalogError(null);
      setIsCatalogLoading(true);
      try {
        const [servicesRes, addonsRes] = await Promise.all([
          fetch("/api/services", { cache: "no-store" }),
          fetch("/api/addons", { cache: "no-store" }),
        ]);

        if (!servicesRes.ok || !addonsRes.ok) {
          throw new Error("Unable to load booking options");
        }

        const [servicesData, addonsData] = await Promise.all([
          servicesRes.json() as Promise<{ services?: ApiServiceOption[] }>,
          addonsRes.json() as Promise<{ addons?: ApiAddonOption[] }>,
        ]);

        if (!mounted) return;
        setServices(servicesData.services ?? []);
        setAddons(addonsData.addons ?? []);
      } catch (error) {
        console.error("[BookingForm] Failed to load service catalog:", error);
        if (!mounted) return;
        setCatalogError("Could not load live pricing options. Please refresh and try again.");
      } finally {
        if (mounted) setIsCatalogLoading(false);
      }
    }

    void loadCatalog();
    return () => {
      mounted = false;
    };
  }, []);

  const { flatRateLookup, addonLookup, serviceGroups, serviceLookup } = useMemo(() => {
    const isFlatRate = (service: ApiServiceOption) =>
      service.pricingUnit.trim().toLowerCase() === "service";
    const isHourly = (service: ApiServiceOption) =>
      ["hour", "hr"].includes(service.pricingUnit.trim().toLowerCase());

    const flatRates = services
      .filter(isFlatRate)
      .map((service) => ({ value: service.code, price: service.basePriceCents / 100 }));

    const hourly = services.filter(isHourly);
    const additional = services.filter(
      (service) => !isFlatRate(service) && !isHourly(service)
    );

    const onlyBins = additional.length > 0 && additional.every((s) => s.pricingUnit.trim().toLowerCase() === "bin");
    const groups = [
      {
        id: "flat",
        tab: "By bedrooms",
        label: "Flat rate by number of bedrooms",
        options: flatRates.map((option) => option.value),
      },
      {
        id: "hourly",
        tab: "Hourly",
        label: "Hourly rate, you choose the tasks",
        options: hourly.map((service) => service.code),
      },
      {
        id: "other",
        tab: onlyBins ? "Bins" : "Other",
        label: onlyBins ? "Wheelie bin cleaning" : "Other services",
        options: additional.map((service) => service.code),
      },
    ].filter((group) => group.options.length > 0);

    return {
      flatRateLookup: new Map(flatRates.map((option) => [option.value, option.price])),
      addonLookup: new Map(addons.map((addon) => [addon.code, addon.priceCents / 100])),
      serviceGroups: groups,
      serviceLookup: new Map(services.map((service) => [service.code, service])),
    };
  }, [services, addons]);

  const selectedGroupId = serviceGroups.find((g) => g.options.includes(selectedService))?.id;
  const activeTab = serviceTab || selectedGroupId || serviceGroups[0]?.id || "";
  const activeGroup = serviceGroups.find((g) => g.id === activeTab);

  const selectedServiceRecord = serviceLookup.get(selectedService);
  const countConfig = getCountConfig(selectedServiceRecord);
  const serviceRate = (selectedServiceRecord?.basePriceCents ?? 0) / 100;
  const parsedServiceCount = Number(serviceCount) || 0;
  const baseServiceTotal = countConfig
    ? serviceRate * parsedServiceCount
    : flatRateLookup.get(selectedService) ?? null;

  const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
    return sum + (addonLookup.get(addOnId) ?? 0);
  }, 0);

  const grandTotal = baseServiceTotal !== null ? baseServiceTotal + addOnTotal : null;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service: preselectedService ?? "", state: "VIC" },
  });

  const selectedDate = useWatch({ control, name: "date" });

  useEffect(() => {
    setSelectedTime("");
    setValue("time", "", { shouldValidate: false });
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (!selectedDate) {
      setSlotAvailability(null);
      setAvailabilityError(null);
      setIsAvailabilityLoading(false);
      return;
    }

    let mounted = true;

    async function loadAvailability() {
      setAvailabilityError(null);
      setIsAvailabilityLoading(true);

      try {
        const response = await fetch(`/api/bookings/availability?date=${encodeURIComponent(selectedDate)}`, {
          cache: "no-store",
        });

        const json = await response.json() as {
          availability?: Array<{ label: string; value: string; available: boolean }>;
          error?: string;
          fullyBooked?: boolean;
        };

        if (!response.ok) {
          throw new Error(json.error ?? "Unable to load slot availability");
        }

        if (!mounted) return;

        const nextAvailability = Object.fromEntries(
          (json.availability ?? []).map((slot) => [slot.value, slot.available])
        ) as Record<string, boolean>;

        setSlotAvailability(nextAvailability);

        if (json.fullyBooked) {
          setAvailabilityError("This date is fully booked. Please choose another date.");
        }
      } catch (error) {
        if (!mounted) return;
        console.error("[BookingForm] Failed to load slot availability:", error);
        setSlotAvailability(null);
        setAvailabilityError("Availability could not be loaded right now. Please try again.");
      } finally {
        if (mounted) setIsAvailabilityLoading(false);
      }
    }

    void loadAvailability();

    return () => {
      mounted = false;
    };
  }, [selectedDate, setValue]);

  const onSubmit = async (data: BookingFormData) => {
    setCheckoutError(null);
    const payload = {
      ...data,
      // Optional unit line is new on the form; omit it when blank so the
      // payload matches what the old form sent.
      addressLine2: data.addressLine2?.trim() || undefined,
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

      if (!res.ok) {
        // The API returns customer-safe messages (slot taken, minimum quantity, rate limit).
        setCheckoutError(
          json.error ??
            `Something went wrong creating your booking. Please try again or call us on ${BUSINESS_PHONE}.`
        );
        return;
      }

      // Redirect to Square hosted payment page
      window.location.href = json.url;

    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError(
        `Something went wrong creating your booking. Please try again or call us on ${BUSINESS_PHONE}.`
      );
    }
  };

  // ── Step navigation (validates only the current step's fields) ──
  const goTo = (target: number) => {
    setStep(target);
    if (typeof window !== "undefined") {
      document.getElementById("booking-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const next = async () => {
    if (await trigger(STEP_FIELDS[step])) goTo(step + 1);
  };

  const chooseService = (code: string) => {
    setValue("service", code, { shouldValidate: true });
    setSelectedService(code);
    const nextConfig = getCountConfig(serviceLookup.get(code));
    setServiceCount(nextConfig ? String(nextConfig.min) : "1");
  };

  const toggleAddOn = (code: string) =>
    setSelectedAddOns((prev) => (prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code]));

  const adjustCount = (direction: 1 | -1) => {
    if (!countConfig) return;
    const stepSize = Number(countConfig.step);
    const min = countConfig.min;
    // Functional update so quick repeated taps each count.
    setServiceCount((prev) => String(Math.max(min, (Number(prev) || min) + direction * stepSize)));
  };

  const allSlotsBooked = Boolean(
    selectedDate && slotAvailability && Object.values(slotAvailability).every((available) => !available)
  );
  const selectedSlotLabel = BOOKING_TIME_SLOTS.find((slot) => slot.value === selectedTime)?.label;
  const serviceDisplayName = selectedServiceRecord?.name ?? selectedService;

  // Compact running total inside the sticky action bar
  const TotalSummary = (
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-muted">Total</p>
      <p className="text-xl font-black text-brand-accent-dark leading-tight">
        {grandTotal !== null ? `$${grandTotal.toFixed(0)}` : "—"}
      </p>
    </div>
  );
  const BackButton = ({ to }: { to: number }) => (
    <Button type="button" variant="outline" onClick={() => goTo(to)} aria-label="Back" className="h-12 w-12 shrink-0 rounded-xl border-brand-border p-0">
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      // Enter in a text field moves to the next step instead of submitting early
      onKeyDown={(e) => {
        if (e.key === "Enter" && step < STEPS.length - 1 && (e.target as HTMLElement).tagName === "INPUT") {
          e.preventDefault();
          void next();
        }
      }}
      className="p-5 sm:p-8 flex flex-col gap-6 scroll-mt-28"
      id="booking-form-top"
    >
      <Stepper steps={STEPS} current={step} />

      {/* Plan banner */}
      {PLANS.has(selectedService) && (
        <div className="flex items-center gap-2 bg-brand/8 border border-brand/20 rounded-xl px-4 py-3">
          <Sparkles className="w-4 h-4 text-brand shrink-0" />
          <p className="text-sm text-brand font-medium">
            Selected plan: <span className="font-bold">{selectedService}</span>
          </p>
        </div>
      )}

      {/* ── Step 1: Service ── */}
      <section className={step === 0 ? "flex flex-col gap-6" : "hidden"} aria-label="Choose a service">
        <div>
          <h2 className="text-xl font-bold text-brand-text">What would you like cleaned?</h2>
          <p className="text-sm text-brand-muted mt-1">Prices include everything on our standard checklist.</p>
        </div>

        {isCatalogLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[68px] rounded-2xl bg-brand-bg border border-brand-border animate-pulse" />
            ))}
          </div>
        )}
        {catalogError && <FormAlert>{catalogError}</FormAlert>}

        {serviceGroups.length > 1 && (
          <SegmentedTabs
            label="Service type"
            active={activeTab}
            onChange={setServiceTab}
            tabs={serviceGroups.map((g) => ({ id: g.id, label: g.tab, badge: g.id === selectedGroupId }))}
          />
        )}
        {activeGroup && (
          <div role="radiogroup" aria-label={activeGroup.label} className="flex flex-col gap-2">
            <p className="text-xs text-brand-muted">{activeGroup.label}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {activeGroup.options.map((code) => {
                const record = serviceLookup.get(code);
                if (!record) return null;
                return (
                  <OptionTile
                    key={code}
                    title={tileTitle(record)}
                    meta={formatPrice(record)}
                    selected={selectedService === code}
                    onSelect={() => chooseService(code)}
                  />
                );
              })}
            </div>
          </div>
        )}
        {errors.service?.message && <FormAlert>{errors.service.message}</FormAlert>}

        {/* Quantity (hours / bins) */}
        {countConfig && (
          <div className="rounded-2xl border border-brand-border bg-brand-bg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-brand-text">{countConfig.label}</p>
              <p className="text-xs text-brand-muted">
                Minimum {countConfig.min} {countConfig.unit} · ${serviceRate}/{getUnitSuffix(selectedServiceRecord?.pricingUnit ?? "")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustCount(-1)}
                disabled={parsedServiceCount <= countConfig.min}
                aria-label={`Fewer ${countConfig.unit}`}
                className="w-11 h-11 rounded-xl border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text hover:border-brand-accent disabled:opacity-40"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                inputMode="decimal"
                aria-label={countConfig.label}
                min={String(countConfig.min)}
                step={countConfig.step}
                value={serviceCount}
                onChange={(e) => setServiceCount(e.target.value)}
                className="w-16 h-11 rounded-xl border border-brand-border bg-brand-surface text-center text-lg font-bold text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-accent/15 focus:border-brand-accent"
              />
              <button
                type="button"
                onClick={() => adjustCount(1)}
                aria-label={`More ${countConfig.unit}`}
                className="w-11 h-11 rounded-xl border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text hover:border-brand-accent"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Add-ons, folded away by default (most people skip them) */}
        {selectedService && addons.length > 0 && (
          <div className="rounded-2xl border border-brand-border">
            <button
              type="button"
              onClick={() => setShowAddOns((v) => !v)}
              aria-expanded={showAddOns}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <span>
                <span className="block text-sm font-semibold text-brand-text">Add extras <span className="font-normal text-brand-muted">(optional)</span></span>
                <span className="block text-xs text-brand-muted">
                  {selectedAddOns.length ? `${selectedAddOns.length} selected · +$${addOnTotal.toFixed(0)}` : "Oven, fridge, windows, garage and more"}
                </span>
              </span>
              <ChevronDown className={`w-5 h-5 text-brand-muted transition-transform ${showAddOns ? "rotate-180" : ""}`} />
            </button>
            {showAddOns && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-3 pb-3">
                {addons.map((addon) => (
                  <OptionTile
                    key={addon.id}
                    title={addon.name}
                    meta={`+$${(addon.priceCents / 100).toFixed(0)}`}
                    selected={selectedAddOns.includes(addon.code)}
                    onSelect={() => toggleAddOn(addon.code)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-200">
          Need Airbnb, end of lease, business or carpet cleaning?{" "}
          <Link href={ROUTES.QUOTE} className="font-semibold underline underline-offset-2">Get a free quote</Link>.
        </p>

        <StickyActions>
          <div className="flex items-center gap-3">
            {TotalSummary}
            <Button type="button" onClick={next} className={`${primarySubmitClass} w-auto flex-1`}>
              Next: time <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </StickyActions>
      </section>

      {/* ── Step 2: Date & time ── */}
      <section className={step === 1 ? "flex flex-col gap-6" : "hidden"} aria-label="Pick a date and time">
        <div>
          <h2 className="text-xl font-bold text-brand-text">When suits you?</h2>
          <p className="text-sm text-brand-muted mt-1">Book at least one day ahead. You&apos;ll only see times that are free.</p>
        </div>

        <FormField label="Date" htmlFor="booking-date" error={errors.date?.message}>
          <TextInput
            id="booking-date"
            icon={CalendarCheck}
            type="date"
            // Disallow same-day bookings: only allow dates from tomorrow onwards, computed in
            // the booking timezone so the picker matches what the server accepts.
            min={getMinimumBookingDate()}
            invalid={!!errors.date}
            {...register("date")}
          />
        </FormField>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-brand-text">Time</p>
          {!selectedDate && <p className="text-sm text-brand-muted">Choose a date to see available times.</p>}
          {selectedDate && (
            <div role="radiogroup" aria-label="Time slot" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {BOOKING_TIME_SLOTS.map((slot) => {
                const isAvailable = slotAvailability?.[slot.value] ?? false;
                return (
                  <ChoiceCard
                    key={slot.value}
                    compact
                    icon={Clock}
                    title={slot.label}
                    subtitle={isAvailabilityLoading ? "Checking…" : isAvailable ? "Available" : "Booked"}
                    disabled={isAvailabilityLoading || !isAvailable}
                    selected={selectedTime === slot.value}
                    onSelect={() => {
                      setSelectedTime(slot.value);
                      setValue("time", slot.value, { shouldValidate: true });
                    }}
                  />
                );
              })}
            </div>
          )}
          {selectedDate && !isAvailabilityLoading && allSlotsBooked && !availabilityError && (
            <FormAlert>No time slots are available on this date. Please choose another day.</FormAlert>
          )}
          {availabilityError && <FormAlert>{availabilityError}</FormAlert>}
          {errors.time?.message && !availabilityError && (
            <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">{errors.time.message}</p>
          )}
        </div>

        <StickyActions>
          <div className="flex items-center gap-3">
            <BackButton to={0} />
            {TotalSummary}
            <Button type="button" onClick={next} className={`${primarySubmitClass} w-auto flex-1`}>
              Next: details <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </StickyActions>
      </section>

      {/* ── Step 3: Your details ── */}
      <section className={step === 2 ? "flex flex-col gap-5" : "hidden"} aria-label="Your details">
        <div>
          <h2 className="text-xl font-bold text-brand-text">Your details</h2>
          <p className="text-sm text-brand-muted mt-1">So we know who to confirm with and where to go.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-x-3 gap-y-4">
          <FormField label="Full name" htmlFor="booking-name" error={errors.name?.message} className="col-span-2 sm:col-span-3">
            <TextInput id="booking-name" icon={User} autoComplete="name" placeholder="First and last name" invalid={!!errors.name} {...register("name")} />
          </FormField>
          <FormField label="Phone" htmlFor="booking-phone" error={errors.phone?.message} className="col-span-2 sm:col-span-3">
            <TextInput id="booking-phone" icon={Phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="04XX XXX XXX" invalid={!!errors.phone} {...register("phone")} />
          </FormField>
          <FormField label="Email" htmlFor="booking-email" error={errors.email?.message} className="col-span-2 sm:col-span-6">
            <TextInput id="booking-email" icon={Mail} type="email" inputMode="email" autoComplete="email" placeholder="For your booking confirmation" invalid={!!errors.email} {...register("email")} />
          </FormField>

          <p className="col-span-2 sm:col-span-6 -mb-1 pt-1 text-xs font-semibold uppercase tracking-widest text-brand-muted">Address</p>
          <FormField label="Street address" htmlFor="booking-address" error={errors.address?.message} className="col-span-2 sm:col-span-4">
            <TextInput id="booking-address" icon={Home} autoComplete="address-line1" placeholder="Street number and name" invalid={!!errors.address} {...register("address")} />
          </FormField>
          <FormField label="Unit" optional htmlFor="booking-address2" className="col-span-1 sm:col-span-2">
            <TextInput id="booking-address2" autoComplete="address-line2" placeholder="Unit no." {...register("addressLine2")} />
          </FormField>
          <FormField label="Postcode" htmlFor="booking-postcode" error={errors.postcode?.message} className="col-span-1 sm:col-span-2 sm:order-last">
            <TextInput id="booking-postcode" inputMode="numeric" autoComplete="postal-code" placeholder="e.g. 3806" maxLength={4} invalid={!!errors.postcode} {...register("postcode")} />
          </FormField>
          <FormField label="Suburb" htmlFor="booking-suburb" error={errors.suburb?.message} className="col-span-1 sm:col-span-3">
            <TextInput id="booking-suburb" icon={MapPin} autoComplete="address-level2" placeholder="e.g. Berwick" invalid={!!errors.suburb} {...register("suburb")} />
          </FormField>
          <FormField label="State" htmlFor="booking-state" error={errors.state?.message} className="col-span-1 sm:col-span-1">
            <TextInput id="booking-state" autoComplete="address-level1" placeholder="VIC" invalid={!!errors.state} {...register("state")} />
          </FormField>
        </div>

        {/* Note folded away unless wanted (the field stays registered either way) */}
        <div className={showNote ? "" : "hidden"}>
          <FormField label="Anything we should know?" optional htmlFor="booking-instructions" error={errors.instructions?.message}>
            <TextArea
              id="booking-instructions"
              rows={3}
              placeholder="Pets, parking, how to get in, or areas to focus on"
              {...register("instructions")}
            />
          </FormField>
        </div>
        {!showNote && (
          <button
            type="button"
            onClick={() => setShowNote(true)}
            className="w-fit inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-brand-accent-dark hover:underline underline-offset-2"
          >
            <Plus className="w-4 h-4" /> Add a note for the cleaner (optional)
          </button>
        )}

        <StickyActions>
          <div className="flex items-center gap-3">
            <BackButton to={1} />
            {TotalSummary}
            <Button type="button" onClick={next} className={`${primarySubmitClass} w-auto flex-1`}>
              Review <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </StickyActions>
      </section>

      {/* ── Step 4: Review & pay ── */}
      {step === 3 && (
        <section className="flex flex-col gap-5" aria-label="Review and pay">
          <div>
            <h2 className="text-xl font-bold text-brand-text">Review your booking</h2>
            <p className="text-sm text-brand-muted mt-1">Check everything looks right, then pay securely to confirm.</p>
          </div>

          <dl className="rounded-2xl border border-brand-border divide-y divide-brand-border overflow-hidden text-sm">
            {[
              {
                label: "Service",
                value: (
                  <>
                    {serviceDisplayName}
                    {countConfig && ` · ${serviceCount} ${countConfig.unit}`}
                  </>
                ),
                edit: 0,
              },
              {
                label: "Add-ons",
                value: selectedAddOns.length
                  ? selectedAddOns.map((code) => addons.find((a) => a.code === code)?.name ?? code).join(", ")
                  : "None",
                edit: 0,
              },
              { label: "When", value: `${formatDateLong(selectedDate)} · ${selectedSlotLabel ?? ""}`, edit: 1 },
              {
                label: "Where",
                value: [getValues("address"), getValues("addressLine2"), `${getValues("suburb")} ${getValues("state")} ${getValues("postcode")}`]
                  .filter(Boolean)
                  .join(", "),
                edit: 2,
              },
              { label: "Contact", value: `${getValues("name")} · ${getValues("phone")} · ${getValues("email")}`, edit: 2 },
            ].map(({ label, value, edit }) => (
              <div key={label} className="flex items-start gap-3 px-4 py-3 bg-brand-surface">
                <dt className="w-20 shrink-0 text-brand-muted">{label}</dt>
                <dd className="flex-1 min-w-0 font-medium text-brand-text break-words">{value}</dd>
                <button type="button" onClick={() => goTo(edit)} className="shrink-0 text-xs font-semibold text-brand-accent-dark hover:underline underline-offset-2 py-1">
                  Edit
                </button>
              </div>
            ))}
          </dl>

          {grandTotal !== null && (
            <div className="rounded-2xl border border-brand-accent-border bg-brand-accent-bg p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm text-brand-text">
                <span>Service</span>
                <span>${baseServiceTotal?.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-brand-text">
                <span>Add-ons</span>
                <span>${addOnTotal.toFixed(0)}</span>
              </div>
              <div className="h-px bg-brand-accent-border" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-brand-text">Total (AUD)</span>
                <span className="text-2xl font-black text-brand-accent-dark">${grandTotal.toFixed(0)}</span>
              </div>
            </div>
          )}

          {checkoutError && <FormAlert>{checkoutError}</FormAlert>}

          <p className="text-center text-xs text-brand-muted">
            You&apos;ll pay the full amount on Square&apos;s secure checkout to confirm this booking. By continuing you agree to our{" "}
            <Link href="/terms" className="text-brand hover:underline underline-offset-2">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-brand hover:underline underline-offset-2">Privacy Policy</Link>.
          </p>

          <StickyActions>
            <div className="flex items-center gap-3">
              <BackButton to={2} />
              <Button type="submit" disabled={isSubmitting} className={`${primarySubmitClass} w-auto flex-1`}>
                {isSubmitting ? "Redirecting to payment..." : <>Confirm &amp; pay {grandTotal !== null ? `$${grandTotal.toFixed(0)}` : ""} <ArrowRight className="w-4 h-4" /></>}
              </Button>
            </div>
          </StickyActions>
        </section>
      )}
    </form>
  );
}
