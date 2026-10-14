/**
 * Sending events to GA4, and the first-touch attribution that travels with them.
 *
 * The site loads GA4 directly through gtag.js (see app/layout.tsx), and gtag.js
 * only reports what gtag() itself sends: a plain object pushed onto dataLayer is
 * read by Google Tag Manager and ignored by GA4. So every event goes down both
 * paths — gtag() so GA4 records it today, and dataLayer so a GTM container picks
 * it up if one is ever configured.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const ATTRIBUTION_KEY = "sn_attribution";

/** How long a first touch is remembered, in days. */
export const ATTRIBUTION_DAYS = 90;

export const UTM_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "li_fat_id",
] as const;

/**
 * Report one event to GA4.
 *
 * GA4 shows custom parameters in reports only after they are registered as
 * custom dimensions in the property, so keep the names stable: `form`,
 * `interest`, `page_path`.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    page_path: window.location.pathname,
    ...params,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  // Guarded because gtag.js loads after interactive, and because the tag is
  // absent entirely when no measurement ID is configured.
  window.gtag?.("event", event, payload);
}

/** First-touch attribution, stored at the first visit and sent with every form. */
export function readAttribution(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    return {};
  }
}
