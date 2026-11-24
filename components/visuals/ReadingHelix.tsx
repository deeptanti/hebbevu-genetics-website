"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * ReadingHelix - article reading progress drawn as a DNA strand pinned under the header.
 * Two sine strands with base-pair ticks; the drawn length follows scroll position.
 */
const W = 1200;
const H = 12;
const path = (phase: number) => {
  let d = "";
  for (let x = 0; x <= W; x += 6) d += `${x === 0 ? "M" : "L"}${x},${(H / 2 + (H / 2 - 1.5) * Math.sin(x / 18 + phase)).toFixed(2)}`;
  return d;
};
const A = path(0);
const B = path(Math.PI);

export function ReadingHelix() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const progress = reduce ? scrollYProgress : p;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-3">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-3 w-full">
        <motion.path d={A} className="fill-none stroke-brown" strokeWidth={2} style={{ pathLength: progress }} />
        <motion.path d={B} className="fill-none stroke-brown-dark" strokeWidth={2} style={{ pathLength: progress }} />
      </svg>
    </div>
  );
}
