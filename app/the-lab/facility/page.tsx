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
        photo={photos["lab/microscope"]}
        title="The facility"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "Facility" }]}
        actions={[
          { label: "Book a visit", href: "/book" },
          { label: "How IVF works", href: "/the-lab/how-ivf-works" },
        ]}
      />

      <Section labelledBy="areas">
        <SectionHeader id="areas" title={copy.areasHeading} />
        <ol className="grid grid-cols-1 gap-5 lg:grid-cols-3">
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

      <Section tone="mist" labelledBy="lab-site">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <SectionHeader id="lab-site" title={labIntro.heading} intro={labIntro.lede} flush />
          <DnaHelix turns={2} rungs={24} className="w-full" />
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {(["lab/bench", "lab/egg-cell", "farm/vet-checking", "farm/aerial"] as const).map((k) => (
            <li key={k}>
              <Photo photo={photos[k]} aspect="photo" caption={photos[k].alt} sizes="(min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "How IVF works", href: "/the-lab/how-ivf-works" }}
        photo={photos["farm/aerial"]}
      />
    </>
  );
}
