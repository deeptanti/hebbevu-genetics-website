import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, DataTable, SectionHeader } from "@/components/ui";
import { YieldChart } from "@/components/visuals/YieldChart";
import { getBreedProfile } from "@/content/breed-profiles";
import { breeds, parseYield, yieldDisclaimer } from "@/content/breeds";
import { getPhoto, photos } from "@/content/media";
import { breedsPage, comparePage } from "@/content/pages/breeds";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: comparePage.title, description: comparePage.description, path: "/breeds/compare" });

export default function ComparePage() {
  return (
    <>
      <PageHero
        photo={photos["farm/barn-row"]}
        focus="bottom"
        title={comparePage.title}
        lede={comparePage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Breeds", href: "/breeds" }, { label: "Compare" }]}
        actions={comparePage.heroActions}
      />

      <Section labelledBy="compare-table">
        <SectionHeader id="compare-table" title={comparePage.tableHeading} intro={comparePage.tableIntro} />
        <DataTable
          caption={comparePage.caption}
          hideCaption
          columns={[
            { key: "breed", header: "Breed", rowHeader: true },
            { key: "species", header: "Species" },
            { key: "origin", header: "Origin" },
            { key: "yield", header: "Daily yield" },
            { key: "lactation", header: "Per lactation" },
            { key: "fat", header: "Fat" },
            { key: "milk", header: "Milk" },
            { key: "weight", header: "Cow weight" },
            { key: "strength", header: "Strength" },
          ]}
          rows={breeds.map((b) => ({
            id: b.slug,
            breed: (
              <Link href={`/breeds/${b.slug}`} className="transition-ui text-brown underline underline-offset-4 hover:text-brown-dark">
                {b.name}
              </Link>
            ),
            species: getBreedProfile(b.slug)?.isBuffalo ? "Buffalo" : "Cattle",
            origin: b.origin,
            yield: b.milkYield,
            lactation: getBreedProfile(b.slug)?.dairy.lactation ?? comparePage.notStated,
            fat: getBreedProfile(b.slug)?.dairy.fat ?? comparePage.notStated,
            milk: b.milkType ?? comparePage.notStated,
            weight: getBreedProfile(b.slug)?.size.cow ?? comparePage.notStated,
            strength: b.strength,
          }))}
        />
      </Section>

      <Section tone="mist" labelledBy="compare-chart">
        <SectionHeader id="compare-chart" title={comparePage.chartHeading} />
        <div className="rounded-lg border border-stone bg-white p-4 md:p-6">
          <YieldChart
            rows={breeds.map((b) => {
              const [min, max] = parseYield(b.milkYield);
              const img = getPhoto(`breeds/${b.slug}`);
              return { slug: b.slug, name: b.name, epithet: b.epithet, min, max, a2: b.milkType === "A2", image: img && { src: img.src, alt: img.alt } };
            })}
            caption={yieldDisclaimer}
          />
        </div>
      </Section>

      <CTABand {...breedsPage.cta} photo={photos["banners/herd-road"]} />
    </>
  );
}
