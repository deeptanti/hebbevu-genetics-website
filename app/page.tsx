import { BulletList } from "@/components/blocks/BulletList";
import { ContactPanel } from "@/components/blocks/ContactPanel";
import { FaqList } from "@/components/blocks/FaqList";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { StatsBand } from "@/components/blocks/StatsBand";
import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, CTABand, SectionHeader } from "@/components/ui";
import { EmbryoScope } from "@/components/visuals/EmbryoScope";
import { IvfTimeline } from "@/components/visuals/IvfTimeline";
import { PathChooser } from "@/components/visuals/PathChooser";
import { Ticker } from "@/components/visuals/Ticker";
import { YieldChart } from "@/components/visuals/YieldChart";
import { breeds, parseYield } from "@/content/breeds";
import { faqs } from "@/content/faq";
import { embryoStages, ivfCycle, traceChain, traceExplainer, labIntro } from "@/content/lab";
import { homeCopy } from "@/content/pages/home";
import { pathOptions, servicesCta } from "@/content/services";
import { homeHero, pillars, revolution } from "@/content/site";
import { impactStats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Cattle IVF & Embryo Transfer in India | Hebbevu Genetics",
  description:
    "Hebbevu Genetics offers advanced cattle IVF and embryo transfer services in India, helping farmers improve herd quality with elite indigenous genetics.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const yieldRows = breeds.map((b) => {
    const [min, max] = parseYield(b.milkYield);
    return { slug: b.slug, name: b.name, epithet: b.epithet, min, max, a2: b.milkType === "A2" };
  });
  return (
    <>
      <PageHero
        display
        title={homeHero.heading}
        lede={homeHero.lede}
        actions={
          <ButtonGroup>
            <Button href={homeCopy.heroActions.primary.href} arrow>
              {homeCopy.heroActions.primary.label}
            </Button>
            <Button href={homeCopy.heroActions.secondary.href} variant="secondary">
              {homeCopy.heroActions.secondary.label}
            </Button>
          </ButtonGroup>
        }
        aside={<EmbryoScope stages={embryoStages} className="mx-auto w-full max-w-prose lg:ml-auto" />}
      />
      <Ticker items={homeCopy.ticker} />

      <Section labelledBy="pillars">
        <SectionHeader id="pillars" title={homeCopy.pillarsHeading} />
        <FeatureGrid items={pillars} columns={4} />
      </Section>

      <StatsBand title={homeCopy.statsHeading} stats={impactStats} />

      <Section labelledBy="services">
        <SectionHeader
          id="services"
          kicker={homeCopy.services.kicker}
          title={homeCopy.services.heading}
          intro={homeCopy.services.intro}
        />
        <PathChooser paths={pathOptions} />
        <ButtonGroup className="mt-6">
          <Button href="/services" variant="secondary">
            Explore our Cattle IVF & Embryo Transfer Services
          </Button>
          <Button href="/services/embryo-transfer" variant="ghost" arrow>
            Embryo transfer & surrogates
          </Button>
        </ButtonGroup>
      </Section>

      <Section tone="mist" labelledBy="revolution">
        <div className="grid gap-7 lg:grid-cols-2">
          <SectionHeader id="revolution" kicker={revolution.kicker} title={revolution.heading} intro={revolution.paragraphs} flush />
          <div className="flex flex-col gap-5 rounded-lg border border-stone bg-white p-5 md:p-6">
            <h3 className="type-h3 text-ink">{revolution.listHeading}</h3>
            <BulletList items={revolution.points} />
            <div>
              <Button href="/about" variant="ghost" arrow>
                Know More
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="lab">
        <SectionHeader id="lab" kicker={homeCopy.lab.kicker} title={homeCopy.lab.heading} intro={labIntro.lede} />
        <IvfTimeline days={ivfCycle} />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h3 className="type-h3 text-ink">{homeCopy.lab.traceHeading}</h3>
            <p className="type-small text-graphite">{traceExplainer}</p>
          </div>
          <div className="lg:col-span-2 lg:pt-2">
            <TraceChain links={traceChain} />
          </div>
        </div>
        <div className="mt-6">
          <Button href="/the-lab" variant="secondary" arrow>
            {homeCopy.lab.allLabel}
          </Button>
        </div>
      </Section>

      <Section tone="mist" labelledBy="breeds">
        <SectionHeader id="breeds" kicker={homeCopy.breeds.kicker} title={homeCopy.breeds.heading} />
        <YieldChart rows={yieldRows} caption={homeCopy.breeds.chartCaption} />
        <div className="mt-6">
          <Button href="/breeds" variant="secondary" arrow>
            {homeCopy.breeds.allLabel}
          </Button>
        </div>
      </Section>

      <Section labelledBy="faq">
        <div className="grid gap-7 lg:grid-cols-3">
          <SectionHeader
            id="faq"
            title={homeCopy.faqHeading}
            actions={
              <Button href="/knowledge/faqs" variant="ghost" arrow>
                All FAQs
              </Button>
            }
          />
          <div className="lg:col-span-2">
            <FaqList items={faqs} />
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="contact">
        <SectionHeader id="contact" title={homeCopy.contactHeading} />
        <ContactPanel />
      </Section>

      <CTABand heading={servicesCta.heading} body={servicesCta.body} primary={homeCopy.cta.primary} secondary={homeCopy.cta.secondary} />
    </>
  );
}
