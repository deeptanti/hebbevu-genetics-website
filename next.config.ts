import type { NextConfig } from "next";
import { linkShortcuts } from "./content/links";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Link-in-bio short addresses (/ig, /yt, /fb, /in) -> /links, tagged with the source.
      // Temporary (307) so the targets can change without browsers caching them.
      ...linkShortcuts.map(({ path, source }) => ({
        source: path,
        destination: `/links?utm_source=${source}&utm_medium=social&utm_campaign=link_in_bio`,
        permanent: false,
      })),
      // Brief §14: careers lives on the group ATS — do not rebuild.
      { source: "/careers", destination: "https://careers.hebbevu.com", permanent: false },
      // Paths used in the client's content doc → the new IA.
      { source: "/blogs", destination: "/knowledge", permanent: true },
      { source: "/blog", destination: "/knowledge", permanent: true },
      { source: "/blog/:slug", destination: "/knowledge/:slug", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/our-breeds", destination: "/breeds", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/founders-brief", destination: "/about/story", permanent: true },
      // Research page removed: internal programme, not public.
      { source: "/the-lab/research", destination: "/the-lab", permanent: false },
    ];
  },
};

export default nextConfig;
