import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Card, IconTile, SectionHeader } from "@/components/ui";
import { photos } from "@/content/media";
import { pricingPage as page } from "@/content/pages/services";
import { pricing } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, OptionMatrix, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: "/services/pricing" });

export default function PricingPage() {
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: pricing.heading }]}
        kicker="Pricing"
        title={pricing.heading}
        lede={pricing.lede}
        actions={[
          { label: "Ask for a quote", href: "/book" },
          { label: "Is IVF right for you?", href: "/services/is-ivf-right-for-you" },
        ]}
      />

      <Section labelledBy="factors">
        <SectionHeader id="factors" {...page.factorsHeader} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.factors.map((f, i) => (
            <li key={f.factor}>
              <Card>
                <IconTile name={page.factorIcons[i % page.factorIcons.length]} className="mb-5" />
                <h3 className="type-subheading mb-2 text-ink">{f.factor}</h3>
                <p className="type-small text-ink">{f.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="matrix">
        <SectionHeader id="matrix" {...page.matrixHeader} />
        <OptionMatrix />
      </Section>

      <Section labelledBy="basics">
        <SectionHeader id="basics" {...page.basicsHeader} />
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GuidelinesList />
          </div>
          <div className="rounded-lg border border-stone bg-mist p-5 md:p-6">
            <SectionHeader level={3} title={page.quoteHeader.title} intro={page.quoteHeader.intro} flush />
          </div>
        </div>
      </Section>

      <ServicesCTA photo={page.ctaPhoto} />
    </>
  );
}
