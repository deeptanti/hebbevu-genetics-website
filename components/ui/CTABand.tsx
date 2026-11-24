import type { ReactNode } from "react";
import { Button, ButtonGroup } from "./Button";
import { Section } from "../layout/Section";
import { DnaHelix } from "../visuals/DnaHelix";

/**
 * CTABand — THE dark conversion block. Exactly ONE per page (brief §6), on `deep`.
 * One primary action (mist on dark), optional secondary.
 */
export interface CTABandProps {
  heading: string;
  body?: string;
  kicker?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Extra content under the buttons, e.g. phone/WhatsApp line. */
  footnote?: ReactNode;
}

export function CTABand({ heading, body, kicker, primary, secondary, footnote }: CTABandProps) {
  return (
    <Section tone="deep" labelledBy="cta-band-heading" className="relative overflow-hidden">
      <DnaHelix ground="dark" turns={2.5} rungs={30} className="absolute top-1/2 -right-10 hidden w-1/2 -translate-y-1/2 opacity-40 lg:block" />
      <div className="relative flex max-w-prose flex-col gap-5">
        {kicker && <p className="type-subheading text-mist">{kicker}</p>}
        <h2 id="cta-band-heading" className="type-h2 text-mist">
          {heading}
        </h2>
        {body && <p className="type-body text-mist">{body}</p>}
        <ButtonGroup className="pt-2">
          <Button href={primary.href} variant="primary" ground="dark" arrow>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary" ground="dark">
              {secondary.label}
            </Button>
          )}
        </ButtonGroup>
        {footnote && <div className="type-small text-mist">{footnote}</div>}
      </div>
    </Section>
  );
}
