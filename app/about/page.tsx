import { BulletList } from "@/components/blocks/BulletList";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { StatsBand } from "@/components/blocks/StatsBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography";
import { Button, ButtonGroup, CTABand, SectionHeader, ServiceCard } from "@/components/ui";
import { aboutPages } from "@/content/pages/about";
import { about, pillars, site } from "@/content/site";
import { impactStats } from "@/content/stats";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.index;

export const metadata = pageMeta({ ...copy.meta, path: "/about", absoluteTitle: true });

export default function AboutPage() {
  return (
    <>
      <PageHero
        aside={<Photo photo={photos["people/team-at-fence"]} aspect="photo" priority />}
        kicker="About Hebbevu Genetics"
        title={about.heading}
        lede={about.overview[0]}
        actions={
          <ButtonGroup>
            <Button href="/services" arrow>
              Explore our IVF services
            </Button>
            <Button href="/the-lab" variant="secondary">
              Visit the lab
            </Button>
          </ButtonGroup>
        }
      />

      <Section tone="mist">
        <SectionHeader title={copy.overviewHeading} intro={about.overview.slice(1)} flush />
      </Section>

      <Section>
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Heading level={2}>{copy.visionHeading}</Heading>
            <p className="type-body text-ink">{site.vision.statement}</p>
            <blockquote className="border-l-2 border-brown pl-5">
              <p className="type-h3 font-heading italic text-deep">“{site.vision.hindi}”</p>
              <p className="type-label mt-2 text-graphite">{site.vision.english}</p>
            </blockquote>
          </div>
          <div className="flex flex-col gap-4">
            <Heading level={2}>{copy.missionHeading}</Heading>
            <p className="type-body text-ink">{site.mission}</p>
          </div>
        </div>
      </Section>

      <StatsBand title={copy.impactHeading} stats={impactStats} footnote={impactStats.find((s) => s.note)?.note} />

      <Section>
        <SectionHeader title={about.access.heading} intro={[...about.access.paragraphs]} />
        <div className="max-w-prose">
          <p className="type-subheading mb-4 text-ink">{about.access.listHeading}</p>
          <BulletList items={[...about.access.points]} />
          <p className="type-body mt-5 text-ink">{about.access.closing}</p>
          <div className="mt-5">
            <Button href="/breeds" variant="secondary" arrow>
              Discover our Indigenous Breeds Program
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader title={copy.whyHeading} />
        <FeatureGrid items={pillars} columns={4} />
        <div className="mt-6">
          <Button href="/the-lab" variant="ghost" arrow>
            Learn more about our IVF Lab
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeader title={copy.moreHeading} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.more.map((m) => (
            <ServiceCard key={m.href} href={m.href} title={m.title} summary={m.summary} icon={m.icon} />
          ))}
        </div>
      </Section>

      <CTABand
        heading={copy.cta.heading}
        body={copy.cta.body}
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
