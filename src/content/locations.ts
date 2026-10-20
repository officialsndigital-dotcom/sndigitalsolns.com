import type { Faq } from "./types";

// City pages exist only where DataForSEO showed real local demand (2026-10-07
// research, website/seo/research-2026-10-07/summary.md) AND we can say something
// true about the place: an office, or delivered work there. Bangalore and Delhi
// have high volume but no presence or proof, so they have no page. Do not add a
// city without both.
//
// Work delivered white-label, under another agency's brand, counts as delivered
// work for the second test, but the page must say so plainly and must not carry
// a portfolio host or a named client from it. Those belong to the agency whose
// brand went on them. Calgary and Brisbane are both this case.

export type LocationPage = {
  slug: string;
  city: string;
  region: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** How we serve this city. Must be literally true. */
  presence: string;
  hasOffice: boolean;
  /** Service keys, most-searched locally first, with a local angle. */
  services: { key: string; angle: string }[];
  /** Portfolio hosts from this market (by country domain only; no inferred client locations). */
  portfolioHosts?: string[];
  nearby?: string[];
  faqs: Faq[];
  /** Local search volumes this page was built on, for the team (not rendered). */
  research: string;
};

export const locations: LocationPage[] = [
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    metaTitle: "Digital Marketing Agency & SEO Company in Mumbai",
    metaDescription:
      "SEO, digital marketing, PR, website and software development for Mumbai businesses, from our head office in CBD Belapur, Navi Mumbai. Book a free call.",
    h1: "Digital Marketing, SEO and Website Development Company in Mumbai",
    intro:
      "Mumbai businesses compete for attention in one of India's busiest markets. We help them get found on Google, generate enquiries and sales meetings, and build websites and software that convert, from our head office in Navi Mumbai.",
    presence: "Our head office is in CBD Belapur, Navi Mumbai, so we can meet Mumbai clients in person when a project needs it.",
    hasOffice: true,
    services: [
      { key: "marketing/seo-aeo", angle: "Rank for the searches Mumbai buyers make, including \"near me\" and area searches, and show up in AI answers." },
      { key: "marketing/performance-marketing", angle: "Google and Meta campaigns targeted by pin code, area and audience, measured on enquiries and sales." },
      { key: "pr/public-relations", angle: "Media relations and announcements with business, startup and trade publications." },
      { key: "marketing/social-media-content", angle: "Content and social media management for brands and founders." },
      { key: "development/website-development", angle: "Fast, mobile-first websites built to rank and convert." },
      { key: "marketing/b2b-lead-generation", angle: "LinkedIn and email outreach that books meetings with decision makers in India and abroad." },
    ],
    nearby: ["Navi Mumbai", "Thane", "Andheri", "Bandra", "Powai", "Lower Parel"],
    faqs: [
      { q: "How much does a digital marketing agency in Mumbai cost?", a: "It depends on the channels, the number of campaigns or pages, and your ad spend. We agree a monthly fee after a short consultation; ad spend is paid directly to Google or Meta and is separate from our fee." },
      { q: "Which is the best SEO company in Mumbai?", a: "Choose a team that shows the keywords and enquiries it has delivered, explains its plan in plain language, and does not promise guaranteed rankings. Ask for live examples and how results are reported." },
      { q: "Can we meet in person?", a: "Yes. Our head office is in CBD Belapur, Navi Mumbai. Most work runs over calls and shared dashboards, with in-person meetings when useful." },
    ],
    research: "seo company/agency mumbai 8,100; digital marketing agency mumbai 6,600; mumbai pr agency 1,600; social media marketing agency mumbai 1,000; Andheri 390, Bandra 110, other areas under 50 (IN, Google Ads, Oct 2026).",
  },
  {
    slug: "navi-mumbai",
    city: "Navi Mumbai",
    region: "Maharashtra",
    country: "India",
    metaTitle: "Digital Marketing Agency in Navi Mumbai | SEO & Websites",
    metaDescription:
      "Digital marketing, SEO and website development company based in CBD Belapur, Navi Mumbai. Serving Vashi, Kharghar, Panvel, Thane and across Mumbai.",
    h1: "Digital Marketing Agency and Website Developers in Navi Mumbai",
    intro:
      "We are based in Navi Mumbai. We help local businesses, manufacturers, schools and service companies with SEO, digital marketing, websites and custom software, with a team they can meet.",
    presence: "Our head office is at Shree Nand Dham, Sector 11, CBD Belapur, Navi Mumbai.",
    hasOffice: true,
    services: [
      { key: "marketing/seo-aeo", angle: "Local SEO and Google Business Profile work so nearby customers find you first." },
      { key: "marketing/performance-marketing", angle: "Google and Meta ads targeted at Navi Mumbai, Thane and Mumbai areas." },
      { key: "development/website-development", angle: "Websites for local businesses, schools and manufacturers, built to load fast on mobile." },
      { key: "development/custom-software-development", angle: "Custom software, CRM and ERP for growing companies." },
      { key: "marketing/social-media-content", angle: "Social media content and management." },
      { key: "pr/influencer-marketing", angle: "Influencer campaigns with Mumbai and Maharashtra creators." },
    ],
    nearby: ["CBD Belapur", "Vashi", "Kharghar", "Nerul", "Panvel", "Thane"],
    faqs: [
      { q: "Where is your office in Navi Mumbai?", a: "Office No. A-302, 3rd Floor, Shree Nand Dham, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614." },
      { q: "How much does website development cost in Navi Mumbai?", a: "It depends on the number of pages, custom design, content and integrations such as payments or CRM. We give a fixed quote after a short consultation." },
      { q: "Do you work with businesses in Thane and Panvel?", a: "Yes. We work with businesses across Navi Mumbai, Thane, Panvel and Mumbai, and with clients outside India." },
    ],
    research: "digital marketing agency navi mumbai 1,600; seo company navi mumbai 720; website development navi mumbai 260; Thane: digital marketing agency 1,000, website development 480; CBD Belapur no data (IN, Oct 2026).",
  },
  {
    slug: "dubai",
    city: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
    metaTitle: "SEO, App & Website Development Company for Dubai & UAE",
    metaDescription:
      "SEO, mobile app development, website design, PR and B2B lead generation for businesses in Dubai and the UAE, delivered by our team in India.",
    h1: "SEO, App Development and Website Design for Dubai Businesses",
    intro:
      "Dubai is one of the markets we serve most. We help UAE businesses rank on Google, build mobile apps and websites, run paid campaigns and reach decision makers across the Gulf.",
    presence: "We serve Dubai and the UAE remotely from our team in India, with calls scheduled at times that suit you. We do not have an office in the UAE.",
    hasOffice: false,
    services: [
      { key: "marketing/seo-aeo", angle: "SEO for the searches your buyers make across Dubai and the UAE." },
      { key: "development/mobile-app-development", angle: "Android and iOS apps for UAE businesses and startups." },
      { key: "development/website-development", angle: "Websites for real estate, jewellery, trading and service companies." },
      { key: "pr/public-relations", angle: "PR and media relations for UAE launches and announcements." },
      { key: "marketing/social-media-content", angle: "Social media content and management." },
      { key: "marketing/b2b-lead-generation", angle: "LinkedIn and email outreach to decision makers in the UAE and the wider Gulf." },
    ],
    portfolioHosts: ["investwithdion.ae", "diamonddeal.ae"],
    faqs: [
      { q: "Do you have an office in Dubai?", a: "No. We work with Dubai clients remotely from India, with calls at times that suit you and shared dashboards for reporting." },
      { q: "How much does app development cost in Dubai?", a: "It depends on platforms, number of screens, the backend and features such as payments or maps. We give a fixed quote after scoping." },
      { q: "Which SEO company in the UAE is best?", a: "Choose one that shows live results in your sector, covers the languages your buyers search in, and reports enquiries, not just rankings." },
    ],
    research: "seo company uae 8,100; mobile app development dubai 2,400; web design company dubai 1,900; pr agency uae 1,300; social media marketing agency dubai 1,000 (AE, Oct 2026).",
  },
  {
    slug: "toronto",
    city: "Toronto",
    region: "Ontario",
    country: "Canada",
    metaTitle: "SEO, PR & Website Development for Toronto Businesses",
    metaDescription:
      "SEO, PR, website development and B2B lead generation for Toronto and Ontario businesses, delivered remotely by our team in India.",
    h1: "SEO, PR and Website Development for Toronto Businesses",
    intro:
      "We work with Canadian businesses, including real estate professionals, on websites, SEO, paid campaigns and outreach. Toronto clients work with one team across development, marketing and PR, with clear weekly reporting.",
    presence: "We serve Toronto and Ontario remotely from our team in India, with calls scheduled during your business hours. We do not have an office in Canada.",
    hasOffice: false,
    services: [
      { key: "marketing/seo-aeo", angle: "SEO for Toronto and GTA searches, including local and \"near me\" terms." },
      { key: "pr/public-relations", angle: "PR and media outreach for Canadian launches." },
      { key: "marketing/performance-marketing", angle: "Google Ads and paid social managed against leads and cost per lead." },
      { key: "development/website-development", angle: "Websites for real estate, professional services and B2B companies." },
      { key: "marketing/b2b-lead-generation", angle: "LinkedIn and email outreach to decision makers in Canada and the US." },
    ],
    portfolioHosts: ["homencondos.ca"],
    faqs: [
      { q: "Do you have an office in Toronto?", a: "No. We work with Canadian clients remotely from India, with calls during your business hours." },
      { q: "How much does an SEO agency in Toronto cost?", a: "It depends on your site, the competition for your keywords and how much content is needed each month. We agree a monthly fee after reviewing them." },
    ],
    research: "seo agency toronto 3,600; toronto pr agency 880; ppc agency toronto 260; social media marketing agency toronto 170; Ontario business awards 210 (CA, Oct 2026).",
  },
  {
    slug: "calgary",
    city: "Calgary",
    region: "Alberta",
    country: "Canada",
    metaTitle: "SEO, PR & Website Development for Calgary Businesses",
    metaDescription:
      "SEO, PR, website development and B2B lead generation for Calgary and Alberta businesses, delivered remotely by our team in India.",
    h1: "SEO, PR and Website Development for Calgary Businesses",
    intro:
      "We work with Alberta businesses on websites, SEO, paid campaigns and outreach. Calgary clients work with one team across development, marketing and PR, with clear weekly reporting.",
    // Our team has delivered work for Calgary clients as a white-label partner
    // to other agencies, so the experience is real but the client names and
    // the sites belong to those agencies. The wording says exactly that and
    // claims nothing further; there is no office and no portfolio host here.
    presence:
      "We serve Calgary and Alberta remotely from our team in India, with calls scheduled during your business hours. Our team has delivered work for Calgary clients as a delivery partner to other agencies, under their brands rather than ours, so those projects are not in our portfolio. We do not have an office in Canada.",
    hasOffice: false,
    services: [
      { key: "marketing/seo-aeo", angle: "SEO for Calgary and Alberta searches, including local and \"near me\" terms." },
      { key: "marketing/b2b-lead-generation", angle: "LinkedIn and email outreach to decision makers in Canada and the US." },
      { key: "development/website-development", angle: "Websites for professional services, trades and B2B companies." },
      { key: "marketing/performance-marketing", angle: "Google Ads and paid social managed against leads and cost per lead." },
      { key: "pr/public-relations", angle: "PR and media outreach for Canadian launches." },
    ],
    nearby: ["Airdrie", "Okotoks", "Cochrane", "Red Deer", "Edmonton"],
    faqs: [
      { q: "Do you have an office in Calgary?", a: "No. We work with Alberta clients remotely from India, with calls during your business hours." },
      { q: "Have you worked with Calgary businesses before?", a: "Yes, as a delivery partner to other agencies, which means the work went out under their brand rather than ours. We can talk through what we did, though we cannot name those clients." },
      { q: "How much does an SEO agency in Calgary cost?", a: "It depends on your site, the competition for your keywords and how much content is needed each month. We agree a monthly fee after reviewing them." },
    ],
    research: "seo company calgary 2,900 (KD 14); seo agency calgary; web design calgary (CA, Oct 2026 DataForSEO).",
  },
  {
    slug: "brisbane",
    city: "Brisbane",
    region: "Queensland",
    country: "Australia",
    metaTitle: "SEO, PR & Website Development for Brisbane Businesses",
    metaDescription:
      "SEO, PR, website development and B2B lead generation for Brisbane and Queensland businesses, delivered remotely by our team in India.",
    h1: "SEO, PR and Website Development for Brisbane Businesses",
    intro:
      "We work with Queensland businesses on websites, SEO, paid campaigns and outreach. Brisbane clients work with one team across development, marketing and PR, with clear weekly reporting.",
    // Same situation as Calgary: delivered under other agencies' brands, so no
    // portfolio host and no claim of named clients.
    presence:
      "We serve Brisbane and Queensland remotely from our team in India, with calls scheduled during your business hours. Our team has delivered work for Brisbane clients as a delivery partner to other agencies, under their brands rather than ours, so those projects are not in our portfolio. We do not have an office in Australia.",
    hasOffice: false,
    services: [
      { key: "marketing/seo-aeo", angle: "SEO for Brisbane and South East Queensland searches, including local terms." },
      { key: "marketing/b2b-lead-generation", angle: "LinkedIn and email outreach to decision makers across Australia." },
      { key: "development/website-development", angle: "Websites for professional services, trades and B2B companies." },
      { key: "marketing/performance-marketing", angle: "Google Ads and paid social managed against leads and cost per lead." },
      { key: "pr/public-relations", angle: "PR and media outreach for Australian launches." },
    ],
    nearby: ["Gold Coast", "Sunshine Coast", "Ipswich", "Logan", "Toowoomba"],
    faqs: [
      { q: "Do you have an office in Brisbane?", a: "No. We work with Queensland clients remotely from India. Our day overlaps your morning, and we schedule calls in your business hours." },
      { q: "Have you worked with Brisbane businesses before?", a: "Yes, as a delivery partner to other agencies, which means the work went out under their brand rather than ours. We can talk through what we did, though we cannot name those clients." },
      { q: "How do you handle the time difference?", a: "Queensland is four and a half hours ahead of us, so your morning is our early morning. Calls are scheduled in your business hours and reporting lands before your week starts." },
    ],
    research: "seo agency brisbane 1,900 (KD 23); seo brisbane; web design brisbane (AU, Oct 2026 DataForSEO).",
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
