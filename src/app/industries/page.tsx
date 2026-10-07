import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section, SectionHead } from "@/components/ui";
import { industries, phase2Industries } from "@/content/industries";
import { CTA } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description: "Development, marketing and PR for education, real estate, jewellery and diamonds, e commerce, SaaS and IT services businesses.",
  path: "/industries/",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries/" }]}
        eyebrow="Industries"
        title="Industries we serve"
        lead="We go deepest where we have delivered work and built products. Each page below shows the services and proof for that industry."
        primary={{ href: "/book-consultation/", label: CTA.consultation }}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}/`} className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600 hover:shadow-lg">
              <h2 className="text-xl font-extrabold text-navy-900">{i.name}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{i.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                {i.name} solutions <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead eyebrow="Also" title="Other industries we work with" intro="We also support businesses in these sectors. Ask us about relevant experience during your consultation." />
        <ul className="flex flex-wrap gap-2.5">
          {phase2Industries.map((n) => (
            <li key={n} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-800">
              {n}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Tell us about your industry and goals." />
    </>
  );
}
