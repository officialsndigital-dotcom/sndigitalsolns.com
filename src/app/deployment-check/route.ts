import { describeSmtp, notifyByEmail, smtpConfigured, verifySmtp } from "@/lib/leads/notify.ts";
import { getCrmProvider } from "@/lib/leads/provider.ts";
import type { Lead } from "@/lib/leads/types.ts";

// Marked plainly so it is obvious in the CRM and the inbox, and easy to remove.
// No phone number: HighLevel matches an upsert on phone when the email is new,
// so a real number here would merge the test into somebody's existing contact.
const SELF_TEST: Lead = {
  kind: "contact",
  name: "Deployment Self Test",
  email: "website-selftest@sndigitalsolns.com",
  company: "S N Digital Solns (internal test)",
  message: "Automated check that a website enquiry reaches the CRM and the inbox. Safe to delete.",
  page: "/deployment-check/",
};

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
      // Deliberately a contacts call: that is the scope the website actually needs,
      // so a pass here means a real enquiry would be accepted.
      const res = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`, {
        headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json" },
      });
      ghl = { ...ghl, status: res.status, error: res.ok ? undefined : (await res.text()).slice(0, 300) };
    } catch (e) {
      ghl = { ...ghl, error: e instanceof Error ? e.message : String(e) };
    }
  }

  const smtp = {
    ...describeSmtp(),
    ...(smtpConfigured() ? await verifySmtp() : { ok: false, error: "SMTP not configured" }),
  };

  // ?selftest=1 puts one clearly-labelled enquiry through the real code path, so
  // the write permissions can be proved without waiting for a visitor.
  let selfTest: { crm: unknown; email: unknown } | undefined;
  if (new URL(request.url).searchParams.get("selftest") === "1") {
    const crm = getCrmProvider();
    selfTest = {
      crm: crm ? await crm.submit(SELF_TEST).catch((e) => ({ ok: false, error: String(e) })) : { ok: false, error: "No CRM configured" },
      email: await notifyByEmail(SELF_TEST),
    };
  }

  return Response.json({
    selfTest,
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
