import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/ui";
import { photos } from "@/content/media";
import { termsPage as page, type LegalBlock } from "@/content/pages/terms";
import { contact } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: page.title, description: page.metaDescription, path: "/legal/terms" });

const toc = [...page.sections, page.contactSection];
const heading = (s: { n?: string; title: string }) => (s.n ? `${s.n}. ${s.title}` : s.title);

function Block({ block }: { block: LegalBlock }) {
  if ("list" in block) {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-brown">
        {block.list.map((item) => (
          <li key={item} className="type-body text-ink">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="type-body flex gap-3 text-ink">
      {block.n && <span className="min-w-6 shrink-0 font-semibold text-deep">{block.n}</span>}
      <span>
        {block.lead && <strong className="font-semibold">{block.lead} </strong>}
        {block.text}
      </span>
    </p>
  );
}

export default function TermsPage() {
  const c = page.contactSection;
  return (
    <>
      <PageHero
        photo={photos["farm/aerial"]}
        title={page.title}
        lede={page.lede}
        note={page.updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />
      <Section labelledBy="terms-company">
        <div className="grid gap-7 lg:grid-cols-3">
          <nav aria-labelledby="terms-toc" className="lg:sticky lg:top-10 lg:self-start">
            <h2 id="terms-toc" className="type-label mb-3 text-graphite">
              {page.tocHeading}
            </h2>
            <ol className="flex flex-col gap-2 border-l border-stone pl-4">
              {toc.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="transition-ui type-small text-ink hover:text-brown">
                    {heading(s)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="flex max-w-prose flex-col gap-7 lg:col-span-2">
            <p id="terms-company" className="type-label text-brown">
              {page.company}
            </p>
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="flex flex-col gap-4">
                <h2 id={`${s.id}-h`} className="type-h3 text-deep">
                  {heading(s)}
                </h2>
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </section>
            ))}
            <section id={c.id} aria-labelledby={`${c.id}-h`} className="flex flex-col gap-4">
              <h2 id={`${c.id}-h`} className="type-h3 text-deep">
                {heading(c)}
              </h2>
              <dl className="type-body grid gap-2 text-ink sm:grid-cols-4">
                <dt className="font-semibold">Email</dt>
                <dd className="sm:col-span-3">
                  <a href={contact.emailHref} className="text-brown underline underline-offset-4 hover:text-brown-dark">
                    {contact.email}
                  </a>
                </dd>
                <dt className="font-semibold">Phone</dt>
                <dd className="sm:col-span-3">
                  <a href={contact.phoneHref} className="text-brown underline underline-offset-4 hover:text-brown-dark">
                    {contact.phoneDisplay}
                  </a>
                </dd>
                <dt className="font-semibold">Post</dt>
                <dd className="sm:col-span-3">
                  <span className="block">{page.company}</span>
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </dl>
              <p className="type-body text-ink">
                {c.privacyNote}{" "}
                <Link href={c.privacyLink.href} className="text-brown underline underline-offset-4 hover:text-brown-dark">
                  {c.privacyLink.label}
                </Link>{" "}
                {c.privacyNoteEnd}
              </p>
            </section>
          </article>
        </div>
      </Section>
      <CTABand heading={page.cta.heading} primary={page.cta.primary} photo={photos["farm/herd-walking"]} />
    </>
  );
}
