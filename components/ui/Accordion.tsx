import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { ICON_STROKE } from "./Icon";

/**
 * Accordion - native <details>, no JS. The FIRST item is open by default (brief §6).
 * Plus/minus swap rather than a rotating chevron: nothing moves.
 * Item rules are decorative (stone); the clickable summary is ≥48px tall and gets the focus ring.
 */
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Heading level for item titles so the outline stays unbroken. */
  headingLevel?: 2 | 3 | 4;
  /** Index opened by default. Brief: first item. */
  defaultOpen?: number;
  className?: string;
}

export function Accordion({ items, headingLevel = 3, defaultOpen = 0, className }: AccordionProps) {
  const H = `h${headingLevel}` as const;
  return (
    <div className={cn("border-t border-stone", className)}>
      {items.map((item, i) => (
        <details key={item.id} id={item.id} open={i === defaultOpen} className="group border-b border-stone">
          <summary className="transition-ui flex min-h-7 items-center justify-between gap-4 py-4 text-ink hover:text-brown">
            <H className="type-subheading">{item.title}</H>
            <Plus aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5 shrink-0 text-brown group-open:hidden" />
            <Minus aria-hidden="true" strokeWidth={ICON_STROKE} className="hidden size-5 shrink-0 text-brown group-open:block" />
          </summary>
          <div className="type-body max-w-prose pb-5 text-ink">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
