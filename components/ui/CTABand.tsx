import Image from "next/image";
import type { ReactNode } from "react";
import { photos, type Photo } from "@/content/media";
import { Button, ButtonGroup } from "./Button";
import { Container } from "../layout/Container";
import { DnaHelix } from "../visuals/DnaHelix";

/**
 * CTABand — THE conversion block. Exactly ONE per page, placed last.
 * A contained brand-brown card on a light ground, so it never merges with the deep footer
 * below it. Copy + one primary action on the left; a farm photograph on the right; a slow
 * DNA helix behind the copy.
 */
export interface CTABandProps {
  heading: string;
  body?: string;
  kicker?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Extra content under the buttons, e.g. phone/WhatsApp line. */
  footnote?: ReactNode;
  /** Photo on the right. Defaults to the herd. */
  photo?: Photo;
}

export function CTABand({ heading, body, kicker, primary, secondary, footnote, photo = photos["farm/herd-walking"] }: CTABandProps) {
  return (
    <section aria-labelledby="cta-band-heading" data-cta-band className="bg-white py-8 md:py-9">
      <Container>
        <div data-ground="dark" className="relative grid overflow-hidden rounded-lg bg-brown lg:grid-cols-5">
          <DnaHelix
            ground="dark"
            turns={2}
            rungs={26}
            speed={12}
            className="absolute -bottom-6 -left-6 w-3/5 opacity-25"
          />
          <div className="relative flex flex-col gap-5 p-6 md:p-8 lg:col-span-3">
            {kicker && <p className="type-subheading text-mist">{kicker}</p>}
            <h2 id="cta-band-heading" className="type-h2 text-white">
              {heading}
            </h2>
            {body && <p className="type-lede max-w-prose text-mist">{body}</p>}
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
          <div className="relative hidden min-h-10 lg:col-span-2 lg:block">
            <Image src={photo.src} alt="" fill sizes="480px" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
