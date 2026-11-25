import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand, SectionHeader, ServiceCard, Stat, StatGrid } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { labIntro, traceChain, traceExplainer } from "@/content/lab";
import { photos } from "@/content/media";
import { labPages } from "@/content/pages/lab";
import { stats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";

const copy = labPages.index;

export const metadata = pageMeta({ ...copy.meta, path: "/the-lab" });

export default function LabPage() {
  return (
    <>
      <PageHero
        size="tall"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Lab" }]}
        photo={photos["lab/bench"]}
        kicker={copy.kicker}
        title={labIntro.heading}
        lede={labIntro.lede}
        actions={[
          { label: "How IVF works", href: "/the-lab/how-ivf-works" },
          { label: "See our results", href: "/the-lab/results" },
        ]}
      />

      <Section labelledBy="lab-stats">
        <SectionHeader id="lab-stats" title={copy.statsHeading} intro={copy.statsIntro} />
        <StatGrid>
          {[stats.conception, stats.calves, stats.experience, stats.herd].map((s) => (
            <Stat key={s.id} value={s.value} label={s.label} brandIcon={s.brandIcon} />
          ))}
        </StatGrid>
      </Section>

      <Section tone="mist" labelledBy="inside">
        <SectionHeader id="inside" title={copy.sectionsHeading} />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {copy.sections.map((s) => (
            <ServiceCard key={s.href} href={s.href} title={s.title} summary={s.summary} icon={s.icon} />
          ))}
        </div>
      </Section>

      <Section labelledBy="trace">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader id="trace" title={copy.traceHeading} intro={traceExplainer} flush />
            <TraceChain links={traceChain} />
          </div>
          <Photo photo={photos["lab/microscope"]} aspect="photo" />
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Explore services", href: "/services" }}
        photo={photos["farm/barn-row"]}
      />
    </>
  );
}
