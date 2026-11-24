import type { Feature } from "./types";

/**
 * The lab — PUBLIC, farmer-level information only.
 * Internal operations (record-keeping fields, grading rules, synchronisation protocol
 * names, facility workflows, internal performance metrics and the research programme)
 * were removed at the client's request: they are not public knowledge.
 */

export const labIntro = {
  heading: "South India’s first private cattle IVF lab",
  lede: "The laboratory sits on the same land as the herd, at Reynadu Farm in Sri Sathya Sai district. Every embryo can be traced back to its donor and sire.",
};

/** The seven-day journey, in plain words: what happens, not how the lab runs. */
export const ivfCycle: { day: string; stage: string; description: string }[] = [
  {
    day: "Day 0",
    stage: "Egg collection",
    description: "Eggs are collected from the donor cow by OPU — a non-invasive procedure that can be repeated — and taken into the lab.",
  },
  { day: "Day 1", stage: "Fertilisation", description: "Each egg is fertilised with semen from the sire chosen for your breeding goals." },
  { day: "Day 2", stage: "First divisions", description: "The fertilised eggs begin to divide — the first sign that the process is working." },
  { day: "Day 7", stage: "Embryos ready", description: "After seven days of growth, the embryos are checked and the best are selected." },
  {
    day: "Day 7+",
    stage: "Transfer or freeze",
    description: "Each embryo is transferred fresh into a recipient cow, or frozen and stored to be transferred later.",
  },
];

/** When pregnancies are checked after embryo transfer — what the farmer will see. */
export const pregnancyChecks = [
  { method: "Embryo transfer", checks: "35 and 60 days" },
  { method: "AI and natural service", checks: "45 and 60 days" },
];

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

/** The facility, at the level a visiting farmer would see it. */
export const facilityAreas: (Feature & { id: string; number: string })[] = [
  {
    id: "collection",
    number: "01",
    title: "Collection",
    body: "Eggs are collected from donor cows on the same land as the lab, so they never travel far.",
    icon: "cow",
  },
  {
    id: "lab",
    number: "02",
    title: "Embryology lab",
    body: "Eggs are fertilised and the embryos grown for seven days under controlled, hygienic conditions.",
    icon: "microscope",
  },
  {
    id: "storage",
    number: "03",
    title: "Embryo storage",
    body: "Embryos that aren’t transferred fresh are frozen and stored safely until they’re needed.",
    icon: "snowflake",
  },
];

/** Traceability — the public claim, without internal record fields. */
export const traceChain = ["Donor", "Sire", "Embryo", "Recipient", "Day 35 check", "Day 60 check", "Calf"];

export const traceExplainer =
  "Every embryo that leaves the lab can be traced back to its donor and sire, and forward to the calf. That is why we can explain why a programme worked or didn’t — and why our published numbers are checkable rather than decorative.";

/** The 60-day nuance (brief §2). */
export const conceptionMethod = {
  heading: "Why our number is lower than you’ll see elsewhere",
  paragraphs: [
    "Our 35–40% conception rate is measured at the 60-day pregnancy check, not the 35-day check.",
    "Some pregnancies confirmed at day 35 are lost before day 60. Checking at 60 days is the harder test and gives a lower number than many labs quote — but it is closer to the calves you will actually see.",
  ],
};
