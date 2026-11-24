import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, DataTable } from "@/components/ui";
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
            { key: "origin", header: "Origin" },
            { key: "yield", header: "Milk yield" },
            { key: "milk", header: "Milk" },
            { key: "traits", header: "Key traits" },
            { key: "strength", header: "Strength" },
          ]}
          rows={breeds.map((b) => ({
            id: b.slug,
            breed: (
              <Link href={`/breeds/${b.slug}`} className="transition-ui text-brown underline underline-offset-4 hover:text-brown-dark">
                {b.name}
              </Link>
            ),
            origin: b.origin,
            yield: b.milkYield,
            milk: b.milkType ?? comparePage.notStated,
            traits: b.traits.join(", "),
            strength: b.strength,
          }))}
        />
        <p className="type-small mt-5 max-w-prose text-graphite">{yieldDisclaimer}</p>
      </Section>
      <CTABand {...breedsPage.cta} />
    </>
  );
}
