import Link from "next/link";
import type { ArticleBlock } from "@/content/types";
import { BulletList } from "./BulletList";

/** Renders parsed article blocks. Article H1 is the page title; body runs H2 → H3. Capped at 720px. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex max-w-prose flex-col gap-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="type-h2 mt-6 text-deep first:mt-0">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="type-h3 mt-4 text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={b.strong ? "type-subheading text-ink" : "type-body text-ink"}>
                {b.text}
              </p>
            );
          case "ul":
            return <BulletList key={i} items={b.items} />;
          case "link":
            return (
              <p key={i}>
                <Link href={b.href} className="transition-ui type-body font-semibold text-brown underline underline-offset-4 hover:text-brown-dark">
                  {b.label} →
                </Link>
              </p>
            );
        }
      })}
    </div>
  );
}
