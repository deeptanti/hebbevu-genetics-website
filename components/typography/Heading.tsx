import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingVariant = "display" | "h1" | "h2" | "h3";
type Level = 1 | 2 | 3 | 4;

const variantClass: Record<HeadingVariant, string> = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
};

/** Brief §6: display/h1/h2 in `deep`, h3 in `ink`. On dark grounds everything is `mist`. */
const lightColour: Record<HeadingVariant, string> = {
  display: "text-deep",
  h1: "text-deep",
  h2: "text-deep",
  h3: "text-ink",
};

export interface HeadingProps {
  /** Semantic level. Keep the outline unbroken: H1 → H2 → H3. */
  level: Level;
  /** Visual style; defaults to the matching level (h1/h2/h3). Use `display` for heroes only. */
  variant?: HeadingVariant;
  ground?: "light" | "dark";
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Heading({ level, variant, ground = "light", id, className, children }: HeadingProps) {
  const v: HeadingVariant = variant ?? (level === 1 ? "h1" : level === 2 ? "h2" : "h3");
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={cn(variantClass[v], ground === "dark" ? "text-mist" : lightColour[v], className)}>
      {children}
    </Tag>
  );
}
