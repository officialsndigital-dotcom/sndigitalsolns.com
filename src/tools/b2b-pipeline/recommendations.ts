import type { Area, PipelineResult } from "./engine";

export type Recommendation = {
  area: Exclude<Area, "revenue">;
  headline: string;
  detail: string;
  actions: string[];
  service: { key: string; name: string; pitch: string };
};

const byArea: Record<Exclude<Area, "revenue">, Omit<Recommendation, "area">> = {
  prospecting: {
    headline: "Your biggest constraint appears to be prospect volume.",
    detail:
      "Your conversion rates can carry the target, but not enough qualified prospects are being contacted each month. Increasing qualified prospecting activity should be the first priority.",
    actions: [
      "Build a researched list of decision makers who match your ideal customer profile.",
      "Add a second outreach channel (LinkedIn and email together).",
      "Set a weekly prospecting target based on the required volume above.",
    ],
    service: {
      key: "marketing/b2b-lead-generation",
      name: "B2B Lead Generation",
      pitch:
        "We identify the right decision makers, run targeted LinkedIn and email outreach, manage the conversations and book qualified sales meetings.",
    },
  },
  response: {
    headline: "Your biggest constraint appears to be response rate.",
    detail:
      "You are contacting enough people, but too few reply positively. Your targeting, messaging or offer may need work before you add more volume.",
    actions: [
      "Narrow the ideal customer profile to the segments that reply most.",
      "Rewrite openers around a specific problem, not your company.",
      "Test two or three messages per segment and keep the winner.",
    ],
    service: {
      key: "marketing/b2b-lead-generation",
      name: "B2B Lead Generation",
      pitch: "Our outreach team researches prospects, writes personalised messaging by segment and tests it weekly.",
    },
  },
  meeting: {
    headline: "Your biggest constraint appears to be meeting generation.",
    detail:
      "Conversations are happening, but not enough of them turn into meetings. Review your call to action, qualification and follow-up sequence.",
    actions: [
      "Make the meeting ask specific and low-effort (a short call with a clear agenda).",
      "Follow up every positive reply within hours, not days.",
      "Use automated reminders so no conversation goes quiet.",
    ],
    service: {
      key: "marketing/crm-marketing-automation",
      name: "CRM & Marketing Automation",
      pitch: "We set up instant follow-ups, nurture sequences and booking reminders so warm conversations become meetings.",
    },
  },
  opportunity: {
    headline: "Your biggest constraint appears to be turning meetings into opportunities.",
    detail:
      "Meetings are being booked, but few become real opportunities. The issue is usually qualification before the meeting or how the first call is run.",
    actions: [
      "Qualify budget, need and timing before booking.",
      "Use a consistent discovery call structure.",
      "Send a clear next step and proposal date after every meeting.",
    ],
    service: {
      key: "marketing/crm-marketing-automation",
      name: "CRM & Marketing Automation",
      pitch: "We build qualification into your pipeline so sales time goes to meetings that can become deals.",
    },
  },
  closing: {
    headline: "Your biggest constraint appears to be closing.",
    detail:
      "Top-of-funnel activity looks healthy, but opportunity-to-customer conversion is limiting revenue. This points to the sales process, proposal or product positioning.",
    actions: [
      "Review lost deals for common objections.",
      "Add proof (case studies, references) to proposals.",
      "Shorten the time between proposal and decision with agreed follow-up dates.",
    ],
    service: {
      key: "pr/founder-thought-leadership",
      name: "Founder Thought Leadership",
      pitch: "Visible, credible leadership makes buyers more confident at the decision stage. We help founders become known in their industry.",
    },
  },
};

export function recommend(result: PipelineResult): Recommendation {
  const area = result.health.bottleneck;
  return { area, ...byArea[area] };
}

export const AREA_LABELS: Record<Area, string> = {
  prospecting: "Prospecting",
  response: "Response",
  meeting: "Meeting generation",
  opportunity: "Opportunity conversion",
  closing: "Closing",
  revenue: "Revenue efficiency",
};
