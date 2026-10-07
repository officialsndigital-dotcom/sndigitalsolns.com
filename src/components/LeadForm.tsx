"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { LeadKind } from "@/lib/leads/types";
import { readAttribution, track } from "./Tracking";

type Option = { value: string; label: string; group?: string };

type Props = {
  kind: LeadKind;
  interests: Option[];
  defaultInterest?: string;
  /** Query-string key that preselects the interest, e.g. ?service=seo-aeo. */
  queryKey?: string;
  /** Booking calendar shown after a successful submission (form first, then calendar). */
  calendarUrl?: string;
  /** Per-interest calendars, e.g. a product's own demo calendar. Falls back to calendarUrl. */
  calendars?: Record<string, string>;
  submitLabel: string;
  messageLabel?: string;
};

type Errors = Record<string, string>;

const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100";

export function LeadForm({ kind, interests, defaultInterest, queryKey, calendarUrl: defaultCalendar, calendars, submitLabel, messageLabel = "What would you like to discuss?" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [calendarUrl, setCalendarUrl] = useState(defaultCalendar);
  const interestRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!queryKey) return;
    const q = new URLSearchParams(location.search).get(queryKey);
    const match = q && interests.find((i) => i.value === q || i.value.endsWith(`/${q}`));
    if (match && interestRef.current) interestRef.current.value = match.value;
  }, [queryKey, interests]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      kind,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      company: fd.get("company"),
      website: fd.get("website"),
      interest: fd.get("interest"),
      message: fd.get("message"),
      company_url: fd.get("company_url"),
      consent: fd.get("consent") === "on",
      page: location.pathname + location.search,
      attribution: readAttribution(),
    };
    setStatus("sending");
    setErrors({});
    setServerError("");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setFirstName(String(body.name ?? "").split(" ")[0]);
        setCalendarUrl(calendars?.[String(body.interest ?? "")] || defaultCalendar);
        setStatus("done");
        track("generate_lead", { form: kind, interest: body.interest });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error ?? (data.errors ? "" : "Something went wrong. Please try again."));
      setStatus("error");
    } catch {
      setServerError("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <p className="eyebrow">Step 2 of 2</p>
        <h2 className="mt-2 text-2xl font-extrabold text-navy-900">Thank you{firstName ? `, ${firstName}` : ""}. We have your details.</h2>
        {calendarUrl ? (
          <>
            <p className="mt-2 text-muted">Now pick a time that suits you.</p>
            {showCalendar ? (
              <iframe src={calendarUrl} title="Book a time" className="mt-6 h-[720px] w-full rounded-lg border border-line" loading="lazy" />
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setShowCalendar(true);
                    track("calendar_open", { form: kind });
                  }}
                  className="rounded-lg bg-amber-500 px-6 py-3.5 font-bold text-navy-900 hover:bg-amber-300"
                >
                  Book a Time
                </button>
                <button
                  type="button"
                  onClick={() => track("calendar_later", { form: kind })}
                  className="rounded-lg border border-navy-800 px-6 py-3.5 font-bold text-navy-800 hover:bg-navy-50"
                  aria-describedby="later-note"
                >
                  I&apos;ll book later
                </button>
              </div>
            )}
            <p id="later-note" className="mt-4 text-sm text-muted">
              If you book later, our team will contact you to arrange a time.
            </p>
          </>
        ) : (
          <p className="mt-2 text-muted">{kind === "contact" ? "We will reply by email or phone." : "Our team will contact you to arrange a time."}</p>
        )}
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <span id={`${k}-error`} className="mt-1 block text-sm font-semibold text-red-700">
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});
  const groups = [...new Set(interests.map((i) => i.group ?? ""))];

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-2xl border border-line bg-white p-6 md:p-8">
      {calendarUrl && <p className="eyebrow mb-4">Step 1 of 2: your details</p>}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block font-semibold">
          Full name *
          <input name="name" autoComplete="name" required className={field} {...aria("name")} />
          {err("name")}
        </label>
        <label className="block font-semibold">
          Work email *
          <input name="email" type="email" autoComplete="email" required className={field} {...aria("email")} />
          {err("email")}
        </label>
        <label className="block font-semibold">
          Phone or WhatsApp {kind === "contact" ? "" : "*"}
          <input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required={kind !== "contact"} className={field} {...aria("phone")} />
          {err("phone")}
        </label>
        <label className="block font-semibold">
          Company
          <input name="company" autoComplete="organization" className={field} />
        </label>
        <label className="block font-semibold">
          Website
          <input name="website" type="url" inputMode="url" placeholder="https://" className={field} />
        </label>
        <label className="block font-semibold">
          I&apos;m interested in
          <select ref={interestRef} name="interest" defaultValue={defaultInterest ?? ""} className={field}>
            <option value="">Not sure yet</option>
            {groups.map((g) =>
              g ? (
                <optgroup key={g} label={g}>
                  {interests
                    .filter((i) => i.group === g)
                    .map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                </optgroup>
              ) : (
                interests
                  .filter((i) => !i.group)
                  .map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))
              ),
            )}
          </select>
        </label>
        <label className="block font-semibold md:col-span-2">
          {messageLabel}
          <textarea name="message" rows={4} className={field} />
        </label>
        <div aria-hidden className="absolute -left-[9999px]">
          <label>
            Leave this empty
            <input name="company_url" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="flex gap-3 text-sm md:col-span-2">
          <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 flex-none accent-navy-800" {...aria("consent")} />
          <span>
            I agree to be contacted about my enquiry. See our{" "}
            <a href="/privacy-policy/" className="underline">
              privacy policy
            </a>
            .{err("consent")}
          </span>
        </label>
      </div>
      {serverError && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800">
          {serverError}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="mt-6 w-full rounded-lg bg-amber-500 px-6 py-4 text-lg font-bold text-navy-900 hover:bg-amber-300 disabled:opacity-60 md:w-auto">
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
