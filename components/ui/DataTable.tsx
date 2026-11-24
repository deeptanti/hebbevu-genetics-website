import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * DataTable — headers in `label`, cells in `small`. Rules are decorative (stone).
 * Scrolls horizontally inside its own frame on narrow screens; the page never does.
 */
export interface DataTableColumn<K extends string = string> {
  key: K;
  header: string;
  align?: "start" | "end";
  /** Render this column's cells as row headers (<th scope="row">). */
  rowHeader?: boolean;
}

export interface DataTableProps<K extends string = string> {
  caption: string;
  /** Visually hide the caption (still read by screen readers). */
  hideCaption?: boolean;
  columns: DataTableColumn<K>[];
  rows: (Record<K, ReactNode> & { id: string })[];
  className?: string;
}

export function DataTable<K extends string>({ caption, hideCaption, columns, rows, className }: DataTableProps<K>) {
  return (
    <div className={cn("relative w-full overflow-x-auto rounded-sm border border-stone", className)}>
      <table className="w-full border-collapse text-left">
        <caption className={cn("type-small px-4 py-3 text-left text-graphite", hideCaption && "sr-only")}>{caption}</caption>
        <thead className="bg-mist">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cn("type-label border-b border-stone px-4 py-3 text-graphite", c.align === "end" && "text-right")}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-stone last:border-b-0">
              {columns.map((c) => {
                const Cell = c.rowHeader ? "th" : "td";
                return (
                  <Cell
                    key={c.key}
                    {...(c.rowHeader ? { scope: "row" as const } : {})}
                    className={cn(
                      "type-small px-4 py-3 align-top text-ink",
                      c.rowHeader && "font-semibold",
                      c.align === "end" && "text-right",
                    )}
                  >
                    {r[c.key]}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
