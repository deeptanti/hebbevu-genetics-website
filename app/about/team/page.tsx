import { StatsBand } from "@/components/blocks/StatsBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography";
import { Card, CTABand, SectionHeader } from "@/components/ui";
import { aboutPages } from "@/content/pages/about";
import { site } from "@/content/site";
import { milestoneStats } from "@/content/stats";
import { founders, team, teamCommitment, teamIntro } from "@/content/team";
import { Photo } from "@/components/ui/Photo";
import { getPhoto, photos } from "@/content/media";
import { pageMeta } from "@/lib/metadata";

const copy = aboutPages.team;

export const metadata = pageMeta({ ...copy.meta, path: "/about/team", absoluteTitle: true });

export default function TeamPage() {
  return (
    <>
      <PageHero
        banner={photos["banners/team-fence"]}
        title={copy.heading}
        lede={site.teamLine}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our team" }]}
      />

      <Section tone="mist">
        <SectionHeader title={copy.teamHeading} intro={teamIntro} />
        <div className="flex flex-col gap-7">
          <div>
            <Heading level={3} className="mb-5">
              Founders
            </Heading>
            <Card flush className="lg:flex-row">
              <div className="lg:w-1/2">
                <Photo photo={photos["people/two-with-bull"]} aspect="photo" rounded={false} sizes="(min-width: 1024px) 600px, 100vw" />
              </div>
              <ul className="flex flex-col justify-center gap-5 p-5 md:p-6 lg:w-1/2">
                {founders.map((f) => (
                  <li key={f.slug} id={f.slug} className="flex flex-col gap-1 border-b border-stone pb-5 last:border-b-0 last:pb-0">
                    <span className="type-label text-graphite">{f.role}</span>
                    <span className="type-h3 text-ink">{f.name}</span>
                  </li>
                ))}
                <li className="type-small text-graphite">Mr. Amith Kishan, founder (left), and Mr. Ashrith Kishan, co-founder.</li>
              </ul>
            </Card>
          </div>
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
