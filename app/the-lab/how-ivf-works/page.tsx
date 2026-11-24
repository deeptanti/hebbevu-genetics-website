import { BulletList } from "@/components/blocks/BulletList";
import { StepList } from "@/components/blocks/StepList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading, Pending } from "@/components/typography";
import { Chip, CTABand, DataTable, SectionHeader } from "@/components/ui";
import { gradingRules, ivfCycle, pipeline, syncProtocols } from "@/content/lab";
import { labPages } from "@/content/pages/lab";
import { IvfTimeline } from "@/components/visuals/IvfTimeline";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.howIvfWorks;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/how-ivf-works" });

export default function HowIvfWorksPage() {
  return (
    <>
      <PageHero
        title="How IVF works"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "How IVF works" }]}
      />

      <Section tone="mist">
        <SectionHeader title={copy.pipelineHeading} intro={copy.pipelineIntro} />
        <StepList steps={pipeline} />
      </Section>

      <Section>
        <SectionHeader title={copy.cycleHeading} intro={copy.cycleIntro} />
        <IvfTimeline days={ivfCycle} />
        <h3 className="type-h3 mt-8 mb-5 text-ink">The full record, day by day</h3>
        <DataTable
          caption="The seven-day IVF cycle and what is recorded at each stage"
          columns={[
            { key: "day", header: "Day", rowHeader: true },
            { key: "stage", header: "Stage" },
            { key: "recorded", header: "What is recorded" },
          ]}
          rows={ivfCycle.map((r) => ({ id: r.day, ...r }))}
        />
        <div className="mt-7 max-w-prose">
          <Heading level={3} className="mb-4">
            {copy.gradingHeading}
          </Heading>
          <BulletList items={gradingRules} />
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader title={copy.syncHeading} intro={copy.syncIntro} />
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Heading level={3}>Synchronisation protocols</Heading>
            <ul className="flex flex-wrap gap-2">
              {syncProtocols.confirmed.map((p) => (
                <li key={p}>
                  <Chip>{p}</Chip>
                </li>
              ))}
            </ul>
            {syncProtocols.pending.map((p) => (
              <p key={p} className="type-small flex flex-wrap items-center gap-3 text-graphite">
                <span className="font-semibold text-ink">{p}</span> <Pending>Not yet confirmed</Pending>
                <span>{copy.pendingNote}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Heading level={3}>Pregnancy checks</Heading>
            <DataTable
              caption="When pregnancies are checked, by method"
              hideCaption
              columns={[
                { key: "method", header: "Method", rowHeader: true },
                { key: "checks", header: "Checked at" },
              ]}
              rows={syncProtocols.pregnancyChecks.map((r) => ({ id: r.method, ...r }))}
            />
          </div>
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
