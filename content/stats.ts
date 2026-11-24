import { TBS, type StatItem } from "./types";

/** The company's real figures (brief §2). Use exactly — never round or embellish. */
export const stats = {
  experience: { id: "experience", value: "5+", label: "Years of hands-on IVF breeding expertise" },
  herd: { id: "herd", value: "1700+", label: "In-house indigenous cattle" },
  calves: { id: "calves", value: "100+", label: "Successful IVF-born calves" },
  conception: {
    id: "conception",
    value: "35–40%",
    label: "Conception rate",
    note: "Measured at the 60-day check — not the 35-day check most labs quote.",
  },
  fodder: { id: "fodder", value: "400+", label: "Acres of dedicated fodder land" },
} satisfies Record<string, StatItem>;

/** "Our Impact in Cattle Genetics" — Home + About (client doc). */
export const impactStats: StatItem[] = [stats.experience, stats.herd, stats.calves, stats.conception];

/** "Our Milestones" — Team page (client doc). */
export const milestoneStats: StatItem[] = [stats.herd, stats.calves, stats.conception, stats.fodder];

/**
 * Lab performance figures still owed by the client (brief §2).
 * Every value stays TBS until supplied WITH its sample size.
 */
export const pendingLabFigures: { metric: string; value: string; sampleSize: string }[] = [
  { metric: "Oocytes recovered per OPU session", value: TBS, sampleSize: TBS },
  { metric: "Egg grade mix (A / B / C / D)", value: TBS, sampleSize: TBS },
  { metric: "Cleavage rate (day 2)", value: TBS, sampleSize: TBS },
  { metric: "Day-7 embryo rate", value: TBS, sampleSize: TBS },
  { metric: "Retention, day 35 → day 60", value: TBS, sampleSize: TBS },
  { metric: "Conception rate at day 60", value: stats.conception.value, sampleSize: TBS },
];
