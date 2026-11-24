import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader, Stat, StatGrid } from "@/components/ui";
import { aboutPages } from "@/content/pages/about";
import { stats } from "@/content/stats";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.farm;

export const metadata = pageMeta({ ...copy.meta, path: "/about/farm" });

export default function FarmPage() {
  return (
    <>
      <PageHero
        title={copy.heading}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Reynadu Farm" }]}
        aside={<Photo photo={photos["farm/aerial"]} aspect="photo" priority />}
      />

      <Section tone="mist">
        <StatGrid>
          {[stats.herd, stats.fodder, stats.calves, stats.experience].map((s) => (
            <Stat key={s.id} value={s.value} label={s.label} />
          ))}
        </StatGrid>
      </Section>

      <Section>
        <SectionHeader title={copy.housingHeading} intro={copy.housing} />
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
              <Photo photo={photos[k]} caption={photos[k].alt} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist">
        <SectionHeader title={copy.visitHeading} />
        <ContactPanel />
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Meet the team", href: "/about/team" }}
      />
    </>
  );
}
