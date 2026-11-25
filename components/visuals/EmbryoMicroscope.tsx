"use client";

import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * EmbryoMicroscope - a darkfield microscope view of an embryo across the public stages of
 * the 7-day journey: 0 egg, 1 fertilised (pronuclei), 2 cleavage (1 → 2 → 4 cells),
 * 3 blastocyst (outer cell ring, inner cell mass, fluid cavity), 4 frozen for later.
 *
 * A fixed set of cell "slots" re-lays out per stage, so stage changes read as cell division
 * rather than a cut. The specimen drifts and breathes, debris floats in the medium, and each
 * change gets a short focus pull. Illustration, not footage. Colours come from theme tokens.
 */

type Slot = { x: number; y: number; rx: number; ry: number; rot: number; o: number };
const C = 200;
const N = 24;
const circ = (x: number, y: number, r: number): Slot => ({ x, y, rx: r, ry: r, rot: 0, o: 1 });
const pad = (list: Slot[]): Slot[] => {
  const out = [...list];
  while (out.length < N) out.push({ x: list[0].x, y: list[0].y, rx: 0, ry: 0, rot: 0, o: 0 });
  return out;
};

const PB1 = circ(C + 66, C - 70, 10);
const PB2 = circ(C + 82, C - 50, 7);

const S_EGG = pad([circ(C, C, 90), PB1]);
const S_ZYGOTE = pad([circ(C, C, 88), PB1, PB2]);
const S_TWO = pad([circ(C - 42, C + 2, 60), PB1, PB2, circ(C + 44, C - 2, 60)]);
const S_FOUR = pad([circ(C - 38, C - 34, 47), PB1, PB2, circ(C + 40, C - 30, 47), circ(C - 34, C + 40, 47), circ(C + 40, C + 38, 47)]);
const TE_COUNT = 18;
const TE: Slot[] = Array.from({ length: TE_COUNT }, (_, k) => {
  const a = (k / TE_COUNT) * Math.PI * 2 - Math.PI / 2;
  return { x: C + Math.cos(a) * 114, y: C + Math.sin(a) * 114, rx: 23, ry: 9, rot: (a * 180) / Math.PI + 90, o: 1 };
});
const ICM: Slot[] = [
  [-40, -64],
  [-18, -72],
  [-58, -44],
  [-32, -44],
  [-10, -52],
  [-46, -24],
].map(([dx, dy]) => circ(C + dx, C + dy, 15));
const S_BLAST = pad([...TE, ...ICM]);

