import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeader, ServiceCard } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { buyEmbryosPage as page } from "@/content/pages/services";
import { buyEmbryos as svc, embryoProducts } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, OptionMatrix, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function BuyEmbryosPage() {
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: svc.title }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={svc.summary}
        actions={[
          { label: "Book a Consultation", href: "/book?service=sex-sorted-embryos" },
          { label: "Explore our breeds", href: "/breeds" },
        ]}
      />

      <Section labelledBy="products">
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
              brandIcon={p.slug === "sex-sorted" ? "embryo-sexed" : "embryo-normal"}
              points={p.benefits}
              more={`About ${p.title.toLowerCase()}`}
            />
          ))}
        </div>
      </Section>

      <Section tone="mist" labelledBy="herd">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          <Photo photo={photos[page.photo]} aspect="photo" />
          <SectionHeader id="herd" kicker="Where the embryos come from" title="Our own indigenous herd" intro={svc.description} flush />
        </div>
      </Section>

      <Section labelledBy="compare">
        <SectionHeader id="compare" {...page.compareHeader} />
        <OptionMatrix />
        <div className="mt-8">
          <SectionHeader level={3} title="Service guidelines" />
          <GuidelinesList />
        </div>
      </Section>

      <ServicesCTA service="sex-sorted-embryos" photo={page.ctaPhoto} />
    </>
  );
}
