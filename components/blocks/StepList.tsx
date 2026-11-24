import { cn } from "@/lib/cn";
import { Reveal, RevealItem } from "../motion/Reveal";

/**
 * Numbered process steps (pipeline, what happens next). Editorial rather than boxed:
 * a large serif numeral over a brown rule, then the step's title and description.
 */
export function StepList({ steps, headingLevel = 3 }: { steps: { step: number | string; title: string; body: string }[]; headingLevel?: 3 | 4 }) {
  const H = `h${headingLevel}` as const;
  return (
    <Reveal
      as="ol"
      stagger={0.08}
      className={cn("grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2", steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}
    >
      {steps.map((s) => (
        <RevealItem as="li" key={s.step} className="group flex flex-col gap-3">
          <span aria-hidden="true" className="type-h1 text-sand transition-ui group-hover:text-brown">
            {String(s.step).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="block h-px w-full bg-brown" />
          <span className="type-label text-brown">Step {s.step}</span>
          <H className="type-subheading text-ink">{s.title}</H>
          <p className="type-small text-graphite">{s.body}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}
