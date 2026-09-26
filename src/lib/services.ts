import { Building, Building2, Home, Sparkles, ArrowLeftRight, Wind, Trash2, Store, Stethoscope, Layers, Sofa, BedDouble, LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  // Keyword-led name used for the page's <h1> and <title>, phrased the way
  // people actually search (e.g. "end of lease", "wheelie bin").
  seoTitle: string;
  tagline: string;
  description: string;
  // Optional longer "who it's for / how we work" copy for the detail page.
  intro?: string[];
  price: string;
  priceLabel: string;
  priceNote: string;
  bookable: boolean;
  heroImage: string;
  included: string[];
  highlights: { icon: string; label: string }[];
  faqs: { q: string; a: string }[];
  related: { slug: string; title: string; desc: string }[];
};

export type PromoOffer = {
  id: string;
  icon: "sparkles" | "gift" | "users" | "sun";
  label: string;
  deal: string;
  description: string;
  code: string;
  color: string;
  iconBg: string;
};

export const HOME_PROMO_OFFERS: PromoOffer[] = [
  {
    id: "first-clean",
    icon: "sparkles",
    label: "First Clean",
    deal: "20% off",
    description: "New customers get 20% off their first booking.",
    code: "FIRST20",
    color: "bg-brand/10 text-brand border-brand/20",
    iconBg: "bg-brand/15",
  },
  {
    id: "bundle-deal",
    icon: "gift",
    label: "Bundle Deal",
    deal: "Book 3, Get 1 Free",
    description: "Book any 3 cleans and get the 4th completely free.",
    code: "BUNDLE4",
    color: "bg-brand-accent-bg text-brand-accent-dark border-brand-accent-border",
    iconBg: "bg-brand-accent/10",
  },
  {
    id: "referral",
    icon: "users",
    label: "Referral",
    deal: "$30 credit",
    description: "Refer a friend: you both get $30 off your next clean.",
    code: "REFER30",
    color: "bg-brand-bg text-brand-dark border-brand-border",
    iconBg: "bg-brand/10",
  },
  {
    id: "spring-special",
    icon: "sun",
    label: "Spring Special",
    deal: "15% off deep cleans",
    description: "Book a deep clean this spring and save 15%. Limited slots.",
    code: "SPRING15",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100",
  },
];

