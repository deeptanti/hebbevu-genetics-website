import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArticleCard, CardLink, CardMore, CTABand, IconTile, SectionHeader } from "@/components/ui";
import { articlesByTopic, readingMinutes, topics } from "@/content/knowledge";
import { getPhoto, photos } from "@/content/media";
import { knowledgePage } from "@/content/pages/knowledge";
import type { IconName } from "@/content/types";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: knowledgePage.title, description: knowledgePage.metaDescription, path: "/knowledge" });

export default function KnowledgePage() {
  const groups = topics.map((t) => ({ ...t, articles: articlesByTopic(t.id) })).filter((g) => g.articles.length > 0);
  const icons = knowledgePage.topicIcons as Record<string, IconName>;
  return (
    <>
      <PageHero
        size="tall"
        photo={photos["banners/herd-yard"]}
        title={knowledgePage.title}
        lede={knowledgePage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge" }]}
        actions={knowledgePage.heroActions}
      />

      <Section labelledBy="start">
        <SectionHeader id="start" title={knowledgePage.startHeading} intro={knowledgePage.startIntro} />
        <nav aria-label="Questions">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {groups.map((g) => (
              <li key={g.id}>
                <Link
                  href={`#${g.id}`}
                  className="transition-move group flex h-full items-start gap-5 rounded-lg border border-stone bg-white p-4 hover:-translate-y-1 hover:border-graphite md:p-5"
                >
                  <IconTile name={icons[g.id] ?? "sparkles"} />
                  <span className="flex flex-col gap-2">
                    <span className="type-h3 text-ink">{g.question}</span>
                    <span className="type-small text-graphite">{g.summary}</span>
                    <span className="type-label text-brown">
                      {g.articles.length} {g.articles.length === 1 ? "article" : "articles"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? "mist" : "white"} labelledBy={`${g.id}-heading`}>
          <SectionHeader id={`${g.id}-heading`} title={g.question} intro={g.summary} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {g.articles.map((a) => (
              <li key={a.slug}>
                <ArticleCard
                  image={getPhoto(`articles/${a.slug}`)}
                  href={`/knowledge/${a.slug}`}
                  title={a.title}
                  description={a.description}
                  minutes={readingMinutes(a)}
                />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section tone={groups.length % 2 === 0 ? "mist" : "white"} labelledBy="quick-answers">
        <SectionHeader id="quick-answers" title="Quick answers" />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {knowledgePage.shortcuts.map((s, i) => (
            <li key={s.href}>
              <CardLink href={s.href}>
                <IconTile name={i === 0 ? "clipboard" : "testtube"} className="mb-5" />
                <h3 className="type-h3 mb-3 text-ink">{s.label}</h3>
                <p className="type-small text-ink">{s.body}</p>
                <CardMore>Open</CardMore>
              </CardLink>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand {...knowledgePage.cta} photo={photos["farm/cow-and-calf"]} />
    </>
  );
}
