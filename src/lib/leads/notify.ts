import nodemailer from "nodemailer";
import { noteFor } from "./ghl.ts";
import type { Lead } from "./types.ts";

/**
 * Emails a copy of every website enquiry to the team, alongside the CRM record.
 * Credentials come from server environment variables only; with none set this
 * is a no-op, so a missing mailbox never costs us the lead.
 */
export async function notifyByEmail(lead: Lead): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!host || !user || !pass || !to) return;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

  const subject = `Website ${lead.kind}: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`;
  const text = [
    subject,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    "",
    noteFor(lead),
  ]
    .filter(Boolean)
    .join("\n");

  await transport.sendMail({
    from: process.env.SMTP_FROM ?? user,
    to,
    replyTo: lead.email,
    subject,
    text,
  });
}
