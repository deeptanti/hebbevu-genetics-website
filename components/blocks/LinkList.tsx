import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
import type { LinkEntry, LinkSection } from "@/content/links";
import { cn } from "@/lib/cn";
import { buttonClass } from "../ui/Button";
import { Icon } from "../ui/Icon";

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

/**
 * Attributes that make ClickTracker send link_click to GA4 with the link's stable id, label,
 * URL, section and position on the page (1 = top), so GA4 can report clicks and
 * click-through per link, like Linktree.
 */
export function linkTracking(id: string, label: string, section: string, position: number) {
  return { "data-link-id": id, "data-link-label": label, "data-link-section": section, "data-link-position": String(position) };
}

/** One link: opens external URLs in a new tab, internal ones with next/link. */
function LinkAnchor({ link, section, className, children }: { link: LinkEntry & { position: number }; section: string; className: string; children: ReactNode }) {
  const track = linkTracking(link.id, link.label, section, link.position);
  if (!isExternal(link.href))
    return (
      <Link href={link.href} className={className} {...track}>
        {children}
      </Link>
    );
  const newTab = link.href.startsWith("http");
  return (
    <a href={link.href} className={className} {...track} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** The /links page body. */
export function LinkList({ sections, startAt = 0 }: { sections: LinkSection[]; startAt?: number }) {
  let position = startAt;
  const numbered = sections.map((s) => ({ ...s, links: s.links.map((l) => ({ ...l, position: ++position })) }));

  return (
    <div className="flex flex-col gap-7">
      {numbered.map((s) =>
        s.title ? (
          <section key={s.id} aria-labelledby={`links-${s.id}`} className="flex flex-col gap-3">
            <h2 id={`links-${s.id}`} className="type-label text-graphite">
              {s.title}
            </h2>
            {s.layout === "grid" ? (
              <ul className="grid grid-cols-2 gap-3">
                {s.links.map((l) => (
                  <li key={l.id}>
                    <LinkAnchor
                      link={l}
                      section={s.id}
                      className="transition-ui group flex h-full flex-col overflow-hidden rounded-lg border border-graphite bg-white text-ink hover:border-brown-dark"
                    >
                      <span className="relative block aspect-wide w-full overflow-hidden bg-deep">
                        {l.image && (
                          <Image src={l.image} alt="" fill sizes="(min-width: 768px) 360px, 50vw" className="transition-move object-cover group-hover:scale-105" />
                        )}
                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                          <span className="transition-move flex size-6 items-center justify-center rounded-full bg-brown text-white shadow-md group-hover:scale-110 group-hover:bg-brown-dark">
                            <Play weight="fill" className="size-4" />
                          </span>
                        </span>
                      </span>
                      <span className="type-small p-3 font-semibold">{l.label}</span>
                    </LinkAnchor>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-3">
                {s.links.map((l) => {
                  const Arrow = isExternal(l.href) ? ArrowUpRight : ArrowRight;
                  // In a section with thumbnails, a link without one gets a named placeholder tile.
                  const thumbs = s.links.some((x) => x.image);
                  return (
                    <li key={l.id}>
                      <LinkAnchor
                        link={l}
                        section={s.id}
                        className={cn(
                          "transition-ui group flex min-h-7 items-center gap-4 rounded-lg border border-graphite bg-white text-ink hover:border-brown-dark hover:bg-mist",
                          thumbs ? "p-3 pr-5" : "px-5 py-3",
                        )}
                      >
                        {thumbs ? (
                          <span className="relative flex aspect-wide w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-mist sm:w-10">
                            {l.image ? (
                              <Image src={l.image} alt="" fill sizes="128px" className="object-cover" />
                            ) : (
                              <span aria-hidden="true" className="type-label px-2 text-center text-brown">
                                {l.label}
                              </span>
                            )}
                          </span>
                        ) : (
                          l.icon && <Icon name={l.icon} className="text-brown" />
                        )}
                        <span className="flex flex-1 flex-col">
                          <span className="type-body font-semibold">{l.label}</span>
                          {l.sublabel && <span className="type-small text-graphite">{l.sublabel}</span>}
                        </span>
                        <Arrow aria-hidden="true" weight="bold" className="size-4 shrink-0 text-brown" />
                      </LinkAnchor>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ) : (
          // Untitled section = the action row: the first link is the one primary button.
          <div key={s.id} className="flex flex-col gap-3">
            {s.links.map((l, k) => (
              <LinkAnchor key={l.id} link={l} section={s.id} className={cn(buttonClass(k === 0 ? "primary" : "secondary"), "w-full")}>
                {l.icon && <Icon name={l.icon} />}
                <span>{l.label}</span>
              </LinkAnchor>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
