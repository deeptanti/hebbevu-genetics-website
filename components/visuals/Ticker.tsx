import { cn } from "@/lib/cn";

/**
 * Ticker — a slow marquee of technical terms (breeds, protocols, record points).
 * Pure CSS; pauses on hover; stops under reduced motion. The duplicate run is aria-hidden.
 */
export function Ticker({ items, className }: { items: string[]; className?: string }) {
  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="type-label flex items-center gap-5 pr-5 whitespace-nowrap text-graphite">
          {t}
          <span aria-hidden="true" className="size-1 rounded-full bg-brown" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("overflow-hidden border-y border-stone bg-mist py-4", className)}>
      <div className="animate-marquee flex w-max hover:paused">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
