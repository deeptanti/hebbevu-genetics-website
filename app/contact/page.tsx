import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, MediaPlaceholder, SectionHeader } from "@/components/ui";
import { contactCta, contactPage as page } from "@/content/pages/services";
import { contact } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ ...page.meta, path: "/contact", absoluteTitle: true });

export default function ContactPage() {
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} title={page.title} lede={page.lede} />

      <Section tone="mist" labelledBy="details">
        <SectionHeader id="details" {...page.detailsHeader} />
        <ContactPanel showAddress={false} />
      </Section>

      <Section labelledBy="visit">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader id="visit" {...page.visitHeader} />
            <address className="type-body not-italic text-ink">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <MediaPlaceholder subject={page.photo} />
        </div>
      </Section>

      <CTABand {...contactCta} />
    </>
  );
}
