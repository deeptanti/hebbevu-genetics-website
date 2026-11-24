import Image from "next/image";
import { CardLink, CardMore } from "./Card";

export interface ArticleCardProps {
  href: string;
  title: string;
  description: string;
  /** The reader problem this article answers, shown as a label. */
  topic?: string;
  minutes?: number;
  /** Cover image (decorative here — the title carries the meaning). */
  image?: { src: string };
  level?: 2 | 3;
}

export function ArticleCard({ href, title, description, topic, minutes, image, level = 3 }: ArticleCardProps) {
  const H = `h${level}` as const;
  return (
    <CardLink href={href} flush={!!image}>
      {image && (
        <div className="relative aspect-photo overflow-hidden border-b border-stone bg-clay">
          <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="transition-move object-cover group-hover:scale-105" />
        </div>
      )}
      <div className={image ? "flex flex-1 flex-col p-4 md:p-5" : "contents"}>
      {(topic || minutes) && (
        <p className="type-label mb-3 text-graphite">
          {topic}
          {topic && minutes ? " · " : ""}
          {minutes ? `${minutes} min read` : ""}
        </p>
      )}
      <H className="type-h3 mb-3 text-ink">{title}</H>
      <p className="type-small text-ink">{description}</p>
      <CardMore>Read article</CardMore>
      </div>
    </CardLink>
  );
}
