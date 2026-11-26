"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { enquiryCopy, serviceInterests } from "@/content/enquiry";
import { track } from "@/lib/analytics";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";

const initial: EnquiryState = { status: "idle" };

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const started = useRef(false);
  const service = useRef("");

  // One analytics event per server response (state is a new object each time).
  useEffect(() => {
    const form_location = window.location.pathname;
    if (state.status === "success") track("generate_lead", { service: service.current, form_location });
    if (state.status === "error")
      track("enquiry_error", {
        service: service.current,
        form_location,
        error_type: state.formError ? "delivery" : `validation:${Object.keys(state.errors ?? {}).join(",")}`,
      });
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-graphite bg-mist p-5">
        <p className="type-subheading text-ink">{enquiryCopy.success}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  return (
    <form
      action={action}
      noValidate
      className="flex flex-col gap-5"
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        track("enquiry_start", { form_location: window.location.pathname });
      }}
      onSubmit={(ev) => {
        service.current = String(new FormData(ev.currentTarget).get("service") ?? "");
      }}
    >
      <Field label="Your name" name="name" required autoComplete="name" defaultValue={v.name} error={e.name} />
      <Field
        label="Mobile number"
        name="phone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        hint="We’ll call you on this number. WhatsApp works too."
        defaultValue={v.phone}
        error={e.phone}
      />
      <Field label="City or town" name="city" required autoComplete="address-level2" defaultValue={v.city} error={e.city} />
      <Field
        as="select"
        label="What are you interested in?"
        name="service"
        required
        placeholder="Choose one"
        options={serviceInterests.map((s) => ({ value: s.value, label: s.label }))}
        defaultValue={v.service ?? defaultService ?? ""}
        error={e.service}
      />
      <div className="flex flex-col gap-3">
        {state.formError && (
          <p role="alert" className="type-small text-ink">
            {state.formError}
          </p>
        )}
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? "Sending…" : enquiryCopy.submit}
        </Button>
        <p className="type-small text-graphite">{enquiryCopy.privacy}</p>
      </div>
    </form>
  );
}
