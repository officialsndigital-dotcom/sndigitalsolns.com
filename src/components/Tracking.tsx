"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "li_fat_id"];
export const ATTRIBUTION_KEY = "sn_attribution";

export function track(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** First-touch attribution: kept for 90 days and sent with every form. */
export function readAttribution(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    return {};
  }
}

export function Tracking() {
  useEffect(() => {
    try {
      const existing = readAttribution();
      const fresh = !existing.first_seen || Date.now() - Number(existing.first_seen) > 90 * 864e5;
      const params = new URLSearchParams(location.search);
      const hasUtm = UTM_KEYS.some((k) => params.get(k));
      if (fresh || hasUtm) {
        const data: Record<string, string> = { first_seen: String(Date.now()), landing_page: location.pathname, referrer: document.referrer };
        for (const k of UTM_KEYS) {
          const v = params.get(k);
          if (v) data[k] = v;
        }
        localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(fresh ? data : { ...existing, ...data, first_seen: existing.first_seen }));
      }
    } catch {
      // Storage blocked (private mode): forms still work without attribution.
    }

    // One delegated listener for every element marked with data-track.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track!, { link_url: (el as HTMLAnchorElement).href, link_text: el.textContent?.trim().slice(0, 80), page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
