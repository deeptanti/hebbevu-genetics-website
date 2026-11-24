import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, CTABand } from "@/components/ui";
import { Pending } from "@/components/typography";
import { hiCopy, hiPending } from "@/content/pages/hi";

/**
 * Hindi page shell until translations are supplied. The page region is lang="hi" so the
 * translation drops straight in; the interim English copy inside is marked lang="en-IN"
 * so screen readers don't read English with Hindi pronunciation.
 */
export function HiPending({ title, english }: { title: string; english: { label: string; href: string } }) {
  return (
    <div lang="hi" data-translation="pending">
      <div lang="en-IN">
      <PageHero
        title={title}
        lede={hiCopy.explainer}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "हिंदी" }]}
        actions={
          <Button href={english.href} variant="secondary" arrow>
            {english.label}
          </Button>
        }
      >
        <p>
          <Pending>{hiPending}</Pending>
        </p>
      </PageHero>
      <Section tone="mist" labelledBy="hi-contact">
        <h2 id="hi-contact" className="type-h2 mb-4 text-deep">
          {hiCopy.contactHeading}
        </h2>
        <p className="type-body mb-6 max-w-prose text-ink">
          {hiCopy.callLine} {hiCopy.scope}
        </p>
        <ContactPanel showAddress={false} />
      </Section>
      <CTABand heading={hiCopy.cta.heading} primary={hiCopy.cta.primary} secondary={hiCopy.cta.secondary} />
      </div>
    </div>
  );
}
