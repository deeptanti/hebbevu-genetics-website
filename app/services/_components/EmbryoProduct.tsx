import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { BrandIcon, SectionHeader, ServiceCard } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos, type PhotoKey } from "@/content/media";
import { buyEmbryos } from "@/content/services";
import type { Service } from "@/content/types";
import { GuidelinesList, NumberedTiles, ServicesCTA, homeCrumb, servicesCrumb } from "./shared";

/** Shared page body for the two embryo products (sex-sorted, normal). */
export function EmbryoProductPage({
  svc,
  other,
  service,
  page,
}: {
  svc: Service;
  other: Service;
  service: string;
  page: {
    heroPhoto: PhotoKey;
    photo: PhotoKey;
    ctaPhoto: PhotoKey;
    benefitsHeader: { kicker?: string; title: string };
    optionsHeader: { kicker?: string; title: string; intro?: string };
  };
}) {
  const sexed = svc.slug === "sex-sorted";
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: buyEmbryos.title, href: buyEmbryos.href }, { label: svc.title }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={svc.summary}
        tags={(svc.options ?? []).map((o) => o.label)}
        actions={[
          { label: "Book a Consultation", href: `/book?service=${service}` },
          { label: "How pricing works", href: "/services/pricing" },
        ]}
      />

      <Section labelledBy="benefits">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          <div>
            <BrandIcon name={sexed ? "embryo-sexed" : "embryo-normal"} size="md" className="mb-5" />
            <SectionHeader id="benefits" {...page.benefitsHeader} />
            <BulletList items={svc.benefits ?? []} />
          </div>
          <Photo photo={photos[page.photo]} aspect="photo" />
        </div>
      </Section>

      <Section tone="mist" labelledBy="options">
        <SectionHeader id="options" {...page.optionsHeader} />
        <NumberedTiles items={(svc.options ?? []).map((o) => o.label)} prefix="Option" />
      </Section>

      <Section labelledBy="other">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="other" kicker="The other embryo type" title={`Also consider: ${other.title}`} />
            <ServiceCard
              href={other.href}
              kicker={other.kicker}
              title={other.title}
              summary={other.summary}
              brandIcon={sexed ? "embryo-normal" : "embryo-sexed"}
              points={other.benefits}
            />
          </div>
          <div>
            <SectionHeader level={3} title="Service guidelines" />
            <GuidelinesList />
          </div>
        </div>
      </Section>

      <ServicesCTA service={service} photo={page.ctaPhoto} />
    </>
  );
}
