# sndigitalsolns.com website

Next.js 16 (App Router, Cache Components) + Tailwind v4. The blog reads posts from WordPress over its REST API.

## Commands

    npm install
    npm run dev          # http://localhost:3000
    npm test             # calculator engine + lead validation tests
    npm run typecheck
    npx next build && npx next start

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| NEXT_PUBLIC_SITE_URL | build | Canonical URL, default https://sndigitalsolns.com |
| GHL_API_KEY | server only | HighLevel Private Integration token for the S N Digital Solns sub-account (contacts write, notes write) |
| GHL_LOCATION_ID | server only | HighLevel location id of that sub-account |
| GHL_PIPELINE_ID | server only | Optional. Opens an opportunity on this pipeline for every enquiry |
| GHL_PIPELINE_STAGE_ID | server only | Optional. Stage the new opportunity lands in (required with GHL_PIPELINE_ID) |
| LEAD_NOTIFY_EMAIL | server only | Optional. Mailbox that receives a copy of every enquiry. Defaults to info@sndigitalsolns.com |
| SMTP_USER / SMTP_PASS | server only | Mailbox the enquiry copy is sent from, e.g. website@sndigitalsolns.com. These two are the only mail settings that must be set |
| SMTP_HOST / SMTP_PORT | server only | Optional. Default to smtp.hostinger.com and 465 (TLS) |
| SMTP_FROM | server only | Optional from address; defaults to SMTP_USER |
| NEXT_PUBLIC_CONSULTATION_CALENDAR_URL | build | Optional. Overrides the default HighLevel booking widget (the 30 minute free consultation calendar) shown after the consultation form |
| WORDPRESS_URL | server | WordPress install for blog posts, e.g. https://cms.sndigitalsolns.com |
| NEXT_PUBLIC_GTM_ID | build | Google Tag Manager container id |
| NEXT_PUBLIC_GA4_ID | build | Optional. GA4 measurement id (G-...), loaded directly without GTM |
| NEXT_PUBLIC_META_PIXEL_ID | build | Optional. Meta (Facebook) pixel id |
| NEXT_PUBLIC_WHATSAPP_URL | build | Optional WhatsApp link override |
| NEXT_PUBLIC_NOINDEX | build | "true" on preview deployments: robots disallow + noindex |

The CRM record and the email copy are two independent routes for an enquiry. `/api/leads` attempts both and treats the enquiry as received if either lands,
so a CRM outage does not turn a real enquiry into an error message. Only when both fail does the form ask the visitor to call or WhatsApp, and the enquiry
is written to the server log so it can still be recovered.

`GET /api/health?token=<GHL_LOCATION_ID>` reports which variables are set and whether the CRM token and the mailbox credentials actually work. It returns
no values, and 404s without the right token.

## Where things live

- `src/content/` – all page copy (services, products, industries, case studies, portfolio). Only verified facts.
- `src/lib/leads/` – provider-neutral lead model, validation and the HighLevel provider.
- `src/tools/` – free tools. `registry.ts` lists them; `b2b-pipeline/` holds the calculator engine, recommendations, report and PDF.
- `src/lib/wp/posts.ts` – WordPress REST client (cached for hours).

## Tracking events (dataLayer)

cta_click, phone_click, email_click, whatsapp_click, demo_click, portfolio_click, generate_lead, calendar_open, calendar_later, tool_open, tool_calculate, tool_report_download. First-touch UTM / click-id attribution is kept for 90 days and sent with every form.
