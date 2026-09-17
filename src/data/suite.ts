import type { Chapter, ImageKey, NavGroup, PlanZone, TabId } from "@/types/suite";

export const images: Record<ImageKey, string> = {
  hero: "/images/hero.png",
  pano: "/images/pano.jpeg",
};

export const locationMap = "/images/location-map.png";

export const seaAudio = "/audio/sea.mp3";

export const planZones: PlanZone[] = ["Living", "Suite", "Terrace"];

export const navGroups: NavGroup[] = [
  {
    label: "The project",
    ariaLabel: "Project chapters",
    items: [
      { id: "project", number: "01", label: "Project" },
      { id: "location", number: "02", label: "Location" },
      { id: "architecture", number: "03", label: "Architecture" },
      { id: "arrival", number: "04", label: "Arrival" },
    ],
  },
  {
    label: "The home",
    items: [
      { id: "residences", number: "05", label: "Residences" },
      { id: "tour", number: "06", label: "View & 360" },
      { id: "plans", number: "08", label: "Plans" },
      { id: "inventory", number: "09", label: "Inventory" },
    ],
  },
  {
    label: "The life",
    items: [{ id: "amenities", number: "07", label: "Amenities" }],
  },
];

export const chapters: Record<TabId, Chapter> = {
  project: {
    chapter: "01 / Project",
    eye: "01 / Project overview",
    title: { lead: "A private ", accent: "horizon." },
    body: "Sea-facing residences, made for an unhurried life.",
    next: "Location",
    nextTab: "location",
    image: "hero",
    detail: "Residence proposition",
    facts: [
      ["Configuration", "Four-bedroom"],
      ["Outlook", "Sea-facing"],
      ["Floor", "Two homes"],
      ["Experience", "Private"],
    ],
    note: "Use approved data in the production sales suite.",
  },
  location: {
    chapter: "02 / Location",
    eye: "02 / The address",
    title: { lead: "The sea, ", accent: "at your edge." },
    body: "Understand the coast, then the city around it.",
    next: "Architecture",
    nextTab: "architecture",
    map: true,
    detail: "Location lens",
    facts: [
      ["Coast", "Arabian Sea"],
      ["Lens", "Beaches"],
      ["Map", "Supplied"],
      ["Journey", "Versova"],
    ],
    note: "Select map categories in the production build.",
  },
  architecture: {
    chapter: "03 / Architecture",
    eye: "03 / Project story",
    title: { lead: "Made for the ", accent: "horizon." },
    body: "Form, material and a long view.",
    next: "Arrival",
    nextTab: "arrival",
    image: "pano",
    sample: "Sample content area · Replace with approved architecture story",
    detail: "Architecture layer",
    facts: [
      ["Exterior", "Approved CGI"],
      ["Material", "Approved story"],
      ["Scale", "Project detail"],
      ["View", "Sea-facing"],
    ],
    note: "Sample labels only; no unverified project claims.",
  },
  arrival: {
    chapter: "04 / Arrival",
    eye: "04 / The first moment",
    title: { lead: "Arrival, ", accent: "unhurried." },
    body: "A calm first transition into the home.",
    next: "Residences",
    nextTab: "residences",
    image: "hero",
    sample: "Sample content area · Add approved arrival imagery",
    detail: "Arrival sequence",
    facts: [
      ["Moment", "Approach"],
      ["Layer", "Lobby"],
      ["Purpose", "Orientation"],
      ["Media", "Approved CGI"],
    ],
    note: "Prototype structure awaiting approved assets.",
  },
  residences: {
    chapter: "05 / Residences",
    eye: "05 / The residence",
    title: { lead: "Beyond the ", accent: "view." },
    body: "Explore the rooms, privacy and outlook.",
    next: "View & 360",
    nextTab: "tour",
    image: "pano",
    detail: "Residence 01 · sample presentation",
    facts: [
      ["Configuration", "Four-bedroom"],
      ["Outlook", "Sea-facing"],
      ["Floor", "Two homes"],
      ["Plan layer", "Sample A"],
    ],
    note: "Connect plans, areas and specifications once approved.",
  },
  tour: {
    chapter: "06 / View & 360",
    eye: "06 / Spatial walkthrough",
    title: { lead: "Move through ", accent: "the view." },
    body: "Tap a point to move through the experience.",
    next: "Amenities",
    nextTab: "amenities",
    image: "pano",
    sample: "Prototype panorama · supplied visual",
    detail: "Spatial journey",
    facts: [
      ["01", "Arrival"],
      ["02", "Terrace"],
      ["03", "Residence"],
      ["04", "Amenities"],
    ],
    note: "Each scene should link to a buyer decision.",
  },
  amenities: {
    chapter: "07 / Amenities",
    eye: "07 / Everyday rituals",
    title: { lead: "A day by ", accent: "the sea." },
    body: "Morning, day, evening.",
    next: "Plans",
    nextTab: "plans",
    image: "hero",
    sample: "Sample content area · Load approved amenity imagery",
    detail: "Amenity story",
    facts: [
      ["01", "Morning"],
      ["02", "Day"],
      ["03", "Evening"],
      ["Flow", "Buyer-led"],
    ],
    note: "Only show confirmed amenities and features.",
  },
  plans: {
    chapter: "08 / Plans",
    eye: "08 / Residence plan",
    title: { lead: "The view, ", accent: "in plan." },
    body: "Tap each zone to understand the home.",
    next: "Inventory",
    nextTab: "inventory",
    image: "pano",
    sample: "Prototype plan · not approved",
    plans: true,
    detail: "Sample plan focus",
    facts: [
      ["Current", "Living"],
      ["Suite", "Privacy"],
      ["Terrace", "Sea edge"],
      ["Source", "Concept"],
    ],
    note: "Replace with approved floor plans and area schedules.",
  },
  inventory: {
    chapter: "09 / Inventory",
    eye: "09 / Choose your home",
    title: { lead: "Find your ", accent: "home." },
    body: "Match preferences to an available residence.",
    next: "Private preview",
    nextTab: "book",
    image: "pano",
    sample: "Sample inventory · no live availability",
    detail: "Residence selection",
    facts: [
      ["Residence", "Sample 01"],
      ["Configuration", "Four-bedroom"],
      ["Status", "TBC"],
      ["Availability", "Live data"],
    ],
    note: "Connect authorised inventory, availability and pricing only.",
  },
};

/** Where the hero image is anchored for each chapter. */
export function heroPosition(tab: TabId): string {
  if (tab === "arrival" || tab === "amenities") return "82% 50%";
  if (tab === "residences" || tab === "tour" || tab === "plans" || tab === "inventory") return "66% 50%";
  return "70% 50%";
}
