import type { CRMProvider, CrmResult, Lead } from "./types.ts";

// HighLevel (LeadConnector) API v2. Uses a Private Integration token scoped to
// the S N Digital Solns sub-account; both values come from server env only.
const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

const tagsFor = (lead: Lead) => ["website", `website-${lead.kind}`, ...(lead.interest ? [`interest-${lead.interest.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`] : [])];

export function noteFor(lead: Lead): string {
  const lines = [
    `Website ${lead.kind} enquiry`,
    lead.interest && `Interest: ${lead.interest}`,
    lead.company && `Company: ${lead.company}`,
    lead.website && `Website: ${lead.website}`,
    lead.message && `Message: ${lead.message}`,
    lead.details && `Details:\n${lead.details}`,
    lead.page && `Page: ${lead.page}`,
    ...Object.entries(lead.attribution ?? {}).map(([k, v]) => `${k}: ${v}`),
  ];
  return lines.filter(Boolean).join("\n");
}

export class GhlProvider implements CRMProvider {
  readonly name = "ghl";
  private token: string;
  private locationId: string;
  private fetcher: typeof fetch;

  constructor(token: string, locationId: string, fetcher: typeof fetch = fetch) {
    this.token = token;
    this.locationId = locationId;
    this.fetcher = fetcher;
  }

  private headers() {
    return { Authorization: `Bearer ${this.token}`, Version: VERSION, "Content-Type": "application/json", Accept: "application/json" };
  }

  async submit(lead: Lead): Promise<CrmResult> {
    const [firstName, ...rest] = lead.name.split(/\s+/);
    const res = await this.fetcher(`${BASE}/contacts/upsert`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        locationId: this.locationId,
        firstName,
        lastName: rest.join(" ") || undefined,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        companyName: lead.company,
        website: lead.website,
        source: `Website ${lead.kind}`,
        tags: tagsFor(lead),
      }),
    });
    if (!res.ok) return { ok: false, error: `GHL upsert failed (${res.status})` };
    const data = (await res.json()) as { contact?: { id?: string } };
    const contactId = data.contact?.id;
    if (contactId) {
      // A failed note should not lose the lead; the contact already exists.
      await this.fetcher(`${BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify({ body: noteFor(lead) }),
      }).catch(() => undefined);
    }
    return { ok: true, contactId };
  }
}
