import type { Feature, Service } from "./types";

/**
 * Services - organised as the two-path model (brief §3).
 * Path A: the procedure you hire us for. Path B: the thing you buy.
 * Product copy (sex-sorted / normal) is verbatim from the client doc.
 */

export const servicesIntro = {
  heading: "Cattle IVF & Embryo Services for Faster Genetic Improvement",
  kicker: "Hebbevu Genetics Embryo Services",
  paragraphs: [
    "We provide structured, ethical, and science-driven embryo solutions to help dairy farmers and breeders multiply elite cattle genetics with higher conception success.",
    "Our services are designed to improve herd quality, productivity, and long-term profitability through advanced IVF and embryo transfer techniques.",
  ],
};

export const ivfYourDonors: Service = {
  slug: "ivf-your-donors",
  href: "/services/ivf-your-donors",
  path: "A",
  kicker: "Path A",
  title: "IVF with your own donors",
  summary:
    "You already own good cows. We collect oocytes from them, fertilise in our lab and transfer the embryos. The genetics stay yours. IVF just multiplies them faster than natural breeding allows.",
  description: [
    "Natural breeding gives one calf per cow per year. With IVF, a single high-value cow can contribute multiple embryos in one cycle, so the best animal in your herd can shape far more of its future.",
    "Experts handle the complexity. You receive guidance at every stage.",
  ],
  includes: [
    "Donor assessment",
    "Synchronisation protocol",
    "OPU session (oocyte collection)",
    "Lab fertilisation and culture",
    "Embryo grading",
    "Embryo transfer",
    "Pregnancy confirmation",
  ],
  icon: "dna",
};

export const sexSorted: Service = {
  slug: "sex-sorted",
  href: "/services/buy-embryos/sex-sorted",
  path: "B",
  kicker: "Path B · Embryos",
  title: "Sex-Sorted Embryos",
  summary: "Produced using elite donor cattle and advanced reproductive technology.",
  description: ["Produced using elite donor cattle and advanced reproductive technology."],
  benefits: [
    "Ideal for producing female calves",
    "Enables faster herd expansion",
    "Improves long-term dairy productivity",
  ],
  options: [
    { id: "production", label: "Embryo production" },
    { id: "transfer", label: "Embryo transfer" },
    { id: "transfer-confirmation", label: "Transfer with confirmation" },
  ],
  icon: "target",
};

export const conventional: Service = {
  slug: "conventional",
  href: "/services/buy-embryos/conventional",
  path: "B",
  kicker: "Path B · Embryos",
  title: "Normal Embryos",
  summary: "Produced using selected bulls and proven breeding methods.",
  description: ["Produced using selected bulls and proven breeding methods."],
  benefits: [
    "Cost-effective solution for herd improvement",
    "Reliable and consistent genetic progress",
    "Suitable for farmers at all stages",
  ],
  options: [
    { id: "transfer", label: "Embryo transfer" },
    { id: "transfer-confirmation", label: "Transfer with confirmation" },
  ],
  icon: "trending",
};

export const buyEmbryos: Service = {
  slug: "buy-embryos",
  href: "/services/buy-embryos",
  path: "B",
  kicker: "Path B",
  title: "Buy elite embryos",
  summary:
    "You want better genetics than you currently own. Buy embryos produced from our own 1700-head indigenous herd and proven sires.",
  description: [
    "Every embryo comes from donors in our own herd on Reynadu Farm, paired with proven sires and graded in our lab before it leaves.",
    "Choose sex-sorted embryos if you want female calves and faster herd growth, or normal embryos for cost-effective, steady improvement.",
  ],
  icon: "package",
};

export const embryoTransfer: Service = {
  slug: "embryo-transfer",
  href: "/services/embryo-transfer",
  path: "support",
  kicker: "Transfer & surrogates",
  title: "Embryo transfer, surrogates & confirmation",
  summary:
    "We transfer embryos into healthy, synchronised recipient cows (your own, or Hebbevu-managed surrogates) and confirm the pregnancy.",
  description: [
    "This stage bridges laboratory precision and real-world farm outcomes. We provide both farmer-owned and Hebbevu-managed surrogate options.",
  ],
  includes: [
    "Recipient health and reproductive condition check",
    "Synchronisation for higher success rates",
    "Skilled handling during transfer",
    "Pregnancy checks at 35 and 60 days",
    "Nutritional and health guidance through pregnancy",
  ],
  icon: "baby",
};

export const services: Service[] = [ivfYourDonors, buyEmbryos, embryoTransfer];
export const embryoProducts: Service[] = [sexSorted, conventional];

/** "Important Information" (client doc). */
export const serviceGuidelines: { label: string; value: string }[] = [
  { label: "Minimum order", value: "10 embryos" },
  { label: "Pricing", value: "Shared on request" },
  { label: "Travel & logistics", value: "Covered by the farmer" },
  { label: "Standards", value: "All procedures follow strict aseptic and ethical standards" },
];

