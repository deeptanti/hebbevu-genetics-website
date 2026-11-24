import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArticleCard, CardLink, CardMore, CTABand, SectionHeader } from "@/components/ui";
import { articlesByTopic, readingMinutes, topics } from "@/content/knowledge";
import { knowledgePage } from "@/content/pages/knowledge";
import { getPhoto, photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: knowledgePage.title, description: knowledgePage.metaDescription, path: "/knowledge" });

export default function KnowledgePage() {
  const groups = topics.map((t) => ({ ...t, articles: articlesByTopic(t.id) })).filter((g) => g.articles.length > 0);
  return (
    <>
      <PageHero banner={photos["banners/herd-yard"]} title={knowledgePage.title} lede={knowledgePage.lede} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge" }]}>
        <nav aria-label="Questions">
          <ul className="flex flex-col">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="transition-ui type-body inline-flex min-h-7 items-center font-semibold text-brown underline-offset-4 hover:text-brown-dark hover:underline">
                  {g.question}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? "mist" : "white"} labelledBy={`${g.id}-heading`}>
          <SectionHeader id={`${g.id}-heading`} title={g.question} intro={g.summary} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {g.articles.map((a) => (
              <li key={a.slug}>
                <ArticleCard
                  image={getPhoto(`articles/${a.slug}`)}
                  href={`/knowledge/${a.slug}`} title={a.title} description={a.description} minutes={readingMinutes(a)} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section tone={groups.length % 2 === 0 ? "mist" : "white"} labelledBy="quick-answers">
        <SectionHeader id="quick-answers" title="Quick answers" />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {knowledgePage.shortcuts.map((s) => (
            <li key={s.href}>
              <CardLink href={s.href}>
                <h3 className="type-h3 mb-3 text-ink">{s.label}</h3>
                <p className="type-small text-ink">{s.body}</p>
                <CardMore>Open</CardMore>
              </CardLink>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand {...knowledgePage.cta} />
    </>
  );
}
