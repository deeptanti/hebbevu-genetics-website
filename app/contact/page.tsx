import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { BrandIcon, Button, CTABand, Icon, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { contactCta, contactPage as page } from "@/content/pages/services";
import { contact } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ ...page.meta, path: "/contact", absoluteTitle: true });

export default function ContactPage() {
  const { photo: ctaPhoto, ...cta } = contactCta;
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={page.title}
        lede={page.lede}
        actions={[
          { label: "Book a Consultation", href: "/book" },
          { label: `Call ${contact.phoneDisplay}`, href: contact.phoneHref },
        ]}
      />

      <Section labelledBy="details">
        <SectionHeader id="details" {...page.detailsHeader} />
        <ContactPanel showAddress={false} wide />
      </Section>

      <Section tone="mist" labelledBy="visit">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          <div>
            <BrandIcon name="pin" size="md" className="mb-5" />
            <SectionHeader id="visit" {...page.visitHeader} />
            <address className="type-lede not-italic text-ink">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="type-body mt-4 text-ink">{contact.hoursDisplay}</p>
            <Button href={contact.mapsHref} variant="secondary" icon={<Icon name="map" />} className="mt-5">
              Get directions on Google Maps
            </Button>
          </div>
          <Photo photo={photos[page.photo]} aspect="photo" />
        </div>
      </Section>

      <CTABand {...cta} photo={photos[ctaPhoto]} />
    </>
  );
}
