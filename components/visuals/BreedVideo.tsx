"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * BreedVideo — a short, silent loop of the breed (converted from the client's GIFs).
 * Autoplays muted; under prefers-reduced-motion it stays on the poster frame.
 */
export function BreedVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) v.pause();
    else void v.play().catch(() => {});
  }, [reduce]);
  return (
    <div className={cn("relative aspect-square w-full overflow-hidden rounded-lg bg-clay", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!reduce}
        preload="metadata"
        aria-label={label}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
