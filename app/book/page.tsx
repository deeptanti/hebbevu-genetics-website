import { ContactPanel } from "@/components/blocks/ContactPanel";
import { EnquiryForm } from "@/components/blocks/EnquiryForm";
import { StepList } from "@/components/blocks/StepList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { serviceInterests } from "@/content/enquiry";
import { bookCta, bookPage as page } from "@/content/pages/services";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ ...page.meta, path: "/book" });

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : undefined;
  const defaultService = serviceInterests.some((s) => s.value === requested) ? requested : undefined;

  return (
    <>
      <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a consultation" }]} kicker={page.kicker} title={page.title} lede={page.lede} />

      <Section tone="mist" labelledBy="form-heading">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div className="rounded-lg border border-stone bg-white p-4 md:p-5">
            <h2 id="form-heading" className="type-h3 mb-5 text-ink">
              {page.formHeading}
            </h2>
            <EnquiryForm defaultService={defaultService} />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="type-h3 text-ink">{page.directHeading}</h2>
            <p className="type-body text-ink">{page.directBody}</p>
            <ContactPanel />
          </div>
        </div>
      </Section>

      <Section labelledBy="next">
        <SectionHeader id="next" {...page.nextHeader} />
        <StepList steps={page.nextSteps} />
      </Section>

      <CTABand {...bookCta} />
    </>
  );
}
