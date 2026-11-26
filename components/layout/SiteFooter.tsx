import Link from "next/link";
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { cookieConsentCopy } from "@/content/consent";
import { contact, footerNav, site, socials } from "@/content/site";
import { COOKIE_SETTINGS_HASH } from "@/lib/consent";

const socialIcons = { Instagram: InstagramLogo, Facebook: FacebookLogo, YouTube: YoutubeLogo, LinkedIn: LinkedinLogo } as const;
import { Icon } from "../ui/Icon";
import { Container } from "./Container";
import { LogoPlate } from "./Logo";

/** Footer on `deep`. The logo sits on a light plate (brief §7). */
export function SiteFooter() {
  return (
    <footer data-ground="dark" className="bg-deep text-mist">
      <Container className="py-8 md:py-9">
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="flex flex-col gap-5">
            <LogoPlate className="self-start" />
            <p className="type-body text-mist">
              <span className="font-heading italic">“{site.vision.hindi}”</span>: {site.vision.english}
            </p>
            <address className="type-small flex flex-col gap-3 not-italic text-mist">
              <a href={contact.phoneHref} className="transition-ui inline-flex min-h-7 items-center gap-3 hover:text-white">
                <Icon name="phone" /> {contact.phoneDisplay}
              </a>
              <a href={contact.emailHref} className="transition-ui inline-flex min-h-7 items-center gap-3 hover:text-white">
                <Icon name="mail" /> {contact.email}
              </a>
              <span className="inline-flex gap-3">
                <Icon name="map" />
                <span>
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </span>
            </address>
            <ul aria-label="Hebbevu Genetics on social media" className="flex gap-3">
              {socials.map((s) => {
                const Glyph = socialIcons[s.name];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.name} (opens in a new tab)`}
                      className="transition-ui flex size-7 items-center justify-center rounded-full border border-graphite text-mist hover:border-mist hover:text-white"
                    >
                      <Glyph aria-hidden="true" weight="regular" className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-2">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="type-label mb-3 text-mist">{col.heading}</h2>
                <ul className="flex flex-col">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      {it.href === "/careers" ? (
                        <a
                          href={site.careersUrl}
                          className="transition-ui type-small inline-flex min-h-7 items-center text-mist underline-offset-4 hover:text-white hover:underline"
                        >
                          {it.label}
                        </a>
                      ) : (
                        <Link
                          href={it.href}
                          className="transition-ui type-small inline-flex min-h-7 items-center text-mist underline-offset-4 hover:text-white hover:underline"
                        >
                          {it.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-7 flex flex-col gap-2 border-t border-graphite pt-5 sm:flex-row sm:justify-between">
          <p className="type-small text-mist">
            © {new Date().getFullYear()} {site.name}. Part of Nisarga Woods.
          </p>
          <p className="type-small flex flex-wrap gap-x-5 gap-y-2 text-mist">
            <a href={COOKIE_SETTINGS_HASH} className="transition-ui underline-offset-4 hover:text-white hover:underline">
              {cookieConsentCopy.footerLink}
            </a>
            <span>{site.tagline}.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
