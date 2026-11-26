import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/ui";
import { DataTable } from "@/components/ui/DataTable";
import { photos } from "@/content/media";
import { legalCompany, legalTocHeading, type LegalBlock, type LegalDoc, type LegalListItem } from "@/content/pages/legal";
import { contact } from "@/content/site";

const linkClass = "text-brown underline underline-offset-4 hover:text-brown-dark";
const LINK = /(\[[^\]]+\]\([^)]+\))/;

/** Plain text with inline [label](href) links. */
export function RichText({ text }: { text: string }) {
  return text.split(LINK).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, label, href] = m;
    return href.startsWith("/") ? (
      <Link key={i} href={href} className={linkClass}>
        {label}
      </Link>
    ) : (
      <a key={i} href={href} className={linkClass}>
        {label}
      </a>
    );
  });
}

function ListItem({ item }: { item: LegalListItem }) {
  if (typeof item === "string") return <RichText text={item} />;
  return (
    <>
      <strong className="font-semibold">{item.lead}</strong> <RichText text={item.text} />
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if ("list" in block) {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-brown">
        {block.list.map((item, i) => (
          <li key={i} className="type-body text-ink">
            <ListItem item={item} />
          </li>
        ))}
      </ul>
    );
  }
  if ("table" in block) {
    const { caption, head, rows } = block.table;
    const keys = (head ?? rows[0].map((_, i) => String(i))).map((_, i) => `c${i}`);
    const columns = keys.map((key, i) => ({ key, header: head?.[i] ?? "", rowHeader: i === 0 }));
    const data = rows.map((r, ri) => ({
      id: String(ri),
      ...Object.fromEntries(r.map((cell, ci) => [keys[ci], <RichText key={ci} text={cell} />])),
    }));
    return head ? (
      <DataTable caption={caption} hideCaption columns={columns} rows={data} />
    ) : (
      <div className="overflow-x-auto rounded-sm border border-stone">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-stone last:border-b-0">
                <th scope="row" className="type-small w-1/3 bg-mist px-4 py-3 align-top font-semibold text-ink">
                  {r[0]}
                </th>
                <td className="type-small px-4 py-3 align-top text-ink">
                  <RichText text={r[1]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p className="type-body flex gap-3 text-ink">
      {block.n && <span className="min-w-6 shrink-0 font-semibold text-deep">{block.n}</span>}
      <span>
        {block.lead && <strong className="font-semibold">{block.lead} </strong>}
        <RichText text={block.text} />
      </span>
    </p>
  );
}

const heading = (s: { n?: string; title: string }) => (s.n ? `${s.n}. ${s.title}` : s.title);

/** The full legal page: hero, sticky contents list, numbered sections, contact block, CTA. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const c = doc.contact;
  const toc = [...doc.sections, c];
  return (
    <>
      <PageHero
        photo={photos["farm/aerial"]}
        title={doc.title}
        lede={doc.lede}
        note={doc.updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: doc.title }]}
      />
      <Section labelledBy="legal-company">
        <div className="grid gap-7 lg:grid-cols-3">
          <nav aria-labelledby="legal-toc" className="lg:sticky lg:top-10 lg:self-start">
            <h2 id="legal-toc" className="type-label mb-3 text-graphite">
              {legalTocHeading}
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
            <p id="legal-company" className="type-label text-brown">
              {legalCompany}
            </p>
            {doc.sections.map((s) => (
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
              {c.before?.map((b, i) => <Block key={i} block={b} />)}
              <dl className="type-body grid gap-2 text-ink sm:grid-cols-4">
                <dt className="font-semibold">Email</dt>
                <dd className="sm:col-span-3">
                  <a href={contact.emailHref} className={linkClass}>
                    {contact.email}
                  </a>
                </dd>
                <dt className="font-semibold">Phone</dt>
                <dd className="sm:col-span-3">
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phoneDisplay}
                  </a>
                </dd>
                <dt className="font-semibold">Post</dt>
                <dd className="sm:col-span-3">
                  <span className="block">{legalCompany}</span>
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </dl>
              {c.after?.map((b, i) => <Block key={i} block={b} />)}
            </section>
          </article>
        </div>
      </Section>
      <CTABand heading={doc.cta.heading} primary={doc.cta.primary} photo={photos["farm/herd-walking"]} />
    </>
  );
}
