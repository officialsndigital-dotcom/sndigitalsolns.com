import { publishedCaseStudies } from "@/content/case-studies";
import { servicesFor, verticals } from "@/content/services";
import type { Faq, Step, Vertical } from "@/content/types";
import { CTA, marketingStats, stats } from "@/lib/site";
import { CaseStudyCard, CtaBand, PageHero, ProcessSteps, ServiceCard, StatsStrip } from "./blocks";
import { FaqSection } from "./seo";
import { ButtonLink, Section, SectionHead } from "./ui";

const processes: Record<Vertical, Step[]> = {
  development: [
    { title: "Understand", text: "Business, users, objectives and requirements." },
    { title: "Plan", text: "Scope, functionality, technology and roadmap." },
    { title: "Design", text: "User experience and interface." },
    { title: "Develop", text: "The approved solution, built in stages." },
    { title: "Test", text: "Functionality, integrations, usability and performance." },
    { title: "Deploy & support", text: "Go-live, maintenance and improvements." },
  ],
  marketing: [
    { title: "Understand", text: "Offer, buyers, margins and goals." },
    { title: "Analyse", text: "Channels, tracking and opportunity." },
    { title: "Plan", text: "Targets, channels and budget." },
    { title: "Execute", text: "Campaigns and outreach go live." },
    { title: "Optimise", text: "Weekly changes based on data." },
    { title: "Report", text: "Leads, meetings, sales and next steps." },
  ],
  pr: [
    { title: "Understand", text: "Story, audience and competitors." },
    { title: "Position", text: "Messages, angles and spokespeople." },
    { title: "Plan", text: "Targets and a calendar of activity." },
    { title: "Execute", text: "Pitching, writing and coordination." },
    { title: "Amplify", text: "Coverage reused across your channels." },
    { title: "Report", text: "What was pitched and published." },
  ],
};

const faqs: Record<Vertical, Faq[]> = {
  development: [
    { q: "What do you build?", a: "Websites, e commerce stores, web applications, mobile apps, SaaS products, CRM and ERP systems, AI and automation, and integrations between business systems." },
    { q: "Do you provide maintenance after launch?", a: "Yes. We offer ongoing maintenance, updates, improvements and technical support." },
    { q: "Can you work with our in-house team?", a: "Yes. We can build a complete product, a specific module, or support your existing team on a defined part of the work." },
    { q: "How are projects priced?", a: "Timelines and investment depend on scope, functionality and technical requirements. Share your requirement or BRD and we will recommend an approach." },
  ],
  marketing: [
    { q: "Do you guarantee results?", a: "No. Results depend on your offer, market and sales process. We agree targets after reviewing them and report progress every week." },
    { q: "Which channels do you manage?", a: "LinkedIn and email outreach, Google Ads, Meta Ads, LinkedIn Ads, SEO and AEO, social media and marketing automation." },
    { q: "Do we keep ownership of our accounts and data?", a: "Yes. Ad accounts, CRM and analytics stay in your business's name." },
  ],
  pr: [
    { q: "Do you guarantee coverage or awards?", a: "No. Editors and judges decide. We improve your chances with strong stories, the right targets and well-prepared submissions." },
    { q: "How does PR connect with marketing?", a: "Coverage is reused on your website, LinkedIn and in sales outreach, and digital PR can support SEO." },
  ],
};

export function VerticalPage({ vertical }: { vertical: Vertical }) {
  const v = verticals[vertical];
  const list = servicesFor(vertical);
  const proof = publishedCaseStudies.filter((c) => c.vertical === vertical).slice(0, 3);
  return (
    <>
      <PageHero
        crumbs={[{ name: v.name, href: `/${vertical}/` }]}
        eyebrow={v.line}
        title={v.headline}
        lead={v.intro}
        primary={{ href: `/book-consultation/?service=${vertical}`, label: CTA.consultation }}
        secondary={{ href: vertical === "development" ? "/portfolio/" : "/case-studies/", label: CTA.work }}
      />

      {vertical !== "pr" && (
        <Section>
          <StatsStrip items={vertical === "development" ? stats : marketingStats} />
        </Section>
      )}

      <Section tone="mist">
        <SectionHead eyebrow="Services" title={`${v.name} services`} intro={vertical === "marketing" ? "Each service has one job. Together they cover demand, conversion and retention." : undefined} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="How we work" title="Our approach" />
        <ProcessSteps steps={processes[vertical]} />
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Proof" title={vertical === "development" ? "Our own products" : "Related case studies"} />
        {vertical === "pr" ? (
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            PR results belong to the client more than to us, and most coverage we have placed is not ours to publish. We are collecting written approvals
            before we write those up. Ask on a call and we will talk you through comparable work in your sector, including which publications we reached
            and what it took.
          </p>
        ) : vertical === "development" ? (
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            Our development experience includes building and operating our own SaaS products: ACADMiN, an education ERP for schools and colleges, and eheera, jewellery management software and diamond ERP.
          </p>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              {proof.map((c) => (
                <CaseStudyCard key={c.slug} cs={c} />
              ))}
            </div>
            <ButtonLink href="/case-studies/" variant="secondary" className="mt-8">
              See all case studies
            </ButtonLink>
          </>
        )}
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={faqs[vertical]} />
        </div>
      </Section>

      <CtaBand title={`${v.cta}.`} />
    </>
  );
}
