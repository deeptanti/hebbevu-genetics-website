import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, ButtonGroup, SectionHeader, ServiceCard } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { PathChooser } from "@/components/visuals/PathChooser";
import { photos } from "@/content/media";
import { servicesPage as page } from "@/content/pages/services";
import { differentiators, embryoTransfer, pathOptions, servicesIntro } from "@/content/services";
import { primaryCta } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { GuidelinesList, ServicesCTA, homeCrumb } from "./_components/shared";

export const metadata = pageMeta({ ...page.meta, path: "/services", absoluteTitle: true });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        size="tall"
        photo={photos[page.heroPhoto]}
        breadcrumbs={[homeCrumb, { label: "Services" }]}
        kicker={servicesIntro.kicker}
        title={servicesIntro.heading}
        lede={servicesIntro.paragraphs}
        actions={[
          { label: primaryCta.label, href: primaryCta.href },
          { label: "How pricing works", href: "/services/pricing" },
        ]}
      />

      <Section labelledBy="paths">
        <SectionHeader id="paths" {...page.pathsHeader} />
        <PathChooser paths={pathOptions} />
      </Section>

      <Section tone="mist" labelledBy="support">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
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
          <Photo photo={photos[page.supportPhoto]} aspect="portrait" />
        </div>
      </Section>

      <Section labelledBy="guidelines">
        <SectionHeader id="guidelines" {...page.guidelinesHeader} />
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GuidelinesList />
          </div>
          <div className="flex flex-col gap-4 rounded-lg border border-stone bg-mist p-5 md:p-6">
            <SectionHeader level={3} title={page.helpHeader.title} intro={page.helpHeader.intro} flush />
            <ButtonGroup>
              {page.helpLinks.map((l) => (
                <Button key={l.href} href={l.href} variant="ghost" arrow>
                  {l.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="why">
        <SectionHeader id="why" {...page.differentiatorsHeader} />
        <FeatureGrid items={differentiators} columns={3} />
      </Section>

      <ServicesCTA photo={page.ctaPhoto} />
    </>
  );
}
