import { Check, Minus } from "lucide-react";
import { CTABand, DataTable, ICON_STROKE } from "@/components/ui";
import { pricing, serviceGuidelines, servicesCta } from "@/content/services";
import { primaryCta } from "@/content/site";
import { cn } from "@/lib/cn";

/** The services CTA band (client doc: "Start Improving Your Herd Today"). One per page. */
export function ServicesCTA({ service }: { service?: string }) {
  return (
    <CTABand
      heading={servicesCta.heading}
      body={servicesCta.body}
      primary={{ label: primaryCta.label, href: service ? `/book?service=${service}` : primaryCta.href }}
      secondary={{ label: "Speak with our experts", href: "/contact" }}
    />
  );
}

/** "Important Information" as a label/value grid. */
export function GuidelinesList({ className }: { className?: string }) {
  return (
    <dl className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2", className)}>
      {serviceGuidelines.map((g) => (
        <div key={g.label} className="flex flex-col gap-2 border-t border-stone pt-4">
          <dt className="type-label text-graphite">{g.label}</dt>
          <dd className="type-subheading text-ink">{g.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered tiles (inclusions, options). Titles are h3 under the section's h2. */
export function NumberedTiles({ items, prefix }: { items: string[]; prefix: string }) {
  return (
    <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((label, i) => (
        <li key={label} className="flex flex-col gap-2 rounded-lg border border-stone bg-white p-4 md:p-5">
          <span className="type-label text-brown">
            {prefix} {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="type-subheading text-ink">{label}</h3>
        </li>
      ))}
    </ol>
  );
}

export const servicesCrumb = { label: "Services", href: "/services" };
export const homeCrumb = { label: "Home", href: "/" };

/** Which options each embryo type comes with (client doc "Available Options"). */
export function OptionMatrix() {
  type Col = "product" | "c0" | "c1" | "c2";
  const mark = (v: boolean) =>
    v ? (
      <span className="inline-flex items-center gap-2">
        <Check aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5 text-brown" />
        <span className="sr-only">Available</span>
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 text-graphite">
        <Minus aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5" />
        <span className="sr-only">Not offered</span>
      </span>
    );
  return (
    <DataTable<Col>
      caption="Service options available for each embryo type"
      hideCaption
      columns={[
        { key: "product", header: "Embryo type", rowHeader: true },
        ...pricing.matrixColumns.map((h, i) => ({ key: `c${i}` as Col, header: h })),
      ]}
      rows={pricing.matrix.map((r) => ({
        id: r.product,
        product: r.product,
        c0: mark(r.values[0]),
        c1: mark(r.values[1]),
        c2: mark(r.values[2]),
      }))}
    />
  );
}

