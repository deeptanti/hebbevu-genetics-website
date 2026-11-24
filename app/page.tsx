import { BulletList } from "@/components/blocks/BulletList";
import { ContactPanel } from "@/components/blocks/ContactPanel";
import { FaqList } from "@/components/blocks/FaqList";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { StatsBand } from "@/components/blocks/StatsBand";
import { TraceChain } from "@/components/blocks/TraceChain";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { BreedCard, Button, ButtonGroup, ChipList, CTABand, MediaPlaceholder, SectionHeader, ServiceCard } from "@/components/ui";
import { breeds, yieldDisclaimer } from "@/content/breeds";
import { faqs } from "@/content/faq";
import { traceChain, traceExplainer, labIntro } from "@/content/lab";
import { homeCopy } from "@/content/pages/home";
import { buyEmbryos, embryoTransfer, ivfYourDonors, servicesCta } from "@/content/services";
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
  const featured = homeCopy.breeds.featured.map((s) => breeds.find((b) => b.slug === s)!);
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
        aside={
          <div className="flex flex-col gap-4">
            <MediaPlaceholder subject={homeCopy.heroPhoto} aspect="portrait" />
            <ChipList items={homeCopy.heroBreeds} />
          </div>
        }
      />

      <Section tone="mist" labelledBy="pillars">
        <SectionHeader id="pillars" title={homeCopy.pillarsHeading} />
        <FeatureGrid items={pillars} columns={4} />
      </Section>

      <Section labelledBy="revolution">
        <div className="grid gap-7 lg:grid-cols-2">
          <SectionHeader id="revolution" kicker={revolution.kicker} title={revolution.heading} intro={revolution.paragraphs} flush />
          <div className="flex flex-col gap-5 lg:pt-8">
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

      <StatsBand title={homeCopy.statsHeading} stats={impactStats} />

      <Section labelledBy="services">
        <SectionHeader id="services" title={homeCopy.services.heading} intro={homeCopy.services.intro} />
        <div className="grid gap-5 lg:grid-cols-3">
          {[ivfYourDonors, buyEmbryos, embryoTransfer].map((s) => (
            <ServiceCard key={s.slug} href={s.href} kicker={s.kicker} title={s.title} summary={s.summary} icon={s.icon} />
          ))}
        </div>
        <ButtonGroup className="mt-6">
          <Button href="/services" variant="secondary">
            Explore our Cattle IVF & Embryo Transfer Services
          </Button>
          {homeCopy.services.links.map((l) => (
            <Button key={l.href} href={l.href} variant="ghost" arrow>
              {l.label}
            </Button>
          ))}
        </ButtonGroup>
      </Section>

      <Section tone="mist" labelledBy="breeds">
        <SectionHeader
          id="breeds"
          kicker={homeCopy.breeds.kicker}
          title={homeCopy.breeds.heading}
          intro={yieldDisclaimer}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((b) => (
            <BreedCard
              key={b.slug}
              href={`/breeds/${b.slug}`}
              name={b.name}
              epithet={b.epithet}
              facts={[
                { label: "Origin", value: b.origin },
                { label: "Milk yield", value: b.milkYield },
              ]}
              tags={b.milkType ? [`${b.milkType} milk`] : undefined}
            />
          ))}
        </div>
        <div className="mt-6">
          <Button href="/breeds" variant="secondary" arrow>
            {homeCopy.breeds.allLabel}
          </Button>
        </div>
      </Section>

      <Section labelledBy="lab">
        <SectionHeader id="lab" kicker={homeCopy.lab.kicker} title={homeCopy.lab.heading} intro={[labIntro.lede, traceExplainer]} />
        <TraceChain links={traceChain} />
        <div className="mt-6">
          <Button href="/the-lab" variant="secondary" arrow>
            {homeCopy.lab.allLabel}
          </Button>
        </div>
      </Section>

      <Section tone="mist" labelledBy="faq">
        <div className="grid gap-7 lg:grid-cols-3">
          <SectionHeader id="faq" title={homeCopy.faqHeading} actions={<Button href="/knowledge/faqs" variant="ghost" arrow>All FAQs</Button>} />
          <div className="lg:col-span-2">
            <FaqList items={faqs} />
          </div>
        </div>
      </Section>

      <Section labelledBy="contact">
        <SectionHeader id="contact" title={homeCopy.contactHeading} />
        <ContactPanel />
      </Section>

      <CTABand
        heading={servicesCta.heading}
        body={servicesCta.body}
        primary={homeCopy.cta.primary}
        secondary={homeCopy.cta.secondary}
      />
    </>
  );
}
