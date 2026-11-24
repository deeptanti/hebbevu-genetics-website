import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, Card, IconTile, SectionHeader } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { breedSelection } from "@/content/breeds";
import { photos } from "@/content/media";
import { qualifierPage as page } from "@/content/pages/services";
import { qualifier } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: "/services/is-ivf-right-for-you" });

const honestyIcons = ["target", "users", "trending"] as const;

export default function QualifierPage() {
  return (
    <>
      <PageHero
        photo={photos[page.heroPhoto]}
        breadcrumbs={[homeCrumb, servicesCrumb, { label: qualifier.heading }]}
        kicker="The honest qualifier"
        title={qualifier.heading}
        lede={qualifier.lede}
        actions={[
          { label: "Book a Consultation", href: "/book?service=not-sure" },
          { label: "Natural breeding vs IVF", href: "/knowledge/natural-breeding-vs-ivf" },
        ]}
      />

      <Section labelledBy="honesty">
        <SectionHeader id="honesty" {...page.honestyHeader} />
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {qualifier.honesty.map((h, i) => (
            <li key={h.title}>
              <Card>
                <IconTile name={honestyIcons[i % honestyIcons.length]} className="mb-5" />
                <h3 className="type-subheading mb-3 text-ink">{h.title}</h3>
                <p className="type-small text-ink">{h.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="compare">
        <SectionHeader id="compare" {...page.compareHeader} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <IconTile name="check" className="mb-5" />
            <h3 className="type-h3 mb-5 text-ink">{qualifier.goodFit.heading}</h3>
            <BulletList items={qualifier.goodFit.points} />
          </Card>
          <Card>
            <IconTile name="leaf" className="mb-5" />
            <h3 className="type-h3 mb-5 text-ink">{qualifier.notYet.heading}</h3>
            <BulletList items={qualifier.notYet.points} />
          </Card>
        </div>
        <div className="mt-8 grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          <Photo photo={photos[page.combinedPhoto]} aspect="photo" />
          <SectionHeader level={3} title={qualifier.combined.heading} intro={qualifier.combined.body} flush />
        </div>
      </Section>

      <Section labelledBy="breed-questions">
        <SectionHeader id="breed-questions" {...page.breedHeader} />
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {breedSelection.questions.map((q, i) => (
            <li key={q} className="flex flex-col gap-2 border-t border-stone pt-4">
              <span className="type-label text-brown">Question {String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-subheading text-ink">{q}</h3>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Button href="/breeds/compare" variant="secondary" arrow>
            Compare all seven breeds
          </Button>
        </div>
      </Section>

      <ServicesCTA service="not-sure" photo={page.ctaPhoto} />
    </>
  );
}
