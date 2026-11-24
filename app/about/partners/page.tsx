import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading, Pending } from "@/components/typography";
import { Button, ChipList, CTABand, SectionHeader } from "@/components/ui";
import { aboutPages } from "@/content/pages/about";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.partners;

export const metadata = pageMeta({ ...copy.meta, path: "/about/partners" });

export default function PartnersPage() {
  return (
    <>
      <PageHero
        aside={<Photo photo={photos["farm/gir-bull-fence"]} aspect="portrait" priority />}
        kicker="Global Collaboration"
        title={copy.heading}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Partners" }]}
      />

      <Section tone="mist">
        <SectionHeader title={copy.brazilHeading} intro={[...copy.brazil]} />
        <Button href="/breeds/gir" variant="secondary" arrow>
          Why Gir matters
        </Button>
      </Section>

      <Section>
        <SectionHeader title={copy.linksHeading} intro={copy.linksNote} />
        <ChipList items={[...copy.countries]} />
        <div className="mt-7 max-w-prose border-t border-stone pt-5">
          <Heading level={3} className="mb-3">
            {copy.partnersHeading}
          </Heading>
          <p className="type-body flex flex-wrap items-center gap-3 text-ink">
            <Pending />
            <span>{copy.partnersNote}</span>
          </p>
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Visit the lab", href: "/the-lab" }}
      />
    </>
  );
}
