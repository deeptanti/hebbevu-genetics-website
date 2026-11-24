import { cn } from "@/lib/cn";

/**
 * BreedSpecimen — the breed card's visual until each breed has ITS OWN photograph
 * (brief §15.5: one generic cow across all seven is worse than none). A typographic
 * specimen plate: the breed's initials set large in Playfair on a lab-paper ground,
 * with its yield range drawn on the shared 0–30 l/day scale. Real data, no stand-in animal.
 */
export function BreedSpecimen({
  name,
  origin,
  min,
  max,
  className,
}: {
  name: string;
  origin: string;
  min: number;
  max: number;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className={cn("bg-dots relative flex aspect-photo flex-col justify-between overflow-hidden bg-clay p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="type-label text-brown">{origin}</span>
        <span className="type-label rounded-sm bg-white px-2 py-1 text-graphite">Photo pending</span>
      </div>
      <span
        aria-hidden="true"
        className="transition-move type-display pointer-events-none absolute right-4 bottom-5 text-brown opacity-25 group-hover:-translate-y-1 group-hover:opacity-100"
      >
        {initials}
      </span>
      <div className="relative grid h-2 grid-cols-30 items-center" aria-hidden="true">
        <span className="col-span-full row-start-1 h-px bg-sand" />
        <span className={cn("row-start-1 h-2 rounded-full bg-brown", `col-start-${min + 1}`, `col-end-${max + 1}`)} />
      </div>
    </div>
  );
}
