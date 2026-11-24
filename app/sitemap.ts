import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { breeds } from "@/content/breeds";
import { footerNav, primaryNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/book", "/contact", "/breeds/compare"]);
  for (const n of primaryNav) {
    paths.add(n.href);
    n.children?.forEach((c) => paths.add(c.href));
  }
  footerNav.flatMap((c) => c.items).forEach((i) => !["/careers", "/legal/privacy", "/legal/terms"].includes(i.href) && paths.add(i.href));
  breeds.forEach((b) => paths.add(`/breeds/${b.slug}`));
  articles.forEach((a) => paths.add(`/knowledge/${a.slug}`));
  return [...paths].map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` }));
}
