import type { Feature } from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";

/** Icon-led claim grid ("Why Hebbevu", differentiators, research). Not cards — no borders needed. */
export function FeatureGrid({
  items,
  columns = 4,
  ground = "light",
  headingLevel = 3,
}: {
  items: Feature[];
  columns?: 2 | 3 | 4;
  ground?: "light" | "dark";
  headingLevel?: 3 | 4;
}) {
  const dark = ground === "dark";
  const H = `h${headingLevel}` as const;
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {items.map((f) => (
        <li key={f.title} className={cn("flex flex-col gap-3 border-t pt-5", dark ? "border-graphite" : "border-stone")}>
          {f.icon && <Icon name={f.icon} className={dark ? "text-mist" : "text-brown"} />}
          <H className={cn("type-subheading", dark ? "text-mist" : "text-ink")}>{f.title}</H>
          <p className={cn("type-small", dark ? "text-mist" : "text-graphite")}>{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
