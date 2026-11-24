"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * CountUp - counts every number inside a figure like "1700+" or "35–40%" up from 0
 * when it scrolls into view. The server renders the FINAL value (no-JS and SEO safe);
 * it is only reset to zero while still off-screen, so nothing visibly jumps.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const armed = useRef(false);
  const parts = value.split(/(\d+)/);

  const render = (p: number) =>
    parts.map((s, i) => (i % 2 === 1 ? String(Math.round(Number(s) * p)) : s)).join("");

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      el.textContent = render(0);
      armed.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || !armed.current) return;
    const c = animate(0, 1, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (p) => (el.textContent = render(p)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {value}
    </span>
  );
}
