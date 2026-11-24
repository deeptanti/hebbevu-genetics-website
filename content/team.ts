import type { TeamMember } from "./types";

/** Named bios - the rarest thing in the category (brief §10). Copy from the client doc. */
/** Founders (named by the client). Roles only - no bios have been supplied yet. */
export const founders = [
  { slug: "amith-kishan", name: "Mr. Amith Kishan", role: "Founder" },
  { slug: "ashrith-kishan", name: "Mr. Ashrith Kishan", role: "Co-founder" },
];

export const team: TeamMember[] = [
  {
    slug: "dr-neha",
    name: "Dr. Neha",
    role: "Lead Director, Embryology",
    group: "leadership",
    responsibility:
      "Oversees IVF procedures, OPU processes, embryo grading, and lab protocols with a strong focus on quality and consistency.",
  },
  {
    slug: "dr-amol",
    name: "Dr. Amol",
    role: "Director, Operations",
    group: "leadership",
    responsibility:
      "Manages embryo production, donor cow health, reproductive monitoring, and supports both lab and veterinary operations.",
  },
  {
    slug: "anupama",
    name: "Anupama",
    role: "Embryologist",
    group: "lab",
    responsibility:
      "Handles embryo processing, vitrification, and maintains complete data records for IVF cycles and lab procedures.",
  },
  {
    slug: "dr-raju",
    name: "Dr. Raju",
    role: "Veterinary",
    group: "veterinary",
    responsibility: "Leads cattle treatment, medication schedules, and overall herd health management.",
  },
  {
    slug: "dr-narendra",
    name: "Dr. Narendra",
    role: "Veterinary",
    group: "veterinary",
    responsibility: "Oversees feed management, medication schedules, and Gir cow milking records.",
  },
  {
    slug: "susha",
    name: "Susha",
    role: "Data & Dairy Management",
    group: "data",
    responsibility:
      "Maintains comprehensive records including milk yield, treatments, breeding cycles, and pregnancy tracking.",
  },
];

export const teamIntro =
  "At Hebbevu Genetics, our team combines scientific expertise, veterinary excellence, and on-ground dairy management to deliver consistent results in cattle IVF and breeding.";

export const teamCommitment = {
  heading: "Driven by Passion, Powered by Precision",
  paragraphs: [
    "Together, our team stands at the core of everything we do.",
    "Their commitment to ethical practices, scientific precision, and performance-driven outcomes ensures that every procedure meets the highest standards of Hebbevu Genetics.",
    "From lab operations to on-field execution, their discipline and attention to detail ensure consistent success in cattle IVF and breeding programs.",
    "We are deeply grateful for their dedication. It is their passion and perseverance that drives our mission forward and makes our vision achievable.",
  ],
};
