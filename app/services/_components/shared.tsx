import { Check, Minus } from "lucide-react";
import { CTABand, DataTable, Icon, ICON_STROKE } from "@/components/ui";
import { pricing, serviceGuidelines, servicesCta } from "@/content/services";
import { primaryCta } from "@/content/site";
import { photos, type PhotoKey } from "@/content/media";
import { cn } from "@/lib/cn";

/** The services CTA band (client doc: "Start Improving Your Herd Today"). One per page. */
export function ServicesCTA({ service, photo }: { service?: string; photo?: PhotoKey }) {
  return (
    <CTABand
      heading={servicesCta.heading}
      body={servicesCta.body}
      primary={{ label: primaryCta.label, href: service ? `/book?service=${service}` : primaryCta.href }}
      secondary={{ label: "Speak with our experts", href: "/contact" }}
      photo={photo ? photos[photo] : undefined}
    />
  );
}

/** "Important Information" as fact tiles: icon, the value set large, the label small. */
const guidelineIcons = ["package", "scale", "truck", "shield"] as const;

export function GuidelinesList({ className }: { className?: string }) {
  return (
    <dl className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {serviceGuidelines.map((g, i) => (
        <div key={g.label} className="flex flex-col gap-3 rounded-lg bg-clay p-5">
          <dt className="type-label order-3 text-graphite">{g.label}</dt>
          <dd className={cn("order-2 text-ink", g.value.length > 24 ? "type-subheading" : "type-h3")}>{g.value}</dd>
          <dd aria-hidden="true" className="order-1">
            <Icon name={guidelineIcons[i % guidelineIcons.length]} className="size-7 text-brown" />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Numbered steps/options, editorial rather than boxed: a large serif numeral over a brown rule.
 * Steps (a sequence) get a connecting rule across the row.
 */
export function NumberedTiles({ items, prefix }: { items: string[]; prefix: string }) {
  const sequence = prefix === "Step";
  return (
    <ol className={cn("grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2", items.length > 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((label, i) => (
        <li key={label} className="group relative flex flex-col gap-3">
          <span className="type-h1 text-sand transition-ui group-hover:text-brown" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={cn("block h-px w-full", sequence ? "bg-brown" : "bg-stone")} aria-hidden="true" />
          <span className="type-label text-brown">
            {prefix} {i + 1}
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

