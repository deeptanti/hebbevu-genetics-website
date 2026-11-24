import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Pending } from "@/components/typography";
import { CTABand, SectionHeader } from "@/components/ui";
import { photos } from "@/content/media";
import { legalPages } from "@/content/pages/legal";
import { TBS } from "@/content/types";

export function LegalPending({ title, body }: { title: string; body: string }) {
  return (
    <>
      <PageHero photo={photos["farm/aerial"]} title={title} note={TBS} breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      <Section labelledBy="legal-status">
        <div className="grid gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="legal-status" title={legalPages.statusHeading} intro={body} />
            <Pending />
          </div>
          <div>
            <SectionHeader title={legalPages.contactHeading} level={3} />
            <ContactPanel />
          </div>
        </div>
      </Section>
      <CTABand heading={legalPages.cta.heading} primary={legalPages.cta.primary} photo={photos["farm/herd-walking"]} />
    </>
  );
}
