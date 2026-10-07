import type { Faq } from "./types";

// Buyer-intent additions from the DataForSEO "People Also Ask" research
// (website/seo/research-2026-10-07/buyer-questions.md). Nearly every service SERP
// leads with "how much does it cost" and "which company is best", so each page
// answers both. The company has decided not to publish prices (2026-10-07), so these
// sections explain what drives cost and never quote a figure.

export type BuyerIntent = {
  /** What moves the price, shown as "What affects the cost" and used in the cost FAQ. */
  costDrivers: string[];
  /** The cost question as buyers phrase it. */
  costQuestion: string;
  /** How we price it (fixed quote, monthly retainer…). */
  pricingModel: string;
  extraFaqs?: Faq[];
};

const fixedQuote = "After a short consultation and, for larger work, a written scope, we give a fixed quote broken down by phase.";
const retainer = "Marketing and PR work is usually a monthly fee agreed after we understand your goals; ad spend is paid directly to the platform and is separate from our fee.";

export const buyerIntent: Record<string, BuyerIntent> = {
  "development/website-development": {
    costQuestion: "How much does a website cost to develop?",
    costDrivers: ["Number of pages and templates", "Custom design versus an adapted theme", "Content writing, photography and translations", "Integrations such as CRM, booking or payments", "SEO migration from an existing site"],
    pricingModel: fixedQuote,
    extraFaqs: [{ q: "How do I choose the best website development company?", a: "Look at live websites they have built in your industry, ask who will own the code and hosting, and check that SEO, speed and mobile layout are part of the scope rather than extras. Our portfolio lists live sites by industry." }],
  },
  "development/ecommerce-development": {
    costQuestion: "How much does an ecommerce website cost?",
    costDrivers: ["Platform: Shopify, WooCommerce or custom", "Number of products, variants and collections", "Payment, shipping and tax set-up per country", "Integrations with ERP, inventory or marketplaces", "Migration of products, customers and orders"],
    pricingModel: fixedQuote,
  },
  "development/custom-software-development": {
    costQuestion: "How much does custom software development cost?",
    costDrivers: ["Number of user roles, modules and workflows", "Integrations with existing systems", "Data migration from spreadsheets or old software", "Security, audit and compliance requirements", "Ongoing hosting, support and change requests"],
    pricingModel: `${fixedQuote} Larger systems are usually delivered and priced in phases.`,
    extraFaqs: [{ q: "What does a software development company do?", a: "It turns a business process into working software: understanding requirements, designing the system and interface, building and testing it, deploying it and supporting it afterwards." }],
  },
  "development/web-application-development": {
    costQuestion: "How much does a web application cost?",
    costDrivers: ["Number of screens, roles and permissions", "Dashboards, reports and data volume", "Integrations and third-party APIs", "Real-time features such as chat or notifications", "Hosting and support after launch"],
    pricingModel: fixedQuote,
  },
  "development/mobile-app-development": {
    costQuestion: "How much does it cost to develop a mobile app?",
    costDrivers: ["Android, iOS or both (native or cross platform)", "Number of screens and user roles", "Backend, admin panel and APIs", "Payments, maps, chat or offline features", "App store publishing and maintenance"],
    pricingModel: fixedQuote,
    extraFaqs: [{ q: "Which mobile app development company is best?", a: "The best fit is a team that has shipped apps similar to yours, explains trade-offs between native and cross platform clearly, and includes testing, store publishing and post-launch support in the scope. We have developed 74+ applications." }],
  },
  "development/saas-development": {
    costQuestion: "How much does it cost to build a SaaS product?",
    costDrivers: ["Scope of the first release (MVP) versus later phases", "Multi-tenancy, roles and subscription billing", "Integrations customers expect", "Security and data isolation requirements", "Hosting, monitoring and support"],
    pricingModel: `${fixedQuote} We usually recommend starting with a focused MVP.`,
    extraFaqs: [{ q: "What is SaaS product development?", a: "Building software that customers use online on a subscription, including the application, multi-tenant data, billing, onboarding and the operations needed to run it for many customers. We build and run our own SaaS products, ACADMiN and eheera." }],
  },
  "development/crm-erp-development": {
    costQuestion: "How much does a custom CRM or ERP cost?",
    costDrivers: ["Modules needed (sales, inventory, accounts, HR…)", "Number of branches, companies and users", "Migration from current software or spreadsheets", "Integrations with accounting, payment or devices", "Training and support"],
    pricingModel: `${fixedQuote} Many clients start with the module that hurts most and add others later.`,
    extraFaqs: [{ q: "Should we build a custom CRM or buy one?", a: "Buy when an off-the-shelf CRM fits your process with light configuration. Build when your process is a competitive advantage, licence costs grow with users, or you need deep integration with your own systems. We will tell you which applies." }],
  },
  "development/ai-automation": {
    costQuestion: "How much does AI automation cost?",
    costDrivers: ["Number of workflows to automate", "Systems the automation must read from and write to", "Whether AI models need your documents or data", "Human review steps and error handling", "Usage-based AI and automation platform fees"],
    pricingModel: `${fixedQuote} AI model and platform usage is billed by the provider at cost.`,
    extraFaqs: [{ q: "What does an AI automation agency do?", a: "It finds repetitive work in your business, such as data entry, lead follow-up, reporting or document handling, and builds workflows and AI agents that do it reliably, with people reviewing the steps that need judgement." }],
  },
  "development/api-integration": {
    costQuestion: "How much does API integration cost?",
    costDrivers: ["Number of systems and data flows", "Quality of the APIs available", "Real-time versus scheduled sync", "Data mapping and clean-up", "Monitoring and error alerts"],
    pricingModel: fixedQuote,
    extraFaqs: [{ q: "What is involved in API integration?", a: "Mapping which data moves between systems and when, building the connection, handling errors and duplicates, testing with real data, and monitoring it after go-live." }],
  },
  "development/ui-ux-design": {
    costQuestion: "How much does UI/UX design cost?",
    costDrivers: ["Number of screens and user journeys", "Research and user testing", "Design system and component library", "Prototypes for investor or user testing", "Developer handover and design QA"],
    pricingModel: fixedQuote,
  },
  "marketing/b2b-lead-generation": {
    costQuestion: "How much does B2B lead generation cost?",
    costDrivers: ["Number of markets, segments and decision-maker roles", "Number of sender profiles and channels (LinkedIn, email)", "Volume of research and personalisation", "Meeting qualification criteria", "CRM set-up and reporting"],
    pricingModel: retainer,
    extraFaqs: [
      { q: "Is LinkedIn good for B2B lead generation?", a: "For most B2B services and software sold to defined roles, yes. Buyers are identifiable by title, company and market, and a personal message from a founder or salesperson gets more replies than an ad. We booked 217 sales calls in 72 days from our own LinkedIn outreach." },
      { q: "Which companies are best for B2B lead generation?", a: "Look for a team that researches prospects rather than buying lists, shows reply and meeting rates rather than message counts, works from your profiles with your approval, and logs everything in your CRM." },
    ],
  },
  "marketing/performance-marketing": {
    costQuestion: "How much does a performance marketing agency cost?",
    costDrivers: ["Monthly ad spend and number of platforms", "Number of campaigns, products and markets", "Creative production volume", "Tracking and conversion set-up", "Reporting frequency"],
    pricingModel: retainer,
    extraFaqs: [{ q: "What does a performance marketing agency do?", a: "It plans, runs and optimises paid campaigns on platforms such as Google, Meta and LinkedIn, and is measured on leads, sales and return on ad spend rather than impressions." }],
  },
  "marketing/seo-aeo": {
    costQuestion: "How much do SEO services cost?",
    costDrivers: ["Size and technical health of your website", "Number of markets, cities and languages", "Content production needed each month", "Competition in your keywords", "Link building and digital PR"],
    pricingModel: retainer,
    extraFaqs: [
      { q: "Is SEO still worth it?", a: "Yes, when buyers search for what you sell. Search is also how AI assistants find sources, so answer engine optimisation now sits alongside classic SEO. We check search demand for your services before recommending it." },
      { q: "What does an SEO agency do?", a: "It researches what your buyers search for, fixes technical issues, improves and creates pages that answer those searches, earns links and mentions, and reports rankings, traffic and enquiries." },
    ],
  },
  "marketing/social-media-content": {
    costQuestion: "How much does a social media marketing agency cost?",
    costDrivers: ["Number of platforms and posts per month", "Video and design production", "Founder or executive content", "Community management and replies", "Paid boosting"],
    pricingModel: retainer,
  },
  "marketing/crm-marketing-automation": {
    costQuestion: "How much does CRM and marketing automation set-up cost?",
    costDrivers: ["CRM platform and number of users", "Number of pipelines, forms and workflows", "Data migration and clean-up", "Email and WhatsApp sequences to write", "Training and ongoing support"],
    pricingModel: `Set-up is a fixed quote; ongoing optimisation is a monthly fee. CRM licences are paid to the vendor.`,
    extraFaqs: [{ q: "What does marketing automation do?", a: "It follows up with every lead automatically: instant replies to enquiries, reminders before meetings, nurture emails for people not ready to buy, and alerts to your team when someone is ready to talk." }],
  },
  "marketing/ecommerce-growth": {
    costQuestion: "How much does an ecommerce marketing agency cost?",
    costDrivers: ["Monthly ad spend across Meta and Google", "Number of products and catalogues", "Creative production", "Email, SMS and WhatsApp retention flows", "Marketplaces and markets covered"],
    pricingModel: retainer,
  },
  "pr/public-relations": {
    costQuestion: "How much does a PR agency cost?",
    costDrivers: ["Number of announcements and stories per month", "Markets and publications targeted", "Spokesperson preparation and media training", "Press release writing and distribution", "Crisis or reputation support"],
    pricingModel: retainer,
    extraFaqs: [{ q: "What does a PR agency do?", a: "It finds the stories in your business that editors and audiences care about, writes and pitches them to the right journalists and publications, prepares your spokespeople, and reports what was published." }],
  },
  "pr/digital-pr": {
    costQuestion: "How much does digital PR cost?",
    costDrivers: ["Number of campaigns and placements targeted", "Data or research needed for stories", "Markets and publication tiers", "Link-earning goals for SEO", "Online reputation monitoring"],
    pricingModel: retainer,
    extraFaqs: [{ q: "What does a digital PR agency do?", a: "It earns coverage and mentions on online publications, podcasts and industry sites, which builds credibility with buyers and links that support SEO and AI search visibility." }],
  },
  "pr/founder-thought-leadership": {
    costQuestion: "How much does founder personal branding cost?",
    costDrivers: ["Posts and articles per month", "Ghostwriting versus editing your drafts", "Video and podcast content", "Speaking and media opportunities", "LinkedIn profile and engagement management"],
    pricingModel: retainer,
    extraFaqs: [{ q: "Can LinkedIn be used for founder personal branding?", a: "Yes. For B2B founders it is usually the main channel, because buyers, partners and hires check the founder's profile before they reply." }],
  },
  "pr/influencer-marketing": {
    costQuestion: "How much does an influencer marketing agency cost?",
    costDrivers: ["Number and size of creators", "Platforms and content formats", "Usage rights for ads", "Markets and languages", "Tracking and reporting"],
    pricingModel: `${retainer} Creator fees are agreed with each creator and passed through.`,
    extraFaqs: [{ q: "What is B2B influencer marketing?", a: "Working with respected practitioners, analysts and creators your buyers already follow, such as on LinkedIn, YouTube or podcasts, to build trust in your product or expertise." }],
  },
  "pr/awards-recognition": {
    costQuestion: "How much does award submission support cost?",
    costDrivers: ["Number of awards and categories", "Research to shortlist relevant programmes", "Writing and evidence gathering per entry", "Entry fees charged by organisers", "Promotion after a shortlist or win"],
    pricingModel: "Usually a fee per submission or a package for several. Entry fees are paid to the award organiser.",
    extraFaqs: [{ q: "Are business awards worth it?", a: "They are worth it when the award is respected by your buyers and you will use the result in sales, PR and recruitment. We help you pick programmes that fit and skip the ones that don't." }],
  },
};

export function costFaq(key: string): Faq | undefined {
  const b = buyerIntent[key];
  if (!b) return undefined;
  return { q: b.costQuestion, a: `It depends mainly on: ${b.costDrivers.join("; ")}. ${b.pricingModel}` };
}
