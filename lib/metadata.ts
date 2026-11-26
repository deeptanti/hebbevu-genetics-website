import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata. Titles from the client doc are used verbatim where they exist. */
/** Site-wide share image (1200x630), used when a page has no photo of its own. */
export const DEFAULT_SHARE_IMAGE = { url: "/brand/og-default.jpg", width: 1200, height: 630, alt: "Gir cattle lined up at the Hebbevu Genetics farm" };

/**
 * Social share image: pass `image` (a /public path) to override the site default,
 * e.g. an article's hero photo.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
  image,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: string;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: image ? "article" : "website",
      images: [image ? { url: image, alt: title } : DEFAULT_SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [image ?? DEFAULT_SHARE_IMAGE.url] },
  };
}
