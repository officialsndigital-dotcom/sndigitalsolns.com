/**
 * What the visitor has agreed to, and how it is stored.
 *
 * Analytics and advertising scripts must not run before someone has said yes.
 * Saudi Arabia, the UAE and India require consent for this kind of tracking,
 * Canada requires a meaningful choice, the US state laws require a way to opt
 * out of ad tracking, and Google expects a consent signal on European traffic.
 *
 * The choice lives in a first-party cookie rather than local storage so that
 * it is visible to the visitor in the same place as the cookies it governs.
 * Nothing here touches the DOM, so it can be tested on its own.
 */

export type Categories = {
  /** Google Analytics: how the site is used. */
  analytics: boolean;
  /** The Meta pixel and anything else used to advertise. */
  marketing: boolean;
};

export const COOKIE_NAME = "sn_consent";

/** Bumped when the categories change, which asks everyone again. */
export const VERSION = 1;

/** Six months. Long enough not to nag, short enough to re-ask in good time. */
export const MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

export const DENY_ALL: Categories = { analytics: false, marketing: false };
export const ACCEPT_ALL: Categories = { analytics: true, marketing: true };

type Stored = Categories & { v: number };

/** The stored choice, or null when there is none to honour yet. */
export function decode(value: string | null | undefined): Categories | null {
  if (!value) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const s = parsed as Partial<Stored>;
  // A choice made against an older set of categories is not a choice about
  // the current ones, so it is ignored and the banner asks again.
  if (s.v !== VERSION) return null;
  if (typeof s.analytics !== "boolean" || typeof s.marketing !== "boolean") return null;
  return { analytics: s.analytics, marketing: s.marketing };
}

export function encode(c: Categories): string {
  return encodeURIComponent(JSON.stringify({ v: VERSION, ...c } satisfies Stored));
}

/** Pull our value out of a whole `document.cookie` string. */
export function fromCookieString(all: string): Categories | null {
  for (const part of all.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE_NAME) return decode(rest.join("="));
  }
  return null;
}

/** The value to assign to `document.cookie`. */
export function toCookieString(c: Categories, secure: boolean): string {
  const bits = [`${COOKIE_NAME}=${encode(c)}`, "path=/", `max-age=${MAX_AGE_SECONDS}`, "samesite=lax"];
  if (secure) bits.push("secure");
  return bits.join("; ");
}

/** Google's Consent Mode v2 signals for a choice. */
export function googleConsent(c: Categories): Record<string, "granted" | "denied"> {
  const ads = c.marketing ? "granted" : "denied";
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}
