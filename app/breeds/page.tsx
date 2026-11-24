import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { BreedCard, Button, ButtonGroup, CTABand, SectionHeader } from "@/components/ui";
import { breedSelection, breeds, breedsIntro, parseYield, yieldDisclaimer } from "@/content/breeds";
import { YieldChart } from "@/components/visuals/YieldChart";
import { breedsPage } from "@/content/pages/breeds";
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
        kicker={breedsIntro.kicker}
        title={breedsIntro.heading}
        lede={breedsIntro.paragraphs}
        actions={
          <ButtonGroup>
            <Button href="/services" variant="secondary">
              Explore our services
            </Button>
            <Button href="/the-lab" variant="ghost" arrow>
              Learn about our IVF lab
            </Button>
          </ButtonGroup>
        }
      />

      <Section tone="mist" labelledBy="breed-grid">
        <SectionHeader
          id="breed-grid"
          title={breedsPage.gridHeading}
          intro={breedsPage.gridIntro}
          actions={
            <Button href="/breeds/compare" variant="ghost" arrow>
              {breedsPage.compareLink}
            </Button>
          }
        />
        <div className="mb-8 rounded-lg border border-stone bg-white p-4 md:p-6">
          <YieldChart
            rows={breeds.map((b) => {
              const [min, max] = parseYield(b.milkYield);
              return { slug: b.slug, name: b.name, epithet: b.epithet, min, max, a2: b.milkType === "A2" };
            })}
            caption={yieldDisclaimer}
          />
        </div>
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
                specimen={{ origin: b.origin, min: parseYield(b.milkYield)[0], max: parseYield(b.milkYield)[1] }}
              />
            </li>
          ))}
        </ul>
        <p className="type-small mt-6 max-w-prose text-graphite">{yieldDisclaimer}</p>
      </Section>

      <Section labelledBy="breed-selection">
        <div className="grid gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="breed-selection" title={breedSelection.heading} intro={breedSelection.paragraphs} />
            <BulletList items={breedSelection.criteria} />
            <p className="type-body mt-5 max-w-prose text-ink">{breedSelection.closing}</p>
          </div>
          <div>
            <h3 className="type-h3 mb-3 text-ink">{breedsPage.questionsHeading}</h3>
            <p className="type-body mb-5 text-ink">{breedsPage.questionsIntro}</p>
            <ol className="flex flex-col gap-4">
              {breedSelection.questions.map((q, i) => (
                <li key={q} className="flex gap-4 border-t border-stone pt-4">
                  <span className="type-label text-brown">{String(i + 1).padStart(2, "0")}</span>
                  <span className="type-subheading text-ink">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <CTABand {...breedsPage.cta} />
    </>
  );
}
