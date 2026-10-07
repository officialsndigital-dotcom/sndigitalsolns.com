import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section } from "@/components/ui";
import { tools } from "@/tools/registry";

export const metadata = pageMetadata({
  title: "Free Business Growth Tools",
  description: "Free calculators and tools for B2B sales, lead generation and marketing planning from S N Digital Solns.",
  path: "/free-tools/",
});

export default function FreeToolsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Free Tools", href: "/free-tools/" }]} eyebrow="Free tools" title="Free tools for planning growth" lead="Practical calculators that show you the numbers behind your goals. No sign-up needed to see your results." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.slug} href={`/free-tools/${t.slug}/`} className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600 hover:shadow-lg">
              <p className="eyebrow">{t.category}</p>
              <h2 className="mt-2 text-xl font-extrabold text-navy-900">{t.name}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{t.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                Use the tool <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title="Want help acting on the numbers?" />
    </>
  );
}
