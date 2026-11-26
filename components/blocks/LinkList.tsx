import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { LinkSection } from "@/content/links";
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
            <ul className="flex flex-col gap-3">
              {s.links.map((l) => {
                const external = isExternal(l.href);
                const Arrow = external ? ArrowUpRight : ArrowRight;
                const cls =
                  "transition-ui group flex min-h-7 items-center gap-4 rounded-lg border border-graphite bg-white px-5 py-3 text-ink hover:border-brown-dark hover:bg-mist";
                const inner = (
                  <>
                    {l.icon && <Icon name={l.icon} className="text-brown" />}
                    <span className="flex flex-1 flex-col">
                      <span className="type-body font-semibold">{l.label}</span>
                      {l.sublabel && <span className="type-small text-graphite">{l.sublabel}</span>}
                    </span>
                    <Arrow aria-hidden="true" weight="bold" className="size-4 shrink-0 text-brown" />
                  </>
                );
                return (
                  <li key={l.id}>
                    {external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls} {...linkTracking(l.id, l.label, s.id, l.position)}>
                        {inner}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={l.href} className={cls} {...linkTracking(l.id, l.label, s.id, l.position)}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          // Untitled section = the action row: the first link is the one primary button.
          <div key={s.id} className="flex flex-col gap-3">
            {s.links.map((l, k) => {
              const cls = cn(buttonClass(k === 0 ? "primary" : "secondary"), "w-full");
              const inner = (
                <>
                  {l.icon && <Icon name={l.icon} />}
                  <span>{l.label}</span>
                </>
              );
              return isExternal(l.href) ? (
                <a
                  key={l.id}
                  href={l.href}
                  className={cls}
                  {...linkTracking(l.id, l.label, s.id, l.position)}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {inner}
                </a>
              ) : (
                <Link key={l.id} href={l.href} className={cls} {...linkTracking(l.id, l.label, s.id, l.position)}>
                  {inner}
                </Link>
              );
            })}
          </div>
        ),
      )}
    </div>
  );
}
