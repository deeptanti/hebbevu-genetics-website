import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { formatPressDate, type PressItem } from "@/content/press";
import { cn } from "@/lib/cn";
import { cardClass } from "./Card";

/** A press article or video, linking out to the outlet in a new tab. */
export function PressCard({ item, level = 3 }: { item: PressItem; level?: 2 | 3 }) {
  const H = `h${level}` as const;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(cardClass, "group hover:-translate-y-1 hover:border-graphite")}
    >
      <div className="relative flex aspect-wide items-center justify-center overflow-hidden border-b border-stone bg-mist">
        {item.image ? (
          <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-move object-cover group-hover:scale-105" />
        ) : (
          <span aria-hidden="true" className="type-h3 px-5 text-center text-brown">
            {item.outlet}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="type-label mb-3 text-graphite">
          {item.outlet} · <time dateTime={item.date}>{formatPressDate(item.date)}</time>
        </p>
        <H className="type-subheading mb-3 text-ink">{item.headline}</H>
        <span className="type-small mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-brown group-hover:text-brown-dark">
          {item.kind === "video" ? "Watch on YouTube" : `Read on ${item.outlet}`}
          <ArrowUpRight aria-hidden="true" weight="bold" className="size-4" />
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </div>
    </a>
  );
}
