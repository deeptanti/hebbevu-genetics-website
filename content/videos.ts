/**
 * Films from the Hebbevu Genetics YouTube channel (youtube.com/@hebbevugenetics).
 * `title` is our own short label (sentence case, no figures: the client hasn't confirmed the
 * numbers some videos quote). Thumbnails are saved locally at /video/yt/<id>.jpg so pages
 * load nothing from YouTube until someone presses play.
 */
export interface Video {
  id: string;
  title: string;
  /** "film" = landscape 16:9; "short" = vertical 9:16 YouTube Short. */
  kind: "film" | "short";
  /** Running time as shown on YouTube (films only). */
  duration?: string;
  /** One line on what the viewer will see. */
  note?: string;
}

export const youtubeChannel = "https://www.youtube.com/@hebbevugenetics";

const film = (id: string, title: string, duration: string, note?: string): Video => ({ id, title, kind: "film", duration, note });
const short = (id: string, title: string): Video => ({ id, title, kind: "short" });

export const videos = {
  // Films
  improveGenetics: film("QLiPlO-Em6I", "Stop increasing cows. Start improving genetics.", "2:33", "Mr. Amith Kishan on why a few high-genetics cows beat a large average herd."),
  breedWithIntent: film("4fajEO0BDmQ", "The future of dairy belongs to those who breed with intent", "13:31", "What Brazil’s Gir programme teaches about focused, validated breeding."),
  ivfCalves: film("Vi3AhuL5ios", "Meet our IVF calves, their parents and traits", "13:33", "A walk through the IVF calves born at the farm, one by one."),
  nextGeneration: film("M2XorRA46G4", "The next generation of IVF calves", "1:51", "Calves from elite donors, born at Hebbevu Genetics."),
  yearOfMilestones: film("jsTkLAGA0js", "2025: a year of milestones", "2:56", "IVF births from elite donors, new genetics, and a year on the road."),
  widerVision: film("ksTZXUkG-u8", "A bigger platform. A wider vision.", "1:04", "Hebbevu Genetics at the 39th Sahara Expo 2026, Egypt."),
  legacyOfPurpose: film("q1yeZ8srpAc", "A legacy of purpose", "5:05", "Mr. Amith Kishan on why Hebbevu Genetics exists."),
  podcast: film("HYepQCU7Q4M", "The stories of Hebbevu Genetics, ft. Amith Kishan", "1:12:03", "The full podcast: the founder’s journey and a guide for dairy farmers."),
  badwaDarbar: film("xm4DCrrfMKk", "Insights from Badwa Darbar on Gir heritage", "1:13:07", "Mr. Amith Kishan in conversation on the Badwa line of Gir cattle."),
  girDeepDive: film("7pggXYPPjPY", "A deep dive into Gir genetics and smarter breeding", "1:04:50"),
  roadToSelection: film("cQ4T8wOR4FM", "The road to selection", "26:17", "Across breeding centres in search of the next elite bulls."),
  parlour: film("WGcFP4J1ejI", "Inside our cattle parlour", "9:41", "Low-stress milking and mist sprinklers for the South Indian summer."),
  bullsAreFamily: film("mlEZWqcoD5U", "Not all bulls are the same", "5:02", "Meet the calm, named bulls that lead the herd."),
  girCows: film("rNvMJBr8lyg", "Behind the scenes with our Gir cows", "3:21"),
  ongoleLegacy: film("sDZ3VOSc5MY", "The legacy of Ongole lives on", "11:16", "Ongole calves born at the farm, and what makes the breed."),
  naturalCare: film("mN2Co3R7rOQ", "The natural way to care for cows", "3:57"),
  brazil1: film("qbtKVzWefzI", "Brazil, episode 1: Jasdan Farm", "8:08"),
  brazil2: film("_3rx225GqPE", "Brazil, episode 2: Cachoeira 2C", "10:20"),
  brazil3: film("C9O6tBvfh9M", "Brazil, episode 3", "6:17"),
  brazil4: film("VbnM4Rayj6s", "Brazil, episode 4", "7:31"),
  brazilNeedsIndia: film("-0o939iKkfg", "Does Brazil need Indian genetics?", "9:31"),
  globalBenchmarks: film("ZKYTn-QHL4w", "Global benchmarks in cattle farming", "6:37", "Scaling genetics, infrastructure and operations: what the best farms do."),

  // Shorts
  origin1: short("DyhVix0p3dQ", "Episode 1: from Hebbevu Farms to Hebbevu Genetics"),
  origin2: short("VQNUUZWF_y4", "Episode 2: from hybrid breeds to indigenous strength"),
  origin3: short("qWkvRTvnuA0", "Episode 3: thousands of miles, hundreds of farmers"),
  origin4: short("uqgpl_S0wuQ", "Episode 4: the trust that started it all"),
  origin5: short("1DHwBhRH0rs", "Episode 5: in search of the best, we found Bhairava"),
  origin6: short("RkItv1fVbFg", "Episode 6: how we found Sona"),
  behindTheScenes: short("DYRHHlV55GA", "Behind the scenes at Hebbevu Genetics"),
  grassToMilk: short("wPhLXY_w_9A", "From green grass to white milk"),
  proactiveCare: short("Ht2o1jv_IuY", "Health built through proactive care"),
  preservedGenetics: short("HRN89KVb030", "Generations of carefully preserved genetics"),
  girHeritage: short("gysdH0VUQ2U", "Our Gir cattle are our heritage"),
  deliberateGrowth: short("hNjGBP97FmM", "Growth is a deliberate, daily choice"),
  cattleShow: short("5MzHT19vG_8", "At the Indian Cattle Show 2026"),
  kaalaNandi: short("S_Jr0IF_AuE", "Meet Kaala and Nandi"),
  girBull: short("kUKsLSLIlwQ", "A grandson of Sakinano and Gondalio"),
  informedBreeding: short("wbI2hy64bxo", "Strong herds grow through informed breeding"),
  charteredFlight: short("uTJmZavrdoQ", "A visit to a world-class Ongole farm"),
  jaffarabadi: short("fL_WBn49V8k", "Our Jaffarabadi buffaloes"),
  indiaBrazil: short("GUNAoafvrFY", "India and Brazil, united by agriculture"),
  avaVisit: short("wwCf4uTYVXM", "AVA from Brazil visits Hebbevu"),
  expoZebu: short("_RU5gHlAPfI", "Inside ExpoZebu 2026"),
  comcebu: short("sKsgUSF2L9A", "Representing South Indian Zebu at COMCEBU, Brazil"),
  zebu: short("9eUZorHKVEU", "Two nations, one breed: the Zebu"),
} satisfies Record<string, Video>;

