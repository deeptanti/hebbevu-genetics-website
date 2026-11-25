import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blocks/ArticleBody";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArticleCard, CTABand, SectionHeader } from "@/components/ui";
import { articles } from "@/content/articles";
import { articlesByTopic, getArticle, readingMinutes, topics } from "@/content/knowledge";
import { articlePageCopy, knowledgePage } from "@/content/pages/knowledge";
import { ReadingHelix } from "@/components/visuals/ReadingHelix";
import { getPhoto, photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMeta({ title: a.metaTitle, description: a.description, path: `/knowledge/${a.slug}`, absoluteTitle: true });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const topic = topics.find((t) => t.id === article.topic);
  const related = articlesByTopic(article.topic).filter((a) => a.slug !== article.slug);
  const [primary, secondary] = article.cta?.links ?? [];
  const heroPhoto = getPhoto(`articles/${article.slug}`) ?? photos["farm/barn-row"];

  return (
    <>
      <ReadingHelix />
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path: `/knowledge/${article.slug}`,
          image: heroPhoto.src,
        })}
      />
      <PageHero
        photo={heroPhoto}
        kicker={topic?.question}
        title={article.title}
        lede={article.description}
        note={`${readingMinutes(article)} min read`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: article.title }]}
      />

      <Section tone="white">
        <ArticleBody blocks={article.body} />
      </Section>

      {related.length > 0 && (
        <Section tone="mist" labelledBy="related">
          <SectionHeader id="related" title={articlePageCopy.relatedHeading} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard
                  image={getPhoto(`articles/${a.slug}`)}
                  href={`/knowledge/${a.slug}`} title={a.title} description={a.description} minutes={readingMinutes(a)} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {article.cta && primary ? (
        <CTABand heading={article.cta.prompt} primary={primary} secondary={secondary} photo={photos["farm/herd-walking"]} />
      ) : (
        <CTABand {...knowledgePage.cta} photo={photos["farm/herd-walking"]} />
      )}
    </>
  );
}
