import { PageHero } from "@/components/layout/PageHero";
import { Section, type SectionTone } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button, ButtonGroup, Icon, PressCard, SectionHeader } from "@/components/ui";
import { photos } from "@/content/media";
import { newsPage as copy } from "@/content/pages/news";
import { pressByStory, pressStories } from "@/content/press";
import { contact } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { pressPageSchema } from "@/lib/schema";

const path = "/about/news";

export const metadata = pageMeta({ ...copy.meta, path, absoluteTitle: true });

export default function NewsPage() {
  const stories = pressStories.map((s) => ({ ...s, items: pressByStory(s.id) })).filter((s) => s.items.length > 0);

  return (
    <>
      <JsonLd data={pressPageSchema(path, copy.meta.title, copy.meta.description)} />
      <PageHero
        photo={photos["people/two-with-bull"]}
        caption={copy.caption}
        title={copy.title}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "In the news" }]}
        actions={[
          { label: "Book a consultation", href: "/book" },
          { label: "Our story", href: "/about/story" },
        ]}
      />

      {stories.map((s, i) => {
        const tone: SectionTone = i % 2 ? "mist" : "white";
        return (
          <Section key={s.id} tone={tone} labelledBy={`story-${s.id}`}>
            <SectionHeader id={`story-${s.id}`} title={s.title} intro={s.summary} />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((p) => (
                <li key={p.id}>
                  <PressCard item={p} />
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <Section tone={stories.length % 2 ? "mist" : "white"} labelledBy="media">
        <SectionHeader id="media" title={copy.media.heading} intro={copy.media.body} />
        <ButtonGroup>
          <Button href={contact.emailHref} icon={<Icon name="mail" />}>
            {contact.email}
          </Button>
          <Button href={contact.phoneHref} variant="secondary" icon={<Icon name="phone" />}>
            Call {contact.phoneDisplay}
          </Button>
        </ButtonGroup>
      </Section>
    </>
  );
}
