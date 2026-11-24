"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reveal — a short rise-and-fade the first time content scrolls into view.
 * `stagger` reveals direct <RevealItem> children one after another.
 * Disabled under prefers-reduced-motion (content simply renders).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  const variants: Variants = {
    hidden: stagger ? {} : { opacity: 0, y: 24 },
    show: stagger
      ? { transition: { staggerChildren: stagger, delayChildren: delay } }
      : { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
  };
  return (
    <M className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M
      className={className}
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      {children}
    </M>
  );
}
