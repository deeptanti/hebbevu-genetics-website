import type { StatItem } from "./types";

/** The company's real figures (brief §2). Use exactly — never round or embellish. */
export const stats = {
  experience: { id: "experience", brandIcon: "experience", value: "5+", label: "Years of hands-on IVF breeding expertise" },
  herd: { id: "herd", brandIcon: "herd", value: "1700+", label: "In-house indigenous cattle" },
  calves: { id: "calves", brandIcon: "calves", value: "100+", label: "Successful IVF-born calves" },
  conception: {
    id: "conception",
    brandIcon: "conception",
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
