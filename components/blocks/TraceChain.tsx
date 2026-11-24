"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Donor → … → Calving. Links light up one after another as the chain scrolls into
 * view, like a record being traced. Ordered list, so it reads correctly aloud.
 */
export function TraceChain({ links, ground = "light" }: { links: string[]; ground?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const dark = ground === "dark";
  return (
    <motion.ol
      aria-label="Traceability chain"
      className="flex flex-wrap items-center gap-y-3"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      {links.map((l, i) => (
        <motion.li
          key={l}
          className="flex items-center"
          variants={{ hidden: { opacity: 0.25 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
        >
          <span
            className={cn(
              "type-label rounded-sm px-3 py-2",
              i === 0 || i === links.length - 1
                ? dark
                  ? "bg-mist text-deep"
                  : "bg-brown text-white"
                : dark
                  ? "border border-graphite bg-deep text-mist"
                  : "border border-stone bg-white text-ink",
            )}
          >
            {l}
          </span>
          {i < links.length - 1 && (
            <motion.span
              aria-hidden="true"
              className={cn("mx-1 h-px w-4 origin-left", dark ? "bg-mist" : "bg-brown")}
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.3 } } }}
            />
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}
