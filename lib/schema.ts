import type { FaqItem } from "@/content/types";
import { contact, site, socials } from "@/content/site";

/**
 * schema.org JSON-LD builders, following Google Search Central's structured data guides
 * (checked Nov 2026). Notes from those docs:
 * - Organization/LocalBusiness and WebSite belong on the home page only.
 * - BreadcrumbList is shown as a rich result on desktop.
 * - FAQ rich results were retired in May 2026. FAQPage markup is kept on the FAQ page because
 *   it is valid schema.org, matches visible content and is still read by other search engines.
 * Everything marked up here must also be visible on the page.
 */

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path === "/" ? "" : path}`);

export const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: site.name,
    description:
      "South India’s first private cattle IVF lab, offering IVF embryo production, embryo transfer, surrogate management and elite indigenous cattle embryos.",
    url: site.url,
    logo: abs("/brand/logo-stacked.png"),
    image: abs("/photos/farm/aerial.jpg"),
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "46/1C Chinnamanthur, Roddam Mandal, Reynadu Farm, Cholemarri Chinnamanthur",
      addressLocality: "Sri Sathya Sai",
      addressRegion: "Andhra Pradesh",
      postalCode: "515124",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: contact.geo.latitude, longitude: contact.geo.longitude },
    hasMap: contact.mapsHref,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: contact.opens,
      closes: contact.closes,
    },
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phoneHref.replace("tel:", ""),
      email: contact.email,
      contactType: "customer service",
      areaServed: "IN",
    },
    sameAs: [...socials.map((s) => s.href), contact.mapsHref],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    alternateName: ["Hebbevu", "hebbevugenetics.com"],
    url: `${site.url}/`,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      // The last crumb is the current page; Google uses the page URL when `item` is omitted.
      ...(it.href ? { item: abs(it.href) } : {}),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: abs(a.path),
    mainEntityOfPage: abs(a.path),
    ...(a.image ? { image: [abs(a.image)] } : {}),
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: site.name, logo: abs("/brand/logo-stacked.png") },
  };
}
