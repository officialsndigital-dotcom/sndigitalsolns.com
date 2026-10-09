import nodemailer from "nodemailer";
import { site } from "@/lib/site.ts";
import type { Lead } from "./types.ts";

// Only the mailbox and its password have to be configured; the rest is the
// company's own mail service and inbox, which do not change per environment.
const HOST = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const PORT = Number(process.env.SMTP_PORT ?? 465);
const TO = process.env.LEAD_NOTIFY_EMAIL ?? `${site.emailUser}@${site.emailDomain}`;

export type NotifyResult = { ok: true } | { ok: false; error: string };

export function smtpConfigured() {
  return Boolean(HOST && TO && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transport() {
  return nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });
}

/** Checks the mailbox credentials without sending anything. Used by the health route. */
export async function verifySmtp(): Promise<NotifyResult> {
  if (!smtpConfigured()) return { ok: false, error: "SMTP not configured" };
  try {
    await transport().verify();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

const KIND_LABEL: Record<Lead["kind"], string> = {
  consultation: "Consultation request",
  demo: "Demo request",
  contact: "Contact form enquiry",
  calculator: "Pipeline calculator enquiry",
};

/**
 * Emails every website enquiry to the team, alongside the CRM record. Credentials
 * come from server environment variables only; with none set this is a no-op, so a
 * missing mailbox never costs us the lead.
 */
export async function notifyByEmail(lead: Lead): Promise<NotifyResult> {
  if (!smtpConfigured()) return { ok: false, error: "SMTP not configured" };

  const who = `${lead.name}${lead.company ? ` (${lead.company})` : ""}`;
  const subject = `New website enquiry: ${who}`;
  const rows: [string, string | undefined][] = [
    ["Type", KIND_LABEL[lead.kind]],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Website", lead.website],
    ["Interested in", lead.interest],
    ["Message", lead.message],
    ["Details", lead.details],
    ["Page", lead.page],
    ...Object.entries(lead.attribution ?? {}).map(([k, v]) => [k, v] as [string, string]),
  ];
  const present = rows.filter((r): r is [string, string] => Boolean(r[1]));

  const text = [subject, "", ...present.map(([k, v]) => `${k}: ${v}`), "", "Reply to this email to answer them directly."].join("\n");
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = [
    `<p style="margin:0 0 16px;font:700 18px/1.3 system-ui,sans-serif;color:#10214a">${esc(subject)}</p>`,
    `<table cellpadding="6" style="border-collapse:collapse;font:400 15px/1.5 system-ui,sans-serif;color:#0f172a">`,
    ...present.map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;color:#4a5672;white-space:nowrap">${esc(k)}</td><td style="vertical-align:top;white-space:pre-wrap">${esc(v)}</td></tr>`,
    ),
    `</table>`,
    `<p style="margin:16px 0 0;font:400 14px/1.5 system-ui,sans-serif;color:#4a5672">Reply to this email to answer them directly.</p>`,
  ].join("");

  try {
    await transport().sendMail({
      from: `"S N Digital Solns website" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
      to: TO,
      replyTo: `"${lead.name}" <${lead.email}>`,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Non-secret shape of the mail settings, for the deployment check. It gives the
 * mailbox address (public) and only the shape of the password, so a typo, a
 * stray quote or trailing whitespace can be spotted without revealing it.
 */
export function describeSmtp() {
  const pass = process.env.SMTP_PASS ?? "";
  return {
    host: HOST,
    port: PORT,
    user: process.env.SMTP_USER ?? null,
    to: TO,
    passLength: pass.length,
    passHasWhitespaceEnds: pass !== pass.trim(),
    passHasQuoteEnds: /^["'].*["']$/.test(pass),
  };
}
