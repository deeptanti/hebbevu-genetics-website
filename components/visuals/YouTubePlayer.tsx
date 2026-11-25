"use client";

import Image from "next/image";
import { Play } from "@phosphor-icons/react";
import { useState } from "react";
import { youtubeThumb, type Video } from "@/content/videos";
import { cn } from "@/lib/cn";

/**
 * YouTubePlayer - a local poster with a play button; the YouTube player (privacy-enhanced,
 * youtube-nocookie.com) loads only when pressed, so pages stay light and nothing is fetched
 * from YouTube until someone chooses to watch.
 * Films are 16:9, Shorts 9:16. Pass `playing` to control it from outside (FilmPlaylist).
 */
export function YouTubePlayer({
  video,
  playing: controlled,
  onPlay,
  sizes,
  className,
}: {
  video: Video;
  playing?: boolean;
  onPlay?: () => void;
  sizes?: string;
  className?: string;
}) {
  const [own, setOwn] = useState(false);
  const playing = controlled ?? own;
  const short = video.kind === "short";
  const play = () => {
    setOwn(true);
    onPlay?.();
  };

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg bg-deep", short ? "aspect-short" : "aspect-wide", className)}>
      {playing ? (
        <iframe
          key={video.id}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={play} className="group absolute inset-0 size-full text-left" aria-label={`Play video: ${video.title}`}>
          <Image
            src={youtubeThumb(video)}
            alt=""
            fill
            sizes={sizes ?? (short ? "(min-width: 1024px) 25vw, 60vw" : "(min-width: 1024px) 800px, 100vw")}
            className="transition-move object-cover group-hover:scale-105"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-deep/60 via-transparent to-transparent" />
          <span
            aria-hidden="true"
            className={cn(
              "transition-move absolute flex items-center justify-center rounded-full bg-brown text-white shadow-md group-hover:scale-110 group-hover:bg-brown-dark",
              short ? "bottom-4 left-4 size-7" : "top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2",
            )}
          >
            <Play weight="fill" className={short ? "size-5" : "size-6"} />
          </span>
          {video.duration && (
            <span aria-hidden="true" className="type-small absolute right-4 bottom-4 rounded-sm bg-deep/80 px-2 text-white">
              {video.duration}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
