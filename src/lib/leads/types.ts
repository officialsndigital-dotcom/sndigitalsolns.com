// Provider-neutral lead model. Website forms post this shape to /api/leads; the
// configured CRMProvider decides where it goes.

export type LeadKind = "consultation" | "demo" | "contact" | "calculator";

export type Lead = {
  kind: LeadKind;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  interest?: string;
  message?: string;
  /** Free-form extra data, e.g. a calculator result summary. Stored as a note. */
  details?: string;
  page?: string;
  attribution?: Record<string, string>;
};

export type CrmResult = { ok: true; contactId?: string } | { ok: false; error: string };

export interface CRMProvider {
  readonly name: string;
  submit(lead: Lead): Promise<CrmResult>;
}
