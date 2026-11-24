import type { Feature, NavItem } from "./types";

export const site = {
  name: "Hebbevu Genetics",
  url: "https://hebbevugenetics.com",
  tagline: "South India’s first private cattle IVF lab",
  vision: {
    hindi: "Har ghar mein acchi gai",
    english: "A good cow in every home.",
    statement:
      "To revolutionize Indian dairy by unlocking the true genetic strength of native breeds through world-class reproductive science.",
  },
  mission:
    "To preserve native breeds and deliver farmer-first reproductive services that improve income, resilience, and sustainability.",
  teamLine: "Driven by passion, powered by precision.",
  careersUrl: "https://careers.hebbevu.com",
} as const;

export const contact = {
  phoneDisplay: "+91 80505 39391",
  phoneHref: "tel:+918050539391",
  /** ASSUMPTION: same number is on WhatsApp - confirm with client. */
  whatsappHref: "https://wa.me/918050539391",
  email: "info@hebbevugenetics.com",
  emailHref: "mailto:info@hebbevugenetics.com",
  addressLines: [
    "46/1C Chinnamanthur, Roddam Mandal",
    "Reynadu Farm, Cholemarri Chinnamanthur",
    "Sri Sathya Sai, Andhra Pradesh 515124",
  ],
} as const;

/** Primary nav: 5 + CTA (brief §5). */
export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    description: "Use your own donors, or buy elite embryos.",
    children: [
      { label: "IVF with your own donors", href: "/services/ivf-your-donors" },
      { label: "Buy elite embryos", href: "/services/buy-embryos" },
      { label: "Embryo transfer & surrogates", href: "/services/embryo-transfer" },
      { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
      { label: "How pricing works", href: "/services/pricing" },
    ],
  },
  {
    label: "The Lab",
    href: "/the-lab",
    description: "South India’s first private cattle IVF lab.",
    children: [
      { label: "How IVF works", href: "/the-lab/how-ivf-works" },
      { label: "The facility", href: "/the-lab/facility" },
      { label: "Results & methodology", href: "/the-lab/results" },
    ],
  },
  {
    label: "Breeds",
    href: "/breeds",
    description: "Indigenous cattle, buffalo and global dairy breeds, and how to choose between them.",
  },
  {
    label: "About",
    href: "/about",
    description: "The vision, the team and the farm.",
    children: [
      { label: "Our story", href: "/about/story" },
      { label: "Our team", href: "/about/team" },
      { label: "Partners", href: "/about/partners" },
      { label: "Reynadu Farm", href: "/about/farm" },
      { label: "Gallery", href: "/about/gallery" },
    ],
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    description: "Plain answers, organised by the question you have.",
    children: [
      { label: "All articles", href: "/knowledge" },
      { label: "FAQs", href: "/knowledge/faqs" },
      { label: "Glossary", href: "/knowledge/glossary" },
    ],
  },
];

export const primaryCta = { label: "Book a Consultation", href: "/book" } as const;

export const footerNav: { heading: string; items: NavItem[] }[] = [
  { heading: "Services", items: primaryNav[0].children! },
  { heading: "The Lab", items: primaryNav[1].children! },
  { heading: "About", items: primaryNav[3].children! },
  {
    heading: "Company",
    items: [
      { label: "Knowledge", href: "/knowledge" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

/** "Why Hebbevu" - four claims, verbatim from the client doc (Home + About). */
export const pillars: Feature[] = [
  {
    title: "South India’s First Private IVF Lab",
    brandIcon: "lab",
    body: "Pioneering accessible, high-precision IVF breeding technology.",
    icon: "lab",
  },
  {
    title: "Elite Indigenous Bloodlines",
    brandIcon: "dna",
    body: "Advancing indigenous genetics using globally proven donor lines.",
    icon: "dna",
  },
  {
    title: "Global Collaboration",
    brandIcon: "global",
    body: "Integrating Brazilian expertise to strengthen Indian cattle genetics.",
    icon: "globe",
  },
  {
    title: "Ethical & Hygienic Housing",
    brandIcon: "care",
    body: "World-class infrastructure designed for optimal animal health and performance.",
    icon: "shield",
  },
];

/** Home: "Leading the IVF Revolution 2.0 in India" (client doc). */
export const revolution = {
  kicker: "Hebbevu Genetics",
  heading: "Leading the IVF Revolution 2.0 in India",
  paragraphs: [
    "At Hebbevu Genetics, we are building the future of Indian dairy through advanced cattle IVF and embryo transfer technologies.",
    "We aim to make IVF technology accessible for every Indian dairy farmer, enabling faster genetic progress while preserving indigenous cattle strength.",
  ],
  listHeading: "IVF Revolution 2.0",
  points: [
    "Faster genetic progress through advanced IVF",
    "Strong focus on elite & native bloodlines",
    "Scalable, ethical breeding for the future",
  ],
};

/** Home hero (client doc). See README note: "10x" is the client's claim, flagged. */
export const homeHero = {
  heading: "Boost your herd’s quality by 10x",
  lede: "Accelerating herd improvement through proven IVF and embryo transfer services in India.",
};

/** About page copy (client doc). */
export const about = {
  heading: "Building the Future of Indian Dairy Through Genetics",
  overview: [
    "At Hebbevu Genetics, we are not just building herds. We are building a legacy.",
    "Rooted in India’s rich cattle heritage, our mission is to preserve and elevate indigenous breeds through ethical artificial insemination (AI) and advanced in-vitro fertilization (IVF).",
    "By combining traditional knowledge with modern reproductive science, we develop cattle that are healthier, more productive, and globally competitive.",
    "Our work represents a movement where heritage, sustainability, and innovation come together to shape the future of Indian dairy farming.",
  ],
  access: {
    heading: "Making Quality Genetics Accessible to Every Farmer",
    paragraphs: [
      "At Hebbevu Genetics, our vision is built on a simple yet powerful belief: “Har ghar mein acchi gai”.",
      "For years, access to superior cattle genetics has been limited to a small group of breeders. This has created a gap between what is possible and what is accessible to most farmers.",
      "We aim to bridge this gap by making high-quality indigenous cattle genetics available to every Indian dairy farmer.",
      "By combining scientific advancements with practical farming solutions, we are working to make quality genetics accessible, affordable, and scalable.",
    ],
    listHeading: "Our goal is to empower farmers with:",
    points: ["Better genetics", "Scientific breeding support", "Long-term herd improvement strategies"],
    closing:
      "This approach ensures that improved native breeds become a part of every household, contributing to stronger dairy growth across India.",
  },
  foundersBrief: {
    heading: "Founders Brief",
    paragraphs: [
      "Our vision is clear: “Har ghar mein acchi gai.”",
      "India’s indigenous cattle deserve global recognition, and Indian farmers deserve access to world-class genetics.",
      "We are building a bridge between heritage breeds and modern scientific excellence. Through disciplined artificial insemination (AI) and advanced IVF technology, we are creating a future where high-quality cattle are accessible, affordable, and sustainable for every farming family.",
      "We believe in strengthening superior bloodlines and ensuring that every dairy farmer in India has access to them.",
    ],
    pullQuote: "High-quality cattle should not be a privilege for a few, but a standard for every home.",
    closing: "This is not just a vision. It is the next revolution in Indian dairy farming.",
  },
};
