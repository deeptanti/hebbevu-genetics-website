"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * PathChooser — the two-path model (brief §3) as one decision.
 * The farmer picks the sentence that's true for them; the answer swaps in.
 */
export interface PathOption {
  id: string;
  prompt: string;
  kicker: string;
  title: string;
  summary: string;
  points: string[];
  pointsLabel: string;
  /** True when `points` are steps in order (numbered); false for a list of options. */
  ordered?: boolean;
  href: string;
  cta: string;
}

export function PathChooser({ paths }: { paths: PathOption[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const p = paths[i];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div role="tablist" aria-label="Which is true for you?" aria-orientation="vertical" className="flex flex-col gap-3">
        {paths.map((o, k) => {
          const on = k === i;
          return (
            <button
              key={o.id}
              role="tab"
              type="button"
              id={`${id}-tab-${k}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              onClick={() => setI(k)}
              className={cn(
                "transition-move relative flex min-h-8 items-center gap-4 rounded-lg border p-4 text-left",
                on ? "border-brown bg-white" : "border-graphite bg-white hover:border-brown",
              )}
            >
              <span
                className={cn(
                  "transition-move flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                  on ? "border-brown bg-brown text-white" : "border-graphite text-transparent",
                )}
              >
                <Check weight="bold" className="size-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="type-label text-graphite">{o.kicker}</span>
                <span className="type-subheading text-ink">{o.prompt}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} className="relative overflow-hidden rounded-lg bg-bark p-5 md:p-7 lg:col-span-2" data-ground="dark">
        <span aria-hidden="true" className="bg-dots absolute inset-0 opacity-10" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-6 md:grid-cols-2"
          >
            <div className="flex flex-col gap-4">
              <h3 className="type-h2 text-mist">{p.title}</h3>
              <p className="type-body text-mist">{p.summary}</p>
              <Link
                href={p.href}
                className="transition-move group type-body inline-flex min-h-7 items-center gap-2 self-start rounded-md border border-mist bg-mist px-5 font-semibold text-deep hover:border-white hover:bg-white"
              >
                {p.cta}
                <ArrowRight aria-hidden="true" className="transition-move size-5 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="type-label text-mist">{p.pointsLabel}</span>
              <ol className="flex flex-col" {...(p.ordered ? {} : { role: "list" })}>
                {p.points.map((pt, k) => (
                  <motion.li
                    key={pt}
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.05 * k + 0.1 }}
                    className="type-small flex items-center gap-3 border-b border-graphite py-3 text-mist"
                  >
                    {p.ordered ? (
                      <span className="type-label w-5 text-mist">{String(k + 1).padStart(2, "0")}</span>
                    ) : (
                      <Check weight="bold" aria-hidden="true" className="size-4 text-mist" />
                    )}
                    {pt}
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
