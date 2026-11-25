import { ContactPanel } from "@/components/blocks/ContactPanel";
import { FaqList } from "@/components/blocks/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { faqGroups, faqs } from "@/content/faq";
import { photos } from "@/content/media";
import { faqPage } from "@/content/pages/knowledge";
import { pageMeta } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMeta({ title: faqPage.title, description: faqPage.metaDescription, path: "/knowledge/faqs" });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        photo={photos["farm/calves-resting"]}
        title={faqPage.title}
        lede={faqPage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "FAQs" }]}
      />
      <Section labelledBy="faqs">
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <SectionHeader id="faqs" title={faqPage.heading} intro={faqPage.intro} />
              <nav aria-label="FAQ topics">
                <ul className="flex flex-wrap gap-3">
                  {faqGroups.map((g) => (
                    <li key={g.id}>
                      <a
                        href={`#${g.id}`}
                        className="transition-ui type-small inline-flex min-h-7 items-center rounded-full border border-graphite px-4 text-ink hover:border-brown hover:text-brown"
                      >
                        {g.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {faqGroups.map((g) => (
              <section key={g.id} aria-labelledby={g.id} className="scroll-mt-9">
                <h3 id={g.id} className="type-h3 mb-2 text-ink">
                  {g.heading}
                </h3>
                <p className="type-body mb-5 max-w-prose text-graphite">{g.intro}</p>
                <FaqList items={g.items} headingLevel={4} />
              </section>
            ))}
          </div>
          <aside aria-labelledby="faq-side" className="flex flex-col gap-5">
            <Photo photo={photos["people/handler-red-calf"]} aspect="photo" />
            <h3 id="faq-side" className="type-h3 text-ink">
              {faqPage.sideHeading}
            </h3>
            <p className="type-body text-ink">{faqPage.sideBody}</p>
            <ContactPanel showAddress={false} />
          </aside>
        </div>
      </Section>
      <CTABand {...faqPage.cta} photo={photos["farm/young-calves"]} />
    </>
  );
}
