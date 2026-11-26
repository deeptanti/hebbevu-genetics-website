"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cookieConsentCopy as copy } from "@/content/consent";
import { COOKIE_SETTINGS_HASH, readConsent, saveConsent, type Consent } from "@/lib/consent";
import { Button } from "../ui/Button";
import { Container } from "./Container";

/**
 * Cookie banner (privacy policy §4). Shown until the visitor chooses; reopened by any link
 * to #cookie-settings. Accept and Reject carry equal weight; "Choose" opens per-purpose
 * toggles. Strictly necessary cookies need no consent and are listed as always on.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [draft, setDraft] = useState<Consent>({ analytics: false, advertising: false });
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = (customise: boolean) => {
      setDraft(readConsent() ?? { analytics: false, advertising: false });
      setChoosing(customise);
      setOpen(true);
    };
    if (!readConsent()) show(false);
    if (window.location.hash === COOKIE_SETTINGS_HASH) show(true);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement) || !a.getAttribute("href")?.endsWith(COOKIE_SETTINGS_HASH)) return;
      e.preventDefault();
      show(true);
      requestAnimationFrame(() => panel.current?.focus());
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!open) return null;

  const decide = (c: Consent) => {
    setOpen(false);
    saveConsent(c);
  };

  return (
    <div
      ref={panel}
      role="region"
      aria-labelledby="cookie-consent-heading"
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-40 pb-4 outline-none md:pb-5"
    >
      <Container>
        <div className="flex flex-col gap-4 rounded-lg border border-graphite bg-white p-4 shadow-md md:p-5 lg:flex-row lg:items-end lg:justify-between lg:gap-7">
          <div className="flex max-w-prose flex-col gap-3">
            <h2 id="cookie-consent-heading" className="type-subheading text-deep">
              {copy.heading}
            </h2>
            <p className="type-small text-ink">
              {copy.body}{" "}
              <Link href="/legal/privacy#cookies" className="text-brown underline underline-offset-4 hover:text-brown-dark">
                {copy.policyLink}
              </Link>
            </p>
            {choosing && (
              <fieldset className="flex flex-col gap-3 pt-2">
                <legend className="sr-only">{copy.legend}</legend>
                <label className="type-small flex items-start gap-3 text-graphite">
                  <input type="checkbox" checked disabled className="mt-1 size-4 accent-brown" />
                  <span>
                    <strong className="font-semibold text-ink">{copy.necessary.label}</strong> {copy.necessary.text}
                  </span>
                </label>
                {(["analytics", "advertising"] as const).map((k) => (
                  <label key={k} className="type-small flex cursor-pointer items-start gap-3 text-graphite">
                    <input
                      type="checkbox"
                      checked={draft[k]}
                      onChange={(e) => setDraft((d) => ({ ...d, [k]: e.target.checked }))}
                      className="mt-1 size-4 cursor-pointer accent-brown"
                    />
                    <span>
                      <strong className="font-semibold text-ink">{copy[k].label}</strong> {copy[k].text}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            {choosing ? (
              <>
                <Button type="button" onClick={() => decide(draft)}>
                  {copy.save}
                </Button>
                <Button type="button" variant="secondary" onClick={() => decide({ analytics: true, advertising: true })}>
                  {copy.accept}
                </Button>
              </>
            ) : (
              <>
                <Button type="button" onClick={() => decide({ analytics: true, advertising: true })}>
                  {copy.accept}
                </Button>
                <Button type="button" variant="secondary" onClick={() => decide({ analytics: false, advertising: false })}>
                  {copy.reject}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setChoosing(true)}>
                  {copy.choose}
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
