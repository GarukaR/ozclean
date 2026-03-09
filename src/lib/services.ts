import { Building2, Home, Sparkles, ArrowLeftRight, Wind, LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  price: string;
  priceLabel: string;
  priceNote: string;
  heroImage: string;
  included: string[];
  highlights: { icon: string; label: string }[];
  faqs: { q: string; a: string }[];
  related: { slug: string; title: string; desc: string }[];
};

export const SERVICES: Record<string, Service> = {
  commercial: {
    slug: "commercial",
    icon: Building2,
    title: "Commercial Cleaning",
    tagline: "A workspace your team deserves.",
    description:
      "Professional commercial cleaning for offices, retail spaces, and businesses across Melbourne. We work around your schedule — not the other way around.",
    price: "From $150",
    priceLabel: "per visit",
    priceNote: "No lock-in contracts. Cancel or change anytime.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    included: [
      "All office areas, desks & workstations",
      "Kitchens, breakrooms & appliances",
      "Bathrooms & restrooms restocked",
      "Reception & meeting rooms",
      "Floors vacuumed, mopped & polished",
      "Glass partitions & windows wiped",
      "Bins emptied & replaced",
      "High-touch surfaces disinfected",
    ],
    highlights: [
      { icon: "🕐", label: "After-hours available" },
      { icon: "🛡", label: "Fully insured staff" },
      { icon: "👥", label: "Dedicated team" },
    ],
    faqs: [
      {
        q: "Can you work outside of business hours?",
        a: "Absolutely. Most of our commercial clients prefer early morning or after-hours cleaning so we don't disrupt their teams. We work 6am–10pm, 7 days a week.",
      },
      {
        q: "Are your staff insured and police-checked?",
        a: "Yes — every SparkClean team member is fully insured, police-checked, and has completed our in-house training program before visiting any commercial site.",
      },
      {
        q: "Do you bring your own equipment and products?",
        a: "We bring everything — commercial-grade equipment, eco-friendly cleaning products, and all consumables. You don't need to supply a thing.",
      },
      {
        q: "Can I get a regular dedicated team?",
        a: "Yes. We assign you a dedicated team so they get to know your space and your preferences inside out.",
      },
      {
        q: "What if I'm not happy with a clean?",
        a: "We offer a 100% satisfaction guarantee. If something isn't right, call us within 24 hours and we'll return to fix it at no extra charge.",
      },
    ],
    related: [
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough one-off clean for any space." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear windows inside and out." },
      { slug: "residential", title: "Residential Cleaning", desc: "Regular home cleaning done right." },
    ],
  },

  residential: {
    slug: "residential",
    icon: Home,
    title: "Residential Cleaning",
    tagline: "Your home, spotless. Every time.",
    description:
      "Reliable, friendly home cleaning tailored to your schedule. Whether weekly, fortnightly, or one-off — we treat your home like our own.",
    price: "From $80",
    priceLabel: "per visit",
    priceNote: "No commitment required. Cancel anytime.",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    included: [
      "All bedrooms cleaned & dusted",
      "Kitchen surfaces, sink & stovetop",
      "Bathrooms scrubbed & sanitised",
      "Vacuuming all carpets & rugs",
      "Mopping all hard floors",
      "Skirting boards & light switches",
      "Mirrors & glass surfaces",
      "Bins emptied throughout",
    ],
    highlights: [
      { icon: "💚", label: "Family & pet safe" },
      { icon: "🌿", label: "Eco-friendly products" },
      { icon: "🔄", label: "Same cleaner each visit" },
    ],
    faqs: [
      {
        q: "Do I need to be home during the clean?",
        a: "Not at all. Many of our clients provide a key or access code. Our staff are fully vetted and insured, so you can trust us with your home.",
      },
      {
        q: "Do you use eco-friendly products?",
        a: "Yes — we use only non-toxic, biodegradable cleaning products that are safe for children, pets, and the environment.",
      },
      {
        q: "Will I get the same cleaner each time?",
        a: "On fortnightly and weekly plans, we assign you a dedicated cleaner so they get to know your home and your preferences.",
      },
      {
        q: "How long does a standard clean take?",
        a: "A standard 3-bedroom home typically takes 2–3 hours. Larger homes or deep cleans may take longer — we'll let you know upfront.",
      },
      {
        q: "What if something gets missed?",
        a: "We have a 100% satisfaction guarantee. If anything isn't up to standard, contact us within 24 hours and we'll return to fix it free of charge.",
      },
    ],
    related: [
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough top-to-bottom clean." },
      { slug: "move", title: "Move In / Move Out", desc: "Leave your old place spotless or start fresh." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear windows inside and out." },
    ],
  },

  "deep-clean": {
    slug: "deep-clean",
    icon: Sparkles,
    title: "Deep Cleaning",
    tagline: "The clean your home actually needs.",
    description:
      "We go where regular cleaners don't. Inside the oven, behind the fridge, into every grout line — a true reset for your home or office.",
    price: "From $200",
    priceLabel: "per session",
    priceNote: "Exact quote provided upfront based on property size.",
    heroImage:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
    included: [
      "Inside oven, microwave & fridge",
      "Behind & under all appliances",
      "Grout lines scrubbed & treated",
      "Tile & bath deep scrub",
      "Skirting boards top to bottom",
      "Window sills & tracks",
      "Inside all cupboards & wardrobes",
      "Ceiling fans & light fittings",
      "Walls spot-cleaned",
      "All vents & exhaust fans",
    ],
    highlights: [
      { icon: "✨", label: "Top-to-bottom reset" },
      { icon: "🧪", label: "Professional-grade products" },
      { icon: "📋", label: "60-point checklist" },
    ],
    faqs: [
      {
        q: "How long does a deep clean take?",
        a: "A standard 3-bedroom home typically takes 4–6 hours. Larger homes or heavily soiled spaces may take longer — we'll give you an estimate upfront.",
      },
      {
        q: "How is a deep clean different from a regular clean?",
        a: "A regular clean covers surfaces and visible areas. A deep clean goes further — inside appliances, behind furniture, grout lines, vents, and areas usually skipped in routine cleans.",
      },
      {
        q: "Do I need to do anything to prepare?",
        a: "Ideally clear countertops and personal items from surfaces so we can access everything easily. We'll handle the rest.",
      },
      {
        q: "How often should I book a deep clean?",
        a: "Most customers book a deep clean once or twice a year alongside their regular cleaning. It's a great seasonal reset.",
      },
      {
        q: "Is the price fixed or variable?",
        a: "We quote based on the size of your property and its current condition. All pricing is agreed upfront — no surprises.",
      },
    ],
    related: [
      { slug: "residential", title: "Residential Cleaning", desc: "Keep your home consistently clean year-round." },
      { slug: "move", title: "Move In / Move Out", desc: "Bond-back clean for moving day." },
      { slug: "commercial", title: "Commercial Cleaning", desc: "Deep cleans for offices and workspaces." },
    ],
  },

  move: {
    slug: "move",
    icon: ArrowLeftRight,
    title: "Move In / Move Out",
    tagline: "Get your bond back. Guaranteed.",
    description:
      "Stress-free end-of-lease and move-in cleaning across Melbourne. We follow the real estate checklist so you don't have to worry.",
    price: "From $180",
    priceLabel: "per property",
    priceNote: "Exact quote based on number of rooms and property condition.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    included: [
      "Full kitchen deep clean including oven",
      "Bathroom & toilet scrubbed & sanitised",
      "All floors vacuumed & mopped",
      "Inside all cupboards & wardrobes",
      "Windows, tracks & sills cleaned",
      "Walls spot-cleaned",
      "Carpets vacuumed thoroughly",
      "Rubbish removed",
    ],
    highlights: [
      { icon: "🔑", label: "Bond-back guarantee" },
      { icon: "📋", label: "Real estate checklist" },
      { icon: "🔄", label: "Free re-clean if needed" },
    ],
    faqs: [
      {
        q: "Does this clean meet real estate / landlord standards?",
        a: "Yes. Our move out clean is designed to meet standard lease requirements. We follow a real-estate-approved checklist and offer a re-clean guarantee if the inspection doesn't pass.",
      },
      {
        q: "How soon before my inspection should I book?",
        a: "We recommend booking 1–2 days before your final inspection. This ensures the property is at its best when the agent arrives.",
      },
      {
        q: "Do you guarantee I'll get my bond back?",
        a: "We guarantee our clean meets the required standard. If any cleaning item is flagged at inspection, we'll return to fix it free of charge.",
      },
      {
        q: "Can you clean an empty property?",
        a: "Absolutely — in fact it's easier for us. We can access every surface without furniture in the way, which means a more thorough result.",
      },
      {
        q: "Do you clean carpets as part of this service?",
        a: "We vacuum and spot-clean carpets as standard. For steam cleaning or heavy staining, we offer this as an add-on — just let us know when booking.",
      },
    ],
    related: [
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough top-to-bottom clean." },
      { slug: "residential", title: "Residential Cleaning", desc: "Regular ongoing home cleaning." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear windows inside and out." },
    ],
  },

  windows: {
    slug: "windows",
    icon: Wind,
    title: "Window Cleaning",
    tagline: "See the world crystal clear.",
    description:
      "Streak-free, sparkling windows for homes and businesses. We use professional-grade tools and purified water — no smears, no residue, guaranteed.",
    price: "From $60",
    priceLabel: "per visit",
    priceNote: "Priced based on number of windows and property type.",
    heroImage:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    included: [
      "Inside & outside all windows",
      "Streak-free finish guaranteed",
      "Window frames & tracks wiped",
      "Sills cleaned & dried",
      "Sliding door glass panels",
      "Flyscreen cleaning (on request)",
      "Multi-storey access available",
      "Conservatories & skylights",
    ],
    highlights: [
      { icon: "👁", label: "Streak-free guarantee" },
      { icon: "🏢", label: "Multi-storey available" },
      { icon: "💧", label: "Purified water system" },
    ],
    faqs: [
      {
        q: "Do you clean windows on upper floors?",
        a: "Yes — we have the equipment to safely clean windows on multi-storey residential and commercial buildings. Just mention this when booking.",
      },
      {
        q: "What's your streak-free guarantee?",
        a: "We use professional-grade squeegees and purified water to ensure no streaks or residue. If you spot any streaks after we've finished, we'll come back and redo them for free.",
      },
      {
        q: "How often should I get my windows cleaned?",
        a: "For most homes, every 3–6 months is ideal. Commercial properties with high visibility benefit from monthly cleaning.",
      },
      {
        q: "Do I need to be home?",
        a: "For exterior-only cleaning you don't need to be home. For interior window cleaning, someone needs to provide access.",
      },
      {
        q: "Do you clean flyscreens?",
        a: "Yes — flyscreen cleaning can be added to any window clean. Just select this option when booking or mention it in your special instructions.",
      },
    ],
    related: [
      { slug: "residential", title: "Residential Cleaning", desc: "Keep your whole home spotless." },
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough clean for every surface." },
      { slug: "commercial", title: "Commercial Cleaning", desc: "Office and shopfront cleaning." },
    ],
  },
};

// Helper to get all slugs — used by generateStaticParams
export const getAllServiceSlugs = () => Object.keys(SERVICES);