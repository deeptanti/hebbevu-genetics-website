import { ContactPanel } from "@/components/blocks/ContactPanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
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
          photo={photos["farm/aerial"]}
          title={title}
          lede={hiCopy.explainer}
          note={hiPending}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "हिंदी" }]}
          actions={[english]}
        />
        <Section labelledBy="hi-contact">
          <div className="grid items-center gap-7 lg:grid-cols-2">
            <div>
              <SectionHeader id="hi-contact" title={hiCopy.contactHeading} intro={[hiCopy.callLine, hiCopy.scope]} />
              <ContactPanel showAddress={false} />
            </div>
            <Photo photo={photos["people/team-at-fence"]} aspect="photo" />
          </div>
        </Section>
        <CTABand heading={hiCopy.cta.heading} primary={hiCopy.cta.primary} secondary={hiCopy.cta.secondary} photo={photos["farm/barn-row"]} />
      </div>
    </div>
  );
}
