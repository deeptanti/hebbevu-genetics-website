import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Chip — traits, export destinations, certifications. Non-interactive.
 * Uses the `label` style: this is where the technical/export register lives.
 * Its edge is decorative (stone). If a chip ever becomes clickable, it is a
 * control and its border must become graphite.
 */
export interface ChipProps {
  children: ReactNode;
  icon?: ReactNode;
  ground?: "light" | "dark";
  className?: string;
}

export function Chip({ children, icon, ground = "light", className }: ChipProps) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center gap-2 rounded-sm border px-3 py-1",
        ground === "dark" ? "border-graphite text-mist" : "border-stone bg-white text-graphite",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function ChipList({ items, ground, className }: { items: string[]; ground?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((t) => (
        <li key={t}>
          <Chip ground={ground}>{t}</Chip>
        </li>
      ))}
    </ul>
  );
}
