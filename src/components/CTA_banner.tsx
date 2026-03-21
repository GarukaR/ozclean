import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA_banner() {
    return(
        <div className="bg-gradient-to-r from-brand to-brand-accent border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <p className="text-white font-semibold text-lg">Ready for a spotless home?</p>
                    <p className="text-white/80 text-sm">Book your first clean today — 20% off for new customers.</p>
                </div>
                <Button
                    asChild
                    className="bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold shrink-0 shadow-lg"
                >
                    <Link href="/book">Claim Now →</Link>
                </Button>
            </div>
        </div>
    );
}