import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/media";
import type { StatItem } from "@/content/types";
import { CountUp } from "../motion/CountUp";
import { BrandIcon, type BrandIconName } from "../ui/BrandIcon";
import { cn } from "@/lib/cn";
import { Reveal, RevealItem } from "../motion/Reveal";
import { Button, ButtonGroup } from "../ui/Button";
import { BreedVideo } from "../visuals/BreedVideo";
import { HeroSlideshow } from "../visuals/HeroSlideshow";
import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";

/**
 * PageHero - the ONE hero used by every page except Home.
 *
 * A full-bleed photograph (or a looping video) under a deep gradient, with the page's single
 * H1 bottom-aligned in white. Buttons are passed as data so they always render as dark-ground
 * buttons; the first is the primary. Key figures sit in a frosted glass bar along the bottom.
 * `tall` for section landing pages, `compact` for detail pages.
 */
export interface HeroAction {
  label: string;
  href: string;
}

export interface PageHeroProps {
  title: ReactNode;
  photo: Photo;
  /** Several photos that crossfade and drift (home). `photo` is the first/fallback. */
  slides?: Photo[];
  /** Looping video that replaces the photo (the photo becomes its fallback). */
  video?: { src: string; poster: string; label: string };
  kicker?: string;
  lede?: string | string[];
  breadcrumbs?: { label: string; href?: string }[];
  /** First action is primary; the rest are secondary. */
  actions?: HeroAction[];
  /** Short tags (traits, topics) shown as chips. */
  tags?: string[];
  /** One small line under the lede (e.g. "5 min read", species). */
  note?: string;
  /** Photo caption, bottom-right (names people in the photo). */
  caption?: string;
  /** Key figures in a frosted glass bar along the bottom of the hero. */
  stats?: StatItem[];
  size?: "tall" | "compact";
  /** Which part of the photo to keep in frame. */
  /** Which part of the photo to keep in frame. Defaults to "upper" for portrait/square photos. */
  focus?: "center" | "top" | "bottom" | "upper";
}

const focusClass = { center: "object-center", top: "object-top", bottom: "object-bottom", upper: "object-upper" } as const;

/** Display size only for short headlines; long ones use h1 so they stay to two or three lines. */
const DISPLAY_MAX_CHARS = 36;

export function PageHero({
  title,
  photo,
  slides,
  video,
  kicker,
  lede,
  breadcrumbs,
  actions,
  tags,
  note,
  caption,
  stats,
  size = "compact",
  focus,
}: PageHeroProps) {
  const frame = focus ?? (photo.height >= photo.width * 0.9 ? "upper" : "center");
  const display = size === "tall" && typeof title === "string" && title.length <= DISPLAY_MAX_CHARS;
  const ledes = lede === undefined ? [] : Array.isArray(lede) ? lede : [lede];
  return (
    <section data-ground="dark" className="relative isolate overflow-hidden bg-deep">
      {slides && slides.length > 1 ? (
        <HeroSlideshow photos={slides} />
      ) : video ? (
        <div className="absolute inset-0 -z-20">
          <BreedVideo src={video.src} poster={video.poster} label={video.label} fill />
        </div>
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className={cn("animate-settle -z-20 object-cover", focusClass[frame])}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-deep via-deep/75 to-deep/10 lg:bg-linear-to-r lg:from-deep lg:via-deep/60 lg:to-transparent"
      />
      <Container
        className={cn(
          "flex flex-col justify-end gap-7 pt-9 pb-8 md:pb-9",
          size === "tall" ? "min-h-hero" : "min-h-hero-compact",
        )}
      >
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <Reveal stagger={0.08} className="flex max-w-prose flex-col gap-5">
          {breadcrumbs && (
            <RevealItem>
              <Breadcrumbs items={breadcrumbs} ground="dark" className="mb-0" />
            </RevealItem>
          )}
          {kicker && (
            <RevealItem>
              <p className="type-subheading text-sand">{kicker}</p>
            </RevealItem>
          )}
          <RevealItem>
            <h1 className={cn(display ? "type-display" : "type-h1", "text-white")}>{title}</h1>
          </RevealItem>
          {ledes.map((l) => (
            <RevealItem key={l}>
              <p className="type-lede text-mist">{l}</p>
            </RevealItem>
          ))}
          {note && (
            <RevealItem>
              <p className="type-small font-semibold text-sand">{note}</p>
            </RevealItem>
          )}
          {tags && tags.length > 0 && (
            <RevealItem>
              <ul className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li key={t} className="type-label rounded-full border border-mist px-3 py-1 text-mist">
                    {t}
                  </li>
                ))}
              </ul>
            </RevealItem>
          )}
          {actions && actions.length > 0 && (
            <RevealItem className="pt-2">
              <ButtonGroup>
                {actions.map((a, i) => (
                  <Button key={a.href} href={a.href} ground="dark" variant={i === 0 ? "primary" : "secondary"} arrow={i === 0}>
                    {a.label}
                  </Button>
                ))}
              </ButtonGroup>
            </RevealItem>
          )}
        </Reveal>

        {caption && (
          <Reveal delay={0.5}>
            <p className="type-small max-w-card text-mist lg:text-right">{caption}</p>
          </Reveal>
        )}
        </div>

        {stats && stats.length > 0 && (
          <Reveal delay={0.45}>
            <dl
              className={cn(
                "grid gap-x-4 gap-y-5 rounded-lg border border-white/15 bg-deep/40 p-4 backdrop-blur-md md:gap-x-6 md:p-6",
                stats.length === 1 ? "max-w-prose" : stats.length === 2 ? "sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-4",
              )}
            >
              {stats.map((st, k) => (
                <div
                  key={st.id}
                  className={cn("flex items-start gap-4", k > 0 && stats.length > 2 && "lg:border-l lg:border-white/15 lg:pl-6")}
                >
                  {st.brandIcon && stats.length <= 2 && (
                    <dd aria-hidden="true" className="order-1 hidden sm:block">
                      <BrandIcon name={st.brandIcon as BrandIconName} ground="dark" size="sm" />
                    </dd>
                  )}
                  <div className="order-2 flex flex-col gap-1">
                    <dt className="type-label order-2 text-mist">{st.label}</dt>
                    <dd className="type-stat-compact order-1 whitespace-nowrap text-white">
                      <CountUp value={st.value} />
                    </dd>
                    {st.note && stats.length === 1 && <dd className="type-small order-3 text-sand">{st.note}</dd>}
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
