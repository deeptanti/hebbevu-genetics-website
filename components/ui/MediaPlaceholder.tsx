import { cn } from "@/lib/cn";

/**
 * Stand-in for photography that does not exist yet (brief §15.5).
 * Deliberately obvious - never swap in stock imagery. `subject` describes the shot needed.
 */
export interface MediaPlaceholderProps {
  subject: string;
  aspect?: "photo" | "portrait" | "wide" | "square";
  /** Own dashed frame + radius. Set false when a parent card provides the frame. */
  framed?: boolean;
  className?: string;
}

const aspectClass = { photo: "aspect-photo", portrait: "aspect-portrait", wide: "aspect-wide", square: "aspect-square" };

export function MediaPlaceholder({ subject, aspect = "photo", framed = true, className }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Photograph to be supplied: ${subject}`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 bg-mist p-5 text-center",
        framed && "rounded-lg border border-dashed border-stone",
        aspectClass[aspect],
        className,
      )}
    >
      <span className="type-label text-graphite">[ Photography to be supplied ]</span>
      <span className="type-small text-graphite">{subject}</span>
    </div>
  );
}
