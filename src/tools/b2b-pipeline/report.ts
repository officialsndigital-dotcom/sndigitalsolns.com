import type { PipelineInput, PipelineResult, Stage } from "./engine.ts";
import { count, money, pct, type CurrencyCode } from "./format.ts";
import { AREA_LABELS, type Recommendation } from "./recommendations.ts";

export const STAGE_LABELS: Record<Stage, string> = {
  prospects: "Prospects contacted",
  conversations: "Positive conversations",
  meetings: "Meetings",
  opportunities: "Opportunities",
  customers: "Customers",
};

export type ReportSection = { title: string; rows: [string, string][] } | { title: string; lines: string[] };

/** Report content as plain data, shared by the PDF and the CRM note. */
export function buildReport(input: PipelineInput, result: PipelineResult, rec: Recommendation, currency: CurrencyCode): ReportSection[] {
  const stages = Object.keys(STAGE_LABELS) as Stage[];
  return [
    {
      title: "Your inputs",
      rows: [
        ["Monthly revenue target", money(input.revenueTarget, currency)],
        ["Average deal value", money(input.dealValue, currency)],
        ["Prospects contacted per month", count(input.currentProspects)],
        ["Response rate", pct(input.rates.response)],
        ["Meeting rate", pct(input.rates.meeting)],
        ["Opportunity rate", pct(input.rates.opportunity)],
        ["Close rate", pct(input.rates.close)],
        ...(input.salesCycleDays ? [["Sales cycle", `${input.salesCycleDays} days`] as [string, string]] : []),
      ],
    },
    {
      title: "Summary",
      rows: [
        ["Pipeline health score", `${result.health.total} / 100`],
        ["Main bottleneck", AREA_LABELS[rec.area]],
        ["Expected monthly revenue at current activity", money(result.expectedRevenue, currency)],
        ["Revenue gap", money(result.revenueGap, currency)],
        ["Pipeline value required", money(result.requiredPipelineValue, currency)],
        ["Prospect-to-customer conversion", pct(result.conversionEfficiency)],
      ],
    },
    {
      title: "Required vs current activity per month",
      rows: stages.map((s) => [STAGE_LABELS[s], `need ${count(result.required[s])} · now ${count(result.current[s])} · gap ${count(result.gaps[s])}`]),
    },
    {
      title: "Scenarios",
      rows: result.scenarios.map((sc) => [sc.name, `${count(sc.required.prospects)} prospects needed · ${money(sc.expectedRevenue, currency)} expected now`]),
    },
    {
      title: "Health score breakdown",
      rows: (Object.keys(result.health.parts) as (keyof typeof result.health.parts)[]).map((a) => [AREA_LABELS[a], `${result.health.parts[a]} / 100`]),
    },
    { title: "Recommendation", lines: [rec.headline, rec.detail, ...rec.actions.map((a) => `• ${a}`), `How we can help: ${rec.service.name}. ${rec.service.pitch}`] },
    {
      title: "Notes",
      lines: [
        "Estimates are based on the numbers you entered and simple planning assumptions. They are not a guarantee of results.",
        "The health score compares your rates with editable planning assumptions (10% response, 30% meeting, 50% opportunity, 25% close), not industry benchmarks.",
      ],
    },
  ];
}

export function reportAsText(sections: ReportSection[]) {
  return sections
    .map((s) => [s.title.toUpperCase(), ...("rows" in s ? s.rows.map(([k, v]) => `${k}: ${v}`) : s.lines)].join("\n"))
    .join("\n\n");
}
