import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/media";
import type { StatItem } from "@/content/types";
import { Container } from "../layout/Container";
import { CountUp } from "../motion/CountUp";
import { Reveal, RevealItem } from "../motion/Reveal";
import { BrandIcon, type BrandIconName } from "../ui/BrandIcon";

/**
 * HomeHero — full-bleed farm photograph settling in with a slow zoom, a deep gradient for
 * legibility, the headline in white, and a stat card floating over the photo's corner.
 * `actions` must use dark-ground buttons.
 */
export function HomeHero({
  title,
  lede,
  actions,
  photo,
  stat,
  kicker,
}: {
  title: string;
  lede: string;
  actions: ReactNode;
  photo: Photo;
  stat: StatItem;
  kicker?: string;
}) {
  return (
    <section data-ground="dark" className="relative isolate overflow-hidden bg-deep">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="animate-settle -z-20 object-cover object-bottom" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-deep via-deep/80 to-deep/20 lg:bg-linear-to-r lg:from-deep lg:via-deep/70 lg:to-transparent" />
      <Container className="flex min-h-screen flex-col justify-end gap-8 py-9 lg:flex-row lg:items-end lg:justify-between lg:py-10">
        <Reveal stagger={0.1} className="flex max-w-prose flex-col gap-5">
          {kicker && (
            <RevealItem>
              <p className="type-subheading text-mist">{kicker}</p>
            </RevealItem>
          )}
          <RevealItem>
            <h1 className="type-display text-white">{title}</h1>
          </RevealItem>
          <RevealItem>
            <p className="type-lede text-mist">{lede}</p>
          </RevealItem>
          <RevealItem className="pt-2">{actions}</RevealItem>
        </Reveal>

        <Reveal delay={0.7} className="self-start lg:self-end">
          <div data-ground="light" className="flex max-w-card items-center gap-4 rounded-lg bg-white p-4 shadow-md">
            {stat.brandIcon && <BrandIcon name={stat.brandIcon as BrandIconName} size="md" />}
            <div className="flex flex-col gap-1">
              <span className="type-stat text-deep">
                <CountUp value={stat.value} />
              </span>
              <span className="type-label text-graphite">{stat.label}</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
