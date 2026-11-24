import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography";
import { ArticleCard, CTABand, SectionHeader } from "@/components/ui";
import { getArticle, readingMinutes } from "@/content/knowledge";
import { aboutPages } from "@/content/pages/about";
import { about, site } from "@/content/site";
import { getPhoto, photos } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.story;
const fb = about.foundersBrief;

export const metadata = pageMeta({ ...copy.meta, path: "/about/story" });

export default function StoryPage() {
  const article = getArticle(copy.articleSlug);
  return (
    <>
      <PageHero
        aside={<Photo photo={photos["people/two-at-fence"]} aspect="portrait" priority />}
        title={copy.heading}
        lede={site.vision.statement}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our story" }]}
      />

      <Section tone="mist">
        <SectionHeader title={fb.heading} intro={[...fb.paragraphs]} />
        <figure className="max-w-prose border-l-2 border-brown pl-5">
          <blockquote>
            <p className="type-h3 font-heading italic text-deep">“{fb.pullQuote}”</p>
          </blockquote>
          <figcaption className="type-label mt-3 text-graphite">The founders</figcaption>
        </figure>
        <p className="type-subheading mt-6 max-w-prose text-ink">{fb.closing}</p>
      </Section>

      <Section>
        <SectionHeader title="Making quality genetics accessible" intro={[...about.access.paragraphs.slice(1)]} />
        {article && (
          <div className="max-w-prose">
            <Heading level={3} className="mb-4">
              {copy.articleHeading}
            </Heading>
            <ArticleCard
                  image={getPhoto(`articles/${article.slug}`)}
                  href={`/knowledge/${article.slug}`}
              title={article.title}
              description={article.description}
              minutes={readingMinutes(article)}
              level={3}
            />
          </div>
        )}
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Explore our IVF services", href: "/services" }}
      />
    </>
  );
}
