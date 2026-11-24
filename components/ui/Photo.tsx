import Image from "next/image";
import type { Photo as PhotoData } from "@/content/media";
import { cn } from "@/lib/cn";

/**
 * Photo - the site's one way to show photography. Crops to a token aspect ratio
 * (or keeps the natural one), radius-lg, lazy by default. `priority` for heroes only.
 */
const aspectClass = {
  photo: "aspect-photo",
  portrait: "aspect-portrait",
  square: "aspect-square",
  wide: "aspect-wide",
} as const;

export interface PhotoProps {
  photo: PhotoData;
  aspect?: keyof typeof aspectClass | "natural";
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  caption?: string;
  /** Zoom the image slightly on hover of the nearest `group` (cards). */
  zoom?: boolean;
  className?: string;
}

export function Photo({ photo, aspect = "photo", sizes = "(min-width: 1024px) 50vw, 100vw", priority, rounded = true, caption, zoom, className }: PhotoProps) {
  const img = (
    <div className={cn("relative w-full overflow-hidden bg-clay", rounded && "rounded-lg", aspect !== "natural" && aspectClass[aspect], className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className={cn(
          "h-full w-full object-cover",
          zoom && "transition-move group-hover:scale-105",
        )}
      />
    </div>
  );
  if (!caption) return img;
  return (
    <figure className="flex flex-col gap-2">
      {img}
      <figcaption className="type-small text-graphite">{caption}</figcaption>
    </figure>
  );
}
