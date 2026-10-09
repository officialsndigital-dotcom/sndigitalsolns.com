import { smtpConfigured, verifySmtp } from "@/lib/leads/notify.ts";

/**
 * Deployment check for the lead pipeline, so whether a real enquiry would reach
 * the CRM and the team's inbox can be answered without submitting a test form.
 * It reports which variables are set and whether the credentials actually work,
 * never their values, and it answers only to a caller who already knows the CRM
 * sub-account id, so it needs no secret of its own.
 */
export async function GET(request: Request) {
  const locationId = process.env.GHL_LOCATION_ID;
  const given = new URL(request.url).searchParams.get("token");
  if (!locationId || given !== locationId) return new Response("Not found", { status: 404 });

  const token = process.env.GHL_API_KEY;
  let ghl: { configured: boolean; status?: number; error?: string } = { configured: Boolean(token) };
  if (token) {
    try {
      const res = await fetch(`https://services.leadconnectorhq.com/locations/${locationId}`, {
        headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json" },
      });
      ghl = { ...ghl, status: res.status, error: res.ok ? undefined : (await res.text()).slice(0, 300) };
    } catch (e) {
      ghl = { ...ghl, error: e instanceof Error ? e.message : String(e) };
    }
  }

  const smtp = smtpConfigured() ? await verifySmtp() : { ok: false, error: "SMTP not configured" };

  return Response.json({
    env: Object.fromEntries(
      [
        "GHL_API_KEY",
        "GHL_LOCATION_ID",
        "GHL_PIPELINE_ID",
        "GHL_PIPELINE_STAGE_ID",
        "LEAD_NOTIFY_EMAIL",
        "SMTP_HOST",
        "SMTP_PORT",
        "SMTP_USER",
        "SMTP_PASS",
        "SMTP_FROM",
        "WORDPRESS_URL",
      ].map((k) => [k, Boolean(process.env[k])]),
    ),
    ghl,
    smtp,
  });
}
