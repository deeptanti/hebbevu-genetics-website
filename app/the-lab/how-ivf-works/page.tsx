import { StepList } from "@/components/blocks/StepList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, DataTable, SectionHeader } from "@/components/ui";
import { DnaHelix } from "@/components/visuals/DnaHelix";
import { IvfTimeline } from "@/components/visuals/IvfTimeline";
import { ivfCycle, pipeline, pregnancyChecks } from "@/content/lab";
import { labPages } from "@/content/pages/lab";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.howIvfWorks;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/how-ivf-works" });

export default function HowIvfWorksPage() {
  return (
    <>
      <PageHero
        banner={photos["lab/egg-cell"]}
        title="How IVF works"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "How IVF works" }]}
        aside={<DnaHelix orientation="vertical" length={420} turns={1.5} rungs={18} className="aspect-square w-full" />}
      />

      <Section tone="mist">
        <SectionHeader title={copy.pipelineHeading} intro={copy.pipelineIntro} />
        <StepList steps={pipeline} />
      </Section>

      <Section>
        <SectionHeader title={copy.cycleHeading} intro={copy.cycleIntro} />
        <IvfTimeline days={ivfCycle} />
      </Section>

      <Section tone="mist">
        <SectionHeader title={copy.checksHeading} intro={copy.checksIntro} />
        <div className="max-w-prose">
          <DataTable
            caption="When pregnancies are checked, by method"
            hideCaption
            columns={[
              { key: "method", header: "Method", rowHeader: true },
              { key: "checks", header: "Checked at" },
            ]}
            rows={pregnancyChecks.map((r) => ({ id: r.method, ...r }))}
          />
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Read the glossary", href: "/knowledge/glossary" }}
      />
    </>
  );
}
