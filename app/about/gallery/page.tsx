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
        banner={photos["banners/herd-road"]}
        title={copy.title}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Gallery" }]}
      />
      <Section tone="mist">
        <Gallery items={copy.items.map(([k, group]) => ({ photo: photos[k], group }))} groups={copy.groups} />
      </Section>
      <Section labelledBy="videos">
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
      <CTABand {...copy.cta} photo={photos["farm/barn-row"]} />
    </>
  );
}
