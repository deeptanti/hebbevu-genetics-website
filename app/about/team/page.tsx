import { StatsBand } from "@/components/blocks/StatsBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography";
import { Card, CTABand, SectionHeader } from "@/components/ui";
import { aboutPages } from "@/content/pages/about";
import { site } from "@/content/site";
import { milestoneStats } from "@/content/stats";
import { team, teamCommitment, teamIntro } from "@/content/team";
import { Photo } from "@/components/ui/Photo";
import { getPhoto, photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.team;

export const metadata = pageMeta({ ...copy.meta, path: "/about/team", absoluteTitle: true });

export default function TeamPage() {
  return (
    <>
      <PageHero
        aside={<Photo photo={photos["people/team-at-fence"]} aspect="photo" priority />}
        title={copy.heading}
        lede={site.teamLine}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our team" }]}
      />

      <Section tone="mist">
        <SectionHeader title={copy.teamHeading} intro={teamIntro} />
        <div className="flex flex-col gap-7">
          {copy.groups.map((g) => {
            const members = team.filter((m) => m.group === g.id);
            if (!members.length) return null;
            return (
              <div key={g.id}>
                <Heading level={3} className="mb-5">
                  {g.heading}
                </Heading>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((m) => (
                    <li key={m.slug} id={m.slug}>
                      <Card flush>
                        {getPhoto(`people/${m.slug}`) ? (
                          <Photo photo={getPhoto(`people/${m.slug}`)!} aspect="portrait" rounded={false} sizes="(min-width: 1024px) 33vw, 100vw" />
                        ) : (
                          <div className="flex items-center gap-4 p-4 pb-0 md:p-5 md:pb-0">
                            <span
                              aria-hidden="true"
                              className="type-h3 flex size-8 shrink-0 items-center justify-center rounded-full bg-clay text-brown"
                            >
                              {m.name.replace(/^Dr\.\s*/, "").charAt(0)}
                            </span>
                            <span className="type-small text-graphite">Portrait to follow</span>
                          </div>
                        )}
                        <div className={getPhoto(`people/${m.slug}`) ? "flex flex-col gap-2 border-t border-stone p-4 md:p-5" : "flex flex-col gap-2 p-4 md:p-5"}>
                          <p className="type-label text-graphite">{m.role}</p>
                          <p className="type-subheading text-ink">{m.name}</p>
                          <p className="type-small text-ink">{m.responsibility}</p>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <StatsBand title={copy.milestonesHeading} stats={milestoneStats} />

      <Section>
        <SectionHeader title={teamCommitment.heading} intro={teamCommitment.paragraphs} flush />
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
