"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * YieldChart — typical milk-yield RANGES for every breed on one 0–30 l/day scale.
 * Real data from content/breeds.ts. The scale is a 30-column grid, so each bar is
 * `col-start-{min+1} col-end-{max+1}` — exact, and with no inline styles.
 * Bars grow in on first view; hovering/focusing a row highlights it and dims the rest.
 */
export interface YieldRow {
  slug: string;
  name: string;
  epithet: string;
  min: number;
  max: number;
  a2: boolean;
}

const TICKS = [0, 10, 20, 30];
const colStart = (n: number) => `col-start-${n + 1}`;
const colEnd = (n: number) => `col-end-${n + 1}`;

export function YieldChart({ rows, caption }: { rows: YieldRow[]; caption: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <figure className="flex flex-col gap-4">
      <div className="hidden grid-cols-3 gap-6 md:grid">
        <span className="type-label text-graphite">Breed · typical yield</span>
        <div className="col-span-2 grid grid-cols-30">
          {TICKS.map((t) => (
            <span
              key={t}
              className={cn(
                "type-label row-start-1 text-graphite",
                t === 30 ? "col-start-28 col-end-31 text-right" : cn(colStart(t), colEnd(t + 3)),
              )}
            >
              {t}
              {t === 30 ? " l/day" : ""}
            </span>
          ))}
        </div>
      </div>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }}
        onMouseLeave={() => setActive(null)}
      >
        {rows.map((r) => {
          const on = active === r.slug;
          const dim = active !== null && !on;
          return (
            <li key={r.slug}>
              <Link
                href={`/breeds/${r.slug}`}
                onMouseEnter={() => setActive(r.slug)}
                onFocus={() => setActive(r.slug)}
                onBlur={() => setActive(null)}
                className={cn(
                  "transition-move grid grid-cols-1 items-center gap-3 border-b border-stone py-4 md:grid-cols-3 md:gap-6",
                  dim && "opacity-50",
                )}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className={cn("type-subheading transition-ui", on ? "text-brown" : "text-ink")}>{r.name}</span>
                  <span className="type-small whitespace-nowrap text-graphite">
                    {r.min}–{r.max} l/day{r.a2 ? " · A2" : ""}
                  </span>
                </span>
                <span className="relative grid h-5 grid-cols-30 items-center md:col-span-2">
                  <span className="col-span-full row-start-1 h-px bg-stone" />
                  {TICKS.slice(1, 3).map((t) => (
                    <span key={t} className={cn("row-start-1 h-5 w-px bg-stone", colStart(t))} />
                  ))}
                  <motion.span
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
                    className={cn(
                      "row-start-1 h-3 origin-left rounded-full transition-ui",
                      colStart(r.min),
                      colEnd(r.max),
                      on ? "bg-brown-dark" : "bg-brown",
                    )}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </motion.ul>
      <figcaption className="type-small max-w-prose text-graphite">{caption}</figcaption>
    </figure>
  );
}
