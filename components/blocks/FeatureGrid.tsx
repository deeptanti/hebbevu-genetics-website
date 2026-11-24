import type { Feature } from "@/content/types";
import { cn } from "@/lib/cn";
import { Reveal, RevealItem } from "../motion/Reveal";
import { BrandIcon, type BrandIconName } from "../ui/BrandIcon";
import { IconTile } from "../ui/Icon";

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
    <Reveal
      as="ul"
      stagger={0.1}
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {items.map((f) => (
        <RevealItem as="li" key={f.title} className={cn("flex flex-col gap-3 border-t pt-5", dark ? "border-graphite" : "border-stone")}>
          {f.brandIcon ? (
            <BrandIcon name={f.brandIcon as BrandIconName} ground={ground} size="md" className="mb-2" />
          ) : (
            f.icon && <IconTile name={f.icon} ground={ground} className="mb-2" />
          )}
          <H className={cn("type-subheading", dark ? "text-mist" : "text-ink")}>{f.title}</H>
          <p className={cn("type-small", dark ? "text-mist" : "text-graphite")}>{f.body}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}
