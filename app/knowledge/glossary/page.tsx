import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/ui";
import { Pending } from "@/components/typography";
import { glossary } from "@/content/knowledge";
import { glossaryPage } from "@/content/pages/knowledge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: glossaryPage.title, description: glossaryPage.metaDescription, path: "/knowledge/glossary" });

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        title={glossaryPage.title}
        lede={glossaryPage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "Glossary" }]}
      >
        <p>
          <Pending>{glossaryPage.draftNote}</Pending>
        </p>
      </PageHero>
      <Section tone="mist" labelledBy="terms">
        <h2 id="terms" className="sr-only">
          Terms
        </h2>
        <dl className="max-w-prose border-t border-stone">
          {glossary.map((g) => (
            <div key={g.term} id={g.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="grid gap-2 border-b border-stone py-5 md:grid-cols-3 md:gap-5">
              <dt className="flex flex-col gap-1">
                <span className="type-subheading text-ink">{g.term}</span>
                {g.expansion && <span className="type-label text-graphite">{g.expansion}</span>}
              </dt>
              <dd className="type-body text-ink md:col-span-2">{g.definition}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <CTABand {...glossaryPage.cta} />
    </>
  );
}
