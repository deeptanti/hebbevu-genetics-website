import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { research } from "@/content/lab";
import { labPages } from "@/content/pages/lab";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.research;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab/research" });

export default function ResearchPage() {
  return (
    <>
      <PageHero
        title="Research"
        lede={copy.lede}
        breadcrumbs={[{ label: "The Lab", href: "/the-lab" }, { label: "Research" }]}
      />

      <Section tone="mist">
        <SectionHeader title={copy.areasHeading} />
        <FeatureGrid items={research} columns={3} />
      </Section>

      <Section>
        <SectionHeader title={copy.whyHeading} intro={copy.why} flush />
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Results & methodology", href: "/the-lab/results" }}
      />
    </>
  );
}
