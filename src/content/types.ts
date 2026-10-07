export type Vertical = "development" | "marketing" | "pr";

export type Faq = { q: string; a: string };
export type Step = { title: string; text: string };

export type Service = {
  vertical: Vertical;
  slug: string;
  name: string;
  /** Short label for menus and cards. */
  short: string;
  metaTitle: string;
  /** Keyword-led page heading; defaults to name. Set from DataForSEO research 2026-10-07. */
  h1?: string;
  metaDescription: string;
  /** One sentence: the business outcome. */
  outcome: string;
  /** One line for cards and menus. */
  summary: string;
  problem: { intro: string; points: string[] };
  whatWeDo: string[];
  deliverables: string[];
  process: Step[];
  useCases?: Step[];
  /** Service-specific proof. Verified facts only. */
  whyUs: string[];
  industries: string[];
  /** Keys like "development/web-application-development". */
  related: string[];
  caseStudies?: string[];
  faqs: Faq[];
};

export type Industry = {
  slug: string;
  name: string;
  /** Keyword-led title; defaults to "<name> Software, Websites & Marketing". */
  metaTitle?: string;
  /** Keyword-led page heading; defaults to "<name> solutions". */
  h1?: string;
  metaDescription: string;
  intro: string;
  challenges: string[];
  needs: string[];
  services: string[];
  products?: string[];
  portfolioCategory?: string;
  caseStudies?: string[];
  why: string[];
  faqs: Faq[];
  phase: 1 | 2;
};
