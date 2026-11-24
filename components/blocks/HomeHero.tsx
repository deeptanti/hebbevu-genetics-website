import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/media";
import type { StatItem } from "@/content/types";
import { Container } from "../layout/Container";
import { Reveal, RevealItem } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";

/**
 * HomeHero — photo-led. Headline left; one large farm photograph right, settling in with a
 * slow zoom; a stat card overlaps the photo's corner carrying the honest 60-day figure.
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
    <section className="overflow-hidden bg-white py-8 md:py-9">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-9">
        <Reveal stagger={0.1} className="flex max-w-prose flex-col gap-5">
          {kicker && (
            <RevealItem>
              <p className="type-subheading text-brown">{kicker}</p>
            </RevealItem>
          )}
          <RevealItem>
            <h1 className="type-display text-deep">{title}</h1>
          </RevealItem>
          <RevealItem>
            <p className="type-lede text-ink">{lede}</p>
          </RevealItem>
          <RevealItem className="pt-2">{actions}</RevealItem>
        </Reveal>

        <div className="relative lg:pl-6">
          <div className="relative aspect-portrait w-full overflow-hidden rounded-lg bg-clay">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="animate-settle object-cover"
            />
          </div>
          <Reveal delay={0.6} className="absolute -bottom-7 left-4 max-w-full lg:-left-8">
            <div className="flex flex-col gap-1 rounded-lg border border-stone bg-white p-4 shadow-md">
              <span className="type-stat text-deep">
                <CountUp value={stat.value} />
              </span>
              <span className="type-label text-graphite">{stat.label}</span>
              {stat.note && <span className="type-small max-w-card text-graphite">{stat.note}</span>}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
