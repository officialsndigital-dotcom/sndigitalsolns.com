import Link from "next/link";
import { CtaBand, ServiceCard, StatsStrip } from "@/components/blocks";
import { FaqSection, pageMetadata } from "@/components/seo";
import { Arrow, ButtonLink, CheckList, Section, SectionHead } from "@/components/ui";
import { publishedCaseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { getServiceByKey, servicesFor, verticals } from "@/content/services";
import type { Service, Vertical } from "@/content/types";
import { CTA, markets, marketingStats, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Software Development, Digital Marketing & PR Company",
  description:
    "S N Digital Solns builds websites, software and SaaS, runs digital marketing and B2B lead generation, and builds visibility through PR. 11+ years, 417+ websites, 580+ clients.",
  path: "/",
});

const verticalOrder: Vertical[] = ["development", "marketing", "pr"];

const featured = [
  "development/website-development",
  "development/custom-software-development",
  "development/saas-development",
  "marketing/b2b-lead-generation",
  "marketing/performance-marketing",
  "pr/founder-thought-leadership",
]
  .map(getServiceByKey)
  .filter(Boolean) as Service[];

const faqs = [
  {
    q: "What does S N Digital Solns do?",
    a: "We build websites, software, SaaS products and business systems; we generate leads and sales opportunities through B2B outreach, paid media and SEO; and we build brand visibility through PR, founder branding and digital PR.",
  },
  {
    q: "Which countries do you work with?",
    a: `We are based in India and work with clients in markets including ${markets.join(", ")}.`,
  },
  {
    q: "What happens in the 30 minute consultation?",
    a: "You tell us what you want to achieve. We ask a few questions and tell you honestly whether and how we can help, and what the next step would be. There is no obligation.",
  },
  {
    q: "Do you guarantee results?",
    a: "No. We do not guarantee leads, sales, rankings, coverage or awards. We agree realistic targets after understanding your business and report progress clearly.",
  },
];

export default function Home() {
  const proof = publishedCaseStudies.slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-navy-700/40 blur-3xl" />
        <div className="container-site relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4 !text-amber-300">{site.brandLine}</p>
            <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              We build the technology, generate the demand and build the credibility.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 md:text-xl">
              Software and website development, B2B lead generation and performance marketing, and PR, from one team with 11+ years of experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/book-consultation/" track="cta_click">
                {CTA.consultation}
              </ButtonLink>
              <ButtonLink href="/case-studies/" variant="light">
                {CTA.work}
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-3">
            {verticalOrder.map((v) => (
              <li key={v}>
                <Link
                  href={`/${v}/`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/5 p-5 transition hover:border-amber-300 hover:bg-white/10"
                >
                  <span>
                    <span className="block text-sm font-bold uppercase tracking-wider text-amber-300">{verticals[v].name}</span>
                    <span className="mt-1 block text-lg font-bold">{verticals[v].line}</span>
                  </span>
                  <span className="text-amber-300 transition group-hover:translate-x-1">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section>
        <StatsStrip />
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="What we do" title="Three teams, one partner" intro="Most businesses need technology, demand and credibility at the same time. We provide all three, so nothing gets lost between agencies." />
        <div className="grid gap-5 md:grid-cols-3">
          {verticalOrder.map((v) => (
            <div key={v} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-6">
              <p className="eyebrow">{verticals[v].name}</p>
              <h3 className="mt-2 text-xl font-extrabold text-navy-900">{verticals[v].headline}</h3>
              <ul className="mt-4 flex-1 space-y-1.5 text-[0.95rem]">
                {servicesFor(v).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${v}/${s.slug}/`} className="text-muted hover:text-navy-800">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/${v}/`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-amber-600">
                All {verticals[v].name.toLowerCase()} services <Arrow />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Popular services" title="Where most clients start" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <ServiceCard key={`${s.vertical}/${s.slug}`} service={s} />
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3 !text-amber-300">Marketing results</p>
            <h2 className="text-2xl font-extrabold md:text-4xl">Revenue our campaigns have generated for clients</h2>
            <p className="mt-4 text-lg text-navy-100">Figures supplied by the company from client ad and store dashboards. Individual results vary.</p>
            <div className="mt-8">
              <StatsStrip items={marketingStats} tone="dark" />
            </div>
          </div>
          <div className="grid gap-4">
            {proof.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}/`} className="group rounded-xl border border-white/15 bg-white/5 p-5 hover:border-amber-300">
                <p className="text-sm text-amber-300">{c.industry}</p>
                <p className="mt-1 text-lg font-bold">{c.title}</p>
              </Link>
            ))}
            <ButtonLink href="/case-studies/" variant="light" className="justify-self-start">
              All case studies <Arrow />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Our products" title="Software we build and run ourselves" intro="Building our own SaaS products keeps us honest about what it takes to design, ship and support software." />
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}/`} className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 hover:border-navy-600 hover:shadow-lg">
              <p className="eyebrow">{p.category}</p>
              <h3 className="mt-2 text-2xl font-extrabold text-navy-900">{p.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{p.hero}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                Explore {p.name} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Industries" title="Industries we know well" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}/`} className="group flex items-center justify-between rounded-xl border border-line p-5 font-bold text-navy-900 hover:border-navy-600">
              {i.name}
              <span className="text-navy-600 group-hover:text-amber-600">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Why S N Digital Solns" title="Built for businesses that want accountable partners" />
        <CheckList
          columns={2}
          items={[
            "11+ years of development experience and 72 technology professionals.",
            "417+ websites and 74+ applications developed, for 580+ clients.",
            "Our own SaaS products, ACADMiN and eheera, built and supported in-house.",
            "Clients in India, the Middle East, North America, Europe and beyond.",
            "Every figure on this site comes from a dashboard we can show you.",
            "Clear reporting, and no promises we cannot keep.",
          ]}
        />
      </Section>

      <Section>
        <div className="grid gap-8 rounded-2xl border border-line p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
          <div>
            <p className="eyebrow mb-2">Free tool</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">How many leads do you need to hit your revenue target?</h2>
            <p className="mt-3 text-lg text-muted">
              The B2B Pipeline & Revenue Calculator works backwards from your target to the prospects, replies, meetings and opportunities you need, and shows where your funnel leaks.
            </p>
          </div>
          <ButtonLink href="/free-tools/b2b-pipeline-revenue-calculator/" track="tool_open" className="md:justify-self-end">
            Use the free calculator <Arrow />
          </ButtonLink>
        </div>
      </Section>

      <Section tone="mist">
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={faqs} />
        </div>
      </Section>

      <CtaBand title="Tell us what you want to achieve." text="Book a 30 minute consultation. We will tell you honestly whether and how we can help." />
    </>
  );
}
