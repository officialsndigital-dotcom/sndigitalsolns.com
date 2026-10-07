import type { Faq } from "./types";

export type Product = {
  slug: "acadmin" | "eheera";
  name: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  externalUrl: string;
  /** Shown under the hero; ownership wording confirmed by the company. */
  attribution?: string;
  problem: string[];
  overview: string[];
  modules: { group: string; items: string[] }[];
  audience: { title: string; text: string }[];
  benefits: string[];
  facts?: { label: string; value: string }[];
  /** Demo calendar link; empty until supplied. */
  demoUrl: string;
  industry: string;
  faqs: Faq[];
  /** Set while a claim on the page still needs the company's confirmation. */
  needsConfirmation?: string;
};

export const products: Product[] = [
  {
    slug: "acadmin",
    name: "ACADMiN",
    category: "Education ERP for Schools and Colleges",
    metaTitle: "ACADMiN | School & College Management Software",
    metaDescription:
      "ACADMiN is a cloud-based education ERP for schools and colleges: admissions, fees, attendance, examinations, NAAC support, HR, payroll, LMS and more.",
    hero: "One cloud system for admissions, academics, administration and accreditation records.",
    externalUrl: "https://www.acadmin.in/",
    needsConfirmation: "acadmin.in lists Future Face Tech as its contact. Confirm how ACADMiN should be attributed before launch.",
    problem: [
      "Admissions, fees, attendance and examination records sit in separate registers and spreadsheets.",
      "Staff spend days compiling data for management, audits and accreditation.",
      "Students, parents and staff wait in queues for information a system could provide.",
    ],
    overview: [
      "ACADMiN is an education management ERP designed for schools and colleges. It brings academic, administrative and institutional processes together in one central, cloud-based system.",
      "It covers the full student lifecycle, from enquiry and admission through to alumni, along with staff, HR and payroll, library, placements and accreditation-related records.",
    ],
    modules: [
      { group: "Admissions", items: ["Pre-admission and enquiries", "Admission management", "CRM for enquiries and communication"] },
      { group: "Students & academics", items: ["Student management", "Academics", "Subject and syllabus management", "Timetable", "Attendance", "LMS"] },
      { group: "Examinations", items: ["Examination management", "Online examination", "Question paper management"] },
      { group: "Finance & staff", items: ["Fees management", "Staff management", "HR & payroll"] },
      { group: "Campus", items: ["Library", "Notice management", "Visitor management", "Academic events", "Grievance management", "Feedback"] },
      { group: "Outcomes", items: ["Training & placement", "Alumni", "NAAC support for accreditation-related processes and records", "Reports & analytics"] },
    ],
    audience: [
      { title: "Colleges and universities", text: "Multi-department institutions managing admissions, examinations, placements and accreditation records." },
      { title: "Schools", text: "Schools that want fees, attendance, timetables and communication in one place." },
      { title: "Education groups", text: "Trusts and groups running several institutions." },
    ],
    benefits: [
      "Less manual data entry and fewer registers to reconcile.",
      "Faster preparation of records needed for NAAC and other reviews.",
      "Real-time reports for management.",
      "Self-service information for students and staff.",
    ],
    demoUrl: "",
    industry: "education",
    faqs: [
      { q: "Does ACADMiN help with NAAC accreditation?", a: "ACADMiN includes a NAAC module that supports accreditation-related processes and information management. It does not grant accreditation; that decision rests with the accrediting body." },
      { q: "Is ACADMiN cloud-based?", a: "Yes. ACADMiN is a cloud-based system, so there is no hardware to buy for the software itself." },
      { q: "Can ACADMiN integrate with biometric or RFID attendance?", a: "ACADMiN supports integration with biometric and RFID devices, payment gateways and accounting software. Confirm your specific devices during the demo." },
      { q: "Which software is best for school management?", a: "The best fit covers your whole cycle (admissions, fees, attendance, exams and reports) in one system, works in the cloud, and can produce the records your board or NAAC needs without spreadsheets. Book a demo to check ACADMiN against your own process." },
      { q: "What is the difference between an LMS and an ERP for schools?", a: "An LMS delivers learning: courses, assignments and online classes. An ERP runs the institution: admissions, fees, attendance, examinations, staff and reports. ACADMiN includes both, so data does not have to move between two systems." },
      { q: "How much does school ERP software cost?", a: "It depends on the number of students and campuses and the modules you need. We share pricing after a short demo so the quote matches what you will actually use." },
      { q: "How do we see ACADMiN in action?", a: "Book an ACADMiN demo and we will walk through the modules relevant to your institution." },
    ],
  },
  {
    slug: "eheera",
    name: "eheera",
    category: "Jewellery Management Software and Diamond ERP",
    metaTitle: "eheera | Jewellery ERP & Diamond Inventory Software",
    metaDescription:
      "eheera is a cloud ERP for diamond and jewellery traders and manufacturers: memo, 4C inventory, Kapan yield, karigar and Tunch, multi-currency accounting.",
    hero: "Inventory, memo, manufacturing and accounts for diamond and jewellery businesses, in one cloud ERP.",
    externalUrl: "https://eheera.in/",
    attribution: "eheera is a product of S N Digital Solns Pvt. Ltd., in partnership with Piconet Hitech Solutions Pvt. Ltd.",
    problem: [
      "Stones and jewellery on memo are tracked in spreadsheets, so overdue consignments are missed.",
      "Gold loss at the karigar or casting stage is noticed too late.",
      "Natural and lab-grown stock, several currencies and several offices are hard to keep apart.",
    ],
    overview: [
      "eheera is a cloud ERP built around how diamond and jewellery businesses trade and manufacture. It covers purchase and sales, consignment memo, diamond inventory, manufacturing, sales channels, accounting and reports.",
      "It comes in Diamond ERP and Jewellery ERP editions, each as Trading or Trading + Manufacturing, for one company or several.",
    ],
    modules: [
      { group: "Trading", items: ["Purchase management", "Sales management", "Consignment in & out (memo)", "Memo aging alerts & partial returns", "Import & export documentation", "Brokerage & commission slabs"] },
      { group: "Diamond inventory", items: ["Single stone & parcel stock", "4C + 100 parameter search", "Natural, CVD & HPHT books", "GIA, IGI, HRD certificate sync", "RapNet pricing & VDB feeds", "Lot mixing & stone transformation"] },
      { group: "Diamond manufacturing", items: ["Rough to polish process", "Kapan yield & profitability", "Process & worker loss tracking", "Recut & repair desk", "Lab fees & submissions"] },
      { group: "Jewellery manufacturing", items: ["Jobwork & outsourced production", "Casting, setting, polishing, finishing", "Karigar job bags", "Tunch assay & melting loss", "BOM make & break", "Labour cost by process or job"] },
      { group: "Sales & distribution", items: ["Trade show barcode tally", "PDF linesheets", "WhatsApp catalogues", "FTP & API feeds to B2B exchanges"] },
      { group: "Accounting & finance", items: ["Journal, payment, receipt & contra", "Multi-currency ledger & FX", "GST invoicing & e-invoice (India)", "Bank: SWIFT, IBAN, RTGS", "Debtor & creditor aging", "Trial balance, P&L, balance sheet"] },
      { group: "Reports & analytics", items: ["Real-time financial dashboards", "Business & margin reports", "Stock, jobwork & production reports", "Custom Excel export profiles"] },
      { group: "Administration", items: ["Multi-company & multi-branch", "Multi-user with role-based access", "IP address whitelisting", "Password approval to edit past entries", "Customisable screens & reports"] },
    ],
    audience: [
      { title: "Traders & wholesalers", text: "Diamond dealers, parcel traders, memo desks, bullion and jewellery wholesalers, exporters and importers." },
      { title: "Manufacturers", text: "Rough cutting and polishing units, jewellery factories, casting houses and karigar workshops, including jobwork for others." },
      { title: "Make and sell", text: "Houses with their own factory that also sell wholesale, export, supply retailers or run their own stores." },
    ],
    benefits: [
      "Full chain of custody for every stone and piece on memo.",
      "Fine gold loss reported per karigar and per process.",
      "Natural and lab-grown stones kept in separate books.",
      "USD, AED, HKD, THB and INR in one double-entry ledger.",
    ],
    facts: [
      { label: "Editions", value: "Diamond ERP and Jewellery ERP, each as Trading or Trading + Manufacturing" },
      { label: "Licence", value: "One-time licence, not a subscription. We share the price once we understand your requirement." },
      { label: "Currencies", value: "USD, AED, HKD, THB and INR" },
      { label: "Integrations", value: "RapNet, VDB, GIA, IGI and HRD" },
      { label: "Deployment", value: "Private cloud with role-based access and IP whitelisting" },
    ],
    demoUrl: "https://api.leadconnectorhq.com/widget/booking/SWed7I5TLJSUY4fAaAAr",
    industry: "jewellery-diamonds",
    faqs: [
      { q: "Does eheera keep natural and lab-grown diamonds separate?", a: "Yes. Natural, CVD and HPHT stones are kept in separate books, so they are never mixed in pricing, stock reports or certificates." },
      { q: "How does eheera measure gold loss at the karigar stage?", a: "Each job bag records the gross weight and purity of metal issued and returned. eheera converts both to fine gold and reports the loss in grams and as a percentage per karigar and per process." },
      { q: "What is the difference between Trading and Trading + Manufacturing?", a: "Trading covers purchase, sales, memo, diamond inventory, accounts and reports. Trading + Manufacturing adds jobwork, karigar job bags, Tunch and melting loss, rough-to-polish processing, Kapan yield and production costing." },
      { q: "Which is the best jewellery software?", a: "It depends on how you trade. Retail billing software suits a single showroom; diamond and jewellery traders and manufacturers need memo tracking, 4C stone inventory, karigar and metal-loss control, and multi-currency accounts in one system. eheera is built for the second group." },
      { q: "Is eheera jewellery design (CAD) software?", a: "No. eheera is an ERP for running the business: inventory, memo, manufacturing, sales and accounts. It works alongside whatever CAD software your designers use." },
      { q: "Is eheera a subscription?", a: "No. eheera is sold as a one-time licence rather than a monthly subscription. Tell us your requirement on a short call, and we share the licence price once we know which edition and modules you need." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
