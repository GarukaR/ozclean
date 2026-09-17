import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Page Not Found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-24">
      <Reveal className="max-w-lg w-full bg-brand-surface rounded-3xl border border-brand-border shadow-xl shadow-brand/8 p-10 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
          <Compass className="w-10 h-10 text-brand" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-brand-text tracking-tight">Page not found</h1>
          <p className="text-brand-muted text-base leading-relaxed mt-2">
            The page you were looking for has moved or never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <Button asChild className="flex-1 bg-brand hover:bg-brand-dark text-white font-semibold gap-2">
            <Link href={ROUTES.HOME}>
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 border-brand-border hover:border-brand">
            <Link href={ROUTES.SERVICES}>Browse Services</Link>
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
