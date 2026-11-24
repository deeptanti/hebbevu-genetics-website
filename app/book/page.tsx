import { ContactPanel } from "@/components/blocks/ContactPanel";
import { EnquiryForm } from "@/components/blocks/EnquiryForm";
import { StepList } from "@/components/blocks/StepList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { serviceInterests } from "@/content/enquiry";
import { photos } from "@/content/media";
import { bookCta, bookPage as page } from "@/content/pages/services";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ ...page.meta, path: "/book" });

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : undefined;
  const defaultService = serviceInterests.some((s) => s.value === requested) ? requested : undefined;
  const { photo: ctaPhoto, ...cta } = bookCta;

  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        caption={page.heroCaption}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a consultation" }]}
        kicker={page.kicker}
        title={page.title}
        lede={page.lede}
      />

      <Section labelledBy="form-heading">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeader id="form-heading" title={page.formHeading} intro={page.formIntro} />
            <EnquiryForm defaultService={defaultService} />
          </div>
          <div className="flex flex-col gap-5 rounded-lg border border-stone bg-mist p-5 md:p-6 lg:col-span-2 lg:self-start">
            <SectionHeader level={3} title={page.directHeading} intro={page.directBody} flush />
            <ContactPanel />
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="next">
        <SectionHeader id="next" {...page.nextHeader} />
        <StepList steps={page.nextSteps} />
      </Section>

      <CTABand {...cta} photo={photos[ctaPhoto]} />
    </>
  );
}
