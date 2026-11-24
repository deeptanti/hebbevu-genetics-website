import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type SectionTone = "white" | "mist" | "bark" | "deep";

const toneClass: Record<SectionTone, string> = {
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  bark: "bg-bark text-mist",
  deep: "bg-deep text-mist",
};

export const isDarkTone = (t: SectionTone) => t === "bark" || t === "deep";

/**
 * Section - uniform rhythm (brief §6): space-9 top/bottom desktop, space-8 mobile.
 * `hero` gets space-10 (desktop). Don't vary padding to "balance" a page.
 * Dark tones set data-ground="dark" so focus rings switch to mist.
 */
export interface SectionProps {
  tone?: SectionTone;
  size?: "default" | "hero";
  id?: string;
  labelledBy?: string;
  /** Skip the inner Container (for full-bleed children). */
  bleed?: boolean;
  className?: string;
  children: ReactNode;
}

export function Section({ tone = "white", size = "default", id, labelledBy, bleed, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-ground={isDarkTone(tone) ? "dark" : "light"}
      className={cn(toneClass[tone], size === "hero" ? "py-9 md:py-10" : "py-8 md:py-9", className)}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
