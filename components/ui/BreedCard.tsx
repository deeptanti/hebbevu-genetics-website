import { CardLink, CardMore } from "./Card";
import { Chip } from "./Chip";
import { MediaPlaceholder } from "./MediaPlaceholder";
import type { Photo as PhotoData } from "@/content/media";
import { Photo } from "./Photo";

export interface BreedCardProps {
  href: string;
  name: string;
  epithet: string;
  /** Key facts, e.g. [{label:"Origin", value:"Gujarat"}, {label:"Milk yield", value:"12–15 l/day"}]. */
  facts: { label: string; value: string }[];
  /** Small tags, e.g. ["A2 milk"]. */
  tags?: string[];
  /** Each breed needs ITS OWN photograph (brief §15.5). Until supplied, a placeholder names the shot. */
  photoSubject?: string;
  /** This breed's own photograph. Without one, a labelled placeholder names the shot needed. */
  photo?: PhotoData;
  level?: 2 | 3;
}

export function BreedCard({ href, name, epithet, facts, tags, photoSubject, photo, level = 3 }: BreedCardProps) {
  const H = `h${level}` as const;
  return (
    <CardLink href={href} flush>
      {photo ? (
        <Photo photo={photo} aspect="photo" rounded={false} zoom sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      ) : (
        <MediaPlaceholder subject={photoSubject ?? `${name} — individual animal, side profile`} framed={false} />
      )}
      <div className="border-t border-stone" />
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="type-label mb-2 text-graphite">{epithet}</p>
        <H className="type-h3 mb-4 text-ink">{name}</H>
        <dl className="grid grid-cols-2 gap-4 border-t border-stone pt-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dt className="type-label text-graphite">{f.label}</dt>
              <dd className="type-small text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        )}
        <CardMore>{`About ${name}`}</CardMore>
      </div>
    </CardLink>
  );
}
