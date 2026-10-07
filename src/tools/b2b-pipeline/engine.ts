// B2B Pipeline & Revenue Opportunity Calculator: deterministic calculation engine.
// No AI and no external data here. Every number on the results page comes from
// these functions so the maths can be tested and explained.

export type Rates = {
  /** Positive conversations ÷ prospects contacted, as a fraction (0–1). */
  response: number;
  /** Meetings ÷ positive conversations. */
  meeting: number;
  /** Opportunities ÷ meetings. */
  opportunity: number;
  /** Customers ÷ opportunities. */
  close: number;
};

export type PipelineInput = {
  revenueTarget: number; // per month
  dealValue: number; // average deal value
  currentProspects: number; // prospects contacted per month
  rates: Rates;
  salesCycleDays?: number;
};

export type Stage = "prospects" | "conversations" | "meetings" | "opportunities" | "customers";

export type StageCounts = Record<Stage, number>;

export type Area = "prospecting" | "response" | "meeting" | "opportunity" | "closing" | "revenue";

export type HealthScore = {
  total: number;
  parts: Record<Area, number>;
  bottleneck: Exclude<Area, "revenue">;
};

export type Scenario = {
  name: "Conservative" | "Current" | "Optimised";
  rates: Rates;
  required: StageCounts;
  expectedCustomers: number;
  expectedRevenue: number;
};

export type PipelineResult = {
  required: StageCounts;
  current: StageCounts;
  gaps: StageCounts;
  expectedRevenue: number;
  revenueGap: number;
  /** Customers ÷ prospects at current rates. */
  conversionEfficiency: number;
  /** Value of the opportunities required to hit the target. */
  requiredPipelineValue: number;
  /** Value of the opportunities the current activity is expected to create. */
  currentPipelineValue: number;
  health: HealthScore;
  scenarios: Scenario[];
  /** Months of activity before revenue lands, from the sales cycle. */
  cycleMonths: number | null;
};

/**
 * Planning assumptions used for the health score and the "Optimised" scenario.
 * These are editable defaults, not industry benchmarks, and the UI labels them so.
 */
export const PLANNING_ASSUMPTIONS: Rates = {
  response: 0.1,
  meeting: 0.3,
  opportunity: 0.5,
  close: 0.25,
};

export const CONSERVATIVE_FACTOR = 0.8;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function validate(input: PipelineInput): string[] {
  const errors: string[] = [];
  if (!(input.revenueTarget > 0)) errors.push("Enter a monthly revenue target above zero.");
  if (!(input.dealValue > 0)) errors.push("Enter an average deal value above zero.");
  if (!(input.currentProspects >= 0)) errors.push("Prospects contacted cannot be negative.");
  for (const [k, v] of Object.entries(input.rates)) {
    if (!(v > 0 && v <= 1)) errors.push(`The ${k} rate must be between 0.1% and 100%.`);
  }
  return errors;
}

/** Work backwards from the revenue target to the activity required at each stage. */
export function requiredActivity(revenueTarget: number, dealValue: number, r: Rates): StageCounts {
  const customers = Math.ceil(revenueTarget / dealValue - 1e-9);
  const opportunities = Math.ceil(customers / r.close - 1e-9);
  const meetings = Math.ceil(opportunities / r.opportunity - 1e-9);
  const conversations = Math.ceil(meetings / r.meeting - 1e-9);
  const prospects = Math.ceil(conversations / r.response - 1e-9);
  return { prospects, conversations, meetings, opportunities, customers };
}

/** Work forwards from current prospect volume at current rates. Fractional on purpose. */
export function expectedFromProspects(prospects: number, r: Rates): StageCounts {
  const conversations = prospects * r.response;
  const meetings = conversations * r.meeting;
  const opportunities = meetings * r.opportunity;
  const customers = opportunities * r.close;
  return { prospects, conversations, meetings, opportunities, customers };
}

