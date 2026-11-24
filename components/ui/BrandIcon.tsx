import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * BrandIcon — Hebbevu's own line-art icons (from the client's creative folder), made transparent
 * and recoloured: `brown` for light grounds, `mist` for dark. Decorative unless `label` is given.
 */
export type BrandIconName =
  | "lab"
  | "dna"
  | "global"
  | "care"
  | "calves"
  | "herd"
  | "conception"
  | "experience"
  | "embryo-normal"
  | "embryo-sexed"
  | "phone"
  | "pin"
  | "mail";

const sizeClass = { sm: "size-7", md: "size-8", lg: "size-10" } as const;

export function BrandIcon({
  name,
  ground = "light",
  size = "md",
  label,
  className,
}: {
  name: BrandIconName;
  ground?: "light" | "dark";
  size?: keyof typeof sizeClass;
  label?: string;
  className?: string;
}) {
  return (
    <Image
      src={`/brand/icons/${name}-${ground === "dark" ? "mist" : "brown"}.png`}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      width={256}
      height={256}
      className={cn("shrink-0 object-contain", sizeClass[size], className)}
    />
  );
}
