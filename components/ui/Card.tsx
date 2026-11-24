import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared card surface. Borders before shadows (brief §6):
 * at rest = stone hairline, NO shadow; hover = border darkens to graphite. Nothing lifts.
 * Linked cards are a single <a>, so the whole card is the hit target and gets the focus ring.
 */
export const cardClass = "transition-ui flex h-full flex-col overflow-hidden rounded-lg border border-stone bg-white";
/** Card padding: space-4 mobile, space-5 desktop (brief §6). */
export const cardPad = "p-4 md:p-5";

interface CardProps {
  className?: string;
  /** Remove padding (e.g. when media runs edge-to-edge). */
  flush?: boolean;
  children: ReactNode;
}

export function CardLink({ href, className, flush, children }: CardProps & { href: string }) {
  return (
    <Link href={href} className={cn(cardClass, !flush && cardPad, "group hover:border-graphite", className)}>
      {children}
    </Link>
  );
}

export function Card({ className, flush, children }: CardProps) {
  return <div className={cn(cardClass, !flush && cardPad, className)}>{children}</div>;
}

/** Trailing "read more" line inside a linked card. */
export function CardMore({ children }: { children: ReactNode }) {
  return (
    <span className="type-small mt-auto pt-4 font-semibold text-brown underline-offset-4 group-hover:text-brown-dark group-hover:underline">
      {children} →
    </span>
  );
}
