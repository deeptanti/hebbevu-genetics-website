/** Shared content types. Pages read typed data from /content — never hardcode copy in JSX. */

/** Literal placeholder for any figure the client has not supplied (brief §2). Never estimate. */
export const TBS = "[ TO BE SUPPLIED ]" as const;
export type ToBeSupplied = typeof TBS;

export type Href = `/${string}` | `https://${string}` | `tel:${string}` | `mailto:${string}`;

export interface LinkItem {
  label: string;
  href: Href | string;
}

export interface NavItem extends LinkItem {
  /** One-line description shown in the mobile drawer / section indexes. */
  description?: string;
  children?: NavItem[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  /** Qualifier shown under the label, e.g. "measured at the 60-day check". */
  note?: string;
}

export type IconName =
  | "lab"
  | "dna"
  | "globe"
  | "shield"
  | "leaf"
  | "target"
  | "users"
  | "clipboard"
  | "thermometer"
  | "droplet"
  | "snowflake"
  | "microscope"
  | "calendar"
  | "truck"
  | "package"
  | "baby"
  | "check"
  | "phone"
  | "mail"
  | "map"
  | "whatsapp"
  | "sparkles"
  | "trending"
  | "heart"
  | "scale"
  | "cow"
  | "syringe"
  | "testtube"
  | "plant"
  | "eyedropper";

export interface Feature {
  title: string;
  body: string;
  icon?: IconName;
}

export interface Breed {
  slug: string;
  name: string;
  epithet: string;
  origin: string;
  /** Milk yield as written by the client — a typical range, not a guarantee. */
  milkYield: string;
  /** "A2" or null where the client did not state it. */
  milkType: "A2" | null;
  traits: string[];
  strength: string;
  /** Breed-specific long copy, only where the client/brief supplied it. */
  detail?: { heading: string; paragraphs: string[]; points?: string[] }[];
  /** Honest trade-off note (Holstein Friesian, brief §8). */
  tradeoff?: { heading: string; paragraphs: string[] };
  /** Related knowledge article slugs. */
  articles?: string[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  group: "leadership" | "lab" | "veterinary" | "data";
  responsibility: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  link?: LinkItem;
}

export interface ServiceOption {
  id: string;
  label: string;
}

export interface Service {
  slug: string;
  href: string;
  path: "A" | "B" | "support";
  kicker: string;
  title: string;
  summary: string;
  description: string[];
  benefits?: string[];
  includes?: string[];
  options?: ServiceOption[];
  icon: IconName;
}

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string; strong?: boolean }
  | { type: "ul"; items: string[] }
  | { type: "link"; label: string; href: string };

export type ArticleTopic = "is-ivf-for-me" | "choosing-genetics" | "how-it-works" | "who-we-are";

export interface Article {
  slug: string;
  topic: ArticleTopic;
  metaTitle: string;
  description: string;
  title: string;
  body: ArticleBlock[];
  cta: { prompt: string; links: LinkItem[] } | null;
}

export interface GlossaryTerm {
  term: string;
  expansion?: string;
  definition: string;
}
