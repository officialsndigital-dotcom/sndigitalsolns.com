import Link from "next/link";
import { CaseStudyCard, CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Section, SectionHead } from "@/components/ui";
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
        <SectionHead eyebrow="Development and PR" title="Why those are not here yet" />
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          Every case study on this page is backed by a dashboard we can put in front of you. Our development and PR work is just as real, but the proof for
          it sits in client systems and press coverage we do not have written permission to publish yet. Rather than write those up from memory, we are
          collecting the approvals first. In the meantime the{" "}
          <Link href="/portfolio/" className="font-semibold text-navy-700 underline underline-offset-4 hover:text-amber-600">
            portfolio
          </Link>{" "}
          shows the websites we have delivered, each one live and linked, and on a call we will walk you through the work closest to yours.
        </p>
      </Section>
      <CtaBand title="Want results like these?" text="Results depend on your offer, market and budget. In 30 minutes we can tell you what is realistic." />
    </>
  );
}
