import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, SectionHeader, ServiceCard } from "@/components/ui";
import { buyEmbryosPage as page } from "@/content/pages/services";
import { buyEmbryos as svc, embryoProducts } from "@/content/services";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, OptionMatrix, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function BuyEmbryosPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[homeCrumb, servicesCrumb, { label: svc.title }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={[svc.summary, ...svc.description]}
        actions={
          <ButtonGroup>
            <Button href="/book?service=sex-sorted-embryos">Book a Consultation</Button>
            <Button href="/breeds" variant="ghost" arrow>
              Explore our breeds
            </Button>
          </ButtonGroup>
        }
        aside={<Photo photo={photos[page.photo]} aspect="portrait" priority />}
      />

      <Section tone="mist" labelledBy="products">
        <SectionHeader id="products" {...page.productsHeader} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {embryoProducts.map((p) => (
            <ServiceCard
              key={p.slug}
              href={p.href}
              kicker={p.kicker}
              title={p.title}
              summary={p.summary}
              icon={p.icon}
              points={p.benefits}
              more={`About ${p.title.toLowerCase()}`}
            />
          ))}
        </div>
      </Section>

      <Section labelledBy="compare">
        <SectionHeader id="compare" {...page.compareHeader} />
        <OptionMatrix />
        <div className="mt-7">
          <h3 className="type-h3 mb-5 text-ink">Service guidelines</h3>
          <GuidelinesList />
        </div>
      </Section>

      <ServicesCTA service="sex-sorted-embryos" />
    </>
  );
}
