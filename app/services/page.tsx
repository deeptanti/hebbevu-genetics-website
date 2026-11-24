import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, MediaPlaceholder, SectionHeader, ServiceCard } from "@/components/ui";
import { servicesPage as page } from "@/content/pages/services";
import { differentiators, embryoTransfer, pathOptions, servicesIntro } from "@/content/services";
import { primaryCta } from "@/content/site";
import { PathChooser } from "@/components/visuals/PathChooser";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, ServicesCTA, homeCrumb } from "./_components/shared";

export const metadata = pageMeta({ ...page.meta, path: "/services", absoluteTitle: true });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[homeCrumb, { label: "Services" }]}
        kicker={servicesIntro.kicker}
        title={servicesIntro.heading}
        lede={servicesIntro.paragraphs}
        actions={
          <ButtonGroup>
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href="/services/pricing" variant="ghost" arrow>
              How pricing works
            </Button>
          </ButtonGroup>
        }
      />

      <Section tone="mist" labelledBy="paths">
        <SectionHeader id="paths" {...page.pathsHeader} />
        <PathChooser paths={pathOptions} />
      </Section>

      <Section labelledBy="support">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader id="support" {...page.supportHeader} />
            <ServiceCard
              href={embryoTransfer.href}
              kicker={embryoTransfer.kicker}
              title={embryoTransfer.title}
              summary={embryoTransfer.summary}
              icon={embryoTransfer.icon}
              points={embryoTransfer.includes}
            />
          </div>
          <MediaPlaceholder subject="Embryo transfer into a recipient cow" aspect="portrait" />
        </div>
      </Section>

      <Section tone="mist" labelledBy="guidelines">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div>
            <SectionHeader id="guidelines" {...page.guidelinesHeader} />
            <GuidelinesList />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="type-h3 text-ink">{page.helpHeader.title}</h3>
            <p className="type-body text-ink">{page.helpHeader.intro}</p>
            <ButtonGroup>
              {page.helpLinks.map((l) => (
                <Button key={l.href} href={l.href} variant="secondary" arrow>
                  {l.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </Section>

      <Section labelledBy="why">
        <SectionHeader id="why" {...page.differentiatorsHeader} />
        <FeatureGrid items={differentiators} columns={3} />
      </Section>

      <ServicesCTA />
    </>
  );
}
