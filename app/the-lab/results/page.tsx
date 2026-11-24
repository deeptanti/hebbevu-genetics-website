import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography";
import { CTABand, SectionHeader, Stat } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { DnaHelix } from "@/components/visuals/DnaHelix";
import { conceptionMethod, traceChain, traceExplainer } from "@/content/lab";
import { photos } from "@/content/media";
import { labPages } from "@/content/pages/lab";
import { stats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.results;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/results" });

export default function ResultsPage() {
  return (
    <>
      <PageHero
        photo={photos["articles/why-gir-cows-are-the-backbone"]}
        title="Results & methodology"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "Results" }]}
        actions={[
          { label: "Book a Consultation", href: "/book" },
          { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
        ]}
        highlight={
          <dl>
            <Stat value={stats.conception.value} label={stats.conception.label} note={stats.conception.note} brandIcon={stats.conception.brandIcon} />
          </dl>
        }
      />

      <Section labelledBy="method">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader id="method" title={conceptionMethod.heading} intro={[...conceptionMethod.paragraphs]} flush />
            <div className="max-w-prose border-t border-stone pt-5">
              <Heading level={3} className="mb-3">
                {copy.probability.heading}
              </Heading>
              <p className="type-body text-ink">{copy.probability.body}</p>
            </div>
          </div>
          <DnaHelix turns={2} rungs={22} className="w-full" />
        </div>
      </Section>

      <Section tone="mist" labelledBy="trace">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader id="trace" title={copy.traceHeading} intro={traceExplainer} flush />
            <TraceChain links={traceChain} />
          </div>
          <Photo photo={photos["farm/vet-checking"]} aspect="photo" />
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" }}
        photo={photos["farm/calves-resting"]}
      />
    </>
  );
}
