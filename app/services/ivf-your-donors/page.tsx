import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, SectionHeader } from "@/components/ui";
import { ivfYourDonorsPage as page } from "@/content/pages/services";
import { ivfYourDonors as svc } from "@/content/services";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, NumberedTiles, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function IvfYourDonorsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[homeCrumb, servicesCrumb, { label: svc.title }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={[svc.summary, ...svc.description]}
        actions={
          <ButtonGroup>
            <Button href="/book?service=ivf-own-donors">Book a Consultation</Button>
            <Button href="/the-lab/how-ivf-works" variant="ghost" arrow>
              How IVF works in our lab
            </Button>
          </ButtonGroup>
        }
        aside={<Photo photo={photos[page.photo]} aspect="portrait" priority />}
      />

      <Section tone="mist" labelledBy="includes">
        <SectionHeader id="includes" {...page.includesHeader} />
        <NumberedTiles items={svc.includes ?? []} prefix="Step" />
      </Section>

      <Section labelledBy="fit">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="fit" {...page.fitHeader} />
            <BulletList items={page.fitPoints} />
            <div className="mt-6">
              <Button href="/services/is-ivf-right-for-you" variant="secondary" arrow>
                Is IVF right for you?
              </Button>
            </div>
          </div>
          <div>
            <h3 className="type-h3 mb-5 text-ink">Service guidelines</h3>
            <GuidelinesList />
          </div>
        </div>
      </Section>

      <ServicesCTA service="ivf-own-donors" />
    </>
  );
}
