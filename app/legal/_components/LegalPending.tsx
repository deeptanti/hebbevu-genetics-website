import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/ui";
import { Pending } from "@/components/typography";
import { legalPages } from "@/content/pages/legal";

export function LegalPending({ title, body }: { title: string; body: string }) {
  return (
    <>
      <PageHero title={title} breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}>
        <p>
          <Pending />
        </p>
      </PageHero>
      <Section tone="mist" labelledBy="legal-status">
        <h2 id="legal-status" className="type-h2 mb-4 text-deep">
          Status
        </h2>
        <p className="type-body max-w-prose text-ink">{body}</p>
      </Section>
      <CTABand heading={legalPages.cta.heading} primary={legalPages.cta.primary} />
    </>
  );
}
