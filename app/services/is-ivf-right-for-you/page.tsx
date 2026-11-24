import { BulletList } from "@/components/blocks/BulletList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, Card, SectionHeader } from "@/components/ui";
import { breedSelection } from "@/content/breeds";
import { qualifierPage as page } from "@/content/pages/services";
import { qualifier } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { ServicesCTA, homeCrumb, servicesCrumb } from "../_components/shared";

export const metadata = pageMeta({ ...page.meta, path: "/services/is-ivf-right-for-you" });

export default function QualifierPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[homeCrumb, servicesCrumb, { label: qualifier.heading }]}
        kicker="The honest qualifier"
        title={qualifier.heading}
        lede={qualifier.lede}
        actions={
          <ButtonGroup>
            <Button href="/book?service=not-sure">Book a Consultation</Button>
            <Button href="/knowledge/natural-breeding-vs-ivf" variant="ghost" arrow>
              Natural breeding vs IVF
            </Button>
          </ButtonGroup>
        }
      />

      <Section tone="mist" labelledBy="honesty">
        <SectionHeader id="honesty" {...page.honestyHeader} />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {qualifier.honesty.map((h) => (
            <li key={h.title}>
              <Card>
                <h3 className="type-subheading mb-3 text-ink">{h.title}</h3>
                <p className="type-small text-ink">{h.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="compare">
        <SectionHeader id="compare" {...page.compareHeader} />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <div>
            <h3 className="type-h3 mb-5 text-ink">{qualifier.goodFit.heading}</h3>
            <BulletList items={qualifier.goodFit.points} />
          </div>
          <div>
            <h3 className="type-h3 mb-5 text-ink">{qualifier.notYet.heading}</h3>
            <BulletList items={qualifier.notYet.points} />
          </div>
        </div>
        <div className="mt-7 max-w-prose border-t border-stone pt-6">
          <h3 className="type-h3 mb-3 text-ink">{qualifier.combined.heading}</h3>
          <p className="type-body text-ink">{qualifier.combined.body}</p>
        </div>
      </Section>

      <Section tone="mist" labelledBy="breed-questions">
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

      <ServicesCTA service="not-sure" />
    </>
  );
}
