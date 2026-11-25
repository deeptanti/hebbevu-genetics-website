import { videos, type Video } from "../videos";

/** Where films from the YouTube channel appear, and the words around them. */
interface FilmBlock {
  heading: string;
  intro?: string;
  films?: Video[];
  shorts?: Video[];
}

const v = videos;

export const films = {
  home: {
    heading: "Better genetics, not more cows",
    intro: "Films from our YouTube channel: why we breed for quality over numbers, and the calves it is producing.",
    films: [v.improveGenetics, v.breedWithIntent, v.ivfCalves, v.nextGeneration],
  },
  about: {
    heading: "The journey on film",
    intro: "A year of milestones, the search for elite bulls, and taking Hebbevu Genetics to the world.",
    films: [v.yearOfMilestones, v.widerVision, v.roadToSelection, v.globalBenchmarks],
  },
  story: {
    heading: "In the founder’s words",
    intro: "Mr. Amith Kishan on why Hebbevu Genetics exists, and on the Gir heritage it is built on.",
    films: [v.legacyOfPurpose, v.badwaDarbar, v.girDeepDive],
  },
  origins: {
    heading: "How it began, in six episodes",
    intro: "From a family farm to an IVF lab: the founding story, told one short episode at a time.",
    shorts: [v.origin1, v.origin2, v.origin3, v.origin4, v.origin5, v.origin6],
  },
  team: {
    heading: "Meet the founder",
    intro: "The full podcast with Mr. Amith Kishan: how Hebbevu Genetics started, what he has learned, and his guide for anyone starting out in dairy farming.",
    films: [v.podcast],
  },
  farm: {
    heading: "Walk around the farm",
    intro: "The parlour, the bulls and the herd, filmed at Reynadu Farm.",
    films: [v.parlour, v.bullsAreFamily, v.girCows, v.ongoleLegacy, v.naturalCare],
    shorts: [v.grassToMilk, v.preservedGenetics, v.girHeritage, v.informedBreeding],
  },
  partners: {
    heading: "Brazil, on film",
    intro: "Mr. Amith Kishan’s visits to Brazil’s leading Gir farms, and what India can learn from them.",
    films: [v.brazilNeedsIndia, v.brazil1, v.brazil2, v.brazil3, v.brazil4],
  },
  partnersShorts: {
    heading: "Around the world",
    intro: "Expos, visits and conversations with breeders abroad.",
    shorts: [v.indiaBrazil, v.avaVisit, v.expoZebu, v.comcebu, v.zebu, v.charteredFlight],
  },
  gallery: {
    heading: "On our YouTube channel",
    intro: "Short films from the farm and the show ring. Press play to watch here.",
    shorts: [v.deliberateGrowth, v.cattleShow, v.girBull, v.jaffarabadi],
  },
} satisfies Record<string, FilmBlock>;

export const watchOnYouTube = "More on YouTube";
