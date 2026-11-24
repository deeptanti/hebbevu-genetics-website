import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Pending } from "@/components/typography";
import { BrandIcon, Button, Card, CTABand, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { aboutPages } from "@/content/pages/about";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.partners;

export const metadata = pageMeta({ ...copy.meta, path: "/about/partners" });

export default function PartnersPage() {
  return (
    <>
      <PageHero
        photo={photos["farm/gir-bull-fence"]}
        kicker="Global Collaboration"
        title={copy.heading}
        lede={copy.lede}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Partners" }]}
        actions={[
          { label: "Book a Consultation", href: "/book" },
          { label: "Why Gir matters", href: "/breeds/gir" },
        ]}
      />

      <Section labelledBy="brazil">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeader id="brazil" title={copy.brazilHeading} intro={[...copy.brazil]} flush />
            <div>
              <Button href="/breeds/gir" variant="secondary" arrow>
                Why Gir matters
              </Button>
            </div>
          </div>
          <Photo photo={photos["breeds/gir"]} aspect="square" />
        </div>
      </Section>

      <Section tone="mist" labelledBy="links">
        <SectionHeader id="links" title={copy.linksHeading} intro={copy.linksNote} />
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {copy.countries.map((c) => (
            <li key={c}>
              <Card>
                <BrandIcon name="global" className="mb-5" />
                <h3 className="type-h3 mb-2 text-ink">{c}</h3>
                <p className="type-small text-graphite">{copy.countryNote}</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex max-w-prose flex-col gap-3 border-t border-stone pt-5">
          <h3 className="type-h3 text-ink">{copy.partnersHeading}</h3>
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
        photo={photos["farm/gir-bull"]}
      />
    </>
  );
}
