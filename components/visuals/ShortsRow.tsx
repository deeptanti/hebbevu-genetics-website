import type { Video } from "@/content/videos";
import { cn } from "@/lib/cn";
import { YouTubePlayer } from "./YouTubePlayer";

/**
 * ShortsRow - vertical YouTube Shorts. On phones a swipeable row that snaps card by card;
 * from `lg` a grid. Each plays in place.
 */
export function ShortsRow({ shorts, label, className }: { shorts: Video[]; label: string; className?: string }) {
  return (
    <ul
      aria-label={label}
      className={cn(
        "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0",
        shorts.length > 4 ? "lg:grid-cols-6" : "lg:grid-cols-4",
        className,
      )}
    >
      {shorts.map((s) => (
        <li key={s.id} className="flex w-3/5 shrink-0 snap-start flex-col gap-3 sm:w-2/5 md:w-1/4 lg:w-auto">
          <YouTubePlayer video={s} />
          <p className="type-small text-ink">{s.title}</p>
        </li>
      ))}
    </ul>
  );
}
