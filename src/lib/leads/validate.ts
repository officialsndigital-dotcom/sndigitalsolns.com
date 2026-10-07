import type { Lead, LeadKind } from "./types.ts";

const KINDS: LeadKind[] = ["consultation", "demo", "contact", "calculator"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ()-]{7,20}$/;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export type Validation = { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> };

/** Validates an untrusted request body. Honeypot field "company_url" must be empty. */
export function validateLead(body: unknown): Validation {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const kind = str(b.kind, 20) as LeadKind;
  if (!KINDS.includes(kind)) errors.kind = "Unknown form.";
  const name = str(b.name, 120);
  if (name.length < 2) errors.name = "Please enter your name.";
  const email = str(b.email, 160).toLowerCase();
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  const phone = str(b.phone, 25);
  if (kind !== "calculator" && kind !== "contact" && !phone) errors.phone = "Please enter your phone number.";
  else if (phone && !PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (str(b.company_url, 200)) errors.form = "Submission rejected.";
  if (b.consent !== true) errors.consent = "Please agree to be contacted.";

  if (Object.keys(errors).length) return { ok: false, errors };

  const attribution: Record<string, string> = {};
  if (b.attribution && typeof b.attribution === "object") {
    for (const [k, v] of Object.entries(b.attribution as Record<string, unknown>).slice(0, 12)) {
      if (/^[a-z_]{1,30}$/.test(k)) attribution[k] = str(v, 300);
    }
  }

  return {
    ok: true,
    lead: {
      kind,
      name,
      email,
      phone: phone || undefined,
      company: str(b.company, 160) || undefined,
      website: str(b.website, 200) || undefined,
      interest: str(b.interest, 120) || undefined,
      message: str(b.message, 3000) || undefined,
      details: str(b.details, 6000) || undefined,
      page: str(b.page, 300) || undefined,
      attribution,
    },
  };
}
