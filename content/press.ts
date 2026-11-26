/**
 * Press and media coverage of Hebbevu Genetics: the one source for /about/news, the
 * "In the news" links on /links, the homepage "As featured in" strip, the Organization
 * schema (subjectOf) and llms.txt.
 *
 * TO ADD COVERAGE: add an item to `press` (newest first within its story) and, if it
 * starts a new story, a story to `pressStories`. Save the article's preview image as
 * /public/press/<id>.jpg (640px wide) or leave `image` out for a named placeholder.
 * Headlines are the outlet's own, verbatim. Dates are the article's published date.
 */

export interface PressItem {
  /** Stable id; also the analytics id on /links. */
  id: string;
  outlet: string;
  headline: string;
  url: string;
  /** ISO date the piece was published. */
  date: string;
  kind: "article" | "video";
  story: PressStoryId;
  image?: string;
}

export type PressStoryId = "expozebu-2026" | "agrotill-2026" | "launch-2024";

export interface PressStory {
  id: PressStoryId;
  title: string;
  /** One or two sentences, from what the coverage itself reports. */
  summary: string;
}

export const pressStories: PressStory[] = [
  {
    id: "expozebu-2026",
    title: "ExpoZebu, Brazil, May 2026",
    summary:
      "Hebbevu Genetics partnered with ACN Agropecuária at ExpoZebu in Brazil, marking the first Indian presence at the ABCZ in 70 years.",
  },
  {
    id: "agrotill-2026",
    title: "On video",
    summary: "AgroTill’s film on Hebbevu Genetics and the modern cattle IVF revolution in India.",
  },
  {
    id: "launch-2024",
    title: "Launch, July 2024",
    summary: "Hebbevu Managed Farmland launched Hebbevu Genetics to bring cattle IVF to Indian dairy farming.",
  },
];

export const press: PressItem[] = [
  {
    id: "news-tribune-expozebu",
    outlet: "The Tribune",
    headline: "Hebbevu Genetics Partners ACN Agropecuária at ExpoZebu, Marks First Indian Presence at ABCZ in 70 Years",
    url: "https://www.tribuneindia.com/news/business/hebbevu-genetics-partners-acn-agropecuaria-at-expozebu-marks-first-indian-presence-at-abcz-in-70-years",
    date: "2026-05-04",
    kind: "article",
    story: "expozebu-2026",
    image: "/press/news-tribune-expozebu.jpg",
  },
  {
    id: "news-hindustan-times-expozebu",
    outlet: "Hindustan Times",
    headline: "Hebbevu Genetics Partners ACN Agropecuária at ExpoZebu, Marks First Indian Presence at ABCZ in 70 Years",
    url: "https://www.hindustantimes.com/brand-stories/hebbevu-genetics-partners-acn-agropecu-ria-at-expozebu-marks-first-indian-presence-at-abcz-in-70-years-101777888021625.html",
    date: "2026-05-04",
    kind: "article",
    story: "expozebu-2026",
    image: "/press/news-hindustan-times-expozebu.jpg",
  },
  {
    id: "news-dailyhunt-expozebu",
    outlet: "Dailyhunt",
    headline: "Hebbevu Genetics Partners ACN Agropecuária at ExpoZebu, Marks First Indian Presence at ABCZ in 70 Years",
    url: "https://m.dailyhunt.in/news/india/english/sangri+times-epaper-dh95df621a7fd04fa4860b3336547dd507/hebbevu+genetics+partners+acn+agropecuria+at+expozebu+marks+first+indian+presence+at+abcz+in+70+years-newsid-dh95df621a7fd04fa4860b3336547dd507_1630dcc0479b11f18f4e596ccb0d1bd2?sm=Y",
    date: "2026-05-04",
    kind: "article",
    story: "expozebu-2026",
    image: "/press/news-dailyhunt-expozebu.jpg",
  },
  {
    id: "video-agrotill",
    outlet: "AgroTill",
    headline: "Modern IVF Cattle Revolution in India | Hebbevu Genetics",
    url: "https://www.youtube.com/watch?v=DAFx_0tpmjc",
    date: "2026-02-25",
    kind: "video",
    story: "agrotill-2026",
    image: "/video/yt/DAFx_0tpmjc.jpg",
  },
  {
    id: "news-yourstory",
    outlet: "YourStory",
    headline: "Hebbevu Genetics is using IVF to make dairy farming sustainable and profitable",
    url: "https://yourstory.com/2024/07/hebbevu-genetics-uses-ivf-making-dairy-farming-sustainable",
    date: "2024-07-26",
    kind: "article",
    story: "launch-2024",
    image: "/press/news-yourstory.jpg",
  },
  {
    id: "news-deccan-herald",
    outlet: "Deccan Herald",
    headline: "Hebbevu Managed Farmland launches Hebbevu Genetics to transform cattle IVFs in India",
    url: "https://www.deccanherald.com/brandspot/featured/hebbevu-managed-farmland-launches-hebbevu-genetics-to-transform-cattle-ivfs-in-india-3119829",
    date: "2024-07-24",
    kind: "article",
    story: "launch-2024",
    image: "/press/news-deccan-herald.jpg",
  },
  {
    id: "news-republic",
    outlet: "Republic",
    headline: "Hebbevu Managed Farmland launches Hebbevu Genetics to transform cattle IVFs in India",
    url: "https://www.republicworld.com/initiatives/hebbevu-managed-farmland-launches-hebbevu-genetics-to-transform-cattle-ivf-in-india",
    date: "2024-07-24",
    kind: "article",
    story: "launch-2024",
    image: "/press/news-republic.jpg",
  },
  {
    id: "news-startup-story",
    outlet: "The Startup Story",
    headline: "Hebbevu Managed Farmland launches Hebbevu Genetics to transform cattle IVFs in India",
    url: "https://thestartupstory.co.in/index.php/2024/07/23/hebbevu-managed-farmland-launches-hebbevu-genetics-to-transform-cattle-ivfs-in-india/",
    date: "2024-07-23",
    kind: "article",
    story: "launch-2024",
  },
  {
    id: "news-ny-weekly",
    outlet: "New York Weekly",
    headline: "Hebbevu Managed Farmland Launches Hebbevu Genetics",
    url: "https://nyweekly.com/science/hebbevu-managed-farmland-launches-hebbevu-genetics/",
    date: "2024-08-22",
    kind: "article",
    story: "launch-2024",
    image: "/press/news-ny-weekly.jpg",
  },
];

/** Outlets named in the homepage "As featured in" strip, in this order. */
export const featuredOutlets = ["The Tribune", "Hindustan Times", "YourStory", "Deccan Herald", "Republic", "New York Weekly"];

export const pressByStory = (id: PressStoryId) => press.filter((p) => p.story === id);

/** "4 May 2026" */
export const formatPressDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
