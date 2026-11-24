import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography";
import { CTABand, SectionHeader, Stat } from "@/components/ui";
import { DnaHelix } from "@/components/visuals/DnaHelix";
import { conceptionMethod, traceChain, traceExplainer } from "@/content/lab";
import { labPages } from "@/content/pages/lab";
import { stats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.results;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/results" });

export default function ResultsPage() {
  return (
    <>
      <PageHero
        title="Results & methodology"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "Results" }]}
        aside={
          <dl className="rounded-lg border border-stone bg-mist p-5 md:p-6">
            <Stat value={stats.conception.value} label={stats.conception.label} note={stats.conception.note} />
          </dl>
        }
      />

      <Section tone="mist">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader title={conceptionMethod.heading} intro={[...conceptionMethod.paragraphs]} />
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

      <Section>
        <SectionHeader title={copy.traceHeading} intro={traceExplainer} />
        <TraceChain links={traceChain} />
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" }}
      />
    </>
  );
}
