import { articles } from "@/content/articles";
import { breeds } from "@/content/breeds";
import { formatPressDate, press } from "@/content/press";
import { contact, primaryNav, site } from "@/content/site";

/**
 * /llms.txt (llmstxt.org): a plain-text map of the site for AI assistants and answer
 * engines (ChatGPT, Gemini, Perplexity). Built from the same content as the pages, so it
 * never drifts from them. House style applies: no em dashes.
 */
export const dynamic = "force-static";

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. Hebbevu Genetics produces cattle and buffalo embryos by IVF (in vitro fertilisation) at its own laboratory in Andhra Pradesh, India, and transfers them into farmers' herds, so a proven high-yield cow can be multiplied across a herd instead of giving one calf a year. It works with indigenous breeds such as Gir, Sahiwal, Ongole and Kankrej, and with Murrah and Jaffarabadi buffalo. It serves dairy farmers and breeders in India and clients worldwide.`,
    "",
    `- Location: ${contact.addressLines.join(", ")}`,
    `- Phone and WhatsApp: ${contact.phoneDisplay}`,
    `- Email: ${contact.email}`,
    `- Hours: ${contact.hoursDisplay}`,
    "- Service area: worldwide",
    `- Book a consultation: ${url("/book")}`,
    "",
  ];

  for (const section of primaryNav) {
    lines.push(`## ${section.label}`, "");
    lines.push(`- [${section.label}](${url(section.href)})${section.description ? `: ${section.description}` : ""}`);
    for (const child of section.children ?? []) {
      lines.push(`- [${child.label}](${url(child.href)})${child.description ? `: ${child.description}` : ""}`);
    }
    lines.push("");
  }

  lines.push("## Breeds", "");
  for (const b of breeds) {
    lines.push(`- [${b.name}](${url(`/breeds/${b.slug}`)}): ${b.epithet}. Origin ${b.origin}, typical milk yield ${b.milkYield}.`);
  }

  lines.push("", "## Articles", "");
  for (const a of articles) {
    lines.push(`- [${a.title}](${url(`/knowledge/${a.slug}`)}): ${a.description}`);
  }

  lines.push("", "## In the news", "");
  for (const p of press) {
    lines.push(`- [${p.outlet}: ${p.headline}](${p.url}) (${formatPressDate(p.date)})`);
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Frequently asked questions](${url("/knowledge/faqs")})`,
    `- [Glossary of IVF and breeding terms](${url("/knowledge/glossary")})`,
    `- [Privacy policy](${url("/legal/privacy")})`,
    "",
  );

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
