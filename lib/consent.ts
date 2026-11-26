/**
 * Cookie consent (privacy policy §4). Analytics (GA4 via GTM) and advertising (Meta Pixel)
 * load only after the visitor opts in. The choice lives in localStorage; nothing is sent
 * anywhere. Bump the key's version to ask everyone again after a material policy change.
 */

export interface Consent {
  analytics: boolean;
  advertising: boolean;
}

const KEY = "hg-consent-v1";
/** Fired on window when the choice changes. */
export const CONSENT_CHANGE = "hg:consent-change";
/** Any link to this hash opens the cookie settings panel (footer, privacy policy). */
export const COOKIE_SETTINGS_HASH = "#cookie-settings";

/** In-memory copy, so a choice still applies when storage is blocked (private mode). */
let memory: string | null = null;

/** Raw stored choice: a stable string, usable as a useSyncExternalStore snapshot. */
export function consentSnapshot(): string | null {
  try {
    return window.localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Partial<Consent>;
    return { analytics: c.analytics === true, advertising: c.advertising === true };
  } catch {
    return null;
  }
}

export const readConsent = () => parseConsent(consentSnapshot());

export function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_CHANGE, cb);
  return () => window.removeEventListener(CONSENT_CHANGE, cb);
}

const ANALYTICS_COOKIE = /^(_ga|_gid|_gat)/;
const ADVERTISING_COOKIE = /^(_gcl_|_fbp|_fbc)/;

/**
 * Delete Google/Meta cookies for every purpose not consented to. Runs on each page load,
 * because GA writes its cookie once more as a page unloads, and to clean up visitors
 * whose cookies were set before the banner existed.
 */
export function clearUnconsentedCookies(c: Consent | null) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0].trim();
    const drop = (!c?.analytics && ANALYTICS_COOKIE.test(name)) || (!c?.advertising && ADVERTISING_COOKIE.test(name));
    if (!drop) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/** gtag() pushes its `arguments` object, which is the shape GTM's consent API expects. */
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer ??= []).push(arguments as unknown as Record<string, unknown>);
}

export function saveConsent(next: Consent) {
  const prev = readConsent();
  memory = JSON.stringify(next);
  try {
    window.localStorage.setItem(KEY, memory);
  } catch {
    // Private mode etc.: the in-memory copy applies for this page view.
  }
  // Tell Google Consent Mode, in case GTM is already running (e.g. advertising granted later).
  // Before GTM loads, its own consent default (set in Analytics) already carries the choice.
  if ("google_tag_manager" in window) {
    const ads = next.advertising ? "granted" : "denied";
    gtag("consent", "update", { ad_storage: ads, ad_user_data: ads, ad_personalization: ads });
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGE, { detail: next }));
  // Scripts already running cannot be unloaded: reload without them (cookies are cleared on load).
  const withdrawn = (prev?.analytics && !next.analytics) || (prev?.advertising && !next.advertising);
  if (withdrawn) window.location.reload();
  else clearUnconsentedCookies(next);
}
