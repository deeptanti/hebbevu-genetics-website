import { cn } from "@/lib/cn";
import { CountUp } from "../motion/CountUp";
import { BrandIcon, type BrandIconName } from "./BrandIcon";

/**
 * Stat — figure in `stat`, label in `label` (brief §13: never bury figures in prose).
 * On dark grounds (bark/deep) both value and label go to mist — graphite fails contrast.
 */
export interface StatProps {
  value: string;
  label: string;
  note?: string;
  /** Brand line-art icon shown above the figure. */
  brandIcon?: string;
  ground?: "light" | "dark";
  className?: string;
}

export function Stat({ value, label, note, brandIcon, ground = "light", className }: StatProps) {
  const dark = ground === "dark";
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {brandIcon && (
        <dd aria-hidden="true" className="order-0 mb-2">
          <BrandIcon name={brandIcon as BrandIconName} ground={ground} size="md" />
        </dd>
      )}
      <dt className={cn("type-label order-2", dark ? "text-mist" : "text-graphite")}>{label}</dt>
      <dd className={cn("type-stat order-1", dark ? "text-mist" : "text-deep")}>
        <CountUp value={value} />
      </dd>
      {note && <dd className={cn("type-small order-3", dark ? "text-mist" : "text-graphite")}>{note}</dd>}
    </div>
  );
}

/** A <dl> grid of stats. DOM order is label→value (valid <dl>); CSS order shows the value first. */
export function StatGrid({ children, columns = 4, className }: { children: React.ReactNode; columns?: 3 | 4; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4", className)}>
      {children}
    </dl>
  );
}
