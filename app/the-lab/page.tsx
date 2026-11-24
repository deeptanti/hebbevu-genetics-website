import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, CTABand, SectionHeader, ServiceCard, Stat } from "@/components/ui";
import { labIntro, traceChain, traceExplainer } from "@/content/lab";
import { labPages } from "@/content/pages/lab";
import { stats } from "@/content/stats";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.index;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab" });

export default function LabPage() {
  return (
    <>
      <PageHero
        banner={photos["lab/bench"]}
        kicker={copy.kicker}
        title={labIntro.heading}
        lede={labIntro.lede}
        actions={
          <ButtonGroup>
            <Button href="/the-lab/how-ivf-works" arrow>
              How IVF works
            </Button>
            <Button href="/the-lab/results" variant="secondary">
              See our results
            </Button>
          </ButtonGroup>
        }
        aside={
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[stats.conception, stats.calves, stats.experience, stats.herd].map((s) => (
              <Stat key={s.id} value={s.value} label={s.label} />
            ))}
          </dl>
        }
      />

      <Section tone="mist">
        <SectionHeader title="Inside the lab" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {copy.sections.map((s) => (
            <ServiceCard key={s.href} href={s.href} title={s.title} summary={s.summary} icon={s.icon} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title={copy.traceHeading} intro={traceExplainer} />
        <TraceChain links={traceChain} />
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
