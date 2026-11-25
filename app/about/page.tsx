import { FilmSection } from "@/components/blocks/FilmSection";
import { films } from "@/content/pages/films";
import { BulletList } from "@/components/blocks/BulletList";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { StatsBand } from "@/components/blocks/StatsBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button, BrandIcon, Card, CTABand, SectionHeader, ServiceCard } from "@/components/ui";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/media";
import { aboutPages } from "@/content/pages/about";
import { about, pillars, site } from "@/content/site";
import { impactStats } from "@/content/stats";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.index;

export const metadata = pageMeta({ ...copy.meta, path: "/about", absoluteTitle: true });

export default function AboutPage() {
  return (
    <>
      <PageHero
        size="tall"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        photo={photos["banners/field-herd"]}
        kicker="About Hebbevu Genetics"
        title={about.heading}
        lede={about.overview[0]}
        actions={[
          { label: "Explore our IVF services", href: "/services" },
          { label: "Visit the lab", href: "/the-lab" },
        ]}
      />

      <Section labelledBy="overview">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <SectionHeader id="overview" title={copy.overviewHeading} intro={about.overview.slice(1)} flush />
          <Photo photo={photos["people/team-at-fence"]} aspect="photo" />
        </div>
      </Section>

      <Section tone="mist" labelledBy="vision">
        <SectionHeader id="vision" title={copy.visionMissionHeading} />
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <BrandIcon name="dna" className="mb-5" />
            <h3 className="type-h3 mb-3 text-ink">{copy.visionHeading}</h3>
            <p className="type-body text-ink">{site.vision.statement}</p>
            <blockquote className="mt-5 border-l-2 border-brown pl-5">
              <p className="type-h3 font-heading italic text-deep">“{site.vision.hindi}”</p>
              <p className="type-label mt-2 text-graphite">{site.vision.english}</p>
            </blockquote>
          </Card>
          <Card>
            <BrandIcon name="care" className="mb-5" />
            <h3 className="type-h3 mb-3 text-ink">{copy.missionHeading}</h3>
            <p className="type-body text-ink">{site.mission}</p>
          </Card>
        </div>
      </Section>

      <StatsBand title={copy.impactHeading} stats={impactStats} />

      <Section labelledBy="access">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeader id="access" title={about.access.heading} intro={[...about.access.paragraphs]} flush />
            <p className="type-subheading text-ink">{about.access.listHeading}</p>
            <BulletList items={[...about.access.points]} />
            <p className="type-body max-w-prose text-ink">{about.access.closing}</p>
            <div>
              <Button href="/breeds" variant="secondary" arrow>
                Discover our Indigenous Breeds Program
              </Button>
            </div>
          </div>
          <Photo photo={photos["farm/handler-with-calf"]} aspect="portrait" />
        </div>
      </Section>

      <Section tone="mist" labelledBy="why">
        <SectionHeader
          id="why"
          title={copy.whyHeading}
          actions={
            <Button href="/the-lab" variant="ghost" arrow>
              Learn more about our IVF Lab
            </Button>
          }
        />
        <FeatureGrid items={pillars} columns={4} />
      </Section>

      <FilmSection id="films" block={films.about} />

      <Section tone="mist" labelledBy="more">
        <SectionHeader id="more" title={copy.moreHeading} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
        photo={photos["farm/barn-row"]}
      />
    </>
  );
}
