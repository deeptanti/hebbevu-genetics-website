import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, DataTable, SectionHeader } from "@/components/ui";
import { pregnancyChecks } from "@/content/lab";
import { embryoTransferPage as page } from "@/content/pages/services";
import { embryoTransfer as svc } from "@/content/services";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";
import { NumberedTiles, ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: svc.href });

export default function EmbryoTransferPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[homeCrumb, servicesCrumb, { label: "Embryo transfer" }]}
        kicker={svc.kicker}
        title={svc.title}
        lede={[svc.summary, ...svc.description]}
        actions={
          <ButtonGroup>
            <Button href="/book?service=embryo-transfer">Book a Consultation</Button>
            <Button href="/the-lab/results" variant="ghost" arrow>
              Our conception rate
            </Button>
          </ButtonGroup>
        }
        aside={<Photo photo={photos[page.photo]} aspect="portrait" priority />}
      />

      <Section tone="mist" labelledBy="includes">
        <SectionHeader id="includes" {...page.includesHeader} />
        <NumberedTiles items={svc.includes ?? []} prefix="Step" />
      </Section>

      <Section labelledBy="surrogates">
        <SectionHeader id="surrogates" {...page.surrogatesHeader} />
        <FeatureGrid items={page.surrogateOptions} columns={2} />
      </Section>

      <Section tone="mist" labelledBy="checks">
        <SectionHeader id="checks" {...page.checksHeader} />
        <DataTable
          caption="Pregnancy check schedule by breeding method"
          columns={[
            { key: "method", header: "Method", rowHeader: true },
            { key: "checks", header: "Pregnancy checks" },
          ]}
          rows={pregnancyChecks.map((r) => ({ id: r.method, method: r.method, checks: r.checks }))}
        />
      </Section>

      <ServicesCTA service="embryo-transfer" />
    </>
  );
}
