"use client";

import { useEffect } from "react";
import { ATTRIBUTION_KEY, ATTRIBUTION_DAYS, UTM_KEYS, readAttribution, track } from "@/lib/analytics";
import { useConsent } from "@/components/consent-store";

export function Tracking() {
  const { categories } = useConsent();
  const mayStore = categories.analytics;

  useEffect(() => {
    // Where someone came from is only kept once they have agreed to it.
    if (!mayStore) return;
    try {
      const existing = readAttribution();
      const fresh = !existing.first_seen || Date.now() - Number(existing.first_seen) > ATTRIBUTION_DAYS * 864e5;
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
      track(el.dataset.track!, { link_url: (el as HTMLAnchorElement).href, link_text: el.textContent?.trim().slice(0, 80) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [mayStore]);
  return null;
}
