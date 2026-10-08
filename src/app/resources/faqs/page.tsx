import { CtaBand, PageHero } from "@/components/blocks";
import { FaqSection, faqJsonLd, JsonLd, pageMetadata } from "@/components/seo";
import { Section } from "@/components/ui";
import { products } from "@/content/products";
import { services } from "@/content/services";

export const metadata = pageMetadata({ title: "Frequently Asked Questions", description: "Answers to common questions about our development, marketing and PR services and our products.", path: "/resources/faqs/" });

const general = [
  { q: "What is included in the 30 minute free consultation?", a: "A short call to understand your goal. We tell you honestly whether and how we can help and what the next step would be. There is no obligation." },
  { q: "Do you guarantee results?", a: "No. We do not guarantee leads, sales, rankings, coverage or awards. We agree realistic targets after understanding your business and report progress clearly." },
  { q: "Who owns the accounts, code and data?", a: "You do. Ad accounts, analytics, CRM data and code built for you stay in your business's name." },
];

export default function FaqsPage() {
  const groups = [
    { title: "General", faqs: general },
    { title: "Development", faqs: services.filter((s) => s.vertical === "development").flatMap((s) => s.faqs.slice(0, 1)) },
    { title: "Marketing", faqs: services.filter((s) => s.vertical === "marketing").flatMap((s) => s.faqs.slice(0, 1)) },
    { title: "PR", faqs: services.filter((s) => s.vertical === "pr").flatMap((s) => s.faqs.slice(0, 1)) },
    { title: "Products", faqs: products.flatMap((p) => p.faqs.slice(0, 2)) },
  ];
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Resources", href: "/resources/" },
          { name: "FAQs", href: "/resources/faqs/" },
        ]}
        eyebrow="FAQs"
        title="Frequently asked questions"
        lead="Quick answers about how we work, our services and our products."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g) => (
            <FaqSection key={g.title} title={g.title} faqs={g.faqs} schema={false} />
          ))}
        </div>
      </Section>
      <CtaBand title="Still have a question?" />
      <JsonLd data={faqJsonLd(groups.flatMap((g) => g.faqs))} />
    </>
  );
}
