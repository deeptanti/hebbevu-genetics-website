import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { glossary } from "@/content/knowledge";
import { photos } from "@/content/media";
import { glossaryPage } from "@/content/pages/knowledge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: glossaryPage.title, description: glossaryPage.metaDescription, path: "/knowledge/glossary" });

const anchor = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        photo={photos["people/handler-red-calf"]}
        title={glossaryPage.title}
        lede={glossaryPage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "Glossary" }]}
      />
      <Section labelledBy="terms">
        <SectionHeader id="terms" title={glossaryPage.heading} intro={glossaryPage.intro} />
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map((g) => (
            <div key={g.term} id={anchor(g.term)} className="flex h-full flex-col gap-3 rounded-lg border border-stone bg-white p-4 md:p-5">
              <dt className="flex flex-col gap-1">
                <span className="type-h3 text-brown">{g.term}</span>
                {g.expansion && <span className="type-label text-graphite">{g.expansion}</span>}
              </dt>
              <dd className="type-small text-ink">{g.definition}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <CTABand {...glossaryPage.cta} photo={photos["lab/egg-cell"]} />
    </>
  );
}
