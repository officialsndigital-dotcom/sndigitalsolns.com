import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ACCEPT_ALL,
  COOKIE_NAME,
  DENY_ALL,
  decode,
  encode,
  fromCookieString,
  googleConsent,
  toCookieString,
  VERSION,
} from "../src/lib/consent.ts";

test("a saved choice survives a round trip", () => {
  for (const c of [ACCEPT_ALL, DENY_ALL, { analytics: true, marketing: false }]) {
    assert.deepEqual(decode(encode(c)), c);
  }
});

test("no choice, a damaged one, or one made against older categories all mean not yet asked", () => {
  for (const raw of [null, undefined, "", "not json", encodeURIComponent('{"analytics":true}'), encodeURIComponent(JSON.stringify({ v: VERSION + 1, analytics: true, marketing: true }))]) {
    assert.equal(decode(raw), null, `expected no decision from ${String(raw)}`);
  }
});

test("the choice is found among other cookies, and absence is not a decision", () => {
  const ours = `${COOKIE_NAME}=${encode(ACCEPT_ALL)}`;
  assert.deepEqual(fromCookieString(`_ga=GA1.1.x; ${ours}; other=1`), ACCEPT_ALL);
  assert.equal(fromCookieString("_ga=GA1.1.x; other=1"), null);
});

test("the cookie is scoped to the whole site and marked secure over https", () => {
  const secure = toCookieString(DENY_ALL, true);
  assert.match(secure, /path=\//);
  assert.match(secure, /samesite=lax/);
  assert.match(secure, /; secure$/);
  assert.doesNotMatch(toCookieString(DENY_ALL, false), /secure/);
});

test("refusing marketing denies every advertising signal Google asks about", () => {
  assert.deepEqual(googleConsent({ analytics: true, marketing: false }), {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  assert.equal(Object.values(googleConsent(DENY_ALL)).every((v) => v === "denied"), true);
  assert.equal(Object.values(googleConsent(ACCEPT_ALL)).every((v) => v === "granted"), true);
});
