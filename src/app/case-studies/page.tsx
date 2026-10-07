import { CaseStudyCard, CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { ContentRequired, Section, SectionHead } from "@/components/ui";
import { publishedCaseStudies } from "@/content/case-studies";
import { CTA } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Case Studies | Lead Generation & Ads Results",
  description: "Results from our B2B lead generation, Meta Ads, Google Ads and e commerce growth work, with figures taken from client ad and store dashboards.",
  path: "/case-studies/",
});

export default function CaseStudiesPage() {
  const b2b = publishedCaseStudies.filter((c) => c.channels.includes("LinkedIn"));
  const ecom = publishedCaseStudies.filter((c) => !c.channels.includes("LinkedIn"));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Case Studies", href: "/case-studies/" }]}
        eyebrow="Case studies"
        title="Results we can show"
        lead="Every figure on these pages comes from a client dashboard or our own records. Clients are described by industry until they approve being named."
        primary={{ href: "/book-consultation/", label: CTA.consultation }}
        secondary={{ href: "/portfolio/", label: CTA.portfolio }}
      />
      <Section>
        <SectionHead eyebrow="B2B lead generation" title="Sales conversations" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {b2b.map((c) => (
            <CaseStudyCard key={c.slug} cs={c} />
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead eyebrow="Performance marketing" title="E commerce revenue and return on ad spend" intro="Full-year results from 2025. Amounts are shown in the currency of the source dashboard." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ecom.map((c) => (
            <CaseStudyCard key={c.slug} cs={c} />
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="Development and PR" title="More case studies" />
        <ContentRequired>Development and PR case studies (client, problem, solution, outcome) approved for publication.</ContentRequired>
      </Section>
      <CtaBand title="Want results like these?" text="Results depend on your offer, market and budget. In 10 minutes we can tell you what is realistic." />
    </>
  );
}
