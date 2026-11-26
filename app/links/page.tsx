import type { Metadata } from "next";
import Image from "next/image";
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { LinkList, linkTracking } from "@/components/blocks/LinkList";
import { Section } from "@/components/layout/Section";
import { getLinksPage } from "@/content/links";
import { socials } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

const page = getLinksPage();
/** Social icons sit after every link, so their positions continue the count. */
const linkCount = page.sections.reduce((n, s) => n + s.links.length, 0);

/**
 * /links: our own link-in-bio page (replaces Linktree). Bios point at /ig, /yt, /fb or /in,
 * which redirect here with UTM tags. Kept out of search results (a list of links is thin
 * content) but fully tracked in GA4. Content lives in content/links.ts.
 */
export const metadata: Metadata = {
  ...pageMeta({ title: "Links", description: page.intro, path: "/links" }),
  robots: { index: false, follow: true },
};

const socialIcons = { Instagram: InstagramLogo, Facebook: FacebookLogo, YouTube: YoutubeLogo, LinkedIn: LinkedinLogo } as const;

export default function LinksPage() {
  return (
    <Section tone="mist" labelledBy="links-title">
      <div className="mx-auto flex w-full max-w-prose flex-col gap-7">
        <header className="flex flex-col items-center gap-4 text-center">
          <Image src="/brand/logo-mark.png" alt="" width={77} height={64} priority className="h-9 w-auto" />
          <h1 id="links-title" className="type-h2 text-ink">
            {page.title}
          </h1>
          <p className="type-body text-graphite">{page.intro}</p>
        </header>
        <LinkList sections={page.sections} />
        <ul aria-label="Hebbevu Genetics on social media" className="flex justify-center gap-3">
          {socials.map((s, k) => {
            const Glyph = socialIcons[s.name];
            return (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} (opens in a new tab)`}
                  {...linkTracking(`social-${s.name.toLowerCase()}`, s.name, "socials", linkCount + k + 1)}
                  className="transition-ui flex size-7 items-center justify-center rounded-full border border-graphite text-brown hover:border-brown-dark hover:text-brown-dark"
                >
                  <Glyph aria-hidden="true" weight="regular" className="size-5" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
