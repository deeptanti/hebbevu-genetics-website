import Link from "next/link";
import { contact, footerNav, site } from "@/content/site";
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
            © {new Date().getFullYear()} {site.name}. Part of the Hebbevu group.
          </p>
          <p className="type-small text-mist">{site.tagline}.</p>
        </div>
      </Container>
    </footer>
  );
}
