/**
 * The team alert email for a new enquiry. Table layout and inline styles only, so it renders
 * the same in Gmail, Outlook and phone mail apps. No images: the brand is a text wordmark,
 * which also means nothing breaks when a mail app blocks images.
 */

export interface EnquiryEmailData {
  name: string;
  phone: string; // 91XXXXXXXXXX
  city: string;
  serviceLabel: string;
  submittedAt: string; // ISO
}

/** Mirrors the colour tokens in app/globals.css (emails cannot use CSS variables). */
const C = {
  page: "#f7f6f4", // mist
  card: "#ffffff",
  deep: "#241a14",
  bark: "#38271d",
  brown: "#8d4a2d",
  clay: "#f4ebe6",
  sand: "#e9d7cd",
  stone: "#e4e1dc",
  graphite: "#5a564f",
  ink: "#23211e",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** 919898989898 -> +91 98989 89898 */
export function prettyPhone(p: string): string {
  const d = p.slice(-10);
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

function received(iso: string): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(new Date(iso))
      .map((p) => [p.type, p.value]),
  );
  // e.g. "Wed 25 Nov 2026, 10:54 AM IST"
  return `${parts.weekday} ${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute} ${parts.dayPeriod.toUpperCase()} IST`;
}

const firstName = (name: string) => name.trim().split(/\s+/)[0];

export function enquiryEmailSubject(d: EnquiryEmailData): string {
  return `New enquiry: ${d.name} (${d.city}), ${d.serviceLabel}`;
}

export function enquiryEmailText(d: EnquiryEmailData): string {
  return [
    "New consultation request from hebbevugenetics.com",
    "",
    `Name:          ${d.name}`,
    `Mobile:        ${prettyPhone(d.phone)}`,
    `City:          ${d.city}`,
    `Interested in: ${d.serviceLabel}`,
    `Received:      ${received(d.submittedAt)}`,
    "",
    `Call: tel:+${d.phone}`,
    `WhatsApp: https://wa.me/${d.phone}`,
  ].join("\n");
}

function button(href: string, label: string, primary: boolean): string {
  const bg = primary ? C.brown : C.card;
  const fg = primary ? "#ffffff" : C.brown;
  return `<td style="padding:0 8px 8px 0;">
    <a href="${href}" style="display:inline-block;background:${bg};color:${fg};border:2px solid ${C.brown};border-radius:8px;padding:12px 22px;font-family:${SANS};font-size:15px;font-weight:600;text-decoration:none;">${label}</a>
  </td>`;
}

function row(label: string, value: string, last = false): string {
  return `<tr>
    <td style="padding:14px 0;${last ? "" : `border-bottom:1px solid ${C.stone};`}font-family:${SANS};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.graphite};width:130px;vertical-align:top;">${label}</td>
    <td style="padding:14px 0;${last ? "" : `border-bottom:1px solid ${C.stone};`}font-family:${SANS};font-size:16px;color:${C.ink};vertical-align:top;">${value}</td>
  </tr>`;
}

export function enquiryEmailHtml(d: EnquiryEmailData): string {
  const name = esc(d.name);
  const city = esc(d.city);
  const service = esc(d.serviceLabel);
  const phone = prettyPhone(d.phone);
  const first = esc(firstName(d.name));

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(enquiryEmailSubject(d))}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${name} from ${city} wants to talk about: ${service}. Call ${phone}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

      <tr><td style="background:${C.deep};border-radius:12px 12px 0 0;padding:22px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-family:${SERIF};font-size:20px;color:#ffffff;letter-spacing:0.02em;">Hebbevu <span style="color:${C.sand};">Genetics</span></td>
          <td align="right" style="font-family:${SANS};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.sand};">New enquiry</td>
        </tr></table>
      </td></tr>

      <tr><td style="background:${C.card};padding:32px 32px 8px;">
        <p style="margin:0 0 6px;font-family:${SANS};font-size:13px;color:${C.graphite};">Consultation request from the website</p>
        <h1 style="margin:0 0 14px;font-family:${SERIF};font-size:30px;line-height:1.2;font-weight:normal;color:${C.deep};">${name}</h1>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:${C.clay};border-radius:999px;padding:6px 14px;font-family:${SANS};font-size:14px;font-weight:600;color:${C.brown};">${service}</td>
          <td style="padding-left:12px;font-family:${SANS};font-size:14px;color:${C.graphite};">${city}</td>
        </tr></table>
      </td></tr>

      <tr><td style="background:${C.card};padding:24px 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          ${button(`tel:+${d.phone}`, `Call ${first}`, true)}
          ${button(`https://wa.me/${d.phone}`, "WhatsApp", false)}
        </tr></table>
      </td></tr>

      <tr><td style="background:${C.card};padding:8px 32px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.stone};">
          ${row("Mobile", `<a href="tel:+${d.phone}" style="color:${C.ink};text-decoration:none;">${phone}</a>`)}
          ${row("City", city)}
          ${row("Interested in", service)}
          ${row("Received", received(d.submittedAt), true)}
        </table>
      </td></tr>

      <tr><td style="background:${C.bark};border-radius:0 0 12px 12px;padding:18px 32px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.sand};">
        Sent automatically from the Book a Consultation form on hebbevugenetics.com. The visitor was told our team will call them on this number.
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
