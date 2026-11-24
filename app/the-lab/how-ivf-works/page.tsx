import { StepList } from "@/components/blocks/StepList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, DataTable, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { DnaHelix } from "@/components/visuals/DnaHelix";
import { IvfTimeline } from "@/components/visuals/IvfTimeline";
import { ivfCycle, pipeline, pregnancyChecks } from "@/content/lab";
import { photos } from "@/content/media";
import { labPages } from "@/content/pages/lab";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.howIvfWorks;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/how-ivf-works" });

export default function HowIvfWorksPage() {
  return (
    <>
      <PageHero
        photo={photos["lab/egg-cell"]}
        title="How IVF works"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "How IVF works" }]}
        actions={[
          { label: "Book a Consultation", href: "/book" },
          { label: "Our results", href: "/the-lab/results" },
        ]}
      />

      <Section labelledBy="pipeline">
        <SectionHeader id="pipeline" title={copy.pipelineHeading} intro={copy.pipelineIntro} />
        <StepList steps={pipeline} />
      </Section>

      <Section tone="mist" labelledBy="cycle">
        <div className="mb-6 grid items-center gap-7 lg:grid-cols-2">
          <SectionHeader id="cycle" title={copy.cycleHeading} intro={copy.cycleIntro} flush />
          <DnaHelix turns={2} rungs={24} className="w-full" />
        </div>
        <IvfTimeline days={ivfCycle} />
      </Section>

      <Section labelledBy="checks">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader id="checks" title={copy.checksHeading} intro={copy.checksIntro} flush />
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
          <Photo photo={photos["farm/calves-resting"]} aspect="photo" />
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Read the glossary", href: "/knowledge/glossary" }}
        photo={photos["farm/cow-and-calf"]}
      />
    </>
  );
}
