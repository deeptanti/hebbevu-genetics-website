"use server";

import { serviceInterests } from "@/content/enquiry";

export interface EnquiryState {
  status: "idle" | "error" | "success";
  errors?: Partial<Record<"name" | "phone" | "district" | "service", string>>;
  values?: Record<string, string>;
}

const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

/**
 * Validates the enquiry. DELIVERY IS NOT WIRED: the destination (TeleCRM, email, sheet)
 * has not been chosen. Until it is, valid submissions are only logged server-side.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const values = {
    name: String(form.get("name") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    district: String(form.get("district") ?? "").trim(),
    service: String(form.get("service") ?? "").trim(),
  };
  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE.test(values.phone)) errors.phone = "Please enter a 10-digit Indian mobile number.";
  if (values.district.length < 2) errors.district = "Please tell us your district.";
  if (!serviceInterests.some((s) => s.value === values.service)) errors.service = "Please choose what you are interested in.";

  if (Object.keys(errors).length) return { status: "error", errors, values };

  // TODO(client): send to the chosen lead destination.
  console.info("[enquiry]", { ...values, at: new Date().toISOString() });
  return { status: "success" };
}
