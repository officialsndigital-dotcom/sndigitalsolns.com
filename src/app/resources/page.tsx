import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section } from "@/components/ui";

export const metadata = pageMetadata({ title: "Resources", description: "Articles, free tools and answers to common questions from S N Digital Solns.", path: "/resources/" });

const items = [
  { href: "/blog/", title: "Blog", text: "Practical articles on development, marketing and PR." },
  { href: "/free-tools/", title: "Free tools", text: "Calculators for planning pipeline and growth." },
  { href: "/resources/faqs/", title: "FAQs", text: "Answers to the questions we hear most." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Resources", href: "/resources/" }]} eyebrow="Resources" title="Resources" lead="Guides, tools and answers to help you plan your next step." />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="group rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600">
              <h2 className="text-xl font-extrabold text-navy-900">{i.title}</h2>
              <p className="mt-2 text-muted">{i.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                Open <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title="Prefer to talk it through?" />
    </>
  );
}
