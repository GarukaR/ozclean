"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { BUSINESS_PHONE, BUSINESS_PHONE_HREF } from "@/lib/business";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Unhandled error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-brand-border shadow-xl shadow-brand/8 p-10 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-brand-text tracking-tight">
            Something went wrong
          </h1>
          <p className="text-brand-muted text-base leading-relaxed mt-2">
            Sorry — this page failed to load. Trying again usually fixes it.
          </p>
          {error.digest && (
            <p className="text-xs text-brand-muted mt-3 font-mono">Reference: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <Button
            onClick={reset}
            className="flex-1 bg-brand hover:bg-brand-dark text-white font-semibold gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Try again
          </Button>
          <Button asChild variant="outline" className="flex-1 border-brand-border hover:border-brand">
            <Link href={ROUTES.HOME}>Back to Home</Link>
          </Button>
        </div>

        <a
          href={BUSINESS_PHONE_HREF}
          className="text-sm text-brand-muted hover:text-brand transition-colors"
        >
          Need help now? Call {BUSINESS_PHONE}
        </a>
      </div>
    </main>
  );
}
