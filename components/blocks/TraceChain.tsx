import { ArrowRight } from "lucide-react";
import { ICON_STROKE } from "../ui/Icon";

/** Donor → … → Calving. Rendered as an ordered list so it reads correctly aloud. */
export function TraceChain({ links }: { links: string[] }) {
  return (
    <ol aria-label="Traceability chain" className="flex flex-wrap items-center gap-2">
      {links.map((l, i) => (
        <li key={l} className="flex items-center gap-2">
          <span className="type-label rounded-sm border border-stone bg-white px-3 py-2 text-ink">{l}</span>
          {i < links.length - 1 && <ArrowRight aria-hidden="true" strokeWidth={ICON_STROKE} className="size-4 text-graphite" />}
        </li>
      ))}
    </ol>
  );
}
