"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * EmbryoScope — the hero's signature visual. A microscope field showing an embryo
 * moving through the lab's own record days (brief §9): Day 0 oocyte → Day 1
 * fertilisation → Day 2 cleavage → Day 7 blastocyst. The same 16 cells re-lay
 * themselves out per stage, so transitions read as cell division.
 * Illustration, not photography — no image is implied to be real.
 */

type Cell = { x: number; y: number; r: number };
const C = 240;
const ring = (n: number, radius: number, r: number, offset = 0): Cell[] =>
  Array.from({ length: n }, (_, i) => {
    const a = offset + (i / n) * Math.PI * 2;
    return { x: C + Math.cos(a) * radius, y: C + Math.sin(a) * radius, r };
  });
const hidden = (n: number, x = C, y = C): Cell[] => Array.from({ length: n }, () => ({ x, y, r: 0 }));

export interface ScopeStage {
  day: string;
  title: string;
  body: string;
}

const LAYOUTS: Cell[][] = [
  // Day 0 — one oocyte
  [{ x: C, y: C, r: 112 }, ...hidden(15)],
  // Day 1 — fertilised: one cell, two pronuclei
  [{ x: C, y: C, r: 112 }, { x: C - 30, y: C - 6, r: 26 }, { x: C + 30, y: C + 6, r: 26 }, ...hidden(13)],
  // Day 2 — cleavage, four cells
  [
    { x: C - 50, y: C - 50, r: 62 },
    { x: C + 50, y: C - 50, r: 62 },
    { x: C - 50, y: C + 50, r: 62 },
    { x: C + 50, y: C + 50, r: 62 },
    ...hidden(12),
  ],
  // Day 7 — blastocyst: trophectoderm ring + inner cell mass, cavity between
  [
    ...ring(12, 116, 24, -Math.PI / 2),
    { x: C - 40, y: C - 58, r: 26 },
    { x: C - 6, y: C - 70, r: 24 },
    { x: C - 62, y: C - 24, r: 22 },
    { x: C - 22, y: C - 32, r: 20 },
  ],
];

const TICKS = Array.from({ length: 72 }, (_, i) => i);

export function EmbryoScope({ stages, className }: { stages: ScopeStage[]; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % stages.length), 3200);
    return () => clearInterval(t);
  }, [auto, reduce, stages.length]);

  const cells = LAYOUTS[i % LAYOUTS.length];
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 70, damping: 16, mass: 0.9 };
  const stage = stages[i];

  return (
    <figure className={cn("flex flex-col gap-5", className)} aria-label="Illustration: an embryo developing in the lab from day 0 to day 7">
      <div className="relative">
        <svg viewBox="0 0 480 480" className="aspect-square w-full" role="img" aria-label={`${stage.day}: ${stage.title}`}>
          {/* field */}
          <circle cx={C} cy={C} r={196} className="fill-clay" />
          <circle cx={C} cy={C} r={196} className="fill-none stroke-sand" strokeWidth={1} />
          {/* reticle — rotates slowly */}
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          >
            {TICKS.map((t) => {
              const a = (t / 72) * Math.PI * 2;
              const long = t % 6 === 0;
              const r1 = 206;
              const r2 = long ? 222 : 213;
              return (
                <line
                  key={t}
                  x1={C + Math.cos(a) * r1}
                  y1={C + Math.sin(a) * r1}
                  x2={C + Math.cos(a) * r2}
                  y2={C + Math.sin(a) * r2}
                  className={long ? "stroke-graphite" : "stroke-stone"}
                  strokeWidth={long ? 1.5 : 1}
                />
              );
            })}
          </motion.g>
          {/* progress arc: how far through the 7-day cycle */}
          <motion.circle
            cx={C}
            cy={C}
            r={232}
            className="fill-none stroke-brown"
            strokeWidth={2}
            strokeLinecap="round"
            transform={`rotate(-90 ${C} ${C})`}
            initial={false}
            animate={{ pathLength: (i + 1) / stages.length }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* zona pellucida */}
          <circle cx={C} cy={C} r={150} className="fill-white stroke-sand" strokeWidth={12} />
          <circle cx={C} cy={C} r={143} className="fill-none stroke-stone" strokeWidth={1} />
          {/* cells */}
          {cells.map((c, k) => (
            <motion.g key={k} initial={false} animate={{ x: c.x - C, y: c.y - C }} transition={spring}>
              <motion.circle
                cx={C}
                cy={C}
                initial={false}
                animate={{ r: c.r }}
                transition={spring}
                className={i === 1 && k > 0 ? "fill-sand stroke-brown-dark" : "fill-clay stroke-brown"}
                strokeWidth={1.5}
              />
              {i !== 1 && (
                <motion.circle cx={C} cy={C} initial={false} animate={{ r: c.r * 0.22 }} transition={spring} className="fill-sand" />
              )}
            </motion.g>
          ))}
        </svg>
        <span className="type-label absolute top-0 left-0 rounded-sm bg-white px-3 py-1 text-brown ring-1 ring-sand">
          {stage.day}
        </span>
      </div>

      <figcaption className="flex flex-col gap-4">
        <div role="tablist" aria-label="Embryo stage" className="grid grid-cols-4 gap-2">
          {stages.map((s, k) => (
            <button
              key={s.day}
              role="tab"
              type="button"
              aria-selected={k === i}
              onClick={() => {
                setI(k);
                setAuto(false);
              }}
              className={cn(
                "transition-move type-label relative min-h-7 rounded-md border px-2",
                k === i ? "border-brown bg-brown text-white" : "border-graphite bg-white text-graphite hover:border-brown hover:text-brown",
              )}
            >
              {s.day}
            </button>
          ))}
        </div>
        <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} aria-live="polite">
          <p className="type-subheading text-ink">{stage.title}</p>
          <p className="type-small text-graphite">{stage.body}</p>
        </motion.div>
      </figcaption>
    </figure>
  );
}
