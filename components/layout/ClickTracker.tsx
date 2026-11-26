"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

function locationOf(el: Element) {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "page";
}

/**
 * One document-level listener, so every phone/WhatsApp/email link and every link to /book
 * is tracked wherever it appears, with no per-component wiring.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute("href") ?? "";
      const base = {
        link_location: locationOf(a),
        link_text: (a.textContent ?? "").trim().slice(0, 100),
        link_url: href,
      };

      let method: string | undefined;
      if (href.startsWith("tel:")) method = "phone";
      else if (href.startsWith("mailto:")) method = "email";
      else if (/wa\.me|whatsapp\.com/.test(href)) method = "whatsapp";
      if (method) return track("contact_click", { ...base, contact_method: method });

      if (a.origin === window.location.origin && /^\/book\/?$/.test(a.pathname)) track("cta_click", base);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
