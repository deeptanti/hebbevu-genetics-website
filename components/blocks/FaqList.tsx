import Link from "next/link";
import type { FaqItem } from "@/content/types";
import { Accordion } from "../ui/Accordion";

/** FAQ accordion - first answer open (brief §6). */
export function FaqList({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  return (
    <Accordion
      headingLevel={headingLevel}
      items={items.map((f) => ({
        id: `faq-${f.id}`,
        title: f.question,
        content: (
          <>
            <p>{f.answer}</p>
            {f.link && (
              <p className="mt-3">
                <Link href={f.link.href} className="transition-ui font-semibold text-brown underline underline-offset-4 hover:text-brown-dark">
                  {f.link.label} →
                </Link>
              </p>
            )}
          </>
        ),
      }))}
    />
  );
}
