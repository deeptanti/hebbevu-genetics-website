import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Card, CTABand, IconTile, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { DnaHelix } from "@/components/visuals/DnaHelix";
import { facilityAreas, labIntro } from "@/content/lab";
import { photos } from "@/content/media";
import { labPages } from "@/content/pages/lab";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.facility;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/facility" });

export default function FacilityPage() {
  return (
    <>
      <PageHero
        title="The facility"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "Facility" }]}
        aside={<Photo photo={photos["farm/aerial"]} aspect="photo" priority />}
      />

      <Section tone="mist">
        <SectionHeader title={copy.areasHeading} />
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {facilityAreas.map((a) => (
            <li key={a.id}>
              <Card>
                <div className="mb-5 flex items-center justify-between gap-4">
                  {a.icon && <IconTile name={a.icon} />}
                  <span className="type-label text-graphite">Step {a.number}</span>
                </div>
                <h3 className="type-h3 mb-3 text-ink">{a.title}</h3>
                <p className="type-body text-ink">{a.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <SectionHeader title={labIntro.heading} intro={labIntro.lede} flush />
          <DnaHelix turns={2} rungs={24} className="w-full" />
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "How IVF works", href: "/the-lab/how-ivf-works" }}
      />
    </>
  );
}
