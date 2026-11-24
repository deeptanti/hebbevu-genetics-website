"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * DnaHelix - a rotating double helix drawn in SVG. Two backbone strands plus base-pair
 * rungs; depth is faked by fading/shrinking whatever is "behind". Geometry is updated per
 * frame via refs (no React re-render), runs only while on screen, and is a still image under
 * prefers-reduced-motion. Decorative: aria-hidden.
 */
export interface DnaHelixProps {
  orientation?: "horizontal" | "vertical";
  /** Number of full twists across the length. */
  turns?: number;
  /** Base-pair rungs across the length. */
  rungs?: number;
  ground?: "light" | "dark";
  /** Seconds per full rotation. */
  speed?: number;
  /** Length along the axis in viewBox units (width is fixed at 120). Shorter = chunkier. */
  length?: number;
  className?: string;
}

const AMP = 46;
const MID = 60;

export function DnaHelix({ orientation = "horizontal", turns = 3, rungs = 36, ground = "light", speed = 9, length: LEN = 1000, className }: DnaHelixProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const a = useRef<SVGPathElement>(null);
  const b = useRef<SVGPathElement>(null);
  const rungRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotA = useRef<(SVGCircleElement | null)[]>([]);
  const dotB = useRef<(SVGCircleElement | null)[]>([]);
  const inView = useInView(svgRef, { margin: "100px" });
  const reduce = useReducedMotion();
  const vertical = orientation === "vertical";

  useEffect(() => {
    const k = (Math.PI * 2 * turns) / LEN;
    const pt = (u: number, v: number) => (vertical ? `${v.toFixed(1)},${u.toFixed(1)}` : `${u.toFixed(1)},${v.toFixed(1)}`);
    const draw = (phase: number) => {
      let da = "";
      let db = "";
      for (let u = 0; u <= LEN; u += 8) {
        const s = Math.sin(k * u + phase);
        da += `${u === 0 ? "M" : "L"}${pt(u, MID + AMP * s)}`;
        db += `${u === 0 ? "M" : "L"}${pt(u, MID - AMP * s)}`;
      }
      a.current?.setAttribute("d", da);
      b.current?.setAttribute("d", db);
      for (let i = 0; i < rungs; i++) {
        const u = ((i + 0.5) / rungs) * LEN;
        const th = k * u + phase;
        const s = Math.sin(th);
        const depth = (Math.cos(th) + 1) / 2; // 0 back … 1 front
        const y1 = MID + AMP * s;
        const y2 = MID - AMP * s;
        const line = rungRefs.current[i];
        if (line) {
          const [x1, yy1] = pt(u, y1).split(",");
          const [x2, yy2] = pt(u, y2).split(",");
          line.setAttribute("x1", x1);
          line.setAttribute("y1", yy1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", yy2);
          line.setAttribute("opacity", (0.25 + 0.55 * Math.abs(s)).toFixed(2));
        }
        const ca = dotA.current[i];
        const cb = dotB.current[i];
        if (ca && cb) {
          const [ax, ay] = pt(u, y1).split(",");
          const [bx, by] = pt(u, y2).split(",");
          ca.setAttribute("cx", ax);
          ca.setAttribute("cy", ay);
          ca.setAttribute("r", (2.5 + 3 * depth).toFixed(2));
          ca.setAttribute("opacity", (0.35 + 0.65 * depth).toFixed(2));
          cb.setAttribute("cx", bx);
          cb.setAttribute("cy", by);
          cb.setAttribute("r", (2.5 + 3 * (1 - depth)).toFixed(2));
          cb.setAttribute("opacity", (0.35 + 0.65 * (1 - depth)).toFixed(2));
        }
      }
    };
    draw(0);
    if (reduce || !inView) return;
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      draw((((t - start) / 1000) * Math.PI * 2) / speed);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, rungs, speed, turns, vertical, LEN]);

  const strand = ground === "dark" ? "stroke-mist" : "stroke-brown";
  const rung = ground === "dark" ? "stroke-mist" : "stroke-sand";
  const dotX = ground === "dark" ? "fill-mist" : "fill-brown";
  const dotY = ground === "dark" ? "fill-sand" : "fill-brown-dark";

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      viewBox={vertical ? `0 0 ${MID * 2} ${LEN}` : `0 0 ${LEN} ${MID * 2}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("pointer-events-none overflow-visible", className)}
    >
      {Array.from({ length: rungs }, (_, i) => (
        <line key={`r${i}`} ref={(el) => void (rungRefs.current[i] = el)} className={rung} strokeWidth={2} strokeLinecap="round" />
      ))}
      <path ref={a} className={cn("fill-none", strand)} strokeWidth={2.5} strokeLinecap="round" />
      <path ref={b} className={cn("fill-none", strand)} strokeWidth={2.5} strokeLinecap="round" opacity={0.6} />
      {Array.from({ length: rungs }, (_, i) => (
        <g key={`d${i}`}>
          <circle ref={(el) => void (dotA.current[i] = el)} className={dotX} />
          <circle ref={(el) => void (dotB.current[i] = el)} className={dotY} />
        </g>
      ))}
    </svg>
  );
}
