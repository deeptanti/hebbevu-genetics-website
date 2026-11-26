import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata. Titles from the client doc are used verbatim where they exist. */
/**
 * Social share image: pass `image` (a /public path) to override the site default
 * (app/opengraph-image.jpg), e.g. an article's hero photo.
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
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: { card: "summary_large_image", ...(image ? { images: [image] } : {}) },
  };
}
