// ─── Real OzClean job photos: one list for the whole site ────────────────────
// To add photos from a new job: drop the files in public/images/work/, then add
// one line per photo below and tag it with the service page(s) it belongs on
// (service slugs from lib/services.ts). Service pages pick them up
// automatically: pairs go in the before/after slider, singles in the photo strip.
//
// Before adding: no house numbers, street signs, number plates, mail with
// names, or customer faces.

export type JobPhoto = { src: string; alt: string; services: string[]; job: string };
export type BeforeAfterPhoto = { before: string; after: string; label: string; services: string[]; job: string };

const W = "/images/work/";

export const JOB_PHOTOS: JobPhoto[] = [
  // Airbnb turnover — job 1
  { job: "airbnb-1", src: `${W}airbnb-bedroom-fresh-linen.jpg`, alt: "Airbnb bedroom made up with fresh linen and rolled towels", services: ["airbnb"] },
  { job: "airbnb-1", src: `${W}airbnb-bedroom-2-fresh-linen.jpg`, alt: "Second Airbnb bedroom reset with fresh linen and towels", services: ["airbnb"] },
  { job: "airbnb-1", src: `${W}airbnb-living-room.jpg`, alt: "Airbnb living room vacuumed and tidied for the next guest", services: ["airbnb", "residential"] },
  { job: "airbnb-1", src: `${W}airbnb-dining-room.jpg`, alt: "Dining area with floors cleaned after an Airbnb turnover", services: ["airbnb", "residential"] },
  { job: "airbnb-1", src: `${W}airbnb-kitchen-laundry.jpg`, alt: "Kitchen and laundry cleaned between Airbnb guests", services: ["airbnb", "residential"] },
  { job: "airbnb-1", src: `${W}airbnb-deck-washed.jpg`, alt: "Deck washed down during an Airbnb turnover clean", services: ["airbnb"] },

  // End of lease — job 1
  { job: "eol-1", src: `${W}end-of-lease-bedroom-fireplace.jpg`, alt: "Empty bedroom with fireplace and polished floors after an end of lease clean", services: ["move", "deep-clean"] },
  { job: "eol-1", src: `${W}end-of-lease-bedroom-floorboards.jpg`, alt: "Bedroom floorboards cleaned for an end of lease inspection", services: ["move", "deep-clean"] },
  { job: "eol-1", src: `${W}end-of-lease-glass-doors.jpg`, alt: "Streak-free glass doors after an end of lease clean", services: ["move", "windows"] },
];

export const BEFORE_AFTER: BeforeAfterPhoto[] = [
  { job: "eol-1", before: `${W}end-of-lease-toilet-floor-before.jpg`, after: `${W}end-of-lease-toilet-floor-after.jpg`, label: "Toilet floor and skirting", services: ["move", "deep-clean"] },
  { job: "eol-1", before: `${W}end-of-lease-bath-taps-before.jpg`, after: `${W}end-of-lease-bath-taps-after.jpg`, label: "Bath, taps and fittings", services: ["move", "deep-clean"] },
  { job: "eol-1", before: `${W}end-of-lease-bathroom-floor-before.jpg`, after: `${W}end-of-lease-bathroom-after.jpg`, label: "Bathroom floor", services: ["move", "deep-clean"] },
];

export const photosFor = (slug: string) => JOB_PHOTOS.filter((p) => p.services.includes(slug));
export const pairsFor = (slug: string) => BEFORE_AFTER.filter((p) => p.services.includes(slug));
