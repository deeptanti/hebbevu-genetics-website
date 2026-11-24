import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { ivfYourDonorsPage as page } from "@/content/pages/services";
import { ivfYourDonors as svc } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, NumberedTiles, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function IvfYourDonorsPage() {
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        caption={page.heroCaption}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: svc.title }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={svc.summary}
        actions={[
          { label: "Book a Consultation", href: "/book?service=ivf-own-donors" },
          { label: "How IVF works in our lab", href: "/the-lab/how-ivf-works" },
        ]}
      />

      <Section labelledBy="why-ivf">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          <SectionHeader id="why-ivf" kicker="Your genetics, multiplied" title="One great cow, many calves" intro={svc.description} flush />
          <Photo photo={photos[page.photo]} aspect="photo" />
        </div>
      </Section>

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
            <SectionHeader level={3} title="Service guidelines" />
            <GuidelinesList />
          </div>
        </div>
      </Section>

      <ServicesCTA service="ivf-own-donors" photo={page.ctaPhoto} />
    </>
  );
}
