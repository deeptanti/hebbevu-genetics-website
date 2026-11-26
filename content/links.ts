/**
 * The /links page (our own link-in-bio, replacing Linktree).
 *
 * TO EDIT: change this file only. Order in the arrays is the order on the page
 * (the untitled "actions" section renders as the contact buttons; the social icons
 * always come last, after every section).
 * - Add a link: copy an entry, give it a new unique `id`.
 * - Hide a link without deleting it: set `hidden: true`.
 * - Keep `id` stable once a link is live: GA4 reports clicks by it (event link_click,
 *   parameter link_id), so changing it starts a new history for that link.
 *
 * Shaped so a CMS can supply the same `LinksPage` object later (see getLinksPage).
 * House style: no em dashes.
 */
import type { IconName } from "./types";
import { press } from "./press";
import { contact } from "./site";

export interface LinkEntry {
  /** Stable analytics id: lowercase-with-dashes, unique across the page. */
  id: string;
  label: string;
  /** One short line under the label, e.g. a headline or the outlet. */
  sublabel?: string;
  href: string;
  icon?: IconName;
  /**
   * Thumbnail (a /public path, 16:9 works best). YouTube links get theirs automatically
   * from /video/yt/<id>.jpg; for news links save the article's preview image in /public/press.
   */
  image?: string;
  hidden?: boolean;
}

export interface LinkSection {
  id: string;
  /** Omit for the top action row. */
  title?: string;
  /** "grid" shows two thumbnail cards per row (used for videos). Default: one row per link. */
  layout?: "list" | "grid";
  links: LinkEntry[];
}

export interface LinksPage {
  title: string;
  intro: string;
  sections: LinkSection[];
}

const linksPage: LinksPage = {
  title: "Hebbevu Genetics",
  intro: "South India’s first private cattle IVF lab. Elite indigenous genetics for dairy farmers in India and worldwide.",
  sections: [
    {
      id: "watch",
      title: "Watch",
      layout: "grid",
      links: [
        { id: "yt-ongole-legacy", label: "The legacy of Ongole lives on", href: "https://youtu.be/sDZ3VOSc5MY" },
        { id: "yt-cattle-parlour", label: "Our newly installed cattle parlour", href: "https://youtu.be/WGcFP4J1ejI" },
        { id: "yt-brazil-genetics", label: "Why Brazil is deeply connected to Indian genetics", href: "https://youtu.be/-0o939iKkfg" },
        { id: "yt-nandi", label: "Nandi", href: "https://youtu.be/mlEZWqcoD5U" },
        { id: "yt-full-podcast", label: "Full podcast", href: "https://youtu.be/nrBHtS2aBGA" },
        { id: "yt-brazil-trip-4", label: "My solo trip to Brazil, episode 4", href: "https://www.youtube.com/watch?v=VbnM4Rayj6s" },
      ],
    },
    {
      id: "explore",
      title: "Explore",
      links: [
        { id: "ivf-own-donors", label: "IVF with your own donors", sublabel: "Multiply your best cows faster", href: "/services/ivf-your-donors", icon: "dna" },
        { id: "buy-embryos", label: "Buy elite embryos", sublabel: "Sex-sorted or normal, from our own herd", href: "/services/buy-embryos", icon: "package" },
        { id: "embryo-transfer", label: "Embryo transfer and surrogates", href: "/services/embryo-transfer", icon: "baby" },
        { id: "breeds", label: "Our breeds", sublabel: "Gir, Sahiwal, Ongole, Kankrej and more", href: "/breeds", icon: "cow" },
        { id: "website", label: "Visit our website", href: "/", icon: "globe" },
      ],
    },
    {
      id: "news",
      title: "In the news",
      // From content/press.ts (articles only; the AgroTill film is on /about/news).
      links: press
        .filter((p) => p.kind === "article")
        .map((p) => ({ id: p.id, label: p.outlet, sublabel: p.headline, href: p.url, image: p.image })),
    },
    {
      id: "actions",
      links: [
        { id: "book", label: "Book a consultation", href: "/book", icon: "calendar" },
        { id: "whatsapp", label: "WhatsApp us", href: contact.whatsappHref, icon: "whatsapp" },
        { id: "call", label: `Call ${contact.phoneDisplay}`, href: contact.phoneHref, icon: "phone" },
      ],
    },
  ],
};

const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([\w-]{11})/;

/** Visible sections and links, in page order. A CMS can replace this function later. */
export function getLinksPage(): LinksPage {
  return {
    ...linksPage,
    sections: linksPage.sections
      .map((s) => ({
        ...s,
        links: s.links
          .filter((l) => !l.hidden)
          .map((l) => {
            const yt = l.href.match(YOUTUBE_ID)?.[1];
            return l.image || !yt ? l : { ...l, image: `/video/yt/${yt}.jpg` };
          }),
      }))
      .filter((s) => s.links.length > 0),
  };
}

/**
 * Short addresses for each bio (hebbevugenetics.com/ig etc.). Each redirects to /links
 * with UTM tags, so GA4 shows which network every visit came from. Wired in next.config.ts.
 */
export const linkShortcuts = [
  { path: "/ig", source: "instagram" },
  { path: "/yt", source: "youtube" },
  { path: "/fb", source: "facebook" },
  { path: "/in", source: "linkedin" },
] as const;
