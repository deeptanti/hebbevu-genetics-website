"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import type { Photo } from "@/content/media";
import { cn } from "@/lib/cn";

/**
 * Gallery - filterable photo grid with a full-screen lightbox.
 * Keyboard: ←/→ to move, Esc to close. Focus returns to the grid when closed.
 */
export interface GalleryItem {
  photo: Photo;
  group: string;
}

export function Gallery({ items, groups }: { items: GalleryItem[]; groups: string[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const shown = filter === "All" ? items : items.filter((i) => i.group === filter);

  const move = useCallback(
    (d: 1 | -1) => setOpen((v) => (v === null ? v : (v + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, move]);

  const ctrl =
    "transition-move inline-flex size-7 items-center justify-center rounded-full border border-mist text-mist hover:bg-mist hover:text-deep";

  return (
    <div className="flex flex-col gap-6">
      <div role="toolbar" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {["All", ...groups].map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={filter === g}
            onClick={() => setFilter(g)}
            className={cn(
              "transition-move type-small min-h-7 rounded-full border px-4 font-semibold",
              filter === g ? "border-brown bg-brown text-white" : "border-graphite bg-white text-ink hover:border-brown hover:text-brown",
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <motion.ul layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence initial={false}>
          {shown.map((it, i) => (
            <motion.li
              key={it.photo.src}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-lg bg-clay text-left"
                aria-label={`Open photo: ${it.photo.alt}`}
              >
                <Image
                  src={it.photo.src}
                  alt={it.photo.alt}
                  width={it.photo.width}
                  height={it.photo.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-move h-auto w-full group-hover:scale-105"
                />
                <span className="type-small transition-move absolute inset-x-0 bottom-0 translate-y-full bg-deep p-3 text-mist group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {it.photo.alt}
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {open !== null && shown[open] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            data-ground="dark"
            className="fixed inset-0 z-50 flex flex-col bg-deep/95 p-4 md:p-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="type-label text-mist">
                {open + 1} / {shown.length}
              </span>
              <button type="button" autoFocus className={ctrl} onClick={() => setOpen(null)} aria-label="Close">
                <X weight="bold" className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center py-4" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
              <motion.div
                key={shown[open].photo.src}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative h-full w-full"
              >
                <Image src={shown[open].photo.src} alt={shown[open].photo.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button type="button" className={ctrl} onClick={() => move(-1)} aria-label="Previous photo">
                <ArrowLeft weight="bold" className="size-5" aria-hidden="true" />
              </button>
              <p className="type-small text-center text-mist">{shown[open].photo.alt}</p>
              <button type="button" className={ctrl} onClick={() => move(1)} aria-label="Next photo">
                <ArrowRight weight="bold" className="size-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
