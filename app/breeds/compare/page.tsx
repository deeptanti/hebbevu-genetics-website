import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, DataTable } from "@/components/ui";
import { getBreedProfile } from "@/content/breed-profiles";
import { breeds, yieldDisclaimer } from "@/content/breeds";
import { breedsPage, comparePage } from "@/content/pages/breeds";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMeta({ title: comparePage.title, description: comparePage.description, path: "/breeds/compare" });

export default function ComparePage() {
  return (
    <>
      <PageHero
        title={comparePage.title}
        lede={comparePage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Breeds", href: "/breeds" }, { label: "Compare" }]}
      />
      <Section tone="mist">
        <DataTable
          caption={comparePage.caption}
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
        <p className="type-small mt-5 max-w-prose text-graphite">{yieldDisclaimer}</p>
      </Section>
      <CTABand {...breedsPage.cta} />
    </>
  );
}
