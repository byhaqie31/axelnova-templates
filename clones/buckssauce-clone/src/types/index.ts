export type FlavorKey = "pineapple" | "habanero" | "cherry";

export interface Product {
  key: FlavorKey;
  /** "Crushed" prefix line */
  prefix: string;
  /** Main flavor lines, e.g. ["Pineapple", "Sriracha"] */
  lines: string[];
  name: string;
  tagline: string;
  price: string;
  packPrice: string;
  /** Brand color for the flavor card background */
  color: string;
  bottle: string;
  bottleFront: string;
  pack3: string;
  pack6: string;
}

export interface Ingredient {
  title: string;
  body: string;
  icon: string;
}

export interface Feature {
  number: string;
  title: string;
  body: string;
}

export interface Review {
  name: string;
  quote: string;
  body: string;
  handle?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
