import type { Feature } from "./types";

/** The lab (brief §9). Technical register — neutral, precise. */

export const labIntro = {
  heading: "South India’s first private cattle IVF lab",
  lede: "The laboratory sits on the same land as the herd, at Reynadu Farm in Sri Sathya Sai district. Every embryo is graded, labelled and traceable back to its donor, sire and session.",
};

/** The seven-day IVF cycle. */
export const ivfCycle: { day: string; stage: string; recorded: string }[] = [
  {
    day: "Day 0",
    stage: "OPU & maturation",
    recorded:
      "Follicles left/right by size, CL, cysts, tube received time, egg grades A–D, time into maturation",
  },
  { day: "Day 1", stage: "Fertilisation", recorded: "Sire, straws used, run reference" },
  { day: "Day 2", stage: "Culture", recorded: "Cleavage" },
  { day: "Day 7", stage: "Embryos", recorded: "Stage, grade 1–3, photograph, fresh or frozen, straw label" },
  {
    day: "Day 7+",
    stage: "Transfer or freeze",
    recorded: "Recipient, CL side and grade — or tank / canister / cane",
  },
];

export const gradingRules = [
  "Oocytes are graded A to D before entering maturation. No ungraded egg goes into an IVF run.",
  "Embryos are graded 1 to 3 at day 7. Grade 2 embryos are used only where spare recipients are available.",
];

export const syncProtocols = {
  confirmed: ["CIDR", "GPG", "Double PG", "Single PG"],
  /** GPC is not yet confirmed by the client — do not list as offered. */
  pending: ["GPC"],
  pregnancyChecks: [
    { method: "Embryo transfer (ET)", checks: "35 and 60 days" },
    { method: "Cloning", checks: "35 and 60 days" },
    { method: "AI and natural service", checks: "45 and 60 days" },
  ],
};

/** The Hebbevu Genetic Pipeline — seven stages (client article 6). */
export const pipeline: { step: number; title: string; body: string }[] = [
  {
    step: 1,
    title: "Elite animal selection",
    body: "Donors are chosen on proven milk records, pedigree, physical and reproductive health, and breed purity.",
  },
  {
    step: 2,
    title: "Genetic evaluation & planning",
    body: "Elite donors are matched with high-quality sires and a roadmap is set for the traits you want.",
  },
  {
    step: 3,
    title: "IVF & embryo development",
    body: "Oocytes are collected, fertilised in controlled lab conditions, and the embryos developed and graded.",
  },
  {
    step: 4,
    title: "Embryo transfer",
    body: "Embryos go into carefully selected, synchronised recipient cows.",
  },
  {
    step: 5,
    title: "Pregnancy monitoring & care",
    body: "Pregnancy diagnosis, nutritional guidance and health management.",
  },
  {
    step: 6,
    title: "Birth of genetically superior calves",
    body: "Calves with improved milk potential, immunity and breed characteristics.",
  },
  {
    step: 7,
    title: "Long-term herd transformation",
    body: "With each cycle, the herd moves closer to elite performance standards.",
  },
];

/** Facility — four working areas. */
export const facilityAreas: (Feature & { id: string; number: string })[] = [
  {
    id: "collection",
    number: "01",
    title: "Collection — the crush",
    body: "Donors are held and aspirated. Follicle counts are recorded left and right by size, with CL and cysts, on the donor card.",
    icon: "clipboard",
  },
  {
    id: "grading",
    number: "02",
    title: "Grading & maturation",
    body: "Oocytes are searched, graded A–D and placed into maturation. Crush-to-maturation time is recorded per session and reviewed by aspirator.",
    icon: "microscope",
  },
  {
    id: "culture",
    number: "03",
    title: "Fertilisation & culture",
    body: "IVF on day 1, culture through day 7. Media and consumables are tracked against a stock register.",
    icon: "lab",
  },
  {
    id: "cryo",
    number: "04",
    title: "Cryopreservation",
    body: "Storage by tank, canister and cane. Each straw is labelled back to donor, sire and session.",
    icon: "snowflake",
  },
];

/** Traceability chain. */
export const traceChain = [
  "Donor",
  "Sire",
  "Session",
  "Egg grade",
  "Embryo grade",
  "Recipient",
  "Day 35",
  "Day 60",
  "Calving",
];

export const traceExplainer =
  "An embryo leaving the lab can be traced in both directions. This chain is why we can explain why a programme worked or didn’t — and it is what makes our published numbers checkable rather than decorative.";

/** The 60-day nuance (brief §2). */
export const conceptionMethod = {
  heading: "Why our number is lower than you’ll see elsewhere",
  paragraphs: [
    "Our 35–40% conception rate is measured at the 60-day pregnancy check, not the 35-day check.",
    "Some pregnancies confirmed at day 35 are lost before day 60. Checking at 60 days is the harder test and gives a lower number than many labs quote — but it is closer to the calves you will actually see.",
  ],
};

/** Research — real, not for sale. */
export const research: Feature[] = [
  {
    title: "Cloning programme",
    body: "Cell lines and reconstruct trials.",
    icon: "dna",
  },
  {
    title: "Pregnancy loss between day 35 and day 60",
    body: "Why some confirmed pregnancies are lost between the two checks — and what changes that.",
    icon: "calendar",
  },
  {
    title: "Donor × sire outcomes in Indian conditions",
    body: "Which pairings perform, measured on Indian farms rather than borrowed from abroad.",
    icon: "trending",
  },
];
