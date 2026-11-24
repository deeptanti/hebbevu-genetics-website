import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata. Titles from the client doc are used verbatim where they exist. */
export function pageMeta({ title, description, path, absoluteTitle }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, locale: "en_IN", type: "website" },
  };
}
