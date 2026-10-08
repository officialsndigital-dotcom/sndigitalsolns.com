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

  const crm = getCrmProvider();
  if (!crm) {
    console.error("[leads] No CRM configured (GHL_API_KEY / GHL_LOCATION_ID missing); lead not stored.");
    return Response.json({ ok: false, error: "We could not send your details right now. Please call or email us." }, { status: 503 });
  }

  try {
    const sent = await crm.submit(result.lead);
    if (!sent.ok) {
      console.error(`[leads] ${crm.name}: ${sent.error}`);
      return Response.json({ ok: false, error: "We could not send your details right now. Please call or email us." }, { status: 502 });
    }
    // The CRM is the system of record, so a failed email never fails the form.
    await notifyByEmail(result.lead).catch((e) => console.error("[leads] email copy failed", e));
    return Response.json({ ok: true });
  } catch (e) {
    console.error(`[leads] ${crm.name} threw`, e);
    return Response.json({ ok: false, error: "We could not send your details right now. Please call or email us." }, { status: 502 });
  }
}
