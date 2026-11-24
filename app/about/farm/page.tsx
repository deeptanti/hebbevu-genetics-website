import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, MediaPlaceholder, SectionHeader, Stat, StatGrid } from "@/components/ui";
import { aboutPages } from "@/content/pages/about";
import { stats } from "@/content/stats";
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
        aside={<MediaPlaceholder subject="Reynadu Farm — wide view of the herd and fodder land" />}
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
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {copy.photos.map((p) => (
            <li key={p}>
              <MediaPlaceholder subject={p} />
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
