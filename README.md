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
| LEAD_NOTIFY_EMAIL | server only | Optional. Mailbox that receives a copy of every enquiry, e.g. info@sndigitalsolns.com |
| SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS | server only | Mailbox used to send that copy. Port defaults to 465 (TLS) |
| SMTP_FROM | server only | Optional from address; defaults to SMTP_USER |
| NEXT_PUBLIC_CONSULTATION_CALENDAR_URL | build | Optional. Overrides the default HighLevel booking widget (the 30 minute free consultation calendar) shown after the consultation form |
| WORDPRESS_URL | server | WordPress install for blog posts, e.g. https://cms.sndigitalsolns.com |
| NEXT_PUBLIC_GTM_ID | build | Google Tag Manager container id |
| NEXT_PUBLIC_WHATSAPP_URL | build | Optional WhatsApp link override |
| NEXT_PUBLIC_NOINDEX | build | "true" on preview deployments: robots disallow + noindex |

Without GHL_API_KEY / GHL_LOCATION_ID the lead API returns 503 and asks visitors to call or email, so no lead is silently lost. The email copy and the
pipeline opportunity are both optional: if their variables are missing the enquiry still reaches the CRM, and a failure in either never fails the form.

## Where things live

- `src/content/` – all page copy (services, products, industries, case studies, portfolio). Only verified facts.
- `src/lib/leads/` – provider-neutral lead model, validation and the HighLevel provider.
- `src/tools/` – free tools. `registry.ts` lists them; `b2b-pipeline/` holds the calculator engine, recommendations, report and PDF.
- `src/lib/wp/posts.ts` – WordPress REST client (cached for hours).

## Tracking events (dataLayer)

cta_click, phone_click, email_click, whatsapp_click, demo_click, portfolio_click, generate_lead, calendar_open, calendar_later, tool_open, tool_calculate, tool_report_download. First-touch UTM / click-id attribution is kept for 90 days and sent with every form.
