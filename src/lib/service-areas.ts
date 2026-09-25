// ─── Single source of truth for where OzClean works ──────────────────────────
// Used by the "Do we service your area?" checker, the Contact and About pages
// and the LocalBusiness structured data. The 10 SERVICE_AREAS in lib/seo.ts
// are the priority suburbs targeted in page copy; this is the full list.

export type ServiceArea = {
  name: string;
  postcode: string;
  // Outer suburbs where a travel charge is added to the quote.
  travelCharge: boolean;
};

export const ALL_SERVICE_AREAS: ServiceArea[] = [
  { name: "Hampton Park", postcode: "3976", travelCharge: false },
  { name: "Hallam", postcode: "3803", travelCharge: false },
  { name: "Endeavour Hills", postcode: "3802", travelCharge: false },
  { name: "Dandenong", postcode: "3175", travelCharge: false },
  { name: "Dandenong North", postcode: "3175", travelCharge: false },
  { name: "Noble Park", postcode: "3174", travelCharge: false },
  { name: "Clyde", postcode: "3978", travelCharge: false },
  { name: "Clyde North", postcode: "3978", travelCharge: false },
  { name: "Springvale", postcode: "3171", travelCharge: false },
  { name: "Springvale South", postcode: "3172", travelCharge: false },
  { name: "Lynbrook", postcode: "3975", travelCharge: false },
  { name: "Lyndhurst", postcode: "3975", travelCharge: false },
  { name: "Keysborough", postcode: "3173", travelCharge: false },
  { name: "Carrum Downs", postcode: "3201", travelCharge: false },
  { name: "Brighton East", postcode: "3187", travelCharge: false },
  { name: "Narre Warren", postcode: "3805", travelCharge: false },
  { name: "Narre Warren South", postcode: "3805", travelCharge: false },
  { name: "Cranbourne", postcode: "3977", travelCharge: false },
  { name: "Cranbourne North", postcode: "3977", travelCharge: false },
  { name: "Cranbourne East", postcode: "3977", travelCharge: false },
  { name: "Cranbourne West", postcode: "3977", travelCharge: false },
  { name: "Junction Village", postcode: "3977", travelCharge: false },
  { name: "Officer", postcode: "3809", travelCharge: false },
  { name: "Beaconsfield", postcode: "3807", travelCharge: false },
  { name: "Pakenham", postcode: "3810", travelCharge: false },
  { name: "Berwick", postcode: "3806", travelCharge: false },
  { name: "Huntingdale", postcode: "3166", travelCharge: true },
  { name: "Clayton", postcode: "3168", travelCharge: true },
  { name: "Mulgrave", postcode: "3170", travelCharge: true },
  { name: "Mount Waverley", postcode: "3149", travelCharge: true },
  { name: "Glen Waverley", postcode: "3150", travelCharge: true },
  { name: "Rowville", postcode: "3178", travelCharge: true },
  { name: "Cockatoo", postcode: "3781", travelCharge: true },
  { name: "Gembrook", postcode: "3783", travelCharge: true },
  { name: "Emerald", postcode: "3782", travelCharge: true },
  { name: "Pakenham Upper", postcode: "3810", travelCharge: true },
  { name: "Seaford", postcode: "3198", travelCharge: true },
  { name: "Frankston", postcode: "3199", travelCharge: true },
  { name: "Chelsea", postcode: "3196", travelCharge: true },
  { name: "Mordialloc", postcode: "3195", travelCharge: true },
  { name: "Mentone", postcode: "3194", travelCharge: true },
  { name: "Cheltenham", postcode: "3192", travelCharge: true },
];

export type AreaSearchResult =
  | { kind: "empty" }
  | { kind: "match"; areas: ServiceArea[] }
  | { kind: "suggestions"; areas: ServiceArea[] }
  | { kind: "none"; query: string };

const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/\b(vic|victoria|australia)\b/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Accepts a suburb ("Berwick", "narre warren sth"), a postcode ("3977") or both
// ("Cranbourne East VIC 3977"). A full postcode or an exact suburb name is a
// match; partial input returns suggestions; anything else is "none".
export function searchServiceAreas(input: string): AreaSearchResult {
  const q = normalise(input);
  if (!q) return { kind: "empty" };

  const postcode = q.match(/\b(\d{4})\b/)?.[1];
  const words = q.replace(/\b\d+\b/g, "").trim();

  if (!words && postcode) {
    const areas = ALL_SERVICE_AREAS.filter((a) => a.postcode === postcode);
    return areas.length ? { kind: "match", areas } : { kind: "none", query: input.trim() };
  }

  if (!words) {
    // Partial postcode, e.g. "39"
    const areas = ALL_SERVICE_AREAS.filter((a) => a.postcode.startsWith(q)).slice(0, 6);
    return areas.length ? { kind: "suggestions", areas } : { kind: "none", query: input.trim() };
  }

  const exact = ALL_SERVICE_AREAS.filter((a) => a.name.toLowerCase() === words);
  if (exact.length) return { kind: "match", areas: exact };

  const suggestions = ALL_SERVICE_AREAS.filter((a) => {
    const name = a.name.toLowerCase();
    return name.startsWith(words) || name.split(" ").some((part) => part.startsWith(words)) || name.includes(words);
  }).slice(0, 6);
  if (suggestions.length) return { kind: "suggestions", areas: suggestions };

  // A sub-suburb we don't list by name but whose postcode we cover.
  if (postcode) {
    const byPostcode = ALL_SERVICE_AREAS.filter((a) => a.postcode === postcode);
    if (byPostcode.length) return { kind: "match", areas: byPostcode };
  }

  return words.length >= 3 ? { kind: "none", query: input.trim() } : { kind: "empty" };
}