const SERVICE_CATALOG: Record<string, Service> = {
  commercial: {
    slug: "commercial",
    icon: Building2,
    title: "Office & Commercial Cleaning",
    seoTitle: "Office & Commercial Cleaning in South East Melbourne",
    tagline: "A workspace your team deserves.",
    description: "Reliable office and retail cleaning, scheduled around your business hours.",
    intro: [
      "A clean office is one less distraction for your team and a better first impression for clients. We clean small and medium offices, studios and shared workspaces across South East Melbourne, before or after business hours so work isn't interrupted.",
      "We build a checklist around your space, from desks, kitchens and bathrooms to meeting rooms and glass, and send the same team each visit. Choose daily, weekly or fortnightly cleaning, with no lock-in contracts.",
    ],
    price: "From $150",
    priceLabel: "per visit",
    priceNote: "No lock-in contracts. Cancel or change anytime.",
    bookable: false,
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
      "Common Areas like stairs, lift, lobby, bin area and parking cleaned & sanitised",
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
        a: "Every OzClean team member is fully insured, police-checked, and has completed our in-house training program before visiting any commercial site.",
      },
      {
        q: "Do you bring your own equipment and products?",
        a: "We bring everything: commercial-grade equipment, eco-friendly cleaning products, and all consumables. You don't need to supply a thing.",
      },
      {
        q: "Can I get a regular dedicated team?",
        a: "We assign you a dedicated team so they get to know your space and your preferences inside out.",
      },
      {
        q: "What if I'm not happy with a clean?",
        a: "We back every commercial clean with a 100% satisfaction guarantee, call us within 24 hours of any issue and we'll send the team back at no extra charge.",
      },
    ],
    related: [
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough one-off clean for any space." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear windows inside and out." },
   ],
  },

  residential: {
    slug: "residential",
    icon: Home,
    title: "Residential Cleaning",
    seoTitle: "House Cleaning in South East Melbourne",
    tagline: "Your home, spotless. Every time.",
    description: "Flexible home cleaning, weekly to one-off, on your schedule.",
    intro: [
      "Regular house cleaning takes one more job off your list. Choose a flat rate by number of bedrooms for a full top-to-bottom clean, or book by the hour and tell us what to focus on, weekly, fortnightly, monthly or one-off.",
      "On regular plans you'll usually have the same cleaner, so they learn your home and how you like it. We bring our own equipment and non-toxic products, and home cleans can be booked and paid online in a few minutes.",
    ],
    price: "$50–60/hr or $150–280",
    priceLabel: "hourly or flat-rate",
    priceNote: "Hourly rates from $50–60/hr (depending on frequency). Flat-rates from $150–280 based on bedrooms. No commitment required.",
    bookable: true,
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
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
        a: "We use only non-toxic, biodegradable cleaning products that are safe for children, pets, and the environment.",
      },
      {
        q: "Will I get the same cleaner each time?",
        a: "On fortnightly and weekly plans, we assign you a dedicated cleaner so they get to know your home and your preferences.",
      },
      {
        q: "How long does a standard clean take?",
        a: "A standard 3-bedroom home typically takes 2–3 hours, though larger homes or deep cleans may take longer, and we'll let you know upfront.",
      },
      {
        q: "What if something gets missed?",
        a: "Every clean comes with a 100% satisfaction guarantee. Contact us within 24 hours of anything not up to standard and we'll come back to fix it, free of charge.",
      },
    ],
    related: [
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough top-to-bottom clean." },
      { slug: "move", title: "Move In / Move Out", desc: "Leave your old place spotless or start fresh." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear windows inside and out." },
    ],
  },

    airbnb: {
      slug: "airbnb",
      icon: Building2,
      title: "Airbnb & Short-Term Rental Cleaning",
      seoTitle: "Airbnb Cleaning in South East Melbourne",
      tagline: "Fast turnovers. Five-star guest impressions.",
      description: "Fast, consistent turnovers between guest stays: reset, restocked, ready.",
      intro: [
        "Between guests you have a few hours and a reputation on the line. We turn Airbnb and short-stay properties around fast: beds made with your linen, bathrooms and kitchen reset, bins emptied and surfaces wiped so the place looks like your listing photos.",
        "We work with key safes, lockboxes and smart locks, can restock the guest essentials you supply, and let you know straight away if a guest has left damage or something needs attention. Same-day and next-day turnovers are available across South East Melbourne, subject to timing.",
      ],
      price: "From $60/hr or custom turnover quote",
      priceLabel: "hourly or turnover rate",
      priceNote: "Flexible pricing for same-day, next-day, or scheduled changeovers. Request a custom quote based on property size and turnaround needs.",
      bookable: false,
      heroImage:
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
      included: [
        "Bedrooms reset, dusted & vacuumed",
        "Beds made with fresh linen",
        "Bathrooms scrubbed, sanitised & restocked",
        "Kitchen cleaned, surfaces wiped & dishes checked",
        "Floors vacuumed and mopped throughout",
        "Bins emptied and liners replaced",
        "High-touch points sanitised between guests",
        "Light tidying and presentation ready for check-in",
      ],
      highlights: [
        { icon: "⏱️", label: "Quick guest turnover" },
        { icon: "✨", label: "Hotel-standard presentation" },
        { icon: "🔑", label: "Key safe or smart lock access" },
      ],
      faqs: [
        {
          q: "Can you clean between same-day checkout and check-in?",
          a: "We offer fast turnaround cleaning for short-term rentals, subject to availability and access timing.",
        },
        {
          q: "Do you change bed linen and towels?",
          a: "We can make beds with supplied linen and replace towels so the property is ready for the next guest.",
        },
        {
          q: "Can you restock guest essentials?",
          a: "On request, we can restock toiletries, tea, coffee, paper products, and other host-supplied essentials.",
        },
        {
          q: "Do you work with key safes or smart locks?",
          a: "Yes, we regularly service Airbnb properties with key safes, lockboxes, and smart lock access.",
        },
        {
          q: "What if a guest leaves the property messy?",
          a: "We can handle heavier reset cleans as needed. If extra work is required, we'll let you know before proceeding.",
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
    title: "Spring Deep Cleaning",
    seoTitle: "Deep Cleaning in South East Melbourne",
    tagline: "The clean your home actually needs.",
    description: "A top-to-bottom reset: ovens, fridges, grout, every missed spot.",
    intro: [
      "A deep clean gets to everything a regular clean skips: inside the oven and fridge, behind appliances, grout lines, vents, skirting boards and window tracks. It's the reset most homes need once or twice a year.",
      "It's a popular choice before a family event, after renovations, when moving in, or to get a home back on track before starting regular cleans. We quote upfront based on the size and condition of your home.",
    ],
    price: "From $200",
    priceLabel: "per session",
    priceNote: "Exact quote provided upfront based on property size.",
    bookable: false,
    heroImage:
      "https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg",
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
        a: "A standard 3-bedroom home typically takes 4–6 hours. Larger homes or heavily soiled spaces may take longer, and we'll give you an estimate upfront.",
      },
      {
        q: "How is a deep clean different from a regular clean?",
        a: "A regular clean covers surfaces and visible areas. A deep clean goes further: inside appliances, behind furniture, grout lines, vents, and areas usually skipped in routine cleans.",
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
        a: "We quote based on the size of your property and its current condition. All pricing is agreed upfront, no surprises.",
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
    seoTitle: "End of Lease Cleaning in South East Melbourne",
    tagline: "Get your bond back. Guaranteed.",
    description: "End-of-lease cleaning that follows the real estate checklist.",
    intro: [
      "Getting your bond back comes down to the final inspection. Our end of lease clean follows the checklist real estate agents use: inside the oven and cupboards, bathrooms scrubbed, skirting boards, window tracks, light switches and floors, so nothing gets flagged.",
      "Book one or two days before your inspection. If anything cleaning-related is raised at the inspection, we come back and fix it free. Need the carpets done too? We can steam clean them on the same visit and give you an invoice for your agent.",
    ],
    price: "From $180",
    priceLabel: "per property",
    priceNote: "Exact quote based on number of rooms and property condition.",
    bookable: false,
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
        a: "Absolutely, it's actually easier for us. We can access every surface without furniture in the way, which means a more thorough result.",
      },
      {
        q: "Do you clean carpets as part of this service?",
        a: "We vacuum and spot-clean carpets as standard. Steam cleaning or heavy staining is available as an add-on, just let us know when booking.",
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
    seoTitle: "Window Cleaning in South East Melbourne",
    tagline: "See the world crystal clear.",
    description: "Streak-free windows, inside and out, guaranteed.",
    intro: [
      "Clean windows make a whole home or shopfront look brighter. We clean glass inside and out, plus frames, tracks and sills, for single and multi-storey homes and small businesses across South East Melbourne.",
      "We use purified water and professional squeegees for a streak-free finish, and flyscreens can be added on request. If you spot streaks after we finish, we'll come back and redo them.",
    ],
    price: "From $250",
    priceLabel: "per storey",
    priceNote: "Pricing calculated based on your property's storeys and window count. Multi-storey access available.",
    bookable: false,
    heroImage:
      "https://images.pexels.com/photos/31435403/pexels-photo-31435403.jpeg",
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
        a: "We have the equipment to safely clean windows on multi-storey residential and commercial buildings, just mention this when booking.",
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
        a: "Flyscreen cleaning can be added to any window clean, just select this option when booking or mention it in your special instructions.",
      },
    ],
    related: [
      { slug: "residential", title: "Residential Cleaning", desc: "Keep your whole home spotless." },
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough clean for every surface." },
      { slug: "commercial", title: "Commercial Cleaning", desc: "Office and shopfront cleaning." },
    ],
  },

  "retail-cleaning": {
    slug: "retail-cleaning",
    icon: Store,
    title: "Retail & Shop Cleaning",
    seoTitle: "Retail & Shop Cleaning in South East Melbourne",
    tagline: "A shop floor that sells. Every morning.",
    description: "Before-open or after-close cleaning for shops, boutiques and showrooms.",
    intro: [
      "Customers judge a shop in the first few seconds: smudged glass, dusty shelves or a grubby fitting room can cost you a sale before anyone says hello. We clean boutiques, clothing stores, gift shops, salons, showrooms and other small retail spaces so your floor looks its best when the doors open.",
      "We work around your trading hours, early morning before you open or in the evening after you close, so there's never a mop bucket in the way of a customer. Choose daily, a few times a week or weekly, and we'll build a checklist around your fit-out, your floors and your busiest days.",
    ],
    price: "Free quote",
    priceLabel: "tailored to your shop",
    priceNote: "Every shop is different, so we quote on your floor size, fit-out and how often you need us. No lock-in contracts.",
    bookable: false,
    heroImage: "https://images.pexels.com/photos/37941666/pexels-photo-37941666.jpeg",
    included: [
      "Shopfront glass, entry doors & window displays",
      "Shelving, racks & display units dusted",
      "Counters & checkout area wiped & sanitised",
      "Fitting rooms, mirrors & curtains refreshed",
      "Floors vacuumed, swept & mopped",
      "Staff room & kitchenette cleaned",
      "Customer & staff bathrooms sanitised",
      "Bins emptied & liners replaced",
      "High-touch points like door handles & EFTPOS disinfected",
    ],
    highlights: [
      { icon: "🕐", label: "Before open or after close" },
      { icon: "🪟", label: "Streak-free shopfront glass" },
      { icon: "📋", label: "Checklist built for your store" },
    ],
    faqs: [
      {
        q: "Can you clean before we open or after we close?",
        a: "Yes, that's how most retail businesses prefer it. We can come early in the morning or after closing so cleaning never gets in the way of customers.",
      },
      {
        q: "What types of shops do you clean?",
        a: "Boutiques, clothing and shoe stores, gift shops, salons, showrooms and other small to medium retail spaces across South East Melbourne.",
      },
      {
        q: "How often should a shop be cleaned?",
        a: "Busy stores usually need a daily or every-second-day clean, while quieter shops often do well with two or three visits a week. We'll recommend a schedule when we quote.",
      },
      {
        q: "Do we need to be there while you clean?",
        a: "No. Many shops give us a key or alarm code so we can clean after hours. All our cleaners are police-checked and insured.",
      },
      {
        q: "Are we locked into a contract?",
        a: "No lock-in contracts. You can change your schedule or cancel with reasonable notice.",
      },
    ],
    related: [
      { slug: "commercial", title: "Office & Commercial Cleaning", desc: "Regular cleaning for offices and workspaces." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear glass inside and out." },
      { slug: "carpet-cleaning", title: "Carpet Cleaning", desc: "Deep steam cleaning for carpeted floors." },
    ],
  },

  "medical-centre-cleaning": {
    slug: "medical-centre-cleaning",
    icon: Stethoscope,
    title: "Medical Centre & Clinic Cleaning",
    seoTitle: "Medical Centre & Clinic Cleaning in South East Melbourne",
    tagline: "Clinic-clean for your patients. Every visit.",
    description: "Hygiene-focused cleaning for GP clinics, dental, physio and allied health practices.",
    intro: [
      "Patients notice a clinic's cleanliness straight away, and in a healthcare setting it matters more than anywhere. We clean GP clinics, dental surgeries, physiotherapy and allied health practices, and specialist consulting rooms, with a focus on the high-touch surfaces and shared areas where germs spread.",
      "We use hospital-grade disinfectants and colour-coded cloths and mops, so cloths used in bathrooms are never used on reception or treatment-room surfaces. Cleaning happens after hours or between sessions to suit your appointment book, with the same team each visit so they learn your rooms and your requirements.",
    ],
    price: "Free quote",
    priceLabel: "tailored to your practice",
    priceNote: "Quoted on the number of rooms, how often you need us and any special requirements. No lock-in contracts.",
    bookable: false,
    heroImage: "https://images.pexels.com/photos/7108351/pexels-photo-7108351.jpeg",
    included: [
      "Waiting room chairs, tables & reception counters",
      "Treatment & consult room surfaces wiped & disinfected",
      "Examination beds & chairs cleaned (non-clinical surfaces)",
      "High-touch points: door handles, light switches, pens, EFTPOS",
      "Bathrooms scrubbed, sanitised & restocked",
      "Hard floors vacuumed & mopped with disinfectant",
      "Staff kitchen & break room cleaned",
      "General waste & recycling bins emptied",
      "Colour-coded cloths to prevent cross-contamination",
    ],
    highlights: [
      { icon: "🧴", label: "Hospital-grade disinfectants" },
      { icon: "🎨", label: "Colour-coded cleaning system" },
      { icon: "🌙", label: "After-hours cleaning" },
    ],
    faqs: [
      {
        q: "What kinds of practices do you clean?",
        a: "GP clinics, medical centres, dental surgeries, physiotherapy, chiropractic, podiatry, psychology and other allied health or specialist consulting rooms.",
      },
      {
        q: "Do you handle clinical or sharps waste?",
        a: "No. Clinical, sharps and other regulated medical waste should stay with your licensed waste contractor. We take care of general waste and recycling.",
      },
      {
        q: "Can you clean outside of our consulting hours?",
        a: "Yes. Most practices prefer us to come after the last appointment or before the first, so patients are never disturbed.",
      },
      {
        q: "How do you prevent cross-contamination?",
        a: "We use a colour-coded system for cloths and mops, so each area such as bathrooms, reception and treatment rooms has its own set. High-touch surfaces are disinfected on every visit.",
      },
      {
        q: "Are your cleaners police-checked?",
        a: "Yes. Every OzClean cleaner is police-checked and insured, and we can send the same team each visit.",
      },
    ],
    related: [
      { slug: "commercial", title: "Office & Commercial Cleaning", desc: "Regular cleaning for offices and workspaces." },
      { slug: "carpet-cleaning", title: "Carpet Cleaning", desc: "Steam cleaning for waiting-room carpets." },
      { slug: "upholstery-cleaning", title: "Couch & Upholstery Cleaning", desc: "Refresh fabric waiting-room chairs." },
    ],
  },

  "strata-cleaning": {
    slug: "strata-cleaning",
    icon: Building,
    title: "Strata & Common Area Cleaning",
    seoTitle: "Strata & Owners Corporation Cleaning in South East Melbourne",
    tagline: "Shared spaces residents are proud of.",
    description: "Scheduled common-area cleaning for owners corporations, apartments and townhouse complexes.",
    intro: [
      "Lobbies, hallways and stairwells are the first thing residents, buyers and visitors see. We keep common areas clean for owners corporations, apartment blocks, townhouse complexes and small mixed-use buildings, on a weekly, fortnightly or monthly schedule that suits your budget.",
      "We work to an agreed checklist for your building and can send the owners corporation manager a short photo report after each visit, so committee members know exactly what was done without having to check. Small office tenancies and shared business spaces can be added to the same visit.",
    ],
    price: "Free quote",
    priceLabel: "tailored to your building",
    priceNote: "Quoted on the size of your common areas and how often you need us. We're happy to quote directly to your owners corporation manager.",
    bookable: false,
    heroImage: "https://images.pexels.com/photos/7031907/pexels-photo-7031907.jpeg",
    included: [
      "Entry lobbies, foyers & glass entry doors",
      "Hallways & corridors vacuumed or mopped",
      "Stairwells & handrails cleaned",
      "Lift interiors, buttons & mirrors wiped",
      "Letterbox & mail areas dusted",
      "Bin rooms swept & bin areas hosed (where accessible)",
      "Car park & driveway litter pick-up and sweeping",
      "Cobweb removal from ceilings & light fittings",
      "Photo report to your OC manager after each visit",
    ],
    highlights: [
      { icon: "📅", label: "Weekly or fortnightly schedule" },
      { icon: "📸", label: "Photo report after each visit" },
      { icon: "🏢", label: "Apartments & townhouse complexes" },
    ],
    faqs: [
      {
        q: "What's the difference between strata, body corporate and owners corporation cleaning?",
        a: "They're the same thing. In Victoria the legal term is owners corporation, while other states say strata or body corporate. It covers cleaning of the shared areas of a building rather than individual units.",
      },
      {
        q: "How often should common areas be cleaned?",
        a: "Most small to medium buildings do well with a weekly or fortnightly clean. High-traffic buildings may need more. We'll recommend a schedule when we inspect and quote.",
      },
      {
        q: "Can you quote directly to our owners corporation manager?",
        a: "Yes. We can send the quote, schedule and checklist straight to your OC manager, and invoice the owners corporation directly.",
      },
      {
        q: "Do you clean small offices as well?",
        a: "Yes. We clean small offices and shared workspaces, either on their own or combined with a building's common-area visit.",
      },
      {
        q: "How will we know the clean has been done?",
        a: "After each visit we can send a short photo report of the areas cleaned, so the committee has a record without needing to check in person.",
      },
    ],
    related: [
      { slug: "commercial", title: "Office & Commercial Cleaning", desc: "Regular cleaning for small offices." },
      { slug: "windows", title: "Window Cleaning", desc: "Entry glass and common-area windows." },
      { slug: "wheely-bin", title: "Wheelie Bin Cleaning", desc: "Fresh, odour-free bins for the whole building." },
    ],
  },

  "carpet-cleaning": {
    slug: "carpet-cleaning",
    icon: Layers,
    title: "Carpet Steam Cleaning",
    seoTitle: "Carpet Steam Cleaning in South East Melbourne",
    tagline: "Carpets that look and feel fresh again.",
    description: "Hot water extraction (steam) cleaning for homes, rentals and end of lease.",
    intro: [
      "Everyday vacuuming picks up surface dirt, but the grit, oils and allergens that make carpet look flat and grey sit deep in the pile. We use hot water extraction, the method most people call steam cleaning, to flush that out and lift the fibres again.",
      "It pairs well with an end of lease clean: if your lease or agent asks for professional carpet cleaning, we can do both on the same day and give you an invoice for your records. We also clean carpets in homes, Airbnb properties, offices and waiting rooms.",
    ],
    price: "Free quote",
    priceLabel: "per room or whole home",
    priceNote: "Quoted on the number of rooms or total area and the condition of the carpet. Ask about combining it with an end of lease clean.",
    bookable: false,
    heroImage: "https://images.pexels.com/photos/4107278/pexels-photo-4107278.jpeg",
    included: [
      "Pre-vacuum of all carpeted areas",
      "Pre-treatment of high-traffic areas",
      "Spot treatment of common stains",
      "Hot water extraction (steam) cleaning",
      "Deodorising treatment on request",
      "Pet odour treatment on request",
      "Furniture moved and replaced where practical",
      "Invoice provided for end of lease records",
    ],
    highlights: [
      { icon: "💧", label: "Hot water extraction method" },
      { icon: "🔑", label: "Pairs with end of lease cleans" },
      { icon: "🐾", label: "Pet odour treatment available" },
    ],
    faqs: [
      {
        q: "Is steam cleaning the same as hot water extraction?",
        a: "Yes. Steam cleaning is the everyday name for hot water extraction, where hot water and cleaning solution are sprayed into the carpet and extracted straight back out along with the dirt.",
      },
      {
        q: "How long does carpet take to dry?",
        a: "Usually a few hours, depending on the carpet, the weather and ventilation. Opening windows or running a fan or air conditioner helps it dry faster.",
      },
      {
        q: "Do I need carpet cleaning for my end of lease?",
        a: "It depends on your lease and the condition of the carpet. If your agent asks for it, we can do it together with your end of lease clean and give you an invoice.",
      },
      {
        q: "Can you remove every stain?",
        a: "We treat common stains like food, drinks, mud and pet accidents, and most come out or fade significantly. Some old or set-in stains, such as dyes or bleach marks, may be permanent. We'll tell you honestly before we start.",
      },
      {
        q: "Do I need to move my furniture?",
        a: "We can move light furniture ourselves. Please move fragile items and anything small off the floor before we arrive.",
      },
    ],
    related: [
      { slug: "move", title: "End of Lease Cleaning", desc: "Bond-back clean for moving day." },
      { slug: "upholstery-cleaning", title: "Couch & Upholstery Cleaning", desc: "Refresh fabric couches and chairs." },
      { slug: "mattress-cleaning", title: "Mattress Cleaning", desc: "Deep clean and deodorise your mattress." },
    ],
  },

  "upholstery-cleaning": {
    slug: "upholstery-cleaning",
    icon: Sofa,
    title: "Couch & Upholstery Cleaning",
    seoTitle: "Couch & Upholstery Cleaning in South East Melbourne",
    tagline: "Bring your couch back to life.",
    description: "Deep cleaning for fabric couches, lounges, dining chairs and cushions.",
    intro: [
      "Couches soak up everything: spills, body oils, pet hair and the everyday grime that slowly dulls the fabric. We deep clean fabric sofas, sectionals, recliners, armchairs, dining chairs, ottomans and cushions to lift out dirt and odours and brighten the colour again.",
      "Every fabric is different, so we check the care label and test a hidden spot before we start, then choose the right method and solution for your upholstery. It's a popular add-on for Airbnb hosts between guests and for families with kids or pets.",
    ],
    price: "Free quote",
    priceLabel: "per seat or piece",
    priceNote: "Quoted on the number of seats or pieces, the fabric type and any stains. Combine it with carpet cleaning and save on a single visit.",
    bookable: false,
    heroImage: "https://images.pexels.com/photos/9462191/pexels-photo-9462191.jpeg",
    included: [
      "Fabric type check & colourfast test",
      "Thorough vacuum including crevices & under cushions",
      "Pre-treatment of arms, headrests & high-contact areas",
      "Spot treatment of common stains",
      "Deep clean with a fabric-appropriate method",
      "Deodorising treatment on request",
      "Removable cushions cleaned both sides",
      "Dining chairs, ottomans & armchairs",
    ],
    highlights: [
      { icon: "🛋️", label: "Sofas, chairs & cushions" },
      { icon: "🧪", label: "Fabric tested before cleaning" },
      { icon: "🐾", label: "Pet hair & odour treatment" },
    ],
    faqs: [
      {
        q: "What types of upholstery do you clean?",
        a: "Most fabric and microfibre upholstery, including sofas, sectionals, recliners, armchairs, dining chairs, ottomans and cushions. For leather or delicate fabrics like silk and velvet, please mention it when you ask for a quote.",
      },
      {
        q: "How long does a couch take to dry?",
        a: "Usually a few hours, depending on the fabric and ventilation. We recommend not sitting on it until it's fully dry.",
      },
      {
        q: "Will it remove pet smells?",
        a: "We treat pet odours as part of the clean and can add a deodorising treatment. Heavy or long-term odours may need more than one treatment.",
      },
      {
        q: "Is it safe for kids and pets?",
        a: "Yes. We use products suited to household furniture and make sure they're properly extracted, so no harsh residue is left behind.",
      },
      {
        q: "Can I combine it with carpet or mattress cleaning?",
        a: "Yes, and it's the most cost-effective way to do it. Mention everything you'd like cleaned when you ask for a quote.",
      },
    ],
    related: [
      { slug: "carpet-cleaning", title: "Carpet Cleaning", desc: "Deep steam cleaning for carpets." },
      { slug: "mattress-cleaning", title: "Mattress Cleaning", desc: "Deep clean and deodorise your mattress." },
      { slug: "airbnb", title: "Airbnb Cleaning", desc: "Fast turnovers between guest stays." },
    ],
  },

  "mattress-cleaning": {
    slug: "mattress-cleaning",
    icon: BedDouble,
    title: "Mattress Cleaning",
    seoTitle: "Mattress Cleaning in South East Melbourne",
    tagline: "A fresher, cleaner night's sleep.",
    description: "Deep mattress cleaning to lift stains, odours, dust and allergens.",
    intro: [
      "You spend about a third of your life on your mattress, and over time it collects sweat, skin flakes, dust and spills that a sheet change never reaches. A deep clean lifts stains and odours and helps reduce the dust and allergens that build up inside.",
      "We clean single, double, queen and king mattresses in homes, rentals and Airbnb properties. It's a good idea once or twice a year, after an illness or accident, when moving into a new place, or for hosts who want guests to sleep on a genuinely fresh bed.",
    ],
    price: "Free quote",
    priceLabel: "per mattress",
    priceNote: "Quoted by mattress size and number of mattresses, and whether one or both sides need cleaning.",
    bookable: false,
    heroImage: "https://images.pexels.com/photos/8089076/pexels-photo-8089076.jpeg",
    included: [
      "Thorough vacuum of the top, sides & seams",
      "Stain pre-treatment (sweat, drinks, urine & more)",
      "Deep clean of the sleeping surface",
      "Odour neutralising treatment",
      "Sanitising treatment",
      "Second side cleaned on request",
      "Single, double, queen & king sizes",
    ],
    highlights: [
      { icon: "🛏️", label: "All mattress sizes" },
      { icon: "🌬️", label: "Odour & stain treatment" },
      { icon: "🤧", label: "Helps reduce dust & allergens" },
    ],
    faqs: [
      {
        q: "How often should a mattress be cleaned?",
        a: "Once or twice a year works for most homes. More often if you have allergies, pets on the bed or young children, or after an illness or accident.",
      },
      {
        q: "How long before I can sleep on it?",
        a: "Usually a few hours, depending on ventilation and the weather. We'll let you know on the day, and it's best to make the bed once it's completely dry.",
      },
      {
        q: "Can you remove urine or sweat stains?",
        a: "We treat these common stains and odours, and most improve significantly. Very old or deep stains may not disappear completely, and we'll be upfront about that before we start.",
      },
      {
        q: "Does it get rid of dust mites?",
        a: "A deep clean removes a lot of the dust and debris dust mites feed on and helps reduce allergens. No clean can make a mattress permanently mite-free, so regular cleaning and washing bedding hot is the best approach.",
      },
      {
        q: "Do you clean mattresses for Airbnb hosts?",
        a: "Yes. Hosts often book mattress cleaning between guests or alongside a deep clean of the property. Ask about combining it with your turnover cleans.",
      },
    ],
    related: [
      { slug: "upholstery-cleaning", title: "Couch & Upholstery Cleaning", desc: "Refresh fabric couches and chairs." },
      { slug: "carpet-cleaning", title: "Carpet Cleaning", desc: "Deep steam cleaning for carpets." },
      { slug: "airbnb", title: "Airbnb Cleaning", desc: "Fast turnovers between guest stays." },
    ],
  },

  "wheely-bin": {
    slug: "wheely-bin",
    icon: Trash2,
    title: "Wheely Bin Cleaning",
    seoTitle: "Wheelie Bin Cleaning in South East Melbourne",
    tagline: "Fresh bins. Cleaner property.",
    description: "High-pressure cleaning and sanitising to keep bins fresh.",
    intro: [
      "Bins get smelly fast, especially in summer. We pressure wash your wheelie bins inside and out, disinfect and deodorise them, and leave them fresh so they stop attracting flies and pests.",
      "Pricing is per bin and you can book online in a minute. You don't need to be home: leave the bins out and we'll let you know when they're done. Most households book every four to eight weeks.",
    ],
    price: "From $35",
    priceLabel: "per bin",
    priceNote: "Final price is calculated by number of bins.",
    bookable: true,
    heroImage:
      "https://images.pexels.com/photos/36002401/pexels-photo-36002401.jpeg",
    included: [
      "High-pressure internal wash",
      "External scrub and rinse",
      "Eco-friendly disinfectant treatment",
      "Lid, rims and handles cleaned",
      "Odour treatment and deodorising",
      "Quick dry finish",
    ],
    highlights: [
      { icon: "🧼", label: "Hygiene focused" },
      { icon: "🌿", label: "Eco-friendly products" },
      { icon: "💨", label: "Odour reduction" },
    ],
    faqs: [
      {
        q: "How is wheely bin cleaning priced?",
        a: "Pricing is per bin. Add the number of bins during booking and we'll calculate your total instantly.",
      },
      {
        q: "What type of bins do you clean?",
        a: "We clean standard household wheely bins including general waste, recycling, and green waste bins.",
      },
      {
        q: "Do you use harsh chemicals?",
        a: "No. We use eco-friendly disinfectants designed to remove bacteria and odours while being safe for residential areas.",
      },
      {
        q: "How often should bins be cleaned?",
        a: "Most households book every 4-8 weeks. If you have pets, kids, or high usage, monthly cleaning works best.",
      },
      {
        q: "Do I need to be home?",
        a: "No. As long as bins are accessible outside, we can complete the clean and notify you once done.",
      },
    ],
    related: [
      { slug: "residential", title: "Residential Cleaning", desc: "Keep your whole home spotless." },
      { slug: "windows", title: "Window Cleaning", desc: "Crystal-clear windows inside and out." },
      { slug: "deep-clean", title: "Deep Cleaning", desc: "A thorough clean for every surface." },
    ],
  },
};

