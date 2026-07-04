import type { Product, Ingredient, Feature, Review, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/buckssauce/",
  facebook: "https://www.facebook.com/people/Bucks-Sauce/61585508764010/",
};

export const PRODUCTS: Product[] = [
  {
    key: "pineapple",
    prefix: "Crushed",
    lines: ["Pineapple", "Sriracha"],
    name: "Crushed Pineapple Sriracha",
    tagline: "Pineapple sweetness. Gentle heat. Perfect balance.",
    price: "$12.00",
    packPrice: "$32.00",
    color: "#be8d3f",
    bottle: "/images/bottle-pineapple.png",
    bottleFront: "/images/pineapple-front.png",
    pack3: "/images/3-pack-3-.png",
    pack6: "/images/6-pack-1-.png",
  },
  {
    key: "habanero",
    prefix: "Crushed",
    lines: ["Habanero", "Garlic"],
    name: "Crushed Habanero Garlic",
    tagline: "Habanero Fire. Clean Burn. No Apologies.",
    price: "$12.00",
    packPrice: "$32.00",
    color: "#f15726",
    bottle: "/images/bottle-habanero.png",
    bottleFront: "/images/habanero-front.png",
    pack3: "/images/3-pack.png",
    pack6: "/images/6-pack.png",
  },
  {
    key: "cherry",
    prefix: "Crushed",
    lines: ["Cherry", "Garlic"],
    name: "Crushed Cherry Garlic",
    tagline: "Sweet Depth. Savory Backbone. Cherry with Grit.",
    price: "$12.00",
    packPrice: "$32.00",
    color: "#da1f27",
    bottle: "/images/bottle-cherry.png",
    bottleFront: "/images/cherry-front.png",
    pack3: "/images/3-pack.png",
    pack6: "/images/6-pack.png",
  },
];

export const INGREDIENTS: Ingredient[] = [
  {
    title: "no corn syrup",
    body: "Sweet is fine. Sugar-lab sweet is not. So we left the high fructose corn syrup on the bottom shelf where it belongs.",
    icon: "/icons/no-hfc.svg",
  },
  {
    title: "No seed oils",
    body: "We skip the ultra-processed seed oils and use ingredients that actually belong in food. If it reads like a chemistry project, it's not in this bottle.",
    icon: "/icons/no-seed-oils.svg",
  },
  {
    title: "no additives",
    body: "No preservatives. No artificial nonsense. No “what is that?” ingredients hiding behind words you can't pronounce.",
    icon: "/icons/no-additifs.svg",
  },
  {
    title: "Gluten Free",
    body: "No gluten. No thickening tricks. No drama. Just sauce that plays nice with your diet and acts up on the grill.",
    icon: "/icons/gluten-free.svg",
  },
];

export const FEATURES: Feature[] = [
  {
    number: "01",
    title: "Small batches",
    body: "Small runs. No conveyor belts, just slow simmering, constant taste checks, and Doug hovering like it owes him money.",
  },
  {
    number: "02",
    title: "Real Ingredients",
    body: "Real fruit. Fresh peppers. No powders. No syrups. No shortcuts. Fruit gets chopped, peppers get sliced, spices get blended by hand.",
  },
  {
    number: "03",
    title: "Oh, This?",
    body: "Philly Hot Sauce Fest 2026 — “Best Sauce on a Philly Cheesesteak” (2nd Place). Not bad for our first event.",
  },
];

export const REVIEWS: Review[] = [
  {
    name: "Kyle Seip",
    quote: "I just love the product.",
    body: "You're gonna see me use it a lot.",
    handle: "@castiron_kyle",
  },
  {
    name: "The HeatBros",
    quote: "They have amazing bbq sauce!",
    body: "It was absolutely delicious.",
    handle: "@theheatbrosco",
  },
  {
    name: "Captain Cooks",
    quote: "The best BBQ sauce I've had in a very long time.",
    body: "It's how BBQ sauce should taste.",
    handle: "@captaincooksfood",
  },
  {
    name: "Trey M.",
    quote: "Best sauce I ever had...and it's not close.",
    body: "I put it on a Popeyes chicken sandwich which was trash. This made that sandwich amazing. Bucks Sauce for life!",
  },
  {
    name: "Jeffrey R.",
    quote: "We don't talk about the old sauce anymore.",
    body: "It's still in the fridge. Nobody touches it. It knows what it did.",
  },
];
