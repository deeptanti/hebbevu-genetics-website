import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section, type SectionTone } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Accordion, ArticleCard, Card, Chip, ChipList, CTABand, DataTable, IconTile, SectionHeader, Stat, StatGrid } from "@/components/ui";
import { DnaHelix } from "@/components/visuals/DnaHelix";
import { YieldChart } from "@/components/visuals/YieldChart";
import { getBreedProfile } from "@/content/breed-profiles";
import { breedSelection, breeds, getBreed, parseYield, yieldDisclaimer } from "@/content/breeds";
import { getArticle, readingMinutes, topics } from "@/content/knowledge";
import { getPhoto, photos } from "@/content/media";
import { breedDetailCopy as copy } from "@/content/pages/breeds";
import { pageMeta } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBreed(slug);
  const p = getBreedProfile(slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.name}: ${b.epithet}`,
    description: p?.intro ?? `${b.name}: origin ${b.origin}, typical milk yield ${b.milkYield}. ${b.strength}.`,
    path: `/breeds/${b.slug}`,
  });
}

export default async function BreedPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreed(slug);
  const profile = getBreedProfile(slug);
  if (!breed || !profile) notFound();

  const i = breeds.findIndex((b) => b.slug === slug);
  const prev = breeds[(i - 1 + breeds.length) % breeds.length];
  const next = breeds[(i + 1) % breeds.length];
  const related = (breed.articles ?? []).map(getArticle).filter((a) => a !== undefined);
  const topicLabel = (id: string) => topics.find((t) => t.id === id)?.question;
  const photo = getPhoto(`breeds/${breed.slug}`);

  // Alternate white/mist after the white hero, whatever optional sections render.
  let n = 0;
  const tone = (): SectionTone => (n++ % 2 === 0 ? "white" : "mist");

  const milkTypeText =
    profile.milkTypeText ?? (profile.isBuffalo ? copy.milkType.buffalo : breed.milkType === "A2" ? copy.milkType.a2 : copy.milkType.unknown);

  const tableRows = [
    { id: "species", attribute: "Species", value: profile.species },
    { id: "tract", attribute: "Native tract", value: profile.homeland.tract },
    profile.homeland.localNames && { id: "names", attribute: "Also known as", value: profile.homeland.localNames.join(", ") },
    { id: "daily", attribute: "Typical daily yield, good management", value: breed.milkYield },
    {
      id: "lactation",
      attribute: profile.dairy.lactationLabel ?? "National average per lactation",
      value: profile.dairy.lactationRange ? `${profile.dairy.lactation} (range ${profile.dairy.lactationRange})` : profile.dairy.lactation,
    },
    { id: "fat", attribute: "Milk fat", value: profile.dairy.fat },
    { id: "milk", attribute: "Milk type", value: milkTypeText },
    profile.dairy.firstCalving && { id: "first", attribute: "Age at first calving", value: profile.dairy.firstCalving },
    profile.dairy.calvingInterval && { id: "interval", attribute: "Calving interval", value: profile.dairy.calvingInterval },
    profile.size.cow && { id: "cow", attribute: profile.isBuffalo ? "Female weight" : "Cow weight", value: profile.size.cow },
    profile.size.bull && { id: "bull", attribute: profile.isBuffalo ? "Male weight" : "Bull weight", value: profile.size.bull },
    profile.population && { id: "pop", attribute: "Population", value: profile.population },
  ].filter(Boolean) as { id: string; attribute: string; value: string }[];

  const yieldRows = breeds.map((b) => {
    const [min, max] = parseYield(b.milkYield);
    const img = getPhoto(`breeds/${b.slug}`);
    return { slug: b.slug, name: b.name, epithet: b.epithet, min, max, a2: b.milkType === "A2", image: img && { src: img.src, alt: img.alt } };
  });

  const glanceTone = tone();
  const profileTone = tone();
  const detailTone = breed.detail || breed.tradeoff ? tone() : "white";
  const strengthsTone = tone();
  const worldTone = profile.world ? tone() : "white";
  const recordsTone = tone();
  const notesTone = tone();
  const questionsTone = tone();
  const relatedTone = related.length > 0 ? tone() : "white";
  const moreTone = tone();

  const sizeRows: [string, string | undefined][] = [
    [profile.isBuffalo ? "Female" : "Cow", profile.size.cow],
    [profile.isBuffalo ? "Male" : "Bull", profile.size.bull],
    [profile.isBuffalo ? "Female height" : "Cow height", profile.size.cowHeight],
    [profile.isBuffalo ? "Male height" : "Bull height", profile.size.bullHeight],
  ];

  return (
    <>
      <PageHero
        photo={photo ?? photos["farm/aerial"]}
        kicker={breed.epithet}
        title={breed.name}
        lede={profile.intro}
        note={profile.isBuffalo ? `${profile.species}. ${copy.buffaloNote}` : profile.species}
        tags={breed.traits}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Breeds", href: "/breeds" }, { label: breed.name }]}
        actions={copy.heroActions}
      />

      {/* At a glance */}
      <Section tone={glanceTone} labelledBy="glance">
        <SectionHeader id="glance" title={copy.factsHeading} intro={copy.glanceIntro} />
        <StatGrid>
          <Stat value={breed.milkYield.replace(" litres/day", "")} label="Litres a day, good management" note="Hebbevu’s typical range" />
          <Stat
            value={profile.dairy.lactation}
            label={profile.dairy.lactationLabel ?? "Per lactation, national average"}
            note={profile.dairy.lactationSource ?? "ICAR-NBAGR breed average"}
          />
          <Stat value={profile.dairy.fat} label="Milk fat" />
          {profile.size.cow && <Stat value={profile.size.cow} label={profile.isBuffalo ? "Female body weight" : "Cow body weight"} />}
        </StatGrid>
        {profile.dairy.note && <p className="type-body mt-6 max-w-prose text-ink">{profile.dairy.note}</p>}
        <div className="mt-7 rounded-lg border border-stone bg-white p-4 md:p-6">
          <h3 className="type-subheading mb-4 text-ink">{copy.chartHeading}</h3>
          <YieldChart rows={yieldRows} caption={yieldDisclaimer} highlight={breed.slug} />
        </div>
      </Section>

      {/* Profile */}
      <Section tone={profileTone} labelledBy="profile">
        <SectionHeader id="profile" title={`${copy.profileHeading} ${breed.name}`} />
        <Reveal stagger={0.1} as="ul" className="grid gap-5 md:grid-cols-3">
          <RevealItem as="li">
            <Card>
              <IconTile name="map" className="mb-5" />
              <h3 className="type-h3 mb-3 text-ink">Where it comes from</h3>
              <p className="type-body text-ink">{profile.homeland.tract}</p>
              <p className="type-small mt-3 text-graphite">{profile.homeland.nameOrigin}</p>
              {profile.homeland.localNames && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.homeland.localNames.map((ln) => (
                    <Chip key={ln}>{ln}</Chip>
                  ))}
                </div>
              )}
            </Card>
          </RevealItem>
          <RevealItem as="li">
            <Card>
              <IconTile name="cow" className="mb-5" />
              <h3 className="type-h3 mb-3 text-ink">How to recognise it</h3>
              <dl className="flex flex-col gap-3">
                {profile.looks.map((l) => (
                  <div key={l.label} className="flex flex-col gap-1">
                    <dt className="type-label text-graphite">{l.label}</dt>
                    <dd className="type-small text-ink">{l.text}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </RevealItem>
          <RevealItem as="li">
            <Card>
              <IconTile name="scale" className="mb-5" />
              <h3 className="type-h3 mb-3 text-ink">Size</h3>
              <dl className="grid grid-cols-2 gap-4">
                {sizeRows
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-1">
                      <dt className="type-label text-graphite">{k}</dt>
                      <dd className="type-subheading text-ink">{v}</dd>
                    </div>
                  ))}
              </dl>
              <p className="type-small mt-4 text-graphite">{copy.sizeNote}</p>
            </Card>
          </RevealItem>
        </Reveal>
      </Section>

      {/* Client's own breed copy (Gir flagship / Holstein trade-off) */}
      {(breed.detail || breed.tradeoff) && (
        <Section tone={detailTone} labelledBy="breed-detail">
          <h2 id="breed-detail" className="sr-only">
            About {breed.name}
          </h2>
          <div className="grid gap-7 lg:grid-cols-2">
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
              <div className="flex flex-col gap-4 rounded-lg border border-graphite bg-white p-5 md:p-6 lg:col-span-2">
                <h3 className="type-h3 text-ink">{breed.tradeoff.heading}</h3>
                {breed.tradeoff.paragraphs.map((p) => (
                  <p key={p} className="type-body max-w-prose text-ink">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Strengths */}
      <Section tone={strengthsTone} labelledBy="strengths">
        <SectionHeader id="strengths" title={copy.strengthsHeading} intro={breed.strength} />
        <div className="grid gap-7 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="type-h3 text-ink">{copy.adaptationHeading}</h3>
            <BulletList items={profile.adaptation} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="type-h3 text-ink">{copy.usesHeading}</h3>
            <BulletList items={profile.uses} />
          </div>
        </div>
      </Section>

      {/* International story */}
      {profile.world && (
        <Section tone={worldTone} labelledBy="world">
          <div className="grid items-center gap-7 lg:grid-cols-2">
            <div>
              <SectionHeader id="world" kicker={copy.worldKicker} title={profile.world.heading} intro={profile.world.paragraphs} flush />
              {profile.world.countries && <ChipList items={profile.world.countries} className="mt-5" />}
            </div>
            <DnaHelix turns={2} rungs={24} className="w-full" />
          </div>
        </Section>
      )}

      {/* Breed records */}
      <Section tone={recordsTone} labelledBy="records">
        <SectionHeader id="records" title={copy.recordsHeading} intro={copy.recordsIntro} />
        <DataTable
          caption={`${breed.name} breed records`}
          hideCaption
          columns={[
            { key: "attribute", header: "Record", rowHeader: true },
            { key: "value", header: breed.name },
          ]}
          rows={tableRows}
        />
      </Section>

      {/* Farmer notes */}
      <Section tone={notesTone} labelledBy="notes">
        <SectionHeader id="notes" title={copy.notesHeading} />
        <Reveal stagger={0.1} as="ul" className="grid gap-5 md:grid-cols-3">
          {profile.farmerNotes.map((note) => (
            <RevealItem as="li" key={note.title}>
              <Card>
                <IconTile name="check" className="mb-5" />
                <h3 className="type-subheading mb-2 text-ink">{note.title}</h3>
                <p className="type-small text-ink">{note.body}</p>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* Four questions */}
      <Section tone={questionsTone} labelledBy="questions">
        <SectionHeader id="questions" title={copy.questionsHeading} intro={breedSelection.paragraphs[0]} />
        <ol className="grid gap-5 md:grid-cols-2">
          {breedSelection.questions.map((q, k) => (
            <li key={q} className="flex gap-4 border-t border-stone pt-4">
              <span className="type-label text-brown">{String(k + 1).padStart(2, "0")}</span>
              <span className="type-subheading text-ink">{q}</span>
            </li>
          ))}
        </ol>
      </Section>

      {related.length > 0 && (
        <Section tone={relatedTone} labelledBy="related">
          <SectionHeader id="related" title={copy.relatedHeading} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard
                  image={getPhoto(`articles/${a.slug}`)}
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

      {/* Sources + other breeds */}
      <Section tone={moreTone} labelledBy="sources">
        <h2 id="sources" className="sr-only">
          Sources and other breeds
        </h2>
        <Accordion
          headingLevel={3}
          defaultOpen={-1}
          items={[
            {
              id: "breed-sources",
              title: `${copy.sourcesHeading} (${profile.sources.length})`,
              content: (
                <ul className="flex flex-col gap-2">
                  {profile.sources.map((s) => (
                    <li key={s.url} className="type-small">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="transition-ui text-brown underline underline-offset-4 hover:text-brown-dark">
                        {s.label}
                      </a>
                    </li>
                  ))}
                  <li className="type-small text-graphite">{copy.sourcesNote}</li>
                </ul>
              ),
            },
          ]}
        />
        <nav aria-label="Other breeds" className="mt-6 flex flex-col justify-between gap-4 sm:flex-row">
          <Link href={`/breeds/${prev.slug}`} className="transition-ui type-subheading inline-flex min-h-7 items-center text-brown hover:text-brown-dark">
            ← {prev.name}
          </Link>
          <Link href="/breeds/compare" className="transition-ui type-small inline-flex min-h-7 items-center text-brown underline underline-offset-4 hover:text-brown-dark">
            Compare all breeds
          </Link>
          <Link href={`/breeds/${next.slug}`} className="transition-ui type-subheading inline-flex min-h-7 items-center text-brown hover:text-brown-dark">
            {next.name} →
          </Link>
        </nav>
      </Section>

      <CTABand heading={`Interested in ${breed.name} genetics?`} {...copy.cta} />
    </>
  );
}
