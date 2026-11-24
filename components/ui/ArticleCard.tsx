import { CardLink, CardMore } from "./Card";

export interface ArticleCardProps {
  href: string;
  title: string;
  description: string;
  /** The reader problem this article answers, shown as a label. */
  topic?: string;
  minutes?: number;
  level?: 2 | 3;
}

export function ArticleCard({ href, title, description, topic, minutes, level = 3 }: ArticleCardProps) {
  const H = `h${level}` as const;
  return (
    <CardLink href={href}>
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
    </CardLink>
  );
}