// Display order everywhere services are listed (services page, mobile menu,
// quote form): specialties first, then the business and upholstery services
// the owner wants to push, then the everyday home services.
const SERVICE_ORDER = [
  "airbnb",
  "move",
  "retail-cleaning",
  "medical-centre-cleaning",
  "strata-cleaning",
  "commercial",
  "carpet-cleaning",
  "upholstery-cleaning",
  "mattress-cleaning",
  "residential",
  "deep-clean",
  "windows",
  "wheely-bin",
] as const;

export const SERVICES: Record<string, Service> = Object.fromEntries(
  SERVICE_ORDER.map((slug) => [slug, SERVICE_CATALOG[slug]])
);

// Helper to get all slugs, used by generateStaticParams
export const getAllServiceSlugs = () => Object.keys(SERVICES);
// Keyword-led display name without the region suffix, e.g. "End of Lease
// Cleaning", "Wheelie Bin Cleaning" — the words people actually search.
export const serviceShortName = (service: Service) => service.seoTitle.replace(/ in South East Melbourne$/, "");

// Audience groups used by the /services page.
export const SERVICE_GROUPS: { id: string; label: string; blurb: string; slugs: string[] }[] = [
  {
    id: "hosts-tenants",
    label: "For hosts & tenants",
    blurb: "Turnovers between guests, bond-back cleans and deep refreshes for carpets, couches and mattresses.",
    slugs: ["airbnb", "move", "carpet-cleaning", "upholstery-cleaning", "mattress-cleaning"],
  },
  {
    id: "businesses",
    label: "For businesses",
    blurb: "Scheduled cleaning for offices, shops, clinics and shared building areas, around your trading hours.",
    slugs: ["commercial", "retail-cleaning", "medical-centre-cleaning", "strata-cleaning"],
  },
  {
    id: "homes",
    label: "For homes",
    blurb: "Regular or one-off house cleaning, seasonal deep cleans, windows and bins.",
    slugs: ["residential", "deep-clean", "windows", "wheely-bin"],
  },
];
