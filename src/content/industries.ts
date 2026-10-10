import type { Industry } from "./types";

// Phase 1 industries have portfolio or case study evidence. Phase 2 industries
// are listed on the overview but get their own page only once proof exists.
export const industries: Industry[] = [
  {
    slug: "education",
    name: "Education",
    metaTitle: "Education Marketing Agency & School Management Software",
    h1: "Education Marketing and Software for Schools and Colleges",
    metaDescription:
      "Digital marketing for schools and colleges, institution websites, and ACADMiN, our school and college management software, from admissions to accreditation.",
    intro: "We have built websites for more than 15 schools, colleges and education organisations, and we build our own education ERP, ACADMiN.",
    challenges: [
      "Admissions enquiries arrive through many channels and are hard to follow up.",
      "Institution websites are outdated and hard for staff to update.",
      "Accreditation and reporting take weeks of manual data gathering.",
    ],
    needs: ["A clear, current institution website", "An ERP for admissions, fees, exams and records", "Admissions enquiry follow-up", "Local and course-level search visibility"],
    services: ["development/website-development", "development/crm-erp-development", "marketing/crm-marketing-automation", "marketing/seo-aeo", "marketing/performance-marketing"],
    products: ["acadmin"],
    portfolioCategory: "Education",
    why: [
      "Education websites in our portfolio include hrcollege.edu, dalmialionscollege.ac.in, sndtcollegechurchgate.in and ksmanjunathacollege.edu.in.",
      "Our own education ERP, ACADMiN, covers admissions to alumni, including NAAC support.",
    ],
    faqs: [
      { q: "Can you build our college website and connect it to an ERP?", a: "Yes. We build institution websites and can connect admissions enquiries to ACADMiN or another system you use." },
    ],
    phase: 1,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    metaTitle: "Real Estate CRM, Websites & Lead Generation",
    h1: "Real Estate CRM, Websites and Lead Generation",
    metaDescription:
      "Real estate CRM, property and listing websites, and lead generation for developers, brokers and agents in India, the UAE, Canada and beyond.",
    intro: "We have built websites for property businesses and real estate professionals in Canada, the UAE and other markets.",
    challenges: [
      "Property enquiries go cold because follow-up is slow.",
      "Listings and project pages are hard to update.",
      "Paid leads are expensive and poorly qualified.",
    ],
    needs: ["Project and listing websites", "Lead capture connected to a CRM", "Paid campaigns for projects", "Automated enquiry follow-up"],
    services: ["development/website-development", "marketing/performance-marketing", "marketing/crm-marketing-automation", "marketing/seo-aeo", "development/web-application-development"],
    portfolioCategory: "Real Estate",
    why: ["Real estate websites in our portfolio include homencondos.ca, teamarora.com, investwithdion.ae and soberestate.net."],
    faqs: [
      { q: "Can enquiries from our website go straight to our sales team?", a: "Yes. We connect website and ad enquiries to your CRM with instant notifications and follow-up sequences." },
    ],
    phase: 1,
  },
  {
    slug: "jewellery-diamonds",
    name: "Jewellery & Diamonds",
    metaTitle: "Jewellery Website Design, ERP & Marketing",
    h1: "Jewellery Website Design, ERP and Marketing",
    metaDescription:
      "Jewellery website design and ecommerce, marketing for jewellery brands, and eheera, our jewellery ERP and diamond inventory software for the trade.",
    intro: "We work with jewellery brands, diamond businesses, B2B suppliers and industry organisations, and we offer eheera, jewellery management software and diamond ERP.",
    challenges: [
      "Large, detailed inventories are hard to present online.",
      "Memo, manufacturing and accounts run on separate systems.",
      "International buyers need to trust a supplier before the first enquiry.",
    ],
    needs: ["Catalogue and brand websites", "E commerce for jewellery", "Inventory and memo software", "Performance marketing for jewellery brands"],
    services: ["development/website-development", "development/ecommerce-development", "marketing/ecommerce-growth", "marketing/performance-marketing", "pr/influencer-marketing"],
    products: ["eheera"],
    portfolioCategory: "Jewellery & Diamonds",
    caseStudies: ["jewellery-brand-2025"],
    why: [
      "Jewellery and diamond websites in our portfolio include diamonddeal.ae, thecaratcreations.com, colourjewels.com and anitadiam.com.",
      "eheera, our jewellery and diamond ERP, is built around memo, 4C inventory, karigar and Kapan processes.",
    ],
    faqs: [
      { q: "Can our website show live inventory from our ERP?", a: "Where your ERP or inventory system provides a feed or API, yes. We scope it after reviewing the system." },
    ],
    phase: 1,
  },
  {
    slug: "ecommerce-retail",
    name: "E Commerce & Retail",
    metaTitle: "Ecommerce Agency | Stores, Ads & Growth Marketing",
    h1: "Ecommerce Agency for D2C and Retail Brands",
    metaDescription:
      "Ecommerce agency for D2C and retail brands: Shopify and WooCommerce stores, Meta and Google Ads, SEO and retention. Full-year 2025 results from six brands.",
    intro: "We build online stores and run growth marketing for D2C and retail brands. In 2025 our marketing team ran campaigns for brands in apparel, beauty, ethnic wear, gifting and jewellery.",
    challenges: [
      "Rising ad costs squeeze margins.",
      "Stores convert poorly on mobile.",
      "Customers buy once and do not return.",
    ],
    needs: ["Fast, mobile-first stores", "Meta and Google advertising", "Product feed and Shopping optimisation", "Email and SMS retention"],
    services: ["development/ecommerce-development", "marketing/ecommerce-growth", "marketing/performance-marketing", "marketing/crm-marketing-automation"],
    portfolioCategory: "E Commerce & Retail",
    caseStudies: ["kids-apparel-d2c-2025", "premium-womenswear-2025", "women-ethnic-wear-2025", "gifting-decor-2025"],
    why: ["Individual 2025 campaign results for D2C brands are published as dated case studies with their sources."],
    faqs: [
      { q: "Do you work with Shopify brands?", a: "Yes. We build and market Shopify, WooCommerce and custom stores." },
    ],
    phase: 1,
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    metaTitle: "SaaS Development & SaaS Marketing Agency",
    h1: "SaaS Development and SaaS Marketing for Technology Companies",
    metaDescription:
      "SaaS product development and SaaS marketing: MVPs, product engineering, B2B lead generation and demand generation for software and technology companies.",
    intro: "We build SaaS products, including our own, and generate sales meetings for technology companies through B2B outreach.",
    challenges: [
      "The product is ready but the pipeline is thin.",
      "Product development competes with sales for the founder's time.",
      "Demo bookings depend on inbound traffic that has not arrived yet.",
    ],
    needs: ["SaaS MVP and product development", "B2B lead generation and demo booking", "SaaS SEO and content", "Founder visibility"],
    services: ["development/saas-development", "development/web-application-development", "marketing/b2b-lead-generation", "marketing/seo-aeo", "pr/founder-thought-leadership"],
    caseStudies: ["linkedin-outbound-four-campaigns"],
    why: ["We build and run our own SaaS products, ACADMiN and eheera.", "217 sales calls booked in 72 days through our own LinkedIn outreach."],
    faqs: [
      { q: "Can you book demos for our SaaS product?", a: "Yes. Our B2B lead generation service books product demos with decision makers who match your ICP." },
    ],
    phase: 1,
  },
  {
    slug: "it-services",
    name: "IT & Technology Services",
    metaTitle: "Marketing & Lead Generation for IT Services Companies",
    h1: "Marketing and Lead Generation for IT Services Companies",
    metaDescription:
      "B2B lead generation, marketing and websites for IT services, managed services and consulting companies selling to decision makers in India and abroad.",
    intro: "IT services companies sell to decision makers who are hard to reach. We help them reach those people and look credible when they do.",
    challenges: [
      "Growth depends on referrals and a few large accounts.",
      "Messaging sounds the same as every other IT company.",
      "Sales teams spend more time prospecting than selling.",
    ],
    needs: ["Targeted B2B outreach", "A credible corporate website", "CRM and follow-up automation", "Founder and leadership visibility"],
    services: ["marketing/b2b-lead-generation", "development/website-development", "marketing/crm-marketing-automation", "pr/founder-thought-leadership", "development/ai-automation"],
    caseStudies: ["linkedin-outbound-four-campaigns"],
    why: ["217 sales calls booked in 72 days through our own LinkedIn outreach system."],
    faqs: [
      { q: "Which markets can you reach?", a: "We run outreach to decision makers in markets including the UAE, USA, UK, Canada, Australia, Saudi Arabia, Kuwait, South Africa and Europe." },
    ],
    phase: 1,
  },
];

export const phase2Industries = [
  "Healthcare",
  "BFSI & Financial Services",
  "Manufacturing",
  "Oil & Gas",
  "Engineering",
  "Infrastructure & Construction",
  "Hospitality",
  "Logistics & Supply Chain",
  "Professional Services",
  "Consulting",
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
