import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, DataTable, SectionHeader } from "@/components/ui";
import { pricingPage as page } from "@/content/pages/services";
import { pricing } from "@/content/services";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, OptionMatrix, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: "/services/pricing" });

export default function PricingPage() {
  return (
    <>
      <PageHero
        banner={photos["banners/herd-yard"]}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: pricing.heading }]}
        kicker="Pricing"
        title={pricing.heading}
        lede={pricing.lede}
        actions={
          <ButtonGroup>
            <Button href="/book">Ask for a quote</Button>
            <Button href="/services/is-ivf-right-for-you" variant="ghost" arrow>
              Is IVF right for you?
            </Button>
          </ButtonGroup>
        }
      />

      <Section tone="mist" labelledBy="factors">
        <SectionHeader id="factors" {...page.factorsHeader} />
        <DataTable
          caption="What changes the price of an order"
          hideCaption
          columns={[
            { key: "factor", header: "Factor", rowHeader: true },
            { key: "detail", header: "What it means" },
          ]}
          rows={pricing.factors.map((f) => ({ id: f.factor, factor: f.factor, detail: f.detail }))}
        />
      </Section>

      <Section labelledBy="matrix">
        <SectionHeader id="matrix" {...page.matrixHeader} />
        <OptionMatrix />
      </Section>

      <Section tone="mist" labelledBy="basics">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="basics" {...page.basicsHeader} />
            <GuidelinesList />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="type-h3 text-ink">{page.quoteHeader.title}</h3>
            <p className="type-body text-ink">{page.quoteHeader.intro}</p>
          </div>
        </div>
      </Section>

      <ServicesCTA />
    </>
  );
}
