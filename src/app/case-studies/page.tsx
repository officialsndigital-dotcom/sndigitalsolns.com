import Link from "next/link";
import { CaseStudyCard, CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section, SectionHead } from "@/components/ui";
import { getCaseStudy, publishedCaseStudies } from "@/content/case-studies";
import { CTA } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Case Studies | Lead Generation & Ads Results",
  description: "Results from our B2B lead generation, Meta Ads, Google Ads and e commerce growth work, with figures taken from client ad and store dashboards.",
  path: "/case-studies/",
});

export default function CaseStudiesPage() {
  const b2b = publishedCaseStudies.filter((c) => c.channels.includes("LinkedIn"));
  const ecom = publishedCaseStudies.filter((c) => !c.channels.includes("LinkedIn"));
  // The four LinkedIn accounts are shown here as well as on the case study, so
  // the dashboard recordings are one click away rather than two.
  const accounts = getCaseStudy("linkedin-outbound-four-campaigns")?.accounts ?? [];
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
        {accounts.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xl font-extrabold text-navy-900 md:text-2xl">Watch the dashboards for yourself</h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted">
              Four LinkedIn accounts, two our own and two belonging to clients whose outreach we run. Each recording is a walkthrough of that
              account&apos;s live dashboard, which is where its replies come from. The calls booked are counted from each account&apos;s booking
              records.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {accounts.map((a) => {
                const replies = a.figures.find((f) => f.label === "Replies received");
                return (
                  <a
                    key={a.name}
                    href={a.video}
                    target="_blank"
                    rel="noopener"
                    className="lift group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6"
                  >
                    <p className="eyebrow">{a.role}</p>
                    <h4 className="mt-1 text-lg font-extrabold leading-snug text-navy-900">{a.name}</h4>
                    <dl className="mt-4 grid grid-cols-2 gap-3">
                      {replies && (
                        <div>
                          <dt className="text-xs text-muted">Replies</dt>
                          <dd className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy-800">{replies.value}</dd>
                        </div>
                      )}
                      {a.callsBooked && (
                        <div>
                          <dt className="text-xs text-muted">Calls booked</dt>
                          <dd className="font-[family-name:var(--font-display)] text-2xl font-bold text-amber-600">{a.callsBooked}</dd>
                        </div>
                      )}
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                      Watch the walkthrough <Arrow />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
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
