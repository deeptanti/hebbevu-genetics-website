import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Heading } from "../typography/Heading";
import { Reveal } from "../motion/Reveal";

/**
 * SectionHeader - kicker (`subheading`), H2, optional intro. Caps at 720px.
 * Sits `space-6` above its content (brief §6 grid gaps).
 */
export interface SectionHeaderProps {
  kicker?: string;
  title: ReactNode;
  intro?: string | string[];
  /** Semantic level - 2 by default. */
  level?: 2 | 3;
  ground?: "light" | "dark";
  align?: "start" | "center";
  id?: string;
  /** Optional trailing actions (e.g. a ghost "See all" link). */
  actions?: ReactNode;
  /** Drop the space-6 bottom margin (e.g. when the header sits in a grid column). */
  flush?: boolean;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  intro,
  level = 2,
  ground = "light",
  align = "start",
  id,
  actions,
  flush,
  className,
}: SectionHeaderProps) {
  const paras = intro === undefined ? [] : Array.isArray(intro) ? intro : [intro];
  const dark = ground === "dark";
  return (
    <Reveal className={cn(!flush && "mb-6", align === "center" && "mx-auto")}>
    <header
      className={cn(
        "flex max-w-prose flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker && <p className={cn("type-subheading", dark ? "text-mist" : "text-brown")}>{kicker}</p>}
      <Heading level={level} variant={level === 2 ? "h2" : "h3"} ground={ground} id={id}>
        {title}
      </Heading>
      {paras.map((p) => (
        <p key={p} className={cn("type-body", dark ? "text-mist" : "text-ink")}>
          {p}
        </p>
      ))}
      {actions && <div className="pt-2">{actions}</div>}
    </header>
    </Reveal>
  );
}
