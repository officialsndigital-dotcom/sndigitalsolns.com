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
  /** Per-account or per-brand breakdown, when one case study covers several. */
  table?: { caption: string; columns: string[]; rows: string[][] };
  /** Dashboard screenshots from the supplied marketing portfolio PDF. */
  proofs?: { src: string; width: number; height: number; caption: string }[];
  /** Recorded walkthroughs of the live campaign dashboards, when the company has published them. */
  videos?: { url: string; label: string }[];
  /**
   * Results that come from booking records rather than the campaign dashboard.
   * Each one names its own source, because the dashboards stop at replies.
   */
  outcomes?: { label: string; value: string; source: string }[];
  /**
   * One block per account, for work run across several accounts. Each block
   * carries that account's own figures and its own dashboard recording, which
   * reads better than one wide table.
   */
  accounts?: { name: string; role: string; video: string; figures: { label: string; value: string }[] }[];
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
    source: "Our own sales calendar and LinkedIn account, for the 72 day period. This is our campaign, so the record is internal rather than a client dashboard.",
    services: ["marketing/b2b-lead-generation", "marketing/crm-marketing-automation"],
    status: "draft",
    note: "This was our own outreach, run on our own network and our own offer. We are showing it because it is the process we run for clients, not because your numbers will be these numbers. What you get depends on who you sell to, how strong your offer is and how warm your network already is. We will give you an honest read on all three before you commit to anything.",
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
    objective: "Grow a direct-to-consumer kids apparel store through a full year without letting return on ad spend slide as budget went up.",
    approach: [
      "Rebuilt the account around the product sets that actually repeat, rather than spreading budget across the whole catalogue.",
      "Ran Meta Ads for discovery and Google Ads to catch demand already searching, so the two were not bidding against each other.",
      "Fixed Shopify tracking first, so every decision after that came from numbers we trusted.",
      "Reviewed creative weekly and retired an ad as soon as its cost per purchase drifted, instead of waiting for the month to end.",
      "Reported revenue and return on ad spend against the previous year, not against the previous week.",
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proofs: [{ src: "/case-studies/kids-apparel-d2c-2025.webp", width: 1200, height: 608, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 2)." }],
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
    objective: "Sell a high ticket womenswear range online, where the order values are large and the number of buyers is small enough that every one matters.",
    approach: [
      "Treated this as a considered purchase: longer consideration windows, and audiences built from people who had actually engaged, not just clicked.",
      "Put the budget behind the pieces that carried the margin rather than the pieces that got the most traffic.",
      "Used Google Ads on branded and high intent queries so the brand was not paying Meta to recapture its own demand.",
      "Watched average order value as closely as return on ad spend, because discounting would have bought volume and lost the year.",
      "Reported monthly against the same period in 2024.",
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proofs: [{ src: "/case-studies/premium-womenswear-2025.webp", width: 1200, height: 1290, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 3)." }],
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
    objective: "Build a year of predictable online revenue for an ethnic wear brand through a calendar that is driven by festivals and weddings.",
    approach: [
      "Planned the year around the demand peaks instead of spending evenly, and built budget up ahead of each one.",
      "Separated new customer and returning customer campaigns, so the return on ad spend figure was not being flattered by repeat buyers.",
      "Refreshed creative for each occasion rather than running the same set all year.",
      "Kept Shopify tracking and the catalogue feed clean, so the dynamic campaigns had accurate stock and pricing.",
      "Reported revenue, purchases and return on ad spend monthly.",
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proofs: [{ src: "/case-studies/women-ethnic-wear-2025.webp", width: 1200, height: 1246, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 6)." }],
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "women-ethnic-wear-b-2025",
    vertical: "marketing",
    title: "Women's Ethnic Wear: ₹1.99 Cr Revenue at 5.50 ROAS",
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
    objective: "Make a smaller ethnic wear catalogue return more per rupee than it had been, rather than simply spending more.",
    approach: [
      "Started by cutting the campaigns that were not paying for themselves, which raised the return before any new spend went in.",
      "Concentrated budget on a short list of proven products and built the creative around them.",
      "Used the catalogue feed for retargeting, so people saw the item they had actually looked at.",
      "Tested one variable at a time, so we knew which change moved the number.",
      "Reported revenue, purchases and return on ad spend monthly.",
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proofs: [{ src: "/case-studies/women-ethnic-wear-b-2025.webp", width: 1200, height: 1230, caption: "Shopify analytics for the store, full year 2025 (marketing portfolio, page 7)." }],
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
    objective: "Grow a gifting and decor store where most of the year's revenue arrives in a few short, crowded windows.",
    approach: [
      "Mapped the gifting calendar first and committed budget to the windows that mattered, weeks before they opened.",
      "Built separate campaigns for gift buyers and for people buying for their own home, because they respond to different messages.",
      "Pushed bundles and price points that lifted the basket, rather than discounting single items.",
      "Kept the catalogue feed accurate through the peaks, so ads never sent people to something out of stock.",
      "Reported revenue, purchases and return on ad spend monthly.",
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proofs: [{ src: "/case-studies/gifting-decor-2025.webp", width: 1200, height: 611, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 8)." }],
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "jewellery-brand-2025",
    vertical: "marketing",
    title: "Fashion Jewellery: ₹72.8 L Revenue at 4.10 ROAS",
    client: "Fashion and imitation jewellery brand",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "Jan to Dec 2025",
    channels: ["Meta Ads", "Shopify"],
    summary: "A year of Meta Ads and Shopify work for a fashion and imitation jewellery brand selling at everyday price points.",
    metrics: [
      { label: "Revenue generated", value: "₹72,79,074" },
      { label: "Purchases", value: "8,111" },
      { label: "ROAS", value: "4.10" },
      { label: "Average order value", value: "About ₹900" },
    ],
    objective: "Sell fashion and imitation jewellery at everyday price points, where the margin per order is small and the cost per purchase has to stay low to work.",
    approach: [
      "Optimised for cost per purchase, because at an average order of about nine hundred rupees that is the number that decides whether the account is viable.",
      "Leaned on the catalogue feed and broad prospecting, which suits a wide range of low priced, visually driven products.",
      "Used volume of creative rather than volume of budget, refreshing frequently to hold down cost per click.",
      "Encouraged multi item orders, since one more piece in the basket changes the economics more than any bid adjustment.",
      "Reported revenue, purchases and return on ad spend monthly.",
    ],
    source: "Marketing portfolio, Performance Snapshot and Shopify analytics screenshot",
    proofs: [{ src: "/case-studies/jewellery-brand-2025.webp", width: 1200, height: 597, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 9)." }],
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
    objective: "Grow Gemeria's hair and personal care range through a full year on Meta Ads, in a category where the first order matters less than the second.",
    approach: [
      "Built prospecting around the hero products that bring people into the range for the first time.",
      "Ran retargeting on a replenishment rhythm, so returning customers were reached when they were likely to be running out.",
      "Kept Shopify analytics and the ad account reconciled, so reported revenue matched the store.",
      "Reviewed creative continuously and retired ads on cost per purchase rather than on how long they had run.",
      "Reported revenue, purchases, average order value and return on ad spend monthly.",
    ],
    source: "Marketing portfolio page 4",
    proofs: [{ src: "/case-studies/beauty-personal-care-2025.webp", width: 1200, height: 585, caption: "Shopify analytics for the store, full year 2025 against 2024 (marketing portfolio, page 4)." }],
    services: ["marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "google-ads-2025-four-accounts",
    vertical: "marketing",
    title: "Four Google Ads Accounts: 3.27x to 5.31x Return on Ad Spend",
    client: "Four e commerce clients",
    industry: "E Commerce & Retail",
    industrySlug: "ecommerce-retail",
    period: "30 Dec 2024 to 29 Dec 2025",
    channels: ["Google Ads"],
    summary: "Four separate Google Ads accounts run for a full year, each reported from its own dashboard.",
    metrics: [
      { label: "Accounts managed", value: "4" },
      { label: "Total ad spend", value: "₹42.9M" },
      { label: "Return on ad spend", value: "3.27x to 5.31x" },
      { label: "Period", value: "Full year" },
    ],
    objective: "Grow online sales for four e commerce businesses through Google Ads, each with its own budget, catalogue and margin.",
    approach: [
      "Each account is managed separately, with its own budget, structure and targets.",
      "Campaigns are measured on conversion value against cost rather than on clicks or impressions.",
      "Budget moves to the campaigns returning the most, and spend grows only while the return holds.",
    ],
    table: {
      caption: "Each account reported separately. Returns differ because the businesses, margins and budgets differ.",
      columns: ["Account", "Ad spend", "Conversion value", "Return", "Also shown"],
      rows: [
        ["Account A", "₹4.5M", "₹23.9M", "5.31x", "3.55K purchases"],
        ["Account B", "₹8.81M", "₹42.1M", "4.79x", "95.6M impressions"],
        ["Account C", "₹27.3M", "₹94.7M", "3.47x", "277M impressions"],
        ["Account D", "₹2.25M", "₹7.36M", "3.27x", "₹25.19 average cost per click"],
      ],
    },
    source: "Google Ads dashboard screenshots in the marketing portfolio",
    proofs: [
      { src: "/case-studies/google-ads-2025-account-a.webp", width: 1200, height: 440, caption: "Account A, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 14)." },
      { src: "/case-studies/google-ads-2025-account-b.webp", width: 1200, height: 556, caption: "Account B, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 16)." },
      { src: "/case-studies/google-ads-2025-account-c.webp", width: 1200, height: 423, caption: "Account C, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 13)." },
      { src: "/case-studies/google-ads-2025-account-d.webp", width: 1200, height: 543, caption: "Account D, 30 Dec 2024 to 29 Dec 2025 (marketing portfolio, page 15)." },
    ],
    services: ["marketing/performance-marketing", "marketing/ecommerce-growth"],
    status: "published",
  },
  {
    slug: "linkedin-outbound-four-campaigns",
    vertical: "marketing",
    title: "Four LinkedIn Accounts: 1,086 Replies From Decision Makers",
    client: "Sanjan Sharma, Marios Dionysopoulos, Kiran Kalshetti and Diwakar Sharma",
    industry: "B2B services",
    period: "Four LinkedIn accounts",
    channels: ["LinkedIn", "Email"],
    summary:
      "We run outbound from four separate LinkedIn accounts, two belonging to our own team and two belonging to clients whose outreach we run. Each account carries several campaigns and is reported from its own dashboard. The headline figures are activity and engagement taken from those dashboards. Where we also hold booking records, the meetings and calls those conversations turned into are shown separately below.",
    metrics: [
      { label: "Invitations sent", value: "5,076" },
      { label: "Replies received", value: "1,086" },
      { label: "Connections accepted", value: "1,255" },
      { label: "Messages sent", value: "14,800" },
    ],
    objective:
      "Run a consistent outbound channel from real, established LinkedIn accounts, so invitations arrive from a person with a genuine profile rather than from an anonymous one.",
    approach: [
      "Each account runs its own campaigns, and each campaign starts with its own ideal customer profile, so invitations go to verified decision makers rather than a bought list.",
      "Messaging is written for the role and the market, and every sequence carries three to five follow-up steps so conversations do not stall after one message.",
      "LinkedIn and email run together as one system, and every reply is read and qualified by our team.",
      "Activity, engagement and outcome are reported separately, so you can tell which figure comes from which source.",
    ],
    accounts: [
      {
        name: "Sanjan Sharma",
        role: "Our founder",
        video: "https://drive.google.com/file/d/1LYvQs0vUp1-cMTGJcPpA0I4sXAAAy0tw/view",
        figures: [
          { label: "Invitations sent", value: "2,357" },
          { label: "Connections accepted", value: "532" },
          { label: "Acceptance rate", value: "22.6%" },
          { label: "Messages sent", value: "7,252" },
          { label: "Replies received", value: "494" },
          { label: "Reply rate", value: "17%" },
        ],
      },
      {
        name: "Marios Dionysopoulos",
        role: "Client",
        video: "https://drive.google.com/file/d/17HhlJSOe6b7LCdpfgM3y3h6qpEDJ4h9d/view",
        figures: [
          { label: "Invitations sent", value: "775" },
          { label: "Connections accepted", value: "310" },
          { label: "Acceptance rate", value: "40%" },
          { label: "Messages sent", value: "1,039" },
          { label: "Replies received", value: "108" },
          { label: "Reply rate", value: "34.8%" },
        ],
      },
      {
        name: "Kiran Kalshetti",
        role: "Client",
        video: "https://drive.google.com/file/d/1aWP6hj3ASMIq4Bc_aIIqj2FyjywYJ_kR/view",
        figures: [
          { label: "Invitations sent", value: "863" },
          { label: "Connections accepted", value: "262" },
          { label: "Acceptance rate", value: "30.4%" },
          { label: "Messages sent", value: "2,325" },
          { label: "Replies received", value: "208" },
          { label: "Reply rate", value: "22.9%" },
        ],
      },
      {
        name: "Diwakar Sharma",
        role: "Our team",
        video: "https://drive.google.com/file/d/1qDMMRnk7ILl4J0s9sUFgnMw34x_v1Wrt/view",
        figures: [
          { label: "Invitations sent", value: "1,081" },
          { label: "Connections accepted", value: "151" },
          { label: "Acceptance rate", value: "14%" },
          { label: "Messages sent", value: "4,184" },
          { label: "Replies received", value: "276" },
          { label: "Reply rate", value: "13.7%" },
        ],
      },
    ],
    source: "Dashboard screenshots and recordings from the four LinkedIn accounts",
    outcomes: [
      {
        label: "Qualified sales meetings, in 58 days",
        value: "33",
        source:
          "Marios Dionysopoulos's account. Taken from the booking records for that 58 day campaign. His 108 replies produced 33 meetings, a 30.6% reply to meeting rate. This is the only account we hold booking records for.",
      },
      {
        label: "Sales calls booked, in 72 days",
        value: "217",
        source: "Our own outreach, run on the same system. Taken from our sales calendar over a 72 day period.",
      },
    ],
    services: ["marketing/b2b-lead-generation"],
    status: "published",
    note:
      "A reply is not a meeting. The headline figures and the table are activity and engagement taken from the account dashboards. The meetings and calls are listed separately because they come from booking records, and they cover one account and one period each rather than all four accounts.",
  },
  {
    slug: "linkedin-33-meetings-58-days",
    vertical: "marketing",
    title: "33 Qualified Sales Meetings in 58 Days From LinkedIn Outbound",
    client: "Marios Dionysopoulos",
    industry: "B2B services",
    period: "58 days",
    channels: ["LinkedIn"],
    summary:
      "A targeted LinkedIn outbound campaign reached a 40% connection acceptance rate and a 34.8% reply rate, and converted those conversations into 33 booked sales meetings over a 58-day campaign.",
    metrics: [
      { label: "Connections accepted", value: "310" },
      { label: "Acceptance rate", value: "40%" },
      { label: "Replies received", value: "108" },
      { label: "Meetings booked", value: "33" },
    ],
    objective:
      "Book qualified sales conversations with decision makers in a defined target market, without adding headcount to the sales team.",
    approach: [
      "Targeting was narrowed to the roles and company profiles that matched the offer, which is what produced a 40% acceptance rate rather than a broad, untargeted list.",
      "Messaging was written for that specific role and market, and over a third of the prospects who were messaged replied.",
      "Replies were qualified by our team, and only genuine buying interest was moved toward a meeting.",
      "The campaign ran for a stated 58-day period, so the result can be read against a defined window rather than an open-ended one.",
    ],
    table: {
      caption: "Campaign dashboard figures for the 58-day period.",
      columns: ["Measure", "Figure", "Tier"],
      rows: [
        ["Invitations sent", "775", "Activity"],
        ["Connections accepted", "310", "Engagement"],
        ["Acceptance rate", "40%", "Engagement"],
        ["Messages sent", "1,039", "Activity"],
        ["Message replies", "108", "Engagement"],
        ["Reply rate", "34.8%", "Engagement"],
        ["Meetings booked", "33", "Outcome"],
      ],
    },
    source: "Campaign dashboard screenshot, plus the campaign booking records for the meetings figure",
    videos: [{ url: "https://drive.google.com/file/d/17HhlJSOe6b7LCdpfgM3y3h6qpEDJ4h9d/view", label: "Watch the dashboard walkthrough" }],
    services: ["marketing/b2b-lead-generation"],
    status: "draft",
    note:
      "The dashboard shows the activity and engagement figures. The 33 booked meetings come from the campaign booking records for the same period, not from the dashboard screenshot. This campaign is also included in the four-account totals as Marios Dionysopoulos's account.",
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.status === "published");
export const getCaseStudy = (slug: string) => publishedCaseStudies.find((c) => c.slug === slug);
