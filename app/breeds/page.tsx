import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { BreedCard, Button, CTABand, SectionHeader } from "@/components/ui";
import { YieldChart } from "@/components/visuals/YieldChart";
import { breedSelection, breeds, breedsIntro, parseYield, yieldDisclaimer } from "@/content/breeds";
import { getPhoto, photos } from "@/content/media";
import { breedsPage } from "@/content/pages/breeds";
import type { IconName } from "@/content/types";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: breedsPage.metaTitle,
  description: breedsPage.metaDescription,
  path: "/breeds",
  absoluteTitle: true,
});

export default function BreedsPage() {
  return (
    <>
      <PageHero
        size="tall"
        photo={photos["banners/herd-road"]}
        kicker={breedsIntro.kicker}
        title={breedsIntro.heading}
        lede={breedsIntro.paragraphs[0]}
        actions={breedsPage.heroActions}
      />

      <Section labelledBy="breed-grid">
        <SectionHeader
          id="breed-grid"
          title={breedsPage.gridHeading}
          intro={[breedsIntro.paragraphs[1], breedsPage.gridIntro]}
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((b) => (
            <li key={b.slug}>
              <BreedCard
                href={`/breeds/${b.slug}`}
                name={b.name}
                epithet={b.epithet}
                facts={[
                  { label: "Origin", value: b.origin },
                  { label: "Milk yield", value: b.milkYield },
                ]}
                tags={b.milkType ? [`${b.milkType} milk`] : undefined}
                photo={getPhoto(`breeds/${b.slug}`)}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="breed-chart">
        <SectionHeader
          id="breed-chart"
          kicker={breedsPage.chartKicker}
          title={breedsPage.chartHeading}
          intro={breedsPage.chartIntro}
          actions={
            <Button href="/breeds/compare" variant="ghost" arrow>
              {breedsPage.compareLink}
            </Button>
          }
        />
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

      <Section labelledBy="breed-selection">
        <SectionHeader id="breed-selection" title={breedSelection.heading} intro={breedSelection.paragraphs} />
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FeatureGrid
              columns={2}
              headingLevel={3}
              items={breedsPage.criteria.map((c) => ({ title: c.title, body: c.body, icon: c.icon as IconName }))}
            />
            <p className="type-body mt-6 max-w-prose text-ink">{breedSelection.closing}</p>
          </div>
          <div className="flex flex-col gap-5 rounded-lg bg-bark p-5 md:p-6" data-ground="dark">
            <h3 className="type-h3 text-mist">{breedsPage.questionsHeading}</h3>
            <p className="type-small text-mist">{breedsPage.questionsIntro}</p>
            <ol className="flex flex-col gap-4">
              {breedSelection.questions.map((q, i) => (
                <li key={q} className="flex gap-4 border-t border-graphite pt-4">
                  <span className="type-label text-sand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="type-subheading text-mist">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <CTABand {...breedsPage.cta} photo={photos["farm/gir-bull-fence"]} />
    </>
  );
}
