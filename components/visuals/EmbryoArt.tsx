"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * EmbryoArt — a small illustration of the embryo at each public stage of the 7-day journey:
 * 0 egg · 1 fertilised · 2 dividing · 3 embryo (blastocyst) · 4 frozen/transfer.
 * The same cells re-lay out between stages, so moving the timeline reads as division.
 */
type Cell = { x: number; y: number; r: number };
const C = 80;
const ring = (n: number, rad: number, r: number): Cell[] =>
  Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return { x: C + Math.cos(a) * rad, y: C + Math.sin(a) * rad, r };
  });
const none = (n: number): Cell[] => Array.from({ length: n }, () => ({ x: C, y: C, r: 0 }));

const STAGES: Cell[][] = [
  [{ x: C, y: C, r: 40 }, ...none(11)],
  [{ x: C, y: C, r: 40 }, { x: C - 11, y: C - 2, r: 9 }, { x: C + 11, y: C + 2, r: 9 }, ...none(9)],
  [{ x: C - 18, y: C - 18, r: 22 }, { x: C + 18, y: C - 18, r: 22 }, { x: C - 18, y: C + 18, r: 22 }, { x: C + 18, y: C + 18, r: 22 }, ...none(8)],
  [...ring(9, 40, 9), { x: C - 12, y: C - 18, r: 10 }, { x: C + 2, y: C - 24, r: 9 }, { x: C - 20, y: C - 4, r: 8 }],
  [...ring(9, 40, 9), { x: C - 12, y: C - 18, r: 10 }, { x: C + 2, y: C - 24, r: 9 }, { x: C - 20, y: C - 4, r: 8 }],
];

export function EmbryoArt({ stage, ground = "light", className }: { stage: number; ground?: "light" | "dark"; className?: string }) {
  const reduce = useReducedMotion();
  const cells = STAGES[Math.min(stage, STAGES.length - 1)];
  const t = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 90, damping: 15 };
  const dark = ground === "dark";
  const frozen = stage === 4;
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={cn("aspect-square w-full", className)}>
      <circle cx={C} cy={C} r={74} className={dark ? "fill-deep" : "fill-clay"} />
      <motion.circle
        cx={C}
        cy={C}
        r={56}
        className={cn("fill-none", dark ? "stroke-graphite" : "stroke-sand")}
        strokeWidth={6}
        animate={reduce ? undefined : { rotate: 360 }}
        strokeDasharray="4 10"
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {cells.map((c, i) => (
        <motion.circle
          key={i}
          initial={false}
          animate={{ cx: c.x, cy: c.y, r: c.r }}
          transition={t}
          className={cn(
            stage === 1 && i > 0 ? (dark ? "fill-sand" : "fill-sand stroke-brown-dark") : dark ? "fill-bark stroke-mist" : "fill-white stroke-brown",
            "transition-ui",
          )}
          strokeWidth={1.5}
        />
      ))}
      {frozen && (
        <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className={dark ? "stroke-mist" : "stroke-brown"}>
          {[0, 60, 120].map((deg) => (
            <line key={deg} x1={C} y1={C - 66} x2={C} y2={C + 66} strokeWidth={1.5} strokeDasharray="2 6" transform={`rotate(${deg} ${C} ${C})`} />
          ))}
        </motion.g>
      )}
    </svg>
  );
}
