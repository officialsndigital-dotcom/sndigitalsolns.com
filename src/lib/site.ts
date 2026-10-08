// Company facts used across the site. Only verified facts belong here; see the
// "Verified facts register" in the website plan doc before adding anything.

export const site = {
  name: "S N Digital Solns Pvt. Ltd.",
  shortName: "S N Digital Solns",
  tagline: "Technology. Digital Growth. Brand Visibility.",
  brandLine: "Build Your Brand Voice",
  founded: "2020",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sndigitalsolns.com",
  // Kept in two parts so the full address never appears in server-rendered HTML;
  // EmailLink joins them in the browser.
  emailUser: "info",
  emailDomain: "sndigitalsolns.com",
  phone: "+91 7061699889",
  phoneHref: "tel:+917061699889",
  // Same number as the phone; the eheera handover lists it as the WhatsApp contact.
  whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/917061699889",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61567961224505",
    instagram: "https://www.instagram.com/sndspl/",
    linkedin: "https://www.linkedin.com/company/s-n-digital-solns/",
  },
} as const;

// Public measurement IDs (they appear in every page's HTML, so they are not
// secrets). Each tag loads only when its ID is set. Waiting on the company for
// the GA4 measurement ID (G-...) and the Meta pixel ID.
export const analytics = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
};

// Supplied by the founder on 2026-10-07.
export const founder = {
  name: "Sanjan Sharma",
  role: "Founder & Director",
  photo: "/team/sanjan-sharma.jpg",
  bio: [
    "Sanjan Sharma is an entrepreneur and technology and digital growth professional with 8+ years of experience across digital marketing, technology, SaaS, education, BFSI, banking, B2B sales and business growth.",
    "As the Founder of S N Digital Solns Pvt. Ltd., he has built a team focused on helping businesses build digital infrastructure, generate demand and automate growth through technology, AI, software development, performance marketing, SEO, CRM and B2B lead generation.",
  ],
  focus: "His focus is simple: turn technology and marketing into measurable business outcomes.",
} as const;

// Team photographs supplied by the company on 2026-10-07.
export const teamPhotos = [
  { src: "/team/team-session.jpg", alt: "The S N Digital Solns team during an internal brand awareness session at the Navi Mumbai office", width: 1280, height: 960 },
  { src: "/team/team-office.jpg", alt: "Members of the S N Digital Solns delivery team at the Navi Mumbai office", width: 1280, height: 960 },
] as const;

export const stats = [
  { value: "11+", label: "Years of development experience" },
  { value: "72", label: "Technology professionals" },
  { value: "417+", label: "Websites developed" },
  { value: "74+", label: "Applications developed" },
  { value: "580+", label: "Clients served" },
] as const;

// Company-level marketing figures supplied in the master brief (not tied to one client).
export const marketingStats = [
  { value: "$6M+", label: "Ad spend managed" },
  { value: "$27M+", label: "Client revenue generated" },
] as const;

export const markets = [
  "UAE",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "South Africa",
  "Saudi Arabia",
  "Kuwait",
  "Europe",
] as const;

export type Office = {
  name: string;
  kind: "Head office" | "Postal office";
  lines: string[];
  phone?: string;
  phoneHref?: string;
};

// Supplied by the company on 2026-10-08. The Deoghar branch office was removed
// from the site at the same time, at the company's request.
export const offices: Office[] = [
  {
    name: "Mumbai",
    kind: "Head office",
    lines: [
      "Office No. A-302, 3rd Floor, Shree Nand Dham",
      "Sector 11, CBD Belapur, Navi Mumbai",
      "Maharashtra 400614, India",
    ],
    phone: "+91 70637 67680",
    phoneHref: "tel:+917063767680",
  },
  {
    name: "Florida, USA",
    kind: "Postal office",
    lines: ["17312 NW 112th Blvd.", "Alachua, FL 32615", "United States"],
    phone: "+1 (352) 888-0026",
    phoneHref: "tel:+13528880026",
  },
  {
    name: "Ontario, Canada",
    kind: "Postal office",
    lines: ["2208 St. Joseph Blvd, Unit #111", "Orléans, ON K1C 1E8", "Canada"],
    phone: "+1 (514) 963-2296",
    phoneHref: "tel:+15149632296",
  },
];

// GHL calendar created 2026-10-07 in the "S N Digital Solns Pvt Ltd" sub-account,
// assigned to Sanjan Sharma: 30 minute slots (widened from 10 on 2026-10-08 at the company's request), Mon-Fri 10:00-19:00 and Sat 10:00-14:00 IST.
export const consultationCalendarUrl =
  process.env.NEXT_PUBLIC_CONSULTATION_CALENDAR_URL ?? "https://api.leadconnectorhq.com/widget/booking/zrm07lF5VdPFbjJoSsOt";

export const CTA = {
  consultation: "Book a 30 Minute Free Consultation",
  consultationShort: "Book a Consultation",
  work: "View Our Work",
  portfolio: "View Our Portfolio",
  development: "Discuss Your Project",
  marketing: "Discuss Your Growth Goals",
  pr: "Discuss Your PR Goals",
  demo: "Book a Demo",
} as const;
