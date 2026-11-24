import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArticleCard, CTABand, ChipList, SectionHeader, Stat } from "@/components/ui";
import { BreedSpecimen } from "@/components/visuals/BreedSpecimen";
import { breedSelection, breeds, getBreed, yieldDisclaimer, parseYield } from "@/content/breeds";
import { getArticle, readingMinutes, topics } from "@/content/knowledge";
import { breedDetailCopy } from "@/content/pages/breeds";
import { pageMeta } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBreed(slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.name} — ${b.epithet}`,
    description: `${b.name} cattle: origin ${b.origin}, typical milk yield ${b.milkYield}${b.milkType ? ` (${b.milkType} milk)` : ""}. ${b.strength}.`,
    path: `/breeds/${b.slug}`,
  });
}

export default async function BreedPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) notFound();

  const i = breeds.findIndex((b) => b.slug === slug);
  const prev = breeds[(i - 1 + breeds.length) % breeds.length];
  const next = breeds[(i + 1) % breeds.length];
  const related = (breed.articles ?? []).map(getArticle).filter((a) => a !== undefined);
  const topicLabel = (id: string) => topics.find((t) => t.id === id)?.question;

  // Alternate white/mist after the (white) hero, whichever optional sections render.
  const hasDetail = Boolean(breed.detail || breed.tradeoff);
  const tones = ["mist", "white"] as const;
  let t = 0;
  const nextTone = () => tones[t++ % 2];
  const factsTone = nextTone();
  const detailTone = hasDetail ? nextTone() : "white";
  const questionsTone = nextTone();
  const relatedTone = related.length > 0 ? nextTone() : "white";
  const otherTone = nextTone();

  return (
    <>
      <PageHero
        kicker={breed.epithet}
        title={breed.name}
        lede={breed.strength}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Breeds", href: "/breeds" }, { label: breed.name }]}
        aside={
          <BreedSpecimen
            name={breed.name}
            origin={breed.origin}
            min={parseYield(breed.milkYield)[0]}
            max={parseYield(breed.milkYield)[1]}
            className="rounded-lg border border-stone"
          />
        }
      >
        <ChipList items={breed.traits} />
      </PageHero>

      <Section tone={factsTone} labelledBy="facts">
        <SectionHeader id="facts" title={breedDetailCopy.factsHeading} />
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Stat value={breed.milkYield} label="Typical milk yield" />
          <Stat value={breed.origin} label="Origin" />
          {breed.milkType && <Stat value={breed.milkType} label="Milk type" />}
        </dl>
        <p className="type-small mt-6 max-w-prose text-graphite">{yieldDisclaimer}</p>
      </Section>

      {hasDetail && (
        <Section tone={detailTone} labelledBy="breed-detail">
          <h2 id="breed-detail" className="sr-only">
            About {breed.name}
          </h2>
          <div className="flex max-w-prose flex-col gap-7">
            {breed.detail?.map((d) => (
              <div key={d.heading} className="flex flex-col gap-4">
                <h3 className="type-h3 text-ink">{d.heading}</h3>
                {d.paragraphs.map((p) => (
                  <p key={p} className="type-body text-ink">
                    {p}
                  </p>
                ))}
                {d.points && <BulletList items={d.points} />}
              </div>
            ))}
            {breed.tradeoff && (
              <div className="flex flex-col gap-4 rounded-lg border border-graphite p-4 md:p-5">
                <h3 className="type-h3 text-ink">{breed.tradeoff.heading}</h3>
                {breed.tradeoff.paragraphs.map((p) => (
                  <p key={p} className="type-body text-ink">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone={questionsTone} labelledBy="questions">
        <SectionHeader id="questions" title={breedDetailCopy.questionsHeading} intro={breedSelection.paragraphs[0]} />
        <ol className="grid gap-5 md:grid-cols-2">
          {breedSelection.questions.map((q, n) => (
            <li key={q} className="flex gap-4 border-t border-stone pt-4">
              <span className="type-label text-brown">{String(n + 1).padStart(2, "0")}</span>
              <span className="type-subheading text-ink">{q}</span>
            </li>
          ))}
        </ol>
      </Section>

      {related.length > 0 && (
        <Section tone={relatedTone} labelledBy="related">
          <SectionHeader id="related" title={breedDetailCopy.relatedHeading} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard
                  href={`/knowledge/${a.slug}`}
                  title={a.title}
                  description={a.description}
                  topic={topicLabel(a.topic)}
                  minutes={readingMinutes(a)}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone={otherTone} labelledBy="other-breeds">
        <h2 id="other-breeds" className="type-label mb-4 text-graphite">
          {breedDetailCopy.otherBreedsHeading}
        </h2>
        <nav aria-label="Other breeds" className="flex flex-col justify-between gap-4 border-t border-stone pt-4 sm:flex-row">
          <Link href={`/breeds/${prev.slug}`} className="transition-ui type-subheading inline-flex min-h-7 items-center text-brown hover:text-brown-dark">
            ← {prev.name}
          </Link>
          <Link href="/breeds/compare" className="transition-ui type-small inline-flex min-h-7 items-center text-brown underline underline-offset-4 hover:text-brown-dark">
            Compare all seven
          </Link>
          <Link href={`/breeds/${next.slug}`} className="transition-ui type-subheading inline-flex min-h-7 items-center text-brown hover:text-brown-dark">
            {next.name} →
          </Link>
        </nav>
      </Section>

      <CTABand heading={`Interested in ${breed.name} genetics?`} {...breedDetailCopy.cta} />
    </>
  );
}
