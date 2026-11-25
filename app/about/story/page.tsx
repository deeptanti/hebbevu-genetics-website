import { FilmSection } from "@/components/blocks/FilmSection";
import { films } from "@/content/pages/films";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArticleCard, BrandIcon, CTABand, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { getArticle, readingMinutes } from "@/content/knowledge";
import { getPhoto, photos } from "@/content/media";
import { aboutPages } from "@/content/pages/about";
import { about, site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.story;
const fb = about.foundersBrief;

export const metadata = pageMeta({ ...copy.meta, path: "/about/story" });

export default function StoryPage() {
  const article = getArticle(copy.articleSlug);
  return (
    <>
      <PageHero
        photo={photos["people/two-with-bull"]}
        title={copy.heading}
        lede={site.vision.statement}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our story" }]}
        caption="Mr. Amith Kishan, founder (left), and Mr. Ashrith Kishan, co-founder"
      />

      <Section labelledBy="founders-brief">
        <div className="grid items-start gap-7 lg:grid-cols-2">
          <SectionHeader id="founders-brief" title={fb.heading} intro={[...fb.paragraphs]} flush />
          <figure className="flex flex-col gap-5 rounded-lg bg-clay p-6 md:p-8">
            <BrandIcon name="herd" size="lg" />
            <blockquote>
              <p className="type-h2 font-heading italic text-deep">“{fb.pullQuote}”</p>
            </blockquote>
            <figcaption className="type-label text-graphite">The founders</figcaption>
            <p className="type-subheading text-ink">{fb.closing}</p>
          </figure>
        </div>
      </Section>

      <Section tone="mist" labelledBy="access">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader id="access" title={copy.accessHeading} intro={[...about.access.paragraphs.slice(1)]} flush />
            {article && (
              <div className="flex flex-col gap-4">
                <p className="type-subheading text-ink">{copy.articleHeading}</p>
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
          </div>
          <Photo photo={photos["farm/calves-resting"]} aspect="portrait" />
        </div>
      </Section>

      <FilmSection id="films" block={films.story} />
      <FilmSection id="origins" tone="mist" block={films.origins} />

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Explore our IVF services", href: "/services" }}
        photo={photos["farm/herd-walking"]}
      />
    </>
  );
}
