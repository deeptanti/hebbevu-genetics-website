import { cn } from "@/lib/cn";

/** Numbered process steps (pipeline, embryo journey). Numbers in `label`, never decorative circles. */
export function StepList({ steps, headingLevel = 3 }: { steps: { step: number | string; title: string; body: string }[]; headingLevel?: 3 | 4 }) {
  const H = `h${headingLevel}` as const;
  return (
    <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((s) => (
        <li key={s.step} className={cn("flex flex-col gap-2 rounded-lg border border-stone bg-white p-4 md:p-5")}>
          <span className="type-label text-brown">Step {String(s.step).padStart(2, "0")}</span>
          <H className="type-subheading text-ink">{s.title}</H>
          <p className="type-small text-graphite">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
