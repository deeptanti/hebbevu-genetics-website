import { ContactPanel } from "@/components/blocks/ContactPanel";
import { FaqList } from "@/components/blocks/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { faqs } from "@/content/faq";
import { photos } from "@/content/media";
import { faqPage } from "@/content/pages/knowledge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: faqPage.title, description: faqPage.metaDescription, path: "/knowledge/faqs" });

export default function FaqPage() {
  return (
    <>
      <PageHero
        photo={photos["farm/calves-resting"]}
        title={faqPage.title}
        lede={faqPage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "FAQs" }]}
      />
      <Section labelledBy="faqs">
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeader id="faqs" title={faqPage.heading} />
            <FaqList items={faqs} headingLevel={3} />
          </div>
          <aside aria-labelledby="faq-side" className="flex flex-col gap-5">
            <Photo photo={photos["farm/vet-checking"]} aspect="photo" />
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
