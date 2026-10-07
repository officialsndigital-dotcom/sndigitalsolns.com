import Link from "next/link";
import { CtaBand, PageHero, StatsStrip } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section } from "@/components/ui";

export const metadata = pageMetadata({
  title: "About the Company",
  description: "S N Digital Solns Pvt. Ltd. is a technology, digital growth and PR company headquartered in Navi Mumbai, India.",
  path: "/company/",
});

const pages = [
  { href: "/company/about/", title: "About us", text: "Who we are, what we do and how we started." },
  { href: "/company/approach/", title: "Our approach", text: "How we plan, build, run and report on work." },
  { href: "/company/global-presence/", title: "Global presence", text: "Our offices and the markets we serve." },
  { href: "/company/careers/", title: "Careers", text: "Work with our development, marketing and PR teams." },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Company", href: "/company/" }]} eyebrow="Company" title="S N Digital Solns Pvt. Ltd." lead="Technology. Digital Growth. Brand Visibility." />
      <Section>
        <StatsStrip />
      </Section>
      <Section tone="mist">
        <div className="grid gap-5 md:grid-cols-2">
          {pages.map((p) => (
            <Link key={p.href} href={p.href} className="group rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600">
              <h2 className="text-xl font-extrabold text-navy-900">{p.title}</h2>
              <p className="mt-2 text-muted">{p.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                Read more <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title="Talk to our team." />
    </>
  );
}
