"use client";

import Image from "next/image";
import { Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { youtubeThumb, type Video } from "@/content/videos";
import { JsonLd } from "@/components/seo/JsonLd";
import { track } from "@/lib/analytics";
import { videoSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

/**
 * YouTubePlayer - a local poster with a play button; the YouTube player (privacy-enhanced,
 * youtube-nocookie.com) loads only when pressed, so pages stay light and nothing is fetched
 * from YouTube until someone chooses to watch.
 * Films are 16:9, Shorts 9:16. Pass `playing` to control it from outside (FilmPlaylist).
 */
const YT_ORIGIN = /^https:\/\/www\.youtube(-nocookie)?\.com$/;

/**
 * Sends video_play when a player starts (from its own button or a playlist), then
 * video_progress at 25/50/75% and video_complete, read from the YouTube iframe API
 * (enablejsapi=1). GA4's built-in video tracking misses players added after page load,
 * so we send the same event names ourselves.
 */
function useVideoTracking(frame: React.RefObject<HTMLIFrameElement | null>, video: Video, playing: boolean) {
  useEffect(() => {
    if (!playing) return;
    const base = { video_title: video.title, video_id: video.id, video_kind: video.kind };
    track("video_play", base);
    const sent = new Set<number>();
    let duration = 0;
    const onMessage = (e: MessageEvent) => {
      if (!YT_ORIGIN.test(e.origin) || e.source !== frame.current?.contentWindow || typeof e.data !== "string") return;
      let msg: { event?: string; info?: unknown };
      try {
        msg = JSON.parse(e.data);
      } catch {
        return;
      }
      const info = msg.info as { currentTime?: number; duration?: number; playerState?: number } | number | undefined;
      // playerState 0 = ended; it arrives either as an onStateChange or inside infoDelivery.
      const ended = (msg.event === "onStateChange" && info === 0) || (typeof info === "object" && info?.playerState === 0);
      if (ended && !sent.has(100)) {
        sent.add(100);
        track("video_complete", { ...base, video_percent: "100" });
        return;
      }
      if (typeof info !== "object" || !info) return;
      if (info.duration) duration = info.duration;
      if (info.currentTime === undefined || !duration) return;
      const pct = (info.currentTime / duration) * 100;
      for (const mark of [25, 50, 75]) {
        if (pct >= mark && !sent.has(mark)) {
          sent.add(mark);
          track("video_progress", { ...base, video_percent: String(mark) });
        }
      }
    };
    // The player only reports progress after it is told someone is listening.
    const listen = () => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: video.id, channel: "widget" }), "*");
    const el = frame.current;
    el?.addEventListener("load", listen);
    window.addEventListener("message", onMessage);
    return () => {
      el?.removeEventListener("load", listen);
      window.removeEventListener("message", onMessage);
    };
  }, [frame, video, playing]);
}

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
  const frame = useRef<HTMLIFrameElement>(null);
  useVideoTracking(frame, video, playing);
  const play = () => {
    setOwn(true);
    onPlay?.();
  };

  const schema = videoSchema(video);
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg bg-deep", short ? "aspect-short" : "aspect-wide", className)}>
      {schema && <JsonLd data={schema} />}
      {playing ? (
        <iframe
          ref={frame}
          key={video.id}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
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
