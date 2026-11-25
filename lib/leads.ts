/**
 * Lead delivery for the enquiry form. Server-only: reads secrets from env.
 *
 * Env vars (set in Vercel, never committed):
 *   TELECRM_ENTERPRISE_ID   TeleCRM workspace id (Hebbevu Corporate)
 *   TELECRM_API_KEY         TeleCRM **Async** API token (a Sync token is rejected with 403)
 *   TELECRM_ENQUIRY_ACTION  Optional. Custom action code for the timeline entry, e.g. "ACTION_1001".
 *                           The action needs a text field with API name "note".
 *   RESEND_API_KEY          Resend API key for the team alert email
 *   ENQUIRY_EMAIL_TO        Team inbox(es), comma separated
 *   ENQUIRY_EMAIL_FROM      Verified sender, e.g. "Hebbevu Genetics <leads@hebbevugenetics.com>"
 */

import { enquiryEmailHtml, enquiryEmailSubject, enquiryEmailText } from "./email/enquiry";

export interface Lead {
  name: string;
  phone: string;
  city: string;
  service: string;
  serviceLabel: string;
  submittedAt: string;
}

export type DeliveryResult = "sent" | "skipped" | "failed";

/** Normalises any accepted Indian mobile format to 91XXXXXXXXXX. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return `91${digits.slice(-10)}`;
}

const TELECRM_URL = (enterpriseId: string) => `https://next-api.telecrm.in/enterprise/${enterpriseId}/autoupdatelead`;

interface AsyncResult {
  status?: "Created" | "Updated" | "Error";
  errorMessage?: string;
  modifiedLeadIds?: string[];
}

async function telecrmUpsert(enterpriseId: string, apiKey: string, body: object): Promise<AsyncResult> {
  const res = await fetch(TELECRM_URL(enterpriseId), {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  const text = await res.text().catch(() => "");
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  const json = JSON.parse(text) as AsyncResult | AsyncResult[];
  const result = Array.isArray(json) ? json[0] : json;
  if (result?.status === "Error") throw new Error(`TeleCRM error: ${result.errorMessage}`);
  return result ?? {};
}

/**
 * Never overwrites an existing lead. TeleCRM's Async API is an upsert that leaves fields it is
 * not sent unchanged, so:
 *   1. Send only the phone (the lead identifier) plus the "Website Enquiry" timeline entry.
 *      An existing lead just gains the timeline entry; nothing on it changes.
 *   2. Only if TeleCRM reports the lead as Created, fill in name, city, source and message.
 */
export async function sendToTeleCRM(lead: Lead): Promise<DeliveryResult> {
  const enterpriseId = process.env.TELECRM_ENTERPRISE_ID;
  const apiKey = process.env.TELECRM_API_KEY;
  const actionCode = process.env.TELECRM_ENQUIRY_ACTION;
  if (!enterpriseId || !apiKey) {
    console.warn("[enquiry] TeleCRM not configured; skipping");
    return "skipped";
  }

  const phone = normalisePhone(lead.phone);
  const note = [
    "Enquiry from the Hebbevu Genetics website (hebbevugenetics.com/book).",
    `Name given: ${lead.name}`,
    `City: ${lead.city}`,
    `Interested in: ${lead.serviceLabel}`,
  ].join("\n");

  try {
    const first = await telecrmUpsert(enterpriseId, apiKey, {
      fields: { phone },
      ...(actionCode ? { actions: [{ type: actionCode, fields: { note } }] } : {}),
    });
    console.info("[enquiry] TeleCRM", first.status, first.modifiedLeadIds);

    if (first.status === "Created") {
      await telecrmUpsert(enterpriseId, apiKey, {
        fields: {
          phone,
          name: lead.name,
          location: lead.city,
          lead_source: "Hebbevu Genetics Website",
          message: `Hebbevu Genetics website: ${lead.serviceLabel}`,
        },
      });
    }
    return "sent";
  } catch (err) {
    console.error("[enquiry] TeleCRM request failed", err);
    return "failed";
  }
}

export async function sendTeamEmail(lead: Lead): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_EMAIL_TO?.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.ENQUIRY_EMAIL_FROM ?? "Hebbevu Genetics <onboarding@resend.dev>";
  if (!apiKey || !to?.length) {
    console.warn("[enquiry] Team email not configured; skipping");
    return "skipped";
  }

  const data = { ...lead, phone: normalisePhone(lead.phone) };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to,
        subject: enquiryEmailSubject(data),
        text: enquiryEmailText(data),
        html: enquiryEmailHtml(data),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend rejected email", res.status, await res.text().catch(() => ""));
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[enquiry] Resend request failed", err);
    return "failed";
  }
}
