/**
 * Visitor events for GA4, sent through the GTM dataLayer. GTM forwards every event named
 * here to GA4 with its parameters (one "GA4 - site events" tag), so adding an event means
 * adding it to TrackEvent and to that tag's trigger regex in GTM.
 * Never send personal data (name, phone, city) - GA4's terms forbid it.
 */

export type TrackEvent =
  | "generate_lead" // enquiry form delivered
  | "enquiry_start" // first interaction with the enquiry form
  | "enquiry_error" // validation or delivery failure
  | "contact_click" // phone, WhatsApp or email link
  | "cta_click" // any link to /book
  | "video_play";

/** Every parameter key we use. Each push clears the others so GTM never reuses a stale value. */
const KEYS = [
  "contact_method",
  "link_location",
  "link_text",
  "link_url",
  "service",
  "form_location",
  "error_type",
  "video_title",
  "video_id",
  "video_kind",
] as const;

export type TrackParams = Partial<Record<(typeof KEYS)[number], string>>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const cleared = Object.fromEntries(KEYS.map((k) => [k, undefined]));
  (window.dataLayer ??= []).push({ ...cleared, ...params, event });
}
