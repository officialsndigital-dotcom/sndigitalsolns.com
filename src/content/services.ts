import { developmentServices } from "./services-development";
import { marketingServices } from "./services-marketing";
import { prServices } from "./services-pr";
import type { Service, Vertical } from "./types";

export const services: Service[] = [...developmentServices, ...marketingServices, ...prServices];

export const serviceKey = (s: Service) => `${s.vertical}/${s.slug}`;

export function getService(vertical: Vertical, slug: string) {
  return services.find((s) => s.vertical === vertical && s.slug === slug);
}

export function getServiceByKey(key: string) {
  return services.find((s) => serviceKey(s) === key);
}

export function servicesFor(vertical: Vertical) {
  return services.filter((s) => s.vertical === vertical);
}

export const verticals: Record<
  Vertical,
  { name: string; headline: string; line: string; intro: string; cta: string; metaTitle: string; metaDescription: string }
> = {
  development: {
    name: "Development",
    headline: "Build the digital systems your business needs.",
    line: "We build the technology.",
    intro:
      "Websites, web and mobile applications, SaaS products, CRM and ERP systems, AI automation and integrations, designed around how your business actually works.",
    cta: "Discuss Your Project",
    metaTitle: "Software Development Company | Websites, Apps, SaaS & ERP",
    metaDescription:
      "Websites, web apps, mobile apps, SaaS, CRM, ERP and AI automation. 11+ years, 72 technology professionals, 417+ websites and 74+ applications developed.",
  },
  marketing: {
    name: "Marketing",
    headline: "Generate demand, leads and sales opportunities.",
    line: "We generate the demand.",
    intro:
      "B2B lead generation, performance marketing, SEO and AEO, content and marketing automation, measured on meetings, leads and revenue rather than clicks.",
    cta: "Discuss Your Growth Goals",
    metaTitle: "Digital Marketing Agency for B2B Lead Generation & Growth",
    metaDescription:
      "B2B lead generation, Google, Meta and LinkedIn Ads, SEO & AEO, content and marketing automation focused on qualified meetings and revenue.",
  },
  pr: {
    name: "PR",
    headline: "Build visibility, authority and credibility.",
    line: "We build the visibility and credibility.",
    intro:
      "Public relations, digital PR, founder thought leadership, influencer marketing and award submissions that make your company easier to trust.",
    cta: "Discuss Your PR Goals",
    metaTitle: "PR Agency | Public Relations, Digital PR & Founder Branding",
    metaDescription:
      "Public relations, digital PR, founder and executive thought leadership, influencer marketing and awards support for credible brand visibility.",
  },
};
