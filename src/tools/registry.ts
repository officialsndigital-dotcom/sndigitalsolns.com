// Free tools directory. New tools register here and get a card on /free-tools/.
export type ToolEntry = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  status: "live" | "coming-soon";
};

export const tools: ToolEntry[] = [
  {
    slug: "b2b-pipeline-revenue-calculator",
    name: "B2B Pipeline & Revenue Calculator",
    category: "Sales & lead generation",
    summary: "Work backwards from a revenue target to the prospects, meetings and opportunities you need, find your bottleneck and get a PDF report.",
    status: "live",
  },
];
