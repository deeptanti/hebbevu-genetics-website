import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
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
