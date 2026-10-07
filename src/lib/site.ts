// Company facts used across the site. Only verified facts belong here; see the
// "Verified facts register" in the website plan doc before adding anything.

export const site = {
  name: "S N Digital Solns Pvt. Ltd.",
  shortName: "S N Digital Solns",
  tagline: "Technology. Digital Growth. Brand Visibility.",
  brandLine: "Build Your Brand Voice",
  founded: "2020",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sndigitalsolns.com",
  email: "info@sndigitalsolns.com",
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
  kind: "Head office" | "Branch office";
  lines: string[];
  phone?: string;
};

// Florida and Ontario appear in the brochure as "PO". They stay off the site
// until the company confirms what PO means and whether they are offices.
export const offices: Office[] = [
  {
    name: "Mumbai",
    kind: "Head office",
    lines: [
      "Office No. A-302, 3rd Floor, Shree Nand Dham",
      "Sector 11, CBD Belapur, Navi Mumbai",
      "Maharashtra 400614, India",
    ],
  },
  {
    name: "Deoghar",
    kind: "Branch office",
    lines: [
      "Ground floor, Ishwar Kunj, in front of Bijli Kothi No. 1",
      "Bompass Town, B. Deoghar",
      "Jharkhand 814112, India",
    ],
    phone: "+91 9905704155",
  },
];

// GHL calendar created 2026-10-07 in the "S N Digital Solns Pvt Ltd" sub-account,
// assigned to Sanjan Sharma: 10 minute slots, Mon-Fri 10:00-19:00 and Sat 10:00-14:00 IST.
export const consultationCalendarUrl =
  process.env.NEXT_PUBLIC_CONSULTATION_CALENDAR_URL ?? "https://api.leadconnectorhq.com/widget/booking/zrm07lF5VdPFbjJoSsOt";

export const CTA = {
  consultation: "Book a 10 Minute Free Consultation",
  consultationShort: "Book a Consultation",
  work: "View Our Work",
  portfolio: "View Our Portfolio",
  development: "Discuss Your Project",
  marketing: "Discuss Your Growth Goals",
  pr: "Discuss Your PR Goals",
  demo: "Book a Demo",
} as const;
