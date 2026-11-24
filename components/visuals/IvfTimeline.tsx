"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EmbryoMicroscope } from "./EmbryoMicroscope";

/**
 * IvfTimeline - the seven days an embryo spends in the lab.
 * Left: a darkfield microscope view of the embryo at the current stage.
 * Right: a vertical stepper; the active day expands its description and fills a progress
 * rule while it plays. It auto-advances while on screen; choosing a day takes over.
 */
export interface TimelineDay {
  day: string;
  stage: string;
  description: string;
}

const STAGE_MS = 5600;

export function IvfTimeline({ days }: { days: TimelineDay[]; ground?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const playing = auto && inView && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((v) => (v + 1) % days.length), STAGE_MS);
    return () => clearTimeout(t);
  }, [playing, i, days.length]);

  const choose = (k: number) => {
    setI(k);
    setAuto(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") choose(Math.min(days.length - 1, i + 1));
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") choose(Math.max(0, i - 1));
  };

  return (
    <div ref={ref} className="grid items-center gap-7 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <EmbryoMicroscope stage={i} className="mx-auto max-w-prose shadow-md" />
      </div>

      <div className="lg:col-span-5">
        <ol role="tablist" aria-label="Seven days in the lab" aria-orientation="vertical" onKeyDown={onKey} className="flex flex-col">
          {days.map((d, k) => {
            const on = k === i;
            const done = k < i;
            return (
              <li key={d.day} className="relative border-b border-stone last:border-b-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(k)}
                  className="group flex w-full gap-5 py-5 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "transition-move mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                      on ? "border-brown bg-brown" : done ? "border-brown bg-white" : "border-stone bg-white group-hover:border-brown",
                    )}
                  >
                    <span className={cn("size-2 rounded-full", on ? "bg-white" : done ? "bg-brown" : "bg-transparent")} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className={cn("type-label", on ? "text-brown" : "text-graphite")}>{d.day}</span>
                    <span className={cn("transition-ui", on ? "type-h3 text-ink" : "type-subheading text-ink group-hover:text-brown")}>
                      {d.stage}
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          key="desc"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="type-body block pt-2 text-ink">{d.description}</span>
                          <span aria-hidden="true" className="mt-4 block h-px w-full bg-stone">
                            <motion.span
                              key={`${k}-${playing}`}
                              className="block h-px bg-brown"
                              initial={{ width: playing ? "0%" : "100%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: playing ? STAGE_MS / 1000 : 0, ease: "linear" }}
                            />
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
