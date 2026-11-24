import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading, Pending } from "@/components/typography";
import { CTABand, DataTable, SectionHeader, Stat } from "@/components/ui";
import { conceptionMethod, traceChain, traceExplainer } from "@/content/lab";
import { labPages } from "@/content/pages/lab";
import { pendingLabFigures, stats } from "@/content/stats";
import { TBS } from "@/content/types";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.results;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/results" });

const cell = (v: string) => (v === TBS ? <Pending /> : v);

export default function ResultsPage() {
  return (
    <>
      <PageHero
        title="Results & methodology"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "Results" }]}
        aside={
          <dl>
            <Stat value={stats.conception.value} label={stats.conception.label} note={stats.conception.note} />
          </dl>
        }
      />

      <Section tone="mist">
        <SectionHeader title={conceptionMethod.heading} intro={[...conceptionMethod.paragraphs]} />
        <div className="max-w-prose border-t border-stone pt-5">
          <Heading level={3} className="mb-3">
            {copy.probability.heading}
          </Heading>
          <p className="type-body text-ink">{copy.probability.body}</p>
        </div>
      </Section>

      <Section>
        <SectionHeader title={copy.figuresHeading} intro={copy.figuresIntro} />
        <DataTable
          caption="Lab performance figures and the sample size behind each"
          columns={[
            { key: "metric", header: "Metric", rowHeader: true },
            { key: "value", header: "Figure" },
            { key: "sampleSize", header: "Sample size" },
          ]}
          rows={pendingLabFigures.map((f) => ({
            id: f.metric,
            metric: f.metric,
            value: cell(f.value),
            sampleSize: cell(f.sampleSize),
          }))}
        />
      </Section>

      <Section tone="mist">
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
