import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead } from "../src/lib/leads/validate.ts";
import { GhlProvider, noteFor } from "../src/lib/leads/ghl.ts";

const base = { kind: "consultation", name: "Asha Rao", email: "Asha@Example.com", phone: "+91 98765 43210", consent: true };

test("accepts a valid consultation lead and normalises email", () => {
  const r = validateLead(base);
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.lead.email, "asha@example.com");
});

test("requires phone for consultations but not calculator reports", () => {
  assert.equal(validateLead({ ...base, phone: "" }).ok, false);
  assert.equal(validateLead({ ...base, kind: "calculator", phone: "" }).ok, true);
});

test("rejects missing consent, bad email, unknown kind and filled honeypot", () => {
  for (const bad of [{ consent: false }, { email: "nope" }, { kind: "spam" }, { company_url: "http://x" }]) {
    assert.equal(validateLead({ ...base, ...bad }).ok, false, JSON.stringify(bad));
  }
});

test("GHL provider upserts the contact then adds a note", async () => {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const fake = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    return new Response(JSON.stringify({ contact: { id: "c1" } }), { status: 200 });
  }) as unknown as typeof fetch;
  const r = validateLead({ ...base, interest: "marketing/b2b-lead-generation", message: "Need meetings" });
  assert.ok(r.ok);
  const res = await new GhlProvider("tok", "loc", undefined, fake).submit(r.lead);
  assert.deepEqual(res, { ok: true, contactId: "c1" });
  assert.match(calls[0].url, /contacts\/upsert$/);
  assert.equal(calls[0].body.locationId, "loc");
  assert.equal(calls[0].body.firstName, "Asha");
  assert.match(calls[1].url, /contacts\/c1\/notes$/);
  assert.match(String(calls[1].body.body), /Need meetings/);
  assert.equal(calls.length, 2, "no opportunity is created when no pipeline is configured");
});

test("GHL provider also opens an opportunity when a pipeline is configured", async () => {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const fake = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    return new Response(JSON.stringify({ contact: { id: "c1" } }), { status: 200 });
  }) as unknown as typeof fetch;
  const r = validateLead({ ...base, company: "Acme" });
  assert.ok(r.ok);
  await new GhlProvider("tok", "loc", { pipelineId: "p1", stageId: "s1" }, fake).submit(r.lead);
  const opp = calls.find((c) => /opportunities\/$/.test(c.url));
  assert.ok(opp, "an opportunity call was made");
  assert.equal(opp.body.pipelineId, "p1");
  assert.equal(opp.body.pipelineStageId, "s1");
  assert.equal(opp.body.contactId, "c1");
  assert.equal(opp.body.status, "open");
  assert.match(String(opp.body.name), /Acme/);
});

test("GHL provider reports upstream failure", async () => {
  const fake = (async () => new Response("no", { status: 401 })) as unknown as typeof fetch;
  const r = validateLead(base);
  assert.ok(r.ok);
  const res = await new GhlProvider("tok", "loc", undefined, fake).submit(r.lead);
  assert.equal(res.ok, false);
  assert.ok(noteFor(r.lead).includes("consultation"));
});
