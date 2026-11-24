"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type { Photo } from "@/content/media";

/**
 * PhotoStrip — a horizontal, snap-scrolling run of farm photographs.
 * Swipe on touch, scroll with trackpad, or use the arrow buttons. Photos zoom gently on hover.
 */
export function PhotoStrip({ photos, label }: { photos: Photo[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const btn =
    "transition-move inline-flex size-7 items-center justify-center rounded-full border border-graphite bg-white text-ink hover:border-brown hover:bg-brown hover:text-white";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end gap-3">
        <button type="button" className={btn} onClick={() => scroll(-1)} aria-label="Previous photos">
          <ArrowLeft weight="bold" className="size-5" aria-hidden="true" />
        </button>
        <button type="button" className={btn} onClick={() => scroll(1)} aria-label="Next photos">
          <ArrowRight weight="bold" className="size-5" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
      >
        {photos.map((p) => (
          <li key={p.src} className="group w-4/5 shrink-0 snap-start sm:w-2/5 lg:w-1/4">
            <figure className="flex flex-col gap-3">
              <div className="relative aspect-portrait overflow-hidden rounded-lg bg-clay">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
                  className="transition-move object-cover group-hover:scale-105"
                />
              </div>
              <figcaption className="type-small text-graphite">{p.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
