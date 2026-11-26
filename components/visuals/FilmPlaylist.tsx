"use client";

import Image from "next/image";
import { Play, SpeakerHigh } from "@phosphor-icons/react";
import { useState } from "react";
import { youtubeThumb, type Video } from "@/content/videos";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";
import { videoSchema } from "@/lib/schema";
import { YouTubePlayer } from "./YouTubePlayer";

/**
 * FilmPlaylist - one featured film with the rest listed beside it. Choosing a film from the
 * list swaps it into the player and starts it. A single film renders just the player and its note.
 */
export function FilmPlaylist({ films, label }: { films: Video[]; label: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = films[i];

  const meta = (
    <div className="flex flex-col gap-2">
      <p className="type-h3 text-ink">{current.title}</p>
      {current.note && <p className="type-body text-graphite">{current.note}</p>}
    </div>
  );

  if (films.length === 1)
    return (
      <div className="flex flex-col gap-5">
        <YouTubePlayer video={current} playing={playing} onPlay={() => setPlaying(true)} />
        {meta}
      </div>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-5 lg:col-span-8">
        <YouTubePlayer video={current} playing={playing} onPlay={() => setPlaying(true)} />
        {meta}
      </div>
      <ul aria-label={label} className="flex flex-col gap-3 lg:col-span-4">
        {films.map((f, k) => {
          const on = k === i;
          // The player marks up the current film; the rest are playable from this list.
          const schema = on ? null : videoSchema(f);
          return (
            <li key={f.id}>
              {schema && <JsonLd data={schema} />}
              <button
                type="button"
                aria-current={on}
                onClick={() => {
                  setI(k);
                  setPlaying(true);
                }}
                className={cn(
                  "transition-ui group flex w-full items-center gap-4 rounded-md border p-2 text-left",
                  on ? "border-brown bg-clay" : "border-transparent hover:border-graphite hover:bg-white",
                )}
              >
                <span className="relative aspect-wide w-2/5 shrink-0 overflow-hidden rounded-sm bg-deep">
                  <Image src={youtubeThumb(f)} alt="" fill sizes="160px" className="object-cover" />
                  <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                    <span className={cn("flex size-6 items-center justify-center rounded-full text-white", on ? "bg-brown" : "bg-deep/70 group-hover:bg-brown")}>
                      {on && playing ? <SpeakerHigh weight="fill" className="size-4" /> : <Play weight="fill" className="size-4" />}
                    </span>
                  </span>
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className={cn("type-small font-semibold", on ? "text-brown" : "text-ink")}>{f.title}</span>
                  {f.duration && <span className="type-small text-graphite">{f.duration}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
