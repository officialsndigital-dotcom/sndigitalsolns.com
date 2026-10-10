import { servicesFor, serviceKey } from "@/content/services";

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { title?: string; links: NavLink[] };
export type NavItem = { label: string; href: string; groups?: NavGroup[]; feature?: { title: string; text: string; href: string; cta: string } };

const serviceLinks = (keys: string[]) =>
  keys.map((k) => {
    const [vertical, slug] = k.split("/");
    const s = servicesFor(vertical as "development" | "marketing" | "pr").find((x) => x.slug === slug)!;
    return { label: s.short, href: `/${serviceKey(s)}/`, note: s.summary };
  });

export const mainNav: NavItem[] = [
  {
    label: "Development",
    href: "/development/",
    groups: [
      { title: "Build", links: serviceLinks(["development/website-development", "development/ecommerce-development", "development/mobile-app-development", "development/ui-ux-design"]) },
      { title: "Systems", links: serviceLinks(["development/custom-software-development", "development/web-application-development", "development/saas-development", "development/crm-erp-development", "development/ai-automation", "development/api-integration"]) },
    ],
    feature: { title: "417+ websites · 74+ applications", text: "11+ years of development experience with a 72-person technology team.", href: "/portfolio/", cta: "View Our Portfolio" },
  },
  {
    label: "Marketing",
    href: "/marketing/",
    groups: [
      { title: "Demand", links: serviceLinks(["marketing/b2b-lead-generation", "marketing/performance-marketing", "marketing/seo-aeo"]) },
      { title: "Nurture & grow", links: serviceLinks(["marketing/social-media-content", "marketing/crm-marketing-automation", "marketing/ecommerce-growth"]) },
    ],
    feature: { title: "1,086 replies from decision makers", text: "Four LinkedIn accounts, and the live dashboards behind every figure.", href: "/case-studies/linkedin-outbound-four-campaigns/", cta: "Read the case study" },
  },
  {
    label: "PR",
    href: "/pr/",
    groups: [{ links: serviceLinks(["pr/public-relations", "pr/digital-pr", "pr/founder-thought-leadership", "pr/influencer-marketing", "pr/awards-recognition"]) }],
    feature: { title: "Visibility and credibility", text: "PR planned alongside your marketing, so coverage works harder.", href: "/book-consultation/?service=pr", cta: "Discuss Your PR Goals" },
  },
  {
    label: "Products",
    href: "/products/",
    groups: [
      {
        links: [
          { label: "ACADMiN", href: "/products/acadmin/", note: "Education ERP for schools and colleges" },
          { label: "eheera", href: "/products/eheera/", note: "Jewellery management software and diamond ERP" },
        ],
      },
    ],
  },
  { label: "Case Studies", href: "/case-studies/" },
  {
    label: "Resources",
    href: "/resources/",
    groups: [
      {
        links: [
          { label: "Blog", href: "/blog/" },
          { label: "Free Tools", href: "/free-tools/" },
          { label: "FAQs", href: "/resources/faqs/" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/company/",
    groups: [
      {
        links: [
          { label: "About Us", href: "/company/about/" },
          { label: "Our Approach", href: "/company/approach/" },
          { label: "Global Presence", href: "/company/global-presence/" },
          { label: "Locations", href: "/locations/" },
          { label: "Industries", href: "/industries/" },
          { label: "Portfolio", href: "/portfolio/" },
          { label: "Careers", href: "/company/careers/" },
          { label: "Contact", href: "/contact/" },
        ],
      },
    ],
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about/" },
      { label: "Our Approach", href: "/company/approach/" },
      { label: "Case Studies", href: "/case-studies/" },
      { label: "Portfolio", href: "/portfolio/" },
      { label: "Industries", href: "/industries/" },
      { label: "Careers", href: "/company/careers/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Development",
    links: serviceLinks(["development/website-development", "development/custom-software-development", "development/mobile-app-development", "development/saas-development", "development/crm-erp-development", "development/ai-automation"]),
  },
  {
    title: "Marketing",
    links: serviceLinks(["marketing/b2b-lead-generation", "marketing/performance-marketing", "marketing/seo-aeo", "marketing/social-media-content", "marketing/crm-marketing-automation", "marketing/ecommerce-growth"]),
  },
  {
    title: "PR",
    links: serviceLinks(["pr/public-relations", "pr/digital-pr", "pr/founder-thought-leadership", "pr/influencer-marketing", "pr/awards-recognition"]),
  },
  {
    title: "Products & Resources",
    links: [
      { label: "ACADMiN", href: "/products/acadmin/" },
      { label: "eheera", href: "/products/eheera/" },
      { label: "Blog", href: "/blog/" },
      { label: "Free Tools", href: "/free-tools/" },
      { label: "FAQs", href: "/resources/faqs/" },
    ],
  },
];
