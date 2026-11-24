import type { IconName } from "@/content/types";
import { CardLink, CardMore } from "./Card";
import { Icon } from "./Icon";

export interface ServiceCardProps {
  href: string;
  title: string;
  summary: string;
  kicker?: string;
  icon?: IconName;
  /** Short bullet list (benefits or inclusions). */
  points?: string[];
  more?: string;
  /** Heading level inside the card. */
  level?: 2 | 3;
}

export function ServiceCard({ href, title, summary, kicker, icon, points, more = "Learn more", level = 3 }: ServiceCardProps) {
  const H = `h${level}` as const;
  return (
    <CardLink href={href}>
      <div className="mb-4 flex items-center justify-between gap-4">
        {kicker && <span className="type-label text-graphite">{kicker}</span>}
        {icon && <Icon name={icon} className="text-brown" />}
      </div>
      <H className="type-h3 mb-3 text-ink">{title}</H>
      <p className="type-body text-ink">{summary}</p>
      {points && points.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 border-t border-stone pt-4">
          {points.map((p) => (
            <li key={p} className="type-small flex gap-2 text-ink">
              <Icon name="check" className="text-brown" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      <CardMore>{more}</CardMore>
    </CardLink>
  );
}
