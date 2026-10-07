import { test } from "node:test";
import assert from "node:assert/strict";
import { calculate, requiredActivity, scenarioRates, validate, PLANNING_ASSUMPTIONS } from "../src/tools/b2b-pipeline/engine.ts";
import { recommend } from "../src/tools/b2b-pipeline/recommendations.ts";

const base = {
  revenueTarget: 100_000,
  dealValue: 10_000,
  currentProspects: 500,
  rates: { response: 0.2, meeting: 0.25, opportunity: 0.5, close: 0.4 },
};

test("works backwards to the brief's worked example", () => {
  assert.deepEqual(requiredActivity(100_000, 10_000, base.rates), {
    customers: 10, opportunities: 25, meetings: 50, conversations: 200, prospects: 1000,
  });
});

test("rounds partial customers and stages up", () => {
  const r = requiredActivity(25_000, 10_000, { response: 0.1, meeting: 0.3, opportunity: 0.5, close: 0.25 });
  assert.equal(r.customers, 3);
  assert.equal(r.opportunities, 12);
  assert.equal(r.meetings, 24);
  assert.equal(r.conversations, 80);
  assert.equal(r.prospects, 800);
});

test("current position, gaps and revenue gap", () => {
  const res = calculate(base);
  assert.equal(res.current.conversations, 100);
  assert.equal(res.current.meetings, 25);
  assert.equal(res.current.opportunities, 12.5);
  assert.equal(res.current.customers, 5);
  assert.equal(res.expectedRevenue, 50_000);
  assert.equal(res.revenueGap, 50_000);
  assert.equal(res.gaps.prospects, 500);
  assert.equal(res.gaps.meetings, 25);
  assert.equal(res.requiredPipelineValue, 250_000);
});

test("no negative gaps when already above target", () => {
  const res = calculate({ ...base, currentProspects: 5000 });
  assert.equal(res.revenueGap, 0);
  for (const v of Object.values(res.gaps)) assert.equal(v, 0);
  assert.equal(res.health.parts.revenue, 100);
});

test("health score finds prospect volume as the bottleneck when rates are healthy", () => {
  const res = calculate(base);
  assert.equal(res.health.parts.prospecting, 50);
  assert.equal(res.health.bottleneck, "prospecting");
  assert.equal(recommend(res).service.key, "marketing/b2b-lead-generation");
});

test("health score finds low response rate", () => {
  const res = calculate({ ...base, currentProspects: 20_000, rates: { ...base.rates, response: 0.02 } });
  assert.equal(res.health.bottleneck, "response");
  assert.equal(res.health.parts.response, 20);
});

test("health score finds low close rate", () => {
  const res = calculate({ ...base, currentProspects: 5000, rates: { ...base.rates, close: 0.05 } });
  assert.equal(res.health.bottleneck, "closing");
});

test("scenarios: conservative is lower, optimised never exceeds the assumption", () => {
  const low = { response: 0.04, meeting: 0.5, opportunity: 0.2, close: 0.25 };
  const { conservative, optimised } = scenarioRates(low);
  assert.ok(Math.abs(conservative.response - 0.032) < 1e-12);
  assert.ok(Math.abs(optimised.response - 0.07) < 1e-12);
  assert.equal(optimised.meeting, 0.5); // already above the assumption: unchanged
  assert.equal(optimised.close, PLANNING_ASSUMPTIONS.close);
  const res = calculate({ ...base, rates: low });
  const [c, cur, o] = res.scenarios;
  assert.ok(c.expectedRevenue < cur.expectedRevenue && cur.expectedRevenue <= o.expectedRevenue);
});

test("validation rejects zero or impossible inputs", () => {
  assert.ok(validate({ ...base, dealValue: 0 }).length > 0);
  assert.ok(validate({ ...base, rates: { ...base.rates, close: 0 } }).length > 0);
  assert.ok(validate({ ...base, rates: { ...base.rates, close: 1.5 } }).length > 0);
  assert.throws(() => calculate({ ...base, revenueTarget: -1 }));
});
