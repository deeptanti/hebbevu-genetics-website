"use server";

import { enquiryCopy, serviceInterests } from "@/content/enquiry";
import { sendTeamEmail, sendToTeleCRM } from "@/lib/leads";

export interface EnquiryState {
  status: "idle" | "error" | "success";
  errors?: Partial<Record<"name" | "phone" | "city" | "service", string>>;
  values?: Record<string, string>;
  /** Shown above the submit button when the enquiry could not be delivered anywhere. */
  formError?: string;
}

const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

/**
 * Validates the enquiry, then delivers it to TeleCRM (as a lead) and to the team inbox
 * (as an email) in parallel. Succeeds if at least one channel accepted it; otherwise the
 * visitor is asked to call, so a lead is never silently dropped.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const values = {
    name: String(form.get("name") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    city: String(form.get("city") ?? "").trim(),
    service: String(form.get("service") ?? "").trim(),
  };
  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE.test(values.phone)) errors.phone = "Please enter a 10-digit Indian mobile number.";
  if (values.city.length < 2) errors.city = "Please tell us your city or town.";
  if (!serviceInterests.some((s) => s.value === values.service)) errors.service = "Please choose what you are interested in.";

  if (Object.keys(errors).length) return { status: "error", errors, values };

  const lead = {
    ...values,
    serviceLabel: serviceInterests.find((s) => s.value === values.service)!.label,
    submittedAt: new Date().toISOString(),
  };
  console.info("[enquiry]", lead);

  const [crm, email] = await Promise.all([sendToTeleCRM(lead), sendTeamEmail(lead)]);
  console.info("[enquiry] delivery", { crm, email });

  if (crm !== "sent" && email !== "sent") {
    return { status: "error", values, formError: enquiryCopy.deliveryError };
  }
  return { status: "success" };
}
