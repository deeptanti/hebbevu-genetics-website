import { FaqList } from "@/components/blocks/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/ui";
import { faqs } from "@/content/faq";
import { faqPage } from "@/content/pages/knowledge";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: faqPage.title, description: faqPage.metaDescription, path: "/knowledge/faqs" });

export default function FaqPage() {
  return (
    <>
      <PageHero
        banner={photos["farm/calves-resting"]}
        title={faqPage.title}
        lede={faqPage.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "FAQs" }]}
      />
      <Section tone="mist">
        <div className="max-w-prose">
          <FaqList items={faqs} headingLevel={2} />
        </div>
      </Section>
      <CTABand {...faqPage.cta} />
    </>
  );
}
