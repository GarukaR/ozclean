"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { AlertCircle, Check, CheckCircle2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Shared form building blocks (Quote, Contact, Booking) ───────────────────
// Presentation only: fields still register with react-hook-form exactly as
// before, so validation and what gets submitted are unchanged.

const fieldBase =
  "w-full rounded-xl border bg-brand-surface text-base text-brand-text placeholder:text-brand-muted/70 shadow-sm transition focus:outline-none focus:ring-4";
const fieldOk = "border-brand-border focus:border-brand-accent focus:ring-brand-accent/15";
const fieldBad = "border-red-400 focus:border-red-500 focus:ring-red-500/15";

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  optional,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-brand-text">
        {label}
        {optional && <span className="ml-1 font-normal text-brand-muted">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      ) : (
        hint && <p className="text-xs text-brand-muted">{hint}</p>
      )}
    </div>
  );
}

export function TextInput({
  icon: Icon,
  invalid,
  className = "",
  ...props
}: ComponentProps<"input"> & { icon?: LucideIcon; invalid?: boolean }) {
  return (
    <div className="relative">
      {Icon && <Icon aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-brand-muted" />}
      <input
        aria-invalid={invalid || undefined}
        className={`${fieldBase} ${invalid ? fieldBad : fieldOk} h-12 ${Icon ? "pl-11" : "pl-4"} pr-4 ${className}`}
        {...props}
      />
    </div>
  );
}

export function TextArea({ invalid, className = "", ...props }: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={`${fieldBase} ${invalid ? fieldBad : fieldOk} px-4 py-3 resize-none ${className}`}
      {...props}
    />
  );
}

// Tappable choice (replaces dropdowns). Works as a radio when `selected` is a
// single value, or as a toggle for multi-select add-ons.
export function ChoiceCard({
  selected,
  onSelect,
  icon: Icon,
  title,
  subtitle,
  aside,
  disabled,
  compact,
}: {
  selected: boolean;
  onSelect: () => void;
  icon?: LucideIcon;
  title: string;
  subtitle?: ReactNode;
  aside?: ReactNode;
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`group relative w-full text-left rounded-2xl border transition-all ${compact ? "px-3.5 py-3" : "p-4"} flex items-center gap-3 disabled:opacity-45 disabled:cursor-not-allowed ${
        selected
          ? "border-brand-accent bg-brand-accent-bg ring-2 ring-brand-accent/40 shadow-sm"
          : "border-brand-border bg-brand-surface hover:border-brand-accent/50 hover:shadow-sm"
      }`}
    >
      {Icon && (
        <span className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors ${selected ? "bg-brand-accent text-white dark:text-[#0A1220]" : "bg-brand-accent-bg text-brand-accent-dark"}`}>
          <Icon className="w-5 h-5" />
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-brand-text leading-snug">{title}</span>
        {subtitle && <span className="block text-xs text-brand-muted mt-0.5 leading-snug">{subtitle}</span>}
      </span>
      {aside && <span className="shrink-0 text-sm font-bold text-brand-accent-dark">{aside}</span>}
      <span
        aria-hidden="true"
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
          selected ? "border-brand-accent bg-brand-accent text-white dark:text-[#0A1220]" : "border-brand-border"
        }`}
      >
        {selected && <Check className="w-3 h-3" strokeWidth={3} />}
      </span>
    </button>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Form progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex-1 flex flex-col gap-1.5" aria-current={active ? "step" : undefined}>
            <span className={`h-1.5 rounded-full transition-colors duration-300 ${done || active ? "bg-brand-accent" : "bg-brand-border"}`} />
            <span className={`text-[11px] sm:text-xs font-semibold ${active ? "text-brand-accent-dark" : done ? "text-brand-text" : "text-brand-muted"}`}>
              <span className="sm:hidden">{i + 1}. </span>
              <span className={active ? "" : "hidden sm:inline"}>{label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-950/40 dark:text-red-300">
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

export const primarySubmitClass =
  "w-full h-12 rounded-xl bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold text-base gap-2 shadow-lg shadow-brand-accent/30 disabled:opacity-70";

export function SuccessPanel({
  title,
  message,
  actions,
}: {
  title: string;
  message: string;
  actions?: { label: string; href: string; primary?: boolean }[];
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 gap-5">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-brand-accent/20 animate-ping motion-reduce:animate-none" />
        <div className="relative w-20 h-20 rounded-full bg-brand-accent-bg border border-brand-accent-border flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-brand-accent-dark" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-brand-text">{title}</h2>
        <p className="text-brand-muted text-sm max-w-sm leading-relaxed">{message}</p>
      </div>
      {actions && (
        <div className="flex flex-col sm:flex-row gap-3 mt-1 w-full sm:w-auto">
          {actions.map(({ label, href, primary }) => (
            <Button
              key={href}
              asChild
              className={
                primary
                  ? "h-11 rounded-xl bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold"
                  : "h-11 rounded-xl"
              }
              variant={primary ? "default" : "outline"}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// Segmented tabs: show one option group at a time instead of a long list.
export function SegmentedTabs({
  tabs,
  active,
  onChange,
  label,
}: {
  tabs: { id: string; label: string; badge?: boolean }[];
  active: string;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 rounded-2xl bg-brand-bg border border-brand-border p-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 shrink-0 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
              selected ? "bg-brand-surface text-brand-accent-dark shadow-sm" : "text-brand-muted hover:text-brand-text"
            }`}
          >
            {tab.label}
            {tab.badge && !selected && (
              <span aria-label="has your selection" className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-accent" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// Small selectable tile for dense grids (2 per row on phones).
export function OptionTile({
  selected,
  onSelect,
  title,
  meta,
  icon: Icon,
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  meta?: ReactNode;
  icon?: LucideIcon;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`relative min-h-[64px] rounded-2xl border px-3 py-2.5 text-left flex flex-col justify-center gap-0.5 transition-all disabled:opacity-45 disabled:cursor-not-allowed ${
        selected
          ? "border-brand-accent bg-brand-accent-bg ring-2 ring-brand-accent/40"
          : "border-brand-border bg-brand-surface hover:border-brand-accent/50"
      }`}
    >
      {selected && (
        <span aria-hidden="true" className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-brand-accent text-white dark:text-[#0A1220] flex items-center justify-center">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
      )}
      <span className="flex items-center gap-1.5 pr-5">
        {Icon && <Icon className="w-4 h-4 text-brand-accent-dark shrink-0" />}
        <span className="text-sm font-semibold text-brand-text leading-tight">{title}</span>
      </span>
      {meta && <span className="text-xs font-semibold text-brand-accent-dark">{meta}</span>}
    </button>
  );
}

// Action bar that sticks to the bottom of the screen while the form is in
// view, so "Next" (and the running total) never needs scrolling to find.
// `data-sticky-form` lets globals.css hide the back-to-top button on phones.
export function StickyActions({ children }: { children: ReactNode }) {
  return (
    <div
      data-sticky-form
      className="sticky bottom-0 z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] mt-1 border-t border-brand-border bg-brand-surface/95 backdrop-blur-md flex flex-col gap-2.5"
    >
      {children}
    </div>
  );
}
