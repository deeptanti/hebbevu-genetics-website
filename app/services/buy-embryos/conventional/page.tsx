import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, SectionHeader, ServiceCard } from "@/components/ui";
import { conventionalPage as page } from "@/content/pages/services";
import { buyEmbryos, sexSorted as other, conventional as svc } from "@/content/services";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, NumberedTiles, ServicesCTA, homeCrumb, servicesCrumb } from "../../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumbs={[homeCrumb, servicesCrumb, { label: buyEmbryos.title, href: buyEmbryos.href }, { label: svc.title }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={svc.summary}
        actions={
          <ButtonGroup>
            <Button href="/book?service=normal-embryos">Book a Consultation</Button>
            <Button href="/services/pricing" variant="ghost" arrow>
              How pricing works
            </Button>
          </ButtonGroup>
        }
        aside={<Photo photo={photos[page.photo]} aspect="portrait" priority />}
      />

      <Section tone="mist" labelledBy="benefits">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="benefits" {...page.benefitsHeader} />
            <BulletList items={svc.benefits ?? []} />
          </div>
          <div>
            <h3 className="type-h3 mb-5 text-ink">Service guidelines</h3>
            <GuidelinesList />
          </div>
        </div>
      </Section>

      <Section labelledBy="options">
        <SectionHeader id="options" {...page.optionsHeader} />
        <NumberedTiles items={(svc.options ?? []).map((o) => o.label)} prefix="Option" />
      </Section>

      <Section tone="mist" labelledBy="other">
        <SectionHeader id="other" kicker="The other embryo type" title={`Also consider: ${other.title}`} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ServiceCard href={other.href} kicker={other.kicker} title={other.title} summary={other.summary} icon={other.icon} points={other.benefits} />
        </div>
      </Section>

      <ServicesCTA service="normal-embryos" />
    </>
  );
}
