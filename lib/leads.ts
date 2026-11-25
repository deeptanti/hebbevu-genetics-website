/**
 * Lead delivery for the enquiry form. Server-only: reads secrets from env.
 *
 * Env vars (set in Vercel, never committed):
 *   TELECRM_ENTERPRISE_ID  TeleCRM workspace id (Hebbevu Corporate)
 *   TELECRM_API_KEY        TeleCRM enterprise API token
 *   RESEND_API_KEY         Resend API key for the team alert email
 *   ENQUIRY_EMAIL_TO       Team inbox(es), comma separated
 *   ENQUIRY_EMAIL_FROM     Verified sender, e.g. "Hebbevu Genetics <leads@hebbevugenetics.com>"
 */

export interface Lead {
  name: string;
  phone: string;
  district: string;
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

export async function sendToTeleCRM(lead: Lead): Promise<DeliveryResult> {
  const enterpriseId = process.env.TELECRM_ENTERPRISE_ID;
  const apiKey = process.env.TELECRM_API_KEY;
  if (!enterpriseId || !apiKey) {
    console.warn("[enquiry] TeleCRM not configured; skipping");
    return "skipped";
  }

  try {
    const res = await fetch(`https://api.telecrm.in/enterprise/${enterpriseId}/autoupdatelead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        fields: {
          name: lead.name,
          phone: normalisePhone(lead.phone),
          location: lead.district,
          lead_source: "Hebbevu Genetics Website",
          message: `Hebbevu Genetics website: ${lead.serviceLabel}`,
        },
        actions: [
          {
            type: "SYSTEM_NOTE",
            text: `Enquiry from hebbevugenetics.com/book. Interested in: ${lead.serviceLabel}. District: ${lead.district}.`,
          },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[enquiry] TeleCRM rejected lead", res.status, await res.text().catch(() => ""));
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[enquiry] TeleCRM request failed", err);
    return "failed";
  }
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendTeamEmail(lead: Lead): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_EMAIL_TO?.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.ENQUIRY_EMAIL_FROM ?? "Hebbevu Genetics <onboarding@resend.dev>";
  if (!apiKey || !to?.length) {
    console.warn("[enquiry] Team email not configured; skipping");
    return "skipped";
  }

  const phone = `+${normalisePhone(lead.phone)}`;
  const when = new Date(lead.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Mobile", phone],
    ["District", lead.district],
    ["Interested in", lead.serviceLabel],
    ["Submitted", `${when} IST`],
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to,
        subject: `New enquiry: ${lead.name}, ${lead.district} (${lead.serviceLabel})`,
        text: [...rows.map(([k, v]) => `${k}: ${v}`), "", "Please call them back."].join("\n"),
        html: `<p>New enquiry from hebbevugenetics.com</p><table cellpadding="6">${rows
          .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
          .join("")}</table><p><a href="tel:${phone}">Call ${escape(phone)}</a></p>`,
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
