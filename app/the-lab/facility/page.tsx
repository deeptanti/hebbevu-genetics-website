import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Card, CTABand, Icon, MediaPlaceholder, SectionHeader } from "@/components/ui";
import { facilityAreas } from "@/content/lab";
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
        aside={<MediaPlaceholder subject="The lab building at Reynadu Farm, exterior" />}
      />

      <Section tone="mist">
        <SectionHeader title={copy.areasHeading} />
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {facilityAreas.map((a) => (
            <li key={a.id}>
              <Card>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="type-label text-graphite">Area {a.number}</span>
                  {a.icon && <Icon name={a.icon} className="text-brown" />}
                </div>
                <h3 className="type-h3 mb-3 text-ink">{a.title}</h3>
                <p className="type-body text-ink">{a.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader title={copy.galleryHeading} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {copy.photos.map((p) => (
            <li key={p}>
              <MediaPlaceholder subject={p} />
            </li>
          ))}
        </ul>
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