export type VideoKey = keyof typeof videos;

/**
 * Upload dates from YouTube (read from each public watch page, Nov 2026). Google needs
 * uploadDate for video rich results; see videoSchema in lib/schema.ts.
 */
export const uploadDates: Record<string, string> = {
  "QLiPlO-Em6I": "2026-02-13T04:32:42-08:00",
  "4fajEO0BDmQ": "2026-01-28T04:26:12-08:00",
  "Vi3AhuL5ios": "2025-07-01T21:47:20-07:00",
  "M2XorRA46G4": "2026-02-26T02:23:43-08:00",
  "jsTkLAGA0js": "2025-12-30T20:28:45-08:00",
  "ksTZXUkG-u8": "2026-09-24T02:25:43-07:00",
  "q1yeZ8srpAc": "2025-08-06T21:57:04-07:00",
  "HYepQCU7Q4M": "2024-12-28T01:30:03-08:00",
  "xm4DCrrfMKk": "2025-03-05T17:46:06-08:00",
  "7pggXYPPjPY": "2025-11-19T04:49:51-08:00",
  "cQ4T8wOR4FM": "2025-11-28T02:30:25-08:00",
  "WGcFP4J1ejI": "2025-06-20T01:32:18-07:00",
  "mlEZWqcoD5U": "2025-04-24T07:18:09-07:00",
  "rNvMJBr8lyg": "2025-04-16T05:03:37-07:00",
  "sDZ3VOSc5MY": "2025-06-26T04:33:12-07:00",
  "mN2Co3R7rOQ": "2025-09-24T05:27:29-07:00",
  "qbtKVzWefzI": "2024-11-26T23:44:50-08:00",
  "_3rx225GqPE": "2024-11-29T20:56:21-08:00",
  "C9O6tBvfh9M": "2024-12-12T03:52:12-08:00",
  "VbnM4Rayj6s": "2024-12-18T03:24:45-08:00",
  "-0o939iKkfg": "2025-06-17T05:33:40-07:00",
  "ZKYTn-QHL4w": "2025-12-24T01:30:35-08:00",
  "DyhVix0p3dQ": "2024-07-12T00:22:36-07:00",
  "VQNUUZWF_y4": "2024-07-12T07:30:09-07:00",
  "qWkvRTvnuA0": "2024-07-13T07:30:26-07:00",
  "uqgpl_S0wuQ": "2024-07-14T21:46:48-07:00",
  "1DHwBhRH0rs": "2024-07-22T19:30:00-07:00",
  "RkItv1fVbFg": "2024-07-26T04:30:15-07:00",
  "DYRHHlV55GA": "2025-03-22T03:54:25-07:00",
  "wPhLXY_w_9A": "2025-10-29T21:54:31-07:00",
  "Ht2o1jv_IuY": "2025-12-16T04:42:59-08:00",
  "HRN89KVb030": "2026-04-22T02:30:39-07:00",
  "gysdH0VUQ2U": "2026-01-08T23:01:48-08:00",
  "hNjGBP97FmM": "2025-12-23T22:56:33-08:00",
  "5MzHT19vG_8": "2026-02-24T05:36:13-08:00",
  "S_Jr0IF_AuE": "2026-03-03T04:20:22-08:00",
  "kUKsLSLIlwQ": "2025-12-08T04:31:10-08:00",
  "wbI2hy64bxo": "2025-11-14T20:47:39-08:00",
  "uTJmZavrdoQ": "2026-05-14T23:36:38-07:00",
  "fL_WBn49V8k": "2024-12-12T22:28:14-08:00",
  "GUNAoafvrFY": "2026-01-30T04:31:27-08:00",
  "wwCf4uTYVXM": "2026-04-29T05:08:38-07:00",
  "_RU5gHlAPfI": "2026-04-30T05:09:58-07:00",
  "sKsgUSF2L9A": "2024-05-09T06:00:55-07:00",
  "9eUZorHKVEU": "2025-11-04T04:31:59-08:00",
};

export const youtubeThumb = (v: Video) => `/video/yt/${v.id}.jpg`;
export const youtubeWatchUrl = (v: Video) =>
  v.kind === "short" ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
