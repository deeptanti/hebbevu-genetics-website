"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Photo } from "@/content/media";
import { cn } from "@/lib/cn";

/**
 * HeroSlideshow - full-bleed photos that crossfade every few seconds. While a photo is on
 * screen it slowly zooms and drifts (a different direction per slide), so the hero feels
 * live. Progress bars show the current slide and jump to one when clicked.
 * Under prefers-reduced-motion it shows the first photo, still.
 */
const INTERVAL = 4500;
const FADE = 1.2;
const DRIFT: { x: string; y: string }[] = [
  { x: "-3%", y: "0%" },
  { x: "3%", y: "-2%" },
  { x: "0%", y: "2%" },
  { x: "-2%", y: "-2%" },
  { x: "2%", y: "2%" },
  { x: "-3%", y: "1%" },
];

const isTall = (p: Photo) => p.height >= p.width * 0.9;

export function HeroSlideshow({ photos }: { photos: Photo[] }) {
  const reduce = useReducedMotion();
  // `stamps[k]` counts how many times slide k has become active; it keys the drift so a
  // slide restarts its motion when it comes back, but keeps it while fading out.
  const [state, setState] = useState<{ i: number; stamps: number[] }>(() => ({ i: 0, stamps: photos.map((_, k) => (k === 0 ? 1 : 0)) }));
  const { i, stamps } = state;

  const go = (k: number) =>
    setState((s) => ({ i: k, stamps: s.stamps.map((v, n) => (n === k ? v + 1 : v)) }));

  useEffect(() => {
    if (reduce || photos.length < 2) return;
    const t = setTimeout(() => go((i + 1) % photos.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, stamps, reduce, photos.length]);

  return (
    <>
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-live="off">
        {photos.map((p, k) => {
          const on = k === i;
          const d = DRIFT[k % DRIFT.length];
          return (
            <motion.div
              key={p.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : FADE, ease: "easeInOut" }}
              aria-hidden={!on}
            >
              <motion.div
                key={`${p.src}-${stamps[k]}`}
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.14, x: "0%", y: "0%" }}
                animate={reduce || !on ? undefined : { scale: 1.02, x: d.x, y: d.y }}
                transition={{ duration: (INTERVAL + FADE * 1000) / 1000 + 1, ease: "linear" }}
              >
                <Image
                  src={p.src}
                  alt={on ? p.alt : ""}
                  fill
                  loading={k === 0 ? "eager" : "lazy"}
                  fetchPriority={k === 0 ? "high" : "auto"}
                  sizes="100vw"
                  className={cn("object-cover", isTall(p) ? "object-upper" : "object-center")}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {!reduce && photos.length > 1 && (
        <div className="absolute top-5 right-4 z-10 flex gap-2 md:right-6">
          {photos.map((p, k) => (
            <button
              key={p.src}
              type="button"
              onClick={() => go(k)}
              aria-label={`Show photo ${k + 1} of ${photos.length}`}
              aria-current={k === i}
              className="group flex h-7 items-center"
            >
              <span className="relative block h-1 w-7 overflow-hidden rounded-full bg-mist/30">
                {k === i && (
                  <motion.span
                    key={stamps[k]}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                  />
                )}
                {k < i && <span className="absolute inset-0 bg-mist/70" />}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
