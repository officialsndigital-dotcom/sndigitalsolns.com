import { EmailLink } from "@/components/EmailLink";
import { PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { CheckList, Section, SectionHead } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Work with S N Digital Solns across software development, digital marketing and PR, from our Navi Mumbai office.",
  path: "/company/careers/",
});

const disciplines = [
  { title: "Engineering", text: "Web and mobile development, custom software, SaaS, CRM and ERP work, API and AI integration." },
  { title: "Marketing", text: "Performance marketing, SEO and AEO, B2B lead generation, CRM and marketing automation, ecommerce growth." },
  { title: "PR and content", text: "Public relations, digital PR, founder thought leadership, influencer partnerships and content." },
  { title: "Design", text: "UI and UX design for websites, products and campaigns." },
];

const steps = [
  "Send your CV and tell us the kind of work you want to do.",
  "A short introductory call to understand what you are looking for.",
  "A practical exercise or portfolio review for your discipline.",
  "A conversation with the team you would work with, then an offer.",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Company", href: "/company/" },
          { name: "Careers", href: "/company/careers/" },
        ]}
        eyebrow="Careers"
        title="Work with us"
        lead="We are a team of 72 technology professionals plus marketing and PR specialists, working from our Navi Mumbai office for clients across India, the Gulf, North America and Europe."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHead eyebrow="What it is like here" title="Client work, measured honestly" />
            <p className="text-lg leading-relaxed text-muted">
              Most of what we do is client work with a number attached to it: a site that has to launch, an ad account that has to return more than it
              spends, a system that has to replace a spreadsheet. You will see the result of your work, and so will the client. We would rather tell a
              client something is not working than quietly let it run, and we hire people who are comfortable with that.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We also build and support our own products, ACADMiN and eheera, so there is product engineering here alongside the agency work.
            </p>
            <SectionHead eyebrow="How hiring works" title="Four steps, no games" className="mt-12" />
            <CheckList items={steps} />
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-mist p-7 md:p-8">
            <p className="eyebrow">Where we hire</p>
            <h2 className="mt-2 text-xl font-extrabold text-navy-900">Disciplines we recruit for</h2>
            <dl className="mt-6 space-y-5">
              {disciplines.map((d) => (
                <div key={d.title}>
                  <dt className="font-bold text-navy-900">{d.title}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{d.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 leading-relaxed text-muted">
              We do not always have a role open in every discipline. If none is advertised and you think you are a fit, write to us anyway, and tell us
              what you would want to work on.
            </p>
            <EmailLink subject="Career enquiry" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-[0.95rem] font-bold text-navy-900 transition-colors hover:bg-amber-300">
              Email your CV
            </EmailLink>
          </div>
        </div>
      </Section>
    </>
  );
}
