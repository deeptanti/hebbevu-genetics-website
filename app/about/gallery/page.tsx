import { FilmSection } from "@/components/blocks/FilmSection";
import { films } from "@/content/pages/films";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { BreedVideo } from "@/components/visuals/BreedVideo";
import { Gallery } from "@/components/visuals/Gallery";
import { photos } from "@/content/media";
import { galleryPage as copy } from "@/content/pages/gallery";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMeta({ ...copy.meta, path: "/about/gallery" });

export default function GalleryPage() {
  return (
    <>
      <PageHero
        photo={photos["people/team-at-fence"]}
        caption="The Hebbevu team, with founder Mr. Amith Kishan fourth from left"
        title={copy.title}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Gallery" }]}
        actions={[
          { label: "Book a visit", href: "/book" },
          { label: "About the farm", href: "/about/farm" },
        ]}
      />
      <Section labelledBy="photos">
        <SectionHeader id="photos" title={copy.photosHeading} intro={copy.photosIntro} />
        <Gallery items={copy.items.map(([k, group]) => ({ photo: photos[k], group }))} groups={copy.groups} />
      </Section>
      <Section tone="mist" labelledBy="videos">
        <SectionHeader id="videos" title={copy.videosHeading} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.videos.map((v) => (
            <li key={v.slug} className="flex flex-col gap-3">
              <BreedVideo src={`/video/breed-${v.slug}.mp4`} poster={`/video/breed-${v.slug}.jpg`} label={`${v.name}, short looping clip`} />
              <Link href={`/breeds/${v.slug}`} className="transition-ui type-subheading text-ink hover:text-brown">
                {v.name} →
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <FilmSection id="youtube" block={films.gallery} />
      <CTABand {...copy.cta} photo={photos["farm/barn-row"]} />
    </>
  );
}
