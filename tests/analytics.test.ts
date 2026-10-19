import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { track } from "../src/lib/analytics.ts";

type Win = {
  location: { pathname: string };
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

let gtagCalls: unknown[][] = [];

beforeEach(() => {
  gtagCalls = [];
  const win: Win = { location: { pathname: "/contact/" } };
  (globalThis as { window?: Win }).window = win;
});

const win = () => (globalThis as unknown as { window: Win }).window;

test("sends the event to GA4 through gtag, not only to dataLayer", () => {
  win().gtag = (...args) => gtagCalls.push(args);
  track("generate_lead", { form: "consultation" });

  assert.deepEqual(gtagCalls, [["event", "generate_lead", { page_path: "/contact/", form: "consultation" }]]);
  assert.deepEqual(win().dataLayer, [{ event: "generate_lead", page_path: "/contact/", form: "consultation" }]);
});

test("stamps the page path and lets callers override it", () => {
  win().gtag = (...args) => gtagCalls.push(args);
  track("calendar_open", { form: "demo", page_path: "/book-demo/" });

  assert.equal((gtagCalls[0][2] as { page_path: string }).page_path, "/book-demo/");
});

test("does not throw when the GA4 tag has not loaded", () => {
  assert.doesNotThrow(() => track("generate_lead", { form: "contact" }));
  assert.equal(win().dataLayer?.length, 1);
});
