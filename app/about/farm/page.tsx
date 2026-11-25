import { FilmSection } from "@/components/blocks/FilmSection";
import { films } from "@/content/pages/films";
import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader, Stat, StatGrid } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { aboutPages } from "@/content/pages/about";
import { stats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.farm;

export const metadata = pageMeta({ ...copy.meta, path: "/about/farm" });

export default function FarmPage() {
  return (
    <>
      <PageHero
        photo={photos["farm/aerial"]}
        title={copy.heading}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Reynadu Farm" }]}
        actions={[
          { label: "Book a visit", href: "/book" },
          { label: "Meet the team", href: "/about/team" },
        ]}
      />

      <Section labelledBy="numbers">
        <SectionHeader id="numbers" title={copy.numbersHeading} />
        <StatGrid>
          {[stats.herd, stats.fodder, stats.calves, stats.experience].map((s) => (
            <Stat key={s.id} value={s.value} label={s.label} />
          ))}
        </StatGrid>
      </Section>

      <Section tone="mist" labelledBy="housing">
        <SectionHeader id="housing" title={copy.housingHeading} intro={copy.housing} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "farm/barn-row",
              "farm/herd-walking",
              "farm/calves-resting",
              "people/handler-long-horns",
              "farm/calves-at-barn",
              "people/handler-white-bull",
              "farm/gir-bull-fence",
              "farm/handler-with-bulls",
              "farm/young-calves",
            ] as const
          ).map((k) => (
            <li key={k}>
              <Photo photo={photos[k]} aspect="square" caption={photos[k].alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </Section>

      <FilmSection id="films" block={films.farm} />

      <Section tone="mist" labelledBy="visit">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader id="visit" title={copy.visitHeading} flush />
            <ContactPanel />
          </div>
          <Photo photo={photos["farm/barn-row"]} aspect="photo" />
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Meet the team", href: "/about/team" }}
        photo={photos["farm/cow-and-calf"]}
      />
    </>
  );
}
