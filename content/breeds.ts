import type { Breed } from "./types";

/**
 * The seven breeds (client doc "Our Breeds" + brief §8).
 * Yields are typical ranges under good management — NOT guarantees. Every page that
 * shows a yield must also show `yieldDisclaimer`.
 */
export const yieldDisclaimer =
  "Milk yields are typical ranges under good management, not guarantees. Feed, climate, health and handling all move the number.";

export const breeds: Breed[] = [
  {
    slug: "gir",
    name: "Gir",
    epithet: "Heritage of Gujarat",
    origin: "Gujarat",
    milkYield: "12–15 litres/day",
    milkType: "A2",
    traits: ["Docile nature", "Heat tolerance", "Disease resistance"],
    strength: "High adaptability and consistent milk productivity",
    detail: [
      {
        heading: "Why Gir is our flagship",
        paragraphs: [
          "Gir combines consistent yield and high fat content with exceptional heat tolerance and strong natural immunity. Gir cows stay productive for longer than most crossbreds, and they are highly compatible with OPU and IVF.",
        ],
        points: [
          "Consistent yield with high fat content",
          "Exceptional heat tolerance",
          "Strong natural immunity",
          "Longer productive lifespan than most crossbreds",
          "Highly compatible with OPU / IVF",
        ],
      },
      {
        heading: "The Brazil connection",
        paragraphs: [
          "Gir cattle exported from India generations ago became the foundation of Brazil’s dairy Zebu industry — now the largest bovine IVF market in the world. That is the direct link to our Brazilian collaboration: the expertise built on Indian Gir is coming home to Indian Gir.",
        ],
      },
    ],
    articles: ["why-gir-cows-are-the-backbone"],
  },
  {
    slug: "sahiwal",
    name: "Sahiwal",
    epithet: "Punjab’s Pride",
    origin: "Punjab region",
    milkYield: "12–18 litres/day",
    milkType: "A2",
    traits: ["High milk yield", "Heat tolerance", "Disease resistance"],
    strength: "Suitable for both Indian and global dairy systems",
  },
  {
    slug: "ongole",
    name: "Ongole",
    epithet: "Global Legacy of Andhra Pradesh",
    origin: "Andhra Pradesh",
    milkYield: "8–10 litres/day",
    milkType: "A2",
    traits: ["Strength", "Endurance", "Adaptability"],
    strength: "Globally valued for its superior genetic potential",
  },
  {
    slug: "kankrej",
    name: "Kankrej",
    epithet: "Strength & Endurance",
    origin: "Gujarat & Rajasthan",
    milkYield: "8–12 litres/day",
    milkType: "A2",
    traits: ["Strong body", "Endurance", "Disease resistance"],
    strength: "Dual-purpose breed with strength and productivity",
  },
  {
    slug: "rathi",
    name: "Rathi",
    epithet: "Balanced Performer",
    origin: "Rajasthan",
    milkYield: "10–12 litres/day",
    milkType: "A2",
    traits: ["Adaptability to harsh climates", "Hardy nature"],
    strength: "Ideal for desert and semi-arid regions",
  },
  {
    slug: "jaffarabadi",
    name: "Jaffarabadi",
    epithet: "Elite & Majestic",
    origin: "Gujarat",
    milkYield: "8–12 litres/day",
    milkType: null,
    traits: ["Massive build", "Strong draught ability"],
    strength: "Rare and premium breed with high value",
  },
  {
    slug: "holstein-friesian",
    name: "Holstein Friesian",
    epithet: "World’s Dairy Giant",
    origin: "Europe",
    milkYield: "25–30 litres/day",
    milkType: null,
    traits: ["Exceptional milk productivity"],
    strength: "Widely used in commercial dairy farming globally",
    tradeoff: {
      heading: "The honest trade-off",
      paragraphs: [
        "A Holstein out-produces every indigenous breed — if you can feed it properly, cool it, and manage its health closely.",
        "Many farms that switch find that input cost and veterinary load erase the yield advantage. If your constraint is heat, water or feed consistency, a Gir or Sahiwal will make more money. That is arithmetic, not patriotism.",
      ],
    },
  },
];

export const getBreed = (slug: string) => breeds.find((b) => b.slug === slug);

/** "12–15 litres/day" → [12, 15]. For charts and specimen plates. */
export function parseYield(s: string): [number, number] {
  const [a, b] = s.match(/\d+/g)!.map(Number);
  return [a, b ?? a];
}

/** "Native Breeds of Pride" (client doc, Breeds page). */
export const breedsIntro = {
  heading: "Our Breeds – Indigenous Excellence in Cattle Genetics",
  kicker: "Native Breeds of Pride",
  paragraphs: [
    "At Hebbevu Genetics, we focus on preserving and enhancing India’s finest indigenous cattle breeds along with select global high-performance breeds.",
    "Our breeding programs are designed to improve milk productivity, adaptability, and long-term herd strength using advanced IVF and genetic selection.",
  ],
};

/** "Building Better Herds Through Genetics" (client doc). */
export const breedSelection = {
  heading: "Building Better Herds Through Genetics",
  paragraphs: [
    "Choosing the right breed is the foundation of a successful dairy operation.",
    "At Hebbevu Genetics, we help farmers select and improve breeds based on:",
  ],
  criteria: ["Climate adaptability", "Milk productivity", "Disease resistance", "Long-term herd sustainability"],
  closing:
    "By combining indigenous strengths with modern breeding technologies, we ensure better performance and profitability for farmers.",
  /** Brief §8 — the four questions. */
  questions: [
    "How hot and dry does it get on your land?",
    "Can you hold feed quality through a bad season?",
    "Does your market pay a premium for A2 milk?",
    "How close is your nearest competent vet?",
  ],
};