/** "What Sets Our Services Apart" (client doc). */
export const differentiators: Feature[] = [
  { title: "Cost-effective", body: "Cost-effective solutions without compromising quality.", icon: "scale" },
  { title: "An experienced team", body: "Delivered by an experienced and skilled IVF team.", icon: "users" },
  { title: "Strict hygiene", body: "Strict hygiene and safety protocols.", icon: "shield" },
  { title: "Precision", body: "Precision-driven processes for reliable outcomes.", icon: "target" },
  { title: "Organised operations", body: "Well-organized and efficient operations.", icon: "clipboard" },
  { title: "Long-term results", body: "Focus on consistent quality and long-term results.", icon: "trending" },
];

/** Closing CTA (client doc: "VERY IMPORTANT"). */
export const servicesCta = {
  heading: "Start Improving Your Herd Today",
  body: "Whether you are looking to expand your herd or improve genetic quality, our team is here to guide you.",
};

/**
 * How pricing works (brief §4). We publish the STRUCTURE, never rupee figures.
 */
export const pricing = {
  heading: "How pricing works",
  lede: "Nobody in this category publishes how pricing works. We can’t publish rupee figures, because every herd is different, but we can tell you exactly what goes into the number.",
  factors: [
    {
      factor: "Sex-sorted or normal",
      detail: "Sex-sorted embryos (for female calves) and normal embryos are priced differently.",
    },
    { factor: "Fresh or frozen", detail: "Whether the embryo is transferred fresh on day 7 or vitrified and stored." },
    {
      factor: "Whose recipient cows",
      detail: "Your own recipients, or Hebbevu-managed surrogates.",
    },
    {
      factor: "With or without confirmation",
      detail: "Transfer alone, or transfer with pregnancy confirmation.",
    },
    { factor: "Order size", detail: "The minimum order is 10 embryos." },
    { factor: "Travel & logistics", detail: "Covered by the farmer, on top of the service price." },
  ],
  /** Which options exist for each product (client doc "Available Options"). */
  matrixColumns: ["Embryo production", "Embryo transfer", "Transfer with confirmation"],
  matrix: [
    { product: "Sex-sorted embryos", values: [true, true, true] },
    { product: "Normal embryos", values: [false, true, true] },
  ],
};

/** "Is IVF right for you?" - drawn only from the client's own articles. */
export const qualifier = {
  heading: "Is IVF right for you?",
  lede: "IVF improves probability, not certainty. It is worth it for some farms and not for others. Here is how to tell.",
  goodFit: {
    heading: "IVF is the better choice if",
    points: [
      "You have a high-genetic-value cow",
      "You want to multiply elite bloodlines",
      "You aim to upgrade herd quality quickly",
      "You are planning long-term dairy growth",
      "You aim for higher milk production",
    ],
  },
  notYet: {
    heading: "Natural breeding may suit you if",
    points: [
      "You have a small herd",
      "You prefer low-cost, traditional methods",
      "Genetic improvement is not a priority",
    ],
  },
  combined: {
    heading: "Can both methods work together?",
    body: "Yes. Many successful farmers use a combined approach: IVF for elite animals and genetic advancement, natural breeding for general herd maintenance. This balance helps optimise both cost and performance.",
  },
  honesty: [
    {
      title: "IVF improves probability, not certainty",
      body: "Like any biological process, IVF does not guarantee success every time. It increases the chances of producing superior offspring and gives you better control over breeding outcomes.",
    },
    {
      title: "It isn’t only for large farms",
      body: "Small and medium farmers can use IVF selectively for high-value animals and upgrade the herd gradually.",
    },
    {
      title: "It is an investment",
      body: "IVF costs more up front than natural breeding. The return comes through faster genetic improvement and higher lifetime productivity, over years rather than months.",
    },
  ],
};

/** Two-path chooser (home + services): the farmer picks the sentence that is true for them. */
export const pathOptions = [
  {
    id: "own-donors",
    prompt: "I already own cows",
    kicker: ivfYourDonors.kicker,
    title: ivfYourDonors.title,
    summary: ivfYourDonors.summary,
    pointsLabel: "What’s included, in order",
    points: ivfYourDonors.includes!,
    ordered: true,
    href: ivfYourDonors.href,
    cta: "How IVF with your donors works",
  },
  {
    id: "buy-embryos",
    prompt: "I want better genetics than I own",
    kicker: buyEmbryos.kicker,
    title: buyEmbryos.title,
    summary: buyEmbryos.summary,
    pointsLabel: "Two kinds of embryo",
    points: [
      `${sexSorted.title}: ${sexSorted.benefits![0].toLowerCase()}`,
      `${conventional.title}: ${conventional.benefits![0].toLowerCase()}`,
      "Minimum order: 10 embryos",
    ],
    ordered: false,
    href: buyEmbryos.href,
    cta: "Compare the embryos",
  },
];
