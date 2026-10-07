import type { Vertical } from "./types";

export type CaseStudy = {
  slug: string;
  vertical: Vertical;
  title: string;
  client: string;
  industry: string;
  industrySlug?: string;
  period: string;
  channels: string[];
  summary: string;
  metrics: { label: string; value: string }[];
  objective?: string;
  approach?: string[];
  source: string;
  /** Dashboard screenshot from the supplied marketing portfolio PDF. */
  proof?: { src: string; width: number; height: number; caption: string };
  services: string[];
  /** Draft case studies are not listed or linked until the company confirms them. */
  status: "published" | "draft";
  note?: string;
};

// All figures are copied from the supplied marketing portfolio (screenshots and
// "Performance Snapshot" tables). Clients are anonymised by industry until the
// company approves naming them. Amounts stay in the currency of the source.
export const caseStudies: CaseStudy[] = [
  {
    slug: "linkedin-217-sales-calls-72-days",
    vertical: "marketing",
    title: "217 Sales Calls in 72 Days From LinkedIn",
    client: "S N Digital Solns (our own outreach)",
    industry: "B2B services",
    period: "72 days",
    channels: ["LinkedIn"],
    summary:
      "We used our own LinkedIn network and outreach system to book 217 sales calls in 72 days. It is the same process we run for clients.",
    metrics: [
      { label: "Sales calls booked", value: "217" },
      { label: "Days", value: "72" },
    ],
    objective: "Generate a steady flow of sales conversations for our own services without paid advertising.",
    approach: [
      "Started from our existing LinkedIn network rather than cold lists.",
      "Defined the ideal customer profile by industry, company size, market and role.",
      "Researched prospects before contacting them.",
      "Sent personalised connection messages and openers by segment.",
      "Followed up consistently, managed every conversation and qualified interest.",
      "Booked meetings directly into the sales calendar.",
    ],
    source: "Company-supplied figure. [CONTENT REQUIRED] Dated dashboard screenshots.",
    services: ["marketing/b2b-lead-generation", "marketing/crm-marketing-automation"],
    status: "published",
    note: "Results depend on market, offer and network. This is our own campaign, not a client guarantee.",
  },
  {
    slug: "kids-apparel-d2c-2025",
    vertical: "marketing",
    title: "Kids Apparel D2C Brand: ₹16.89 Cr Revenue at 4.30 ROAS",
    client: "Kids apparel D2C brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Google Ads", "Shopify"],
    summary: "Full-year performance marketing for a direct-to-consumer kids apparel brand.",
    metrics: [
      { label: "Revenue generated", value: "₹16,89,00,569" },
      { label: "Purchases", value: "92,190" },
      { label: "ROAS", value: "4.30" },
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proof: { src: "/case-studies/kids-apparel-d2c-2025.webp", width: 1200, height: 608, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 2)." },
    services: ["marketing/ecommerce-growth", "marketing/performance-marketing"],
    status: "published",
  },
  {
    slug: "premium-womenswear-2025",
    vertical: "marketing",
    title: "Premium Women's Apparel: ₹23.70 Cr Revenue at 6.50 ROAS",
    client: "Premium women's apparel brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Google Ads", "Shopify"],
    summary: "Scaling a premium womenswear brand profitably across paid channels.",
    metrics: [
      { label: "Revenue generated", value: "₹23,70,13,547" },
      { label: "Purchases", value: "5,167" },
      { label: "ROAS", value: "6.50" },
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proof: { src: "/case-studies/premium-womenswear-2025.webp", width: 1200, height: 1290, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 3)." },
    services: ["marketing/ecommerce-growth", "marketing/performance-marketing"],
    status: "published",
  },
  {
    slug: "women-ethnic-wear-2025",
    vertical: "marketing",
    title: "Women's Ethnic Wear: ₹3.54 Cr Revenue at 4.70 ROAS",
    client: "Women's ethnic wear brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Google Ads", "Shopify"],
    summary: "Performance marketing for an ethnic wear brand selling online.",
    metrics: [
      { label: "Revenue generated", value: "₹3,54,46,589" },
      { label: "Purchases", value: "1,249" },
      { label: "ROAS", value: "4.70" },
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proof: { src: "/case-studies/women-ethnic-wear-2025.webp", width: 1200, height: 1246, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 6)." },
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "women-ethnic-wear-b-2025",
    vertical: "marketing",
    title: "Women's Ethnic Wear Brand B: ₹1.99 Cr Revenue at 5.50 ROAS",
    client: "Women's ethnic wear brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Shopify"],
    summary: "A second ethnic wear brand, managed separately.",
    metrics: [
      { label: "Revenue generated", value: "₹1,99,05,342" },
      { label: "Purchases", value: "2,713" },
      { label: "ROAS", value: "5.50" },
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proof: { src: "/case-studies/women-ethnic-wear-b-2025.webp", width: 1200, height: 1230, caption: "Shopify analytics for the store, full year 2025 (marketing portfolio, page 7)." },
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "gifting-decor-2025",
    vertical: "marketing",
    title: "Gifting & Décor Brand: ₹92.2 L Revenue at 4.50 ROAS",
    client: "Gifting and décor brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Shopify"],
    summary: "Paid social growth for an online gifting and décor store.",
    metrics: [
      { label: "Revenue generated", value: "₹92,24,502" },
      { label: "Purchases", value: "6,595" },
      { label: "ROAS", value: "4.50" },
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proof: { src: "/case-studies/gifting-decor-2025.webp", width: 1200, height: 611, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 8)." },
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "jewellery-brand-2025",
    vertical: "marketing",
    title: "Jewellery Brand: ₹72.8 L Revenue at 4.10 ROAS",
    client: "Jewellery brand",
    industry: "Jewellery & Diamonds",
    industrySlug: "jewellery-diamonds",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Shopify"],
    summary: "Online sales growth for a jewellery brand.",
    metrics: [
      { label: "Revenue generated", value: "₹72,79,074" },
      { label: "Purchases", value: "8,111" },
      { label: "ROAS", value: "4.10" },
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proof: { src: "/case-studies/jewellery-brand-2025.webp", width: 1200, height: 597, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 9)." },
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "beauty-personal-care-2025",
    vertical: "marketing",
    title: "Gemeria: ₹5.67 Cr Revenue at 4.50 ROAS",
    client: "Gemeria, hair and personal care brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Shopify"],
    summary: "A full year of Meta Ads and Shopify work for Gemeria, named with the client's permission.",
    metrics: [
      { label: "Revenue generated", value: "₹5,67,44,676" },
      { label: "Purchases", value: "10,412" },
      { label: "ROAS", value: "4.50" },
      { label: "Average order value", value: "₹4,889" },
    ],
    source: "Marketing portfolio page 4",
    proof: { src: "/case-studies/beauty-personal-care-2025.webp", width: 1200, height: 585, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 4)." },
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "google-ads-2025-account-a",
    vertical: "marketing",
    title: "Google Ads: 5.31x Return on Ad Spend",
    client: "E commerce client (Google Ads account)",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "30 Dec 2024 to 29 Dec 2025",
    channels: ["Google Ads"],
    summary: "Google Ads account managed for a full year.",
    metrics: [
      { label: "Purchases / sales value", value: "₹23.9M" },
      { label: "Ad cost", value: "₹4.5M" },
      { label: "ROAS", value: "531%" },
      { label: "Purchases", value: "3.55K" },
    ],
    source: "Google Ads dashboard screenshot in the marketing portfolio",
    proof: { src: "/case-studies/google-ads-2025-account-a.webp", width: 1200, height: 440, caption: "Google Ads account overview, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 14)." },
    services: ["marketing/performance-marketing", "marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "google-ads-2025-account-b",
    vertical: "marketing",
    title: "Google Ads: 4.79x Conversion Value to Cost",
    client: "E commerce client (Google Ads account)",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "30 Dec 2024 to 29 Dec 2025",
    channels: ["Google Ads"],
    summary: "Google Ads account managed for a full year.",
    metrics: [
      { label: "Purchases / sales value", value: "₹42.1M" },
      { label: "Ad cost", value: "₹8.81M" },
      { label: "Conv. value / cost", value: "4.79" },
      { label: "Impressions", value: "95.6M" },
    ],
    source: "Google Ads dashboard screenshot in the marketing portfolio",
    proof: { src: "/case-studies/google-ads-2025-account-b.webp", width: 1200, height: 556, caption: "Google Ads account overview, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 16)." },
    services: ["marketing/performance-marketing"],
    status: "published",
  },
  {
    slug: "google-ads-2025-account-c",
    vertical: "marketing",
    title: "Google Ads: 3.47x Conversion Value at ₹27.3M Spend",
    client: "E commerce client (Google Ads account)",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "30 Dec 2024 to 29 Dec 2025",
    channels: ["Google Ads"],
    summary: "A large Google Ads account managed for a full year.",
    metrics: [
      { label: "Conversion value", value: "₹94.7M" },
      { label: "Ad cost", value: "₹27.3M" },
      { label: "Conv. value / cost", value: "3.47" },
      { label: "Impressions", value: "277M" },
    ],
    source: "Google Ads dashboard screenshot in the marketing portfolio",
    proof: { src: "/case-studies/google-ads-2025-account-c.webp", width: 1200, height: 423, caption: "Google Ads account overview, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 13)." },
    services: ["marketing/performance-marketing"],
    status: "published",
  },
  {
    slug: "google-ads-2025-account-d",
    vertical: "marketing",
    title: "Google Ads: 3.27x Return on Ad Spend",
    client: "E commerce client (Google Ads account)",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "30 Dec 2024 to 29 Dec 2025",
    channels: ["Google Ads"],
    summary: "Google Ads account managed for a full year.",
    metrics: [
      { label: "Purchases / sales value", value: "₹7.36M" },
      { label: "Ad cost", value: "₹2.25M" },
      { label: "ROAS", value: "327%" },
      { label: "Avg. CPC", value: "₹25.19" },
    ],
    source: "Google Ads dashboard screenshot in the marketing portfolio",
    proof: { src: "/case-studies/google-ads-2025-account-d.webp", width: 1200, height: 543, caption: "Google Ads account overview, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 15)." },
    services: ["marketing/performance-marketing"],
    status: "published",
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.status === "published");
export const getCaseStudy = (slug: string) => publishedCaseStudies.find((c) => c.slug === slug);
