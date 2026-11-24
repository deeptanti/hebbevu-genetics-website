import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";

export function BulletList({ items, ground = "light", className }: { items: string[]; ground?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((it) => (
        <li key={it} className={cn("type-body flex gap-3", ground === "dark" ? "text-mist" : "text-ink")}>
          <Icon name="check" className={ground === "dark" ? "text-mist" : "text-brown"} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
