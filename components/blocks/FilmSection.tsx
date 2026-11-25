import { Section, type SectionTone } from "@/components/layout/Section";
import { Button, SectionHeader } from "@/components/ui";
import { FilmPlaylist } from "@/components/visuals/FilmPlaylist";
import { ShortsRow } from "@/components/visuals/ShortsRow";
import { watchOnYouTube } from "@/content/pages/films";
import { youtubeChannel, type Video } from "@/content/videos";

/** A section of films from the YouTube channel: a playlist, a row of Shorts, or both. */
export function FilmSection({
  id,
  tone,
  block,
}: {
  id: string;
  tone?: SectionTone;
  block: { heading: string; intro?: string; films?: Video[]; shorts?: Video[] };
}) {
  return (
    <Section tone={tone} labelledBy={id}>
      <SectionHeader
        id={id}
        title={block.heading}
        intro={block.intro}
        actions={
          <Button href={youtubeChannel} variant="ghost" arrow>
            {watchOnYouTube}
          </Button>
        }
      />
      {block.films && <FilmPlaylist films={block.films} label={`${block.heading}: films`} />}
      {block.shorts && <ShortsRow shorts={block.shorts} label={`${block.heading}: short videos`} className={block.films ? "mt-8" : undefined} />}
    </Section>
  );
}
