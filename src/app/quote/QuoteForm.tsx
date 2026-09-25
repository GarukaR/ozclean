"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, HelpCircle, Mail, MapPin, Phone, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { SERVICES, SERVICE_GROUPS, serviceShortName } from "@/lib/services";
import { quoteSchema, type QuoteFormData } from "@/lib/quote";
import {
  FormAlert,
  FormField,
  OptionTile,
  SegmentedTabs,
  Stepper,
  StickyActions,
  SuccessPanel,
  TextArea,
  TextInput,
  primarySubmitClass,
} from "@/components/form/FormKit";

// ─── Two-step quote request ───────────────────────────────────────────────────
// Step 1: what you need (service cards + description). Step 2: your details.
// The submitted payload is unchanged: { name, email, phone, address, service,
// message } with `service` set to the service title, posted to /api/quote.

const NOT_SURE = "Not sure — need advice";
const STEPS = ["What you need", "Your details"];
const STEP_FIELDS: (keyof QuoteFormData)[][] = [["service", "message"], ["name", "email", "phone", "address"]];
const TAB_LABELS: Record<string, string> = { "hosts-tenants": "Hosts & tenants", businesses: "Business", homes: "Homes" };
const QUICK_FILLS = ["1–2 bedrooms", "3+ bedrooms", "Has pets", "One-off", "Weekly / fortnightly", "Needed ASAP"];

export default function QuoteForm() {
  const searchParams = useSearchParams();
  // Service pages link here as /quote?service=<slug> to preselect that service.
  const preselected = SERVICES[searchParams.get("service") ?? ""]?.title ?? "";

  const [step, setStep] = useState(0);
  const [tab, setTab] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { service: preselected, message: "" },
  });

  const service = useWatch({ control, name: "service" });
  const message = useWatch({ control, name: "message" }) ?? "";
  // Open on the tab holding the chosen service (e.g. from ?service=), else the first.
  const selectedGroupId = SERVICE_GROUPS.find((g) => g.slugs.some((slug) => SERVICES[slug].title === service))?.id;
  const activeTab = tab || selectedGroupId || SERVICE_GROUPS[0].id;
  const activeGroup = SERVICE_GROUPS.find((g) => g.id === activeTab) ?? SERVICE_GROUPS[0];

  const next = async () => {
    if (await trigger(STEP_FIELDS[step])) setStep((s) => s + 1);
  };

  const addQuickFill = (text: string) => {
    const trimmed = message.trim();
    setValue("message", trimmed ? `${trimmed.replace(/[.,]$/, "")}, ${text.toLowerCase()}` : text, { shouldValidate: !!errors.message });
  };

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null);

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setSubmitError(body?.error ?? "Failed to submit quote request. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessPanel
        title="Quote request received!"
        message="Thanks for reaching out. We'll review your details and email you a personalised quote within 2 hours."
        actions={[
          { label: "Back to Home", href: ROUTES.HOME, primary: true },
          { label: "Book a Home Clean", href: ROUTES.BOOKING },
        ]}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 flex flex-col gap-6" noValidate>
      <Stepper steps={STEPS} current={step} />

      {/* ── Step 1: what you need ── */}
      <div className={step === 0 ? "flex flex-col gap-6" : "hidden"}>
        <div>
          <h2 className="text-xl font-bold text-brand-text">What do you need cleaned?</h2>
          <p className="text-sm text-brand-muted mt-1">Pick the closest match. Not sure? We&apos;ll help you choose.</p>
        </div>

        {/* One group at a time (tabs) instead of all 13 services in a list */}
        <div className="flex flex-col gap-3">
          <SegmentedTabs
            label="Service type"
            active={activeTab}
            onChange={setTab}
            tabs={SERVICE_GROUPS.map((g) => ({
              id: g.id,
              label: TAB_LABELS[g.id] ?? g.label,
              badge: g.slugs.some((slug) => SERVICES[slug].title === service),
            }))}
          />
          <div role="radiogroup" aria-label="Service" className="grid grid-cols-2 gap-2">
            {activeGroup.slugs.map((slug) => {
              const s = SERVICES[slug];
              return (
                <OptionTile
                  key={slug}
                  icon={s.icon}
                  title={serviceShortName(s).replace(/ Cleaning$/, "")}
                  selected={service === s.title}
                  onSelect={() => setValue("service", s.title, { shouldValidate: true })}
                />
              );
            })}
          </div>
          <OptionTile
            icon={HelpCircle}
            title="Not sure, help me choose"
            selected={service === NOT_SURE}
            onSelect={() => setValue("service", NOT_SURE, { shouldValidate: true })}
          />
          {errors.service?.message && <FormAlert>{errors.service.message}</FormAlert>}
        </div>

        <FormField
          label="Tell us about the job"
          htmlFor="quote-message"
          error={errors.message?.message}
        >
          <div className="flex flex-wrap gap-1.5 mb-1">
            {QUICK_FILLS.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => addQuickFill(text)}
                className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
              >
                <Plus className="w-3 h-3" /> {text}
              </button>
            ))}
          </div>
          <TextArea
            id="quote-message"
            {...register("message")}
            invalid={!!errors.message}
            rows={4}
            placeholder="Size of the space, how often, and anything special (pets, stairs, access)"
          />
        </FormField>

        <StickyActions>
          <Button type="button" onClick={next} className={primarySubmitClass}>
            Next: your details <ArrowRight className="w-4 h-4" />
          </Button>
        </StickyActions>
      </div>

      {/* ── Step 2: your details ── */}
      <div className={step === 1 ? "flex flex-col gap-5" : "hidden"}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-brand-text">Where should we send your quote?</h2>
            {service && (
              <p className="text-sm text-brand-muted mt-1">
                For: <span className="font-semibold text-brand-text">{service === NOT_SURE ? "Not sure yet" : service}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full name" htmlFor="quote-name" error={errors.name?.message}>
            <TextInput id="quote-name" icon={User} autoComplete="name" placeholder="First and last name" invalid={!!errors.name} {...register("name")} />
          </FormField>
          <FormField label="Phone" htmlFor="quote-phone" error={errors.phone?.message}>
            <TextInput id="quote-phone" icon={Phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="04XX XXX XXX" invalid={!!errors.phone} {...register("phone")} />
          </FormField>
          <FormField label="Email" htmlFor="quote-email" error={errors.email?.message}>
            <TextInput id="quote-email" icon={Mail} type="email" inputMode="email" autoComplete="email" placeholder="Where we'll send your quote" invalid={!!errors.email} {...register("email")} />
          </FormField>
          <FormField label="Suburb" htmlFor="quote-address" error={errors.address?.message} hint="Or full address if you prefer.">
            <TextInput id="quote-address" icon={MapPin} autoComplete="address-level2" placeholder="e.g. Berwick" invalid={!!errors.address} {...register("address")} />
          </FormField>
        </div>

        {submitError && <FormAlert>{submitError}</FormAlert>}

        <p className="text-center text-xs text-brand-muted">No commitment, and we&apos;ll never spam you.</p>
        <StickyActions>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => setStep(0)} aria-label="Back" className="h-12 w-12 shrink-0 rounded-xl border-brand-border p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button type="submit" disabled={isSubmitting} className={`${primarySubmitClass} w-auto flex-1`}>
              {isSubmitting ? "Sending..." : <>Get my free quote <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </div>
        </StickyActions>
      </div>
    </form>
  );
}
