import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { DataTable, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { pregnancyChecks } from "@/content/lab";
import { photos } from "@/content/media";
import { embryoTransferPage as page } from "@/content/pages/services";
import { embryoTransfer as svc } from "@/content/services";
import { stats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";
import { NumberedTiles, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function EmbryoTransferPage() {
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: "Embryo transfer" }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={svc.summary}
        actions={[
          { label: "Book a Consultation", href: "/book?service=embryo-transfer" },
          { label: "Our conception rate", href: "/the-lab/results" },
        ]}
        stats={[stats.conception]}
      />

      <Section labelledBy="includes">
        <SectionHeader id="includes" {...page.includesHeader} intro={svc.description} />
        <NumberedTiles items={svc.includes ?? []} prefix="Step" />
      </Section>

      <Section tone="mist" labelledBy="surrogates">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="surrogates" {...page.surrogatesHeader} />
            <FeatureGrid items={page.surrogateOptions} columns={2} />
          </div>
          <Photo photo={photos[page.photo]} aspect="portrait" />
        </div>
      </Section>

      <Section labelledBy="checks">
        <SectionHeader id="checks" {...page.checksHeader} />
        <div className="max-w-prose">
          <DataTable
            caption="Pregnancy check schedule by breeding method"
            hideCaption
            columns={[
              { key: "method", header: "Method", rowHeader: true },
              { key: "checks", header: "Pregnancy checks" },
            ]}
            rows={pregnancyChecks.map((r) => ({ id: r.method, method: r.method, checks: r.checks }))}
          />
        </div>
      </Section>

      <ServicesCTA service="embryo-transfer" photo={page.ctaPhoto} />
    </>
  );
}
