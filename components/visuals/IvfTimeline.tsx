"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * IvfTimeline — the lab's seven-day cycle (brief §9) as a clickable track.
 * Each day shows what the lab records. Arrow keys move between days.
 */
export interface TimelineDay {
  day: string;
  stage: string;
  recorded: string;
}

export function IvfTimeline({ days, ground = "light" }: { days: TimelineDay[]; ground?: "light" | "dark" }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const dark = ground === "dark";
  const items = days[i].recorded.split(/,\s*|\s—\s/).filter(Boolean);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setI((v) => Math.min(days.length - 1, v + 1));
    if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
  };

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="IVF cycle day" onKeyDown={onKey} className="relative grid grid-cols-5">
        {/* track */}
        <span className={cn("absolute inset-x-0 top-4 h-px", dark ? "bg-graphite" : "bg-stone")} aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          className={cn("absolute top-4 left-0 h-px origin-left", dark ? "bg-mist" : "bg-brown")}
          initial={false}
          animate={{ width: `${(i / (days.length - 1)) * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {days.map((d, k) => {
          const on = k === i;
          const past = k <= i;
          return (
            <button
              key={d.day}
              role="tab"
              type="button"
              id={`${id}-tab-${k}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setI(k)}
              className="group relative flex min-h-7 flex-col items-center gap-2 text-center"
            >
              <span
                className={cn(
                  "transition-move relative z-10 flex size-6 items-center justify-center rounded-full border-2",
                  past
                    ? dark
                      ? "border-mist bg-mist"
                      : "border-brown bg-brown"
                    : dark
                      ? "border-graphite bg-bark group-hover:border-mist"
                      : "border-graphite bg-white group-hover:border-brown",
                  on && "scale-110",
                )}
              >
                {on && <span className={cn("size-2 rounded-full", dark ? "bg-bark" : "bg-white")} />}
              </span>
              <span className={cn("type-label", on ? (dark ? "text-mist" : "text-brown") : dark ? "text-mist" : "text-graphite")}>{d.day}</span>
              <span className={cn("type-small hidden sm:block", dark ? "text-mist" : "text-ink")}>{d.stage}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${i}`}
        className={cn("min-h-10 rounded-lg border p-5", dark ? "border-graphite bg-bark" : "border-stone bg-white")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <p className={cn("type-h3", dark ? "text-mist" : "text-ink")}>
              {days[i].day}: {days[i].stage}
            </p>
            <div className="flex flex-col gap-2">
              <span className={cn("type-label", dark ? "text-mist" : "text-graphite")}>What the lab records</span>
              <ul className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <li key={t} className={cn("type-small rounded-sm px-3 py-1", dark ? "bg-deep text-mist" : "bg-clay text-ink")}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