// Deterministic "random" for particles and grain: an integer hash, so the server and the
// browser compute identical values (Math.sin on large inputs differs between engines).
const rand = (n: number) => {
  let h = Math.imul(n + 0x9e3779b9, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const round = (v: number) => Math.round(v * 1000) / 1000;
const PARTICLES = Array.from({ length: 18 }, (_, k) => {
  const a = rand(k) * Math.PI * 2;
  const r = 40 + rand(k + 50) * 140;
  return { x: round(C + Math.cos(a) * r), y: round(C + Math.sin(a) * r), s: 0.8 + rand(k + 99) * 1.6, dx: (rand(k + 7) - 0.5) * 16, dy: (rand(k + 13) - 0.5) * 16, d: 6 + rand(k + 21) * 8 };
});
const GRAIN = Array.from({ length: 40 }, (_, k) => ({ x: rand(k + 200) * 24, y: rand(k + 300) * 24, r: 0.4 + rand(k + 400) * 0.8 }));
const CRYSTALS = [
  [C - 120, C - 90, 1],
  [C + 128, C + 70, 0.8],
  [C - 96, C + 126, 0.7],
  [C + 104, C - 122, 0.9],
  [C + 10, C + 150, 0.6],
] as const;

export const EMBRYO_STAGE_LABELS = ["Oocyte", "Zygote", "Cleavage", "Blastocyst", "Vitrified"] as const;

export function EmbryoMicroscope({ stage, className }: { stage: number; className?: string }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${s}-${uid}`;
  const [scope, animate] = useAnimate();
  const [split, setSplit] = useState(true);

  // Day 2 plays as a sequence: one cell → two → four.
  useEffect(() => {
    if (stage !== 2 || reduce) return;
    const t1 = setTimeout(() => setSplit(false), 0);
    const t2 = setTimeout(() => setSplit(true), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage, reduce]);

  // Focus pull on every stage change.
  useEffect(() => {
    if (reduce || !scope.current) return;
    void animate(scope.current, { filter: ["blur(3px)", "blur(0px)"], opacity: [0.75, 1] }, { duration: 0.8, ease: "easeOut" });
  }, [stage, reduce, animate, scope]);

  const slots = stage === 0 ? S_EGG : stage === 1 ? S_ZYGOTE : stage === 2 ? (split ? S_FOUR : S_TWO) : S_BLAST;
  const blast = stage >= 3;
  const zona = blast ? { r: 136, w: 7 } : { r: 108, w: 14 };
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 55, damping: 14, mass: 1 };
  const stop = (v: string, o = 1) => ({ stopColor: `var(--color-${v})`, stopOpacity: o });

  return (
    <div className={cn("relative aspect-square w-full overflow-hidden rounded-lg bg-deep", className)}>
      <div ref={scope} className="absolute inset-0">
        <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id={id("field")} cx="50%" cy="46%" r="62%">
              <stop offset="0%" style={stop("bark")} />
              <stop offset="70%" style={stop("deep")} />
              <stop offset="100%" style={stop("deep")} />
            </radialGradient>
            <radialGradient id={id("cell")} cx="38%" cy="34%" r="78%">
              <stop offset="0%" style={stop("white", 0.95)} />
              <stop offset="35%" style={stop("sand", 0.85)} />
              <stop offset="80%" style={stop("clay", 0.55)} />
              <stop offset="100%" style={stop("brown", 0.7)} />
            </radialGradient>
            <radialGradient id={id("icm")} cx="40%" cy="35%" r="80%">
              <stop offset="0%" style={stop("sand", 0.95)} />
              <stop offset="100%" style={stop("brown", 0.95)} />
            </radialGradient>
            <radialGradient id={id("cavity")} cx="50%" cy="55%" r="55%">
              <stop offset="0%" style={stop("mist", 0.16)} />
              <stop offset="100%" style={stop("mist", 0)} />
            </radialGradient>
            <radialGradient id={id("vignette")} cx="50%" cy="50%" r="50%">
              <stop offset="72%" style={stop("deep", 0)} />
              <stop offset="100%" style={stop("deep", 0.95)} />
            </radialGradient>
            <pattern id={id("grain")} width="24" height="24" patternUnits="userSpaceOnUse">
              {GRAIN.map((g, k) => (
                <circle key={k} cx={g.x} cy={g.y} r={g.r} style={{ fill: "var(--color-brown)" }} />
              ))}
            </pattern>
            <filter id={id("glow")} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <clipPath id={id("field-clip")}>
              <circle cx={C} cy={C} r={196} />
            </clipPath>
          </defs>

          <g clipPath={`url(#${id("field-clip")})`}>
            <circle cx={C} cy={C} r={196} fill={`url(#${id("field")})`} />

            {/* debris floating in the medium */}
            {PARTICLES.map((p, k) => (
              <motion.circle
                key={k}
                cx={p.x}
                cy={p.y}
                r={p.s}
                style={{ fill: "var(--color-sand)" }}
                opacity={0.35}
                animate={reduce ? undefined : { x: [0, p.dx, 0], y: [0, p.dy, 0] }}
                transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {/* the specimen: slow drift + breathing */}
            <motion.g
              animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5], scale: blast ? [1, 1.025, 1] : [1, 1.008, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* zona pellucida */}
              <motion.circle
                cx={C}
                cy={C}
                fill="none"
                style={{ stroke: "var(--color-sand)" }}
                filter={`url(#${id("glow")})`}
                initial={false}
                animate={{ r: zona.r, strokeWidth: zona.w + 6, opacity: 0.25 }}
                transition={spring}
              />
              <motion.circle
                cx={C}
                cy={C}
                fill="none"
                style={{ stroke: "var(--color-mist)" }}
                initial={false}
                animate={{ r: zona.r, strokeWidth: zona.w, opacity: 0.18 }}
                transition={spring}
              />
              <motion.circle
                cx={C}
                cy={C}
                fill="none"
                style={{ stroke: "var(--color-mist)" }}
                strokeWidth={1}
                initial={false}
                animate={{ r: zona.r - zona.w / 2, opacity: 0.35 }}
                transition={spring}
              />

              {/* blastocoel (fluid cavity) */}
              <motion.circle
                cx={C}
                cy={C + 6}
                fill={`url(#${id("cavity")})`}
                initial={false}
                animate={{ r: blast ? 104 : 0, opacity: blast ? 1 : 0 }}
                transition={spring}
              />

              {/* cells */}
              {slots.map((s, k) => {
                const icm = blast && k >= TE_COUNT;
                return (
                  <motion.g
                    key={k}
                    initial={false}
                    animate={{ x: s.x - C, y: s.y - C, rotate: s.rot, opacity: s.o }}
                    transition={spring}
                  >
                    <motion.ellipse
                      cx={C}
                      cy={C}
                      initial={false}
                      animate={{ rx: s.rx, ry: s.ry }}
                      transition={spring}
                      fill={`url(#${id(icm ? "icm" : "cell")})`}
                      style={{ stroke: "var(--color-brown-dark)" }}
                      strokeWidth={1}
                      strokeOpacity={0.5}
                    />
                    <motion.ellipse
                      cx={C}
                      cy={C}
                      initial={false}
                      animate={{ rx: s.rx, ry: s.ry }}
                      transition={spring}
                      fill={`url(#${id("grain")})`}
                      opacity={0.2}
                    />
                    {/* faint nucleus in cleaving cells */}
                    {stage === 2 && s.rx > 30 && (
                      <circle cx={C + 6} cy={C - 4} r={s.rx * 0.26} style={{ fill: "var(--color-brown)" }} opacity={0.18} />
                    )}
                  </motion.g>
                );
              })}

              {/* pronuclei drifting together (fertilisation) */}
              {[
                { from: [-46, -22], to: [-18, -4] },
                { from: [44, 26], to: [18, 6] },
              ].map((p, k) => (
                <motion.g
                  key={k}
                  initial={false}
                  animate={{
                    x: stage === 1 ? p.to[0] : p.from[0],
                    y: stage === 1 ? p.to[1] : p.from[1],
                    opacity: stage === 1 ? 1 : 0,
                  }}
                  transition={reduce ? { duration: 0 } : { duration: 2.2, ease: "easeInOut" }}
                >
                  <circle cx={C} cy={C} r={17} style={{ fill: "var(--color-deep)", stroke: "var(--color-sand)" }} fillOpacity={0.3} strokeOpacity={0.8} strokeWidth={1.2} />
                  <circle cx={C - 4} cy={C - 3} r={2.4} style={{ fill: "var(--color-brown-dark)" }} opacity={0.8} />
                  <circle cx={C + 5} cy={C + 4} r={1.8} style={{ fill: "var(--color-brown-dark)" }} opacity={0.8} />
                </motion.g>
              ))}
            </motion.g>

            {/* frost for vitrification */}
            <motion.g initial={false} animate={{ opacity: stage === 4 ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.2 }}>
              <circle cx={C} cy={C} r={196} style={{ fill: "var(--color-mist)" }} opacity={0.07} />
              {CRYSTALS.map(([x, y, sc], k) => (
                <motion.g
                  key={k}
                  initial={false}
                  animate={{ scale: stage === 4 ? sc : 0.2, rotate: stage === 4 ? 30 : 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 1.6, delay: k * 0.12, ease: "easeOut" }}
                >
                  {[0, 60, 120].map((deg) => (
                    <g key={deg} transform={`rotate(${deg} ${x} ${y})`} style={{ stroke: "var(--color-mist)" }} strokeWidth={1.2} opacity={0.55}>
                      <line x1={x} y1={y - 22} x2={x} y2={y + 22} />
                      <line x1={x} y1={y - 12} x2={x - 6} y2={y - 18} />
                      <line x1={x} y1={y - 12} x2={x + 6} y2={y - 18} />
                      <line x1={x} y1={y + 12} x2={x - 6} y2={y + 18} />
                      <line x1={x} y1={y + 12} x2={x + 6} y2={y + 18} />
                    </g>
                  ))}
                </motion.g>
              ))}
            </motion.g>

            {/* reticle */}
            <g style={{ stroke: "var(--color-mist)" }} opacity={0.08} strokeWidth={1}>
              <line x1={C} y1={10} x2={C} y2={390} />
              <line x1={10} y1={C} x2={390} y2={C} />
            </g>
            <circle cx={C} cy={C} r={196} fill={`url(#${id("vignette")})`} />
          </g>
          <circle cx={C} cy={C} r={196} fill="none" style={{ stroke: "var(--color-graphite)" }} strokeWidth={1.5} opacity={0.6} />

          {/* scale bar: ~100 µm (a bovine egg is about 120 µm across) */}
          <g style={{ stroke: "var(--color-mist)", fill: "var(--color-mist)" }}>
            <line x1={52} y1={352} x2={202} y2={352} strokeWidth={2} />
            <line x1={52} y1={347} x2={52} y2={357} strokeWidth={1} />
            <line x1={202} y1={347} x2={202} y2={357} strokeWidth={1} />
          </g>
        </svg>
      </div>

      <span className="type-small absolute bottom-4 left-5 font-semibold text-mist">100 µm</span>
      <span className="type-label absolute top-5 left-5 text-sand">{EMBRYO_STAGE_LABELS[Math.min(stage, 4)]}</span>
      <span className="type-label absolute top-5 right-5 text-mist">Illustration</span>
    </div>
  );
}
