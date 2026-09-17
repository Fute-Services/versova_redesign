export type TabId =
  | "project"
  | "location"
  | "architecture"
  | "arrival"
  | "residences"
  | "tour"
  | "amenities"
  | "plans"
  | "inventory";

/** A navigation target: a chapter, or the private-preview drawer. */
export type Destination = TabId | "book";

export type ImageKey = "hero" | "pano";

export type PlanZone = "Living" | "Suite" | "Terrace";

export type Fact = readonly [label: string, value: string];

export interface Chapter {
  chapter: string;
  eye: string;
  /** Title rendered as `lead` followed by gold-emphasised `accent`. */
  title: { lead: string; accent: string };
  body: string;
  next: string;
  nextTab: Destination;
  /** Background image; omitted when the chapter shows the location map. */
  image?: ImageKey;
  map?: boolean;
  sample?: string;
  plans?: boolean;
  detail: string;
  facts: Fact[];
  note: string;
}

export interface NavGroup {
  label: string;
  ariaLabel?: string;
  items: { id: TabId; number: string; label: string }[];
}
