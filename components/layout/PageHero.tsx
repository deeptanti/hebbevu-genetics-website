import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Heading } from "../typography/Heading";
import { Breadcrumbs } from "./Breadcrumbs";
import { Reveal, RevealItem } from "../motion/Reveal";
import { Section, type SectionTone } from "./Section";

/**
 * PageHero — the page's single H1. `display` uses the hero tier; interior pages use h1.
 * Light ground only (the CTABand is the page's one dark block).
 */
export interface PageHeroProps {
  title: ReactNode;
  kicker?: string;
  lede?: string | string[];
  display?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  /** Right-hand column (media, stats, chips). */
  aside?: ReactNode;
  tone?: Extract<SectionTone, "white" | "mist">;
  children?: ReactNode;
}

export function PageHero({ title, kicker, lede, display, breadcrumbs, actions, aside, tone = "white", children }: PageHeroProps) {
  const ledes = lede === undefined ? [] : Array.isArray(lede) ? lede : [lede];
  return (
    <Section tone={tone} size={display ? "hero" : "default"}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className={cn("grid gap-7", aside && "lg:grid-cols-2 lg:items-center")}>
        <Reveal stagger={0.09} className="flex max-w-prose flex-col gap-5">
          {kicker && (
            <RevealItem>
              <p className="type-subheading text-brown">{kicker}</p>
            </RevealItem>
          )}
          <RevealItem>
            <Heading level={1} variant={display ? "display" : "h1"}>
              {title}
            </Heading>
          </RevealItem>
          {ledes.map((l) => (
            <RevealItem key={l}>
              <p className="type-lede text-ink">{l}</p>
            </RevealItem>
          ))}
          {actions && <RevealItem className="pt-2">{actions}</RevealItem>}
          {children && <RevealItem>{children}</RevealItem>}
        </Reveal>
        {aside && (
          <Reveal delay={0.25}>
            {aside}
          </Reveal>
        )}
      </div>
    </Section>
  );
}
