import { notifyByEmail } from "@/lib/leads/notify.ts";
import { getCrmProvider } from "@/lib/leads/provider.ts";
import { validateLead } from "@/lib/leads/validate.ts";

// Best-effort per-instance limit; the CRM is the system of record.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function limited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip, Date.now())) {
    return Response.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = validateLead(body);
  if (!result.ok) return Response.json({ ok: false, errors: result.errors }, { status: 422 });
  const lead = result.lead;

  // The CRM and the email copy are two independent ways of receiving the enquiry.
  // Both are attempted, and the enquiry counts as received if either one lands, so
  // a CRM outage does not turn a real enquiry into an error message.
  const crm = getCrmProvider();
  const [crmResult, emailResult] = await Promise.all([
    crm
      ? crm.submit(lead).catch((e) => ({ ok: false as const, error: e instanceof Error ? e.message : String(e) }))
      : Promise.resolve({ ok: false as const, error: "No CRM configured (GHL_API_KEY / GHL_LOCATION_ID missing)" }),
    notifyByEmail(lead),
  ]);

  if (!crmResult.ok) console.error(`[leads] CRM (${crm?.name ?? "none"}): ${crmResult.error}`);
  if (!emailResult.ok) console.error(`[leads] email copy: ${emailResult.error}`);

  if (crmResult.ok || emailResult.ok) {
    // Logged so an enquiry that reached only one of the two is still traceable.
    console.log(`[leads] ${lead.kind} from ${lead.email}: crm=${crmResult.ok} email=${emailResult.ok}`);
    return Response.json({ ok: true });
  }

  console.error(`[leads] LOST ENQUIRY ${JSON.stringify(lead)}`);
  return Response.json({ ok: false, error: "We could not send your details right now. Please call or WhatsApp us on +91 70616 99889." }, { status: 502 });
}
