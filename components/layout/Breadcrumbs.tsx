import Link from "next/link";
import { cn } from "@/lib/cn";

export function Breadcrumbs({ items, ground = "light", className }: { items: { label: string; href?: string }[]; ground?: "light" | "dark"; className?: string }) {
  const dark = ground === "dark";
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-5", className)}>
      <ol className={cn("type-small flex flex-wrap items-center gap-2", dark ? "text-mist" : "text-graphite")}>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? (
              <Link href={it.href} className={cn("transition-ui underline-offset-4 hover:underline", dark ? "hover:text-white" : "hover:text-brown")}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