function ratio(actual: number, reference: number) {
  return reference > 0 ? clamp01(actual / reference) : 1;
}

export function healthScore(
  input: PipelineInput,
  required: StageCounts,
  expectedRevenue: number,
  assumptions: Rates = PLANNING_ASSUMPTIONS,
): HealthScore {
  const r = input.rates;
  const parts: Record<Area, number> = {
    prospecting: Math.round(100 * ratio(input.currentProspects, required.prospects)),
    response: Math.round(100 * ratio(r.response, assumptions.response)),
    meeting: Math.round(100 * ratio(r.meeting, assumptions.meeting)),
    opportunity: Math.round(100 * ratio(r.opportunity, assumptions.opportunity)),
    closing: Math.round(100 * ratio(r.close, assumptions.close)),
    revenue: Math.round(100 * ratio(expectedRevenue, input.revenueTarget)),
  };
  const values = Object.values(parts);
  const total = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  // Ties go to the earliest stage in the funnel, since fixing it lifts everything after it.
  const order: Exclude<Area, "revenue">[] = ["prospecting", "response", "meeting", "opportunity", "closing"];
  const bottleneck = order.reduce((low, a) => (parts[a] < parts[low] ? a : low), order[0]);
  return { total, parts, bottleneck };
}

export function scenarioRates(r: Rates, assumptions: Rates = PLANNING_ASSUMPTIONS) {
  const conservative: Rates = {
    response: r.response * CONSERVATIVE_FACTOR,
    meeting: r.meeting * CONSERVATIVE_FACTOR,
    opportunity: r.opportunity * CONSERVATIVE_FACTOR,
    close: r.close * CONSERVATIVE_FACTOR,
  };
  // Optimised: close half the gap to the planning assumption; never lower, never above it.
  const up = (v: number, a: number) => (v >= a ? v : v + (a - v) / 2);
  const optimised: Rates = {
    response: up(r.response, assumptions.response),
    meeting: up(r.meeting, assumptions.meeting),
    opportunity: up(r.opportunity, assumptions.opportunity),
    close: up(r.close, assumptions.close),
  };
  return { conservative, optimised };
}

export function calculate(input: PipelineInput, assumptions: Rates = PLANNING_ASSUMPTIONS): PipelineResult {
  const errors = validate(input);
  if (errors.length) throw new Error(errors.join(" "));

  const required = requiredActivity(input.revenueTarget, input.dealValue, input.rates);
  const current = expectedFromProspects(input.currentProspects, input.rates);
  const expectedRevenue = current.customers * input.dealValue;

  const gaps = Object.fromEntries(
    (Object.keys(required) as Stage[]).map((k) => [k, Math.max(0, required[k] - current[k])]),
  ) as StageCounts;

  const { conservative, optimised } = scenarioRates(input.rates, assumptions);
  const scenario = (name: Scenario["name"], rates: Rates): Scenario => {
    const exp = expectedFromProspects(input.currentProspects, rates);
    return {
      name,
      rates,
      required: requiredActivity(input.revenueTarget, input.dealValue, rates),
      expectedCustomers: exp.customers,
      expectedRevenue: exp.customers * input.dealValue,
    };
  };

  return {
    required,
    current,
    gaps,
    expectedRevenue,
    revenueGap: Math.max(0, input.revenueTarget - expectedRevenue),
    conversionEfficiency:
      input.rates.response * input.rates.meeting * input.rates.opportunity * input.rates.close,
    requiredPipelineValue: required.opportunities * input.dealValue,
    currentPipelineValue: current.opportunities * input.dealValue,
    health: healthScore(input, required, expectedRevenue, assumptions),
    scenarios: [
      scenario("Conservative", conservative),
      scenario("Current", input.rates),
      scenario("Optimised", optimised),
    ],
    cycleMonths: input.salesCycleDays && input.salesCycleDays > 0 ? Math.ceil(input.salesCycleDays / 30) : null,
  };
}
